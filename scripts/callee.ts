const {unstringifyBigInts} = require("./stringifybigint.ts");
const inputName = '../circuits/witness.json';
const witness = unstringifyBigInts(JSON.parse(require('fs').readFileSync(inputName, "utf8")));
import { groth } from 'snarkjs'; 
const { genProof } = groth;
import buildWitness from './buildwitness';

console.log(genProof("a", "b"));
console.log(buildWitness(witness));