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
    const res = await axios.post("http://127.0.0.1:5000/predict", {
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
    <div style={{ padding: "20px" }}>
      <h1>🚦 Traffic Prediction Dashboard</h1>

      <input
        type="number"
        value={vehicles}
        onChange={(e) => setVehicles(e.target.value)}
        placeholder="Number of vehicles"
      />

      <button onClick={handlePredict}>Predict</button>

      {result && (
        <div>
          <h3>Result:</h3>
          <p>Vehicles: {result.vehicles}</p>
          <p>Traffic Level: {result.traffic_level}</p>
        </div>
      )}

      <h3>Traffic Distribution</h3>
      <TrafficChart data={history} />
    </div>
  );
}

export default App;