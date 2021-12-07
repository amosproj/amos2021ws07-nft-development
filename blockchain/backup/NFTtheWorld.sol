// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2021 Berinike Tech <tech@campus.tu-berlin.de>, Jannis Pilgrim <j.pilgrim@campus.tu-berlin.de>
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

pragma solidity ^0.8.0;

contract NFTtheWorld {
    address payable nftOwner;

    uint256 percentageLimit;

    address public user;

    uint256[] public dropHashes;

    struct NFTOwnership {
        address payable owner;
        string uri;
        uint256 dropId;
        uint256 dropTime;
        address reservedFor;
        uint256 weiPrice;
    }

    // For testing reasons this is public
    // To check if an address is an admin
    mapping(address => bool) public adminRights;
    // Dictionary of form <dropHash>: list of NFTOwnerships
    mapping(uint256 => NFTOwnership[]) public nftOwnerships;
    // Dictionary of form <user address>: <<dropHash>: <number of reserved NFTs>>
    mapping(address => mapping(uint256 => uint256)) public nftReservations;
    // Dictionary of form <dropHash>: <list of nftHashes>
    mapping(uint256 => string[]) public availableNFTs;
    // Dictionary of form  <dropHash>: <nftCount>
    mapping(uint256 => uint256) public availableNFTsCount;
    // Dictionary of form <dropHash>: <maximal number of NFTs a user can reserve/buy from this drop>
    mapping(uint256 => uint256) private maxNumberOfNFTsToBuy;
    // Dictionary of form <dropHash>: <number of NFTs that have been requested by users>
    mapping(uint256 => uint256) public reservedNFTsCount;

    mapping(address => mapping(uint256 => string[]))
        private nftReservationInformationOfUsers;
    mapping(address => uint256[]) public nftAssetsInformationOfUsers;

    // Used to track which addresses have joined the drop
    mapping(uint256 => address[]) private joinedUsers;

    //TODO add all of us in list of admins
    constructor() {
        adminRights[msg.sender] = true;
    }

    // This function lets a user create a drop by specifiyng a drop time and the number of available NFTs.
    // During the creation of the drop, the maximum number of NFTs a user can reserve/buy in this drop is calculated.
    // It is one for a total number of NFTs lower than 20 and 5% otherwise.
    function createDrop(
        uint256 _dropTime,
        uint256 _numberOfNFTS,
        string[] memory _uris,
        uint256 _weiPrice
    ) public onlyByAdmins {
        uint256 dropHash = generateRandomNumber(_dropTime);
        // TODO: check that numberOfNFTs equals length of uris

        for (uint256 i = 0; i < _numberOfNFTS; i++) {
            NFTOwnership memory nftOwnership;
            nftOwnership.uri = _uris[i];
            nftOwnership.owner = payable(msg.sender);
            nftOwnership.reservedFor = msg.sender;
            nftOwnership.dropTime = _dropTime;
            nftOwnership.dropId = dropHash;
            nftOwnership.weiPrice = _weiPrice;
            nftOwnerships[dropHash].push(nftOwnership);
            availableNFTs[dropHash].push(_uris[i]);
        }

        // We need to let users buy 1 NFT instead of 5% if there are less than 20
        if (_numberOfNFTS < 20) {
            maxNumberOfNFTsToBuy[dropHash] = 1;
        } else {
            maxNumberOfNFTsToBuy[dropHash] = (_numberOfNFTS * 5) / 100;
        }
        availableNFTsCount[dropHash] = availableNFTs[dropHash].length;
        //TODO create mapping creator address -> dropHashes
        dropHashes.push(dropHash);
        reservedNFTsCount[dropHash] = 0;
    }

    // This function lets a user join a drop by specifying the number of NFTs she would like to reserve.
    function joinDrop(uint256 _numberOfNFTs, uint256 _dropHash) public {
        require(
            reservedNFTsCount[_dropHash] != availableNFTs[_dropHash].length,
            "You cannot join the drop anymore."
        );
        require(
            _numberOfNFTs <= maxNumberOfNFTsToBuy[_dropHash],
            "Sorry, you can't reserve more that 5% of the NFTs."
        );
        // We have to make sure that not more NFTs get reserved by users than we have NFTs available
        require(
            _numberOfNFTs <=
                availableNFTs[_dropHash].length - reservedNFTsCount[_dropHash],
            "Sorry, not enough NFTs left for your request"
        );
        reservedNFTsCount[_dropHash] += _numberOfNFTs;
        nftReservations[msg.sender][_dropHash] = _numberOfNFTs;
        joinedUsers[_dropHash].push(msg.sender);
    }

    // This function executes a drop.
    // During the execution all joined users get their previously specificed number of NFTs randomly assigned.
    // To make sure no NFT gets assigned to multiple users, it is removed from the list of available NFTs.
    function drop(uint256 _dropHash) public {
        require(
            nftOwnerships[_dropHash][0].dropTime <= block.timestamp,
            "Droptime not yet reached!"
        );
        for (uint256 i = 0; i < joinedUsers[_dropHash].length; i++) {
            shuffle(_dropHash);
            // loop trough the number of NFTs j reserved by user i
            for (
                uint256 j = 0;
                j < nftReservations[joinedUsers[_dropHash][i]][_dropHash];
                j++
            ) {
                uint256 nftElement = getNFTIndex(
                    availableNFTs[_dropHash][j],
                    _dropHash
                );
                nftOwnerships[_dropHash][nftElement].reservedFor = joinedUsers[
                    _dropHash
                ][i];
                nftReservationInformationOfUsers[joinedUsers[_dropHash][i]][
                    _dropHash
                ].push(nftOwnerships[_dropHash][nftElement].uri);
                remove(j, _dropHash);
            }
        }
    }

    // This function lets a user buy her reserved NFTs
    //TODO: Think about a time span during which the reserved NFTs have to be bought
    function buyNFT(uint256 _dropHash) public payable {
        require(
            nftOwnerships[_dropHash][0].dropTime <= block.timestamp,
            "Droptime not yet reached!"
        );
        require(
            nftOwnerships[_dropHash][0].weiPrice *
                nftReservationInformationOfUsers[msg.sender][_dropHash]
                    .length <=
                msg.value,
            "You have sent insufficient funds"
        );
        for (
            uint256 i;
            i < nftReservationInformationOfUsers[msg.sender][_dropHash].length;
            i++
        ) {
            string storage uri = nftReservationInformationOfUsers[msg.sender][
                _dropHash
            ][i];
            MintTheWorld tokenContract;
            tokenContract = new MintTheWorld();
            uint256 nftToken = tokenContract.mintNFT(uri, msg.sender);
            uint256 nftIndex = getNFTIndex(uri, _dropHash);
            nftOwnerships[_dropHash][nftIndex].owner.transfer(
                nftOwnerships[_dropHash][nftIndex].weiPrice
            );
            nftOwnerships[_dropHash][nftIndex].owner = payable(msg.sender);
            nftAssetsInformationOfUsers[msg.sender].push(nftToken);
        }
    }

    // Helper function to created hashes
    function generateRandomNumber(uint256 number)
        internal
        view
        returns (uint256)
    {
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.number, number))
        ) % 1000;
        return randomNumber;
    }

    // Helper function to remove NFT from list of available NFTs
    function remove(uint256 _index, uint256 _dropHash) internal {
        if (_index >= availableNFTs[_dropHash].length) return;

        for (uint256 i = _index; i < availableNFTs[_dropHash].length - 1; i++) {
            availableNFTs[_dropHash][i] = availableNFTs[_dropHash][i + 1];
        }
        availableNFTs[_dropHash].pop();
        availableNFTsCount[_dropHash] = availableNFTs[_dropHash].length;
    }

    // Helper function to shuffle a list
    function shuffle(uint256 _dropHash) internal {
        for (uint256 i = 0; i < availableNFTs[_dropHash].length; i++) {
            uint256 n = i +
                (uint256(keccak256(abi.encodePacked(block.timestamp))) %
                    (availableNFTs[_dropHash].length - i));
            string memory temp = availableNFTs[_dropHash][n];
            availableNFTs[_dropHash][n] = availableNFTs[_dropHash][i];
            availableNFTs[_dropHash][i] = temp;
        }
    }

    function getNFTIndex(string memory _uri, uint256 _dropHash)
        internal
        view
        returns (uint256 index)
    {
        NFTOwnership[] memory nfts = nftOwnerships[_dropHash];
        for (uint256 i = 0; i < nfts.length; i++) {
            if (compareStrings(nfts[i].uri, _uri)) {
                return i;
            }
        }
    }

    function compareStrings(string memory a, string memory b)
        private
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function getDropTime(uint256 _dropHash)
        public
        view
        returns (uint256 dropTime)
    {
        return nftOwnerships[_dropHash][0].dropTime;
    }

    // Modifier to check if msg.sender is elligible
    modifier onlyByAdmins() {
        require(
            adminRights[msg.sender] == true,
            "Your are not elligible to perform this action."
        );
        _;
    }

    function addToAdmins(address payable _addressToAdd) public onlyByAdmins {
        adminRights[_addressToAdd] = true;
    }

    //Restriction to not remove oneself from admin list has been commented out for testing reasons, but generally is desired
    function removeFromAdmins(address payable _addressToRemove)
        public
        onlyByAdmins
    {
        adminRights[_addressToRemove] = false;
    }
}

contract MintTheWorld is ERC721URIStorage {
    uint256 public tokenCounter;

    constructor() ERC721("NFTTheWorld", "PieceOfTheWorld") {
        tokenCounter = 0;
    }

    function mintNFT(string memory tokenURI, address receiver)
        public
        returns (uint256)
    {
        uint256 newItemId = generateRandomNumber(tokenCounter);
        tokenCounter = tokenCounter + 1;
        _safeMint(receiver, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    // Helper function to created hashes
    function generateRandomNumber(uint256 number)
        internal
        view
        returns (uint256)
    {
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.number, number))
        );
        return randomNumber;
    }
}
