const MainContract = artifacts.require("NFTtheWorld");

module.exports = async function (deployer) {
	await deployer.deploy(MainContract);
};