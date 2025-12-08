import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

export default function DonutChart({ value, total = 100, color }) {
  const data = {
    labels: ["Actual", "Restante"],
    datasets: [
      {
        data: [value, Math.max(total - value, 0)],
        backgroundColor: [color, "#dcdcdc"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "60%",
  };

  return (
    <div style={{ width: 100, marginTop: 10 }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
