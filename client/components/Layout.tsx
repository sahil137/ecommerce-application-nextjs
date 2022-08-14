import React, { ReactNode } from "react";
import Header from "./nav/Header";
import { ToastContainer } from "react-toastify";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="max-w-[1536px] mx-auto my-0">
      <Header />
      <ToastContainer />
      {children}
    </div>
  );
};

export default Layout;
