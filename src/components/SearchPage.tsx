import {
  selectUsers,
  selectUsersStatus,
  selectUsersError,
  toggleUserTab, 
  searchUsersAsync,
  getUserReposAsync
} from '../store/usersSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { FormEvent, useState } from 'react';
import { IUser } from '../models/user.model';
import UserItem from './UserItem';

const SearchPage = () => {
  // Using Redux just for fun :) It would be better to just use State instead
  const users = useAppSelector(selectUsers);
  const status = useAppSelector(selectUsersStatus);
  const error = useAppSelector(selectUsersError);
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    dispatch(searchUsersAsync(searchValue));
  };
  const handleUserToggle = (index: number, user: IUser) => {
    if (!user.reposLoaded) {
      dispatch(getUserReposAsync({login: user.login, index}));
    }
    dispatch(toggleUserTab(index));
  };
  return (
    <div className="row justify-content-center">
      <div className="col-11 col-md-8 col-lg-6 mt-2">
        <form onSubmit={handleSearch} className="row d-grid gap-2 form-group">
          <input 
            className="form-control"
            type="text" 
            placeholder="Enter user name"
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)} 
          />
          <button 
            type="submit"
            disabled={!searchValue.length || status === 'loading'} className="btn btn-lg btn-primary">
            Search
          </button>
        </form>
        <div className="row mt-2 justify-content-center">
          {status === 'loading' && <div className="spinner-border"></div>}
          {status === 'failed' && error && <div><h2>Ouch! Error!</h2><p>{error}</p></div>}
          {status === 'idle' && !users?.length && <h4>Users not found. Sorry :( </h4> }
          {status === 'idle' && !!users?.length &&
            <ul className="list-group p-0">
              {users.map((user, index) => 
                <UserItem 
                key={user.login}
                user={user} 
                onClick={() => handleUserToggle(index, user)} />)
              }
            </ul>
          }
        </div>

      </div>
    </div>
  );
};

export default SearchPage;
