import React from 'react';
import Cart from './cart';

type HeaderProps = {
  title: string;
  cart: boolean;
};

const Header = (props: HeaderProps) => {
  return (
    <div className="header">
      <div className="header__centerer grid">
        <p className="header__title">{props.title}</p>
        {!props.cart ? null : <Cart />}
      </div>
    </div>
  );
};

export default Header;
