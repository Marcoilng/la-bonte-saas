"use client";

import { useState } from "react";
import { 
  PencilSquareIcon, 
  CheckCircleIcon,
  AcademicCapIcon,
  CalculatorIcon
} from "@heroicons/react/24/outline";

export default function NotationGrid() {
  const students = [
    { id: "1", name: "JEAN MUBIALA", t1: 15, t2: 18, t3: null, max: 20 },
    { id: "2", name: "SARAH KAVIRA", t1: 12, t2: 15, t3: null, max: 20 },
    { id: "3", name: "DAVID LUKUSA", t1: 10, t2: 12, t3: null, max: 20 },
  ];

  const [activeCell, setActiveCell] = useState<string | null>(null);

  return (
    <div className="glass rounded-[2rem] p-8 shadow-2xl border border-white/20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <AcademicCapIcon className="h-6 w-6" />
            </div>
            <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Grille de Notation Elite</h2>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Calcul automatique des pourcentages</p>
            </div>
        </div>
        <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shadow-inner">
            <button className="px-4 py-1.5 bg-white text-indigo-600 rounded-lg text-xs font-black shadow-sm">6ème Primaire A</button>
            <button className="px-4 py-1.5 text-slate-500 text-xs font-bold hover:bg-white/50 rounded-lg transition-all">Mathématiques</button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white/30 backdrop-blur-md">
        <table className="min-w-full divide-y divide-slate-100">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Élève</th>
              {["Période 1 (T1)", "Période 2 (T2)", "Période 3 (T3)", "Moyenne"].map((h) => (
                <th key={h} className="px-6 py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => {
                const avg = ((student.t1 + (student.t2 || 0) + (student.t3 || 0)) / (student.t3 ? 3 : student.t2 ? 2 : 1)).toFixed(1);
                const pct = (Number(avg) / student.max * 100).toFixed(0);

                return (
                    <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-slate-200 flex items-center justify-center text-xs font-black text-slate-500">
                                    {student.name.charAt(0)}
                                </div>
                                <span className="text-sm font-bold text-slate-800 uppercase tracking-tight">{student.name}</span>
                            </div>
                        </td>
                        {[student.t1, student.t2, student.t3].map((val, idx) => (
                            <td key={idx} className="px-6 py-4 text-center">
                                <div 
                                    onClick={() => setActiveCell(`${student.id}-${idx}`)}
                                    className={`inline-block w-16 py-2 rounded-xl text-sm font-black transition-all cursor-pointer border ${activeCell === `${student.id}-${idx}` ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl scale-110' : 'bg-white text-slate-700 border-slate-100 hover:border-indigo-300'}`}
                                >
                                    {val ?? '--'}
                                </div>
                            </td>
                        ))}
                        <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black shadow-sm ${Number(pct) >= 70 ? 'bg-green-100 text-green-700' : Number(pct) >= 50 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                                <CalculatorIcon className="h-3.5 w-3.5" />
                                {pct}%
                            </span>
                        </td>
                    </tr>
                );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs hover:bg-slate-200 transition-all uppercase tracking-widest">Annuler</button>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs hover:bg-indigo-500 shadow-xl shadow-indigo-100 transition-all uppercase tracking-widest flex items-center gap-2">
            <CheckBadgeIcon className="h-5 w-5" />
            Enregistrer les Notes
        </button>
      </div>
    </div>
  );
}

function CheckBadgeIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
    )
}
