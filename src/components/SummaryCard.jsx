export default function SummaryCard({ title, value }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="text-2xl font-semibold mt-1">
        ₹{value.toLocaleString()}
      </p>
    </div>
  );
}
