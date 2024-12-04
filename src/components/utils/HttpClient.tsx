import { NewsResponse } from '../types/NewsType';

const BASE_URL = 'https://saurav.tech/NewsAPI';

export function getData(url: string): Promise<NewsResponse> {
  return fetch(BASE_URL + url + '.json').then(res => {
    if (!res.ok) {
      throw new Error('Something went wrong');
    }

    return res.json();
  });
}
