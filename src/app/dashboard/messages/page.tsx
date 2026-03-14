"use client";

import { useState } from "react";
import { 
  PaperAirplaneIcon, 
  ChatBubbleBottomCenterTextIcon,
  BellIcon,
  UserCircleIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("direct");

  const announcements = [
    { title: "Réunion des Parents", content: "La réunion trimestrielle aura lieu ce Samedi à 10h...", date: "Il y a 1h", priority: "High" },
    { title: "Journée Culturelle", content: "Préparez vos tenues traditionnelles pour vendredi prochain !", date: "Hier", priority: "Medium" },
  ];

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col space-y-8 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between flex-none">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Communication</h1>
          <p className="mt-2 text-sm text-gray-600">Envoyez des messages aux parents ou publiez des annonces générales.</p>
        </div>
        <div className="flex gap-3">
            <button className="relative p-2 text-gray-400 hover:text-blue-600 bg-white rounded-xl shadow-sm border border-gray-100 transition-all">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
            <button className="flex items-center gap-x-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-xl hover:bg-indigo-500 transition-all">
                <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
                Nouvelle Annonce
            </button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden">
        {/* Left: Chat List / Categories */}
        <div className="w-80 flex-none space-y-6 overflow-y-auto pr-2 custom-scrollbar">
            <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/20 p-2 shadow-lg">
                <button 
                  onClick={() => setActiveTab("direct")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'direct' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-white/50'}`}
                >
                    Messages Directs
                </button>
                <button 
                  onClick={() => setActiveTab("announcements")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold mt-1 transition-all ${activeTab === 'announcements' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-white/50'}`}
                >
                    Annonces École
                </button>
            </div>

            <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/20 p-4 shadow-lg">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Contacts Récents</h3>
                <div className="space-y-4">
                    {[
                        { name: "Direction", role: "Administration", active: true },
                        { name: "Mubiala Jean", role: "Parent (6ème A)", active: false },
                        { name: "Bakongo Robert", role: "Enseignant", active: true },
                    ].map((contact, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/50 cursor-pointer transition-colors group">
                            <div className="relative">
                                <UserCircleIcon className="h-10 w-10 text-gray-300 group-hover:text-blue-400 transition-colors" />
                                {contact.active && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800">{contact.name}</p>
                                <p className="text-[10px] text-gray-500 font-medium">{contact.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right: Active View */}
        <div className="flex-1 bg-white/40 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden">
            {activeTab === "direct" ? (
                <>
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <div className="flex items-center gap-3">
                            <UserCircleIcon className="h-10 w-10 text-blue-600" />
                            <div>
                                <h2 className="font-bold text-gray-900">Mubiala Jean <span className="text-[10px] font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-2">Parent</span></h2>
                                <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                                    <CheckBadgeIcon className="h-3 w-3" /> En ligne
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-80">
                        <div className="flex justify-start">
                            <div className="max-w-[70%] bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-700">Bonjour, j'aimerais avoir plus de précisions sur les frais d'examen pour Jean.</p>
                                <span className="text-[10px] text-gray-400 mt-2 block text-right">09:12</span>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="max-w-[70%] bg-blue-600 text-white p-4 rounded-2xl rounded-tr-none shadow-xl">
                                <p className="text-sm">Bonjour M. Jean. Les frais s'élèvent à 15$ et doivent être réglés avant la fin du mois.</p>
                                <span className="text-[10px] text-blue-200 mt-2 block text-right">10:45</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border-t border-gray-100 bg-white/80">
                        <div className="flex gap-4">
                            <input 
                                type="text" 
                                placeholder="Écrivez votre message ici..." 
                                className="flex-1 rounded-2xl border-0 bg-gray-100 py-3 px-6 text-sm focus:ring-2 focus:ring-blue-600"
                            />
                            <button className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all">
                                <PaperAirplaneIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="p-8 space-y-6">
                    <h2 className="text-2xl font-black text-gray-900 border-b-4 border-indigo-600 w-fit pb-2 mb-8">Annonces Générales</h2>
                    {announcements.map((ann, i) => (
                        <div key={i} className="group p-6 rounded-3xl bg-white/80 border border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-xl transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full ${ann.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                                    {ann.priority} Priority
                                </span>
                                <span className="text-xs text-gray-400 font-medium">{ann.date}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">{ann.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{ann.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
