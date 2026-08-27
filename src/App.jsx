import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailProduk from "./pages/DetailProduk";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

// Lazy loading halaman Keranjang (Hapus import statis Keranjang di atas)
const Keranjang = lazy(() => import("./pages/Keranjang"));

function App() {
  return (
    <BrowserRouter>
      {/* Bungkus Routes atau elemen lazy dengan Suspense */}
      <Suspense fallback={<div className="p-8 text-center">Memuat...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/produk/:id" element={<DetailProduk />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/keranjang"
              element={
                <ProtectedRoute>
                  <Keranjang />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;