import React, { useState, useEffect } from "react";

function Countdown({ dateFrom, dateTo }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(dateTo) - +new Date(dateFrom);
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 500);

    return () => clearInterval(timer);
  }, [dateFrom, dateTo]);

  return (
    <div className="flex gap-1">
      <p className="text-[12px] font-semibold">Udløber om:</p>
      <div className="flex">
        {Object.entries(timeLeft).map(([unit, value], index) => (
          <span className="font-semibold text-[12px]" key={unit}>
            {value.toString().length === 1 ? `0${value}` : value}
            {index === 0 && ":"}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Countdown;
