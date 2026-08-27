export default function Badge({ children }) {
  return (
    <span className="bg-gray-600 text-white px-3 py-1.5 rounded-full text-xm">
      {children}
    </span>
  );
}