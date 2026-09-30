"use client";

import { useState } from "react";
import { Clock, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SimuladoExecutionPage({ params }: { params: { id: string } }) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Cabeçalho do Simulado */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-green-100">
        <div className="flex items-center">
          <Link href="/dashboard/simulados" className="p-2 text-gray-500 hover:text-gray-800 transition-colors mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Simulado ENEM: Ciências da Natureza</h1>
            <p className="text-sm text-gray-500">Questão 1 de 45</p>
          </div>
        </div>
        
        <div className="flex items-center bg-red-50 text-red-600 px-4 py-2 rounded-xl font-mono font-bold border border-red-100">
          <Clock className="w-5 h-5 mr-2" />
          02:59:45
        </div>
      </div>

      {/* Área da Questão */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="prose max-w-none text-gray-800 mb-8">
          <p className="text-sm text-gray-500 font-bold mb-4">ENEM 2023 - Biologia</p>
          <p className="text-lg mb-4">
            A vacina contra a COVID-19 desenvolvida baseada em RNA mensageiro (mRNA) utiliza uma tecnologia inovadora. Ao ser injetada no corpo humano, a molécula de mRNA sintética instrui as células a produzirem a proteína *Spike*, encontrada na superfície do vírus SARS-CoV-2.
          </p>
          <p className="text-lg">
            Considerando o fluxo da informação genética nas células humanas (Dogma Central da Biologia Molecular), qual etapa do metabolismo celular é diretamente ativada por essa vacina no momento de produção da proteína viral?
          </p>
        </div>

        {/* Alternativas */}
        <div className="space-y-3">
          {[
            "Replicação do DNA no núcleo celular.",
            "Transcrição do RNA no citoplasma.",
            "Tradução do RNA no citoplasma pelos ribossomos.",
            "Splicing do RNA mensageiro primário.",
            "Transcrição reversa no interior do núcleo."
          ].map((text, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOption(idx)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start ${
                selectedOption === idx 
                  ? "border-green-500 bg-green-50" 
                  : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 ${
                selectedOption === idx ? "border-green-500 bg-green-500 text-white" : "border-gray-300"
              }`}>
                {selectedOption === idx && <CheckCircle className="w-4 h-4" />}
              </div>
              <span className={`text-base ${selectedOption === idx ? "text-green-900 font-medium" : "text-gray-700"}`}>
                <span className="font-bold mr-2">{String.fromCharCode(65 + idx)})</span>
                {text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Controles de Navegação */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <button className="px-6 py-3 text-gray-500 font-medium hover:bg-gray-100 rounded-xl transition-colors">
          Anterior
        </button>
        
        {/* Mapa de Questões Simplificado */}
        <div className="hidden md:flex space-x-1">
          {[1, 2, 3, 4, 5].map(num => (
            <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              num === 1 ? 'bg-green-500 text-white' : 
              num === 2 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
            }`}>
              {num}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400">...</div>
        </div>

        <button className="px-6 py-3 bg-green-600 text-white font-medium hover:bg-green-700 rounded-xl transition-colors flex items-center shadow-sm">
          Próxima <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>

    </div>
  );
}
