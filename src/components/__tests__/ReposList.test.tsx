import { render, screen, cleanup } from '@testing-library/react';
import ReposList from '../ReposList';
import renderer from 'react-test-renderer';
import { IRepo } from '../../models/repo.model';

const repos: IRepo[] = [
  {
    id: 1,
    name: 'somelogin',
    stargazers_count: 434,
    description: 'some desc',
    html_url: 'idefinatelyshouldmockthisdata:)'
  }
];

afterEach(() => {
  cleanup();
});

test('should render todo component', () => {
  render(<ReposList repos={repos}></ReposList>);
  const element = screen.getByTestId('item-0');
  expect(element).toBeInTheDocument();
});

test('matches snapshot', () => {
  const tree = renderer.create(<ReposList repos={repos}></ReposList>);
  expect(tree).toMatchSnapshot();
});