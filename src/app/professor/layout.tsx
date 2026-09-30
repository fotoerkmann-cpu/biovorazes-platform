import React from 'react';
import { ProfessorSidebar } from '@/components/layout/ProfessorSidebar';
import { Header } from '@/components/layout/Header';

export default function ProfessorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <ProfessorSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50/50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
