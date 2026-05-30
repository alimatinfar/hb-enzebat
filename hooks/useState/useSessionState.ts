import { useState, useEffect } from "react";


type Props = {
  key: string;
  initialValue: any;
}

export function useSessionState({key, initialValue}: Props) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = sessionStorage.getItem(key);
      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }
      return initialValue;
    } catch (err) {
      console.warn("خطا در خواندن از sessionStorage:", err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn("خطا در نوشتن داخل sessionStorage:", err);
    }
  }, [key, value]);

  return [value, setValue];
}
