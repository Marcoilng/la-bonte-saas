"use client";

import { useState } from "react";
import { 
  QrCodeIcon, 
  UserGroupIcon, 
  MapPinIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

export default function AttendancePage() {
  const [activeStep, setActiveStep] = useState("scan"); // scan | success

  const recentAttendance = [
    { student: "Jean Mubiala", time: "07:45", status: "Présent", method: "QR Scan" },
    { student: "Sarah Kavira", time: "07:52", status: "Présent", method: "QR Scan" },
    { student: "David Lukusa", time: "08:05", status: "Retard", method: "Manuel" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <QrCodeIcon className="h-10 w-10 text-blue-600 animate-pulse" />
                Présence & Pointage
            </h1>
            <p className="mt-2 text-slate-500 font-medium">Système innovant de pointage par QR Code pour élèves et personnel.</p>
        </div>
        <div className="flex bg-white/50 p-1 rounded-2xl border border-slate-200 shadow-inner">
            <button className="px-6 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-lg transition-all">Scanner</button>
            <button className="px-6 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">Rapports</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Scanner Simulation Card */}
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative glass rounded-[2rem] p-8 min-h-[500px] flex flex-col items-center justify-center text-center overflow-hidden">
                {activeStep === "scan" ? (
                    <>
                        <div className="relative mb-10">
                            <div className="w-64 h-64 border-4 border-dashed border-blue-400/50 rounded-3xl flex items-center justify-center relative overflow-hidden">
                                <QrCodeIcon className="h-32 w-32 text-slate-300 opacity-50" />
                                {/* Scanning line animation */}
                                <div className="absolute h-1 w-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] top-0 left-0 animate-[scan_2s_ease-in-out_infinite]" />
                            </div>
                            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-blue-600 rounded-tl-lg" />
                            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-blue-600 rounded-tr-lg" />
                            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-blue-600 rounded-bl-lg" />
                            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-blue-600 rounded-br-lg" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 mb-2">Prêt à scanner</h2>
                        <p className="text-slate-500 max-w-xs mb-8">Placez le QR Code de l'élève devant la caméra pour enregistrer sa présence.</p>
                        <button 
                            onClick={() => setActiveStep("success")}
                            className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                        >
                            <ShieldCheckIcon className="h-6 w-6 text-blue-400" />
                            Simuler un Scan
                        </button>
                    </>
                ) : (
                    <div className="animate-in zoom-in duration-500 flex flex-col items-center">
                        <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-200 border-4 border-white">
                            <CheckBadgeIcon className="h-12 w-12" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">Pointage Réussi !</h2>
                        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 w-full max-w-sm mb-8">
                            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200">
                                <div className="h-12 w-12 rounded-2xl bg-slate-200 animate-pulse" />
                                <div className="text-left text-sm">
                                    <p className="font-black text-slate-800">Jean Mubiala</p>
                                    <p className="text-slate-500 font-medium tracking-tight">6ème Primaire A • LP-2024-0012</p>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs font-black uppercase text-slate-400 px-2 tracking-widest">
                                <span>Heure</span>
                                <span>07:45:22</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setActiveStep("scan")}
                            className="text-slate-500 font-bold hover:text-slate-800 transition-colors flex items-center gap-2"
                        >
                            <XMarkIcon className="h-5 w-5" />
                            Fermer
                        </button>
                    </div>
                )}
                
                {/* Decorative particles */}
                <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
                <div className="absolute bottom-20 right-20 w-3 h-3 bg-indigo-400 rounded-full animate-bounce" />
            </div>
        </div>

        {/* Real-time Feed */}
        <div className="space-y-6">
            <div className="glass rounded-[2rem] p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                        <UserGroupIcon className="h-6 w-6 text-indigo-500" />
                        Flux en Temps Réel
                    </h3>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full animate-pulse">
                        <div className="h-1.5 w-1.5 bg-red-600 rounded-full" />
                        LIVE
                    </span>
                </div>
                <div className="space-y-4">
                    {recentAttendance.map((log, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-white/40 border border-white hover:bg-white transition-all shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 flex-shrink-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center font-bold text-slate-400">
                                    {log.student.charAt(0)}
                                </div>
                                <div className="text-sm">
                                    <p className="font-bold text-slate-800">{log.student}</p>
                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                        <MapPinIcon className="h-3 w-3" /> Portai Principal
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-black text-blue-600">{log.time}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{log.method}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors">
                    Afficher l'historique complet
                </button>
            </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: 100%; }
        }
      `}</style>
    </div>
  );
}
