import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { Row, Col, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import millify from 'millify';
import LineChart from './LineChart';

const CryptoDetails = () => {
  const { coinId } = useParams();
  const { timeperiod, setTimeperiod } = useState('30d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const{ data: coinHistory } = useGetCryptoHistoryQuery({coinId, timeperiod})

  const cryptoDetails = data?.data?.coin;

  if(isFetching) return 'loading...'

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
  console.log(data);
  console.log(coinHistory);
  const { Option } = Select;
  if (isFetching) return "loading...";
  return (
    <Col className="coin-details-container">
      <Col className="coin-heading-container">
        <Typography.Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) price
        </Typography.Title>
        <p>
          {cryptoDetails.name} Live price in USD. View Statistics, Market Cap and Supply.

        </p>

      </Col>
      <Select defaultValue="30d" className='select-timeperiod'
        placeholder="select Timeperiod"
        onChange={(value) => setTimeperiod(value).bind(this)}
      >
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />
      {/*<img className='crypto-image' src = {cryptoDetails.iconUrl}/>*/}
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className="coin-value-statistics-heading">
            <Typography.Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Typography.Title>
            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Typography.Text>{icon}</Typography.Text>
                <Typography.Text>{title}</Typography.Text>
              </Col>
              <Typography.Text className="stats">{value}</Typography.Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className="coin-value-statistics-heading">
            <Typography.Title level={3} className="coin-details-heading">General Statistics</Typography.Title>
            <p>An overview showing the statistics of all coins accoring to current market</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Typography.Text>{icon}</Typography.Text>
                <Typography.Text>{title}</Typography.Text>
              </Col>
              <Typography.Text className="stats">{value}</Typography.Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Typography.Title level = {3} className = "coin-details-heading">
              About {cryptoDetails.name}
              {HTMLReactParser(cryptoDetails.description)}
          </Typography.Title>
        </Row>
        <Col className="coin-links">
          <Typography.Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Typography.Title>
          {cryptoDetails.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Typography.Title level={5} className="link-name">{link.type}</Typography.Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>


  )
}

export default CryptoDetails;



      