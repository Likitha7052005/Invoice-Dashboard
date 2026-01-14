import { useEffect, useMemo, useState } from "react";
import {
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import SummaryCard from "./components/SummaryCard";
import FilterBar from "./components/FilterBar";
import InvoiceTable from "./components/InvoiceTable";
import Pagination from "./components/Pagination";
import AddInvoiceModal from "./components/AddInvoiceModal";

import { dummyInvoices } from "./data/dummyInvoices";

const PAGE_SIZE = 10;

export default function App() {
  const { user, isLoaded } = useUser();

  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const today = new Date();

  /* ---------------- LOAD DATA (AFTER CLERK LOADS) ---------------- */
  useEffect(() => {
    if (!isLoaded || !user) return;

    const key = `invoices_${user.id}`;
    const saved = localStorage.getItem(key);

    setInvoices(saved ? JSON.parse(saved) : dummyInvoices);
  }, [isLoaded, user]);

  /* ---------------- SAVE DATA (USER SCOPED) ---------------- */
  useEffect(() => {
    if (!user) return;

    const key = `invoices_${user.id}`;
    localStorage.setItem(key, JSON.stringify(invoices));
  }, [invoices, user]);

  /* ---------------- HELPERS ---------------- */
  const getStatus = (inv) => {
    if (inv.paymentDate) return "paid";
    if (new Date(inv.dueDate) < today) return "overdue";
    return "pending";
  };

  const getDaysText = (inv) => {
    const due = new Date(inv.dueDate);

    if (inv.paymentDate) {
      const diff = Math.round(
        (new Date(inv.paymentDate) - due) / (1000 * 60 * 60 * 24)
      );
      return diff > 0
        ? `Paid ${diff} days late`
        : `Paid ${Math.abs(diff)} days early`;
    }

    const diff = Math.round(
      (due - today) / (1000 * 60 * 60 * 24)
    );

    return diff >= 0
      ? `Due in ${diff} days`
      : `Overdue by ${Math.abs(diff)} days`;
  };

  /* ---------------- FILTER + SEARCH ---------------- */
  const filtered = useMemo(() => {
    return invoices.filter(
      (inv) =>
        (filter === "all" || getStatus(inv) === filter) &&
        (inv.customerName.toLowerCase().includes(search.toLowerCase()) ||
          inv.id.toLowerCase().includes(search.toLowerCase()))
    );
  }, [invoices, filter, search]);

  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ---------------- SUMMARY ---------------- */
  const summary = useMemo(() => {
    let outstanding = 0;
    let overdue = 0;
    let paidThisMonth = 0;
    let delaySum = 0;
    let paidCount = 0;

    invoices.forEach((inv) => {
      const status = getStatus(inv);

      if (status !== "paid") outstanding += inv.amount;
      if (status === "overdue") overdue += inv.amount;

      if (inv.paymentDate) {
        const paymentDate = new Date(inv.paymentDate);

        if (
          paymentDate.getMonth() === today.getMonth() &&
          paymentDate.getFullYear() === today.getFullYear()
        ) {
          paidThisMonth += inv.amount;
        }

        delaySum +=
          (paymentDate - new Date(inv.dueDate)) /
          (1000 * 60 * 60 * 24);

        paidCount++;
      }
    });

    return {
      outstanding,
      overdue,
      paidThisMonth,
      avgDelay: paidCount ? Math.round(delaySum / paidCount) : 0,
    };
  }, [invoices]);

  /* ---------------- LOADING STATE ---------------- */
  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center text-zinc-400">
        Loading dashboard...
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <>
      <Navbar />

      {/* ---------- LOGGED OUT ---------- */}
      <SignedOut>
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Invoice Dashboard
          </h1>

          <p className="text-zinc-400 max-w-xl mb-6">
            Track invoices, monitor overdue payments, analyze delays,
            and manage customer billing — all in one place.
          </p>

          <p className="text-sm text-zinc-500">
            Please sign in using the login button above
          </p>
        </div>
      </SignedOut>

      {/* ---------- LOGGED IN ---------- */}
      <SignedIn>
        <div className="pt-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <SummaryCard title="Outstanding" value={summary.outstanding} />
            <SummaryCard title="Overdue" value={summary.overdue} />
            <SummaryCard title="Paid This Month" value={summary.paidThisMonth} />
            <SummaryCard title="Avg Delay (Days)" value={summary.avgDelay} />
          </div>

          <FilterBar
            setFilter={setFilter}
            setSearch={setSearch}
            onAdd={() => setShowModal(true)}
          />

          <InvoiceTable
            invoices={paginated}
            getStatus={getStatus}
            getDaysText={getDaysText}
            setInvoices={setInvoices}
          />

          <Pagination
            page={page}
            setPage={setPage}
            total={filtered.length}
            size={PAGE_SIZE}
          />

          {showModal && (
            <AddInvoiceModal
              setInvoices={setInvoices}
              onClose={() => setShowModal(false)}
            />
          )}
        </div>
      </SignedIn>
    </>
  );
}


