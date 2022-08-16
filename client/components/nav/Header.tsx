import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Head from "next/head";
import firebase from "firebase/compat/app";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { logoutUser } from "../../features/user/userSlice";
import { useRouter } from "next/router";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const { name, token } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    dispatch(logoutUser());
    router.push("/login");
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

        {token && (
          <SubMenu key="username" icon={<SettingOutlined />} title={name}>
            {name === "Guest" ? (
              <Item
                key="setting:1"
                // icon={<LogoutOutlined />}
                // onClick={handleLogout}
              >
                Option 1
              </Item>
            ) : (
              <Item
                key="setting:1"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Item>
            )}
          </SubMenu>
        )}

        {!token && (
          <>
            <Item key="signup" icon={<UserAddOutlined />}>
              <Link href="/sign-up">Sign Up</Link>
            </Item>

            <Item key="login" icon={<UserOutlined />}>
              <Link href="/login">Login</Link>
            </Item>
          </>
        )}
      </Menu>
    </>
  );
};

export default Header;
