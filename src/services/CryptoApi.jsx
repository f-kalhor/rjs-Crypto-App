const BACE_URL ="https://api.coingecko.com/api/v3"
const KEY ='CG-MrMQSnzpfGEXUyV1Ggrua17m'

const getCoinList =(page,currency)=>{
    return (`${BACE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=15&page=${page}&sparkline=false&locale=en`)
}

const searchCoin =(query)=>{
    return (`${BACE_URL}/search?query=${query}`)
}

const marketChart =(id)=>{
    return (`${BACE_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`)
} 
export {getCoinList, KEY ,searchCoin ,marketChart};