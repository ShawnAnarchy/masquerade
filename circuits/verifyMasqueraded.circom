include "../node_modules/circomlib/circuits/bitify.circom";
include "../node_modules/circomlib/circuits/pedersen.circom";
include "merkleTree.circom";
include "hashers.circom";

template verifyMasqueraded(levels) {
    signal private input s; // secret randomness for proof of participation
    signal private input masqueradedPathElements[levels]; // entryPreimage
    signal private input masqueradedPathIndices[levels]; // entryPreimage
    signal private input masqueradedRoot; // entryPreimage
    signal private input recipient; // entryPreimage
    signal private input fee; // entryPreimage
    signal private input reward; // entryPreimage
    signal input entryHash; // public entryHash for compressing verification laod

    component hasher = CommitmentHasher();
    hasher.secret <== s;

    component tree = MerkleTreeChecker();
    tree.leaf <== hasher.commitment;
    tree.root <== masqueradedRoot;
    for (var i = 0; i < levels; i++) {
        tree.pathElements[i] <== masqueradedPathElements[i];
        tree.pathIndices[i] <== masqueradedPathIndices[i];
    }

    // Add hidden signals to make sure that tampering with recipient or fee will invalidate the snark proof
    // Most likely it is not required, but it's better to stay on the safe side and it only takes 2 constraints
    // Squares are used to prevent optimizer from removing those constraints
    signal sSquare;
    signal recipientSquare;
    signal feeSquare;
    signal relayerSquare;
    signal rewardSquare;
    sSquare <== s * s;
    recipientSquare <== recipient * recipient;
    feeSquare <== fee * fee;
    relayerSquare <== relayer * relayer;
    rewardSquare <== reward * reward;
}
component main = verifyMasqueraded(24);




include "../node_modules/circomlib/circuits/bitify.circom";
include "../node_modules/circomlib/circuits/pedersen.circom";
include "merkleTree.circom";

// computes Pedersen(nullifier + secret)
template CommitmentHasher() {
    signal input secret;
    signal output commitment;

    component commitmentHasher = Pedersen(248);
    component secretBits = Num2Bits(248);
    secretBits.in <== secret;
    for (var i = 0; i < 248; i++) {
        commitmentHasher.in[i] <== secretBits.out[i];
    }

    commitment <== commitmentHasher.out[0];
}

template goMasquerade(levels) {
    signal private input identifiedAddress; // secret data to prove you know the tie between stealthAddress
    signal private input identifiedPathElements[levels]; // entryPreimage
    signal private input identifiedPathIndices[levels]; // entryPreimage
    signal private input identfiedRoot; // entryPreimage
    signal private input stealthAddress; // entryPreimage
    signal private input entryPathElements[levels]; // entryPreimage
    signal private input entryPathIndices[levels]; // entryPreimage
    signal private input entryRoot; // entryPreimage
    signal private input relayer; // entryPreimage
    signal private input fee; // entryPreimage
    signal input entryHash; // public entryHash for compressing verification laod

    component identifiedHasher = CommitmentHasher();
    identifiedHasher.secret <== identifiedAddress;
    component entryHasher = CommitmentHasher();
    entryHasher.secret <== stealthAddress;

    component identifiedTree = MerkleTreeChecker(levels);
    identifiedTree.leaf <== identifiedHasher.commitment;
    identifiedTree.root <== identfiedRoot;
    for (var i = 0; i < levels; i++) {
        identifiedTree.pathElements[i] <== identifiedPathElements[i];
        identifiedTree.pathIndices[i] <== identifiedPathIndices[i];
    }

    component entryTree = MerkleTreeChecker(levels);
    entryTree.leaf <== entryHasher.commitment;
    entryTree.root <== entryRoot;
    for (var i = 0; i < levels; i++) {
        entryTree.pathElements[i] <== entryPathElements[i];
        entryTree.pathIndices[i] <== entryPathIndices[i];
    }

    // Add hidden signals to make sure that tampering with recipient or fee will invalidate the snark proof
    // Most likely it is not required, but it's better to stay on the safe side and it only takes 2 constraints
    // Squares are used to prevent optimizer from removing those constraints
    signal identifiedAddressSquare;
    signal stealthAddressSquare;
    signal feeSquare;
    signal relayerSquare;
    identifiedAddressSquare <== identifiedAddress * identifiedAddress;
    stealthAddressSquare <== stealthAddress * stealthAddress;
    feeSquare <== fee * fee;
    relayerSquare <== relayer * relayer;

}
component main = goMasquerade(24);
