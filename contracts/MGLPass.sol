// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MGLPass is ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721("MGLPass", "MGL") {
        mintPrice = 1 ether;
        totalSupply = 0;
        maxSupply = 1000;
    }

    function setIsPublicMintEnabled(
        bool _isPublicMintEnabled
    ) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBasicTokenUri(
        string calldata _baseTokenUri
    ) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function widthdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success, "Withdrawal failed");
    }

    function setMintPrice(uint256 _newMintPrice) external onlyOwner {
        mintPrice = _newMintPrice;
    }

    function setMaxSupply(uint256 _maxSupply) external onlyOwner {
        maxSupply = _maxSupply;
    }

    function privateMint() public payable onlyOwner {
        uint256 newTokenId = totalSupply + 1;
        totalSupply++;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, baseTokenUri);
        walletMints[msg.sender] += 1;
    }

    function mint() public payable nonReentrant {
        require(isPublicMintEnabled, "minting not enabled");
        require(msg.value >= mintPrice, "wrong mint value");
        require(walletMints[msg.sender] == 0, "exceed max wallet");
        require(totalSupply < maxSupply, "Supply limit reached");

        uint256 newTokenId = totalSupply + 1;
        totalSupply++;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, baseTokenUri);
        walletMints[msg.sender] += 1;
    }
}
