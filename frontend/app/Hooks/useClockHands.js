// hooks/useClockHands.js

import { useTime } from "./useTime";

export const useClockHands = () => {
  const time = useTime();

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  return {
    secondDegrees: (seconds / 60) * 360,
    minuteDegrees: ((minutes + seconds / 60) / 60) * 360,
    hourDegrees: ((hours + minutes / 60) / 12) * 360,
  };
};
