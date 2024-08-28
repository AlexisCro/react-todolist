import { Button } from './components/Button';
import { Input } from './components/Input';
import { DeleteButton } from './components/DeleteButton';
import { EditButton } from './components/EditButton';
import { CheckBoxDone } from './components/CheckBoxDone';
import { CheckBoxUrgent } from './components/CheckBoxUrgent';
import { Dashboard } from './components/Dashboard';
import { ShowOnlyUrgent } from './components/ShowOnlyUrgent';
import { ClearAllTasks } from './components/ClearAllTasks';
import { SortUrgent } from './components/SortUrgent';
import { ChangeEvent, useState } from 'react';

// TODO: reorganize the layout
// TODO: Responsive design
// TODO: Spec
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
  const [tasksTodo, setTasksTodo] = useState<Array<Task>>(tasksList.filter((task: Task) => !task.isDone));
  const [tasksDone, setTasksDone] = useState<Array<Task>>(tasksList.filter((task: Task) => task.isDone));

  let lastTaskId;
  if (tasksList.length === 0) {
    lastTaskId = 0;
  } else {
    lastTaskId = tasksList[tasksList.length - 1].id;
  }
  const [id, setId] = useState(lastTaskId + 1);

  const saveLocalStorage = (tasks: Array<Task>) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  const updateUseStates = (tasks: Array<Task>) => {
    setTasks(tasks);
    setTasksDone(tasks.filter((task: Task) => task.isDone));
    setTasksTodo(tasks.filter((task: Task) => !task.isDone));
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

    updateUseStates(newTasks);
    setInputValue('');
    setId(id + 1);
    saveLocalStorage(newTasks);
    document.getElementById('input')?.focus();
  }

  const deleteTodo = (id: number) => {
    const newTasks = tasksList.filter((task: Task) => task.id !== id);
    
    updateUseStates(newTasks);
    saveLocalStorage(newTasks);
  }

  const editTodo = (id: number) => {
    const index = tasksList.findIndex((task: Task) => task.id === id);
    const newTasks = tasksList;
    const newTask = prompt('Enter new task', newTasks[index].value);
    if (newTask) {
      // Find task from local storage with id
      newTasks[index].value = newTask;
      
      updateUseStates(newTasks);
      saveLocalStorage(newTasks);
    }
  }

  const checkDone = (e: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newTasks = tasks.map((task, _i) => {
      task.isDone = task.id === parseInt(e.target.id) ? !task.isDone : task.isDone;
      return task;
    });

    updateUseStates(newTasks);
    saveLocalStorage(newTasks);
  };

  const checkUrgent = (e: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newTasks = tasks.map((task, _i) => {
      task.urgent = task.id === parseInt(e.target.id) ? !task.urgent : task.urgent;
      return task;
    });

    updateUseStates(newTasks);
    saveLocalStorage(newTasks);
  };

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
          id="input"
          autofocus={true}
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
      <div
        className='flex justify-around grid md:grid-cols-3'
      >
        <ShowOnlyUrgent
          onChange={(e) => {
            if (e.target.checked) {
              setTasksTodo(tasksTodo.filter((task: Task) => task.urgent));
            } else {
              setTasksTodo(tasksList.filter((task: Task) => !task.isDone));
            }
            setTasks(tasksTodo);
          }}
        />
        <SortUrgent
          onClick={() => {
            const sortedTasks = tasksList.sort((a: Task, b: Task) => {
              return a.urgent === b.urgent ? 0 : a.urgent ? -1 : 1;
            });
            updateUseStates(sortedTasks);
            saveLocalStorage(sortedTasks);
          }}
        />
        <ClearAllTasks
          onClick={() => {
            if (window.confirm('Are you sure you want to delete all tasks?')) {
              updateUseStates([]);
              saveLocalStorage([]);
            }
          }}
        />
      </div>
      <div className='flex text-center justify-center w-full grid md:grid-cols-2'>
        <div className='w-full flex flex-column'>
          <div
            data-testid='todo'
            className='flex flex-col items-center justify-start m-2 w-full'
            style={{
              maxHeight: '50vh',
              overflowY: 'auto',
              overflowX: 'hidden',
              paddingTop: '3rem'
            }}
          >
            <p className='text-xl font-semibold'>To Do</p>
            {tasksTodo.map((task, index) => (
              <div
                key={task.id}
                className='flex justify-between border-2 border-gray-300 p-2 my-2 rounded-lg w-full'
              >
                <div className='text-wrap w-80'>
                  <span 
                    data-testid={`task-${index}`}
                    className='flex self-center'
                  >
                    {task.value}  
                  </span>                
                </div>

                
                <div className='flex justify-around items-center'>
                  <label>✅</label>
                  <CheckBoxDone
                    task={task}
                    id={task.id.toString()}
                    onChange={(e) => {
                      checkDone(e);
                    }}
                  />
                  <label>🚨</label>
                  <CheckBoxUrgent
                    task={task}
                    id={task.id.toString()}
                    onChange={(e) => {
                      checkUrgent(e)
                    }}
                  />
                  <EditButton
                    onClick={() => {
                      editTodo(task.id);
                    }}
                  />
                  <DeleteButton
                    onClick={() => {
                      deleteTodo(task.id);
                      }}
                    />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='w-full flex flex-column justify-start'>
          <div
            className='flex flex-col items-center justify-start m-2 w-full'
            style={{
              maxHeight: '50vh',
              overflowY: 'auto',
              overflowX: 'hidden',
              paddingTop: '3rem'
            }}
          >
            <p className='text-xl font-semibold'>Done</p>
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {tasksDone.map((task, _index) => (
              <div
                key={task.id}
                className='flex justify-between border-2 border-gray-300 p-2 m-2 rounded-lg w-full'
              >
                <div className='text-wrap'>
                  <span className='flex self-center'>{task.value}</span>
                </div>
                <div className='flex justify-around items-center'>
                <label>✅</label>
                <CheckBoxDone
                  task={task}
                  id={task.id.toString()}
                  onChange={(e) => {
                    checkDone(e);
                  }}
                />
                <label>🚨</label>
                <CheckBoxUrgent
                  id={task.id.toString()}
                  task={task}
                  onChange={(e) => {
                    checkUrgent(e);
                  }}
                />
                <DeleteButton
                  onClick={() => {
                    deleteTodo(task.id);
                  }}
                />
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
      <Dashboard
        tasks={tasksList}
      />
    </>
  )
}

export default App;
