import { FC } from 'react';

type IProps = {
  onClick: () => void;
};

const ShowOnlyUrgent: FC<IProps> = (props) => {
  const { onClick } = props;

  return (
    <div>
      <label>Show only urgent tasks</label>
      <input
        type='checkbox'
        style={{width: 20, height: 20}}
        className='accent-red-500 m-2'
        onClick={onClick}
      />
    </div>
  );
};

export { ShowOnlyUrgent };