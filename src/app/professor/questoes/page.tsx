"use client";

import { Search, Plus, Filter, Edit, Trash2 } from "lucide-react";

export default function BancoDeQuestoesPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Banco de Questões</h1>
          <p className="text-slate-500 mt-1">Gerencie, cadastre e edite as questões da plataforma.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors shadow-sm flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Nova Questão
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-14rem)]">
        
        {/* Filtros de Busca */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar por texto, origem (ex: ENEM)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          
          <select className="border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm focus:outline-none focus:border-blue-500 text-slate-600">
            <option>Todos os Assuntos</option>
            <option>Citologia</option>
            <option>Genética</option>
            <option>Ecologia</option>
            <option>Botânica</option>
          </select>
          
          <select className="border border-slate-200 rounded-xl px-4 py-2.5 bg-white text-sm focus:outline-none focus:border-blue-500 text-slate-600">
            <option>Todas Dificuldades</option>
            <option>Fácil</option>
            <option>Média</option>
            <option>Difícil</option>
          </select>

          <button className="p-2 border border-slate-200 rounded-xl text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de Questões */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-semibold text-slate-500 sticky top-0">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4 w-1/2">Enunciado (Resumo)</th>
                <th className="px-6 py-4">Assunto</th>
                <th className="px-6 py-4">Origem</th>
                <th className="px-6 py-4">Dificuldade</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: "Q1042", txt: "A vacina contra a COVID-19 baseada em mRNA instrui...", ass: "Citologia/Metabolismo", ori: "ENEM 2023", dif: "Média" },
                { id: "Q1041", txt: "Nas plantas angiospermas, a dupla fecundação resulta em...", ass: "Botânica", ori: "FUVEST 2024", dif: "Difícil" },
                { id: "Q1040", txt: "Em relação ao ciclo do nitrogênio, as bactérias...", ass: "Ecologia", ori: "UNICAMP 2022", dif: "Fácil" },
                { id: "Q1039", txt: "Um homem daltônico casa-se com uma mulher normal...", ass: "Genética", ori: "Inédita", dif: "Média" },
                { id: "Q1038", txt: "Durante a fase clara da fotossíntese, ocorre a...", ass: "Fisiologia Vegetal", ori: "ENEM 2022", dif: "Difícil" },
              ].map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 font-mono text-slate-900">{q.id}</td>
                  <td className="px-6 py-4">
                    <span className="line-clamp-1">{q.txt}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-xs font-bold">
                      {q.ass}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{q.ori}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      q.dif === 'Fácil' ? 'bg-green-100 text-green-700' :
                      q.dif === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {q.dif}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
