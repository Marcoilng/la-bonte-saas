"use client";

import { useState } from "react";
import NotationGrid from "@/components/academic/NotationGrid";
import BulletinPreview from "@/components/academic/BulletinPreview";
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  DocumentCheckIcon,
  ExclamationCircleIcon,
  BellIcon,
  PrinterIcon
} from "@heroicons/react/24/outline";

export default function ScolaritePage() {
  const [showBulletin, setShowBulletin] = useState(false);
  const [activeTab, setActiveTab ] = useState("notation"); // notation | assiduite

  const attendanceAlerts = [
    { student: "David Lukusa", status: "Absent", color: "bg-red-500", date: "Aujourd'hui" },
    { student: "Sarah Kavira", status: "Retard", color: "bg-orange-500", date: "Hier" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Moteur Académique Elite</h1>
          <p className="mt-2 text-sm text-slate-500 font-medium tracking-tight">Gestion des notes, bulletins HD et suivi d'assiduité.</p>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={() => setShowBulletin(true)}
                className="flex items-center gap-x-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-black text-white shadow-xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
            >
                <PrinterIcon className="h-5 w-5 text-indigo-400" />
                Générer Bulletins
            </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex gap-4 border-b border-slate-100 pb-4">
        <button 
            onClick={() => setActiveTab("notation")}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'notation' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
        >
            Tableau des Points
        </button>
        <button 
            onClick={() => setActiveTab("assiduite")}
            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'assiduite' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
        >
            Suivi Assiduité
        </button>
      </div>

      {/* Offline Sync Banner Simulation */}
      <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 p-4 rounded-2xl">
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Mode Hors-Ligne Actif • 3 notes en attente de synchronisation</p>
          <button className="ml-auto text-[10px] font-black text-amber-600 underline">Sync Maintenant</button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">
        <div className="xl:col-span-2">
            {activeTab === "notation" ? (
                <NotationGrid />
            ) : (
                <div className="glass rounded-[2rem] p-8 border border-white/20 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                            <UserGroupIcon className="h-8 w-8 text-indigo-500" />
                            Appel Quotidien
                        </h2>
                        <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full uppercase tracking-tighter">Session : 6ème Primaire A</span>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: "JEAN MUBIALA", status: "Present" },
                            { name: "SARAH KAVIRA", status: "Retard" },
                            { name: "DAVID LUKUSA", status: "Absent" },
                        ].map((s, i) => (
                            <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/40 border border-slate-50 hover:bg-white transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className={`h-3 w-3 rounded-full ${s.status === 'Present' ? 'bg-green-500' : s.status === 'Retard' ? 'bg-orange-500' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`} />
                                    <span className="font-black text-slate-800 uppercase text-sm tracking-tight">{s.name}</span>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-black uppercase">P</button>
                                    <button className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black uppercase">R</button>
                                    <button className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase">A</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Analytics & Alerts Sidebar */}
        <div className="space-y-8">
            <div className="bg-indigo-950 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 bg-indigo-500/20 h-64 w-64 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all duration-700" />
                <DocumentCheckIcon className="h-12 w-12 text-indigo-400 mb-6" />
                <h3 className="text-2xl font-black mb-2 leading-none">Exportation<br/>Elite HD</h3>
                <p className="text-xs text-indigo-300 font-medium leading-relaxed mb-8">Générate des rapports PDF haute définition avec logos en filigrane pour les dossiers annuels.</p>
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-[1px] bg-indigo-800" />
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Digital Ready</span>
                    <div className="flex-1 h-[1px] bg-indigo-800" />
                </div>
            </div>

            <div className="glass rounded-[2rem] p-8 border border-white/20 shadow-xl">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    Alertes Assiduité
                </h3>
                <div className="space-y-6">
                    {attendanceAlerts.map((alert, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className={`mt-1 h-2 w-2 rounded-full ${alert.color} shrink-0`} />
                            <div>
                                <p className="text-sm font-black text-slate-800 uppercase tracking-tighter leading-none mb-1">{alert.student}</p>
                                <p className="text-[10px] font-bold text-slate-400">{alert.status} enregistré {alert.date.toLowerCase()}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-8 py-4 bg-slate-50 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
                    Informer les Parents
                </button>
            </div>
        </div>
      </div>

      {showBulletin && <BulletinPreview onClose={() => setShowBulletin(false)} />}
    </div>
  );
}
