'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Lock, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabaseClients';

const MAX_FAILURES = 5;
const LOCKOUT_MS = 60_000;
const STORAGE_KEY = 'mpj-admin-login-failures';
const GENERIC_ERROR = 'Login gagal. Periksa email dan password, lalu coba lagi.';

type FailureRecord = { count: number; lockedUntil: number };

function readFailures(): FailureRecord {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { count: 0, lockedUntil: 0 };
    const parsed = JSON.parse(raw) as Partial<FailureRecord>;
    return {
      count: typeof parsed.count === 'number' && parsed.count > 0 ? parsed.count : 0,
      lockedUntil: typeof parsed.lockedUntil === 'number' && parsed.lockedUntil > 0 ? parsed.lockedUntil : 0,
    };
  } catch {
    return { count: 0, lockedUntil: 0 };
  }
}

function writeFailures(record: FailureRecord) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage can be blocked. The attempt still fails with a generic message.
  }
}

function clearFailures() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage failures on a successful login.
  }
}

function lockoutMessage(lockedUntil: number, now: number): string {
  const seconds = Math.max(1, Math.ceil((lockedUntil - now) / 1000));
  return `Terlalu banyak percobaan. Coba lagi dalam ${seconds} detik.`;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError('');

    const now = Date.now();
    const record = readFailures();
    if (record.lockedUntil > now) {
      setError(lockoutMessage(record.lockedUntil, now));
      return;
    }

    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        const nextCount = (record.lockedUntil > 0 ? 0 : record.count) + 1;
        if (nextCount >= MAX_FAILURES) {
          const lockedUntil = Date.now() + LOCKOUT_MS;
          writeFailures({ count: 0, lockedUntil });
          setError(lockoutMessage(lockedUntil, Date.now()));
        } else {
          writeFailures({ count: nextCount, lockedUntil: 0 });
          setError(GENERIC_ERROR);
        }
        return;
      }

      clearFailures();
      router.push('/admin');
    } catch {
      setError(GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-accent p-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary mx-auto mb-4">
            <Lock size={28} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">Mebel Putri Jaya</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-accent rounded-xl focus:outline-none focus:border-primary transition-colors"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-accent rounded-xl focus:outline-none focus:border-primary transition-colors"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}