import type { Metadata } from 'next';
import Login from '../../../views/admin/Login';

export const metadata: Metadata = {
  title: 'Admin Login | Mebel Putri Jaya',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Login />;
}
