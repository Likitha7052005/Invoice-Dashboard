import html2pdf from "html2pdf.js";

export const downloadInvoice = (invoiceId) => {
  const element = document.getElementById(`invoice-${invoiceId}`);

  const opt = {
    margin: 0.5,
    filename: `invoice-${invoiceId}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save();
};
