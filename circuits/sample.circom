
template Multiplier() {
    signal private input a;
    signal private input b;
    signal input c;
    signal output z;
    z <== a*b+c;
}
component main = Multiplier();
