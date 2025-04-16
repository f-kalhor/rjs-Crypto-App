import React from 'react'
import { useEffect, useState } from "react";
import TableCoin from '../modules/TableCoin';

function HomePage() {
    const [coins ,setCoins]=useState([])

    useEffect(()=>{
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en', {
        method: 'GET',
        headers: {
          'x-cg-demo-api-key': 'CG-MrMQSnzpfGEXUyV1Ggrua17m'
        }
      })
      .then(response => response.json())
      .then(data => setCoins(data))
      .catch(error => console.error(error));
    },[])
  
  
  
  return (
    <div>
      <TableCoin coins={coins}/>
    </div>
  )
}

export default HomePage
