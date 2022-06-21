import React from 'react';

type ButtonProps = {
  size: string;
  color: string;
  text: string;
  fill?: boolean;
  onClick: () => void;
};

const Button = (props: ButtonProps) => {
  return (
    <button className={`button button--${props.color}${props.fill ? ' button--flex' : ''}`} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
