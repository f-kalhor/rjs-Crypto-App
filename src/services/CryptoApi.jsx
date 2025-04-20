const BACE_URL ="https://api.coingecko.com/api/v3"
const KEY ='CG-MrMQSnzpfGEXUyV1Ggrua17m'

const getCoinList =()=>{
    return (`${BACE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en`)
}

export {getCoinList, KEY};