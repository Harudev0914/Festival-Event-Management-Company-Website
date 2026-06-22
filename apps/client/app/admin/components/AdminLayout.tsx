import Sidebar from "./Sidebar";
import ProtectedRoute from "./ProtectedRoute";

export default function AdminLayout({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex-1 p-10 bg-white">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h1>
            {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
          </header>
          <div className="bg-white">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
