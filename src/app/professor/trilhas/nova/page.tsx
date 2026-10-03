import { PrismaClient } from "@prisma/client";
import { createTrail } from "@/app/actions/trail";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

const prisma = new PrismaClient();

export default async function NovaTrilhaPage() {
  const turmas = await prisma.classGroup.findMany();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Link href="/professor/trilhas" className="text-slate-400 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Criar Nova Trilha</h1>
          <p className="text-slate-500 mt-1">Defina o tema e a qual turma esta trilha pertencerá.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
        <form action={createTrail} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Título da Trilha</label>
            <input
              type="text"
              name="title"
              required
              placeholder="Ex: Reino Monera - Bactérias e Cianobactérias"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Descrição (Opcional)</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Descreva o que os alunos vão aprender nesta trilha..."
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Vincular a uma Turma</label>
            <select
              name="classGroupId"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            >
              <option value="">-- Selecione uma turma --</option>
              {turmas.map(turma => (
                <option key={turma.id} value={turma.id}>
                  {turma.name}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors shadow-md flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Salvar e Adicionar Aulas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
