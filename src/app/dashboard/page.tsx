"use client";

import { useState } from "react";
import { Avatar } from "@/components/gamification/Avatar";
import { PlayCircle, Trophy, Target, BookOpen } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [xp, setXp] = useState(850);
  const [level, setLevel] = useState(3);
  const [stage, setStage] = useState<'Ovo' | 'Larva' | 'Pupa' | 'Adulto'>('Larva');

  const [lessons, setLessons] = useState([
    { title: "Introdução à Célula", type: "Vídeo", duration: "15 min", status: "completed" },
    { title: "Membrana Plasmática", type: "Vídeo", duration: "22 min", status: "current" },
    { title: "Transporte Passivo e Ativo", type: "Vídeo", duration: "18 min", status: "locked" },
    { title: "Quiz de Fixação: Envoltórios", type: "Exercício", duration: "10 min", status: "locked" }
  ]);

  const handleCompleteLesson = (idx: number) => {
    // Atualiza a aula para completada e a próxima para atual
    const newLessons = [...lessons];
    newLessons[idx].status = 'completed';
    if (newLessons[idx + 1]) {
      newLessons[idx + 1].status = 'current';
    }
    setLessons(newLessons);

    // Lógica de Ganho de XP e Evolução Biológica
    let newXp = xp + 200; // Ganha 200 de XP por aula
    let newLevel = level;
    let newStage = stage;

    if (newXp >= 1000) {
      newLevel += 1;
      newXp = newXp - 1000;
      
      // Regra de evolução: Muda de estágio a cada 3 níveis
      if (newLevel < 3) newStage = 'Ovo';
      else if (newLevel >= 3 && newLevel < 6) newStage = 'Larva';
      else if (newLevel >= 6 && newLevel < 9) newStage = 'Pupa';
      else newStage = 'Adulto';

      alert(`🎉 PARABÉNS! Você evoluiu para o Nível ${newLevel} e alcançou o estágio ${newStage}!`);
    }

    setXp(newXp);
    setLevel(newLevel);
    setStage(newStage);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bem-vindo de volta!</h1>
          <p className="text-gray-500 mt-1">Continue sua jornada evolutiva na biologia.</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center">
          <PlayCircle className="w-5 h-5 mr-2" />
          Retomar Aula
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coluna da Esquerda - Perfil Gamificado */}
        <div className="md:col-span-1">
          <Avatar level={level} stage={stage} xp={xp} nextLevelXp={1000} />
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 mt-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
              Conquistas Recentes
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-xl">
                  🔬
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Primeiro Microscópio</p>
                  <p className="text-xs text-gray-500">Completou 10 aulas de citologia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Central/Direita - Conteúdo */}
        <div className="md:col-span-2 space-y-6">

          {/* Banner de Aula Ao Vivo (Se houver aula no horário) */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-sm flex items-center justify-between border border-blue-400">
            <div>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse mb-2 inline-block">AO VIVO AGORA</span>
              <h3 className="text-xl font-bold">Mitose e Meiose (Prof. Charles)</h3>
              <p className="text-sm text-blue-100 mt-1">Sua turma de Extensivo tem uma aula acontecendo neste momento.</p>
            </div>
            <Link href="/dashboard/quadro" className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold transition-colors shadow-sm whitespace-nowrap ml-4">
              Entrar na Sala
            </Link>
          </div>
          
          {/* Trilha Atual */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Trilha de Citologia</h3>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Módulo 1 de 5
              </span>
            </div>
            
            <div className="space-y-4">
              {lessons.map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
                  item.status === 'completed' ? 'border-green-200 bg-green-50/50' :
                  item.status === 'current' ? 'border-green-500 bg-white shadow-sm' :
                  'border-gray-100 bg-gray-50 opacity-60'
                }`}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      item.status === 'completed' ? 'bg-green-100 text-green-600' :
                      item.status === 'current' ? 'bg-green-600 text-white' :
                      'bg-gray-200 text-gray-400'
                    }`}>
                      {item.type === 'Vídeo' ? <PlayCircle className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className={`font-medium ${item.status === 'locked' ? 'text-gray-500' : 'text-gray-900'}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">{item.type} • {item.duration}</p>
                    </div>
                  </div>
                  {item.status === 'completed' && (
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">
                      Concluído
                    </span>
                  )}
                  {item.status === 'current' && (
                    <button 
                      onClick={() => handleCompleteLesson(idx)}
                      className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-lg shadow-sm transition-colors"
                    >
                      Completar Aula
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cards Rápidos */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <BookOpen className="w-8 h-8 mb-4 opacity-80" />
                <h3 className="text-lg font-bold mb-1">Simulado Semanal</h3>
                <p className="text-sm text-green-100 mb-4">Teste seus conhecimentos</p>
                <button className="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                  Iniciar Agora
                </button>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-2">Desafio Diário</h3>
              <p className="text-sm text-gray-500 mb-4">Resolva 5 questões de Genética e ganhe XP em dobro!</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md">
                  +100 XP
                </span>
                <button className="text-sm font-medium text-green-600 hover:text-green-700">
                  Participar
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
