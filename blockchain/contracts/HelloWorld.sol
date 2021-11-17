pragma solidity ^0.8.0;

import "./AddrArrayLib.sol";

contract HelloWorld {
    using AddrArrayLib for AddrArrayLib.Addresses;
    address payable nftOwner;
    address public buyer;

    uint256[] public availableNFTs;

    uint256 public nftsLength;

    struct NFTOwnership {
        address owner;
        uint256 nftId;
        uint256 dropTime;
        uint256 dropHash;
        address reservedFor;
    }

    mapping(uint256 => NFTOwnership) public nftOwnerships;

    // Used to track which addresses have joined the drop
    // address[] private joinedUsers;
    AddrArrayLib.Addresses joinedUsers;

    constructor() {
        buyer == msg.sender;
        nftOwner = payable(0xC77787e364E3420c0609a249F18De47430900f0C);
    }

    function createDrop(uint256 _dropTime) public {
        uint256 dropHash = generateRandomNumber(0);
        uint256 i;
        // I choose "3" as a value for testing reasons
        for (i = 0; i < 3; i++) {
            mockNFT(_dropTime, dropHash, i + 1);
        }
    }

    // create NFTs for drop
    function mockNFT(
        uint256 _dropTime,
        uint256 _dropHash,
        uint256 _number
    ) public {
        uint256 nftHash = generateRandomNumber(_number);
        NFTOwnership memory nftOwnership;
        nftOwnership.nftId = nftHash;
        nftOwnership.owner = nftOwner;
        nftOwnership.reservedFor = nftOwner;
        nftOwnership.dropTime = _dropTime;
        nftOwnership.dropHash = _dropHash;
        nftOwnerships[nftHash] = nftOwnership;
        availableNFTs.push(nftHash);
        nftsLength = availableNFTs.length;
    }

    function joinDrop() public {
        // TODO: purchase limit of 5% of all available NFTs
        require(
            !joinedUsers.exists(msg.sender),
            "The address you are calling from has already joined the drop."
        );
        // We have to make sure that not more users join the drop than we have NFTs available
        require(joinedUsers.size() <= 10, "You cannot join the drop anymore.");
        joinedUsers.pushAddress(msg.sender);
    }

    function drop(uint256 _dropHash) public {
        require(
            nftOwnerships[_dropHash].dropTime <= block.timestamp,
            "Droptime not yet reached!"
        );
        uint256 i;
        uint256 nftElement;
        uint256 nftHash;
        for (i = 0; i < joinedUsers.size(); i++) {
            nftElement = generateRandomNumber(i) % availableNFTs.length;
            nftHash = availableNFTs[nftElement];
            remove(nftElement);
            nftOwnerships[nftHash].reservedFor = joinedUsers.getAddressAtIndex(
                i
            );
        }
    }

    function buyNFT(uint256 _price, uint256 _nftHash) public payable {
        require(
            nftOwnerships[_nftHash].dropTime <= block.timestamp,
            "Droptime not yet reached!"
        );
        require(
            nftOwnerships[_nftHash].reservedFor == msg.sender,
            "This NFT wasn't assigned to you"
        );
        // string(abi.encodePacked("Drop has not started yet! ",((nftOwnerships[_nftHash].droptime-block.timestamp)/86400)," Days, ",((nftOwnerships[_nftHash].droptime-block.timestamp)/3600)," Hours,", ((nftOwnerships[_nftHash].droptime-block.timestamp)/60)," Minutes, and ", ((nftOwnerships[_nftHash].droptime-block.timestamp))," Seconds left.")));
        _price = msg.value;
        nftOwner.transfer(_price);
        nftOwnerships[_nftHash].owner = buyer;
    }

    function generateRandomNumber(uint256 number)
        public
        view
        returns (uint256)
    {
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.number, number))
        ) % 1000;
        return randomNumber;
    }

    function remove(uint256 index) public {
        if (index >= availableNFTs.length) return;

        for (uint256 i = index; i < availableNFTs.length - 1; i++) {
            availableNFTs[i] = availableNFTs[i + 1];
        }
        availableNFTs.pop();
        nftsLength = availableNFTs.length;
    }
}
