// for v0.1.31
declare module 'snarkjs' {
  export var groth: Groth;

  export class Groth {
    genProof(vk_proof:any, witness:any, verbose?: any): GenProofResult;
    isValid(vk_verifier:any, proof: Proof, publicSignals:Array<any>):boolean;
  }

  export type GenProofResult = {
    proof: Proof;
    publicSignals: string;
  }
  

  export type Proof = {
    pi_a: any;
    pi_b: any;
    pi_c: any;
    protocol: string;
  }
}
