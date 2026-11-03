export const getSubdomain = async (domain: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BE}/auth/slug/${domain}`, {
    headers: {
      accept: '*/*',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
    },
    body: null,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  });
  const data = await res.json();
  return data;
};
