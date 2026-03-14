export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Tableau de Bord Administrateur
      </h1>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Statistics Cards placeholers */}
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Élèves</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">450</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Enseignants</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">32</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Taux de Paiement</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">76%</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Fichiers Partagés (Semaine)</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">124</dd>
        </div>
      </div>
    </div>
  );
}
