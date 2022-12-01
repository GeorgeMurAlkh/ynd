import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { searchUsers, getUserRepos } from '../services/github.service';
import { IUser } from '../models/user.model';
import { IRepo } from '../models/repo.model';

export interface UsersState {
  list: IUser[],
  status: 'fresh' | 'idle' | 'loading' | 'failed',
  error: string | null
};

export interface UserReposResponse {
  index: number,
  repos: IRepo[]
};

const initialState: UsersState = {
  list: [],
  status: 'fresh',
  error: null
};

export const searchUsersAsync = createAsyncThunk(
  'users/searchUsers',
  async (query: string) => {
    const response = await searchUsers(query);
    const result = await response.json();
    return result.items as IUser[];
  }
);

export const getUserReposAsync = createAsyncThunk(
  'users/getUserRepos',
  async ({login, index}: {login: string, index: number}) => {
    const response = await getUserRepos(login);
    const repos = await response.json() as IRepo[];
    return {
      index, repos
    } as UserReposResponse;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleUserTab: (state, action: PayloadAction<number>) => {
      // payload - user index
      state.list[action.payload].isOpened = !state.list[action.payload].isOpened; 
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(searchUsersAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(searchUsersAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.list = action.payload;
    })
    .addCase(searchUsersAsync.rejected, (state, action) => {
      state.status = 'failed';
      const error = action.payload;
      if (error instanceof Error) {
        state.error = error.message;
      } else {
        state.error = String(error);
      }
    })
    .addCase(getUserReposAsync.fulfilled, (state, action) => {
      state.list[action.payload.index].reposLoaded = true;
      state.list[action.payload.index].repos = action.payload.repos;
    });
  }
});

export const { toggleUserTab } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.list;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;
export default  usersSlice.reducer;
