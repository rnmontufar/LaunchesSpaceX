import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiClient from '../../api/apiClient';
import type {Order} from '../types';

export type Launch = {
  flight_number: number;
  mission_name: string;
  launch_year: number;
  launch_date_utc: string;
  rocket: {
    rocket_name: string;
  };
};

export type LaunchListState = {
  launches: Launch[];
  loading: boolean;
  error: boolean;
  nextPage: number;
};

const initialState: LaunchListState = {
  launches: [],
  loading: false,
  error: true,
  nextPage: 1,
};

export const fetchLaunches = createAsyncThunk<
  {launches: Launch[]},
  {page: number; order: Order; sort?: string; launchYear?: number}
>('fetchLaunches', async ({page, sort, order, launchYear}) => {
  const limit = 50;
  const offset = limit * (page - 1);
  const response = await apiClient.fetchLaunches(
    limit,
    offset,
    order,
    sort,
    launchYear,
  );
  if (response.kind === 'success') {
    return {
      launches: response.body ?? [],
    };
  } else {
    throw 'Error fetching launches';
  }
});

const launchListSlice = createSlice({
  name: 'launchList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLaunches.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.nextPage += 1;
        //state.launches = state.launches.concat(action.payload.launches);
        state.launches = action.payload.launches;
        state.loading = false;
      })
      .addCase(fetchLaunches.rejected, state => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default launchListSlice.reducer;
