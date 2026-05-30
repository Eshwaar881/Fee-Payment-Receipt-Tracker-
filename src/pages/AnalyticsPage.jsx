import React from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { totalFees } from '../data/seed'

const COLORS = ['#1a7a4a', '#1a5fa8', '#9a5b00', '#5b4fcf', '#c0392b']
const STATUS_COLORS = { Paid: '#1a7a4a', Partial: '#9a5b00', Pending: '#1a5fa8', Overdue: '#c0392b' }

export function AnalyticsPage({ students, receipts }) {
  // Collection by class
  const byClass = {}
  students.forEach(s => {
    if (!byClass[s.cls]) byClass[s.cls] = { cls: s.cls, collected: 0, pending: 0 }
    const total = totalFees(s.fees)
    byClass[s.cls].collected += s.paid
    byClass[s.cls].pending += total - s.paid
  })
  const classData = Object.values(byClass).sort((a, b) => a.cls.localeCompare(b.cls))

  // Status distribution
  const statusCount = { Paid: 0, Partial: 0, Pending: 0, Overdue: 0 }
  students.forEach(s => { statusCount[s.status] = (statusCount[s.status] || 0) + 1 })
  const statusData = Object.entries(statusCount).map(([name, value]) => ({ name, value }))

  // Fee type collection
  const ftMap = {}
  receipts.forEach(r => {
    if (!ftMap[r.feeType]) ftMap[r.feeType] = 0
    ftMap[r.feeType] += r.amount
  })
  const ftData = Object.entries(ftMap).map(([name, value]) => ({ name, value }))

  const card = (title, children) => (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '16px 18px', boxShadow: 'var(--shadow)' }}>
      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 16, color: 'var(--text)' }}>{title}</div>
      {children}
    </div>
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {card('Collection by class (₹)', (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={classData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="cls" tick={{ fontSize: 11 }} tickFormatter={v => v.replace('Class ', 'Cl.')} />
            <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
            <Tooltip formatter={v => [`₹${v.toLocaleString()}`, '']} />
            <Bar dataKey="collected" name="Collected" fill="#1a7a4a" radius={[4,4,0,0]} />
            <Bar dataKey="pending" name="Pending" fill="#fde9c8" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      ))}

      {card('Status distribution', (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ResponsiveContainer width="60%" height={160}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                {statusData.map((e, i) => <Cell key={e.name} fill={STATUS_COLORS[e.name] || '#ccc'} />)}
              </Pie>
              <Tooltip formatter={v => [v, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ flex: 1 }}>
            {statusData.map(d => (
              <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text2)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLORS[d.name], flexShrink: 0 }} />
                  {d.name}
                </span>
                <span style={{ fontWeight: 600 }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {card('Amount collected by fee type (₹)', (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={ftData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} layout="vertical">
            <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={70} />
            <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Collected']} />
            <Bar dataKey="value" radius={[0,4,4,0]}>
              {ftData.map((e, i) => <Cell key={e.name} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ))}

      {card('Recent transactions', (
        <div>
          {receipts.slice(0, 6).map(r => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
              <div>
                <div style={{ fontWeight: 500 }}>{r.studentName}</div>
                <div style={{ color: 'var(--text3)', fontSize: 11 }}>{r.feeType} · {r.date}</div>
              </div>
              <div style={{ fontWeight: 600, color: '#1a7a4a', alignSelf: 'center' }}>₹{r.amount.toLocaleString()}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
