import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const count = simplified ? 10 : 100;

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

  return <div>News</div>;
};

export default News;
