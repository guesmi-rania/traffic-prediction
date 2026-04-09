import { useState } from "react";
import axios from "axios";
import TrafficChart from "./TrafficChart";

function App() {
  const [vehicles, setVehicles] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState({
    low: 0,
    medium: 0,
    high: 0
  });

  const handlePredict = async () => {
    const res = await axios.post("https://traffic-prediction-tnie.onrender.com/predict", {
      vehicles: Number(vehicles)
    });

    const level = res.data.traffic_level.toLowerCase();

    setResult(res.data);

    setHistory((prev) => ({
      ...prev,
      [level]: prev[level] + 1
    }));
  };

  return (
      <div className="container">
        <h1>🚦 Traffic Prediction Dashboard</h1>
    
        <div className="card">
          <input
            type="number"
            value={vehicles}
            onChange={(e) => setVehicles(e.target.value)}
            placeholder="Enter number of vehicles..."
          />
    
          <button onClick={handlePredict}>Predict</button>
        </div>
    
        {result && (
          <div className="result-card">
            <h3>Prediction Result</h3>
            <p><strong>Vehicles:</strong> {result.vehicles}</p>
            <p>
              <strong>Traffic Level:</strong>{" "}
              <span className={`badge ${result.traffic_level.toLowerCase()}`}>
                {result.traffic_level}
              </span>
            </p>
          </div>
        )}
    
        <div className="chart-card">
          <h3>Traffic Distribution</h3>
          <TrafficChart data={history} />
        </div>
      </div>
    );
}

export default App;