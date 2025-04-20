import React from "react";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import{RotatingLines} from "react-loader-spinner"

function TableCoin({ coins ,isLoading}) {
  console.log(coins);

  return (<>
    {isLoading ? <RotatingLines/>:<div>
      <table>
        <thead>
          <th>Coin</th>
          <th>Name</th>
          <th>Price</th>
          <th>24h</th>
          <th>Total Volume</th>
          <th></th>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <TableRow coin={coin} key={coin.id} />
          ))}
        </tbody>
      </table>
    </div>}
  </>);
}

export default TableCoin;

const TableRow = ({coin:{image,symbol,name,current_price,price_change_percentage_24h,total_volume}}) => {
  return (
    <tr>
      <td>
        <img src={image} alt="" />
        <p>{symbol}</p>
      </td>
      <td>{name}</td>
      <td>${current_price.toLocaleString()}</td>
      <td>{price_change_percentage_24h.toFixed(2)}%</td>
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
