import { downloadInvoice } from "../utils/downloadInvoice";

export default function InvoiceRow({
  invoice,
  getStatus,
  getDaysText,
}) {
  return (
    <tr className="bg-zinc-900 rounded-lg">
      <td className="p-3">{invoice.id}</td>
      <td className="p-3">{invoice.customerName}</td>
      <td className="p-3">₹{invoice.amount}</td>

      <td className="p-3">
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            getStatus(invoice) === "paid"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {getStatus(invoice)}
        </span>
      </td>

      <td className="p-3 text-zinc-400">
        {getDaysText(invoice)}
      </td>

      <td className="p-3">
        <button
          onClick={() => downloadInvoice(invoice.id)}
          className="px-3 py-1 bg-primary rounded text-sm hover:bg-primary-dull"
        >
          Download
        </button>
      </td>
    </tr>
  );
}

