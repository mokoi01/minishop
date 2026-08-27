import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useKeranjang } from "../context/KeranjangContext";

function DetailProduk() {
  const { id } = useParams();
  const [produk, setProduk] = useState(null);
  const [jumlah, setJumlah] = useState(1);
  const [loading, setLoading] = useState(true);
  const { tambahKeKeranjang } = useKeranjang();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Produk tidak ditemukan");
        return res.json();
      })
      .then((data) => setProduk(data))
      .catch(() => setProduk(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="pt-24 min-h-[60vh] flex items-center justify-center">
        <p>Memuat produk...</p>
      </div>
    );
  }

  if (!produk) {
    return (
      <div className="pt-24 min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-lg font-semibold text-neutral-800">
          Produk tidak ditemukan
        </p>
        <Link
          to="/"
          className="mt-4 text-sm font-medium text-neutral-500 underline underline-offset-4 hover:text-neutral-900"
        >
          Kembali ke katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-6 md:px-12 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-xs text-neutral-400 mb-8 uppercase tracking-wider">
        <Link to="/" className="hover:text-neutral-900">Beranda</Link>
        <span className="mx-2">/</span>
        {produk.category && (
          <>
            <span>{produk.category}</span>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-neutral-800">{produk.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        {/* Gambar produk */}
        <div className="bg-neutral-100 rounded-2xl overflow-hidden aspect-square flex items-center justify-center">
          <img
            src={produk.image}
            alt={produk.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info produk */}
        <div className="flex flex-col">
          {produk.category && (
            <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-2">
              {produk.category}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 leading-tight">
            {produk.title}
          </h1>

          <p className="mt-3 text-2xl font-semibold text-neutral-900">
            ${produk.price.toLocaleString("id-ID")}
          </p>

          {produk.description && (
            <p className="mt-5 text-neutral-600 leading-relaxed">
              {produk.description}
            </p>
          )}
          
          {/* Jumlah */}
          <div className="mt-6">
            <p className="text-sm font-medium text-neutral-800 mb-3">Jumlah</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setJumlah((j) => Math.max(1, j - 1))}
                className="w-9 h-9 rounded-lg border border-neutral-300 text-neutral-700 hover:border-neutral-900"
              >
                −
              </button>
              <span className="w-6 text-center font-medium">{jumlah}</span>
              <button
                onClick={() => setJumlah((j) => j + 1)}
                className="w-9 h-9 rounded-lg border border-neutral-300 text-neutral-700 hover:border-neutral-900"
              >
                +
              </button>
            </div>
          </div>

          {/* Tombol aksi */}
          <div className="mt-10 flex gap-3">
            <button 
              onClick={() => tambahKeKeranjang(produk, null, jumlah)}
              className="flex-1 border border-neutral-300 text-neutral-800 font-semibold py-3.5 rounded-xl hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Masukkan ke keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduk;