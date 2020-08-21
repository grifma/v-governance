const { assert } = require("chai");
const { assertRevert } = require("@aragon/contract-test-helpers/assertThrow");
const { newDao, newApp } = require("./helpers/dao");
const { setOpenPermission } = require("./helpers/permissions");
const VCommunityApp = artifacts.require("VCommunityApp.sol");
const VICoin = artifacts.require("VICoin.sol");

// Please deploy VICoin from /smart-contract directory
// TODO: Automate this process

/*

1. in /v-governance:

    `npx buidler node`

2. in /smart-contract

    `truffle migrate --network development`

3. Copy the contract address for VICoin onto line 69. 

    `viCoinAddress = "0x0078371BDeDE8aAc7DeBfFf451B74c5EDB385Af7"`

3. in v-governance

    `npx buidler test`
    or
    `npx buidler start`

*/

contract("VCommunityApp", ([appManager, user]) => {
  let appBase, app;
  let viCoinAddress = "0x0078371BDeDE8aAc7DeBfFf451B74c5EDB385Af7";

  before("deploy base app", async () => {
    // Deploy the app's base contract.
    appBase = await VCommunityApp.new(
      viCoinAddress,
      "V-gov for alpha -- app.test.js"
    );
    console.log("VCommunityApp");
    console.log(VCommunityApp);
    console.log("VICoin");
    console.log(viCoinAddress);
  });

  beforeEach("deploy dao and app", async () => {
    const { dao, acl } = await newDao(appManager);

    // Instantiate a proxy for the app, using the base contract as its logic implementation.
    const proxyAddress = await newApp(
      dao,
      "placeholder-app-name",
      appBase.address,
      appManager
    );
    app = await VCommunityApp.at(proxyAddress);

    // Set up the app's permissions.
    await setOpenPermission(
      acl,
      app.address,
      await app.VERIFYACCOUNT(),
      appManager
    );
    await setOpenPermission(
      acl,
      app.address,
      await app.UPDATECOMMUNITYCONTRIBUTIONACCOUNT(),
      appManager
    );
    await setOpenPermission(
      acl,
      app.address,
      await app.UPDATEGENERATIONAMOUNT(),
      appManager
    );
    await setOpenPermission(
      acl,
      app.address,
      await app.SETCOINADDRESS(),
      appManager
    );
    await setOpenPermission(
      acl,
      app.address,
      await app.UPDATELIFETIME(),
      appManager
    );
    await setOpenPermission(
      acl,
      app.address,
      await app.UPDATEGENERATIONPERIOD(),
      appManager
    );
    await setOpenPermission(
      acl,
      app.address,
      await app.UPDATEINITIALBALANCE(),
      appManager
    );
    await setOpenPermission(
      acl,
      app.address,
      await app.UPDATECONTROLLER(),
      appManager
    );
    await setOpenPermission(acl, app.address, await app.BLOWFUSE(), appManager);
    await setOpenPermission(
      acl,
      app.address,
      await app.UPDATECOMMUNITYCONTRIBUTION(),
      appManager
    );
    await setOpenPermission(
      acl,
      app.address,
      await app.UPDATETRANSACTIONFEE(),
      appManager
    );
    await setOpenPermission(
      acl,
      app.address,
      await app.TERMINATE(),
      appManager
    );

    // Initialize the app's proxy.
    await app.initialize(viCoin.address, "Initialized name -- app.test.js");
  });

  it("does nothing", async () => {
    console.log("does nothing");
  });

  // it("should be incremented by any address", async () => {
  //   await app.increment(1, { from: user });
  //   assert.equal(await app.value(), INIT_VALUE + 1);
  // });

  // it("should not be decremented beyond 0", async () => {
  //   await assertRevert(app.decrement(INIT_VALUE + 1));
  // });
});
