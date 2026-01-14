import { useState } from "react";

export default function AddInvoiceModal({ setInvoices, onClose }) {
  const [form, setForm] = useState({
    customerName: "",
    amount: "",
    invoiceDate: "",
    paymentTerms: 30,
  });

  const submit = () => {
    if (!form.customerName || !form.amount || !form.invoiceDate) return;

    const due = new Date(form.invoiceDate);
    due.setDate(due.getDate() + Number(form.paymentTerms));

    setInvoices((prev) => [
      ...prev,
      {
        id: `INV-${Date.now()}`,
        ...form,
        amount: Number(form.amount),
        dueDate: due.toISOString().split("T")[0],
        paymentDate: null,
      },
    ]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl w-96">
        <h2 className="text-lg font-semibold mb-4">Add Invoice</h2>

        <input
          className="w-full bg-zinc-800 p-2 rounded mb-2"
          placeholder="Customer Name"
          onChange={(e) =>
            setForm({ ...form, customerName: e.target.value })
          }
        />
        <input
          type="number"
          className="w-full bg-zinc-800 p-2 rounded mb-2"
          placeholder="Amount"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <input
          type="date"
          className="w-full bg-zinc-800 p-2 rounded mb-2"
          onChange={(e) =>
            setForm({ ...form, invoiceDate: e.target.value })
          }
        />

        <select
          className="w-full bg-zinc-800 p-2 rounded mb-4"
          onChange={(e) =>
            setForm({ ...form, paymentTerms: e.target.value })
          }
        >
          {[7, 15, 30, 45, 60].map((d) => (
            <option key={d}>{d} days</option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-zinc-400">
            Cancel
          </button>
          <button
            onClick={submit}
            className="bg-[var(--color-primary)] px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
