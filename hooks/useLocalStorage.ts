"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`useLocalStorage: error reading key "${key}"`, error);
    }
    setHydrated(true);
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const next = typeof value === "function" ? (value as (p: T) => T)(prev) : value;
          if (hydrated) {
            window.localStorage.setItem(key, JSON.stringify(next));
          }
          return next;
        });
      } catch (error) {
        console.warn(`useLocalStorage: error writing key "${key}"`, error);
      }
    },
    [key, hydrated]
  );

  return [storedValue, setValue];
}