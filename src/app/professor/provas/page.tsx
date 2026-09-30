"use client";

import { FileText, Search, Plus, Download, Printer } from "lucide-react";
import { useState } from "react";

export default function GeradorProvasPage() {
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([1, 4]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Gerador de Provas (PDF)</h1>
        <p className="text-slate-500 mt-1">Crie avaliações impressas selecionando questões do banco.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-14rem)]">
        
        {/* Painel de Seleção (Banco de Questões) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 flex flex-col shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar questões (ex: Mitose, Enem 2023)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[
              { id: 1, origem: "ENEM 2023", assunto: "Genética", diff: "Fácil", text: "Em um experimento de cruzamento..." },
              { id: 2, origem: "FUVEST 2024", assunto: "Citologia", diff: "Difícil", text: "A membrana plasmática é constituída de..." },
              { id: 3, origem: "UNICAMP 2022", assunto: "Ecologia", diff: "Média", text: "A sucessão ecológica em uma área de queimada..." },
              { id: 4, origem: "Inédita", assunto: "Evolução", diff: "Média", text: "Segundo a teoria sintética da evolução..." },
            ].map(q => (
              <div key={q.id} className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors bg-white">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex space-x-2">
                    <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded">{q.origem}</span>
                    <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded">{q.assunto}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedQuestions(prev => prev.includes(q.id) ? prev.filter(id => id !== q.id) : [...prev, q.id])}
                    className={`p-1.5 rounded-lg transition-colors ${
                      selectedQuestions.includes(q.id) ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {selectedQuestions.includes(q.id) ? <CheckIcon /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-sm text-slate-700 line-clamp-2">{q.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pré-visualização da Prova */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 flex flex-col shadow-lg overflow-hidden text-white">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between bg-slate-900">
            <h3 className="font-bold flex items-center">
              <FileText className="w-4 h-4 mr-2 text-blue-400" />
              Sua Prova
            </h3>
            <span className="text-xs font-medium bg-slate-700 px-2 py-1 rounded">
              {selectedQuestions.length} questões
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-slate-100 relative">
            {/* Folha de Papel Mock */}
            <div className="bg-white text-black min-h-full p-6 shadow-sm border border-slate-300 relative">
              <div className="border-b-2 border-black pb-4 mb-4">
                <h1 className="text-center font-bold text-lg uppercase tracking-wider">BioVorazes - Avaliação</h1>
                <div className="flex justify-between text-xs mt-4">
                  <span>Nome: _________________________</span>
                  <span>Data: ___/___/___</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {selectedQuestions.map((id, index) => (
                  <div key={id} className="text-xs">
                    <p className="font-bold mb-1">Questão {index + 1}</p>
                    <p className="text-slate-700">Texto simulado da questão número {id} selecionada pelo professor para compor esta avaliação. A formatação real aparecerá no PDF final gerado pelo sistema.</p>
                    <div className="mt-2 space-y-1 pl-4">
                      <p>a) Alternativa A</p>
                      <p>b) Alternativa B</p>
                      <p>c) Alternativa C</p>
                    </div>
                  </div>
                ))}
                
                {selectedQuestions.length === 0 && (
                  <div className="text-center text-slate-400 mt-20 text-sm">
                    Adicione questões para montar a prova.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900 border-t border-slate-700 flex space-x-3">
            <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-xl text-sm font-medium transition-colors flex justify-center items-center">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-medium transition-colors flex justify-center items-center shadow-sm">
              <Download className="w-4 h-4 mr-2" />
              Baixar PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
