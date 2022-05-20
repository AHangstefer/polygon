import React, {useState, useEffect} from "react";
import axios from 'axios';
import './App.css';



function App() {

  const [stock, stockSet] = useState([])

  const key = process.env.REACT_APP_API_KEY

  useEffect(()=> {
    axios
    .get(`https://api.polygon.io/v2/ticks/stocks/trades/AAPL/2020-10-20?reverse=true&limit=10&apiKey=${key}`)
    .then(res => {
      console.log("this is res from app.js polygon get", res)
      stockSet(res)
    })
    .catch(err => {
      console.log("Oh no! WHERE'S THE DATA?!", err)
    })
  })

  return (
    <div className="App"> Hello App
    
    </div>
  );
}

export default App;
