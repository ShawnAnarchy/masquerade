brew tap vultr/vultr-cli
brew install vultr-cli
export VULTR_API_KEY=your_api_key

vultr-cli server create --region <region-id> --plan <plan-id> --os <os-id> --hostname <hostname>


echo 'build wasm'
npx circom --wasm
scp circom:~/masquerade/circuits/circuit.wasm ./
echo 'wasm built'


npx circom --sym
scp circom:~/masquerade/circuits/circuit.sym ./

npx circom --r1cs
scp circom:~/masquerade/circuits/circuit.r1cs ./


vultr-cli server delete --id <server-id>

