import { useState } from "react";
import axios from "axios";
import TrafficChart from "./TrafficChart";
import "./App.css";

function App() {
  const [vehicles, setVehicles] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState({
    low: 0,
    medium: 0,
    high: 0,
  });

  const handlePredict = async () => {
    try {
      const res = await axios.post(
        "https://traffic-prediction-tnie.onrender.com/predict",
        {
          vehicles: Number(vehicles),
        }
      );

      const level = res.data.traffic_level.toLowerCase();

      setResult(res.data);

      setHistory((prev) => ({
        ...prev,
        [level]: prev[level] + 1,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app">
      <h1>🚦 Traffic Dashboard</h1>

      <div className="dashboard">
        {/* INPUT CARD */}
        <div className="card input-card">
          <h2>Prediction</h2>

          <input
            type="number"
            value={vehicles}
            onChange={(e) => setVehicles(e.target.value)}
            placeholder="Enter number of vehicles"
          />

          <button onClick={handlePredict}>Predict</button>
        </div>

        {/* RESULT CARD */}
        {result && (
          <div className="card result-card">
            <h2>Result</h2>

            <p>🚗 Vehicles: {result.vehicles}</p>

            <p>
              Traffic:
              <span className={`badge ${result.traffic_level.toLowerCase()}`}>
                {result.traffic_level}
              </span>
            </p>
          </div>
        )}

        {/* CHART CARD */}
        <div className="card chart-card">
          <h2>Distribution</h2>
          <TrafficChart data={history} />
        </div>
      </div>
    </div>
  );
}

export default App;