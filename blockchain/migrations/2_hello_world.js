const HelloWorld = artifacts.require("HelloWorld");

module.exports = async function (deployer) {
  await deployer.deploy(HelloWorld);
};
