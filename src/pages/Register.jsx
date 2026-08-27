import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!nama || !email || !password || !konfirmasiPassword) {
      setError("Semua field wajib diisi");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    if (password !== konfirmasiPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    const hasil = register(nama, email, password);

    if (!hasil.success) {
      setError(hasil.message);
      return;
    }

    alert(hasil.message);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 pt-24 pb-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Buat Akun
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Daftar untuk mulai berbelanja di Minishop
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Konfirmasi Password
            </label>
            <input
              type="password"
              value={konfirmasiPassword}
              onChange={(e) => setKonfirmasiPassword(e.target.value)}
              placeholder="Ulangi password"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-black hover:bg-zinc-800 active:scale-[0.99] text-white font-semibold py-3 rounded-xl shadow-lg shadow-black/10 hover:shadow-black/20 transition-all duration-300"
          >
            Daftar Sekarang
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-black font-semibold hover:underline transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;