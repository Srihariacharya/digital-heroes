export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 rounded-xl bg-primary hover:scale-105 transition transform duration-200 shadow-lg"
    >
      {children}
    </button>
  );
}