import React, { useState, useEffect, createContext } from 'react';
import axios from '../../common/api/axios';
import { useRouter } from 'next/router';
import Header from '../../common/components/header';
import SnackOrderBox from '../../common/components/snack-order-box';

export const OrderContext = createContext(null);

const OrderPage = () => {
  const router = useRouter();
  const [snacks, setSnacks] = useState([]);
  const [addedSnacks, setAddedSnacks] = useState([]);
  const [addedBuns, setAddedBuns] = useState([]);
  const [latestSession, setLatestSession] = useState(false);

  useEffect(() => {
    axios.get('/session/latest').then((response) => {
      setLatestSession(response.data);

      if (response.data) {
        axios.get('/snack/all').then((response) => {
          if (response.data) {
            setSnacks(response.data);
          }
        });
      }
    });
  }, []);

  const renderNoSession = () => {
    return (
      <div className="order-page">
        <div className="no-session">
          <h2>
            Heee snackfanaat, er is helaas nog geen sessie gestart door <span>Chef Snacks</span>
          </h2>
          <h3>Nog even wachten dus</h3>
        </div>
      </div>
    );
  };

  return !latestSession ? (
    renderNoSession()
  ) : (
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
