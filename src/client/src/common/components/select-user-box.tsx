import React, { useState } from 'react';

type User = {
  id: number;
  name: string;
  profileImage: string;
};

type SelectUserBoxProps = {
  user: User;
  onSelect: (user: User) => void;
  onDeselect: (user: User) => void;
};

const SelectUserBox = (props: SelectUserBoxProps) => {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`select-user-box${selected ? ' select-user-box--selected' : ''}`}
      onClick={() => {
        if (selected) {
          props.onDeselect(props.user);
          setSelected(!selected);
        } else {
          props.onSelect(props.user);
          setSelected(!selected);
        }
      }}
    >
      <div className="select-user-box__checkbox">
        <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.5508 1.53906L6.55078 12.5391L1.55078 7.53906"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="select-user-box__profile">
        <img src={props.user.profileImage} />
      </div>
      <p className="select-user-box__name">{props.user.name}</p>
    </div>
  );
};

export default SelectUserBox;
