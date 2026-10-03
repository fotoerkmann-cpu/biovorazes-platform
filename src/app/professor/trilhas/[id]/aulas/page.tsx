import { PrismaClient } from "@prisma/client";
import { createLesson } from "@/app/actions/lesson";
import Link from "next/link";
import { ArrowLeft, Plus, PlayCircle, FileText, CheckSquare, Award } from "lucide-react";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

function getIconForType(type: string) {
  switch (type) {
    case 'Video': return <PlayCircle className="w-5 h-5 text-purple-500" />;
    case 'Leitura': return <FileText className="w-5 h-5 text-blue-500" />;
    case 'Exercicio': return <CheckSquare className="w-5 h-5 text-orange-500" />;
    default: return <FileText className="w-5 h-5 text-gray-500" />;
  }
}

export default async function AulasPage({ params }: { params: { id: string } }) {
  const trailId = params.id;
  
  const trail = await prisma.trail.findUnique({
    where: { id: trailId },
    include: {
      lessons: {
        orderBy: { order: 'asc' }
      }
    }
  });

  if (!trail) return notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/professor/trilhas" className="text-slate-400 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Aulas da Trilha: {trail.title}</h1>
            <p className="text-slate-500 text-sm">Adicione os passos e exercícios que os alunos devem completar.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lado Esquerdo - Lista de Aulas */}
        <div className="md:col-span-2 space-y-4">
          {trail.lessons.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-xl p-10 text-center">
              <p className="text-slate-500">Nenhuma aula cadastrada nesta trilha ainda.</p>
              <p className="text-sm text-slate-400 mt-1">Use o formulário ao lado para adicionar a primeira.</p>
            </div>
          ) : (
            trail.lessons.map((lesson, index) => (
              <div key={lesson.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center shadow-sm">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm mr-4 shrink-0">
                  {index + 1}
                </div>
                <div className="mr-4 shrink-0">
                  {getIconForType(lesson.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 truncate">{lesson.title}</h3>
                  <div className="flex items-center text-xs text-slate-500 mt-1 space-x-3">
                    <span className="font-medium bg-slate-100 px-2 py-0.5 rounded">{lesson.type}</span>
                    <span>{lesson.duration}</span>
                  </div>
                </div>
                <div className="ml-4 shrink-0 flex items-center text-amber-500 font-bold text-sm bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                  <Award className="w-4 h-4 mr-1" />
                  +{lesson.xpReward} XP
                </div>
              </div>
            ))
          )}
        </div>

        {/* Lado Direito - Formulário para adicionar */}
        <div className="md:col-span-1">
          <div className="bg-white border border-blue-200 rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-blue-600" />
              Adicionar Aula
            </h2>
            
            <form action={createLesson} className="space-y-4">
              <input type="hidden" name="trailId" value={trail.id} />
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título da Etapa</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Ex: Assista a Vídeo-aula"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipo</label>
                <select
                  name="type"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
                >
                  <option value="Video">Vídeo-aula</option>
                  <option value="Leitura">Leitura / Resumo</option>
                  <option value="Exercicio">Lista de Exercícios</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <div className="w-1/2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duração</label>
                  <input
                    type="text"
                    name="duration"
                    required
                    placeholder="Ex: 15 min"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Recompensa</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="xpReward"
                      required
                      defaultValue="200"
                      className="w-full pl-3 pr-8 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-sm font-bold text-amber-600"
                    />
                    <span className="absolute right-3 top-2 text-xs font-bold text-amber-500">XP</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-bold transition-colors shadow-sm text-sm mt-2"
              >
                Salvar Etapa
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
