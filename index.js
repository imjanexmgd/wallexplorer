import fs from 'fs';
import getCustomTokenBase from './src/service/base/getTokenBalance.js';
import getBaseBalance from './src/service/base/basescan.js';
import getPrice from './src/service/geckoterminal/getPrice.js';
const addressFile = fs.readFileSync('address.txt', 'utf-8').replace(/\r/g, '');
const addressArr = addressFile.split('\n');
const caFile = fs.readFileSync('ca.txt', 'utf-8').replace(/\r/g, '');
const caArr = caFile.split('\n');

let table = {};
class tabular {
  constructor(holder, ca, balance, value) {
    this.holder = holder;
    this.ca = ca;
    this.balance = balance;
    this.value = value;
  }
}
let tableEth = {};
class tabularEth {
  constructor(holder, balance) {
    this.holder = holder;
    this.balance = balance;
  }
}
let index = 1;
let i = 1;
const baseNetwork = async () => {
  try {
    console.log(`Base Network`);
    for (const address of addressArr) {
      const baseBalance = await getBaseBalance(address);
      tableEth[i] = new tabularEth(address, baseBalance);
      for (const ca of caArr) {
        const cTokenBalance = await getCustomTokenBase(ca, address);
        const { holder, contractAddress, tokenName, balance } = cTokenBalance;
        const tokenBalance = balance.split(' ')[0];
        const value = await getPrice('base', ca, tokenBalance);
        table[index] = new tabular(holder, contractAddress, balance, value);
        index++;
      }
      i++;
    }
    console.log();
    console.log();
    console.table(tableEth);
    console.table(table);
    table = {};
    tableEth = {};
    i = 1;
    index = 1;
  } catch (error) {
    console.log(error);
  }
};
(async () => {
  try {
    process.stdout.write('\x1Bc');
    await baseNetwork();
  } catch (error) {
    console.log(error);
  }
})();
