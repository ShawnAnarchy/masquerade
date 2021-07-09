declare module 'wasmsnark' {
  export function buildBn128(): Promise<Bn128>;

  export class Bn128 {
    //signals=witness
    groth16GenProof(signals: ArrayBuffer, pkey: ArrayBuffer): Promise<Proof>;
    groth16Verify(verificationKey:any, input:any, proof:any): Promise<boolean>;
  }

  export type Proof = {
    pi_a: [string, string, string];
    pi_b: [[string,string],[string,string],[string,string]];
    pi_c: [string, string, string];
    protocol: string;
  }
}