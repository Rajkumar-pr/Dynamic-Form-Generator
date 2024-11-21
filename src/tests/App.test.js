import { render, screen, fireEvent } from '@testing-library/react';
import App from './App'; // Assuming App component is where JSON is entered

test('invalid JSON should show error message', async () => {
  render(<App />);

  const jsonEditor = screen.getByLabelText('Edit JSON Schema'); // Adjust label if necessary
  fireEvent.change(jsonEditor, { target: { value: '{"invalidJson' } });

  const errorMessage = await screen.findByText('Invalid JSON');
  expect(errorMessage).toBeInTheDocument();
});
