import { FC } from 'react';
import { Task } from '../../App';
import { Bar, BarChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
} from "./chart";

type IProps = {
  tasks: Array<Task>;
}

const BarChartComponent: FC<IProps> = (props) => {
  const { tasks } = props;
  const totalTasks = tasks.length;

  const barChartData = [
    { name: "Tasks", urgent: tasks.filter(t => t.urgent).length, notUrgent: totalTasks - tasks.filter(t => t.urgent).length }
  ];

  const barChartConfig = {
    urgent: {
      label: "Urgent",
      color: "red",
    },
    notUrgent: {
      label: "Not Urgent",
      color: "blue",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer 
      config={barChartConfig}
      className="mx-2 aspect-square"
      style={{ 
        width: 250,
        height: 250,
      }}
    >
      <BarChart accessibilityLayer data={barChartData}>
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <Bar
          dataKey="urgent"
          stackId="a"
          fill="red"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="notUrgent"
          stackId="a"
          fill="blue"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
};

export { BarChartComponent };