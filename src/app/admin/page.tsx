import type { Metadata } from 'next';
import Dashboard from '../../views/admin/Dashboard';
import ProtectedRoute from '../../components/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Mebel Putri Jaya',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
