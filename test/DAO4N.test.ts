import * as assert from 'power-assert';
import { ethers, waffle } from 'hardhat';
import { BigNumberish } from "@ethersproject/bignumber";
const { getSigners, Wallet, Signer, BigNumber } = ethers;
const { deployContract } = waffle;

// import DAO4NArtifact from "../build/contracts/DAO4N.json";
// import { DAO4N } from "../types/DAO4N";

describe.skip("SDK", () => {
  it("can generate a random number as a private input", async()=>{

  });
  it("can generate a goMasqueradeEntryhash as a public input", async()=>{

  });
  it("has genGoMasqueradeProof method", async()=>{

  });
  it("can generate a verifyMasqueradedEntryhash as a public input", async()=>{

  });
  it("has genVerifyMasqueradeProof method", async()=>{

  });

});

describe.skip("DAO4N", () => {
  // let dao4n: DAO4N;

  beforeEach(async () => {
    // const _signers = await getSigners();
    // dao4n = (await deployContract(
    //   _signers[0],
    //   DAO4NArtifact
    // )) as DAO4N;
  });
  it("has entryMasquerade() method", async () => {
  });
  it("has goMasquerade() method", async () => {
  });
  it("has verifyMasqueraded() method", async () => {
  });
});
