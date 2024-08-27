"use client"

import { FC } from 'react';
import { Task } from '../App';
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";

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

  const chartData = [
    { name: "Completed", value: tasks.filter(t => t.isDone).length, fill: "green" },
    { name: "Remaining", value: tasks.length - tasks.filter(t => t.isDone).length, fill: "orange" },
  ];

  console.log(chartData);

  const chartConfig = {
    tasks: {
      label: "Tasks",
    },
    completed: {
      label: "Completed",
      color: "green",
    },
    remaining: {
      label: "Remaining",
      color: "orange",
    },
  } satisfies ChartConfig;

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold m-4'>Dashboard</h1>
        <div className='flex flex-col items-center justify-around'>
          <p className='m-2'>Total Tasks : {tasks.length}</p>
          <p className='m-2'>Completed Tasks : {tasks.filter(t => t.isDone).length}</p>
          {renderPercentage()}
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square"
            style={{ 
              width: 250,
              height: 250,
            }}
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalTasks.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Tasks
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </div>
    </>
  );
}

export { Dashboard };