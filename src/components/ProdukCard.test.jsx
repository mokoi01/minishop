import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProdukCard from "./ProdukCard";

vi.mock("../context/KeranjangContext", () => ({
  useKeranjang: () => ({
    tambahKeKeranjang: mockTambahKeKeranjang,
  }),
}));

const mockTambahKeKeranjang = vi.fn();
const mockProduk = {
  id: 1,
  title: "Sepatu Sneaker",
  price: 150000,
  category: "Fashion",
  image: "http://example.com/sepatu.jpg",
};

describe("ProdukCard Component", () => {
  // TEST 1: Memastikan data produk tampil lengkap
  it("TEST 1: Menampilkan judul, harga, dan badge kategori produk", () => {
    render(
      <MemoryRouter>
        <ProdukCard produk={mockProduk} />
      </MemoryRouter>
    );

    expect(screen.getByText("Sepatu Sneaker")).toBeInTheDocument();
    expect(screen.getByText("$150.000")).toBeInTheDocument();
    expect(screen.getByText("Fashion")).toBeInTheDocument();
  });

  // TEST 2: Memastikan fungsi tambah ke keranjang ter panggil saat tombol diklik
  it("TEST 2: Memanggil fungsi tambahKeKeranjang saat tombol diklik", () => {
    render(
      <MemoryRouter>
        <ProdukCard produk={mockProduk} />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /tambah ke keranjang/i });
    fireEvent.click(button);

    expect(mockTambahKeKeranjang).toHaveBeenCalledWith(mockProduk, null, 1);
  });
});