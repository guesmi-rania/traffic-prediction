import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
  
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  
  function TrafficChart({ data }) {
    const chartData = {
      labels: ["Low", "Medium", "High"],
      datasets: [
        {
          label: "Traffic Levels",
          data: [
            data?.low || 0,
            data?.medium || 0,
            data?.high || 0
          ]
        }
      ]
    };
  
    return <Bar data={chartData} />;
  }
  
  export default TrafficChart;