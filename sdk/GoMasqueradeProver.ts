import { BaseProver, ProvingKey, Proof } from './BaseProver';

export type goMasqueradeZkInputs = {
  identifiedAddress: number;
  identifiedPathElements: Array<number>,
  identifiedPathIndices: Array<number>,
  identfiedRoot: number;
  stealthAddress: number;
  entryPathElements: Array<number>,
  entryPathIndices: Array<number>,
  entryRoot: number;
  relayer: number;
  fee: number;
  checksum: number
}

export class GoMasqueradeProver extends BaseProver<goMasqueradeZkInputs> {
  isWasmsnark: boolean;
  constructor(wasm:BufferSource, pkey:ProvingKey, isWasmsnark:boolean) {
    super(wasm, pkey, isWasmsnark);
  }
  async prove(input:goMasqueradeZkInputs): Promise<Proof> {
    return super.prove(input);
  }
  async getPublicSignal(input:goMasqueradeZkInputs):Promise<Array<string>>{
    return super.getPublicSignal(input);
  }
    
}