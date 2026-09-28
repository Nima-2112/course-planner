//-------import-------
import "../styles/Feedback.css";

//-------Props-------
type Props = {
  title?: string;
  message: string;
  onRetry?: () => void;
};

//-------Component-------
function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}: Props) {
  return (
    <div className="error-state" role="alert">
      <div className="error-icon" aria-hidden="true">
        !
      </div>

      <div>
        <h2>{title}</h2>

        <p>{message}</p>

        {onRetry && (
          <button type="button" className="secondary-button" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorState;
