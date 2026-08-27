import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { KeranjangProvider, useKeranjang } from "./KeranjangContext"; // Sesuaikan path

function TestComponent() {
  // Gunakan `item` sesuai dengan return value KeranjangContext
  const { item, tambahKeKeranjang } = useKeranjang();
  const dummyItem = { id: 101, title: "Baju Kaos", price: 50000 };

  return (
    <div>
      <span data-testid="cart-count">{item.length}</span>
      <button onClick={() => tambahKeKeranjang(dummyItem, "M", 1)}>
        Tambah Item
      </button>
    </div>
  );
}

describe("KeranjangContext Integration", () => {
  it("TEST 5: Menambahkan barang dan memperbarui jumlah item di keranjang", () => {
    render(
      <KeranjangProvider>
        <TestComponent />
      </KeranjangProvider>
    );

    const countDisplay = screen.getByTestId("cart-count");
    expect(countDisplay.textContent).toBe("0");

    const button = screen.getByRole("button", { name: /tambah item/i });
    fireEvent.click(button);

    expect(countDisplay.textContent).toBe("1");
  });
});