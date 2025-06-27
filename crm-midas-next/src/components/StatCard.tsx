import { ReactNode } from "react";

export default function StatCard({ value, label, icon, color = "from-purple-500 to-indigo-600" }: {
  value: string | number,
  label: string,
  icon?: ReactNode,
  color?: string
}) {
  return (
    <div className={`rounded-xl p-6 bg-gradient-to-br ${color} shadow-xl flex flex-col items-center justify-center min-w-[180px] border border-white/10 backdrop-blur-md`}> 
      <div className="text-4xl font-extrabold text-white flex items-center gap-2 drop-shadow-lg">
        {icon}
        {value}
      </div>
      <div className="text-md text-white/80 mt-2 font-medium tracking-wide">{label}</div>
    </div>
  );
} 