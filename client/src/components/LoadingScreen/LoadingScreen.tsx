import "./LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="loading-screen-wrapper">
      <div className="container">
        <div className="plate">
          <div className="black">
            <div className="border">
              <div className="white">
                <div className="center" />
              </div>
            </div>
          </div>
        </div>

        <div className="player">
          <div className="rect" />
          <div className="circ" />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
