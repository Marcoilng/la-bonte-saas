"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import CommandPalette from "./CommandPalette";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  UsersIcon,
  AcademicCapIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

// Note: In a real app we would extract this navigation array to a shared constant file
const navigation = [
  { name: "Tableau de Bord", href: "/dashboard", icon: HomeIcon, roles: ["Admin", "Teacher", "Student"] },
  { name: "Scolarité", href: "/dashboard/scolarite", icon: AcademicCapIcon, roles: ["Admin", "Teacher"] },
  { name: "Élèves & Parents", href: "/dashboard/utilisateurs", icon: UsersIcon, roles: ["Admin"] },
  { name: "Finances", href: "/dashboard/finances", icon: CreditCardIcon, roles: ["Admin"] },
  { name: "Discipline", href: "/dashboard/discipline", icon: ShieldCheckIcon, roles: ["Admin", "Teacher"] },
  { name: "Pointage", href: "/dashboard/attendance", icon: QrCodeIcon, roles: ["Admin", "Teacher"] },
  { name: "Fichiers", href: "/dashboard/fichiers", icon: DocumentDuplicateIcon, roles: ["Admin", "Teacher", "Student"] },
  { name: "Messages", href: "/dashboard/messages", icon: ChatBubbleLeftRightIcon, roles: ["Admin", "Teacher", "Student"] },
];

const currentUser = {
  role: "Admin" // Mocking the current user role
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

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
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Fermer le menu</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Mobile sidebar content */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-900 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center mt-4">
                      <span className="text-xl font-bold text-white tracking-tight">La Bonté SaaS</span>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation
                              .filter(item => item.roles.includes(currentUser.role))
                              .map((item) => {
                              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                              return (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                                      group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-6 transition-colors duration-200
                                      ${
                                        isActive
                                          ? "bg-blue-800 text-white"
                                          : "text-blue-100 hover:text-white hover:bg-blue-800/50"
                                      }
                                    `}
                                  >
                                    <item.icon
                                      className={`h-6 w-6 shrink-0 ${isActive ? "text-white" : "text-blue-200 group-hover:text-white"}`}
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <Sidebar  />

        <div className="lg:pl-72">
          {/* Topbar for mobile/desktop headers */}
          <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {children}
            </div>
            <CommandPalette />
          </main>
        </div>
      </div>
    </>
  );
}
