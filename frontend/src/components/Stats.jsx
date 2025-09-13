export default function Stats() {
  const stats = [
    { value: "6K+", label: "Products Tracked" },
    { value: "₹12Cr+", label: "Savings Generated" },
    { value: "1M+", label: "Happy Users" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-10 lg:px-40 py-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-[#1e293b] rounded-lg text-center p-6 shadow"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-purple-400">
            {s.value}
          </h3>
          <p className="text-sm md:text-base text-gray-300">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
