import usersReducer, {
  UsersState,
  toggleUserTab,
} from './usersSlice';

import users from '../mock/users.mock.json';
import repos from '../mock/repos.mock.json';
import { IUser } from '../models/user.model';

describe('counter reducer', () => {
  it('should handle initial state', () => {
    const initialState: UsersState = {
      list: [],
      status: 'fresh',
      error: null
    };
    expect(usersReducer(undefined, { type: 'unknown' })).toEqual({
      list: [],
      status: 'fresh',
      error: null
    });
  });

  it('should toggle user', () => {
    const initialState: UsersState = {
      list: users,
      status: 'fresh',
      error: null
    };
    const actual = usersReducer(initialState, toggleUserTab(0));
    expect(actual.list[0].isOpened).toEqual(true);
  });
});
