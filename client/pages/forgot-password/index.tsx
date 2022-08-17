import React, { useEffect, useState } from "react";
import { auth } from "../../utils/firebase-config";
import { toast } from "react-toastify";
import Loader from "../../components/ui/loader";
import { NextPage } from "next";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useRouter } from "next/router";

const disabledButton =
  "cursor-not-allowed bg-gray-300 rounded-lg text-xl px-5 py-2 mb-5";

const enabledButton =
  "cursor-pointer bg-customLight rounded-lg hover:bg-customDark hover:text-white transition-all ease-in-out text-xl px-5 py-2 mb-5 flex items-center";

const ForgotPassword: NextPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const emailButtonDisabled = !email;

  const user = useAppSelector((store) => store.user);
  const router = useRouter();
  useEffect(() => {
    if (user && user?.token) router.push("/");
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await auth
      .sendPasswordResetEmail(email, {
        url: process.env.NEXT_PUBLIC_RESET_PASSWORD_REDIRECT || "",
        handleCodeInApp: true,
      })
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Email sent successfully");
      })
      .catch((error) => {
        setLoading(false);

        toast.error(error.message);
      });
  };
  return (
    <>
      <main className="h-[80vh] flex flex-col space-y-10 justify-center items-center">
        {/* <h1 className="text-center text-3xl">Welcome To Blinkart</h1> */}
        <div className="p-5 xs:w-5/6 lg:w-2/5 min-w-[320px] shadow-lg rounded-xl border border-black">
          <h2 className="text-3xl mb-10 text-center text-customDark">
            Forgot Password
          </h2>
          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="flex justify-evenly items-center px-3">
              <input
                className="h-10 text-xl outline-none border-b border-black w-5/6"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                autoFocus
              />
            </div>
            <div className="flex justify-center">
              <button
                disabled={emailButtonDisabled}
                className={emailButtonDisabled ? disabledButton : enabledButton}
                type="submit"
              >
                <span className="mx-2">Submit Email</span>
                {loading && <Loader />}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
