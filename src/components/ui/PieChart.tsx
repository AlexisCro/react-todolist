import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";

import { Label, Pie, PieChart } from "recharts";
import { FC } from 'react';
import { Task } from '../../App';

type IProps = {
  tasks: Array<Task>;
}

const PieChartComponent: FC<IProps> = (props) => {
  const { tasks } = props;
  const totalTasks = tasks.length;

  const chartData = [
    { name: "Completed", value: tasks.filter(t => t.isDone).length, fill: "green" },
    { name: "Remaining", value: tasks.length - tasks.filter(t => t.isDone).length, fill: "orange" },
  ];
  
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
    <ChartContainer
      config={chartConfig}
      className="mx-2 aspect-square"
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
  )
};

export { PieChartComponent };