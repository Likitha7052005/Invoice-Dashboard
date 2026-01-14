export default function InvoicePDF({ invoice }) {
  return (
    <div
      id={`invoice-${invoice.id}`}
      style={{
        background: "#ffffff",
        color: "#000000",
        padding: "40px",
        width: "794px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
        INVOICE
      </h1>

      <p><b>Invoice No:</b> {invoice.id}</p>
      <p><b>Customer:</b> {invoice.customerName}</p>
      <p><b>Amount:</b> ₹{invoice.amount}</p>
      <p><b>Due Date:</b> {invoice.dueDate}</p>

      <hr style={{ margin: "20px 0" }} />

      <h3>Total: ₹{invoice.amount}</h3>

      <p style={{ marginTop: "60px" }}>
        Issued by <b>QistonPe</b>
      </p>
    </div>
  );
}

