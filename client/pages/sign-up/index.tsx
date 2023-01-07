import React, { useEffect, useState } from "react";
import { auth } from "../../utils/firebase-config";
import { toast } from "react-toastify";
// import { disabledButton, enabledButton } from "../../constants/authForm";
import Loader from "../../components/ui/loader";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useRouter } from "next/router";
import { disabledButton, enabledButton } from "../../constants/authForm";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useAppSelector((store) => store.user);
  const router = useRouter();

  const emailButtonDisabled = !email;

  useEffect(() => {
    if (user && user?.token) router.push("/");
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.sendSignInLinkToEmail(email, {
        url: process.env.NEXT_PUBLIC_REGISTER_REDIRECT_URL || "",
        handleCodeInApp: true,
      });
      toast.success(`Email sent to ${email}`);
      // store user email in local storage
      window.localStorage.setItem("emailForRegistration", email);
      setEmail("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error in sending email");
      setLoading(false);
    }
  };
  return (
    <>
      <main className="h-[80vh] flex flex-col space-y-10 justify-center items-center">
        <h1 className="text-center text-3xl">Welcome To Blinkart</h1>
        <div className="p-5 xs:w-5/6 lg:w-2/5 min-w-[320px] shadow-lg rounded-xl border border-black">
          <h2 className="text-3xl mb-10 text-center text-customDark">
            Sign Up
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

export default SignUp;
