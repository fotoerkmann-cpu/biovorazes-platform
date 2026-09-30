import { motion } from 'framer-motion';

interface AvatarProps {
  level: number;
  stage: 'Ovo' | 'Larva' | 'Pupa' | 'Adulto';
  xp: number;
  nextLevelXp: number;
}

export function Avatar({ level, stage, xp, nextLevelXp }: AvatarProps) {
  const progress = (xp / nextLevelXp) * 100;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 flex flex-col items-center">
      <div className="relative w-32 h-32 mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#ecfdf5"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#10b981"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 283" }}
            animate={{ strokeDasharray: `${(progress / 100) * 283} 283` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-4xl shadow-inner border-4 border-white">
            {stage === 'Ovo' && '🥚'}
            {stage === 'Larva' && '🐛'}
            {stage === 'Pupa' && '🦋'}
            {stage === 'Adulto' && '🦅'}
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800">Nível {level}</h3>
      <p className="text-green-600 font-medium mb-4">Estágio: {stage}</p>
      
      <div className="w-full space-y-1">
        <div className="flex justify-between text-xs text-gray-500 font-medium">
          <span>{xp} XP</span>
          <span>{nextLevelXp} XP</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <motion.div 
            className="bg-green-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}
