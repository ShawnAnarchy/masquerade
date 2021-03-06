/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface VerifierInterface extends ethers.utils.Interface {
  functions: {
    "verifyProof(uint256[2],uint256[2][2],uint256[2],uint256[2])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "verifyProof",
    values: [
      [BigNumberish, BigNumberish],
      [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      [BigNumberish, BigNumberish],
      [BigNumberish, BigNumberish]
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "verifyProof",
    data: BytesLike
  ): Result;

  events: {};
}

export class Verifier extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: VerifierInterface;

  functions: {
    verifyProof(
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: [BigNumberish, BigNumberish],
      overrides?: CallOverrides
    ): Promise<{
      r: boolean;
      0: boolean;
    }>;

    "verifyProof(uint256[2],uint256[2][2],uint256[2],uint256[2])"(
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: [BigNumberish, BigNumberish],
      overrides?: CallOverrides
    ): Promise<{
      r: boolean;
      0: boolean;
    }>;
  };

  verifyProof(
    a: [BigNumberish, BigNumberish],
    b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
    c: [BigNumberish, BigNumberish],
    input: [BigNumberish, BigNumberish],
    overrides?: CallOverrides
  ): Promise<boolean>;

  "verifyProof(uint256[2],uint256[2][2],uint256[2],uint256[2])"(
    a: [BigNumberish, BigNumberish],
    b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
    c: [BigNumberish, BigNumberish],
    input: [BigNumberish, BigNumberish],
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    verifyProof(
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: [BigNumberish, BigNumberish],
      overrides?: CallOverrides
    ): Promise<boolean>;

    "verifyProof(uint256[2],uint256[2][2],uint256[2],uint256[2])"(
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: [BigNumberish, BigNumberish],
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    verifyProof(
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: [BigNumberish, BigNumberish],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "verifyProof(uint256[2],uint256[2][2],uint256[2],uint256[2])"(
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: [BigNumberish, BigNumberish],
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    verifyProof(
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: [BigNumberish, BigNumberish],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "verifyProof(uint256[2],uint256[2][2],uint256[2],uint256[2])"(
      a: [BigNumberish, BigNumberish],
      b: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]],
      c: [BigNumberish, BigNumberish],
      input: [BigNumberish, BigNumberish],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
