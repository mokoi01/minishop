# MiniShop

MiniShop adalah proyek e-commerce sederhana berbasis React + Vite yang memungkinkan pengguna melihat produk, mencari berdasarkan nama, memfilter berdasarkan kategori, melihat detail produk, serta menambahkan produk ke keranjang belanja.

## Fitur

- Tampilan katalog produk dengan data dari API Fake Store
- Pencarian produk berdasarkan nama
- Filter produk berdasarkan kategori
- Pagination untuk daftar produk
- Halaman detail produk
- Keranjang belanja dengan fitur tambah, hapus, dan ubah jumlah item
- Autentikasi dasar login dan register menggunakan localStorage
- Route proteksi untuk halaman keranjang agar hanya user yang sudah login yang bisa mengakses
- Lazy loading untuk halaman keranjang agar performa lebih optimal
- Desain responsif menggunakan Tailwind CSS

## Teknologi yang Digunakan

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Vitest + Testing Library untuk testing

## Prasyarat

Sebelum memulai, pastikan perangkat Anda sudah memiliki:

- Node.js v18+
- npm atau pnpm

## Instalasi

1. Clone repository ini:

   ```bash
   git clone <url-repository>
   cd minishop
   ```

2. Install dependency:

   ```bash
   npm install
   ```

3. Jalankan aplikasi di mode development:

   ```bash
   npm run dev
   ```

4. Buka browser dan akses URL yang ditampilkan oleh Vite, biasanya:

   ```bash
   http://localhost:5173
   ```

## Script yang Tersedia

```bash
npm run dev     # menjalankan aplikasi di mode development
npm run build   # build untuk production
npm run preview # preview hasil build
npm run test    # menjalankan test
npm run lint    # menjalankan ESLint
```

## Struktur Folder Proyek

```text
minishop/
├── public/                  # file statis seperti asset publik
├── src/                    # source code aplikasi
│   ├── components/         # komponen UI reusable
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   ├── ProdukCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/            # konteks untuk auth dan keranjang
│   │   ├── AuthContext.jsx
│   │   ├── KeranjangContext.jsx
│   │   └── KeranjangContext.test.jsx
│   ├── data/               # data statis / mock data
│   │   └── produk.js
│   ├── hooks/              # custom hooks
│   │   └── useLocalStorage.js
│   ├── pages/              # halaman aplikasi
│   │   ├── DetailProduk.jsx
│   │   ├── Home.jsx
│   │   ├── Keranjang.jsx
│   │   ├── Login.jsx
│   │   ├── Login.test.jsx
│   │   └── Register.jsx
│   ├── App.jsx             # konfigurasi routing utama
│   ├── App.css             # styling aplikasi
│   ├── index.css           # css global
│   ├── main.jsx            # entry point aplikasi
│   └── setupTests.js       # setup testing
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Flow Aplikasi

1. User membuka halaman home dan melihat daftar produk.
2. User dapat mencari atau memfilter produk.
3. User memilih produk untuk melihat detail.
4. Jika user ingin membeli, produk ditambahkan ke keranjang.
5. User perlu login sebelum mengakses halaman keranjang.
6. Setelah login, user dapat mengubah jumlah produk atau menghapus item dari keranjang.

## Catatan

Proyek ini masih menggunakan pendekatan sederhana untuk autentikasi dan penyimpanan data lokal. Untuk kebutuhan production, disarankan mengganti mekanisme login dan data cart ke backend/API yang lebih aman.

## Kontribusi

Jika Anda ingin berkontribusi, silakan fork repository, buat branch baru, lalu kirim pull request.
