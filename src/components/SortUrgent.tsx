import { FC } from 'react';

type IProps = {
  onClick: () => void;
};

const SortUrgent: FC<IProps> = (props) => {
  const { onClick } = props;

  return (
    <button
      className='bg-slate-300 hover:bg-slate-400 text-black font-bold py-2 px-4 rounded m-2'
      onClick={onClick}
    >
      Sort by urgent
    </button>
  );
};

export { SortUrgent };