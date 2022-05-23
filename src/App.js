import React, {useState} from "react";
import Moment from 'moment';
import './styles/App.css';



function App() {

  let [ticker, setTicker] = useState("")
  let [date, setDate] = useState("");
  let [stock, setStock] =useState([])
  let [yesterdayStock, setYesterdayStock] = useState([])
 

  let open = stock.open;
  let yesterdayClose = yesterdayStock.close;
  let dayDifference = (stock.close - open).toFixed(2);
  let difference = (open-yesterdayClose).toFixed(2)
  let percentChange = ((difference/yesterdayClose) *100).toFixed(2)



  let mydate = new Date(date);
  let dayBefore = Moment(mydate).format("YYYY-MM-DD")

    
  console.log("this is yeterday for real", dayBefore )


 
  const key = process.env.REACT_APP_API_KEY

  

    const fetchPolygonAPI =() => {

        Promise.all([
          fetch(`https://api.polygon.io/v1/open-close/${ticker.toUpperCase()}/${dayBefore}?adjusted=true&apiKey=${key}`),
          fetch(`https://api.polygon.io/v1/open-close/${ticker.toUpperCase()}/${date}?adjusted=true&apiKey=${key}`)
        ]).then(function (responses) {
            console.log("this is response", responses)
            return Promise.all(responses.map(function (response) {
              return response.json();
          }));
        }).then(function (data) {
          setYesterdayStock(data[0])
          setStock(data[1])
          
        }).catch(function (error) {
          console.log(error);
        })
    };





  return (
    <>
    <div className="App"> 
        <div className = "title">Stocks Daily: Open to Close</div>
        <div className = "intro">Add your ticker and the date using YYYY-MM-DD format to find your stock's data. The 
          search will return the opening, closing, high, low, pre market, after hours, and price and percentage changes from the date
          entered. Results are adjusted for splits. Price change is indicative of change of price from open to close and gapper
          is percentage of change from open to close. </div>
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
                <div className = "data">TICKER: {stock.symbol}</div>
                <div className = "data">DATE: {stock.from}</div>
                <div className = "data">OPEN: ${open}</div>
                <div className = "data">CLOSE: ${stock.close}</div>
                <div className = "data">HIGH: ${stock.high}</div>
                <div className = "data">LOW: ${stock.low}</div>
                {open > stock.close ? <div className = "dataRED"> OPEN-CLOSE PRICE CHANGE: ${dayDifference}</div> : <div className = "dataGREEN"> OPEN-CLOSE PRICE CHANGE: ${dayDifference}</div>}
                {open >= yesterdayClose ? <div className = "dataGREEN"> MORNING GAPPER: {percentChange} % </div> : <div className = "dataRED"> MORNING GAPPER: {percentChange} % </div>}
                <div className = "data">PRE MARKET: ${stock.preMarket}</div>
                <div className = "data">AFTER HOURS:${stock.afterHours}</div>
            </div>
      </div> 
    : ""}

    {stock.status === 'NOT_FOUND' ? 
        <div className = "notFound"> We can't find this ticker data for this date. Please check inputs and try again.</div> 
    : ""}
    
   </>
  );
}

export default App;






