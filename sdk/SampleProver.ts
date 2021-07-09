import { BaseProver, ProvingKey, Proof } from './BaseProver';

export type sampleZkInputs = {
  a: number;
  b: number;
  c: number;
}
export class SampleProver extends BaseProver<sampleZkInputs> {
  isWasmsnark: boolean;
  constructor(wasm:BufferSource, pkey:ProvingKey, isWasmsnark:boolean) {
    super(wasm, pkey, isWasmsnark);
  }
  async prove(input:sampleZkInputs): Promise<Proof> {
    return super.prove(input);
  }
  async getPublicSignal(input:sampleZkInputs):Promise<Array<string>>{
    return super.getPublicSignal(input);
  }
    
}