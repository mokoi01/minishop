import { Link } from "react-router-dom";

function Header() {
  return (
<header className="fixed top-0 left-0 z-50 w-full border-b bg-black backdrop-blur-md shadow-xl">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
    
    {/* Title / Logo Unik Ungu */}
    <Link to="/">
      <h1 className="text-2xl font-black tracking-tight drop-shadow-[0_0_12px_rgba(168,85,247,0.25)]">
        <span className="bg-white bg-clip-text text-transparent">
          Mini
        </span>
        <span className="text-purple-100">
          shop
        </span>
      </h1>
    </Link>

    {/* Navigation */}
    <nav className="flex items-center gap-6 text-sm font-semibold">
      <Link
        to="/"
        className="text-zinc-300 transition-colors hover:text-gray-500"
      >
        Beranda
      </Link>

      <Link
        to="/keranjang"
        className="text-zinc-300 transition-colors hover:text-gray-500"
      >
        Keranjang
      </Link>

      <Link
        to="/login"
        className="text-zinc-300 transition-colors hover:text-gray-500"
      >
        Login
      </Link>
    </nav>

  </div>
</header>
  );
}

export default Header;