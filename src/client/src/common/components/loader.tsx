import React from 'react';

type LoaderProps = {
  fullscreen?: boolean;
  text?: string;
};

const Loader = (props: LoaderProps) => {
  return (
    <div className={`loader${props.fullscreen === true ? ' loader--fullscreen' : ''}`}>
      <div className="loader__loading"></div>
      {props.text === null ? null : <p className="loader__text">{props.text}</p>}
    </div>
  );
};

export default Loader;
