import { PrismaClient } from '@prisma/client';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function TrilhasPage() {
  const trilhas = await prisma.trail.findMany({
    include: {
      classGroup: true,
      _count: {
        select: { lessons: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Gerenciar Trilhas de Aprendizado</h1>
          <p className="text-slate-500 mt-1">Crie sequências de aulas e exercícios que dão XP para os alunos.</p>
        </div>
        <Link 
          href="/professor/trilhas/nova"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Nova Trilha
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mt-6">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-4">Nome da Trilha</th>
              <th className="px-6 py-4">Turma Vinculada</th>
              <th className="px-6 py-4">Qtd. de Aulas</th>
              <th className="px-6 py-4">Criada em</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {trilhas.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                  Nenhuma trilha criada ainda. Clique em "Nova Trilha" para começar.
                </td>
              </tr>
            ) : (
              trilhas.map((trilha) => (
                <tr key={trilha.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{trilha.title}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-medium">
                      {trilha.classGroup.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">{trilha._count.lessons} aulas</td>
                  <td className="px-6 py-4">{trilha.createdAt.toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-blue-500 hover:text-blue-700 p-1">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-700 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
