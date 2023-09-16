import React, { useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import icon from "../images/cryptocurrency.png";

const { Text, Title } = Typography;
const { SubMenu } = Menu;

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
    console.log("Collapsed state:", collapsed); // This will still log the previous state
  };

  return (
    <div className={`nav-container ${collapsed ? "collapsed" : ""}`}>
      <div className={`logo-container ${collapsed ? "collapsed" : ""}`}>
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
      </div>
      <Button
        type="primary"
        icon={<MenuOutlined />}
        onClick={toggleCollapsed}
        className="menu-toggle"
      />
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        className={`menu ${collapsed ? "collapsed" : ""}`}
      >
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">
            <span className="menu-label">Home</span>{" "}
          </Link>
        </Menu.Item>

        <Menu.Item icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">CryptoCurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />}>
          <Link to="/exchanges">Exchanges</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
