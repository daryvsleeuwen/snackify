import React from 'react';

type ButtonProps = {
  size: string;
  color: string;
  text: string;
  type?: string;
  fill?: boolean;
  onClick: () => void;
};

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type !== null ? props.type : 'text'}
      className={`button button--${props.size} button--${props.color}${props.fill ? ' button--flex' : ''}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
