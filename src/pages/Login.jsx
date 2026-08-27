import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.email) {
      setError("Email wajib diisi");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Email tidak valid");
      return;
    }

    if (!form.password) {
      setError("Password wajib diisi");
      return;
    }

    if (form.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    const hasil = login(form.email, form.password);

    if (!hasil.success) {
      setError(hasil.message);
      return;
    }

    alert(hasil.message);
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 pt-24 pb-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Selamat Datang
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Masukkan akun Anda untuk melanjutkan
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
              Email
            </label>
            <input
              type="email"
              placeholder="nama@email.com"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Masukkan password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-black hover:bg-zinc-800 active:scale-[0.99] text-white font-semibold py-3 rounded-xl shadow-lg shadow-black/10 hover:shadow-black/20 transition-all duration-300"
          >
            Masuk
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-black font-semibold hover:underline transition-colors"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;