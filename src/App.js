import React, {useState} from "react";
import axios from 'axios';
import './App.css';



function App() {

  let [ticker, setTicker] = useState("")
  let [date, setDate] = useState("");
  let [stock, setStock] =useState([])
  

  const key = process.env.REACT_APP_API_KEY

  

  const fetchPolygonAPI = (async () =>{
  let response = await fetch(`https://api.polygon.io/v1/open-close/${ticker.toUpperCase()}/${date}?adjusted=true&apiKey=${key}`)
  response = await response.json()
  if (response){
      setStock(response)
      console.log("this is repsonse", response)

  
  } else {
    console.log("error with fetch")
  }
})

// function handleChange(e){
  
//   setTicker(e.target.value)
//   setDate(e.target.value)
//   console.log("handlechange is running")

// }


  return (
    <>
    <div className="App"> Find Your Stock
      <div className = "inputs and button">
        <input
          type = "text"
          value = {ticker}
          onChange={(e)=> setTicker(e.target.value)}
          placeholder = "ticker"
          >
        </input>
        <input
          type="text"
          value = {date}
          onChange = {(e)=> (setDate(e.target.value))}
          placeholder = "YYYY-MM-DD"
          >
        </input>
        <button onClick={fetchPolygonAPI}>Find Stock</button> 
      </div>
    </div>
    { stock.symbol ?
    <div className = "returned Info">
      
      <div>Ticker: {stock.symbol}</div>
      <div>Date Searched: {date}</div>
      <div>Low: {stock.low}</div>
      <div>High: {stock.high}</div>
      <div>Open: {stock.open}</div>
      <div>Close: {stock.close}</div>
      <div> Percentage change from open to close: </div>
      <div> Percentage changed today: </div>



    </div> : ""}
    {stock.status ? <div> We can't find this stock on this date. Please check inputs and try again</div> : ""}
    
   
   
    </>
  );
}

export default App;






