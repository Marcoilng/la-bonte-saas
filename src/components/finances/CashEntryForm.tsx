"use client";

import { useState } from "react";
import { recordPayment } from "@/lib/services";
import { 
  CurrencyDollarIcon, 
  UserIcon, 
  CheckCircleIcon,
  TicketIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function CashEntryForm({ onPaymentSuccess }: { onPaymentSuccess: (data: any) => void }) {
  const [formData, setFormData] = useState({
    student_id: "",
    amount: "",
    currency: "USD",
    category: "Minerval",
  });
  const [submitting, setSubmitting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirming(true);
  };

  const confirmPayment = async () => {
    setSubmitting(true);
    try {
      const result = await recordPayment({
        student_id: formData.student_id,
        amount: Number(formData.amount),
        currency: formData.currency,
        category: formData.category,
        status: "Validé"
      });

      if (result) {
        onPaymentSuccess({ ...result, id: result.id, date: result.created_at });
        setFormData({ student_id: "", amount: "", currency: "USD", category: "Minerval" });
      }
    } catch (error) {
      alert("Erreur lors de l'enregistrement du paiement.");
    } finally {
      setSubmitting(false);
      setIsConfirming(false);
    }
  };

  return (
    <div className="glass rounded-[2rem] p-8 shadow-2xl border border-white/20">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
          <CurrencyDollarIcon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Nouvel Encaissement Cash</h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Module de Caisse Sécurisé</p>
        </div>
      </div>

      {!isConfirming ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-tighter ml-1">Élève (ID ou Nom)</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
              <input 
                required
                type="text" 
                placeholder="Ex: LB-2024-0012"
                className="w-full bg-slate-50/50 border-0 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                value={formData.student_id}
                onChange={(e) => setFormData({...formData, student_id: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-tighter ml-1">Montant</label>
              <input 
                required
                type="number" 
                placeholder="0.00"
                className="w-full bg-slate-50/50 border-0 rounded-2xl py-4 px-4 text-sm focus:ring-2 focus:ring-blue-600 transition-all font-bold"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-tighter ml-1">Devise</label>
              <select 
                className="w-full bg-slate-50/50 border-0 rounded-2xl py-4 px-4 text-sm focus:ring-2 focus:ring-blue-600 transition-all font-bold"
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
              >
                <option value="USD">USD ($)</option>
                <option value="CDF">CDF (FC)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-tighter ml-1">Catégorie de Paiement</label>
            <div className="grid grid-cols-2 gap-2">
              {["Minerval", "Transport", "Uniforme", "Frais Connexes"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData({...formData, category: cat})}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border ${formData.category === cat ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-600 border-slate-100 hover:border-blue-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all mt-4 flex items-center justify-center gap-2"
          >
            <ShieldCheckIcon className="h-5 w-5 text-blue-400" />
            Valider l'Encaissement
          </button>
        </form>
      ) : (
        <div className="animate-in fade-in zoom-in-95 duration-300 text-center py-4">
          <div className="h-20 w-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <TicketIcon className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-2">Confirmer le Paiement ?</h3>
          <div className="bg-slate-50 rounded-2xl p-6 text-left mb-8 border border-slate-100">
             <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Élève</span>
                <span className="text-sm font-black text-slate-800">{formData.student_id}</span>
             </div>
             <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Montant</span>
                <span className="text-lg font-black text-blue-600">{formData.amount} {formData.currency}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Type</span>
                <span className="text-sm font-black text-slate-800">{formData.category}</span>
             </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsConfirming(false)}
              disabled={submitting}
              className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all disabled:opacity-50"
            >
              Annuler
            </button>
            <button 
              onClick={confirmPayment}
              disabled={submitting}
              className="flex-3 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {submitting ? "Traitement..." : "Confirmer & Imprimer Reçu"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
