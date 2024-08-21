import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryCursorContainer } from 'victory';
import moment from 'moment';

const StockGraph = ({ stockData }) => {
  // Find today's and yesterday's dates
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'day').startOf('day');

  // Filter stock data for today or yesterday
  const filteredData = stockData.filter(({ date }) => {
    const dataDate = moment(date).startOf('day');
    return dataDate.isSame(today, 'day') || dataDate.isSame(yesterday, 'day');
  });

  // Find the minimum and maximum stock prices
  const minPrice = Math.min(...filteredData.map(({ close }) => close));
  const maxPrice = Math.max(...filteredData.map(({ close }) => close));

  return (
    <div style={{ backgroundColor: 'rgba(0, 0, 255, 0.1)', height:'400px', width:"850px" }}>
      <VictoryChart
        width={600}
        height={300}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryCursorContainer
            cursorDimension="x"
            cursorLabel={({ datum }) => `${moment(datum.x).format('MMM D, YYYY HH:mm')}\nPrice: ${datum.y.toFixed(2)}`}
            cursorLabelOffset={{ x: -50, y: -30 }} // Offset to ensure label doesn't go off-screen
          />
        }
      >
        <VictoryAxis
          tickFormat={(x) => moment(x).format('HH:mm')}
          style={{
            axis: { stroke: "#756f6a" },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 8, padding: 5 }
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "#756f6a" },
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 8, padding: 5 }
          }}
          domain={{ y: [minPrice - 10, maxPrice + 10] }}
        />
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc"}
          }}
          data={filteredData.map(({ date, close }) => ({ x: new Date(date), y: close }))}
        />
      </VictoryChart>
    </div>
  );
};

export default StockGraph;
