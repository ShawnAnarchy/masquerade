import { assert } from 'chai';
import { ethers, waffle } from 'hardhat';
import { BigNumberish } from "@ethersproject/bignumber";
const { getSigners, Wallet, Signer, BigNumber } = ethers;
const { deployContract } = waffle;

// TODO: fix its poor stack trace to make build 2x faster
// import VerifierArtifact from "../artifacts/contracts/Verifier.sol/Verifier.json";
import VerifierArtifact from "../build/contracts/Verifier.json";
import { Verifier } from "../types/Verifier";

import _D from "./calldata.json";
import * as PackageConfig from "../package-lock.json";
import * as TruffleConfig from "../truffle-config.js";
//@ts-ignore
import * as HardhatConfig from "../hardhat.config";
const AnyHardhatConfig = <any> HardhatConfig;

function B(el){ return BigNumber.from(el); }
type aty = [BigNumberish,BigNumberish];
type bty = [[BigNumberish,BigNumberish],[BigNumberish,BigNumberish]];
type cty = [BigNumberish,BigNumberish];
type ity = [BigNumberish,BigNumberish];
const a:aty = [B(_D[0][0]), B(_D[0][1])]; 
const b:bty = [[B(_D[1][0][0]), B(_D[1][0][1])],[B(_D[1][1][0]), B(_D[1][1][1])]];
const c:cty = [B(_D[2][0]), B(_D[2][1])]; 
const input:ity = [B(_D[3][0]), B(_D[3][1])]; 

import { groth } from 'snarkjs';
import { SampleProver, sampleZkInputs, bigintifyPkey, bigintifyVkey, bigintifyProof, bigintifyPublicSignals } from '../sdk';

describe("Verifer tests", () => {
  describe("Wasmsnark", () => {
    let input:sampleZkInputs;
    let wasm;
    let pkey;
    let prover;
    let proof;
    let cliProof;
    let vkJson;
    let publicSignals;
    let cliPublicSignals;
    before(async ()=>{
      input = JSON.parse(require('fs').readFileSync('circuits/input.json').toString());
      wasm = require('fs').readFileSync('circuits/circuit.wasm');
      let pkeyBuff = require('fs').readFileSync('circuits/proving_key.json');
      pkey = JSON.parse(pkeyBuff.toString());

      prover = new SampleProver(wasm, pkey, true);
      proof = <any> await prover.prove(input);
      cliProof = JSON.parse(require('fs').readFileSync('circuits/proof.json').toString());
      vkJson = JSON.parse(require('fs').readFileSync('circuits/verification_key.json').toString());
      publicSignals = await prover.getPublicSignal(input);
      cliPublicSignals = JSON.parse(require('fs').readFileSync('circuits/public.json').toString());
    });

    it("has the same publicSignals even if generated by different libraries.", async()=>{
      assert.equal(`${publicSignals}`, `${cliPublicSignals}`);
    });

    it("verifies the cli proof by Wasmsnark", async()=>{
      let res = await prover.verify(vkJson, cliProof, cliPublicSignals);
      assert.equal(res, true);
    });

    it.skip("verifies the other cli proof by Wasmsnark", async()=>{
      let cliProof2 = JSON.parse(require('fs').readFileSync('circuits/_proof.json').toString());
      let res = await prover.verify(vkJson, cliProof2, cliPublicSignals);
      assert.equal(res, true);
    });

    it.skip("verifies the wasmsnark proof by Wasmsnark", async()=>{
      let res = await prover.verify(vkJson, proof, publicSignals);
      assert.equal(res, true);
    });

  });
  describe("SnarkJS", ()=>{
    let input;
    let wasm;
    let pkey;
    let proof;
    let vkJson;
    let publicJson;
    before(async ()=>{
      input = JSON.parse(require('fs').readFileSync('circuits/input.json').toString());
      wasm = require('fs').readFileSync('circuits/circuit.wasm');
      let pkeyBuff = require('fs').readFileSync('circuits/proving_key.json');
      pkey = JSON.parse(pkeyBuff.toString());
      proof = JSON.parse(require('fs').readFileSync('circuits/proof.json').toString());
      vkJson = JSON.parse(require('fs').readFileSync('circuits/verification_key.json').toString());
      publicJson = JSON.parse(require('fs').readFileSync('circuits/public.json').toString());
    })
    it("can verify the cli proof by SnarkJS", async()=>{
      proof = bigintifyProof(proof);
      vkJson = bigintifyVkey(vkJson);
      publicJson = bigintifyPublicSignals(publicJson);
      let res = groth.isValid(vkJson, proof, publicJson);
      assert.equal(res, true);
    });

    it.skip("verifies the SnarkJS proof by SnarkJS", async()=>{
      let snarkJsProver = new SampleProver(wasm, pkey, false);
      let snarkJsProof = await snarkJsProver.prove(input);

      snarkJsProof = bigintifyProof(snarkJsProof);
      vkJson = bigintifyVkey({...vkJson});
      let publicSignals = bigintifyPublicSignals( await snarkJsProver.getPublicSignal(input) );

      let res = await snarkJsProver.verify(vkJson, snarkJsProof, publicSignals);
      assert.equal(res, true);
    });
    it('shows wasmsnark is faster than snarkjs', async()=>{
      let wasmProver = new SampleProver(wasm, pkey, true);

      let now = Date.now();
      for(var i = 0; i < 2; i++){
        await wasmProver.prove(input);
      }
      let wasmRes = Date.now() - now;

      let jsProver = new SampleProver(wasm, pkey, false);
      let now2 = Date.now();
      for(var i = 0; i < 2; i++){
        await jsProver.prove(input);
      }
      let jsRes = Date.now() - now2;

      assert.equal(wasmRes < jsRes, true);
    }).timeout(200000);

    it.skip("can verify the wasmsnark proof by SnarkJS", async()=>{
      let prover = new SampleProver(wasm, pkey, true);
      let proof = <any> await prover.prove(input);
      prover.isWasmsnark = false;
      let vkJson = JSON.parse(require('fs').readFileSync('circuits/verification_key.json').toString());
      let publicSignals:any = await prover.getPublicSignal(input);
      proof = bigintifyProof(proof);
      vkJson = bigintifyVkey(vkJson);
      publicSignals = bigintifyPublicSignals(publicSignals);

      let res = await prover.verify(vkJson, proof, publicSignals);
      assert.equal(res, true);
    });
  });

  describe("Verifier", () => {
    let verifier: Verifier;

    beforeEach(async () => {
      const _signers = await getSigners();
      verifier = (await deployContract(
        _signers[0],
        VerifierArtifact
      )) as Verifier;
    });
    it("has correct versions.", async () => {
      assert.equal(TruffleConfig.compilers.solc.version, "^0.5.0")
      assert.equal(AnyHardhatConfig.default.solidity, "0.5.0");
      assert.equal(PackageConfig.dependencies.snarkjs.version, "0.1.31");
      assert.equal(PackageConfig.dependencies.circom.version, "0.5.0");
    });

    it("verifies by test data.", async () => {
      let bool = await verifier.verifyProof(a,b,c,input);
      assert.equal(bool, true);
    });
  });
});