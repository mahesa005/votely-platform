// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title Voting
 * @dev Smart contract untuk sistem voting terdesentralisasi dengan multiple elections
 */
contract Voting {
    // Struktur data untuk Kandidat
    struct Candidate {
        uint256 id;
        string name;
        string party;
        string imageUrl;
        uint256 voteCount;
    }

    // Struktur data untuk Election
    struct Election {
        uint256 id;
        string name;
        string description;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        uint256 candidateCount;
        uint256 totalVotes;
    }

    // Mappings
    mapping(uint256 => Election) public elections;
    mapping(uint256 => mapping(uint256 => Candidate)) public candidates; // electionId => candidateId => Candidate
    mapping(uint256 => mapping(address => bool)) public hasVoted; // electionId => voter => hasVoted
    mapping(uint256 => mapping(address => uint256)) public voterChoice; // electionId => voter => candidateId
    
    uint256 public electionCount;
    address public admin;

    // Events
    event ElectionCreated(uint256 indexed electionId, string name, uint256 startTime, uint256 endTime);
    event CandidateAdded(uint256 indexed electionId, uint256 candidateId, string name, string party);
    event Voted(uint256 indexed electionId, uint256 indexed candidateId, address indexed voter);
    event ElectionStatusChanged(uint256 indexed electionId, bool isActive);

    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier electionExists(uint256 _electionId) {
        require(_electionId > 0 && _electionId <= electionCount, "Election does not exist");
        _;
    }

    modifier electionActive(uint256 _electionId) {
        require(elections[_electionId].isActive, "Election is not active");
        require(block.timestamp >= elections[_electionId].startTime, "Election has not started");
        require(block.timestamp <= elections[_electionId].endTime, "Election has ended");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    /**
     * @dev Membuat election baru
     */
    function createElection(
        string memory _name,
        string memory _description,
        uint256 _startTime,
        uint256 _endTime
    ) public onlyAdmin returns (uint256) {
        require(_startTime < _endTime, "Invalid time range");
        require(_startTime >= block.timestamp, "Start time must be in the future");
        
        electionCount++;
        
        Election storage newElection = elections[electionCount];
        newElection.id = electionCount;
        newElection.name = _name;
        newElection.description = _description;
        newElection.startTime = _startTime;
        newElection.endTime = _endTime;
        newElection.isActive = true;
        newElection.candidateCount = 0;
        newElection.totalVotes = 0;

        emit ElectionCreated(electionCount, _name, _startTime, _endTime);
        return electionCount;
    }

    /**
     * @dev Menambahkan kandidat ke election
     */
    function addCandidate(
        uint256 _electionId,
        string memory _name,
        string memory _party,
        string memory _imageUrl
    ) public onlyAdmin electionExists(_electionId) {
        Election storage election = elections[_electionId];
        require(block.timestamp < election.startTime, "Cannot add candidates after election starts");
        
        election.candidateCount++;
        
        candidates[_electionId][election.candidateCount] = Candidate({
            id: election.candidateCount,
            name: _name,
            party: _party,
            imageUrl: _imageUrl,
            voteCount: 0
        });

        emit CandidateAdded(_electionId, election.candidateCount, _name, _party);
    }

    /**
     * @dev Melakukan voting
     */
    function vote(uint256 _electionId, uint256 _candidateId) 
        public 
        electionExists(_electionId) 
        electionActive(_electionId) 
    {
        require(!hasVoted[_electionId][msg.sender], "Already voted in this election");
        require(_candidateId > 0 && _candidateId <= elections[_electionId].candidateCount, "Invalid candidate");

        hasVoted[_electionId][msg.sender] = true;
        voterChoice[_electionId][msg.sender] = _candidateId;
        candidates[_electionId][_candidateId].voteCount++;
        elections[_electionId].totalVotes++;

        emit Voted(_electionId, _candidateId, msg.sender);
    }

    /**
     * @dev Mengubah status election (active/inactive)
     */
    function setElectionStatus(uint256 _electionId, bool _isActive) 
        public 
        onlyAdmin 
        electionExists(_electionId) 
    {
        elections[_electionId].isActive = _isActive;
        emit ElectionStatusChanged(_electionId, _isActive);
    }

    /**
     * @dev Mendapatkan detail kandidat
     */
    function getCandidate(uint256 _electionId, uint256 _candidateId)
        public
        view
        electionExists(_electionId)
        returns (
            uint256 id,
            string memory name,
            string memory party,
            string memory imageUrl,
            uint256 voteCount
        )
    {
        Candidate memory candidate = candidates[_electionId][_candidateId];
        return (
            candidate.id,
            candidate.name,
            candidate.party,
            candidate.imageUrl,
            candidate.voteCount
        );
    }

    /**
     * @dev Mendapatkan semua kandidat dalam election
     */
    function getAllCandidates(uint256 _electionId)
        public
        view
        electionExists(_electionId)
        returns (Candidate[] memory)
    {
        uint256 count = elections[_electionId].candidateCount;
        Candidate[] memory allCandidates = new Candidate[](count);
        
        for (uint256 i = 1; i <= count; i++) {
            allCandidates[i - 1] = candidates[_electionId][i];
        }
        
        return allCandidates;
    }

    /**
     * @dev Mendapatkan detail election
     */
    function getElection(uint256 _electionId)
        public
        view
        electionExists(_electionId)
        returns (
            uint256 id,
            string memory name,
            string memory description,
            uint256 startTime,
            uint256 endTime,
            bool isActive,
            uint256 candidateCount,
            uint256 totalVotes
        )
    {
        Election memory election = elections[_electionId];
        return (
            election.id,
            election.name,
            election.description,
            election.startTime,
            election.endTime,
            election.isActive,
            election.candidateCount,
            election.totalVotes
        );
    }

    /**
     * @dev Cek apakah voter sudah voting di election tertentu
     */
    function hasVotedInElection(uint256 _electionId, address _voter)
        public
        view
        electionExists(_electionId)
        returns (bool)
    {
        return hasVoted[_electionId][_voter];
    }

    /**
     * @dev Mendapatkan pilihan voter
     */
    function getVoterChoice(uint256 _electionId, address _voter)
        public
        view
        electionExists(_electionId)
        returns (uint256)
    {
        require(hasVoted[_electionId][_voter], "Voter has not voted yet");
        return voterChoice[_electionId][_voter];
    }

    /**
     * @dev Mendapatkan hasil election (vote counts untuk semua kandidat)
     */
    function getElectionResults(uint256 _electionId)
        public
        view
        electionExists(_electionId)
        returns (uint256[] memory)
    {
        uint256 count = elections[_electionId].candidateCount;
        uint256[] memory results = new uint256[](count);
        
        for (uint256 i = 1; i <= count; i++) {
            results[i - 1] = candidates[_electionId][i].voteCount;
        }
        
        return results;
    }
}
