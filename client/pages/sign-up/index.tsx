import React, { useState } from "react";
import { auth } from "../../utils/firebase-config";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await auth.sendSignInLinkToEmail(email, {
        url: process.env.NEXT_PUBLIC_REGISTER_REDIRECT_URL || "",
        handleCodeInApp: true,
      });
      toast.success(`Email sent to ${email}`);
      // store user email in local storage
      window.localStorage.setItem("emailForRegistration", email);
      setEmail("");
    } catch (error) {
      console.log(error);
      toast.error("Error in sending email");
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
                className="bg-customLight rounded-lg hover:bg-customDark hover:text-white transition-all ease-in-out delay-100 text-xl px-5 py-2 mb-5"
                type="submit"
              >
                Submit Email
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default SignUp;
