import { getByLabelText, render, screen } from '@testing-library/react';
import App from './App';

test('renders page properly', () => {
  render(<App />);
  const headerElement = screen.getByText('Never miss out again!');
  expect(headerElement).toBeInTheDocument();
});
