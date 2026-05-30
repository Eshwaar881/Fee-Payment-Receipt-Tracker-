import React, { useState } from 'react'
import { useFeeStore } from './hooks/useFeeStore'
import { MetricCards } from './components/MetricCards'
import { PaymentModal } from './components/PaymentModal'
import { ReceiptModal } from './components/ReceiptModal'
import { StudentDetailModal } from './components/StudentDetailModal'
import { StudentsPage } from './pages/StudentsPage'
import { ReceiptsPage } from './pages/ReceiptsPage'
import { OverduePage } from './pages/OverduePage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { ACADEMIC_YEAR } from './data/seed'

const TABS = [
  { id: 'students', label: 'Students' },
  { id: 'receipts', label: 'Receipts' },
  { id: 'overdue', label: 'Overdue' },
  { id: 'analytics', label: 'Analytics' },
]

export default function App() {
  const { students, receipts, metrics, addPayment, updateStudent } = useFeeStore()
  const [tab, setTab] = useState('students')
  const [showPayment, setShowPayment] = useState(false)
  const [viewReceipt, setViewReceipt] = useState(null)
  const [viewStudent, setViewStudent] = useState(null)
  const [lastReceipt, setLastReceipt] = useState(null)

  function handleSavePayment(data) {
    const receipt = addPayment(data)
    setShowPayment(false)
    setLastReceipt(receipt)
    setViewReceipt(receipt)
  }

  const overdueCount = students.filter(s => s.status === 'Overdue').length

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 20px 40px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 600, lineHeight: 1 }}>Fee Tracker</h1>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}>{ACADEMIC_YEAR}</div>
        </div>
        <button onClick={() => setShowPayment(true)} style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px',
          border: 'none', borderRadius: 9, background: 'var(--text)', color: 'var(--surface)',
          fontSize: 13, fontWeight: 500, cursor: 'pointer'
        }}>
          + Record payment
        </button>
      </div>

      <MetricCards metrics={metrics} />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, background: 'var(--surface2)', borderRadius: 10, padding: 3, marginBottom: 16, width: 'fit-content' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '7px 16px', fontSize: 13, border: tab === t.id ? '1px solid var(--border)' : '1px solid transparent',
            borderRadius: 8, background: tab === t.id ? 'var(--surface)' : 'transparent',
            color: tab === t.id ? 'var(--text)' : 'var(--text2)', cursor: 'pointer',
            fontFamily: 'var(--font)', fontWeight: tab === t.id ? 500 : 400, transition: 'all .15s',
            position: 'relative'
          }}>
            {t.label}
            {t.id === 'overdue' && overdueCount > 0 && (
              <span style={{ marginLeft: 6, background: '#fdf0ef', color: '#c0392b', fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 10, verticalAlign: 'middle' }}>
                {overdueCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Pages */}
      {tab === 'students' && <StudentsPage students={students} onViewStudent={setViewStudent} />}
      {tab === 'receipts' && <ReceiptsPage receipts={receipts} onViewReceipt={r => { setViewReceipt(r) }} />}
      {tab === 'overdue' && <OverduePage students={students} />}
      {tab === 'analytics' && <AnalyticsPage students={students} receipts={receipts} />}

      {/* Modals */}
      {showPayment && (
        <PaymentModal students={students} onSave={handleSavePayment} onClose={() => setShowPayment(false)} />
      )}
      {viewReceipt && (
        <ReceiptModal
          receipt={viewReceipt}
          student={students.find(s => s.roll === viewReceipt.roll)}
          onClose={() => setViewReceipt(null)}
        />
      )}
      {viewStudent && (
        <StudentDetailModal
          student={viewStudent}
          receipts={receipts}
          onClose={() => setViewStudent(null)}
          onAddPayment={() => setShowPayment(true)}
        />
      )}
    </div>
  )
}
