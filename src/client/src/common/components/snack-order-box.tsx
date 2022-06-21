import React, { useState } from 'react';
import axios from '../api/axios';
import OrderAmountController from './order-amount-controller';

export type snackData = {
  snack: {
    id: number;
    name: string;
    image: string;
  };
};

const SnackOrderBox = (props: snackData) => {
  return (
    <div className="snack-order-box">
      <div className="snack-order-box__image">
        <img src={props.snack.image} />
      </div>
      <div className="snack-order-box__order-controls">
        <p className="snack-order-box__snack-title">{props.snack.name}</p>
        <OrderAmountController type="wide" snack={props.snack} />
      </div>
    </div>
  );
};

export default SnackOrderBox;
