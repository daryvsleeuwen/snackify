import React from 'react';
import { checkUserAuth } from '../common/utils/index';
import axios from '../common/api/axios';
import { useRouter } from '../../../../node_modules/next/router';

const OrderPage = () => {
  const router = useRouter();

  return <h1>Order page</h1>;
};

export default OrderPage;
