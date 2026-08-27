import { useKeranjang } from "../context/KeranjangContext";

function Keranjang() {
    const { item, hapusDariKeranjang, ubahJumlah } = useKeranjang();

    const total = item.reduce(
        (sum, p) => sum + (p.price ?? p.harga) * p.jumlah,
        0
    );

    return (
        <div className="container mx-auto px-6 py-8 pt-24 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">
                Keranjang Belanja
            </h1>

            {item.length === 0 ? (
                <p className="text-gray-500">
                    Keranjang belanja Anda kosong.
                </p>
            ) : (
                <>
                    <div className="space-y-4">
                        {item.map((p) => (
                            <div
                                key={p.id}
                                className="flex items-center gap-4 border-b pb-4"
                            >
                                {/* Gambar Produk */}
                                <img
                                src={p.image ?? p.gambar}
                                alt={p.title ?? p.nama}
                                    className="w-20 h-20 rounded-xl object-cover bg-gray-100"
                                />

                                {/* Informasi Produk */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">
                                    {p.title ?? p.nama}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                    ${(p.price ?? p.harga).toLocaleString("id-ID")}
                                    </p>

                                    {/* Quantity */}
                                    <div className="flex items-center gap-2 mt-3">
                                        <button
                                            onClick={() =>
                                                ubahJumlah(
                                                    p.id,
                                                    p.jumlah - 1
                                                )
                                            }
                                            className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100"
                                        >
                                            −
                                        </button>

                                        <span className="w-8 text-center font-medium">
                                            {p.jumlah}
                                        </span>

                                        <button
                                            onClick={() =>
                                                ubahJumlah(
                                                    p.id,
                                                    p.jumlah + 1
                                                )
                                            }
                                            className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Harga Total Produk + Hapus */}
                                <div className="flex flex-col items-end gap-3">
                                    <p className="font-bold text-black">
                                        ${" "}
                                        {(
                                        (p.price ?? p.harga) * p.jumlah
                                        ).toLocaleString("id-ID")}
                                    </p>

                                    <button
                                        onClick={() =>
                                            hapusDariKeranjang(p.id)
                                        }
                                        className="text-sm text-red-500 hover:text-red-700"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="mt-8 flex justify-between items-center border-t pt-6">
                        <h2 className="text-xl font-bold">
                            Total
                        </h2>

                        <h2 className="text-xl font-bold text-black">
                            ${total.toLocaleString("id-ID")}
                        </h2>
                    </div>
                </>
            )}
        </div>
    );
}

export default Keranjang;