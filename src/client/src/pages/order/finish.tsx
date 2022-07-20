import React from 'react';
import Button from '../../common/components/button';
import Loader from '../../common/components/loader';
import useFetch from '../../common/hooks/useFetch';

const OrderFinishPage = () => {
  const games = [null, null, null];
  const { data, loading } = useFetch('/session/latest');
  const { data: statistics } = useFetch('/statistics/general');

  const renderGameBoxes = () => {
    return games.map((game, index) => {
      return (
        <div key={index} className="order-finish-page__game-box">
          <img src="/images/snack-pong-preview.png" className="order-finish-page__game-preview-image" />
          <div className="order-finish-page__image-overlay"></div>
          <p className="order-finish-page__game-title">Snack pong</p>
          <Button size="small" text="Start het spel" color="red" onClick={() => {}} />
        </div>
      );
    });
  };

  if (loading) return <Loader fullscreen={true} text="Aan het laden" />;
  if (!data.alreadyOrdered) window.location.href = '/order';

  return (
    <div className="order-finish-page">
      <div className="order-finish-page__centerer">
        <p className="order-finish-page__finish-title">Kijk eens aan, je snacks zijn besteld!</p>
        <img src="/images/check-icon.svg" className="order-finish-page__check-icon" />
        {/* <p className="order-finish-page__game-text">
          Kun je niet wachten op je snacks? Speel in de tussentijd een snack game
        </p> 
        <div className="order-finish-page__game-flex">{renderGameBoxes()}</div> */}
        <div className="order-finish-page__statistics"></div>
      </div>
    </div>
  );
};

export default OrderFinishPage;
