export default function Pagination({ page, setPage, total, size }) {
  const pages = Math.ceil(total / size);
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 gap-2">
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 rounded ${
            page === i + 1
              ? "bg-[var(--color-primary)]"
              : "bg-zinc-800"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
