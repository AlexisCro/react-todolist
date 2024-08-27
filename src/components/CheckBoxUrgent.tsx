import { FC } from 'react';
import { Task } from '../App';

type IProps = {
  onClick: () => void;
  key: number;
  id: string;
  task: Task;
};

const CheckBoxUrgent: FC<IProps> = (props) => {
  const { onClick, key, id, task } = props;

  return (
    <input
      type='checkbox'
      key={key}
      id={id}
      className='accent-cyan-500 m-2'
      style={{width: 20, height: 20}}
      onClick={onClick}
      defaultChecked={task.urgent}
      disabled={task.isDone}
    />
  );
};

export { CheckBoxUrgent };