pragma solidity ^0.8.4;

import "./Verifier.sol";



/*
    In JS, you can do Masquerade.pickRepresentatives(150);
*/
contract Masquerade {
    /*
        Structs
    */
    struct Proof {
        uint[2] a,
        uint[2][2] b,
        uint[2] c,
        uint[1] input
    }
    struct PermitArg {
        uint256 deadline;
        uint8 v;
        bytes32 r;
        bytes32 s;
    }


    /*
        Storages
    */
    mapping((address=>uint) eligiblePeople; // real name address => ID
    address[] eligibleAnonsIndices; // anonymous figures
    mapping(address=>bool) public eligibleAnons; // stealth address => flag   ... ideally in merkle tree
    address administration;
    bytes tree; // merkle tree for storing commit hash of stealth address. depth 28 for Japan
    uint MIN_GAS_IN_ETH = 1e15; // 0.001 ETH
    uint MIN_GAS_IN_CURRENCY = 300e18; // 300yen
    mapping(address=>uint) entryCounts;
    mapping(address=>uint) anonymizeCounts;


    /*
        Events
    */
    event Registered();
    event Entried();
    event Anonymized();
    event AdministrationUpdated();
    event Picked();



    /*
        For Deployer
    */
    constructor(address _token){
        administration = msg.sender;
        currency = IERC20(_token);
    }


    /*
        For People
    */
    function entry(bytes32 anonAddrHash) onlyPeople onlyOnceEntry {
        tree.push(anonAddrHash);
        currency.transfer(msg.sender, MIN_GAS_IN_ETH);
        entryCounts[msg.sender]++;
        emit Entried();
    }
    modifier onlyPeople() {
        require(eligibleAutonomi[msg.sender] > 0, "You are not registered.");
        _;
    }
    modifier onlyOnceEntry(){
        require(entryCounts[msg.sender] == 0, "You can't entry twice.");
        _;
    }
    function pickRepresentatives(uint headcount) public {
        bytes r = getRand(); // VDF
        uint indexLen = 8;
        require(headcount < r.length/indexLen && headcount > eligibleAnons.length, "Not enough length of rand and anons.");
        address[] pickRepresentatives;

        for(uint i = 0; i < r.length/indexLen; i++){
            uint index = uint(r[i:i+8]);
            pickRepresentatives.push(eligibleAnons[index]);
            if(pickRepresentatives.length >= headcount) {
                break;
            }
        }
        emit Picked();
    }



    /*
        For Anons
    */
    function anonymize(Proof _proof) onlyGasHolder onlyKnows(_proof) onlyOnceAnonymize {
        eligibleAnonsIndice.push(msg.sender);
        eligibleAnons[msg.sender] = true;
        currency.transfer(msg.sender, MIN_GAS_IN_CURRENCY);
        anonymizeCounts[msg.sender]++;
        emit Anonymized();
    }
    modifier onlyGasHolder(){
        require(msg.sender.balance > MIN_GAS_IN_ETH, "Grab your money to fight.");
        _;
    }
    modifier onlyKnows(Proof _proof){
        require(Verifier.verifyProof(_proof.a, _proof.b, _proof.c, _proof.input), "Your proof is invalid.");
        _;
    }
    modifier onlyOnceAnonymize(){
        require(anonymizeCounts[msg.sender] == 0, "You can't anonymize twice.");
        _;
    }



    /*
        For Admin
    */
    /// @dev people is 0xAAAAA...AAAAABBBBB....BBBBBCCCCC....CCCCCDDDDDD....
    function register(bytes people, bytes ids) onlyAdministration {
        // TODO: Duplication check.
        uint addrLen = 40;
        uint idLen = 12;
        for(uint i = 0; i < people.length/addrLen; i++){
            address person = people[i:i+addrLen];
            uint id = ids[i:i+idLen];
            eligiblePeople[person] = id;
        }
        emit Entried();
    }
    function setAdministration(address newAdministration) onlyAdministration {
        require(newAdministration != address(0), "Don't spoil your nation!");
        administration = newAdministration;
        emit AdministrationUpdated();
    }
    function setMinGas(uint amount) onlyAdministration {
        MIN_GAS_IN_ETH = amount;
    }
    function setCompensation(uint amount) onlyAdministration {
        MIN_GAS_IN_CURRENCY = amount;
    }
    function chargeCompensation(uint amount, PermitArg _pArg) onlyAdministration {
        currency.permit(msg.sender, address(this), amount, _pArg.deadline, _pArg.v, _pArg.r, _pArg.s);
        currency.transferFrom(msg.sender, address(this), amount);
    }
    modifier onlyAdministration() {
        require(msg.sender == administration, "onlyAdministration");
        _;
    }

}