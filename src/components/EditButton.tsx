import { FC } from 'react';

type IProps = {
  onClick: () => void;
};

const EditButton: FC<IProps> = (props) => {
  const { onClick } = props;

  return (
    <button
      className='bg-yellow-500 rounded-lg p-1 m-2 w-24 text-white'
      onClick={onClick}
    >
      Edit
    </button>
  );
};

export { EditButton };