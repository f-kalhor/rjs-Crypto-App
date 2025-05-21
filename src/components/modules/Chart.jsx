import React, { useState } from "react";

import styles from "./Chart.module.css";
import convertData from "../../helper/convertData";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Chart({ setChart, chart }) {
  const [type, setType] = useState("prices");
  console.log("chart", chart);

  return (
    <div className={styles.container}>
      <span className={styles.cross} onClick={() => setChart(null)}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.coin.image} alt="icon" />
          <p>{chart.coin.name}</p>
        </div>
        <div className={styles.graph}>
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>
        <div className={styles.types}>
          <button
            onClick={() => setType("prices")}
            className={type === "prices" ? styles.selected : null}
          >
            Price
          </button>
          <button
            onClick={() => setType("market_caps")}
            className={type === "market_caps" ? styles.selected : null}
          >
            Market
          </button>
          <button
            onClick={() => setType("total_volumes")}
            className={type === "total_volumes" ? styles.selected : null}
          >
            Total Volumes
          </button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Prices:</p>
            <span>{chart.coin.current_price}</span>
          </div>
          <div>
            <p>ATH:</p>
            <span>{chart.coin.ath}</span>
          </div>
          <div>
            <p>Market Cap:</p>
            <span>{chart.coin.market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const ChartComponent = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#3874ff"
          strokeWidth="2px"
        />
        <CartesianGrid stroke="#404042" />
        <XAxis dataKey="date" hide />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
