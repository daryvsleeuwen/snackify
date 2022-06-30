import React from 'react';
import Header from '../common/components/header';
import OrderedItemsRow from '../common/components/ordered-items-row';
import useFetch from '../common/hooks/useFetch';

const DashboardPage = () => {
  const { data } = useFetch('/session/latest');

  return (
    <div className="dashboard-page">
      <Header title="Dashboard" cart={false} />
      {!data.session ? null : (
        <div className="ordered-items-overview grid">
          {data.session.orders.map((order, index) => {
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
