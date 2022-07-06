import React from 'react'
import {Switch, Route, Link} from 'react-router-dom';
import{Layout, Typography, Space} from 'antd';
import {Navbar, Homepage, Exchanges, Cryptocurrencies, CryptoDetails, News} from './components';
import './App.css'
import { Redirect } from 'react-router-dom';
function App() {
  return (
    <div className='app'>
        <div className='navbar'>
            <Navbar/>
        </div>
        <div className='main'>
            <Layout>
              <div className='routes'>
                <Switch>
                  <Route exact path = "/">
                    <Homepage/>
                  </Route>
                  <Route exact path = "/exchanges">
                    <Exchanges/>
                  </Route>
                  <Route exact path = "/cryptocurrencies">
                    <Cryptocurrencies/>
                  </Route>
                  <Route exact path = "/cryptodetails/:coinId">
                    <CryptoDetails/>
                  </Route>
                  <Route exact path = "/news">
                    <News/>
                  </Route>
                </Switch>

              </div>
            </Layout>
        
        <div className='footer'>
            <Typography.Title level={5} style={{color : 'white', textAlign : 'center'}}>
                <strong style={{color : '#1890ff'}}>CoinSter</strong> by CenSoft<br/>
                All Right Reserved
            </Typography.Title>
            <Space>
              <Link to = "/">Home</Link>
              <Link to = "/">Exchanges</Link>
              <Link to = "/">News</Link>
            </Space>
        </div>  
        </div>    
    </div>
  
  )
}

export default App