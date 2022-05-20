import React, {useState, useEffect} from "react";
import axios from 'axios';
import './App.css';



function App() {

  const [stock, stockSet] = useState([])

  const key = process.env.REACT_APP_API_KEY

  useEffect(()=> {
    axios
    .get(`https://api.polygon.io/v1/open-close/AAPL/2020-10-14?adjusted=true&apiKey=${key}`)
    .then(res => {
      console.log("this is res from app.js polygon get", res)
      stockSet(res.data)
    })
    .catch(err => {
      console.log("Oh no! WHERE'S THE DATA?!", err)
    })
  },[])

  let close = stock.close;
  let open = stock.open;
  let high = stock.high;
  let low = stock.low;

  console.log("close, open, high, low", close, open, high, low)



  return (
    <>
    <div className="App"> 
      <p></p>
    
    
    </div>
    </>
  );
}

export default App;


// {Object.values(stock).forEach(items=>
//   Object.values(items).map(item => (
//     console.log("items", item)
//     ))
//    )}