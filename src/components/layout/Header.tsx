import { Bell, Search, User } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-green-100 flex items-center justify-between px-6 shadow-sm z-10">
      <div className="flex items-center flex-1">
        <div className="relative w-96 hidden md:block">
          <input
            type="text"
            placeholder="Buscar aulas, questões, resumos..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-500 hover:text-green-600 transition-colors rounded-full hover:bg-green-50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-700">Aluno Curioso</p>
            <p className="text-xs text-gray-500">Nível 3 • Larva</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 border-2 border-green-500">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
