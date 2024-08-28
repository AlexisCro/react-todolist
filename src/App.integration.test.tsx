import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { expect, test } from 'vitest';

test('renders Todo', () => {
  render(<App />);
  const user = userEvent.setup();
  const input = screen.getByPlaceholderText('Add a task');
  const button = screen.getByText('Add task');

  // Create a task
  user.type(input, 'Buy milk');
  user.click(button);
  localStorage.setItem('tasks', JSON.stringify([{ value: 'Buy milk', isDone: false, urgent: false, id: 0 }]));
  screen.logTestingPlaygroundURL();
  console.log(localStorage)

  // Check if the task is rendered
  const listTodo = screen.getByTestId('task-0');
  //console.log(screen.getByTestId('todo'))

  //expect(listTodo.textContent).toBe('Buy milk');
});