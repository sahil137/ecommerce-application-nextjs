import React, { useEffect, useState } from "react";
import { auth, googleAuthProvider } from "../../utils/firebase-config";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { loginUser } from "../../features/user/userSlice";
import { useRouter } from "next/router";
import {
  GoogleOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import Loader from "../../components/ui/loader";
import Link from "next/link";

const disabledButton =
  "cursor-not-allowed bg-gray-300 rounded-lg text-xl px-5 py-2 mb-5";

const enabledButton =
  "cursor-pointer bg-customLight rounded-lg hover:bg-customDark hover:text-white transition-all ease-in-out text-xl px-5 py-2 mb-5 flex items-center";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingEmailPassword, setLoadingEmailPassword] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const loginWithEmailDisabled = !email || password.length < 6;

  const user = useAppSelector((store) => store.user);
  useEffect(() => {
    if (user && user?.token) router.push("/");
  }, [user]);

  const handleTogglePassword = () => {
    setPasswordToggle(!passwordToggle);
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingEmailPassword(true);
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const idTokenResult = await user?.getIdTokenResult();
      dispatch(
        loginUser({
          email: user?.email,
          token: idTokenResult?.token,
          name: user?.displayName,
        })
      );
      router.push("/");
    } catch (error: any) {
      setLoadingEmailPassword(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    try {
      const { user } = await auth.signInWithPopup(googleAuthProvider);
      const idTokenResult = await user?.getIdTokenResult();
      dispatch(
        loginUser({
          email: user?.email,
          token: idTokenResult?.token,
          name: user?.displayName,
        })
      );
      setLoadingGoogle(false);
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
      setLoadingGoogle(false);
    }
  };

  return (
    <>
      <main className="h-[80vh] flex flex-col space-y-10 justify-center items-center">
        <h1 className="text-center text-3xl">Welcome Back To Blinkart</h1>
        <div className="xs:w-5/6 lg:w-2/5 min-w-[320px] shadow-lg rounded-xl border border-black">
          <h2 className="text-3xl mt-3 text-center text-customDark">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-evenly items-center px-3 my-5 xs:px-2 md:px-5">
              <input
                className="h-10 text-xl outline-none border-b border-black w-5/6"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                autoFocus
                required
              />
            </div>
            <div className="flex relative justify-center items-center xs:px-2 md:px-5">
              <input
                className="h-10 text-xl outline-none border-b border-black w-5/6"
                type={passwordType}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
              <div
                className="text-2xl right-[20%] absolute"
                onClick={handleTogglePassword}
              >
                {passwordToggle ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button
                className={
                  loginWithEmailDisabled ? disabledButton : enabledButton
                }
                type="submit"
                disabled={loginWithEmailDisabled}
              >
                <span className="mx-2">Login with Email/Password</span>

                {loadingEmailPassword && <Loader />}
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <button className={enabledButton} onClick={handleGoogleLogin}>
              <GoogleOutlined />
              <span className="mx-2">Login Using Google</span>
              {loadingGoogle && <Loader />}
            </button>
          </div>
          <div>
            <Link href="/forgot-password">
              <div className="flex justify-center mb-3">
                <span className="text-sm cursor-pointer text-customDark text-center">
                  Forgot Password
                </span>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
