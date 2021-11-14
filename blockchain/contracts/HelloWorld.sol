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
    function mockNFT(uint _droptime) public returns (uint256) {
        uint256 nftHash = getNFTidentifier();
        NFTOwnership memory nftOwnership;
        nftOwnership.nftId = nftHash;
        nftOwnership.owner = nftOwner;
        nftOwnership.droptime = _droptime;
        nftOwnerships[nftHash] = nftOwnership;
        nfts.push(nftHash);
        return nftHash;
    }

    function buyNFT(uint256 _price, uint256 _nftHash) public payable  {
        require(nftOwnerships[_nftHash].droptime<=block.timestamp,"Droptime not yet reached!");
        //string(abi.encodePacked("Drop has not started yet! ",((nftOwnerships[_nftHash].droptime-block.timestamp)/86400)," Days, ",((nftOwnerships[_nftHash].droptime-block.timestamp)/3600)," Hours,", ((nftOwnerships[_nftHash].droptime-block.timestamp)/60)," Minutes, and ", ((nftOwnerships[_nftHash].droptime-block.timestamp))," Seconds left.")));
        _price = msg.value;
        nftOwner.transfer(_price);
        nftOwnerships[_nftHash].owner = buyer;        
    }

    function getNFTidentifier() public returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.number, msg.sender))
        ) % 1000;
        nfts.push(randomNumber);
        return randomNumber;
    }

}
