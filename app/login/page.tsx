
import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import React from "react";

const Login = () => {
  return (
    <div className="grid h-screen grid-cols-1 p-3 md:grid-cols-2 lg:grid-cols-5">
      <LoginForm />
      <div className="col-span-3 hidden lg:grid place-items-center rounded-2xl bg-neutral-800">
        <Image src="/images/logo-box.svg" alt="logo" width={430} height={430}   className="pointer-events-none" draggable="false" />
      </div>
    </div>
  );
};

export default Login;