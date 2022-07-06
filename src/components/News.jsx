import React, {useState} from 'react'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Select, Typography, Avatar, Card, Row, Col, Input } from 'antd';
import demoCoin from "../images/newsImage.JPG";
import moment from 'moment';

function News({ simplified }) {
  const[newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: `${newsCategory}`, count: simplified ? 5 : 20 });
  const { data } = useGetCryptosQuery(100);
  console.log(cryptoNews);
  if (!cryptoNews?.value) return "Loading...";
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span = {24}>
          <Select
            showSearch
            className='select-news'
            placeholder = 'select coin'
            optionFilterProp='children' 
            onChange={(value) => setNewsCategory(value)}
            filterOption = {(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}

          >
            <Select.Option value = "Cryptocurrency">Cryptocurrency</Select.Option>
            {data?.data?.coins.map((coin) => <Select.Option value = {coin.name}>{coin.name}</Select.Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className='news-image-container'>
                <Typography.Title className='news-title' level={4}>
                  {news.name}
                </Typography.Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoCoin} alt="news" />
              </div>
              <p>
                {news.description > 80 ? `${news.description.substring(0, 80)}...` : news.description}
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt="image" />
                  <Typography.Text className='provider-container'>{news.provider[0]?.name}</Typography.Text>
                </div>
                <Typography.Text>{moment(news.datePublished).startOf('mm').fromNow()}</Typography.Text>
              </div>
            </a>
          </Card>
        </Col>

      ))}

    </Row>
  )
}

export default News;