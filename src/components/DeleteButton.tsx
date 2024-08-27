import { FC } from 'react';

type IProps = {
  onClick: () => void;
};

const DeleteButton: FC<IProps> = (props) => {
  const { onClick } = props;

  return (
    <button
      className='bg-red-500 rounded-lg p-1 m-2 w-24 text-white'
      onClick={onClick}
    >
      Delete
    </button>
  );
};

export { DeleteButton };