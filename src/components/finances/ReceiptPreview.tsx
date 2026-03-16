"use client";

import { useRef } from "react";
import { 
  PrinterIcon, 
  ShareIcon, 
  XMarkIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";
import { QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ReceiptPreview({ data, onClose }: { data: any, onClose: () => void }) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return;
    
    // Hide buttons for the capture
    const buttons = receiptRef.current.querySelector('.action-buttons') as HTMLElement;
    const closeBtn = receiptRef.current.querySelector('.close-button') as HTMLElement;
    if (buttons) buttons.style.display = 'none';
    if (closeBtn) closeBtn.style.display = 'none';

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5"
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Recu-${data.id.substring(0, 8)}.pdf`);
    } catch (error) {
      console.error("PDF Generation error:", error);
    } finally {
      if (buttons) buttons.style.display = 'grid';
      if (closeBtn) closeBtn.style.display = 'block';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        ref={receiptRef}
        className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300"
      >
        {/* HQ Watermark Simulation */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center rotate-12 scale-150">
            <h1 className="text-9xl font-black text-slate-900 leading-none">LA BONTÉ<br/>SaaS</h1>
        </div>

        <div className="p-8 relative">
            <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-blue-900 rounded-lg flex items-center justify-center text-white">
                        <CheckBadgeIcon className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-black text-blue-900 tracking-tighter uppercase">CS LA BONTÉ</span>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors close-button">
                    <XMarkIcon className="h-5 w-5 text-slate-400" />
                </button>
            </div>

            <div className="text-center mb-8">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Reçu Officiel d'Encaissement</p>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">#{data.id.substring(0, 8).toUpperCase()}</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">{new Date(data.date).toLocaleString('fr-FR')}</p>
            </div>

            <div className="space-y-4 border-y border-slate-100 py-8 mb-8">
                <div className="flex justify-between items-end">
                    <div className="text-left">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Élève / Identifiant</span>
                        <p className="font-bold text-slate-800 text-lg">{data.student_id || data.studentId}</p>
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <div className="text-left">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Motif du Paiement</span>
                        <p className="font-bold text-slate-800">{data.category}</p>
                    </div>
                    <div className="text-right">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Montant Payé</span>
                         <p className="font-black text-blue-600 text-2xl">{data.amount} {data.currency}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                    <QRCodeSVG 
                      value={`VERIFY-TX-${data.id}`}
                      size={60}
                      level="L"
                    />
                </div>
                <div className="flex-1 text-left">
                    <p className="text-[10px] font-black text-slate-800 uppercase tracking-tighter leading-tight">Authenticité Sécurisée</p>
                    <p className="text-[9px] text-slate-400 font-medium mt-1 leading-relaxed">Scannez ce code pour vérifier l'authenticité de cette transaction sur la plateforme officielle CS LA BONTÉ.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-10 action-buttons">
                <button 
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-2 py-4 bg-slate-100 text-slate-800 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all"
                >
                    <ShareIcon className="h-5 w-5" />
                    Imprimer
                </button>
                <button 
                  onClick={handleDownloadPDF}
                  className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-lg hover:bg-blue-700 transition-all"
                >
                    <PrinterIcon className="h-5 w-5" />
                    Télécharger PDF
                </button>
            </div>

            <p className="text-center text-[9px] text-slate-300 font-bold uppercase mt-8 tracking-widest">Logiciel de Gestion Scolaire • CS LA BONTÉ v1.0</p>
        </div>
      </div>
    </div>
  );
}
