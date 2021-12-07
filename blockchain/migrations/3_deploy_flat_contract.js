const FlatNFTtheWorld = artifacts.require("NFTtheWorld");

module.exports = async function (deployer) {
	await deployer.deploy(FlatNFTtheWorld);
};
