import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import Loader from "./Loader";
import LineChart from "./LineChart";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  const cryptoDetails = data?.data?.coins;
  const genericData = data?.data?.stats;
  const [coinDescription, setCoinDescription] = useState("");

  console.log(genericData, "Generic Data");
  console.log(cryptoDetails, "cryptodetails");
  console.log(coinId, "coin id");

  if (isFetching) return <Loader />;

  const selectedCrypto = cryptoDetails.find((crypto) => crypto.uuid === coinId);

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: genericData?.totalMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: genericData?.totalExchanges,
      icon: <MoneyCollectOutlined />,
    },
  ];

  return (
    <>
      <Col className="coin-details-container">
        <Col className="coin-geading-container">
          <Title level={2} className="coin-name">
            {selectedCrypto.name} ({selectedCrypto.symbol})
          </Title>
          <p>
            {selectedCrypto.name} live price in USD. View calues statistic,
            market cap and supply
          </p>
        </Col>
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="select time period"
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>

        {/* <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(selectedCrypto?.price)}
          coinName={selectedCrypto?.name}
        /> */}
        <Col className="starts-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                {selectedCrypto.name} Value Statistics
                <p>An overview showing the stats of {selectedCrypto.name}</p>
              </Title>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">
                  {title === "Price to USD"
                    ? `$ ${millify(selectedCrypto.price)}`
                    : title === "Rank"
                    ? selectedCrypto.rank
                    : title === "24h Volume"
                    ? selectedCrypto["24hVolume"]
                      ? `$ ${millify(selectedCrypto["24hVolume"])}`
                      : "N/A" // Display "N/A" if volume is undefined
                    : title === "Market Cap"
                    ? `$ ${millify(selectedCrypto.marketCap)}`
                    : "N/A"}
                </Text>
              </Col>
            ))}
          </Col>
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                Other Statistics
                <p>An overview of the stats of all Cryptocurrencies</p>
              </Title>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">
                  {title === "Number Of Markets"
                    ? `$ ${millify(genericData.totalMarkets)}`
                    : title === "Number Of Exchanges"
                    ? genericData.totalExchanges
                    : "N/A"}
                </Text>
              </Col>
            ))}
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default CryptoDetails;
