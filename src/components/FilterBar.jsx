export default function FilterBar({ setFilter, setSearch, setSortKey, onAdd }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-5 flex justify-between items-center">
      <div className="flex gap-3">
        <select className="bg-zinc-800 p-2 rounded" onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>

        <input
          placeholder="Search invoice..."
          className="bg-zinc-800 p-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button
        onClick={onAdd}
        className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] px-4 py-2 rounded"
      >
        + Add Invoice
      </button>
    </div>
  );
}
