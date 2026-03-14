"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UsersIcon,
  AcademicCapIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
  DocumentDuplicateIcon,
  ShieldCheckIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Tableau de Bord", href: "/dashboard", icon: HomeIcon },
  { name: "Scolarité", href: "/dashboard/scolarite", icon: AcademicCapIcon },
  { name: "Élèves & Parents", href: "/dashboard/utilisateurs", icon: UsersIcon },
  { name: "Finances", href: "/dashboard/finances", icon: CreditCardIcon },
  { name: "Discipline", href: "/dashboard/discipline", icon: ShieldCheckIcon },
  { name: "Pointage", href: "/dashboard/attendance", icon: QrCodeIcon },
  { name: "Fichiers", href: "/dashboard/fichiers", icon: DocumentDuplicateIcon },
  { name: "Messages", href: "/dashboard/messages", icon: ChatBubbleLeftRightIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-900 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center mt-4">
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <AcademicCapIcon className="h-6 w-6 text-blue-900" />
             </div>
             <span className="text-xl font-bold text-white tracking-tight">La Bonté SaaS</span>
          </div>
        </div>
        <nav className="flex flex-1 flex-col mt-4">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
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
    </div>
  );
}
