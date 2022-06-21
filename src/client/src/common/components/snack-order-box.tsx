import React, { useContext } from 'react';
import { OrderContext } from '../../pages/order';
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
  const { addedSnacks, setAddedSnacks } = useContext(OrderContext);

  const removeSnack = () => {
    addedSnacks.every((snack, index) => {
      if (snack.id === props.snack.id) {
        const copy = [...addedSnacks];
        copy.splice(index, 1);

        setAddedSnacks(copy);
        return false;
      } else {
        return true;
      }
    });
  };

  const addSnack = () => {
    setAddedSnacks([...addedSnacks, props.snack]);
  };

  return (
    <div className="snack-order-box">
      <div className="snack-order-box__image">
        <img src={props.snack.image} />
      </div>
      <div className="snack-order-box__order-controls">
        <p className="snack-order-box__snack-title">{props.snack.name}</p>
        <OrderAmountController
          type="wide"
          max={2}
          data={addedSnacks}
          onDecrement={removeSnack}
          onIncrement={addSnack}
        />
      </div>
    </div>
  );
};

export default SnackOrderBox;
