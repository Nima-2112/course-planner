//-------import-------
import type { ReactNode } from "react";

import "../styles/Feedback.css";

//-------Props-------
type Props = {
  message?: string;
  children?: ReactNode;
};

//-------Component-------
function LoadingScreen({ message = "Loading...", children }: Props) {
  return (
    <div className="feedback-card" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true" />

      <p>{message}</p>

      {children}
    </div>
  );
}

export default LoadingScreen;
