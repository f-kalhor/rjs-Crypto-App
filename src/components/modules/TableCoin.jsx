import React from "react";

import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { RotatingLines } from "react-loader-spinner";
import styles from "./TableCoin.module.css";
import { marketChart } from "../../services/CryptoApi";

function TableCoin({ coins, isLoading, currency, setChart }) {
  return (
    <>
      <div className={styles.container}>
        {isLoading ? (
          <RotatingLines strokeColor="#3874ff" />
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Name</th>
                <th>Price</th>
                <th>24h</th>
                <th>Total Volume</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <TableRow
                  coin={coin}
                  key={coin.id}
                  currency={currency}
                  setChart={setChart}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default TableCoin;

const TableRow = ({ coin, currency, setChart }) => {
  const {
    id,
    image,
    symbol,
    name,
    current_price,
    price_change_percentage_24h,
    total_volume,
  } = coin;
  const showModalHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart({...json,coin:coin});
    console.log("hi");
    } catch (error) {
      setChart(null);
    }
  };

  return (
    <tr>
      <td onClick={showModalHandler}>
        <div className={styles.symbol}>
          <img src={image} alt="" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currency === "usd" ? (
          <p style={{ display: "inline" }}>$</p>
        ) : currency === "eur" ? (
          <p style={{ display: "inline" }}>€</p>
        ) : (
          <p style={{ display: "inline" }}>¥</p>
        )}{" "}
        {current_price.toLocaleString()}
      </td>
      <td
        className={
          price_change_percentage_24h > 0 ? styles.success : styles.error
        }
      >
        {price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>{total_volume}</td>
      <td>
        <img
          src={price_change_percentage_24h > 0 ? chartUp : chartDown}
          alt="Algoritm"
        />
      </td>
    </tr>
  );
};
