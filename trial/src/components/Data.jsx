import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors,
    PointElement
} from 'chart.js';

ChartJs.register(
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors,
    PointElement
);

export default function LineChart() {
    const [nifty50Stocks, setNifty50Stocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [selectedPortfolioStock, setSelectedPortfolioStock] = useState(null);

  useEffect(() => {
    const fetchNifty50Stocks = async () => {
      try {
        const response = await fetch('https://financialmodelingprep.com/api/v3/dowjones_constituent?apikey=4ROWZKfQL8uViqk91d07v6HpE8bCsSrr');
        const data = await response.json();
        if (data && data.length > 0) {
          const symbolsList = data.map(stock => stock.symbol);
          setNifty50Stocks(symbolsList);
        } else {
          console.error('Error fetching Nifty 50 stocks: Empty response or missing data');
        }
      } catch (error) {
        console.error('Error fetching Nifty 50 stocks:', error);
      }
    };

    fetchNifty50Stocks();
  }, []);

  const fetchStockData = async (stockSymbol) => {
    try {
      const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/1min/${stockSymbol}?apikey=4ROWZKfQL8uViqk91d07v6HpE8bCsSrr`);
      const data = await response.json();
      if (data && data.length > 0) {
        setStockData(data);
      } else {
        console.error('Error fetching stock data: Empty response or missing data');
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleStockSelection = (event) => {
    const symbol = event.target.value;
    setSelectedStock(symbol);
    if (symbol) {
      fetchStockData(symbol);
    }
  };

  const addToPortfolio = async () => {
    if (selectedStock && !portfolio.some(stock => stock.symbol === selectedStock)) {
      try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/quote/${selectedStock}?apikey=4ROWZKfQL8uViqk91d07v6HpE8bCsSrr`);
        const data = await response.json();
        if (data && data.length > 0) {
          const stockData = {
            symbol: data[0].symbol,
            open: data[0].open,
            close: data[0].previousClose,
            current: data[0].price,
            high: data[0].dayHigh,
            low: data[0].dayLow,
          };
          setPortfolio([...portfolio, stockData]);
        } else {
          console.error('Error adding stock to portfolio: No data received');
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    }
  };

  const removeStockFromPortfolio = (symbolToRemove) => {
    setPortfolio(portfolio.filter(stock => stock.symbol !== symbolToRemove));
    if (selectedPortfolioStock === symbolToRemove) {
      setSelectedPortfolioStock(null);
      setStockData([]);
    }
  };
  

  const handlePortfolioStockSelection = (symbol) => {
    setSelectedPortfolioStock(symbol);
    fetchStockData(symbol);
  };

  const options = {
    scales: {
        x: {
            ticks: {
                autoSkip: true,
                maxTicksLimit: 10, // Adjust the maximum number of ticks shown on the x-axis
            },
        },
        y: {
            suggestedMin: Math.min(...intradayData.map(point => point.price)) - 5, // Adjust the minimum value of the y-axis
            suggestedMax: Math.max(...intradayData.map(point => point.price)) + 5, // Adjust the maximum value of the y-axis
        },
    },
    plugins: {
        legend: {
            display: true,
            position: 'top',
        },
    },
    maintainAspectRatio: false, // Disable aspect ratio to allow the chart to fill its container
    responsive: true, // Enable responsiveness
    elements: {
        point: {
            radius: 0, // Disable points on the line
        },
    },
};

const data = {
    labels: intradayData.map(point => point.time.split(" ")[1]).reverse(), // Reverse the labels array
    datasets: [
        {
            label: "Price",
            data: intradayData.map(point => point.price),
            backgroundColor: "rgba(255, 19, 132, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
        },
    ],
};

  return (
    <div className="app-container">
      <div className="stock-selection">
        <h2>Stock Trading Platform</h2>
        <div>
          <h3 style={{marginTop:'1rem'}}>Nifty 50 Stocks</h3>
          <select className='dropdownmenu' value={selectedStock} onChange={handleStockSelection}>
            <option className='options' value="">Select a stock</option>
            {nifty50Stocks.map((stock, index) => (
             <option className='options' key={index} value={stock}>{stock}</option>
            ))}
          </select>
          <button className='addbtn' onClick={addToPortfolio}>Add to Portfolio</button>
        </div>
        <div style={{ width: '60vw', height: '50vh' }}> {/* Adjust width of graph */}
                <Line options={options} data={data}></Line>
            </div>
        <div className='portfolio'>
  <h3>Portfolio</h3>
  <table className="portfolio-table">
    <thead>
      <tr style={{display:'flex'}}>
        <th style={{width:'70px'}}>Symbol</th>
        <th style={{width:'70px'}}>Open</th>
        <th style={{width:'70px'}}>Close</th>
        <th style={{width:'70px'}}>Current</th>
        <th style={{width:'70px'}}>Day High</th>
        <th style={{width:'70px'}}>Day Low</th>
        <th style={{width:'90px'}}>View Graph</th>
        <th style={{width:'100px'}}>Remove Stock</th>
      </tr>
    </thead>
    <tbody>
      {portfolio.map((stock, index) => (
        <tr key={stock.symbol + index} style={{display:'flex'}}>
          <td style={{width:'70px', display:'flex', justifyContent:'center'}}>{stock.symbol}</td>
          <td style={{width:'70px', display:'flex', justifyContent:'center'}}>{stock.open}</td>
          <td style={{width:'70px', display:'flex', justifyContent:'center'}}>{stock.close}</td>
          <td style={{width:'70px', display:'flex', justifyContent:'center'}}>{stock.current}</td>
          <td style={{width:'70px', display:'flex', justifyContent:'center'}}>{stock.high}</td>
          <td style={{width:'70px', display:'flex', justifyContent:'center'}}>{stock.low}</td>
            <td style={{width:'90px', display:'flex', justifyContent:'center'}}>
            <button onClick={() => handlePortfolioStockSelection(stock.symbol)}>View</button>
            </td>
          <td style={{width:'100px', display:'flex', justifyContent:'center'}}>
            <button onClick={() => removeStockFromPortfolio(stock.symbol)}>Remove</button>
            </td>
          
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>

    </div>
    );
}