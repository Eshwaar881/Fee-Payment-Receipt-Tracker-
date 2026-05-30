import React from 'react'
import { AlertTriangle, Bell } from 'lucide-react'
import { totalFees } from '../data/seed'
import { differenceInDays } from 'date-fns'

export function OverduePage({ students }) {
  const today = new Date()
  const rows = students
    .map(s => {
      const pending = totalFees(s.fees) - s.paid
      if (pending <= 0) return null
      const due = new Date(s.dueDate)
      const daysLate = differenceInDays(today, due)
      return { ...s, pending, daysLate }
    })
    .filter(Boolean)
    .sort((a, b) => b.daysLate - a.daysLate)

  if (rows.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text3)' }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
        <div style={{ fontWeight: 500 }}>No pending dues!</div>
        <div style={{ fontSize: 12, marginTop: 4 }}>All fee payments are up to date.</div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, padding: '10px 14px', background: '#fff4e0', border: '1px solid #f0d080', borderRadius: 10, fontSize: 13, color: '#9a5b00' }}>
        <AlertTriangle size={14} />
        <span>{rows.filter(r => r.daysLate > 0).length} students have overdue fees. Send reminders to avoid escalation.</span>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--surface2)' }}>
                {['Student', 'Class', 'Pending amount', 'Due date', 'Days overdue', 'Action'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 500, color: 'var(--text2)', borderBottom: '1px solid var(--border)', textTransform: 'uppercase', letterSpacing: '.04em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ fontWeight: 500 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>{r.roll}</div>
                    {r.parent && <div style={{ fontSize: 11, color: 'var(--text3)' }}>Parent: {r.parent}</div>}
                  </td>
                  <td style={{ padding: '10px 14px', color: 'var(--text2)' }}>{r.cls}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#c0392b', fontSize: 14 }}>₹{r.pending.toLocaleString()}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--text2)', fontSize: 12 }}>{r.dueDate}</td>
                  <td style={{ padding: '10px 14px' }}>
                    {r.daysLate > 0
                      ? <span style={{ color: '#c0392b', fontWeight: 600 }}>+{r.daysLate} days</span>
                      : <span style={{ color: '#1a7a4a' }}>In {-r.daysLate} days</span>}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', border: '1px solid #f0d080', borderRadius: 7, background: '#fffbf0', fontSize: 11, color: '#9a5b00', cursor: 'pointer' }}>
                      <Bell size={12} /> Send reminder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '10px 14px', fontSize: 11, color: 'var(--text3)', borderTop: '1px solid var(--border)' }}>
          Total pending: ₹{rows.reduce((a, r) => a + r.pending, 0).toLocaleString()}
        </div>
      </div>
    </div>
  )
}
