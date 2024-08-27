import { Button } from './components/Button';
import { Input } from './components/Input';
import { DeleteButton } from './components/DeleteButton';
import { EditButton } from './components/EditButton';
import { CheckBox } from './components/CheckBox';
import { Dashboard } from './components/Dashboard';
import { useState } from 'react';

export type Task = {
  value: string;
  isDone: boolean;
  urgent: boolean;
};

function App() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState<Array<Task>>([]);

  const addTodos = () => {
    const newTasks = [
      ...tasks,
      {
        value: inputValue,
        isDone: false,
      }
    ];

    setTasks(newTasks);
    setInputValue('');
  }

  const deleteTodo = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  const editTodo = (index: number) => {
    const newTask = prompt('Enter new task');
    if (newTask) {
      const newTasks = tasks.map((t, i) => {
        if (i === index) {
          t.value = newTask;
          return t;
        }
        return t;
      });
      setTasks(newTasks);
    }
  }

  return (
    <>
      <h1
        className="text-2xl font-bold text-center m-4"
      >
        My Todo List
      </h1>
      <div
        className='flex justify-center'>
        <Button 
          onClick={() => { 
            addTodos();
          }}
          text='Add task'
        />
        <Input
          placeholder='Add a task'
          type='text'
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
      <div
        className='flex flex-col items-center justify-center content-center'
      >
        {tasks.map((task, index) => (
          <div
            key={index}
            className='flex justify-between border-2 border-gray-300 p-2 m-2 rounded-lg w-5/6'
          >
            <span className='flex self-center'>{task.value}</span>
            <div className='flex justify-around items-center'>
              <label>✅</label>
              <CheckBox
                onClick={() => {
                  const newTasks = tasks.map((t, i) => {
                    t.isDone = i === index ? !t.isDone : t.isDone;
                    return t;
                  });
                  setTasks(newTasks);
                }}
              />
              <label>🚨</label>
              <CheckBox
                onClick={() => {
                  const newTasks = tasks.map((t, i) => {
                    t.urgent = i === index ? !t.urgent : t.urgent;
                    return t;
                  });
                  setTasks(newTasks);
                }}
              />
              <EditButton
                onClick={() => {
                  editTodo(index);
                }}
              />
              <DeleteButton
                onClick={() => {
                  deleteTodo(index);
                }}
                key={index}
              />
            </div>
          </div>
        ))}
      </div>
      <Dashboard
        tasks={tasks}
      />
    </>
  )
}

export default App
