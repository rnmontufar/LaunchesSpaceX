import {combineReducers, configureStore} from '@reduxjs/toolkit';
import launchListSlice from './launchListSlice';

const rootReducer = combineReducers({
  launchList: launchListSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
