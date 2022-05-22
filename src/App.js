import React, {useState} from "react";
import axios from 'axios';
import './styles/App.css';



function App() {

  let [ticker, setTicker] = useState("")
  let [date, setDate] = useState("");
  let [stock, setStock] =useState([])

  let open = stock.open;
  let close = stock.close;
  let difference = (close - open).toFixed(2)
  let percentChange = ((difference/open) *100).toFixed(2)
  

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
    <div className="App"> 
        <div className = "title">Stocks Daily: Open to Close</div>
        <div className = "intro">Add your ticker and the date using YYYY-MM-DD formate to find your stocks data. The 
          search will return the opening, closing, high, low, pre market, after hours, and price and percentage changes from the date
          entered. Results are adjusted for splits. </div>
        <div className = "inputsButton">
            <input
              type = "text"
              value = {ticker}
              onChange={(e)=> setTicker(e.target.value)}
              placeholder = "Ticker"
              >
            </input>
            <input
              type="text"
              value = {date}
              onChange = {(e)=> (setDate(e.target.value))}
              placeholder = "YYYY-MM-DD"
              >
            </input>
            <button onClick={fetchPolygonAPI}>Search</button> 
        </div>  
    </div>

    { stock.symbol ?
      <div className = "returnedInfo">
            <div className = "tickerData" >
                <div className = "data">Ticker: {stock.symbol}</div>
                <div className = "data">Date Searched: {stock.from}</div>
                <div className = "data">Open: {open}</div>
                <div className = "data">Close: {close}</div>
                <div className = "data">High: {stock.high}</div>
                <div className = "data">Low: {stock.low}</div>
                <div className = "data"> Price Change: ${difference}</div>
                <div className = "data"> Grapper: {percentChange} % </div>
                <div className = "data">Pre Market: {stock.preMarket}</div>
                <div className = "data">After Hours:{stock.afterHours}</div>
            </div>
      </div> 
    : ""}

    {stock.status === 'NOT_FOUND' ? 
        <div className = "notfound"> We can't find this stock on this date. Please check inputs and try again</div> 
    : ""}
    
   </>
  );
}

export default App;






