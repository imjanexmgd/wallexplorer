import axios from 'axios';
import * as cheerio from 'cheerio';

const getBaseBalance = async (address) => {
  try {
    if (!address) {
      throw new Error('No address at request');
    }
    const { data } = await axios.get(
      `https://basescan.org/address/${address}`,
      {
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'accept-language': 'en-US,en;q=0.6',
          'cache-control': 'max-age=0',
          cookie:
            'ASP.NET_SessionId=bl20we1dzbx0ejddunr5ky01; __cflb=0H28vtoAdHDLg8sTeQQMiRCFaG8m9KqobPZFDXsW41r',
          priority: 'u=0, i',
          'sec-ch-ua':
            '"Chromium";v="124", "Brave";v="124", "Not-A.Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'none',
          'sec-fetch-user': '?1',
          'sec-gpc': '1',
          'upgrade-insecure-requests': '1',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        },
      }
    );
    const $ = cheerio.load(data);
    const balance = $(
      '#ContentPlaceHolder1_divSummary > div.row.mb-4 > div.col-md-6.mb-3.mb-md-0 > div > div.card-body > div:nth-child(1) > div.col-md-8'
    ).text();
    if (!balance) {
      throw new Error('cant get balance');
    }
    return balance;
  } catch (error) {
    throw error;
  }
};

export default getBaseBalance;
