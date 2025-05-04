import React from "react";
import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { getCoinList, KEY } from "../../services/CryptoApi";
import Pagination from "../modules/Pagination";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const fetchData = await fetch(getCoinList(page), {
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
  }, [page]);

  return (
    <div>
      <TableCoin coins={coins} isLoading={isLoading}/>
      <Pagination page={page} setPage={setPage}/>
    </div>
  );
}

export default HomePage;
