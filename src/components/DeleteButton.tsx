import { FC } from 'react';

type IProps = {
  onClick: () => void;
};

const DeleteButton: FC<IProps> = (props) => {
  const { onClick } = props;

  return (
    <button
      className='bg-red-500 rounded-lg p-1 m-2 w-10 text-white'
      onClick={onClick}
    >
      &#128465;
    </button>
  );
};

export { DeleteButton };