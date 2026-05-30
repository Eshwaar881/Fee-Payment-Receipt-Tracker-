import { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import { initialStudents, initialReceipts, totalFees, deriveStatus } from '../data/seed'

const STORAGE_KEY_STUDENTS = 'fpt_students'
const STORAGE_KEY_RECEIPTS = 'fpt_receipts'
const STORAGE_KEY_COUNTER = 'fpt_counter'

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export function useFeeStore() {
  const [students, setStudents] = useState(() => load(STORAGE_KEY_STUDENTS, initialStudents))
  const [receipts, setReceipts] = useState(() => load(STORAGE_KEY_RECEIPTS, initialReceipts))
  const [counter, setCounter] = useState(() => load(STORAGE_KEY_COUNTER, 7))

  const nextReceiptId = () => {
    const id = `RCP-${String(counter).padStart(4, '0')}`
    const next = counter + 1
    setCounter(next)
    save(STORAGE_KEY_COUNTER, next)
    return id
  }

  const addPayment = useCallback(({ studentId, newStudent, feeType, amount, date, dueDate, mode, ref }) => {
    const receiptId = nextReceiptId()
    let studentRecord

    if (newStudent) {
      studentRecord = {
        id: uuidv4(),
        name: newStudent.name,
        roll: newStudent.roll,
        cls: newStudent.cls,
        parent: newStudent.parent || '',
        phone: newStudent.phone || '',
        email: newStudent.email || '',
        fees: newStudent.fees,
        paid: amount,
        dueDate,
        status: deriveStatus(amount, totalFees(newStudent.fees), dueDate)
      }
      const updated = [studentRecord, ...students]
      setStudents(updated)
      save(STORAGE_KEY_STUDENTS, updated)
    } else {
      const updated = students.map(s => {
        if (s.id !== studentId) return s
        const newPaid = s.paid + amount
        return { ...s, paid: newPaid, dueDate, status: deriveStatus(newPaid, totalFees(s.fees), dueDate) }
      })
      setStudents(updated)
      save(STORAGE_KEY_STUDENTS, updated)
      studentRecord = students.find(s => s.id === studentId)
    }

    const receipt = {
      id: receiptId,
      studentName: studentRecord.name,
      roll: studentRecord.roll,
      cls: studentRecord.cls,
      feeType,
      amount,
      date: date || format(new Date(), 'yyyy-MM-dd'),
      mode,
      ref
    }
    const updatedR = [receipt, ...receipts]
    setReceipts(updatedR)
    save(STORAGE_KEY_RECEIPTS, updatedR)

    return receipt
  }, [students, receipts, counter])

  const updateStudent = useCallback((id, changes) => {
    const updated = students.map(s => s.id === id ? { ...s, ...changes } : s)
    setStudents(updated)
    save(STORAGE_KEY_STUDENTS, updated)
  }, [students])

  const deleteStudent = useCallback((id) => {
    const updated = students.filter(s => s.id !== id)
    setStudents(updated)
    save(STORAGE_KEY_STUDENTS, updated)
  }, [students])

  const metrics = (() => {
    const total = students.reduce((a, s) => a + totalFees(s.fees), 0)
    const paid = students.reduce((a, s) => a + s.paid, 0)
    const overdue = students.filter(s => s.status === 'Overdue').length
    const partial = students.filter(s => s.status === 'Partial').length
    return { total, paid, pending: total - paid, overdue, partial, studentCount: students.length }
  })()

  return { students, receipts, metrics, addPayment, updateStudent, deleteStudent }
}
