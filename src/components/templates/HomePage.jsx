import React from "react";
import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import { getCoinList, KEY } from "../../services/CryptoApi";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading,setIsLoading]=useState(true)
  useEffect(() => {
    const getData = async () => {
      try {
        const fetchData = await fetch(getCoinList(), {
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
  }, []);

  return (
    <div>
      <TableCoin coins={coins} isLoading={isLoading}/>
    </div>
  );
}

export default HomePage;
