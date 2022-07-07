import {Launch} from '../src/redux/launchListSlice';
import type {Order, NetworkResponse} from '../src/types';

export const fetchLaunches = async (
  limit: number,
  offset: number,
  order: Order,
  sort?: string,
  launchYear?: number,
): Promise<NetworkResponse<Launch[]>> => {
  let url = `https://api.spacexdata.com/v3/launches?&limit=${limit}&offset=${offset}&sort=${sort}&order=${order}`;
  if (launchYear) {
    url = url.concat(`&launch_year=${launchYear}`);
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const results = await response.json();
    return {
      kind: 'success',
      body: results,
    };
  } else {
    return {
      kind: 'failure',
    };
  }
};
