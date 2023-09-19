import React, { useState, useRef, useEffect } from "react";
import Chart from "chart.js/auto"; // Import Chart.js
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  const chartRef = useRef(null); // Create a ref for the chart component
  const [chart, setChart] = useState(null);

  useEffect(() => {
    // Ensure that the previous chart instance is destroyed when a new one is created
    if (chart) {
      chart.destroy();
    }

    // Create a new chart instance here
    const ctx = chartRef.current.getContext("2d");
    const newChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: options,
    });

    // Store the new chart instance
    setChart(newChart);

    return () => {
      // Cleanup: Ensure that the chart instance is destroyed when the component unmounts
      if (chart) {
        chart.destroy();
      }
    };
  }, [coinHistory, currentPrice, coinName]);

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "linear", // Use 'linear' scale for numerical data
        beginAtZero: true,
        min: 0, // Minimum value for the axis
        max: 100, // Maximum value for the axis
        stepSize: 10, // Interval between ticks
      },
    },
  };

  // Log data and options for debugging
  console.log("Data:", data);
  console.log("Options:", options);

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <canvas ref={chartRef}></canvas>
    </>
  );
};

export default LineChart;
