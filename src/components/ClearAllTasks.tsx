import { FC } from 'react';

type IProps = {
  onClick: () => void;
};

const ClearAllTasks: FC<IProps> = (props) => {
  const { onClick } = props;

  return (
    <div className='flex justify-center items-center'>
      <button
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2 w-1/2'
        onClick={onClick}
      >
        Clear all tasks
      </button>
    </div>
  );
};

export { ClearAllTasks };