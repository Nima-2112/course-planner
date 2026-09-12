//-------import-------
import { useEffect, useState } from "react";

//-------Types-------
type SetValue<T> = T | ((previousValue: T) => T);

//-------Hook-------
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  //-------Initial State-------
  const [value, setValue] = useState<T>(() => {
    try {
      const savedValue = localStorage.getItem(key);

      if (savedValue === null) {
        return initialValue;
      }

      return JSON.parse(savedValue) as T;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);

      return initialValue;
    }
  });

  //-------Save To Local Storage-------
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving localStorage key "${key}":`, error);
    }
  }, [key, value]);

  //-------Return-------
  return [value, setValue];
}

export default useLocalStorage;
