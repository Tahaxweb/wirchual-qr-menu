"use client";

import React, { useState } from "react";
import * as Input from "@/components/ui/input";
import * as Label from "@/components/ui/label";
import * as Checkbox from "@/components/ui/checkbox";
import * as FancyButton from "@/components/ui/fancy-button";
import Link from "next/link";
import {
  RiMailLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLock2Line,
} from "@remixicon/react";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const uniqueId = React.useId();

  interface InputProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    icon: React.ElementType;
    extra?: React.ReactNode;
  }

  const renderInput = ({
    id,
    label,
    type,
    placeholder,
    icon: Icon,
    extra,
  }: InputProps) => (
    <div className="flex flex-col w-full gap-1">
      <Label.Root htmlFor={id}>{label}</Label.Root>
      <Input.Root>
        <Input.Wrapper>
          <Input.Icon as={Icon} />
          <Input.Input id={id} type={type} placeholder={placeholder} />
          {extra}
        </Input.Wrapper>
      </Input.Root>
    </div>
  );

  return (
    <div className="col-span-2 flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-6 items-center">
        <header className="text-center flex flex-col gap-1">
          <h2 className="text-title-h4 text-neutral-900">Hesabınıza giriş yapın</h2>
          <p className="text-text-sub-600 text-paragraph-md">
            Giriş yapmak için bilgilerinizi girin.
          </p>
        </header>

        <span className="w-full border-b"></span>

        {renderInput({
          id: "email",
          label: "Email Address",
          type: "email",
          placeholder: "hello@qrmenu.com",
          icon: RiMailLine,
        })}

        {renderInput({
          id: "password",
          label: "Password",
          type: showPassword ? "text" : "password",
          placeholder: "••••••••••",
          icon: RiLock2Line,
          extra: (
            <button
              type="button"
              className="text-text-soft-400"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
            </button>
          ),
        })}

        <div className="flex justify-between w-full items-center">
          <div className="flex items-center gap-2">
            <Checkbox.Root id={`${uniqueId}-remember`}  />
            <Label.Root
              className="text-paragraph-sm"
              htmlFor={`${uniqueId}-remember`}
            >
              Bilgilerimi Hatırla
            </Label.Root>
          </div>
          <Link
             href="#"
            className="text-neutral-900 border-neutral-900 hover:underline "
            >
             Şifremi sıfırla
             </Link>
        </div>

        <FancyButton.Root className="w-full font-medium ">Giriş Yap</FancyButton.Root>
      </div>
    </div>
  );
};

export default LoginForm;