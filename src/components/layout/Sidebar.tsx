"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, PenTool, LayoutTemplate, Settings, Dna } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Minhas Aulas', href: '/dashboard/aulas', icon: BookOpen },
  { name: 'Simulados & Exercícios', href: '/dashboard/simulados', icon: PenTool },
  { name: 'Conquistas', href: '/dashboard/conquistas', icon: LayoutTemplate },
  { name: 'Configurações', href: '/dashboard/configuracoes', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-green-200 flex flex-col h-full shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-green-100">
        <Dna className="w-8 h-8 text-green-600 mr-2" />
        <span className="text-xl font-bold text-green-800 tracking-tight">BioVorazes</span>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg transition-colors group",
                isActive 
                  ? "bg-green-100 text-green-800 font-medium" 
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 mr-3 transition-colors",
                isActive ? "text-green-700" : "text-gray-400 group-hover:text-green-600"
              )} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-green-100">
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-xs font-semibold text-green-800 mb-1">Módulo Atual</p>
          <p className="text-sm text-gray-600">Citologia Básica</p>
          <div className="mt-3 bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-green-500 w-2/3 h-full rounded-full"></div>
          </div>
          <p className="text-right text-xs text-green-700 mt-1">66%</p>
        </div>
      </div>
    </div>
  );
}
