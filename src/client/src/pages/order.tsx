import React, { useState, useEffect, createContext } from 'react';
import axios from '../common/api/axios';
import { useRouter } from '../../../../node_modules/next/router';
import Header from '../common/components/header';
import SnackOrderBox from '../common/components/snack-order-box';

export const OrderContext = createContext(null);

const OrderPage = () => {
  const router = useRouter();
  const [snacks, setSnacks] = useState([]);
  const [addedSnacks, setAddedSnacks] = useState([]);
  const [addedBuns, setAddedBuns] = useState([]);

  useEffect(() => {
    axios.get('/snack/all').then((response) => {
      if (response.data) {
        setSnacks(response.data);
      }
    });
  }, []);

  return (
    <div className="order-page">
      <OrderContext.Provider value={{ addedSnacks, setAddedSnacks, addedBuns, setAddedBuns }}>
        <Header title="Laat het snackavontuur beginnen" />
        <div className="snack-order-overview grid">
          {snacks.map((snack, index) => {
            return <SnackOrderBox key={index} snack={snack} />;
          })}
        </div>
      </OrderContext.Provider>
    </div>
  );
};

export default OrderPage;
