declare module 'circom_runtime' {
  export function WitnessCalculatorBuilder(code:BufferSource, options?: any): Promise<WitnessCalculator>;

  export class WitnessCalculator {
    calculateBinWitness(input: any, sanityCheck?:boolean):Promise<ArrayBuffer>;
    calculateWitness(input: any, sanityCheck?:boolean):Promise<any>;
  }

}