"use client";

import { 
  PrinterIcon, 
  ArrowDownTrayIcon, 
  XMarkIcon,
  CheckBadgeIcon,
  IdentificationIcon
} from "@heroicons/react/24/outline";

export default function BulletinPreview({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 border border-slate-100">
        
        {/* HD Filament Watermark */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center rotate-45 scale-150">
            <h1 className="text-[150px] font-black text-slate-800 leading-none">CS LA BONTÉ</h1>
        </div>

        <div className="p-12 relative overflow-y-auto max-h-[90vh] custom-scrollbar">
            {/* Header */}
            <div className="flex justify-between items-start mb-12 border-b-4 border-indigo-900 pb-8">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-indigo-900 rounded-[1.2rem] flex items-center justify-center text-white shadow-xl">
                        <IdentificationIcon className="h-10 w-10" />
                    </div>
                    <div className="text-left">
                        <h2 className="text-2xl font-black text-indigo-900 tracking-tighter uppercase leading-none">CS LA BONTÉ</h2>
                        <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest italic">L'excellence au cœur de l'éducation</p>
                    </div>
                </div>
                <div className="text-right">
                    <h3 className="text-xl font-black text-slate-800">BULLETIN DE NOTES</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Année Scolaire 2025 - 2026</p>
                </div>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-2 gap-8 mb-12 bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100">
                <div className="space-y-4">
                    <div>
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Élève</span>
                        <p className="text-lg font-black text-indigo-950 uppercase">JEAN MUBIALA</p>
                    </div>
                    <div>
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Classe</span>
                        <p className="text-sm font-bold text-indigo-900">6ème Primaire A</p>
                    </div>
                </div>
                <div className="space-y-4 text-right">
                    <div>
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">ID Scolaire</span>
                        <p className="text-sm font-black text-indigo-950">LP-2024-0012</p>
                    </div>
                    <div>
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Rang Académique</span>
                        <p className="text-lg font-black text-indigo-900">3ème / 45</p>
                    </div>
                </div>
            </div>

            {/* Grades Table */}
            <div className="space-y-2 mb-12">
                <div className="grid grid-cols-6 px-4 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <div className="col-span-2">Désignation de la Matière</div>
                    <div className="text-center">Max</div>
                    <div className="text-center">T1</div>
                    <div className="text-center">T2</div>
                    <div className="text-center">T3</div>
                </div>
                {[
                    { sub: "MATHÉMATIQUES", max: 100, t1: 85, t2: 92, t3: 0 },
                    { sub: "FRANÇAIS", max: 100, t1: 78, t2: 80, t3: 0 },
                    { sub: "SCIENCES", max: 100, t1: 88, t2: 85, t3: 0 },
                    { sub: "HISTOIRE", max: 50, t1: 45, t2: 42, t3: 0 },
                ].map((item, i) => (
                    <div key={i} className="grid grid-cols-6 px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="col-span-2 text-xs font-black text-slate-800 uppercase tracking-tight">{item.sub}</div>
                        <div className="text-center text-xs font-bold text-slate-400">{item.max}</div>
                        <div className="text-center text-xs font-black text-indigo-600">{item.t1}</div>
                        <div className="text-center text-xs font-black text-indigo-600">{item.t2}</div>
                        <div className="text-center text-xs font-black text-slate-200">--</div>
                    </div>
                ))}
            </div>

            {/* Total Footer */}
            <div className="flex items-center justify-between bg-indigo-900 text-white p-8 rounded-[2rem] shadow-2xl">
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Résultat Global</h4>
                    <p className="text-3xl font-black">17.5 / 20</p>
                </div>
                <div className="text-right">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Mention</h4>
                    <span className="inline-block px-4 py-1.5 bg-green-500 rounded-full text-xs font-black">Distinction (87.5%)</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-12">
                <button className="flex items-center justify-center gap-3 py-5 bg-slate-50 text-slate-600 rounded-[1.5rem] font-bold text-sm hover:bg-slate-100 transition-all">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                    Télécharger PDF HD
                </button>
                <button className="flex items-center justify-center gap-3 py-5 bg-indigo-900 text-white rounded-[1.5rem] font-black text-sm shadow-xl hover:bg-indigo-800 transition-all">
                    <PrinterIcon className="h-5 w-5" />
                    Imprimer Bulletin
                </button>
            </div>

            <button onClick={onClose} className="mt-8 text-[10px] font-black text-slate-300 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto">
                <XMarkIcon className="h-3 w-3" />
                Fermer l'aperçu HD
            </button>
        </div>
      </div>
    </div>
  );
}
