"use client";

import { 
  DocumentIcon, 
  CloudArrowUpIcon, 
  FolderIcon,
  VideoCameraIcon,
  PresentationChartBarIcon,
  ArrowDownTrayIcon
} from "@heroicons/react/24/outline";

export default function FichiersPage() {
  const files = [
    { name: "Cours_Mathematiques_T1.pdf", size: "2.4 MB", type: "PDF", owner: "Prof. Bakongo", date: "Aujourd'hui" },
    { name: "Reglement_Interieur_2024.docx", size: "850 KB", type: "Word", owner: "Direction", date: "Hier" },
    { name: "Video_Experience_Chimie.mp4", size: "45 MB", type: "Video", owner: "M. Luc T.", date: "10 Mars" },
  ];

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Centre de Ressources</h1>
          <p className="mt-2 text-sm text-gray-600">Partagez et organisez les documents pédagogiques et administratifs.</p>
        </div>
        <button className="flex items-center gap-x-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-xl hover:bg-blue-500 transition-all">
          <CloudArrowUpIcon className="h-5 w-5" />
          Téléverser un Fichier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Documents PDF", count: 42, color: "blue", icon: DocumentIcon },
          { label: "Vidéos / Cours", count: 15, color: "red", icon: VideoCameraIcon },
          { label: "Présentations", count: 8, color: "orange", icon: PresentationChartBarIcon },
          { label: "Archives", count: 120, color: "gray", icon: FolderIcon },
        ].map((cat, i) => (
          <div key={i} className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
            <div className={`h-12 w-12 rounded-2xl bg-${cat.color}-100 flex items-center justify-center text-${cat.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
              <cat.icon className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-gray-800">{cat.label}</h3>
            <p className="text-sm text-gray-500">{cat.count} fichiers</p>
          </div>
        ))}
      </div>

      <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800">Fichiers Récents</h2>
            <div className="flex gap-2">
                <input type="text" placeholder="Filtrer..." className="text-xs rounded-lg border-gray-200" />
            </div>
        </div>
        <div className="divide-y divide-gray-100">
          {files.map((file, idx) => (
            <div key={idx} className="p-6 flex items-center justify-between hover:bg-white/60 transition-colors group">
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors`}>
                  <DocumentIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{file.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase font-black">{file.type} • {file.size} • Ajouté par {file.owner}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 font-medium">{file.date}</span>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
