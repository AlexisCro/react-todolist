import { Button } from './components/Button';
import { Input } from './components/Input';
import { DeleteButton } from './components/DeleteButton';
import { EditButton } from './components/EditButton';
import { CheckBoxDone } from './components/CheckBoxDone';
import { CheckBoxUrgent } from './components/CheckBoxUrgent';
import { Dashboard } from './components/Dashboard';
import { useState } from 'react';

// TODO: Add date to tasks
// TODO: Add a filter to show only urgent tasks
// TODO: Sort tasks by date
// TODO: Sort tasks by urgent
// TODO: reorganize the layout
// TODO: Responsive design
// TODO: deploy to github pages

export type Task = {
  id: number;
  value: string;
  isDone: boolean;
  urgent: boolean;
};

function App() {
  const tasksList = JSON.parse(localStorage.getItem('tasks') || '[]');
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState<Array<Task>>(tasksList);
  const [id, setId] = useState(tasksList[tasksList.length - 1].id + 1);

  const saveLocalStorage = (tasks: Array<Task>) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  const addTodos = () => {
    const newTasks = [
      ...tasks,
      {
        value: inputValue,
        isDone: false,
        urgent: false,
        id: id,
      }
    ];

    setTasks(newTasks);
    setInputValue('');
    setId(id + 1);
    saveLocalStorage(newTasks);
  }

  const deleteTodo = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    saveLocalStorage(newTasks);
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
      saveLocalStorage(newTasks);
    }
  }

  const checkDone = (e) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newTasks = tasks.map((task, _i) => {
      task.isDone = task.id === parseInt(e.target.id) ? !task.isDone : task.isDone;
      return task;
    });

    setTasks(newTasks);
    saveLocalStorage(newTasks);
  };

  const checkUrgent = (e) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newTasks = tasks.map((task, _i) => {
      task.urgent = task.id === parseInt(e.target.id) ? !task.urgent : task.urgent;
      return task;
    });

    setTasks(newTasks);
    saveLocalStorage(newTasks);
  };

  const tasksFromLocalStorage = localStorage.getItem('tasks');
  const tasksToDo = JSON.parse(tasksFromLocalStorage || '[]').filter((task: Task) => !task.isDone);
  const tasksDone = JSON.parse(tasksFromLocalStorage || '[]').filter((task: Task) => task.isDone);

  return (
    <>
      <h1
        className="text-2xl font-bold text-center m-4"
      >
        My Todo List
      </h1>
      <div
        className='flex justify-center'>
        <Input
          placeholder='Add a task'
          type='text'
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <Button 
          onClick={() => { 
            addTodos();
          }}
          text='Add task'
        />
      </div>
      <div className='flex content-around justify-center w-full'>
        <div
          className='flex flex-col items-center justify-center w-1/2 m-2'
          style={{
            maxHeight: '50vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingTop: '3rem'
          }}
        >
          {tasksToDo.map((task, index) => (
            <div
              key={task.id}
              className='flex justify-between border-2 border-gray-300 p-2 m-2 rounded-lg w-full'
            >
              <span className='flex self-center'>{task.value}</span>
              <div className='flex justify-around items-center'>
                <label>✅</label>
                <CheckBoxDone
                  task={task}
                  key={task.id}
                  id={task.id.toString()}
                  onClick={(e) => {
                    checkDone(e);
                  }}
                />
                <label>🚨</label>
                <CheckBoxUrgent
                  task={task}
                  key={task.id}
                  id={task.id.toString()}
                  onClick={(e) => {
                    checkUrgent(e)
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
              <div
                className='flex flex-col items-center justify-center w-1/2 m-2'
                style={{
                  maxHeight: '50vh',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  paddingTop: '3rem'
                }}
              >
                {tasksDone.map((task, index) => (
                <div
                  key={index}
                  className='flex justify-between border-2 border-gray-300 p-2 m-2 rounded-lg w-full'
                >
                  <span className='flex self-center'>{task.value}</span>
                  <div className='flex justify-around items-center'>
                  <label>✅</label>
                  <CheckBoxDone
                    task={task}
                    onClick={(e) => {
                    checkDone(e);
                  }}
                />
                <label>🚨</label>
                <CheckBoxUrgent
                  task={task}
                  onClick={(e) => {
                    checkUrgent(e);
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
      </div>
      <Dashboard
        tasks={tasks}
      />
    </>
  )
}

export default App
