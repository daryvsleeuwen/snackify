import React from 'react';

type InputProps = {
  type?: string;
  label: string;
  placeholder: string;
  margin?: boolean;
  onChange: (value: string) => void;
};

const Input = (props: InputProps) => {
  return (
    <div className={`input__wrapper${props.margin ? ' input__wrapper--margin' : ''}`}>
      <label>{props.label}</label>
      <input
        type={props.type !== null ? props.type : 'text'}
        placeholder={props.placeholder}
        onChange={(event) => {
          props.onChange(event.target.value);
        }}
      />
    </div>
  );
};

export default Input;
