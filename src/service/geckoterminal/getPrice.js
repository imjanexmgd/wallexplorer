import axios from 'axios';

const getPrice = async (network, ca, balance) => {
  try {
    const { data } = await axios.get(
      `https://api.geckoterminal.com/api/v2/simple/networks/${network}/token_price/${ca}`
    );
    const pricesUsd = data.data.attributes.token_prices[ca];
    if (!pricesUsd) {
      return 'No price at gecko';
    }
    const balanceInUsd = pricesUsd * balance.replace(/,/g, '');
    return `${balanceInUsd.toFixed(2)} $`;
  } catch (error) {
    throw error;
  }
};
export default getPrice;
