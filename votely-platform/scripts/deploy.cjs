const hre = require("hardhat");

async function main() {
  console.log("Deploying Voting contract...");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Get account balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Deploy the Voting contract
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  await voting.waitForDeployment();

  const contractAddress = await voting.getAddress();
  console.log("Voting contract deployed to:", contractAddress);
  console.log("Admin address:", deployer.address);

  // Verify deployment
  const admin = await voting.admin();
  const electionCount = await voting.electionCount();
  
  console.log("\nContract Info:");
  console.log("   Admin:", admin);
  console.log("   Election Count:", electionCount.toString());

  console.log("\nDeployment successful!");
  console.log("\nSave this contract address for your frontend:");
  console.log(`   NEXT_PUBLIC_VOTING_CONTRACT_ADDRESS=${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("[ERROR]:", error);
    process.exit(1);
  });
