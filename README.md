# 🚀 Invoice Dashboard

A modern, responsive **Invoice Management Dashboard** designed to manage invoices efficiently with a clean UI, authentication, filtering, and PDF export functionality.

Built as a **frontend-focused project** to demonstrate real-world UI logic, state management, and user experience.

---

## 🌐 Live Demo

🔗 **Live Application**  
https://invoice-dashboard.vercel.app  

🔗 **GitHub Repository**  
https://github.com/Likitha7052005/Invoice-Dashboard  

---

## ✨ Key Features

### 🔐 Authentication
- Secure **Sign In / Sign Up** using **Clerk**
- Protected dashboard access
- User session handling

### 📊 Invoice Summary
- Outstanding amount
- Overdue invoices
- Paid invoices (monthly view)
- Average delay calculation

### 🧾 Invoice Management
- Add new invoices
- Automatic status detection:
  - **Paid**
  - **Pending**
  - **Overdue**
- Dynamic due date calculations

### 🔍 Search & Filter
- Filter invoices by status
- Search by invoice ID or customer name
- Pagination for better usability

### 📥 Invoice PDF Download
- Download individual invoices as **PDF**
- Clean invoice layout suitable for real-world usage

### 💾 Data Persistence
- Invoice data stored in **browser localStorage**
- Data remains available on page refresh for the same user session

### 🎨 UI & UX
- Dark-mode inspired modern UI
- Fully responsive design
- Styled using **Tailwind CSS**

---

## 🛠 Tech Stack

| Technology | Purpose |
|----------|--------|
| React (Vite) | Frontend framework |
| Tailwind CSS | Styling |
| Clerk | Authentication |
| html2pdf.js | Invoice PDF generation |
| localStorage | Data persistence |
| Vercel | Deployment |

---


## Notes
- This is a frontend-only project.
- No backend, APIs, or database are used.
- Invoice data is stored locally in the browser for demonstration purposes.
