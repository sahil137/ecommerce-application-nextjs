import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu
        onClick={handleClick}
        defaultSelectedKeys={[current]}
        mode="horizontal"
      >
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link href="/">Home</Link>
        </Item>

        <SubMenu key="username" icon={<SettingOutlined />} title="Username">
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
        </SubMenu>

        <Item key="signup" icon={<UserAddOutlined />}>
          <Link href="/sign-up">Sign Up</Link>
        </Item>

        <Item key="login" icon={<UserOutlined />}>
          <Link href="/login">Login</Link>
        </Item>
      </Menu>
    </>
  );
};

export default Header;
