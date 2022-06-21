import React, { useContext, useState } from 'react';
import { OrderContext } from '../../pages/order';

type OrderAmountControllerProps = {
  type: string;
  max?: number;
  data: any;
  onDecrement: (value: any) => void;
  onIncrement: (value: any) => void;
  callbackValue?: any;
};

const OrderAmountController = (props: OrderAmountControllerProps) => {
  const [amount, setAmount] = useState(0);

  const decrement = () => {
    if (amount > 0) {
      setAmount(amount - 1);
      props.onDecrement(props.callbackValue);
    }
  };

  const increment = () => {
    if (typeof props.max === 'number') {
      if (!(props.data.length + 1 > props.max)) {
        setAmount(amount + 1);
        props.onIncrement(props.callbackValue);
      }
    } else {
      setAmount(amount + 1);
      props.onIncrement(props.callbackValue);
    }
  };

  return (
    <div className={`order-amount-controller order-amount-controller--${props.type}`}>
      <div className="order-amount-controller__decrementer" onClick={decrement}>
        -
      </div>
      <div className="order-amount-controller__amount">{amount}</div>
      <div
        className={`order-amount-controller__incrementer${
          props.data.length == props.max ? ' order-amount-controller__incrementer--disabled' : ''
        }`}
        onClick={increment}
      >
        +
      </div>
    </div>
  );
};

export default OrderAmountController;
