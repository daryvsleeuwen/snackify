import React, { useContext, useEffect, useRef } from 'react';
import { ShoppingCart } from 'react-feather';
import CheckoutPopup from './checkout-popup';
import { OrderContext } from '../../pages/order/index';

type HeaderProps = {
  title: string;
};

const Header = (props: HeaderProps) => {
  const { addedSnacks } = useContext(OrderContext);
  const checkoutCart = useRef(null);
  const checkoutPopupWrapper = useRef(null);

  useEffect(() => {
    let popupHovered = false;

    checkoutCart.current.addEventListener('mouseenter', () => {
      checkoutCart.current.classList.add('checkout-cart--active');
    });

    checkoutCart.current.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!popupHovered) {
          checkoutCart.current.classList.remove('checkout-cart--active');
        }
      }, 100);
    });

    checkoutCart.current.addEventListener('mouseenter', () => {
      popupHovered = true;
    });

    checkoutCart.current.addEventListener('mouseleave', () => {
      popupHovered = false;
    });
  }, []);

  return (
    <div className="header">
      <div className="header__centerer grid">
        <p className="header__title">{props.title}</p>
        <div ref={checkoutCart} className="checkout-cart">
          <div className="checkout-cart__wrapper">
            <div className="checkout-cart__icon">
              <ShoppingCart size={32} />
            </div>
            <p className="checkout-cart__amount">{addedSnacks.length}</p>
          </div>
          <div ref={checkoutPopupWrapper} className="checkout-popup__wrapper">
            <CheckoutPopup />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
