"use client";

import { useState } from "react";
import { 
  ShieldExclamationIcon, 
  HandThumbUpIcon, 
  BellAlertIcon,
  DocumentTextIcon,
  FaceFrownIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function DisciplinePage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const incidents = [
    { student: "JEAN MUBIALA", type: "Mérite", description: "Excellence au concours de mathématiques", date: "Hier", points: "+5", color: "green" },
    { student: "DAVID LUKUSA", type: "Sanction", description: "Retard répété (3ème fois)", date: "Aujourd'hui", points: "-2", color: "red" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Fiche Disciplinaire & Mérites</h1>
          <p className="mt-2 text-sm text-slate-500 font-medium tracking-tight">Suivi en temps réel du comportement et des exploits des élèves.</p>
        </div>
        <button className="flex items-center gap-x-2 rounded-2xl bg-red-600 px-6 py-3 text-sm font-black text-white shadow-xl hover:bg-red-700 transition-all">
          <ShieldExclamationIcon className="h-5 w-5" />
          Signaler un Incident
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Sanctions", value: "12", color: "red", icon: FaceFrownIcon },
          { label: "Total Mérites", value: "45", color: "green", icon: SparklesIcon },
          { label: "Avertissements", value: "8", color: "orange", icon: BellAlertIcon },
          { label: "Conseils Hebdo", value: "3", color: "indigo", icon: DocumentTextIcon },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-[2rem] border border-white/20 shadow-lg">
            <stat.icon className={`h-6 w-6 text-${stat.color}-500 mb-4 opacity-70`} />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-6">
            <div className="glass rounded-[2rem] p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-black text-slate-800">Historique Disciplinaire</h2>
                    <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                        {["all", "mérite", "sanction"].map((f) => (
                            <button 
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${activeFilter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                            >
                                {f === 'all' ? 'Tout' : f}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    {incidents.filter(i => activeFilter === 'all' || i.type.toLowerCase() === activeFilter).map((inc, i) => (
                        <div key={i} className="group p-6 rounded-3xl bg-white/40 border border-slate-50 hover:bg-white transition-all shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-xl bg-${inc.color}-50 flex items-center justify-center text-${inc.color}-600 font-black text-xs`}>
                                        {inc.points}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-800 uppercase tracking-tighter">{inc.student}</p>
                                        <p className="text-[10px] font-bold text-slate-400">{inc.date}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${inc.color === 'green' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {inc.type}
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">{inc.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="space-y-8">
            <div className="bg-gradient-to-br from-red-600 to-rose-700 p-8 rounded-[2rem] text-white shadow-2xl overflow-hidden relative group">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
                <BellAlertIcon className="h-12 w-12 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-black mb-2 leading-none">Alerte Parent<br/>instantanée</h3>
                <p className="text-xs text-red-100 font-medium leading-relaxed mb-6">Chaque sanction majeure déclenche une notification Push immédiate sur le téléphone du parent.</p>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Temps Réel Cloud</span>
                </div>
            </div>

            <div className="glass rounded-[2rem] p-8 border border-white/20 shadow-xl">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 px-2">Action Rapide</h3>
                <div className="space-y-4">
                    <button className="w-full py-4 px-6 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-between group">
                        Convocation Parent
                        <HandThumbUpIcon className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                    </button>
                    <button className="w-full py-4 px-6 border border-slate-100 bg-white text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-blue-200 transition-all">
                        Fiche de Suivi PDF
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
