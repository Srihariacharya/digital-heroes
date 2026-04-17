export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-lg">
      <h1 className="text-xl font-bold text-primary">
        Digital Heroes
      </h1>

      <div className="flex gap-4">
        <a href="/dashboard">Dashboard</a>
        <a href="/charities">Charities</a>
      </div>
    </div>
  );
}