import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ coinHistory, currentPrice, coinName }) {
  console.log(currentPrice)
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    const unixTime = coinHistory?.data?.history[i].timestamp;
    const date = new Date(unixTime*1000);
    coinTimestamp.push(date.toLocaleDateString("en-US"));
  }

  /*for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {            
    //new Date(+d.replace(/\/Date\((\d+)\)\//, '$1'));    
    const timestamp = coinHistory?.data?.history[i].timestamp;
    const date = new Date(timestamp * 1000);
    const datevalues = date.getFullYear()+"/"+date.getMonth()+1+"/"+date.getDate();
    coinTimestamp.push(datevalues);
;    //coinHistory?.data?.history[i].timestamp
  }*/


  console.log(coinPrice);         
  console.log(coinTimestamp);                                        //Debug Print
  console.log(coinHistory?.data.history[14].timestamp)
  //console.log(coinHistory);

  
  const data = {
    labels: coinTimestamp, // debug area for work
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-title">{coinName} Price Chart </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Typography.Title>
          <Typography.Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Typography.Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  )
}

export default LineChart;