import { v4 as uuidv4 } from 'uuid'
import { subDays, addDays, format } from 'date-fns'

const today = new Date()
const f = d => format(d, 'yyyy-MM-dd')

export const FEE_TYPES = ['Admission', 'Tuition', 'Hostel', 'Transport', 'Exam']
export const CLASSES = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10']
export const PAYMENT_MODES = ['Cash', 'UPI', 'NEFT', 'DD', 'Cheque']

export const ACADEMIC_YEAR = 'AY 2025–26'

export const initialStudents = [
  {
    id: uuidv4(), name: 'Arjun Sharma', roll: '2025-001', cls: 'Class 9',
    parent: 'Ramesh Sharma', phone: '9876543210', email: 'ramesh@example.com',
    fees: { Admission: 5000, Tuition: 48000, Hostel: 36000, Transport: 8000, Exam: 2000 },
    paid: 75000, dueDate: f(addDays(today, 12)), status: 'Partial'
  },
  {
    id: uuidv4(), name: 'Priya Reddy', roll: '2025-002', cls: 'Class 10',
    parent: 'Suresh Reddy', phone: '9812345678', email: 'suresh@example.com',
    fees: { Admission: 5000, Tuition: 52000, Hostel: 0, Transport: 8000, Exam: 2000 },
    paid: 50000, dueDate: f(subDays(today, 5)), status: 'Overdue'
  },
  {
    id: uuidv4(), name: 'Karan Mehta', roll: '2025-003', cls: 'Class 8',
    parent: 'Vijay Mehta', phone: '9901234567', email: 'vijay@example.com',
    fees: { Admission: 5000, Tuition: 44000, Hostel: 36000, Transport: 0, Exam: 2000 },
    paid: 87000, dueDate: f(addDays(today, 30)), status: 'Paid'
  },
  {
    id: uuidv4(), name: 'Sneha Iyer', roll: '2025-004', cls: 'Class 7',
    parent: 'Mohan Iyer', phone: '9834567890', email: 'mohan@example.com',
    fees: { Admission: 5000, Tuition: 40000, Hostel: 0, Transport: 8000, Exam: 2000 },
    paid: 0, dueDate: f(subDays(today, 15)), status: 'Overdue'
  },
  {
    id: uuidv4(), name: 'Ravi Patel', roll: '2025-005', cls: 'Class 6',
    parent: 'Dinesh Patel', phone: '9856789012', email: 'dinesh@example.com',
    fees: { Admission: 5000, Tuition: 38000, Hostel: 36000, Transport: 8000, Exam: 2000 },
    paid: 89000, dueDate: f(addDays(today, 20)), status: 'Paid'
  },
  {
    id: uuidv4(), name: 'Ananya Singh', roll: '2025-006', cls: 'Class 9',
    parent: 'Rakesh Singh', phone: '9823456789', email: 'rakesh@example.com',
    fees: { Admission: 5000, Tuition: 48000, Hostel: 36000, Transport: 0, Exam: 2000 },
    paid: 45000, dueDate: f(addDays(today, 3)), status: 'Partial'
  },
]

export const initialReceipts = [
  { id: 'RCP-0001', studentName: 'Arjun Sharma', roll: '2025-001', feeType: 'Tuition', amount: 25000, date: f(subDays(today, 30)), mode: 'NEFT', ref: 'TXN82910', cls: 'Class 9' },
  { id: 'RCP-0002', studentName: 'Arjun Sharma', roll: '2025-001', feeType: 'Hostel', amount: 18000, date: f(subDays(today, 28)), mode: 'UPI', ref: 'UPI7731', cls: 'Class 9' },
  { id: 'RCP-0003', studentName: 'Priya Reddy', roll: '2025-002', feeType: 'Tuition', amount: 50000, date: f(subDays(today, 45)), mode: 'Cheque', ref: 'CHQ-441', cls: 'Class 10' },
  { id: 'RCP-0004', studentName: 'Karan Mehta', roll: '2025-003', feeType: 'Admission', amount: 5000, date: f(subDays(today, 60)), mode: 'Cash', ref: '', cls: 'Class 8' },
  { id: 'RCP-0005', studentName: 'Ravi Patel', roll: '2025-005', feeType: 'Hostel', amount: 36000, date: f(subDays(today, 20)), mode: 'NEFT', ref: 'TXN99021', cls: 'Class 6' },
  { id: 'RCP-0006', studentName: 'Ananya Singh', roll: '2025-006', feeType: 'Tuition', amount: 45000, date: f(subDays(today, 10)), mode: 'UPI', ref: 'UPI3302', cls: 'Class 9' },
]

export function totalFees(fees) {
  return Object.values(fees).reduce((a, v) => a + v, 0)
}

export function deriveStatus(paid, total, dueDate) {
  if (paid >= total) return 'Paid'
  const due = new Date(dueDate)
  const now = new Date()
  if (due < now) return 'Overdue'
  return paid > 0 ? 'Partial' : 'Pending'
}
