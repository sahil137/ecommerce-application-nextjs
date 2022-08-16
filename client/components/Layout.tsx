import React, { ReactNode, useEffect } from "react";
import Header from "./nav/Header";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "../hooks/redux-hooks";
import { auth } from "../utils/firebase-config";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

import { loginUser } from "../features/user/userSlice";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch(
          loginUser({
            email: user.email,
            token: idTokenResult.token,
            name: user.displayName,
          })
        );
      }
    });

    // cleanup
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="max-w-[1536px] mx-auto my-0">
      <Header />
      <ToastContainer />
      {children}
    </div>
  );
};

export default Layout;
