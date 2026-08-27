export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center bg-black text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}