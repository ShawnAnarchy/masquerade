/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { Verifier } from "./Verifier";

export class VerifierFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<Verifier> {
    return super.deploy(overrides || {}) as Promise<Verifier>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Verifier {
    return super.attach(address) as Verifier;
  }
  connect(signer: Signer): VerifierFactory {
    return super.connect(signer) as VerifierFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Verifier {
    return new Contract(address, _abi, signerOrProvider) as Verifier;
  }
}

const _abi = [
  {
    constant: true,
    inputs: [
      {
        name: "a",
        type: "uint256[2]",
      },
      {
        name: "b",
        type: "uint256[2][2]",
      },
      {
        name: "c",
        type: "uint256[2]",
      },
      {
        name: "input",
        type: "uint256[2]",
      },
    ],
    name: "verifyProof",
    outputs: [
      {
        name: "r",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506113c4806100206000396000f3fe608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063f5c9d69e14610046575b600080fd5b34801561005257600080fd5b506101b2600480360361014081101561006a57600080fd5b8101908080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f82011690508083019250505050505091929192908060800190600280602002604051908101604052809291906000905b8282101561011f578382604002016002806020026040519081016040528092919082600260200280828437600081840152601f19601f820116905080830192505050505050815260200190600101906100cb565b50505050919291929080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f820116905080830192505050505050919291929080604001906002806020026040519081016040528092919082600260200280828437600081840152601f19601f82011690508083019250505050505091929192905050506101cc565b604051808215151515815260200191505060405180910390f35b60006101d6611234565b60408051908101604052808760006002811015156101f057fe5b6020020151815260200187600160028110151561020957fe5b602002015181525081600001819052506040805190810160405280604080519081016040528088600060028110151561023e57fe5b6020020151600060028110151561025157fe5b6020020151815260200188600060028110151561026a57fe5b6020020151600160028110151561027d57fe5b6020020151815250815260200160408051908101604052808860016002811015156102a457fe5b602002015160006002811015156102b757fe5b602002015181526020018860016002811015156102d057fe5b602002015160016002811015156102e357fe5b60200201518152508152508160200181905250604080519081016040528085600060028110151561031057fe5b6020020151815260200185600160028110151561032957fe5b602002015181525081604001819052506060600260405190808252806020026020018201604052801561036b5781602001602082028038833980820191505090505b50905060008090505b60028110156103b957848160028110151561038b57fe5b6020020151828281518110151561039e57fe5b90602001906020020181815250508080600101915050610374565b5060006103c682846103e6565b14156103d7576001925050506103de565b6000925050505b949350505050565b6000807f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f00000019050610414611269565b61041c610630565b9050806080015151600186510114151561049e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f76657269666965722d6261642d696e707574000000000000000000000000000081525060200191505060405180910390fd5b6104a66112b2565b6040805190810160405280600081526020016000815250905060008090505b86518110156105b3578387828151811015156104dd57fe5b9060200190602002015110151561055c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f76657269666965722d6774652d736e61726b2d7363616c61722d6669656c640081525060200191505060405180910390fd5b6105a48261059f85608001516001850181518110151561057857fe5b906020019060200201518a8581518110151561059057fe5b90602001906020020151610a8a565b610b8d565b915080806001019150506104c5565b506105da81836080015160008151811015156105cb57fe5b90602001906020020151610b8d565b90506106106105ec8660000151610cb1565b8660200151846000015185602001518587604001518b604001518960600151610d4d565b1515610622576001935050505061062a565b600093505050505b92915050565b610638611269565b60408051908101604052807f27b5b10dfeb5f75afdcbadeac2751bc22e0fd7349de0decc24499b1922e10ced81526020017f1b18f0ce6b1b8bd9f8e9d3cbc455c74f4421e5aca0b6d884216aebf6745a08198152508160000181905250604080519081016040528060408051908101604052807f285f41635ecc77c3774a8566682a9c32e1d4073ffcd8c936a8f04d865cb41aa681526020017f196d9bab3d19ee5f03efc38da6c95f451ee87f43c558dcab0314aa9436a95890815250815260200160408051908101604052807f153f136e79dd906e8caf984e52c8c4147a045b8f3a7bcd0838470431092da7ef81526020017f0b7ad7dab8f9828bc443c59e4724a1c7cf72e135c7a33072bcd4ffd25c0c99708152508152508160200181905250604080519081016040528060408051908101604052807f2dd221e9f0407b563538b06b99773e501c1807f2d1ab3520aad49345a3c1a5f281526020017f0c7f0e4e9e64e4b0928f7603570afa425fbce259efdfff75623e53faa0a98f18815250815260200160408051908101604052807f2b8799c63c3257f40477dba93c67f8354cd217b92e561b38f077e030979f21eb81526020017f03f6c15877e771aba5f8ee0b1df7bc12847fdb6f0533ee95db130e45ddebac258152508152508160400181905250604080519081016040528060408051908101604052807f103edf059be8199ee03ea3b073a5102042bb38cddcba40c492bfd09dcfc2ffff81526020017f25960b051883fc2a19ebab75ab9b16a7c4c69f6d0bb683e26a93b00aa29a2afb815250815260200160408051908101604052807f2e08db29c6684d1fd700d1c26f5bca2879470b845e79da097d885aa93c46a66881526020017f0243c628a2a7c1665c08afef682c71c0c5cd30f3003f66c667a4283326a7d8338152508152508160600181905250600360405190808252806020026020018201604052801561091f57816020015b61090c6112cc565b8152602001906001900390816109045790505b50816080018190525060408051908101604052807f03be0ecf22318bd5b574b3d6879b268a0f2ef30b7f5ddea1b3b507b194e855c881526020017f2b29626595bfc5aa67473055a25f4912ab95369c10eb1a76674472c9429bbbae8152508160800151600081518110151561099057fe5b9060200190602002018190525060408051908101604052807f09e175c4637b72798def17e98e09b404e7ff5bc19b291d03683ee7181b033e9b81526020017f1ae014c85a99f623b7d98c82a48063f45da363e1542dbf1b5f7fdf0fb6c1194681525081608001516001815181101515610a0557fe5b9060200190602002018190525060408051908101604052807f2690f45ac92ccd08f2d8bbbad3dd4e96c9275e2b147797fc50232ad226863f2a81526020017f26f148cd34821133ede82449ceea461fdfaf7fffdf40b08622ee29b080e6757381525081608001516002815181101515610a7a57fe5b9060200190602002018190525090565b610a926112b2565b610a9a6112e6565b8360000151816000600381101515610aae57fe5b6020020181815250508360200151816001600381101515610acb57fe5b60200201818152505082816002600381101515610ae457fe5b602002018181525050600060608360808460076107d05a03fa90508060008114610b0d57610b0f565bfe5b50801515610b85576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f70616972696e672d6d756c2d6661696c6564000000000000000000000000000081525060200191505060405180910390fd5b505092915050565b610b956112b2565b610b9d611309565b8360000151816000600481101515610bb157fe5b6020020181815250508360200151816001600481101515610bce57fe5b6020020181815250508260000151816002600481101515610beb57fe5b6020020181815250508260200151816003600481101515610c0857fe5b602002018181525050600060608360c08460066107d05a03fa90508060008114610c3157610c33565bfe5b50801515610ca9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260128152602001807f70616972696e672d6164642d6661696c6564000000000000000000000000000081525060200191505060405180910390fd5b505092915050565b610cb96112b2565b60007f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd47905060008360000151148015610cf6575060008360200151145b15610d1a576040805190810160405280600081526020016000815250915050610d48565b604080519081016040528084600001518152602001828560200151811515610d3e57fe5b0683038152509150505b919050565b600060606004604051908082528060200260200182016040528015610d8c57816020015b610d796112cc565b815260200190600190039081610d715790505b50905060606004604051908082528060200260200182016040528015610dcc57816020015b610db961132c565b815260200190600190039081610db15790505b5090508a826000815181101515610ddf57fe5b9060200190602002018190525088826001815181101515610dfc57fe5b9060200190602002018190525086826002815181101515610e1957fe5b9060200190602002018190525084826003815181101515610e3657fe5b9060200190602002018190525089816000815181101515610e5357fe5b9060200190602002018190525087816001815181101515610e7057fe5b9060200190602002018190525085816002815181101515610e8d57fe5b9060200190602002018190525083816003815181101515610eaa57fe5b90602001906020020181905250610ec18282610ed1565b9250505098975050505050505050565b600081518351141515610f4c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f70616972696e672d6c656e677468732d6661696c65640000000000000000000081525060200191505060405180910390fd5b6000835190506000600682029050606081604051908082528060200260200182016040528015610f8b5781602001602082028038833980820191505090505b50905060008090505b83811015611169578681815181101515610faa57fe5b90602001906020020151600001518260006006840201815181101515610fcc57fe5b90602001906020020181815250508681815181101515610fe857fe5b9060200190602002015160200151826001600684020181518110151561100a57fe5b9060200190602002018181525050858181518110151561102657fe5b9060200190602002015160000151600060028110151561104257fe5b6020020151826002600684020181518110151561105b57fe5b9060200190602002018181525050858181518110151561107757fe5b9060200190602002015160000151600160028110151561109357fe5b602002015182600360068402018151811015156110ac57fe5b906020019060200201818152505085818151811015156110c857fe5b906020019060200201516020015160006002811015156110e457fe5b602002015182600460068402018151811015156110fd57fe5b9060200190602002018181525050858181518110151561111957fe5b9060200190602002015160200151600160028110151561113557fe5b6020020151826005600684020181518110151561114e57fe5b90602001906020020181815250508080600101915050610f94565b50611172611353565b6000602082602086026020860160086107d05a03fa9050806000811461119757611199565bfe5b5080151561120f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f70616972696e672d6f70636f64652d6661696c6564000000000000000000000081525060200191505060405180910390fd5b600082600060018110151561122057fe5b602002015114159550505050505092915050565b610100604051908101604052806112496112cc565b815260200161125661132c565b81526020016112636112cc565b81525090565b6101e06040519081016040528061127e6112cc565b815260200161128b61132c565b815260200161129861132c565b81526020016112a561132c565b8152602001606081525090565b604080519081016040528060008152602001600081525090565b604080519081016040528060008152602001600081525090565b606060405190810160405280600390602082028038833980820191505090505090565b608060405190810160405280600490602082028038833980820191505090505090565b608060405190810160405280611340611376565b815260200161134d611376565b81525090565b602060405190810160405280600190602082028038833980820191505090505090565b604080519081016040528060029060208202803883398082019150509050509056fea165627a7a72305820e8cdc886e0dc6e2f3c826cb343b86c295998e6a4fe27129bb5c0dd02e597b4d70029";
