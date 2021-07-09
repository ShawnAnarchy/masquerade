include "../node_modules/circomlib/circuits/bitify.circom";
include "../node_modules/circomlib/circuits/pedersen.circom";
include "../node_modules/circomlib/circuits/babyjub.circom";

template CommitmentHasher(bits) {
    signal input secret;
    signal output commitment;
    signal output subCommitment;

    component commitmentHasher = Pedersen(bits);
    component secretBits = Num2Bits(bits);
    secretBits.in <== secret;
    for (var i = 0; i < bits; i++) {
        commitmentHasher.in[i] <== secretBits.out[i];
    }

    commitment <== commitmentHasher.out[0];
}

template ScalarHasher(bits) {
    signal input in;
    signal output xout;
    signal output yout;

    component hasher = Pedersen(bits);
    component fnBits = Num2Bits(bits);
    fnBits.in <== in;
    for (var i = 0; i < bits; i++) {
        hasher.in[i] <== fnBits.out[i];
    }

    xout <== hasher.out[0];
    yout <== hasher.out[1];
}
template ArrayHasher(levels, bits) {
    signal input array[levels];
    signal output xout;
    signal output yout;

    component hashers[levels];
    component fnBitsArray[levels];
    for (var i = 0; i < levels; i++) {
      hashers[i] = Pedersen(bits);
      fnBitsArray[i] = Num2Bits(bits);
      fnBitsArray[i].in <== array[i];
      for (var j = 0; j < bits; j++) {
        hashers[i].in[j] <== fnBitsArray[i].out[j];
      }
    }


    component adders[levels];
    for (var i = 0; i < levels; i++) {
      adders[i] = BabyAdd();
      if (i==0) {
        adders[i].x1 <== hashers[i].out[0];
        adders[i].y1 <== hashers[i].out[1];
        adders[i].x2 <== hashers[i+1].out[0];
        adders[i].y2 <== hashers[i+1].out[1];
      } else {
        if (i < levels-1){
          adders[i].x1 <== adders[i-1].xout;
          adders[i].y1 <== adders[i-1].yout;
          adders[i].x2 <== hashers[i+1].out[0];
          adders[i].y2 <== hashers[i+1].out[1];
        }
        // else: adders[levels-2].{x|y}out is the result of array sum.
      }
    }

    var xoutTmp;
    var youtTmp;
    if (levels>1) {
      xoutTmp = adders[levels-2].xout;
      youtTmp = adders[levels-2].yout;
    } else {
      xoutTmp = hashers[0].out[0];
      youtTmp = hashers[0].out[1];
    }

    xout <== xoutTmp;
    yout <== youtTmp;
}

template goMasqueradeChecksumHasher() {
    signal input stealthAddress;
    signal input relayer;
    signal input fee;
    signal output xout;
    signal output yout;

    component fnStealthAddress = ScalarHasher(256);
    fnStealthAddress.in <== stealthAddress
    component fnRelayer = ScalarHasher(256);
    fnRelayer.in <== relayer;
    component fnFee = ScalarHasher(256);
    fnFee.in <== fee;

    component adder1 = BabyAdd();
    adder1.x1 <== fnStealthAddress.xout;
    adder1.y1 <== fnStealthAddress.yout;
    adder1.x2 <== fnRelayer.xout;
    adder1.y2 <== fnRelayer.yout;
    component adder2 = BabyAdd();
    adder2.x1 <== adder1.xout;
    adder2.y1 <== adder1.yout;
    adder2.x2 <== fnFee.xout;
    adder2.y2 <== fnFee.yout;
    
    xout <== adder2.xout;
    yout <== adder2.yout;
}