"use client";

import AuthForm from "./_components/auth-form";

const AuthPage = () => {
  return (
    <div className=" min-h-screen w-full bg-gradient-to-r from-green-100 via-blue-200 to-purple-400 inset-0 flex justify-center items-center">
      <AuthForm />
    </div>
  );
};

export default AuthPage;
