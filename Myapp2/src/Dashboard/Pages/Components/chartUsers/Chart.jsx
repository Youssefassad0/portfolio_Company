/* eslint-disable react/prop-types */
import "./Chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ aspect, title, dataT }) => {
  // Function to format the transaction data for the chart
  const formatDataForChart = (dataT) => {
    // Initialize an empty object to store formatted data
    const formattedData = {};
    
    // Loop through the transaction data and aggregate the amount for each month
    dataT.forEach((transaction) => {
      // Extract the month from the transaction date
      const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
  
      // If the month already exists in the formatted data, add the amount to its total
      if (formattedData[month]) {
        formattedData[month] += transaction.Amount;
      } else {
        // Otherwise, initialize the total for the month
        formattedData[month] = transaction.Amount;
      }
    });
  
    // Convert the formatted data object into an array of objects for recharts
    const chartData = Object.keys(formattedData).map((month) => ({
      name: month,
      Total: formattedData[month],
    }));
  
    // Sort the chart data by month
    chartData.sort((a, b) => {
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return monthNames.indexOf(a.name) - monthNames.indexOf(b.name);
    });
  
    return chartData;
  };
  

  // Format transaction data for the chart
  const chartData = formatDataForChart(dataT);

  return (
    <div className="chart">
      <div className="c-title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={chartData} // Use the formatted chart data
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;