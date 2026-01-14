import InvoiceRow from "./InvoiceRow";
import InvoicePDF from "./InvoicePDF";

export default function InvoiceTable({
  invoices,
  getStatus,
  getDaysText,
}) {
  return (
    <>
      {/* Hidden PDF Templates (OUTSIDE table) */}
      <div className="hidden">
        {invoices.map((inv) => (
          <InvoicePDF key={inv.id} invoice={inv} />
        ))}
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead className="text-zinc-400 text-sm">
            <tr>
              <th>Invoice</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Days</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => (
              <InvoiceRow
                key={inv.id}
                invoice={inv}
                getStatus={getStatus}
                getDaysText={getDaysText}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}


