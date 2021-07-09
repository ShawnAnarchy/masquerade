#./clean.sh

goMasqueradeInput='{
      "identifiedAddress": 0,
      "identifiedPathElements": [0,0,0,0,0,0,0],
      "identifiedPathIndices": [0,0,0,0,0,0,0],
      "identfiedRoot": 0,
      "stealthAddress": 0,
      "entryPathElements": [0,0,0,0,0,0,0],
      "entryPathIndices": [0,0,0,0,0,0,0],
      "entryRoot": 0,
      "relayer": 0,
      "fee": 0,
      "checksum": 0
}';

target="$1"

case "$target" in
  sample)           input='{ "a": 109, "b": 203, "c": 231 }';;
  goMasquerade)      input="$goMasqueradeInput" ;;
  verifyMasqueraded) input='{}' ;;
  *) echo "target=$target is not matched." && exit 1 ;;
esac

cp $target.circom circuit.circom

echo 'generate input.json'
echo "$input" > input.json

echo "npx circom circuit.circom --r1cs"
npx circom circuit.circom --r1cs
echo "npx circom circuit.circom --wasm"
npx circom circuit.circom --wasm
echo "npx circom circuit.circom --sym"
npx circom circuit.circom --sym

echo 'snarkjs info -r circuit.r1cs'
snarkjs info -r circuit.r1cs

echo "plonkit setup"
plonkit setup --power 20 --srs_monomial_form srs2^20.key

echo 'plonkit dump-lagrange'
plonkit dump-lagrange --srs_monomial_form srs2^20.key --srs_lagrange_form srs2^20.lg.key

echo 'npx snarkjs calculatewitness --wasm circuit.wasm --input input.json'
npx snarkjs calculatewitness --wasm circuit.wasm --input input.json

echo 'plonkit prove'
time plonkit prove --srs_monomial_form=srs2^20.key

echo 'plonkit export-verification-key --srs_monomial_form srs2^20.key'
plonkit export-verification-key --srs_monomial_form srs2^20.key

echo 'plonkit verify'
plonkit verify

#echo 'plonkit generate-verifier'
#plonkit generate-verifier --verifier Verifier.sol

#echo 'plonkit generatecall'
#echo '[' > calldata.json
#plonkit generatecall >> calldata.json
#echo ']' >> calldata.json

#echo 'move Verifier.sol and calldata'
#cp ./Verifier.sol ../contracts
#cp ./calldata.json ../test
