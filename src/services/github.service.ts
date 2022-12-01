import { NUMER_OF_USERS, NUMBER_OF_REPOS } from '../common/constants';

const BASE_URL = 'https://api.github.com';
const headers = {
  Accept: 'application/vnd.github+json'
};

export const searchUsers = (query: string) => {
  return fetch(
    `${BASE_URL}/search/users?q=${query}&per_page=${NUMER_OF_USERS}`,
    {headers}
  );
};

export const getUserRepos = (username: string) => {
  return fetch(
    `${BASE_URL}/users/${username}/repos?per_page=${NUMBER_OF_REPOS}`, 
    {headers}
  );
};