import React, { useState, createContext, useContext } from 'react';
import useFetch from '../../common/hooks/useFetch';
import Header from '../../common/components/header';
import SnackOrderBox from '../../common/components/snack-order-box';
import { UserContext } from '../_app';
import Loader from '../../common/components/loader';

export const OrderContext = createContext(null);

const OrderPage = () => {
  const [addedSnacks, setAddedSnacks] = useState([]);
  const [totalSnacks, setTotalSnacks] = useState(0);
  const [addedBuns, setAddedBuns] = useState([]);
  const { data: latestSession, loading } = useFetch('/session/latest');
  const { data: snacks } = useFetch('/snack/all');
  const user = useContext(UserContext);

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

  const renderLoading = () => {
    return <Loader fullscreen={true} text="Aan het laden" />;
  };

  if (loading) return renderLoading();
  if (latestSession?.session === null) return renderNoSession();
  if (latestSession?.alreadyOrdered) return renderAlreadyOrdered();

  return (
    <div className="order-page">
      <OrderContext.Provider
        value={{ addedSnacks, setAddedSnacks, totalSnacks, setTotalSnacks, addedBuns, setAddedBuns }}
      >
        <Header title="Laat het snackavontuur beginnen" cart={true} />

        <div className="snack-order-overview grid">
          <p className="section-title grid">Tijd om te bestellen {user.name.split(' ')[0]}</p>
          <div className="overview-grid">
            {snacks?.map((snack, index) => {
              return <SnackOrderBox key={index} snack={snack} />;
            })}
          </div>
        </div>
      </OrderContext.Provider>
    </div>
  );
};

export default OrderPage;
