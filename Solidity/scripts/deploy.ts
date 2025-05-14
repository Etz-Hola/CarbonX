const { ethers } = require("hardhat");

async function deployDiamond() {
  const accounts = await ethers.getSigners();
  const contractOwner = accounts[0];

  // Deploy DiamondCutFacet (required for diamondCut function)
  const DiamondCutFacet = await ethers.getContractFactory("DiamondCutFacet");
  const diamondCutFacet = await DiamondCutFacet.deploy();
  await diamondCutFacet.deployed();
  console.log("DiamondCutFacet deployed:", diamondCutFacet.address);

  // Deploy Diamond
  const Diamond = await ethers.getContractFactory("Diamond");
  const diamond = await Diamond.deploy(contractOwner.address, diamondCutFacet.address);
  await diamond.deployed();
  console.log("Diamond deployed:", diamond.address);

  // Deploy FractionalizerFacet
  const FractionalizerFacet = await ethers.getContractFactory("FractionalizerFacet");
  const fractionalizerFacet = await FractionalizerFacet.deploy();
  await fractionalizerFacet.deployed();
  console.log("FractionalizerFacet deployed:", fractionalizerFacet.address);

  // Register FractionalizerFacet with Diamond
  const cut = [
    {
      facetAddress: fractionalizerFacet.address,
      action: 0, // Add
      functionSelectors: [
        ethers.utils.id("fractionalize(uint256,uint256)").slice(0, 10),
        ethers.utils.id("getFractionalizedTokens(uint256)").slice(0, 10),
      ],
    },
  ];

  const diamondCut = await ethers.getContractAt("IDiamondCut", diamond.address);
  const tx = await diamondCut.diamondCut(cut, ethers.constants.AddressZero, "0x");
  await tx.wait();
  console.log("FractionalizerFacet registered with Diamond");
}

deployDiamond()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });