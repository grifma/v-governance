import "core-js/stable";
import "regenerator-runtime/runtime";
import Aragon, { events } from "@aragon/api";

const app = new Aragon();

app.store(
  async (state, { event }) => {
    const nextState = {
      ...state,
    };

    try {
      console.info(event);
      switch (event) {
        case "Transfer":
          return {
            ...nextState,
            totalSupply: await getTotalSupply(),
          };
        case "SetVICoinAddress":
          return {
            ...nextState,
            governedContractAddress: await getGovernedContractAddress(),
          };
        case "Increment":
          return { ...nextState, count: await getValue() };
        case "Decrement":
          return { ...nextState, count: await getValue() };
        case events.SYNC_STATUS_SYNCING:
          return { ...nextState, isSyncing: true };
        case events.SYNC_STATUS_SYNCED:
          return { ...nextState, isSyncing: false };
        default:
          return state;
      }
    } catch (err) {
      console.log(err);
    }
  },
  {
    init: initializeState(),
  }
);

/***********************
 *                     *
 *   Event Handlers    *
 *                     *
 ***********************/

function initializeState() {
  return async (cachedState) => {
    return {
      ...cachedState,
      count: await getValue(),
      name: await getName(),
      governedContractAddress: await getGovernedContractAddress(),
      totalSupply: await getTotalSupply(),
    };
  };
}

async function getValue() {
  // return parseInt(1);
  return parseInt(await app.call("value").toPromise(), 10);
}

async function getName() {
  // return "Name";
  return await app.call("name").toPromise();
}

async function getGovernedContractAddress() {
  // return "0x8401Eb5ff34cc943f096A32EF3d5113FEbE8D4Eb";
  // console.log("===getGovernedContractAddress===");
  // console.log(await app.call("viCoin").toPromise());
  return await app.call("viCoin").toPromise();
}

async function getTotalSupply() {
  return await app.call("totalSupply").toPromise();
}
