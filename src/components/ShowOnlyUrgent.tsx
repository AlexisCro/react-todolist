import { FC, ChangeEventHandler } from 'react';

type IProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const ShowOnlyUrgent: FC<IProps> = (props) => {
  const { onChange } = props;

  return (
    <div>
      <label>Show only urgent tasks</label>
      <input
        type='checkbox'
        style={{width: 20, height: 20}}
        className='accent-red-500 m-2'
        onChange={onChange}
      />
    </div>
  );
};

export { ShowOnlyUrgent };