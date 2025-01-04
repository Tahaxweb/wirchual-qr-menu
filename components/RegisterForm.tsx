"use client";
import React, { useState } from "react";
import * as FancyButton from "@/components/ui/fancy-button";
import * as Input from "@/components/ui/input";
import * as Label from "@/components/ui/label";
import { RiMailLine, RiEyeLine, RiEyeOffLine, RiPhoneLine, RiLock2Line } from "@remixicon/react";

// Tür tanımlamaları ekleyelim
interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  icon?: React.ElementType; // İkon için React ElementType kullanıyoruz
  rest?: Record<string, unknown>; // "rest" prop'u için Record<string, unknown> tipi belirliyoruz
}

function FormField({ label, id, type, placeholder, icon: Icon, rest }: FormFieldProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <Label.Root htmlFor={id}>{label}</Label.Root>
      <Input.Root>
        <Input.Wrapper>
          {Icon && <Input.Icon as={Icon} />}
          <Input.Input id={id} type={type} placeholder={placeholder} {...(rest || {})} />
        </Input.Wrapper>
      </Input.Root>
    </div>
  );
}

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="col-span-2 flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-6 items-center">
        <header className="text-center flex flex-col gap-1">
          <h2 className="text-title-h5 text-neutral-900">Dijital Menünüzü Hemen Oluşturun</h2>
          <p className="text-text-sub-600 text-paragraph-md">Müşteri Deneyiminizi En Üst Seviyeye Taşıyın</p>
        </header>
        <div className="border-b w-full"></div>

        <div className="grid w-full gap-3 grid-cols-1 md:grid-cols-2">
          <FormField label="Ad" id="first-name" type="text" placeholder="Adınızı girin" />
          <FormField label="Soyad" id="last-name" type="text" placeholder="Soyadınızı girin" />
        </div>

        <FormField label="Email Address" id="email" type="email" placeholder="example@qrmenuu.com" icon={RiMailLine} />
        <FormField label="İşletme Adı" id="company" type="text" placeholder="İşletmenizi girin" />
        <FormField label="Telefon Numarası" id="phone" type="tel" placeholder="(555) 000-00-00" icon={RiPhoneLine} />

        <div className="flex flex-col gap-1 w-full">
          <Label.Root htmlFor="password1">Şifre</Label.Root>
          <Input.Root>
            <Input.Wrapper>
              <Input.Icon as={RiLock2Line} />
              <Input.Input
                id="password1"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)}>
                {showPassword ? (
                  <RiEyeOffLine className="size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300" />
                ) : (
                  <RiEyeLine className="size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300" />
                )}
              </button>
            </Input.Wrapper>
          </Input.Root>
        </div>

        <FancyButton.Root className="w-full font-medium">Giriş Yap</FancyButton.Root>
      </div>
    </div>
  );
}

export default RegisterForm;