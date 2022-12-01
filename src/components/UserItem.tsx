import { IUser } from '../models/user.model';
import ReposList from './ReposList';

interface UserItemProps {
  user: IUser,
  onClick: Function
}

const UserItem = ({ user, onClick }: UserItemProps) => {
  return (
    <>
        <li 
        className="list-group-item list-group-item-action text-break d-flex justify-content-between align-items-center p-2 custom-list-item"
        onClick={() => onClick()}>
        <div className="d-flex align-items-center">
          <div className="avatar-wrapper">
            <img src={user.avatar_url} alt="" className="rounded-circle avatar" />
          </div>
          <span className="login ms-2">{user.login}</span>
        </div>
        <i className={`bi m-1 bi-caret-down-fill ${user.isOpened && 'rotate'}`}></i>
      </li>
      <div className={`repos-list ${user.isOpened && 'expanded'}`}>
        {user.isOpened && !user.reposLoaded && <div className="spinner-border m-2"></div>}
        {user.isOpened && user.reposLoaded && !user.repos?.length && <h5 className="m-2">User don't have repositories :( </h5>}
        <ReposList repos={user.repos}/>
      </div>
    </>
  );
};

export default UserItem;
