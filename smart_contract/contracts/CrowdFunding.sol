// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract CrowdFunding {
    struct Campaign {
        string title;
        string description;
        uint256 goal;
        uint256 deadline;
        string image;
        uint256 raisedAmount; // Track total donations
        address owner; // Campaign creator
    }

    Campaign[] public campaigns;
    mapping(uint256 => address[]) public donors; // Track donors per campaign
    mapping(uint256 => mapping(address => uint256)) public donations; // Track donations per campaign per address

    event CampaignCreated(uint256 campaignId, string title, uint256 goal);
    event DonationReceived(uint256 campaignId, address donor, uint256 amount);

    function createCampaign(
        string memory title,
        string memory description,
        uint256 goal,
        uint256 deadline,
        string memory image
    ) public {
        campaigns.push(Campaign(title, description, goal, deadline, image, 0, msg.sender));
        emit CampaignCreated(campaigns.length - 1, title, goal);
    }

    function donateToCampaign(uint256 campaignId) public payable {
        require(campaignId < campaigns.length, "Campaign does not exist");
        require(msg.value > 0, "Donation must be greater than zero");

        campaigns[campaignId].raisedAmount += msg.value;

        // Track donor if new
        if (donations[campaignId][msg.sender] == 0) {
            donors[campaignId].push(msg.sender);
        }
        donations[campaignId][msg.sender] += msg.value;

        emit DonationReceived(campaignId, msg.sender, msg.value);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

    function getDonors(uint256 campaignId) public view returns (address[] memory) {
        return donors[campaignId];
    }

    function getDonationAmount(uint256 campaignId, address donor) public view returns (uint256) {
        return donations[campaignId][donor];
    }
}
