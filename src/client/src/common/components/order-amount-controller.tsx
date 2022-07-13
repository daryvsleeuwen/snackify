import React, { useState } from 'react';

type OrderAmountControllerProps = {
  type: string;
  disabled: boolean;
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
    if (!props.disabled) {
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
          props.disabled ? ' order-amount-controller__incrementer--disabled' : ''
        }`}
        onClick={increment}
      >
        +
      </div>
    </div>
  );
};

export default OrderAmountController;
