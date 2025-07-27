import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

// Utility functions for specific data
export const saveBookingData = (data: any) => {
  localStorage.setItem("busBookingData", JSON.stringify(data));
};

export const getBookingData = () => {
  try {
    const data = localStorage.getItem("busBookingData");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveTicketData = (data: any) => {
  localStorage.setItem("busTicketData", JSON.stringify(data));
};

export const getTicketData = () => {
  try {
    const data = localStorage.getItem("busTicketData");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const clearBookingData = () => {
  localStorage.removeItem("busBookingData");
  localStorage.removeItem("busTicketData");
};
