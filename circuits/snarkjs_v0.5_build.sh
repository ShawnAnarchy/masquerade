
echo '{ "a": 109, "b": 203, "c": 3231, "d": 1992, "e": "-23213", "k": 1200, "l": 232, "m": "-100" }' > input.json

echo 'circom circuit.circom'
npx circom circuit.circom --r1cs --wasm --sym

echo 'npx snarkjs r1cs info'
npx snarkjs r1cs info circuit.r1cs

echo 'npx snarkjs r1cs print'
npx snarkjs r1cs print circuit.r1cs circuit.sym

echo 'npx snarkjs r1cs export json'
npx snarkjs r1cs export json circuit.r1cs

echo 'npx snarkjs wtns calculate'
npx snarkjs wtns calculate circuit.wasm input.json 

echo 'npx snarkjs wtns debug'
npx snarkjs wtns debug circuit.wasm input.json witness.wtns circuit.sym

echo 'npx snarkjs wtns export json'
npx snarkjs wtns export json witness.wtns witness.json 

echo 'npx snarkjs powersoftau new'
npx snarkjs powersoftau new bn-128 12 powersOfTaw12_0000.ptau

echo 'npx snarkjs powersoftau prepare phase'
npx snarkjs powersoftau prepare phase2 powersOfTaw12_0000.ptau new_powersoftau.ptau 

echo 'npx snarkjs zkey new'
npx snarkjs zkey new circuit.r1cs new_powersoftau.ptau circuit.zkey

echo 'npx snarkjs groth16 prove'
npx snarkjs groth16 prove circuit.zkey witness.wtns proof.json public.json

echo 'npx snarkjs zkey export verificationkey'
npx snarkjs zkey export verificationkey circuit.zkey verification_key.json

echo 'npx snarkjs zkey export soliditycalldata'
npx snarkjs zkey export soliditycalldata public.json proof.json

echo 'npx snarkjs groth16 verify'
npx snarkjs groth16 verify verification_key.json public.json proof.json

echo 'build Verifier.sol'
npx snarkjs zkesv circuit.zkey Verifier.sol

echo 'move Verifier.sol'
cp ./Verifier.sol ../contracts
