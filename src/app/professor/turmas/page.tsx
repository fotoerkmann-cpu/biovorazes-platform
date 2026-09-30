"use client";

import { User, Users, Plus, Search, Video, Calendar } from "lucide-react";
import { useState } from "react";

export default function TurmasPage() {
  const [activeTab, setActiveTab] = useState("individuais");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Alunos e Grupos</h1>
          <p className="text-slate-500 mt-1">Gerencie seus alunos individuais e grupos de estudo (máx 5 alunos).</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-sm flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Novo Aluno / Grupo
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-200 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("individuais")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
            activeTab === "individuais"
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-300"
          }`}
        >
          <User className="w-4 h-4 mr-2" />
          Alunos Individuais
        </button>
        <button
          onClick={() => setActiveTab("grupos")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
            activeTab === "grupos"
              ? "bg-white text-slate-800 shadow-sm"
              : "text-slate-500 hover:text-slate-700 hover:bg-slate-300"
          }`}
        >
          <Users className="w-4 h-4 mr-2" />
          Grupos (Max 5)
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar por nome do aluno ou grupo..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Lista de Alunos Individuais */}
        {activeTab === "individuais" && (
          <div className="divide-y divide-slate-100">
            {[
              { nome: "Lucas Costa", nivel: "Larva", aulas: 12, ultima: "Ontem" },
              { nome: "Maria Oliveira", nivel: "Ovo", aulas: 2, ultima: "Há 3 dias" },
              { nome: "João Silva", nivel: "Pupa", aulas: 24, ultima: "Há 1 semana" },
            ].map((aluno, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold border border-green-200">
                    {aluno.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{aluno.nome}</p>
                    <p className="text-sm text-slate-500">Nível: {aluno.nivel} • {aluno.aulas} aulas concluídas</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="flex items-center text-sm font-medium text-slate-600 bg-slate-100 px-3 py-2 rounded-lg hover:bg-slate-200">
                    <Calendar className="w-4 h-4 mr-2" /> Agendar
                  </button>
                  <button className="flex items-center text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg hover:bg-blue-100">
                    <Video className="w-4 h-4 mr-2" /> Iniciar Aula
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lista de Grupos */}
        {activeTab === "grupos" && (
          <div className="divide-y divide-slate-100">
            {[
              { nome: "Grupo ENEM Focado", alunos: 4, foco: "Revisão Geral" },
              { nome: "Avançado Fuvest", alunos: 5, foco: "Genética e Evolução" },
              { nome: "Iniciantes Citologia", alunos: 3, foco: "Biologia Celular" },
            ].map((grupo, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 border border-blue-200">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <p className="font-bold text-slate-800 mr-2">{grupo.nome}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${grupo.alunos === 5 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                        {grupo.alunos}/5 Alunos
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5">Foco: {grupo.foco}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="flex items-center text-sm font-medium text-slate-600 bg-slate-100 px-3 py-2 rounded-lg hover:bg-slate-200">
                    <Calendar className="w-4 h-4 mr-2" /> Agendar
                  </button>
                  <button className="flex items-center text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg hover:bg-blue-100">
                    <Video className="w-4 h-4 mr-2" /> Iniciar Aula
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
