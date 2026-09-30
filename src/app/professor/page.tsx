"use client";

import { Users, FileText, Activity, Clock } from "lucide-react";

export default function ProfessorDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Painel do Professor</h1>
          <p className="text-slate-500 mt-1">Bem-vindo de volta! Aqui está o resumo das suas turmas.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center text-blue-600 mb-2">
            <Users className="w-5 h-5 mr-2" />
            <span className="font-semibold text-sm">Total de Alunos</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">142</p>
          <p className="text-xs text-green-600 mt-2 font-medium">↑ 12 novos essa semana</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center text-purple-600 mb-2">
            <Activity className="w-5 h-5 mr-2" />
            <span className="font-semibold text-sm">Taxa de Acertos</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">68%</p>
          <p className="text-xs text-slate-500 mt-2">Média global das turmas</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center text-green-600 mb-2">
            <FileText className="w-5 h-5 mr-2" />
            <span className="font-semibold text-sm">Provas Geradas</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">14</p>
          <p className="text-xs text-slate-500 mt-2">Neste semestre</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center text-orange-600 mb-2">
            <Clock className="w-5 h-5 mr-2" />
            <span className="font-semibold text-sm">Próxima Aula Ao Vivo</span>
          </div>
          <p className="text-lg font-bold text-slate-800">Hoje, 19:00</p>
          <p className="text-xs text-slate-500 mt-2">Turma: Extensivo Medicina</p>
        </div>
      </div>

      {/* Conteúdo Central */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        
        {/* Atividade Recente */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Desempenho Recente (Simulados)</h3>
          <div className="space-y-4">
            {[
              { nome: "Simulado de Ecologia", date: "Há 2 dias", media: "7.2", entregas: "115/142" },
              { nome: "Lista: Genética Mendeliana", date: "Semana Passada", media: "6.5", entregas: "130/142" },
              { nome: "Simulado Diagnóstico", date: "Há 1 mês", media: "5.8", entregas: "140/142" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
                <div>
                  <p className="font-semibold text-slate-800">{item.nome}</p>
                  <p className="text-xs text-slate-500">{item.date} • {item.entregas} entregas</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">Média: {item.media}</p>
                  <button className="text-xs font-medium text-slate-500 hover:text-slate-700 mt-1 underline">Ver Relatório</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alunos em Destaque vs Precisam de Ajuda */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Alertas de Engajamento</h3>
          
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-red-500 mb-3 flex items-center">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span> Precisam de Atenção
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-red-50 p-3 rounded-lg border border-red-100">
                <p className="text-sm font-medium text-slate-800">João Silva</p>
                <p className="text-xs text-red-600 font-medium">Não loga há 7 dias</p>
              </div>
              <div className="flex items-center justify-between bg-red-50 p-3 rounded-lg border border-red-100">
                <p className="text-sm font-medium text-slate-800">Maria Oliveira</p>
                <p className="text-xs text-red-600 font-medium">Nota 3.0 no último simulado</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-green-500 mb-3 flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Evolução Rápida (Ganharam +XP)
            </h4>
            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-100 mb-2">
              <p className="text-sm font-medium text-slate-800">Lucas Costa</p>
              <p className="text-xs text-green-700 font-medium">+1500 XP essa semana (Evoluiu para Pupa)</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
