/* eslint-disable @typescript-eslint/no-unused-vars */
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
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const uniqueId = React.useId();
  
  // State for email and password
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", { email, password });

      if (response.status === 200) {
        window.location.href = "/admin/dashboard";
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  // Input component
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
          <Input.Input
            id={id}
            name={id} // Add name attribute to link it with formData
            value={id === "email" ? email : password} // Bind value to the respective state
            onChange={handleChange} // Handle change for formData
            type={type}
            placeholder={placeholder}
          />
          {extra}
        </Input.Wrapper>
      </Input.Root>
    </div>
  );

  return (
    <div className="col-span-2 flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-6 items-center">
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
            <Checkbox.Root id={`${uniqueId}-remember`} />
            <Label.Root
              className="text-paragraph-sm"
              htmlFor={`${uniqueId}-remember`}
            >
              Bilgilerimi Hatırla
            </Label.Root>
          </div>
          <Link
            href="#"
            className="text-neutral-900 border-neutral-900 hover:underline"
          >
            Şifremi sıfırla
          </Link>
        </div>

        <FancyButton.Root
          type="submit"
          className="w-full font-medium"
        >
          Giriş Yap
        </FancyButton.Root>
        <span>
          Hesabınız yok mu?{" "}
          <Link href={"/register"} className="hover:underline">
            Hesap Oluştur
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
/* eslint-enable @typescript-eslint/no-unused-vars */