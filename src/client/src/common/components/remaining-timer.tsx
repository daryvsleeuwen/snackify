import React, { useEffect, useState } from 'react';
import { millisecondsToTime } from '../utils/time';

type RemainingTimerProps = {
  epoch: any;
};

const RemainingTimer = (props: RemainingTimerProps) => {
  const [remainingTime, setRemainingTime] = useState(props.epoch);

  useEffect(() => {
    const counter = setInterval(() => {
      setRemainingTime(remainingTime - 1000);
    }, 1000);

    return () => {
      clearInterval(counter);
    };
  }, []);

  return (
    <p className="section-title grid">
      De huidige sessie is nog {millisecondsToTime(1_800_000 - (Date.now() - remainingTime))} lang geldig
    </p>
  );
};

export default RemainingTimer;
