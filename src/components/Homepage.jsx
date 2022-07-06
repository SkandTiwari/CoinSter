import React from 'react'
import millify from 'millify';
import{Row, Col, Typography, Select, Statistic} from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import {Link} from 'react-router-dom';
import { Cryptocurrencies, News } from '../components'
// this is the main homepage of our development setup ;-)



function Homepage() {

  const { data, isFetching } = useGetCryptosQuery(10);     // here we are getting the API data as hooks
  const globalStats = data?.data?.stats               // going inside the data object to find stats


  console.log(data);
  if(isFetching)return 'loading data...'

  return (
    <div>
        <Typography.Title level={2} className = 'heading'>
            Worldwide Crypto Statistics
        </Typography.Title>
        <Row>
          <Col span = {12}><Statistic title = "Total Cryptocurrencies" value = {globalStats?.total}/></Col>               
          <Col span = {12}><Statistic title = "Total Exchanges" value = {/*millify(*/globalStats?.totalExchanges/*)*/}/></Col>
          <Col span = {12}><Statistic title = "Total Market Cap" value = {/*millify(*/globalStats?.totalMarketCap/*)*/}/></Col>
          <Col span = {12}><Statistic title = "Total 24h Volume" value = {/*millify(*/globalStats?.total24hVolume/*)*/}/></Col>
          <Col span = {12}><Statistic title = "Total Markets" value = {/*millify(*/globalStats?.totalMarkets/*)*/}/></Col>
        </Row>
        
        {/*<Cryptocurrencies simplified />*/}
        <div className='home-heading-container'>
          <Typography.Title level = {2} className = 'home-title'>Top 10 Cryptocurrencies</Typography.Title>
          <Typography.Title level = {4} className = 'show-more'><Link to = '/cryptocurrencies'>Show More</Link></Typography.Title>
        </div>
        <Cryptocurrencies simplified = {true} /> {/*displaying top 10 cryptos on mainpage*/}

        
        <div className='home-heading-container'>
          <Typography.Title level = {2} className = 'home-title'>Latest Crypto News and Information</Typography.Title>
          <Typography.Title level = {4} className = 'show-more'><Link to = '/news'>Show More</Link></Typography.Title>
        </div>
        <News simplified = {true}/>
    </div>
    
  )
}

export default Homepage;