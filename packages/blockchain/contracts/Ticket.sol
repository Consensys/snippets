// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Ticket is ERC721, Ownable(msg.sender), Pausable {
    uint256 public MAX_SUPPLY;
    uint256 public constant MAX_PER_MINT = 5;
    address public eventOwner;
    uint256 public tokenId = 0;
    uint public _ticketPrice = 0.001 ether;

    event TicketMinted(address indexed _to, uint256 indexed _tokenId);

    constructor(
        string memory name,
        uint256 maxSupply,
        uint ticketPrice
    ) ERC721(name, "ECT") {
        MAX_SUPPLY = maxSupply;
        eventOwner = msg.sender;
        _ticketPrice = ticketPrice;
    }

    modifier onlyEventOwner() {
        require(
            msg.sender == eventOwner,
            "Only event owner can call this function"
        );
        _;
    }

    modifier canMint(uint256 amount) {
        require(
            amount <= MAX_PER_MINT,
            "Cannot mint more than 5 tickets at a time"
        );
        require(msg.value >= _ticketPrice * amount, "Not enough ETH sent");
        require(tokenId + amount <= MAX_SUPPLY, "Not enough tickets left");
        require(amount > 0, "Amount must be greater than zero");
        _;
    }

    function mint(
        uint256 amount
    ) public payable whenNotPaused canMint(amount) {
        for (uint256 i = 1; i <= amount; i++) {
            tokenId++;
            _safeMint(msg.sender, tokenId);
            emit TicketMinted(msg.sender, tokenId);
        }
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;

        payable(msg.sender).transfer(balance);
    }

    function tokenMeta(uint256 _tokenId) public view returns (string memory) {
        return tokenURI(_tokenId);
    }

}