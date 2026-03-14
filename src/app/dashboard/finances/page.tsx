"use client";

import { useState } from "react";
import CashEntryForm from "@/components/finances/CashEntryForm";
import ReceiptPreview from "@/components/finances/ReceiptPreview";
import { 
  CurrencyDollarIcon, 
  ArrowUpIcon, 
  LockClosedIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  BellIcon
} from "@heroicons/react/24/outline";

export default function FinancesPage() {
  const [showReceipt, setShowReceipt] = useState<any>(null);
  const [isClosed, setIsClosed] = useState(false);

  // Mock notifications simulation
  const [notification, setNotification] = useState<string | null>(null);

  const handlePaymentSuccess = (paymentData: any) => {
    setShowReceipt(paymentData);
    setNotification(`Notification Parent: Reçu de ${paymentData.amount}${paymentData.currency} confirmé.`);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Role Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <ShieldCheckIcon className="h-4 w-4 text-blue-400" />
                Session : Agent de Caisse
            </div>
            {!isClosed ? (
                <span className="text-xs font-bold text-green-600 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Caisse Ouverte
                </span>
            ) : (
                <span className="text-xs font-bold text-red-600 flex items-center gap-1.5">
                    <LockClosedIcon className="h-3 w-3" />
                    Caisse Clôturée (17h)
                </span>
            )}
        </div>
        <div className="flex items-center gap-4">
            <p className="text-xs font-medium text-slate-400">Samedi 14 Mars 2026</p>
        </div>
      </div>

      {notification && (
        <div className="fixed top-8 right-8 z-[200] animate-in slide-in-from-right duration-500">
            <div className="glass bg-blue-600 text-white p-6 rounded-3xl shadow-2xl flex items-center gap-4 border-blue-400/30">
                <BellIcon className="h-6 w-6 animate-bounce" />
                <div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-80">Système Cloud-to-Parent</p>
                    <p className="text-sm font-bold">{notification}</p>
                </div>
            </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">
        {/* Main Entry Section */}
        <div className="xl:col-span-2 space-y-10">
            {!isClosed ? (
                <CashEntryForm onPaymentSuccess={handlePaymentSuccess} />
            ) : (
                <div className="glass rounded-[2rem] p-12 text-center border-red-100/20">
                    <LockClosedIcon className="h-16 w-16 text-slate-300 mx-auto mb-6" />
                    <h2 className="text-2xl font-black text-slate-800 mb-2">Opérations Verrouillées</h2>
                    <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">La caisse a été clôturée pour aujourd'hui. Seule la direction peut autoriser de nouvelles saisies.</p>
                    <button className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm">Contacter la Direction</button>
                </div>
            )}

            {/* Daily History */}
            <div className="glass rounded-[2rem] border border-white/20 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-black text-slate-800">Recettes du Jour</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Traçabilité complète</p>
                    </div>
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <DocumentTextIcon className="h-6 w-6 text-slate-400" />
                    </button>
                </div>
                <div className="divide-y divide-slate-50">
                    {[
                        { student: "JEAN MUBIALA", category: "Minerval", amount: "150 $", time: "10:45", status: "Validé" },
                        { student: "SARAH KAVIRA", category: "Uniforme", amount: "45 $", time: "09:12", status: "Validé" },
                    ].map((tx, i) => (
                        <div key={i} className="p-6 flex items-center justify-between hover:bg-white/40 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs">
                                    {tx.student.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-800">{tx.student}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">{tx.category} • {tx.time}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-black text-slate-800">{tx.amount}</p>
                                <span className="text-[9px] font-black text-green-600 uppercase bg-green-50 px-2 py-0.5 rounded-full">{tx.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Closing & Stats */}
        <div className="space-y-8">
            <div className="glass rounded-[2rem] p-8 space-y-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Résumé de Caisse</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-slate-500">Total USD</span>
                        <span className="text-2xl font-black text-slate-900">1,240 $</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-slate-500">Total CDF</span>
                        <span className="text-xl font-black text-slate-900">320,000 FC</span>
                    </div>
                </div>
                <div className="pt-6 border-t border-slate-100">
                    <button 
                        onClick={() => setIsClosed(!isClosed)}
                        className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${!isClosed ? 'bg-red-600 text-white shadow-xl shadow-red-100 hover:bg-red-700' : 'bg-green-600 text-white shadow-xl shadow-green-100 hover:bg-green-700'}`}
                    >
                        {isClosed ? <ArrowUpIcon className="h-5 w-5" /> : <LockClosedIcon className="h-5 w-5" />}
                        {isClosed ? "Réouvrir la Caisse" : "Clôturer la Caisse"}
                    </button>
                    <p className="text-[10px] text-center text-slate-400 font-bold uppercase mt-4">Verrouillage automatique à 17h00</p>
                </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-slate-900 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <h3 className="text-lg font-black mb-4 relative z-10">Sécurité Elite</h3>
                <p className="text-xs text-blue-200 leading-relaxed mb-6 font-medium relative z-10">Chaque transaction est signée avec un QR unique et notifiée instantanément au parent pour éviter toute fraude physique.</p>
                <div className="flex justify-center relative z-10">
                    <CurrencyDollarIcon className="h-16 w-16 text-blue-400/50 group-hover:scale-110 transition-transform duration-500" />
                </div>
            </div>
        </div>
      </div>

      {showReceipt && (
        <ReceiptPreview data={showReceipt} onClose={() => setShowReceipt(null)} />
      )}
    </div>
  );
}
