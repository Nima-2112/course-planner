import "../styles/SplashScreen.css";

function SplashScreen() {
  return (
    <div className="splash">
      <div className="shadow">
        <div className="content">
          <h1>Online Store</h1>

          <p>Loading...</p>

          <div className="loader">
            <div className="progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
