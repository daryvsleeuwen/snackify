import React, { useEffect, useState } from 'react';
import Loader from '../common/components/loader';
import OrderedItemsRow from '../common/components/ordered-items-row';
import RemainingTimer from '../common/components/remaining-timer';
import useFetch from '../common/hooks/useFetch';

const DashboardPage = () => {
  const { data, loading } = useFetch('/session/latest');
  const [accumulatedSnacks, setAccumulatedSnacks] = useState([]);
  const [whiteBunsAmount, setWhiteBunsAmount] = useState(0);
  const [brownBunsAmount, setBrownBunsAmount] = useState(0);

  useEffect(() => {
    if (data === null) return;
    if (data.session === null) return;

    accumulateOrderedItems();
  }, [data]);

  const accumulateOrderedItems = () => {
    const accumulated = [];
    let whiteBuns = 0;
    let brownBuns = 0;

    data.session.orders.forEach((order) => {
      order.snacks.forEach((orderedSnack) => {
        let alreadyAdded = false;

        for (let i = 0; i < accumulated.length; i++) {
          const snack = accumulated[i];

          if (snack.id === orderedSnack.id) {
            alreadyAdded = true;
            accumulated[i].amount += orderedSnack.amount;
            break;
          }
        }

        if (!alreadyAdded) {
          accumulated.push({ id: orderedSnack.id, image: orderedSnack.image, amount: orderedSnack.amount });
        }
      });

      whiteBuns += order.whiteBuns;
      brownBuns += order.brownBuns;
    });

    setAccumulatedSnacks(accumulated);
    setWhiteBunsAmount(whiteBuns);
    setBrownBunsAmount(brownBuns);
  };

  const renderSectionTitle = () => {
    if (data.expired || data.session === null) {
      return <p className="section-title grid">De huidige sessie is verlopen. Bekijk hier alle bestellingen</p>;
    }

    return <RemainingTimer epoch={data?.epoch} />;
  };

  const renderOrderedItemsRows = () => {
    if (data.session?.orders.length > 0) {
      return data.session?.orders.map((order, index) => {
        return (
          <OrderedItemsRow
            key={index}
            userProfileImage={order.user.profileImage}
            snacks={order.snacks}
            whiteBuns={order.whiteBuns}
            brownBuns={order.brownBuns}
          />
        );
      });
    } else {
      return <p className="no-ordered-items-message">Er zijn nog geen bestellingen geplaatst</p>;
    }
  };

  const renderaccumulatedItems = () => {
    if (data.session?.orders.length > 0) {
      return (
        <div className="accumulated-orders-overview">
          <p className="accumulated__title">Totaal aantal snacks</p>
          <div className="accumulated__flex">
            <div className="accumulated__row">
              {accumulatedSnacks.map((snack, index) => {
                return (
                  <div key={index} className="accumulated__amounts">
                    <p>{snack.amount}x</p>
                    <img src={snack.image} alt="snack image" />
                  </div>
                );
              })}
            </div>
            <div className="accumulated__row">
              <div className="accumulated__amounts">
                <p>{whiteBunsAmount}x</p>
                <img src="/images/white-bun.png" alt="white bun" />
              </div>
              <div className="accumulated__amounts">
                <p>{brownBunsAmount}x</p>
                <img src="/images/brown-bun.png" alt="brown bun" />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  if (loading) return <Loader fullscreen={true} text="Aan het laden" />;

  return (
    <div className="dashboard-page section">
      {renderSectionTitle()}
      <div className="ordered-items-overview grid">
        <div className="ordered-items-rows">{renderOrderedItemsRows()}</div>
        {renderaccumulatedItems()}
      </div>
    </div>
  );
};

export default DashboardPage;
