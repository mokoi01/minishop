import { memo } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Badge from "./Badge";
import { useKeranjang } from "../context/KeranjangContext";

function ProdukCard({ produk }) {
  const { tambahKeKeranjang } = useKeranjang();
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 shadow-xl">

      {/* Badge */}
      {produk.category && (
        <div className="absolute top-3 right-3 z-10">
          <Badge>{produk.category}</Badge>
        </div>
      )}

      {/* Gambar → Detail Produk */}
      <Link
        to={`/produk/${produk.id}`}
        className="relative flex items-center justify-center overflow-hidden bg-gray-50"
      >
        <img
          src={produk.image}
          alt={produk.title}
          className="h-80 w-90 object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Informasi Produk */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="line-clamp-2 text-base font-semibold text-gray-800 transition-colors group-hover:text-gray-700">
            {produk.title}
          </h3>

          <p className="mt-1.5 text-lg font-bold text-black">
            ${produk.price.toLocaleString("id-ID")}
          </p>
        </div>

        {/* Action */}
        <div className="mt-4 pt-1">
          <Button
            onClick={() => tambahKeKeranjang(produk, null, 1)} 
            className="w-full flex items-center justify-center text-center">
            <span className="w-full text-center block">
              Tambah ke keranjang
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Bungkus dengan memo untuk optimasi re-render
export default memo(ProdukCard);