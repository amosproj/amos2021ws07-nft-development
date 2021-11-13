pragma solidity ^0.8.0;

contract HelloWorld {
    address payable nftOwner;
    address public buyer;


    uint256[] public nfts;

    struct NFTOwnership {
        address owner;
        uint256 nftId;
        uint droptime;
    }

    mapping(uint256 => NFTOwnership) public nftOwnerships;


    constructor() {
        buyer == msg.sender;
        nftOwner = payable(0xC77787e364E3420c0609a249F18De47430900f0C);
    }

    // create a NFT
    function mockNFT() public returns (uint256) {
        uint256 nftHash = getNFTidentifier();
        NFTOwnership memory nftOwnership;
        nftOwnership.nftId = nftHash;
        nftOwnership.owner = nftOwner;
        nftOwnership.droptime = 1637085033;
        nftOwnerships[nftHash] = nftOwnership;
        nfts.push(nftHash);
        return nftHash;
    }

    function buyNFT(uint256 price, uint256 nftHash) public payable returns(address) {
        require(nftOwnerships[nftHash].droptime<=block.timestamp,string(abi.encode("Drop has not started yet! ",(nftOwnerships[nftHash].droptime-block.timestamp),"Seconds left!")));
        price = msg.value;
        nftOwner.transfer(price);
        nftOwnerships[nftHash].owner = buyer;
        return nftOwnerships[nftHash].owner;
    }

    function getNFTidentifier() public returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.number, msg.sender))
        ) % 1000;
        nfts.push(randomNumber);
        return randomNumber;
    }

}
