import ProdukCard from "../components/ProdukCard";
import { useState, useEffect } from "react";

function Home() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kataKunci, setKataKunci] = useState("");
  const [kategori, setKategori] = useState([]);
  const [kategoriTerpilih, setKategoriTerpilih] = useState("");
  const [halaman, setHalaman] = useState(1);

  const produkPerHalaman = 8;

  const produkTersaring = produk.filter(
    (p) =>
      p.title.toLowerCase().includes(kataKunci.toLowerCase()) &&
      (kategoriTerpilih === "" || p.category === kategoriTerpilih)
  );

  const indexAwal = (halaman - 1) * produkPerHalaman;
  const indexAkhir = indexAwal + produkPerHalaman;

  const produkDitampilkan = produkTersaring.slice(
    indexAwal,
    indexAkhir
  );

  const totalHalaman = Math.ceil(
    produkTersaring.length / produkPerHalaman
  );

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProduk(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setKategori(data);
      });
  }, []);

  if (loading) return <p>Memuat produk...</p>;

  return (
    <>
    <div className="flex justify-center">
      <div className="pt-24">
        <input className="border"
          placeholder=" Cari produk..."
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          />
      
        <select
          value={kategoriTerpilih}
          onChange={(e) => setKategoriTerpilih(e.target.value)}
          >
          <option value="">Semua kategori</option>

          {kategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>
          </div>

      <div className="grid grid-cols-4 gap-5 pt-15">
        {produkDitampilkan.map((p) => (
          <ProdukCard key={p.id} produk={p} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 pt-8 pb-10">
  <button
    onClick={() => setHalaman(halaman - 1)}
    disabled={halaman === 1}
    className="rounded-lg bg-gray-200 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
  >
    Sebelumnya
  </button>

  <span className="font-semibold">
    Halaman {halaman} dari {totalHalaman}
  </span>

  <button
    onClick={() => setHalaman(halaman + 1)}
    disabled={halaman === totalHalaman}
    className="rounded-lg bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
  >
    Selanjutnya
  </button>
</div>
    </>
  );
}

export default Home;
