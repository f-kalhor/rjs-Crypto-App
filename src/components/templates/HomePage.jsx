import React from "react";
import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { getCoinList, KEY} from "../../services/CryptoApi";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [page, setPage] = useState(1);
  const [currency,setCurrency]=useState("usd")
  const [chart ,setChart]=useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const fetchData = await fetch(getCoinList(page ,currency), {
          method: "GET",
          headers: {
            "x-cg-demo-api-key": KEY,
          },
        });
        const json = await fetchData.json();
        setCoins(json);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [page,currency]);

  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency}/>
      <TableCoin coins={coins} isLoading={isLoading} currency={currency} setChart={setChart}/>
      <Pagination page={page} setPage={setPage}/>
      {!!chart && <Chart setChart={setChart} chart={chart }/>}
    </div>
  );
}

export default HomePage;
