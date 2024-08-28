import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { expect, test } from 'vitest';
import React from 'react';

test('renders Todo', async () => {
  render(<App />);
  const user = userEvent.setup();
  const input = screen.getByPlaceholderText('Add a task');
  const button = screen.getByText('Add task');

  // Create a task
  await user.type(input, 'Buy milk');
  await user.click(button);

  // Check if the task is rendered
  const listTodo = screen.getByTestId('task-0');

  expect(listTodo.textContent).toBe('Buy milk');
});