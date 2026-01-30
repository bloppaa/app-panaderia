"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/hoy", label: "Hoy", icon: "📝" },
  { href: "/historial", label: "Historial", icon: "📋" },
  { href: "/clientes", label: "Clientes", icon: "👥" },
  { href: "/reportes", label: "Reportes", icon: "📊" },
];

export const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 safe-area-inset-bottom">
      <div className="flex justify-around items-center max-w-4xl mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center justify-center py-3 px-2 min-w-[80px]
                transition-colors duration-200
                ${isActive ? "text-green-600" : "text-gray-600"}
              `}
            >
              <span className="text-3xl mb-1">{item.icon}</span>
              <span
                className={`text-sm font-semibold ${isActive ? "font-bold" : ""}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
