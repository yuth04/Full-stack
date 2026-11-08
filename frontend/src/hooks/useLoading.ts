"use client";

import { useEffect, useState } from "react";

export function useMinimumLoading(
  isLoading: boolean,
  minimumTime = 1000
) {
  const [minTimePassed, setMinTimePassed] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setMinTimePassed(true);
      }, minimumTime);

      return () => clearTimeout(timer);
    }

    setMinTimePassed(false);
  }, [isLoading, minimumTime]);

  return isLoading || !minTimePassed;
}