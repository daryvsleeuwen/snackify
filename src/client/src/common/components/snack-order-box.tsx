import React, { useContext, useState } from 'react';
import { OrderContext } from '../../pages/order/index';
import OrderAmountController from './order-amount-controller';

export type snackData = {
  id: number;
  name: string;
  image: string;
};

type SnackOrderBoxProps = {
  snack: snackData;
};

const SnackOrderBox = (props: SnackOrderBoxProps) => {
  const { addedSnacks, setAddedSnacks, totalSnacks, setTotalSnacks } = useContext(OrderContext);

  const removeSnack = () => {
    for (let i = 0; i < addedSnacks.length; i++) {
      const snack = addedSnacks[i];

      if (snack.id === props.snack.id) {
        const copy = [...addedSnacks];

        if (snack.hasOwnProperty('amount') && parseInt(snack['amount']) > 1) {
          copy[i].amount -= 1;
        } else {
          copy.splice(i, 1);
        }

        setAddedSnacks(copy);
        setTotalSnacks(totalSnacks - 1);
        return;
      }
    }
  };

  const addSnack = () => {
    const copy = [...addedSnacks];
    let total = 0;
    let i = null;

    addedSnacks.forEach((snack, index) => {
      total += snack.amount;

      if (props.snack.id === snack.id) {
        i = index;
      }
    });

    if (!(total >= 2)) {
      if (i === null) {
        setAddedSnacks([...copy, { ...props.snack, amount: 1 }]);
      } else {
        copy[i].amount += 1;
        setAddedSnacks(copy);
      }

      setTotalSnacks(total + 1);
    }
  };
  totalSnacks;

  return (
    <div className="snack-order-box">
      <div className="snack-order-box__image">
        <img src={props.snack.image} />
      </div>
      <div className="snack-order-box__order-controls">
        <p className="snack-order-box__snack-title">{props.snack.name}</p>
        <OrderAmountController
          type="wide"
          disabled={totalSnacks == 2}
          data={addedSnacks}
          onDecrement={removeSnack}
          onIncrement={addSnack}
        />
      </div>
    </div>
  );
};

export default SnackOrderBox;
