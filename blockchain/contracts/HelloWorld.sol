pragma solidity ^0.8.0;

contract HelloWorld {
    address payable nftOwner;
    address public buyer;
    
    uint256[] public nfts;

    struct NFTOwnership {
        address owner;
        uint256 nftId;
    }

    mapping(uint256 => NFTOwnership) public nftOwnerships;


    constructor() {
        buyer == msg.sender;
        nftOwner = payable(0x14c2e37261a085C57FB3Bcd305465Cc0E6Be79BB);
    }

    // create a NFT
    function mockNFT() public returns (uint256) {
        uint256 nftHash = getNFTidentifier();
        NFTOwnership memory nftOwnership;
        nftOwnership.nftId = nftHash;
        nftOwnership.owner = nftOwner;
        nftOwnerships[nftHash] = nftOwnership;
        nfts.push(nftHash);
        return nftHash;
    }

    function buyNFT(uint256 price, uint256 nftHash) public payable {
        price = msg.value;
        nftOwner.transfer(price);
        nftOwnerships[nftHash].owner = buyer;
    }

    function getNFTidentifier() public returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.number, msg.sender))
        ) % 1000;
        nfts.push(randomNumber);
        return randomNumber;
    }

}
