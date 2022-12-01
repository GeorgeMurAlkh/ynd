import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

test('renders search input', () => {
  render(<Provider store={store}><App /></Provider>);
  const inputElement = screen.getByPlaceholderText(/Enter user name/i);
  expect(inputElement).toBeInTheDocument();
});

test('renders search button', () => {
  render(<Provider store={store}><App /></Provider>);
  const buttonElement = screen.getByText(/search/i);
  expect(buttonElement).toBeInTheDocument();
});
