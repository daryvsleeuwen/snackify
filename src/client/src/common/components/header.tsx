import React from 'react';

type HeaderProps = {
  title: string;
};

const Header = (props: HeaderProps) => {
  return (
    <div className="header">
      <div className="header__centerer grid">
        <p className="header__title">{props.title}</p>
        <div className="checkout-cart">
          {/* <FeatherIcon icon="cart" size={24} /> */}
          <img src="" alt="" className="checkout-cart__icon" />
          <p className="checkout-cart__amount">0</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
