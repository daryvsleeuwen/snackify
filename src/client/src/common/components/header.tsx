import React, { useContext } from 'react';
import { ShoppingCart } from 'react-feather';
import CheckoutPopup from './checkout-popup';
import { OrderContext } from '../../pages/order';

type HeaderProps = {
  title: string;
};

const Header = (props: HeaderProps) => {
  const { addedSnacks } = useContext(OrderContext);

  return (
    <div className="header">
      <div className="header__centerer grid">
        <p className="header__title">{props.title}</p>
        <div className="checkout-cart">
          <div className="checkout-cart__wrapper">
            <div className="checkout-cart__icon">
              <ShoppingCart size={32} />
            </div>
            <p className="checkout-cart__amount">{addedSnacks.length}</p>
          </div>
          <CheckoutPopup />
        </div>
      </div>
    </div>
  );
};

export default Header;
