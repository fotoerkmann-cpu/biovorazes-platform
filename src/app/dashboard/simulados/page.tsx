"use client";

import { useState } from "react";
import Link from "next/link";
import { PenTool, Clock, Trophy, ChevronRight, Search, Filter } from "lucide-react";

export default function SimuladosPage() {
  const [activeTab, setActiveTab] = useState("simulados");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Simulados e Exercícios</h1>
          <p className="text-gray-500 mt-1">Coloque seus conhecimentos em prática e ganhe XP.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("simulados")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "simulados"
              ? "bg-white text-green-700 shadow-sm"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
          }`}
        >
          Simulados Inéditos
        </button>
        <button
          onClick={() => setActiveTab("listas")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "listas"
              ? "bg-white text-green-700 shadow-sm"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
          }`}
        >
          Listas por Assunto
        </button>
      </div>

      {/* Filtros */}
      <div className="flex space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Buscar por tema ou palavra-chave..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm shadow-sm"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-50 flex items-center shadow-sm">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </button>
      </div>

      {/* Conteúdo das Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card de Simulado 1 */}
        <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-green-100 text-green-700 p-2.5 rounded-xl">
              <PenTool className="w-6 h-6" />
            </div>
            <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full flex items-center border border-red-100">
              <Clock className="w-3 h-3 mr-1" /> Termina em 2 dias
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Simulado ENEM: Ciências da Natureza</h3>
          <p className="text-sm text-gray-500 mb-6 flex-1">
            Teste completo com 45 questões envolvendo Biologia, Física e Química focado na matriz de referência do ENEM.
          </p>
          
          <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
            <div className="flex items-center text-yellow-600">
              <Trophy className="w-4 h-4 mr-1" />
              <span className="text-sm font-bold">+500 XP</span>
            </div>
            <Link href="/dashboard/simulados/123" className="text-green-600 font-medium text-sm flex items-center group-hover:text-green-700">
              Começar <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Card de Simulado 2 */}
        <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-100 text-blue-700 p-2.5 rounded-xl">
              <PenTool className="w-6 h-6" />
            </div>
            <span className="bg-green-50 text-green-600 text-xs font-bold px-2.5 py-1 rounded-full flex items-center border border-green-100">
              Novo
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Biologia Celular - Fuvest 2024</h3>
          <p className="text-sm text-gray-500 mb-6 flex-1">
            Coletânea das questões mais difíceis de Citologia que caíram nos últimos vestibulares da USP.
          </p>
          
          <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
            <div className="flex items-center text-yellow-600">
              <Trophy className="w-4 h-4 mr-1" />
              <span className="text-sm font-bold">+300 XP</span>
            </div>
            <Link href="/dashboard/simulados/123" className="text-green-600 font-medium text-sm flex items-center group-hover:text-green-700">
              Começar <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Card de Simulado 3 (Feito) */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col opacity-80">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-gray-200 text-gray-500 p-2.5 rounded-xl">
              <PenTool className="w-6 h-6" />
            </div>
            <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">
              Concluído (Nota: 8.5)
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Reino Plantae e Botânica</h3>
          <p className="text-sm text-gray-500 mb-6 flex-1">
            Teste de fixação sobre os grupos de plantas: Briófitas, Pteridófitas, Gimnospermas e Angiospermas.
          </p>
          
          <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-auto">
            <div className="flex items-center text-gray-500">
              <span className="text-sm font-medium">10/12 acertos</span>
            </div>
            <button className="text-gray-600 font-medium text-sm flex items-center hover:text-gray-800">
              Ver Gabarito <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
