"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Html5QrcodeScanner } from "html5-qrcode";
import { 
  KeyIcon, 
  QrCodeIcon, 
  ArrowRightIcon,
  ShieldCheckIcon,
  UserIcon
} from "@heroicons/react/24/outline";

export default function LoginPage() {
  const router = useRouter();
  const [method, setMethod] = useState<"standard" | "qr">("standard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (method === "qr") {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scanner.render(
        (decodedText) => {
          scanner.clear();
          handleQRLogin(decodedText);
        },
        (err) => {
          // console.warn(err);
        }
      );

      return () => {
        scanner.clear();
      };
    }
  }, [method]);

  const handleQRLogin = async (qrData: string) => {
    setLoading(true);
    setError(null);
    try {
      // Logic to verify QR and redirect
      console.log("QR Login with:", qrData);
      // For now, simulate success
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      setError("Badge non reconnu ou expiré.");
      setLoading(false);
    }
  };

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Supabase Auth logic would go here
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      setError("Identifiants incorrects.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="text-center mb-10">
            <div className="h-16 w-16 bg-blue-900 rounded-3xl flex items-center justify-center text-white mx-auto shadow-2xl mb-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-600 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full opacity-50 blur-xl" />
                <ShieldCheckIcon className="h-8 w-8 relative z-10" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">CS LA BONTÉ</h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Cloud Education Engine v1.0</p>
        </div>

        <div className="glass rounded-[3rem] p-10 border border-white/40 shadow-2xl shadow-blue-900/10">
            <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-10">
                <button 
                    onClick={() => setMethod("standard")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${method === "standard" ? "bg-white text-blue-900 shadow-md scale-[1.02]" : "text-slate-400 hover:text-slate-600"}`}
                >
                    <KeyIcon className="h-4 w-4" />
                    Standard
                </button>
                <button 
                    onClick={() => setMethod("qr")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${method === "qr" ? "bg-white text-blue-900 shadow-md scale-[1.02]" : "text-slate-400 hover:text-slate-600"}`}
                >
                    <QrCodeIcon className="h-4 w-4" />
                    Scan QR
                </button>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold animate-in shake duration-300">
                    {error}
                </div>
            )}

            {method === "standard" ? (
                <form onSubmit={handleStandardLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-tighter ml-1">Email professionnel</label>
                        <div className="relative">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                            <input 
                                required
                                type="email" 
                                placeholder="name@school.com"
                                className="w-full bg-slate-50/50 border-0 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-tighter ml-1">Mot de passe</label>
                        <div className="relative">
                            <KeyIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                            <input 
                                required
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-slate-50/50 border-0 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                            />
                        </div>
                    </div>
                    <button 
                        disabled={loading}
                        className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all mt-4 flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        {loading ? "Vérification..." : "Accéder à l'Espace Pro"}
                        {!loading && <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>
            ) : (
                <div className="space-y-8">
                    <div className="relative">
                        <div id="reader" className="overflow-hidden rounded-3xl border-4 border-slate-100 bg-slate-50 aspect-square flex items-center justify-center">
                            {!loading && (
                                <div className="text-center p-10">
                                    <QrCodeIcon className="h-16 w-16 text-slate-200 mx-auto mb-4 animate-pulse" />
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Initialisation de la caméra...</p>
                                </div>
                            )}
                        </div>
                        {loading && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                                <div className="text-center">
                                    <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                    <p className="text-xs font-black text-blue-900 uppercase">Authentification...</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Présentez votre badge élève</p>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-[240px] mx-auto font-medium">Placez le QR Code de votre badge face à la caméra pour une connexion instantanée.</p>
                    </div>
                </div>
            )}
        </div>
        
        <p className="text-center text-[10px] text-slate-300 font-bold uppercase mt-10 tracking-[0.3em]">Propulsé par Elikia Cloud Services © 2026</p>
      </div>
    </div>
  );
}
