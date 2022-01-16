const TokenFactory = artifacts.require("TokenContractFactory");

module.exports = async function (deployer) {
	await deployer.deploy(TokenFactory);
};
