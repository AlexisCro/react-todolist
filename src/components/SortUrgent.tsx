import { FC } from 'react';

type IProps = {
  onClick: () => void;
};

const SortUrgent: FC<IProps> = (props) => {
  const { onClick } = props;

  return (
    <div className='flex justify-center items-center'>
      <button
        className='bg-slate-300 hover:bg-slate-400 text-black font-bold py-2 px-4 rounded m-2 w-1/2'
        onClick={onClick}
      >
        Sort by urgent
      </button>
    </div>
  );
};

export { SortUrgent };