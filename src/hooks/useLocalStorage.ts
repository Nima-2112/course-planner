//-------import-------

import { useEffect, useState } from "react";

//-------Hook-------

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  //-------Initial State-------

  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue === null) {
        return initialValue;
      }

      return JSON.parse(storedValue) as T;
    } catch (error) {
      console.error(`Failed to read localStorage key "${key}".`, error);

      return initialValue;
    }
  });

  //-------Persistence-------

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save localStorage key "${key}".`, error);
    }
  }, [key, value]);

  //-------Return-------

  return [value, setValue];
}

//-------Export-------

export default useLocalStorage;
