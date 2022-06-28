import React, { useContext, useEffect, useRef } from 'react';
import axios from '../api/axios';
import { OrderContext } from '../../pages/order/index';
import OrderAmountController from './order-amount-controller';
import Button from './button';

const CheckoutPopup = () => {
  const { addedBuns, setAddedBuns, addedSnacks } = useContext(OrderContext);
  const popup = useRef(null);

  useEffect(() => {
    if (popup.current.getBoundingClientRect().right > window.innerWidth) {
      popup.current.style.left = `-70%`;
    }
  }, []);

  const removeBun = (bunType: string) => {
    for (let i = 0; i < addedBuns.length; i++) {
      if (addedBuns[i] === bunType) {
        const copy = [...addedSnacks];
        copy.splice(i, 1);

        setAddedBuns(copy);
        break;
      }
    }
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
    let whiteBuns = 0;
    let brownBuns = 0;

    addedBuns.forEach((bun) => {
      bun === 'white' ? whiteBuns++ : brownBuns++;
    });

    const snackIds = addedSnacks.map((snack) => {
      return { id: snack.id };
    });

    const order = {
      snacks: snackIds,
      whiteBuns: whiteBuns,
      brownBuns: brownBuns,
    };

    axios.post('/session/addorder', order).then((response) => {
      if (response.data) {
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
