"use client";

import { useState } from "react";
import { Dna, Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setErrorMsg("E-mail ou senha incorretos.");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl flex overflow-hidden border border-slate-100">
        
        {/* Lado Esquerdo - Formulário */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <div className="flex items-center mb-12">
            <Dna className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-slate-800 tracking-tight">BioVorazes</span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">Bem-vindo de volta!</h2>
          <p className="text-slate-500 mb-8">Faça login para continuar sua jornada de aprendizado.</p>

          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium mb-6 border border-red-100">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 outline-none transition-all"
                  placeholder="aluno@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-700">Senha</label>
                <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-500">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 outline-none transition-all"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-1 flex items-center z-10">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-3 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white rounded-xl py-3 px-4 font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center disabled:opacity-70 mt-6"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Entrar na Plataforma
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Ainda não tem uma conta?{" "}
            <a href="#" className="font-bold text-blue-600 hover:text-blue-500">
              Assine agora
            </a>
          </p>
        </div>

        {/* Lado Direito - Imagem/Decorativo */}
        <div className="hidden lg:block lg:w-1/2 bg-blue-600 relative overflow-hidden p-12 flex-col justify-between">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
            <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#2563EB" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.1,-46.3C90.4,-33.5,96,-18,95.5,-2.9C95,12.2,88.4,26.9,80.4,41.2C72.4,55.5,63,69.5,50.1,77.9C37.2,86.3,20.8,89.1,5.1,80.5C-10.6,71.9,-25.5,51.9,-39.3,39.6C-53.1,27.3,-65.8,22.7,-74.6,12.7C-83.4,2.7,-88.3,-12.7,-84.9,-26.4C-81.5,-40.1,-69.8,-52.1,-56.3,-59.5C-42.8,-66.9,-27.5,-69.7,-12.8,-69.3C1.9,-68.9,16.6,-65.3,30.6,-73.6C44.6,-81.9,44.7,-76.4,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 opacity-50">
             <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#1D4ED8" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.1,-46.3C90.4,-33.5,96,-18,95.5,-2.9C95,12.2,88.4,26.9,80.4,41.2C72.4,55.5,63,69.5,50.1,77.9C37.2,86.3,20.8,89.1,5.1,80.5C-10.6,71.9,-25.5,51.9,-39.3,39.6C-53.1,27.3,-65.8,22.7,-74.6,12.7C-83.4,2.7,-88.3,-12.7,-84.9,-26.4C-81.5,-40.1,-69.8,-52.1,-56.3,-59.5C-42.8,-66.9,-27.5,-69.7,-12.8,-69.3C1.9,-68.9,16.6,-65.3,30.6,-73.6C44.6,-81.9,44.7,-76.4,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="relative z-10 text-white h-full flex flex-col">
            <div className="mt-12">
              <h3 className="text-4xl font-bold mb-4 leading-tight">Evolua seu conhecimento biológico.</h3>
              <p className="text-blue-100 text-lg">De ovo à fase adulta, transforme sua maneira de aprender com gamificação e aulas interativas.</p>
            </div>
            
            <div className="mt-auto bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <div className="flex items-center mb-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-600 bg-green-400"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-blue-600 bg-yellow-400"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-blue-600 bg-purple-400"></div>
                </div>
                <div className="ml-4">
                  <p className="font-bold">+2.000 alunos</p>
                </div>
              </div>
              <p className="text-sm text-blue-100 font-medium">"A plataforma me ajudou a passar no ENEM com o melhor método!"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
