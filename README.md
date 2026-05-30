# Fee Payment & Receipt Tracker

A production-ready React application for tracking school fee payments — admission, tuition, hostel, transport, and exam fees — with receipt generation, overdue alerts, and analytics dashboard.

## Features

- **Dashboard** — live metrics: total fees, collected, pending, overdue count
- **Students** — searchable/filterable table with fee breakdown per student
- **Receipts** — all payment transactions with receipt IDs, modes, and references
- **Overdue** — flags students past due date with days-late counter
- **Analytics** — charts for collection by class, status distribution, fee type breakdown
- **Record Payment** — form to log payments for existing or new students with auto-generated receipt
- **Student Detail** — full fee ledger, payment history, progress bar per student
- **Print Receipt** — browser print for any receipt

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| State | React hooks + localStorage |
| Charts | Recharts |
| Icons | Lucide React |
| Dates | date-fns |
| IDs | uuid |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:3000
```

## Build for Production

```bash
npm run build
# Output in /dist
```

## Project Structure

```
src/
├── components/
│   ├── Badge.jsx           # StatusBadge, FeeTypeBadge
│   ├── MetricCards.jsx     # Summary stat cards
│   ├── PaymentModal.jsx    # Record payment form
│   ├── ReceiptModal.jsx    # View/print receipt
│   └── StudentDetailModal.jsx  # Student fee ledger
├── pages/
│   ├── StudentsPage.jsx    # Students table
│   ├── ReceiptsPage.jsx    # Receipts table
│   ├── OverduePage.jsx     # Overdue alerts
│   └── AnalyticsPage.jsx   # Charts
├── hooks/
│   └── useFeeStore.js      # Central state with localStorage
├── data/
│   └── seed.js             # Sample data + helpers
├── styles/
│   └── index.css           # Global CSS variables
├── App.jsx                 # Root component + tab routing
└── main.jsx                # Entry point
```

## Fee Types Tracked

- Admission fee
- Tuition fee
- Hostel fee
- Transport fee
- Exam fee

## Payment Modes

Cash · UPI · NEFT · DD · Cheque

## Status Logic

| Status | Condition |
|--------|-----------|
| **Paid** | `paid >= total` |
| **Partial** | `paid > 0` and due date in future |
| **Pending** | `paid == 0` and due date in future |
| **Overdue** | `paid < total` and due date has passed |

## Roadmap (Backend Integration)

- [ ] Node.js / Express REST API
- [ ] PostgreSQL database (students, fee_structures, payments, receipts)
- [ ] JWT authentication with roles (Admin / Accountant / Parent / Student)
- [ ] Email/SMS reminders via SendGrid / Twilio
- [ ] PDF receipt generation (Puppeteer / pdfkit)
- [ ] File upload for DD scans (AWS S3)
- [ ] Multi-school / multi-branch support

## License

MIT
