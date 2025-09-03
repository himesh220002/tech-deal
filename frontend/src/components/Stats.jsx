export default function Stats() {
  const stats = [
    { value: "6K+", label: "Products Tracked" },
    { value: "₹12Cr+", label: "Savings Generated" },
    { value: "1M+", label: "Happy Users" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-40 py-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-[#1e293b] rounded-lg  text-center p-6 shadow"
        >
          <h3 className="text-3xl font-bold text-purple-400">{s.value}</h3>
          <p className="text-gray-300">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
