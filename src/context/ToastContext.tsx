import { createContext, useState } from "react";

interface ToastContextType {
  message: string;

  showToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType>({
  message: "",
  showToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");

  const showToast = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <ToastContext.Provider
      value={{
        message,

        showToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}
