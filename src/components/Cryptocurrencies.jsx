
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import {useGetCryptosQuery} from '../services/cryptoApi';
import React, { useState, useEffect } from 'react';

function Cryptocurrencies({simplified}) {
  const count = simplified?10:100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(cryptos);

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData);
  }, [cryptosList, searchTerm])

  if(isFetching) return 'Loading...';

  return (
    <div>                         
      <div className='search-crypto'>
        <Input placeholder='search coin' onChange={(e)=>setSearchTerm(e.target.value)}/>
      </div>
      <Row gutter = {[32, 32]} className = "crypto-card-container">
        {cryptos?.map((currency) =>(
          <Col xs={24} sm={12} lg={6} className = "crypto-card" key={currency.uuid}>
            {console.log(currency.uuid)}
            <Link to = {`/cryptodetails/${currency.uuid}`}>
              <Card
                title = {`${currency.rank}. ${currency.name}`}
                extra = {<img className='crypto-image' src = {currency.iconUrl}/>}
                hoverable
              >
                <p>Price = {currency.price}</p>
                <p>Market cap = {currency.marketCap}</p>
                <p>Daily Change = {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Cryptocurrencies