"use client";
import React, { useState } from "react";
import * as FancyButton from "@/components/ui/fancy-button";
import * as Input from "@/components/ui/input";
import * as Label from "@/components/ui/label";
import { RiMailLine, RiEyeLine, RiEyeOffLine, RiPhoneLine, RiLock2Line } from "@remixicon/react";
import axios from "axios";

// Tür tanımlamaları ekleyelim
interface FormFieldProps {
  label: string;
  id: string;
  name: string; // name özelliği eklendi
  type: string;
  placeholder: string;
  icon?: React.ElementType; // İkon için React ElementType kullanıyoruz
  rest?: Record<string, unknown>; // "rest" prop'u için Record<string, unknown> tipi belirliyoruz
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string; // value özelliği eklendi
}

function FormField({ label, id, name, type, placeholder, icon: Icon, rest, onChange, value }: FormFieldProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <Label.Root htmlFor={id}>{label}</Label.Root>
      <Input.Root>
        <Input.Wrapper>
          {Icon && <Input.Icon as={Icon} />}
          <Input.Input
            id={id}
            name={name} // name özelliği eklendi
            type={type}
            placeholder={placeholder}
            value={value} // value özelliği eklendi
            onChange={onChange}
            {...(rest || {})}
          />
        </Input.Wrapper>
      </Input.Root>
    </div>
  );
}

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Burada name kullanarak doğru input alanını güncelliyoruz
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/signup', formData);
      alert('User created successfully');
    } catch (error) {
      alert('User creation failed');
    }
  };

  return (
    <div className="col-span-2 flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-6 items-center">
        <header className="text-center flex flex-col gap-1">
          <h2 className="text-title-h5 text-neutral-900">Dijital Menünüzü Hemen Oluşturun</h2>
          <p className="text-text-sub-600 text-paragraph-md">Müşteri Deneyiminizi En Üst Seviyeye Taşıyın</p>
        </header>
        <div className="border-b w-full"></div>

        <div className="grid w-full gap-3 grid-cols-1 md:grid-cols-2">
          <FormField label="Ad" id="first-name" name="firstName" type="text" placeholder="Adınızı girin" onChange={handleChange} value={formData.firstName} />
          <FormField label="Soyad" id="last-name" name="lastName" type="text" placeholder="Soyadınızı girin" onChange={handleChange} value={formData.lastName} />
        </div>

        <FormField label="Email Address" id="email" name="email" type="email" placeholder="example@qrmenuu.com" icon={RiMailLine} onChange={handleChange} value={formData.email} />
        <FormField label="İşletme Adı" id="company" name="companyName" type="text" placeholder="İşletmenizi girin" onChange={handleChange} value={formData.companyName} />
        <FormField label="Telefon Numarası" id="phone" name="phoneNumber" type="tel" placeholder="(555) 000-00-00" icon={RiPhoneLine} onChange={handleChange} value={formData.phoneNumber} />

        <div className="flex flex-col gap-1 w-full">
          <Label.Root htmlFor="password1">Şifre</Label.Root>
          <Input.Root>
            <Input.Wrapper>
              <Input.Icon as={RiLock2Line} />
              <Input.Input
                id="password1"
                name="password" // name özelliği eklendi
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                value={formData.password} // value özelliği eklendi
                onChange={handleChange} // onChange özelliği eklendi
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
      </form>
    </div>
  );
}

export default RegisterForm;