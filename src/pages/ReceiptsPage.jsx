import React, { useState } from 'react'
import { Search, Receipt } from 'lucide-react'
import { FeeTypeBadge } from '../components/Badge'
import { FEE_TYPES } from '../data/seed'

export function ReceiptsPage({ receipts, onViewReceipt }) {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('')

  const filtered = receipts.filter(r => {
    if (filterType && r.feeType !== filterType) return false
    const q = search.toLowerCase()
    return !q || r.studentName.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.roll.includes(q)
  })

  const inp = { height: 34, border: '1px solid var(--border2)', borderRadius: 8, padding: '0 10px', fontSize: 13, background: 'var(--surface)', color: 'var(--text)', fontFamily: 'var(--font)', outline: 'none' }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
          <Search size={13} color="var(--text3)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by student or receipt no…" style={{ ...inp, width: '100%', paddingLeft: 30 }} />
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={inp}>
          <option value="">All fee types</option>
          {FEE_TYPES.map(f => <option key={f}>{f}</option>)}
        </select>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--surface2)' }}>
                {['Receipt no.', 'Student', 'Class', 'Fee type', 'Amount', 'Date', 'Mode', 'Ref', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 500, color: 'var(--text2)', borderBottom: '1px solid var(--border)', textTransform: 'uppercase', letterSpacing: '.04em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: 40, color: 'var(--text3)' }}>No receipts found</td></tr>
              ) : filtered.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'} onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text2)' }}>{r.id}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ fontWeight: 500 }}>{r.studentName}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>{r.roll}</div>
                  </td>
                  <td style={{ padding: '10px 14px', color: 'var(--text2)' }}>{r.cls}</td>
                  <td style={{ padding: '10px 14px' }}><FeeTypeBadge type={r.feeType} /></td>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#1a7a4a' }}>₹{r.amount.toLocaleString()}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--text2)', fontSize: 12 }}>{r.date}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--text2)' }}>{r.mode}</td>
                  <td style={{ padding: '10px 14px', fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text3)' }}>{r.ref || '—'}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <button onClick={() => onViewReceipt(r)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', border: '1px solid var(--border2)', borderRadius: 7, background: 'transparent', fontSize: 11, color: 'var(--text2)', cursor: 'pointer' }}>
                      <Receipt size={12} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '10px 14px', fontSize: 11, color: 'var(--text3)', borderTop: '1px solid var(--border)' }}>
          {filtered.length} receipt{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}
