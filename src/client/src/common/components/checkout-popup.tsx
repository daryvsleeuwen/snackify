import React, { useContext, useEffect, useRef } from 'react';
import axios from '../api/axios';
import { OrderContext } from '../../pages/order';
import OrderAmountController from './order-amount-controller';
import Button from './button';

const CheckoutPopup = () => {
  const { addedSnacks, setAddedSnacks } = useContext(OrderContext);
  const { addedBuns, setAddedBuns } = useContext(OrderContext);
  const popup = useRef(null);

  useEffect(() => {
    if (popup.current.getBoundingClientRect().right > window.innerWidth) {
      popup.current.style.left = `-85%`;
    }

    // window.addEventListener('resize', () => {
    //   if (popup.current.getBoundingClientRect().right > window.innerWidth) {
    //     popup.current.style.left = `-85%`;
    //   }
    // });
  }, []);

  const removeBun = (bunType: string) => {
    addedBuns.every((bun, index) => {
      if (bun === bunType) {
        const copy = [...addedSnacks];
        copy.splice(index, 1);

        setAddedBuns(copy);
        return false;
      } else {
        return true;
      }
    });
  };

  const addBun = (bunType: string) => {
    setAddedBuns([...addedBuns, bunType]);
  };

  const renderNoSnacksText = () => {
    if (!(addedSnacks.length > 0)) {
      return <p className="checkout-popup__no-snacks">Nog geen snacks toegevoegd</p>;
    }

    return null;
  };

  const checkOutOrder = () => {
    console.log('Checkout order and route to finish page');
    const order = {};

    axios.post('/session/addorder', order).then((success) => {
      if (success) {
        window.location.href = '/order/finish';
      }
    });
  };

  return (
    <div className="checkout-popup" ref={popup}>
      <p className="checkout-popup__title">Snacks</p>
      {renderNoSnacksText()}
      {addedSnacks.map((snack, index) => {
        return (
          <div key={index} className="checkout-popup__order-row">
            <img src={snack.image} />
            <p className="checkout-popup__amount">1x</p>
          </div>
        );
      })}
      <div className="checkout-popup__seperation-line"></div>
      <p className="checkout-popup__title">Broodjes</p>
      <div className="checkout-popup__order-row">
        <img src="/images/white-bun.png" className="checkout-popup__order-row__bun-image" />
        {/* <Image src="/images/white-bun.png" width={70} height={70} layout="responsive" /> */}
        <OrderAmountController
          type="small"
          data={addedBuns}
          onDecrement={removeBun}
          onIncrement={addBun}
          callbackValue="white"
        />
      </div>
      <div className="checkout-popup__order-row">
        <img src="/images/brown-bun.png" className="checkout-popup__order-row__bun-image" />
        {/* <Image src="/images/white-bun.png" width={70} height={70} layout="responsive" /> */}
        <OrderAmountController
          type="small"
          data={addedBuns}
          onDecrement={removeBun}
          onIncrement={addBun}
          callbackValue="brown"
        />
      </div>
      <div className="checkout-popup__button-wrapper">
        <Button size="medium" color="red" text="Bestelling afronden" fill={true} onClick={checkOutOrder} />
      </div>
    </div>
  );
};

export default CheckoutPopup;
