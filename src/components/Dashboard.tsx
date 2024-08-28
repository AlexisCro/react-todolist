"use client"

import { FC } from 'react';
import { Task } from '../App';
import { BarChartComponent } from './ui/BarChart';
import { PieChartComponent } from './ui/PieChart';

type IProps = {
  tasks: Array<Task>;
}

const Dashboard: FC<IProps> = (props) => {
  const { tasks } = props;
  const totalTasks = tasks.length;

  const renderPercentage = () => {
    if (tasks.length > 0) {
      return (
        <p className='m-2'>Percent Completed : {tasks.filter(t => t.isDone).length * 100 / totalTasks} %</p>
      );
    }
  }

  const renderBarChart = () => {
    if (tasks.length > 0) {
      return (
        <BarChartComponent tasks={tasks} />
      );
    }
  }
  
  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold m-4'>Dashboard</h1>
        <div className='flex flex-col items-center justify-around'>
          <p className='m-2'>Total Tasks : {tasks.length}</p>
          <p className='m-2'>Completed Tasks : {tasks.filter(t => t.isDone).length}</p>
          {renderPercentage()}
          <div className='flex flex-row items-center justify-around m-3 grid md:grid-cols-2'>
            <PieChartComponent tasks={tasks} />
            {renderBarChart()}
          </div>
        </div>
      </div>
    </>
  );
}

export { Dashboard };