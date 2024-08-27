import { FC } from 'react';

type IProps = {
  onClick: () => void;
};

const CheckBox: FC<IProps> = (props) => {
  const { onClick } = props;

  return (
    <input
      type='checkbox'
      className='accent-cyan-500 m-2'
      style={{width: 20, height: 20}}
      onClick={onClick}
    />
  );
};

export { CheckBox };