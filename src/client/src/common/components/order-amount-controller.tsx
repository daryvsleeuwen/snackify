import React, { useContext, useState } from 'react';
import { OrderContext } from '../../pages/order';
import snackData from './snack-order-box';

type OrderAmountControllerProps = {
  type: string;
  snack: typeof snackData
};

const OrderAmountController = (props: OrderAmountControllerProps) => {
  const { addedSnacks, setAddedSnacks } = useContext(OrderContext);
  const [amount, setAmount] = useState(0);

  const removeSnack = () => {
    if(amount > 0){
      addedSnacks.forEach((snack, index) => {        
        if (snack.id === props.snack.id) {
          const copy = addedSnacks;
          copy.splice(index, 1);
          
          setAmount(amount - 1);
          setAddedSnacks(copy);
        }
      });
    }
  };

  const addSnack = () => {
    if (!(addedSnacks.length + 1 > 2)) {
      setAmount(amount + 1);
      setAddedSnacks([...addedSnacks, props.snack]);
    }
  };
  
  return (
    <div className={`order-amount-controller order-amount-controller--${props.type}`}>
      <div className="order-amount-controller__decrementer" onClick={removeSnack}>
        -
      </div>
      <div className="order-amount-controller__amount">{amount}</div>
      <div
        className={`order-amount-controller__incrementer${
          //TODO - Add disabled class to let the user know you can't select more snack to order
          addedSnacks.length == 2 ? '' : ''
        }`}
        onClick={addSnack}
      >
        +
      </div>
    </div>
  );
};

export default OrderAmountController;
