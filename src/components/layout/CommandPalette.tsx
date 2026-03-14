"use client";

import { useEffect, useState } from "react";
import { 
  MagnifyingGlassIcon, 
  UserIcon, 
  DocumentIcon,
  AcademicCapIcon,
  BanknotesIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden border border-white/20 animate-in slide-in-from-top-4 duration-300">
        <div className="relative group p-6">
          <MagnifyingGlassIcon className="absolute left-10 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
          <input 
            autoFocus
            type="text" 
            placeholder="Rechercher un élève, un dossier ou une action... (Esc pour quitter)"
            className="w-full bg-slate-50/50 border-0 rounded-[1.2rem] py-5 pl-14 pr-12 text-lg focus:ring-2 focus:ring-blue-600 transition-all font-medium placeholder:text-slate-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="absolute right-10 top-1/2 -translate-y-1/2 h-8 px-2 bg-slate-100 rounded-lg text-[10px] items-center flex font-black text-slate-400 uppercase tracking-widest border border-slate-200">
            Esc
          </kbd>
        </div>

        <div className="max-h-[400px] overflow-y-auto px-4 pb-4 custom-scrollbar">
            <div className="px-5 py-3">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Suggestions Rapides</h3>
                <div className="space-y-2">
                    {[
                        { icon: UserIcon, label: "Mubiala Jean - 6ème Primaire A", type: "Élève", color: "text-blue-500" },
                        { icon: BanknotesIcon, label: "Nouveau Paiement Minerval", type: "Action", color: "text-green-500" },
                        { icon: AcademicCapIcon, label: "Rapport Bulletin T2", type: "Dossier", color: "text-indigo-500" },
                        { icon: DocumentIcon, label: "Attestation de Fréquentation", type: "Template", color: "text-orange-500" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 cursor-pointer transition-all active:scale-[0.98] group">
                            <div className="flex items-center gap-4">
                                <item.icon className={`h-6 w-6 ${item.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{item.label}</p>
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{item.type}</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-slate-300 group-hover:text-blue-500 transition-colors">Enter ↵</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase">
                    <span className="h-4 w-4 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-500 shadow-sm">↑↓</span> Choisir
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase">
                    <span className="h-4 w-4 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-500 shadow-sm">↵</span> Exécuter
                </div>
            </div>
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">CS LA BONTÉ Neural Search</p>
        </div>
      </div>
    </div>
  );
}
