"use client";

import dynamic from 'next/dynamic';
import { Mic, Video, Users, MessageSquare, Hand, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Tldraw = dynamic(() => import('tldraw').then((mod) => mod.Tldraw), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  ),
});

export default function QuadroAlunoPage() {
  const [handRaised, setHandRaised] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-2xl border border-green-200 overflow-hidden shadow-sm">
      
      {/* Barra Superior - Visão do Aluno */}
      <div className="h-16 bg-green-900 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center space-x-4 text-white">
          <div className="flex items-center bg-red-500/20 text-red-400 px-3 py-1 rounded-lg border border-red-500/30">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></span>
            <span className="text-sm font-bold tracking-widest">AO VIVO</span>
          </div>
          <span className="font-medium">Mitose e Meiose (Prof. Charles)</span>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center shadow-sm bg-green-600 text-white hover:bg-green-700 mr-2">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            Marcar no Quadro
          </button>
          
          <button 
            onClick={() => setHandRaised(!handRaised)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center shadow-sm ${
              handRaised ? "bg-yellow-500 text-yellow-950" : "bg-slate-800 text-white hover:bg-slate-700"
            }`}
          >
            <Hand className="w-4 h-4 mr-2" />
            {handRaised ? "Mão Levantada" : "Levantar a Mão"}
          </button>
          
          <Link href="/dashboard" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm ml-2">
            Sair
          </Link>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar de Câmeras */}
        <div className="w-64 bg-slate-100 flex flex-col p-4 space-y-4 overflow-y-auto z-10 border-r border-slate-200 shadow-sm">
          
          {/* Câmera do Professor (Maior Destaque) */}
          <div className="bg-slate-800 rounded-xl aspect-video border-2 border-green-500 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-slate-700 flex flex-col items-center justify-center text-slate-400">
               <Video className="w-8 h-8 mb-2 opacity-50" />
            </div>
            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
              Prof. Charles
            </div>
            <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1 text-white">
              <Mic className="w-3 h-3" />
            </div>
          </div>

          <hr className="border-slate-300" />

          {/* Câmera do Aluno (Você) */}
          <div className="bg-slate-800 rounded-xl aspect-video border-2 border-blue-400 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-slate-700 flex flex-col items-center justify-center text-slate-400">
               <Video className="w-8 h-8 mb-2 opacity-50" />
            </div>
            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
              Você
            </div>
            
            {/* Controles da própria câmera */}
            <div className="absolute inset-0 flex items-center justify-center space-x-2 opacity-0 hover:opacity-100 bg-black/40 transition-opacity">
              <button className="p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700">
                <Mic className="w-4 h-4" />
              </button>
              <button className="p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700">
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Outros Colegas (se houver) */}
          {[
            { nome: "João Silva", status: "online", audio: "on" },
            { nome: "Maria Oliveira", status: "online", audio: "on" },
          ].map((aluno, i) => (
            <div key={i} className="bg-slate-800 rounded-xl aspect-video border border-slate-300 relative overflow-hidden flex items-center justify-center">
              <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
                {aluno.nome}
              </div>
            </div>
          ))}

        </div>

        {/* Área do Quadro Branco (Tldraw) - Modo de Leitura/Visualização para o aluno */}
        <div className="flex-1 relative bg-slate-50">
          <Tldraw persistenceKey="biovorazes-quadro" />
          {/* Em um cenário real, poderiamos setar permissões através das options do editor a menos que o prof libere */}
        </div>
      </div>

    </div>
  );
}
