import React, { useState } from 'react'
import { Search, Eye, ChevronDown } from 'lucide-react'
import { StatusBadge } from '../components/Badge'
import { totalFees, CLASSES } from '../data/seed'

export function StudentsPage({ students, onViewStudent }) {
  const [search, setSearch] = useState('')
  const [filterCls, setFilterCls] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const filtered = students.filter(s => {
    if (filterCls && s.cls !== filterCls) return false
    if (filterStatus && s.status !== filterStatus) return false
    const q = search.toLowerCase()
    return !q || s.name.toLowerCase().includes(q) || s.roll.includes(q)
  })

  const inp = { height: 34, border: '1px solid var(--border2)', borderRadius: 8, padding: '0 10px', fontSize: 13, background: 'var(--surface)', color: 'var(--text)', fontFamily: 'var(--font)', outline: 'none' }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
          <Search size={13} color="var(--text3)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or roll no…" style={{ ...inp, width: '100%', paddingLeft: 30 }} />
        </div>
        <select value={filterCls} onChange={e => setFilterCls(e.target.value)} style={inp}>
          <option value="">All classes</option>
          {CLASSES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={inp}>
          <option value="">All status</option>
          {['Paid', 'Partial', 'Pending', 'Overdue'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--surface2)' }}>
                {['Student', 'Class', 'Total fees', 'Paid', 'Pending', 'Due date', 'Status', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 500, color: 'var(--text2)', borderBottom: '1px solid var(--border)', textTransform: 'uppercase', letterSpacing: '.04em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', padding: 40, color: 'var(--text3)' }}>No students found</td></tr>
              ) : filtered.map(s => {
                const total = totalFees(s.fees)
                const pending = total - s.paid
                return (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ fontWeight: 500 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>{s.roll}</div>
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--text2)' }}>{s.cls}</td>
                    <td style={{ padding: '10px 14px' }}>₹{total.toLocaleString()}</td>
                    <td style={{ padding: '10px 14px', color: '#1a7a4a', fontWeight: 500 }}>₹{s.paid.toLocaleString()}</td>
                    <td style={{ padding: '10px 14px', color: pending > 0 ? '#c0392b' : '#1a7a4a', fontWeight: pending > 0 ? 500 : 400 }}>₹{pending.toLocaleString()}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text2)', fontSize: 12 }}>{s.dueDate}</td>
                    <td style={{ padding: '10px 14px' }}><StatusBadge status={s.status} /></td>
                    <td style={{ padding: '10px 14px' }}>
                      <button onClick={() => onViewStudent(s)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', border: '1px solid var(--border2)', borderRadius: 7, background: 'transparent', fontSize: 11, color: 'var(--text2)', cursor: 'pointer' }}>
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '10px 14px', fontSize: 11, color: 'var(--text3)', borderTop: '1px solid var(--border)' }}>
          Showing {filtered.length} of {students.length} students
        </div>
      </div>
    </div>
  )
}
