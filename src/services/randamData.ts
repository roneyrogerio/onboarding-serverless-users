import axios from 'axios';

import { tError } from '../model/contract';

type tRandomResult = { results: Array<{
    phone: string,
    picture: {
        large: string,
        medium: string,
        thumbnail: string
    },
    location: {
      coordinates: {
          latitude: string,
          longitude: string
      },
    }
  }> };

export async function getRandomData(): Promise<{data: tRandomResult | null, error: tError | null}> {
  try {
    const { data } = await axios.get<tRandomResult>(
      'https://randomuser.me/api/',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    return { data, error: null };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('error while getting random data. detail: ', error.message);
      return { data: null, error: { code: 500, detail: error.message }};
    }
    console.error('unexpected error while getting random data. detail:', error);
    return { data: null, error: { code: 500, detail: 'An unexpected error occurred' }};
  }
}
