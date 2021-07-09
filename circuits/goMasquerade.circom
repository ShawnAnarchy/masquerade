include "merkleTree.circom";
include "hashers.circom";

template goMasquerade(levels) {
    /*
        1. Args
    */
    signal private input identifiedAddress; // secret data to prove you know the tie between stealthAddress
    signal private input identifiedPathElements[levels]; // indeed public info but for saving gas
    signal private input identifiedPathIndices[levels]; // indeed public info but for saving gas
    signal private input identfiedRoot; // indeed public info but for saving gas
    signal input stealthAddress; // public input (Only one. No need of entryHash)

    /*
        2. Verify the Merkle existence by using secret input and its tied info.
    */
    component identifiedHasher = CommitmentHasher(248);
    identifiedHasher.secret <== identifiedAddress;

    component identifiedTree = MerkleTreeChecker(levels);
    identifiedTree.leaf <== identifiedHasher.commitment;
    identifiedTree.root <== identfiedRoot;
    for (var i = 0; i < levels; i++) {
      identifiedTree.pathElements[i] <== identifiedPathElements[i];
      identifiedTree.pathIndices[i] <== identifiedPathIndices[i];
    }
    // MerkleTreeChecker doesn't have any output. It just verifies.
    // If the precommitted tree has the identified address, this stealth address is an "anonymous eligible account".

}
component main = goMasquerade(28);
