import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const KeranjangContext = createContext();

export function KeranjangProvider({ children }) {
  const [item, setItem] = useLocalStorage("keranjang", []);

  // Tambah produk ke keranjang
  function tambahKeKeranjang(produk, ukuran, jumlah) {
    setItem((prev) => [
      ...prev,
      {
        ...produk,
        ukuran,
        jumlah,
      },
    ]);
  }

  // Hapus produk dari keranjang
  function hapusDariKeranjang(id) {
    setItem((prev) => prev.filter((p) => p.id !== id));
  }

  // Ubah jumlah produk
  function ubahJumlah(id, jumlahBaru) {
    if (jumlahBaru < 1) return;

    setItem((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, jumlah: jumlahBaru }
          : p
      )
    );
  }

  return (
    <KeranjangContext.Provider
      value={{
        item,
        tambahKeKeranjang,
        hapusDariKeranjang,
        ubahJumlah,
      }}
    >
      {children}
    </KeranjangContext.Provider>
  );
}

export function useKeranjang() {
  return useContext(KeranjangContext);
}