import axios from 'axios';
import * as cheerio from 'cheerio';

const getCustomTokenBase = async (ca, address) => {
  try {
    const { data } = await axios.get(`https://basescan.org/token/${ca}`, {
      params: {
        a: address,
      },
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.8',
        'sec-ch-ua':
          '"Chromium";v="124", "Brave";v="124", "Not-A.Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'sec-gpc': '1',
        'upgrade-insecure-requests': '1',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      },
    });
    const $ = cheerio.load(data);
    const tokenStr = $('#ContentPlaceHolder1_divFilteredHolderBalance')
      .text()
      .trim();
    const tokenName = $(
      '#content > div.container.py-3 > div > div.mb-3.mb-lg-0 > h1 > div > span'
    ).text();
    const tokenStrArr = tokenStr.split(' ');
    const tokenBalanceArr = [
      tokenStrArr[tokenStrArr.length - 2],
      tokenStrArr[tokenStrArr.length - 1],
    ];
    return {
      tokenName,
      contractAddress: ca,
      holder: address,
      balance: tokenBalanceArr.join(' '),
    };
  } catch (error) {
    throw error;
  }
};
export default getCustomTokenBase;
