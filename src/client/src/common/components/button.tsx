import React from 'react';

type ButtonProps = {
  size: string;
  color: string;
  text: string;
  type?: 'submit' | 'button';
  fill?: boolean;
  onClick?: () => void;
};

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type !== undefined ? props.type : 'button'}
      className={`button button--${props.size} button--${props.color}${props.fill ? ' button--flex' : ''}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
