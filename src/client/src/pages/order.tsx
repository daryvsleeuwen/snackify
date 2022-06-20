import React from 'react';
import axios from '../common/api/axios';
import { useRouter } from '../../../../node_modules/next/router';
import Header from '../common/components/header';

const OrderPage = () => {
  const router = useRouter();

  return (
    <div className="order-page">
      <Header title="Laat het snackavontuur beginnen" />
    </div>
  );
};

export default OrderPage;
