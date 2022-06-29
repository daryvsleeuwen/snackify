import React, { useEffect, useState } from 'react';
import axios from '../common/api/axios';
import Header from '../common/components/header';
import OrderedItemsRow from '../common/components/ordered-items-row';

const DashboardPage = () => {
  const [latestSession, setLatestSession] = useState(null);

  useEffect(() => {
    axios.get('/session/latest').then((response) => {
      if (response.data.sessionn) {
        setLatestSession(response.data.session);
      }
    });
  }, []);

  return (
    <div className="dashboard-page">
      <Header title="Dashboard" cart={false} />
      {!latestSession ? null : (
        <div className="ordered-items-overview grid">
          {latestSession.orders.map((order, index) => {
            return (
              <OrderedItemsRow
                key={index}
                userProfileImage={order.user.profileImage}
                snacks={order.snacks}
                whiteBuns={order.whiteBuns}
                brownBuns={order.brownBuns}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
