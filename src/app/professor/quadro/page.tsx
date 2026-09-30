"use client";

import dynamic from 'next/dynamic';
import { Users, Mic, Video, Share, Settings, User, Plus } from 'lucide-react';
import { useState } from 'react';

// Tldraw precisa ser carregado dinamicamente no Next.js pois depende do objeto window
const Tldraw = dynamic(() => import('tldraw').then((mod) => mod.Tldraw), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  ),
});
import 'tldraw/tldraw.css';

export default function QuadroBrancoPage() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      
      {/* Barra de Ferramentas / Controle da Aula */}
      <div className="h-16 bg-slate-900 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center space-x-4 text-white">
          <div className="flex items-center bg-red-500/20 text-red-400 px-3 py-1 rounded-lg border border-red-500/30">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></span>
            <span className="text-sm font-bold tracking-widest">AO VIVO</span>
          </div>
          <span className="font-medium">Grupo ENEM Focado (4/5 Alunos)</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex bg-slate-800 rounded-lg p-1 mr-4">
            <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors" title="Microfone">
              <Mic className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors" title="Câmera">
              <Video className="w-5 h-5" />
            </button>
          </div>

          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            Liberar Lousa
          </button>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center shadow-sm">
            <Share className="w-4 h-4 mr-2" />
            Convidar Aluno
          </button>
          <button className="p-2 text-slate-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Conteúdo Principal: Câmeras Laterais + Quadro Branco */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar de Câmeras (Painel do Professor + Max 5 Alunos) */}
        <div className="w-64 bg-slate-800 flex flex-col p-4 space-y-4 overflow-y-auto z-10 border-r border-slate-700 shadow-xl">
          {/* Câmera do Professor */}
          <div className="bg-slate-900 rounded-xl aspect-video border-2 border-blue-500 relative overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 bg-slate-700 flex flex-col items-center justify-center text-slate-400">
               <Video className="w-8 h-8 mb-2 opacity-50" />
               <span className="text-xs font-bold">Câmera Ativa</span>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium flex items-center">
              Você (Prof)
            </div>
            <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1 text-white">
              <Mic className="w-3 h-3" />
            </div>
          </div>

          <hr className="border-slate-700" />

          {/* Câmeras dos Alunos */}
          {[
            { nome: "João Silva", status: "online", audio: "on" },
            { nome: "Lucas Costa", status: "online", audio: "off" },
            { nome: "Maria Oliveira", status: "online", audio: "on" },
            { nome: "Ana Paula", status: "online", audio: "off" },
          ].map((aluno, i) => (
            <div key={i} className="bg-slate-900 rounded-xl aspect-video border border-slate-600 relative overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 bg-slate-800 flex flex-col items-center justify-center text-slate-500">
                 <User className="w-8 h-8 mb-2 opacity-30" />
               </div>
              <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
                {aluno.nome}
              </div>
              <div className={`absolute bottom-2 right-2 rounded-full p-1 text-white ${aluno.audio === 'on' ? 'bg-green-500' : 'bg-red-500'}`}>
                <Mic className="w-3 h-3" />
              </div>
            </div>
          ))}
          
          {/* Slot Vazio (se tiver menos de 5) */}
          <div className="bg-slate-800 rounded-xl aspect-video border-2 border-dashed border-slate-600 relative overflow-hidden flex flex-col items-center justify-center text-slate-500">
             <Plus className="w-6 h-6 mb-1" />
             <span className="text-xs font-medium">Aguardando Aluno...</span>
          </div>

        </div>

        {/* Área do Quadro Branco (Tldraw) */}
        <div className="flex-1 relative bg-slate-50">
          <Tldraw persistenceKey="biovorazes-quadro" />
        </div>
      </div>

    </div>
  );
}
