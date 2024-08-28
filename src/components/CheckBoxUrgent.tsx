import { FC, ChangeEventHandler } from 'react';
import { Task } from '../App';

type IProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
  task: Task;
};

const CheckBoxUrgent: FC<IProps> = (props) => {
  const { onChange, id, task } = props;

  return (
    <input
      type='checkbox'
      id={id}
      className='accent-cyan-500 m-2'
      style={{width: 20, height: 20}}
      onChange={onChange}
      defaultChecked={task.urgent}
      disabled={task.isDone}
    />
  );
};

export { CheckBoxUrgent };