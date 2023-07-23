import { useEffect, useState } from "react";

function HomePage() {
  const [productionTimer, setProductionTimer] = useState(0);
  const [pauseTimer, setPauseTimer] = useState(0);
  const [isProductionMode, setIsProductionMode] = useState(false);
  const [isPauseMode, setIsPauseMode] = useState(false);

  useEffect(() => {
    let timer;

    setProductionTimer(Number(localStorage.getItem("productionTime")) || 0);
    setPauseTimer(Number(localStorage.getItem("pauseTime")) || 0);

    if (isProductionMode || isPauseMode) {
      timer = setInterval(() => {
        if (isProductionMode) {
          setProductionTimer((prev) => prev + 1);
          localStorage.setItem(
            "productionTime",
            (productionTimer + 1).toString()
          );
        } else if (isPauseMode) {
          setPauseTimer((prev) => prev + 1);
          localStorage.setItem("pauseTime", (pauseTimer + 1).toString());
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isProductionMode, isPauseMode, pauseTimer, productionTimer]);

  const handleProductionClick = () => {
    setIsProductionMode(true);
    setIsPauseMode(false);
  };

  const handlePauseClick = () => {
    setIsProductionMode(false);
    setIsPauseMode(true);
  };

  const handleResumeClick = () => {
    setIsPauseMode(false);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <div
            className={`card ${
              isProductionMode ? "bg-primary text-white" : ""
            }`}
          >
            <div className="card-body">
              <h2 className="card-title">Production Timer</h2>
              <h2 className="card-text">
                {formatTime(productionTimer)} 
              </h2>
              {!isProductionMode && (
                <button
                  onClick={handleProductionClick}
                  className="btn btn-primary mt-3"
                >
                  Start Production
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className={`card ${
              isPauseMode ? "bg-danger text-white" : "bg-primary"
            }`}
          >
            <div className="card-body">
              <h2 className="card-title">Pause Timer</h2>
              <div
                className={`rounded-pill p-4 ${
                  isPauseMode ? "bg-white" : "bg-primary"
                }`}
              >
                <h2
                  className={`display-4 ${
                    isPauseMode ? "text-primary" : "text-white"
                  }`}
                >
                  {formatTime(pauseTimer)}
                </h2>
              </div>
              {isProductionMode ? (
                <button
                  onClick={handlePauseClick}
                  className="btn btn-danger mt-3"
                >
                  Start Pause
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
