"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, MonitorPlay, FileText, Database, Dna } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Visão Geral', href: '/professor', icon: LayoutDashboard },
  { name: 'Alunos e Grupos', href: '/professor/turmas', icon: Users },
  { name: 'Quadro Branco (Ao Vivo)', href: '/professor/quadro', icon: MonitorPlay },
  { name: 'Gerador de Provas PDF', href: '/professor/provas', icon: FileText },
  { name: 'Banco de Questões', href: '/professor/questoes', icon: Database },
];

export function ProfessorSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
        <Dna className="w-8 h-8 text-blue-400 mr-2" />
        <span className="text-xl font-bold text-white tracking-tight">BioVorazes</span>
        <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
          PRO
        </span>
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
                "flex items-center px-3 py-2.5 rounded-lg transition-colors group text-sm font-medium",
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 mr-3 transition-colors",
                isActive ? "text-blue-200" : "text-slate-400 group-hover:text-blue-400"
              )} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 border border-slate-700">
            P
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Prof. Charles</p>
            <p className="text-xs text-slate-500">Mestre em Biologia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
