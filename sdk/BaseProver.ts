import { buildpkey, ProvingKey as InternalProvingKey } from '../scripts/buildpkey';
import { WitnessCalculatorBuilder } from 'circom_runtime';
import { buildBn128, Proof as WasmProof } from 'wasmsnark';
import { groth } from 'snarkjs';
import { bigintifyPkey, bigintifyVkey, bigintifyProof, bigintifyPublicSignals } from './util';
const { genProof, isValid } = groth;

export class BaseProver<T> {
  wasm:BufferSource;
  pkey:InternalProvingKey;
  isWasmsnark:boolean;
  constructor(wasm:BufferSource, pkey:InternalProvingKey, isWasmsnark:boolean){
    this.wasm = wasm;
    this.pkey = pkey;
    this.isWasmsnark = isWasmsnark;
  }
  async prove(input:T): Promise<WasmProof>{
    let pkey_bin = buildpkey(this.pkey);
    let wc = await WitnessCalculatorBuilder(this.wasm);
    let proof: WasmProof;
    if (this.isWasmsnark) {
      let witness = <any> await wc.calculateWitness(input);
      let pkey = bigintifyPkey(<any>{...this.pkey});
      proof = genProof(pkey, witness).proof;
    } else {
      let witness:ArrayBuffer = await wc.calculateBinWitness(input);
      let bn128 = await buildBn128();
      proof = await bn128.groth16GenProof(witness, pkey_bin.buffer);
      proof.protocol = "groth";
    }
    return proof;
  };
  async verify(vk, proof, input){

    if (this.isWasmsnark) {
      proof = bigintifyProof(proof);
      vk = bigintifyVkey(vk);
      input = bigintifyPublicSignals(input);

      return isValid(vk, proof, input);
    } else {
      let bn128 = await buildBn128();
      return await bn128.groth16Verify(vk, input, proof);
    }
  }

  async getPublicSignal(input:T):Promise<Array<string>>{
    let wc = await WitnessCalculatorBuilder(this.wasm);
    let witness:any = await wc.calculateWitness(input);
    const nOutputs = 0;
    const publicSignals = witness.slice(1, this.pkey.nPublic + nOutputs + 1).map(i=> i.toString() );
    return publicSignals;
  }
}

export type Proof = WasmProof;
export type ProvingKey = InternalProvingKey;