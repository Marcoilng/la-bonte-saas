"use client";

import { useState, useEffect } from "react";
import { getStudents, uploadStudentPhoto } from "@/lib/services";
import { QRCodeSVG } from "qrcode.react";
import { 
  MagnifyingGlassIcon, 
  UserPlusIcon, 
  EllipsisVerticalIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  QrCodeIcon,
  ArrowDownTrayIcon,
  PhotoIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudentQR, setSelectedStudentQR] = useState<any>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => 
    `${student.prenom} ${student.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.identifiant_scolaire.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, studentId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingId(studentId);
    try {
      await uploadStudentPhoto(file, studentId);
      await fetchStudents(); // Refresh list to show new photo
    } catch (error) {
      alert("Erreur lors de l'upload de la photo.");
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Élèves & Inscriptions</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gérez la base de données de tous vos élèves, leurs statuts et dossiers académiques.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="flex items-center gap-x-2 rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg hover:bg-blue-500 transition-all hover:scale-105 active:scale-95"
          >
            <UserPlusIcon className="h-5 w-5" />
            Inscrire un élève
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl overflow-hidden relative group">
          <div className="absolute -right-4 -top-4 bg-blue-500/10 h-24 w-24 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
          <dt className="text-sm font-medium text-gray-500 truncate">Total Élèves</dt>
          <dd className="mt-2 text-3xl font-bold text-blue-900">{students.length}</dd>
        </div>
        <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl overflow-hidden relative group">
          <div className="absolute -right-4 -top-4 bg-green-500/10 h-24 w-24 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all" />
          <dt className="text-sm font-medium text-gray-500 truncate">Solvable</dt>
          <dd className="mt-2 text-3xl font-bold text-green-600">
            {students.filter(s => s.statut_financier === "Payé").length}
          </dd>
        </div>
        <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl overflow-hidden relative group">
          <div className="absolute -right-4 -top-4 bg-orange-500/10 h-24 w-24 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all" />
          <dt className="text-sm font-medium text-gray-500 truncate">En Retard</dt>
          <dd className="mt-2 text-3xl font-bold text-orange-600">
            {students.filter(s => s.statut_financier === "Non Payé").length}
          </dd>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-all sm:text-sm"
            placeholder="Rechercher un élève par nom ou matricule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
            <select className="rounded-xl border-gray-300 text-sm focus:ring-blue-600">
                <option>Toutes les classes</option>
                <option>6ème Primaire</option>
                <option>5ème Primaire</option>
            </select>
        </div>
      </div>

      {/* Student Table */}
      <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/30 backdrop-blur-lg shadow-2xl">
        {loading ? (
          <div className="p-12 text-center text-gray-500 font-bold">Chargement des données...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200/50">
            <thead>
              <tr className="bg-gray-50/50">
                <th scope="col" className="py-4 pl-6 pr-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Élève
                </th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Matricule
                </th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Classe
                </th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Statut Finance
                </th>
                <th scope="col" className="relative py-4 pl-3 pr-6 sm:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="whitespace-nowrap py-5 pl-6 pr-3">
                    <div className="flex items-center">
                      <div className="h-11 w-11 flex-shrink-0 relative group/avatar">
                      <img className="h-11 w-11 rounded-full object-cover shadow-md border-2 border-white" src={student.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.prenom}`} alt="" />
                      <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover/avatar:opacity-100 cursor-pointer transition-opacity">
                        <PhotoIcon className="h-5 w-5 text-white" />
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, student.id)}
                          disabled={uploadingId === student.id}
                        />
                      </label>
                      {uploadingId === student.id && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full">
                          <ArrowPathIcon className="h-5 w-5 text-blue-600 animate-spin" />
                        </div>
                      )}
                    </div>
                      <div className="ml-4">
                        <div className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {student.prenom} {student.nom}
                        </div>
                        <div className="text-xs text-gray-500">{student.email_parent}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 border border-gray-200">
                      {student.identifiant_scolaire}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-600 font-medium">
                    {student.classe}
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm">
                    <span className={`inline-flex items-center gap-x-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                      student.statut_financier === "Payé" 
                        ? "bg-green-50 text-green-700 ring-green-600/20" 
                        : student.statut_financier === "Partiel"
                        ? "bg-orange-50 text-orange-700 ring-orange-600/20"
                        : "bg-red-50 text-red-700 ring-red-600/20"
                    }`}>
                      {student.statut_financier === "Payé" && <CheckCircleIcon className="h-4 w-4" />}
                      {student.statut_financier === "Partiel" && <ClockIcon className="h-4 w-4" />}
                      {student.statut_financier === "Non Payé" && <XCircleIcon className="h-4 w-4" />}
                      {student.statut_financier}
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap py-5 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                    <div className="flex items-center justify-end gap-2 pr-6">
                      <button 
                        onClick={() => setSelectedStudentQR(student)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Voir QR Code"
                      >
                        <QrCodeIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* QR Code Modal */}
      {selectedStudentQR && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl border border-white/20 animate-in zoom-in duration-300">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-800">Badge Numérique</h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  {selectedStudentQR.prenom} {selectedStudentQR.nom}
                </p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-3xl inline-block border-2 border-slate-100 shadow-inner">
                <QRCodeSVG 
                  value={selectedStudentQR.qr_code_data || selectedStudentQR.identifiant_scolaire}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <div className="flex flex-col gap-3">
                <button 
                   onClick={() => window.print()}
                   className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
                >
                  <QrCodeIcon className="h-5 w-5" />
                  Imprimer le Badge
                </button>
                <button 
                  onClick={() => setSelectedStudentQR(null)}
                  className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
