import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

import { searchCoin, KEY } from "../../services/CryptoApi";
import styles from "./Search.module.css"

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading,setIsLoading]=useState(false)

  useEffect(() => {
    const controller = new AbortController();
    setCoins([])
    if (!text){
      setIsLoading(false)
      return
    }
    const search = async () => {
      try {
        const fetchData = await fetch(searchCoin(text), {
          method: "Get",
          headers: {
            "x-cg-demo-api-key": KEY,
          },
          signal: controller.signal,
        });
        const json = await fetchData.json();
        if(json.coins){
          setIsLoading(false)
          setCoins(json.coins);
        }
      } catch (error) {
        if(!error.name==="AbortError"){
          alert(error.message)
        }
      }
    };
    setIsLoading(true)
    search();

    return () => controller.abort();
  }, [text]);

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!coins.length || isLoading)&&
            <div className={styles.searchResult}>
            {isLoading&& <RotatingLines width="50px" height="50px" strokeColor="#3874ff" strokeWidth="2"/>}
            <ul>
              {coins.map((coin)=>(
                <li key={coin.id}>
                  <img src={coin.thumb} alt={coin.name} />
                  <p>{coin.name}</p>
                </li>
              ))}
            </ul>
          </div>}
    </div>
  );
}

export default Search;
