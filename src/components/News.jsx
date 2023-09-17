import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const count = simplified ? 6 : 12;

  const {
    data: cryptoNews,
    isFetching,
    isError,
  } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  console.log("API Response", cryptoNews);

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={6} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="nonreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} />
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
