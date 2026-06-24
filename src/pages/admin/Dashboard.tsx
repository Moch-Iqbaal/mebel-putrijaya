import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClients';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <p className="text-gray-500 mb-6">Login berhasil! Fitur produk akan dibangun di Phase 4.</p>
        <button
          onClick={handleLogout}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}