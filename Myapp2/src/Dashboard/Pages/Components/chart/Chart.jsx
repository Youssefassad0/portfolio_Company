/* eslint-disable react/prop-types */
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
  if (!dataT || dataT.length === 0) {
    return <div className="chart">No data available</div>;
  }

  const formatDataForChart = (data) => {
    const formattedData = {};
    data.forEach((item) => {
      const month = new Date(item.date).toLocaleString("default", { month: "long" });
      formattedData[month] = (formattedData[month] || 0) + item.Amount;
    });

    const chartData = Object.keys(formattedData)
      .map((month) => ({ name: month, Total: formattedData[month] }))
      .sort((a, b) => {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        return monthNames.indexOf(a.name) - monthNames.indexOf(b.name);
      });

    return chartData;
  };

  const chartData = formatDataForChart(dataT);

  return (
    <div className="chart">
      <div className="c-title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          data={chartData}
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
