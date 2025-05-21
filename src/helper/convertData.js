const convertData =(data,type)=>{
  const converted= data[type].map((item)=>{
    return {
        Date:item[0],
        [type]:item[1]
    }
  })
    console.log(data);
    return converted
}

export default convertData