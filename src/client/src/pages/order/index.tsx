import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from '../../common/api/axios';
import Header from '../../common/components/header';
import SnackOrderBox from '../../common/components/snack-order-box';
import { UserContext } from '../_app';

export const OrderContext = createContext(null);

const OrderPage = () => {
  const [snacks, setSnacks] = useState([]);
  const [addedSnacks, setAddedSnacks] = useState([]);
  const [addedBuns, setAddedBuns] = useState([]);
  const [latestSession, setLatestSession] = useState(false);
  const [alreadyOrdered, setAlreadyOrdered] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    axios.get('/session/latest').then((response) => {
      if (response.data) {
        let already_ordered = false;

        response.data.orders.forEach((order) => {
          if (order.userId === user.sub) {
            already_ordered = true;
          }
        });

        if (!already_ordered) {
          axios.get('/snack/all').then((response) => {
            if (response.data) {
              setSnacks(response.data);
            }
          });
        }

        setAlreadyOrdered(already_ordered);
        setLatestSession(response.data);
      }
    });
  }, []);

  const renderNoSession = () => {
    return (
      <div className="order-page">
        <div className="execption-message">
          <h2>
            Heee snackfanaat, er is helaas nog geen sessie gestart door <span>Chef Snacks</span>
          </h2>
          <h3>Nog even wachten dus</h3>
        </div>
      </div>
    );
  };

  const renderAlreadyOrdered = () => {
    return (
      <div className="order-page">
        <div className="execption-message">
          <h2>Zo zo zo fanatiekeling, volgens mij heb jij al besteld.</h2>
        </div>
      </div>
    );
  };

  if (!latestSession) return renderNoSession();
  if (alreadyOrdered) return renderAlreadyOrdered();

  return (
    <div className="order-page">
      <OrderContext.Provider value={{ addedSnacks, setAddedSnacks, addedBuns, setAddedBuns }}>
        <Header title="Laat het snackavontuur beginnen" cart={true} />

        <div className="snack-order-overview grid">
          <p className="section-title grid">Tijd om te bestellen {user.name.split(' ')[0]}</p>
          <div className="overview-grid">
            {snacks.map((snack, index) => {
              return <SnackOrderBox key={index} snack={snack} />;
            })}
          </div>
        </div>
      </OrderContext.Provider>
    </div>
  );
};

export default OrderPage;
