import React from 'react'
import { Users, IndianRupee, Clock, AlertTriangle, TrendingUp } from 'lucide-react'

function fmt(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`
  return `₹${n}`
}

function pct(a, b) {
  if (!b) return 0
  return Math.round((a / b) * 100)
}

export function MetricCards({ metrics }) {
  const cards = [
    { label: 'Total students', value: metrics.studentCount, icon: Users, color: '#1a5fa8', bg: '#eef4fc' },
    { label: 'Total fees', value: fmt(metrics.total), icon: IndianRupee, color: '#1a7a4a', bg: '#eaf5ef' },
    { label: 'Collected', value: fmt(metrics.paid), sub: `${pct(metrics.paid, metrics.total)}% of total`, icon: TrendingUp, color: '#1a7a4a', bg: '#eaf5ef' },
    { label: 'Pending', value: fmt(metrics.pending), icon: Clock, color: '#9a5b00', bg: '#fff4e0' },
    { label: 'Overdue', value: `${metrics.overdue} students`, icon: AlertTriangle, color: '#c0392b', bg: '#fdf0ef' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 20 }}>
      {cards.map(c => (
        <div key={c.label} style={{
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
          padding: '14px 16px', boxShadow: 'var(--shadow)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: 'var(--text2)', fontWeight: 500, letterSpacing: '.03em', textTransform: 'uppercase' }}>{c.label}</span>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <c.icon size={14} color={c.color} />
            </span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)', lineHeight: 1 }}>{c.value}</div>
          {c.sub && <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>{c.sub}</div>}
        </div>
      ))}
    </div>
  )
}
