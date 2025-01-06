"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  RiApps2Line,
  RiCloseLine,
  RiFolder2Line,
  RiHome6Line,
  RiLogoutBoxLine,
  RiMenuLine,
  RiPriceTag3Line,
} from "@remixicon/react";
import * as Dropdown from "@/components/ui/dropdown";
import Image from "next/image";
import { useRouter , usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: RiHome6Line, current: true },
  { name: "Kategoriler", href: "/admin/categorys", icon: RiFolder2Line, current: false },
  { name: "Ürünler", href: "#", icon: RiPriceTag3Line, current: false },
  { name: "Eklentiler", href: "#", icon: RiApps2Line, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
 
  const handleLogout = async (): Promise<void> => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
      });

      if (response.ok) {
        // Logout başarılı, giriş sayfasına yönlendir
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <RiCloseLine className="h-6 w-6 shrink-0 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-neutral-800 px-6 pb-2 ring-1 ring-white/10">
                    <div className="flex gap-3 h-16 shrink-0 items-center">
                      <Image
                        className=" h-12 w-auto"
                        src={"/icons/icon-logo.svg"}
                        alt="Your Company"
                        width={124}
                        height={124}
                      />
                      <span className=" text-paragraph-lg  font-semibold text-white">
                        Wirchual QR Menu
                      </span>
                    </div>
                    <nav className="flex flex-1 flex-col">
                    <ul role="list" className="-mx-2 flex-1 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                pathname === item.href
                                  ? "bg-neutral-600 text-white"
                                  : "text-gray-400 hover:text-white hover:bg-neutral-700",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                            >
                              <item.icon
                                className="h-6 w-6 shrink-0"
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-neutral-800 pt-4 lg:pb-4">
          <div className="flex h-16 shrink-0 items-center justify-center">
            <Image
              className=" h-14 w-auto"
              src={"/icons/icon-logo.svg"}
              alt="Your Company"
              width={64}
              height={64}
            />
          </div>
          <div className="border-b border-neutral-500 mx-auto my-3   w-16"></div>
          <nav>
          <ul role="list" className="flex flex-col items-center space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? "bg-neutral-600 text-white"
                        : "text-white hover:text-white",
                      "group flex text-[10px] max-w-14 rounded-lg min-h-14 px-2 items-center max-h-16 justify-center gap-1 flex-col"
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="sticky top-0 z-40 flex items-center justify-between gap-x-6 bg-neutral-800 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <RiMenuLine className="h-6 w-6 shrink-0 text-white" aria-hidden="true" />
          </button>
          <Dropdown.Root>
            <Dropdown.Trigger asChild>
              <img
                className="h-10 w-10 rounded-full bg-neutral-800"
                src={"/icons/avatar.svg"}
                alt=""
              />
            </Dropdown.Trigger>
            <Dropdown.Content align="start" className="mr-2 mt-2">
              <div
                onClick={handleLogout}
                className="py-2.5 hover:bg-neutral-100 hover:border  text-label-md flex gap-1  rounded-10 px-4"
              >
                <RiLogoutBoxLine /> Log out
              </div>
            </Dropdown.Content>
          </Dropdown.Root>
        </div>

        <main className="lg:pl-24 pr-4">
          <div className="justify-end lg:flex  items-center  w-full hidden px-5 pt.2.5 lg:justify-end lg:block border-b h-14">
            <Dropdown.Root>
              <Dropdown.Trigger asChild>
                <img
                  className="h-10 w-10 rounded-full bg-neutral-800"
                  src={"/icons/avatar.svg"}
                  alt=""
                />
              </Dropdown.Trigger>
              <Dropdown.Content align="start" className="mr-2 mt-2">
                <div
                  onClick={handleLogout}
                  className="py-2.5 hover:bg-neutral-100 hover:border  text-label-md flex gap-1  rounded-10 px-4"
                >
                  <RiLogoutBoxLine /> Log out
                </div>
              </Dropdown.Content>
            </Dropdown.Root>
          </div>

          {children}
        </main>
      </div>
    </>
  );
}