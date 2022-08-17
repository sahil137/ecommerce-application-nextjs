import React, { useEffect, useState } from "react";
import { auth } from "../../../utils/firebase-config";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
// import { disabledButton, enabledButton } from "../../../constants/authForm";
import Loader from "../../../components/ui/loader";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { loginUser } from "../../../features/user/userSlice";

const disabledButton =
  "cursor-not-allowed bg-gray-300 rounded-lg text-xl px-5 py-2 mb-5";

const enabledButton =
  "cursor-pointer bg-customLight rounded-lg hover:bg-customDark hover:text-white transition-all ease-in-out text-xl px-5 py-2 mb-5 flex items-center";

const SignUpComplete = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginWithEmailDisabled = !email || password.length < 6;

  useEffect(() => {
    if (typeof window !== undefined) {
      setEmail(window.localStorage.getItem("emailForRegistration") || "");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email && !password) {
      toast.error("Email and Password are required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must contain atleast 6 character");
      return;
    }
    setLoading(true);
    try {
      const data = await auth.signInWithEmailLink(email, window.location.href);
      if (data?.user?.emailVerified) {
        // remove email from local storage
        window.localStorage.removeItem("emailForRegistartion");

        const user = auth.currentUser;

        // update user password
        await user?.updatePassword(password);
        // get the token for this user
        const idTokenResult = await user?.getIdTokenResult();
        dispatch(
          loginUser({
            email: user?.email,
            token: idTokenResult?.token,
            name: user?.displayName,
          })
        );
        setLoading(false);
        router.push("/");
      }
      console.log("result", data);
    } catch (error: any) {
      console.log("Error", error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <main className="h-[80vh] flex flex-col space-y-10 justify-center items-center">
        <h1 className="text-center text-3xl">Welcome To Blinkart</h1>
        <div className="p-5 xs:w-5/6 lg:w-2/5 min-w-[320px] border border-black shadow-lg rounded-xl">
          <h2 className="text-3xl mb-10 text-center text-customDark">
            Sign Up
          </h2>
          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="flex justify-evenly items-center">
              <input
                className="h-10 px-2 text-xl outline-none rounded-xl w-5/6"
                type="email"
                name="email"
                value={email}
                disabled
              />
            </div>
            <div className="flex justify-evenly items-center">
              <input
                className="h-10 px-2 text-xl outline-none border-b border-black w-5/6"
                type="password"
                id="email"
                name="email"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                autoFocus
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                disabled={loginWithEmailDisabled}
                className={
                  loginWithEmailDisabled ? disabledButton : enabledButton
                }
                type="submit"
              >
                <span className="mx-2">Complete Sign Up</span>

                {loading && <Loader />}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default SignUpComplete;
