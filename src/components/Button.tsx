import { FC } from 'react';

type IProps = {
  onClick: () => void;
  text: string;
};

const Button: FC<IProps> = (props) => {
  const { onClick, text } = props;

  return <>
    <button
      className='bg-cyan-500 rounded-lg p-1 m-2 w-24 text-white'
      onClick={onClick}
    >
      {text}
    </button>
  </>
};

// export default Button;
export { Button };