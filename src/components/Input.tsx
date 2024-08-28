import { FC, ChangeEventHandler } from 'react';

type IProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  placeholder: string;
  type: 'text';
  autofocus: boolean;
  id: string;
};

const Input: FC<IProps> = (props) => {
  const { onChange, placeholder, value, autofocus, id } = props;

  return(
    <input
      id={id}
      autoFocus={autofocus}
      onChange={onChange}
      type='text'
      placeholder={placeholder}
      className='border-2 rounded-lg border-gray-300 p-2 m-2 w-80'
      value={value}
    />
  );
};

export { Input };