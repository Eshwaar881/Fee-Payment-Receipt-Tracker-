import React from 'react'

const STATUS_STYLES = {
  Paid:    { bg: '#eaf5ef', color: '#1a7a4a', dot: '#2ecc71' },
  Partial: { bg: '#fff4e0', color: '#9a5b00', dot: '#f0a500' },
  Pending: { bg: '#eef4fc', color: '#1a5fa8', dot: '#3b82f6' },
  Overdue: { bg: '#fdf0ef', color: '#c0392b', dot: '#e74c3c' },
}

export function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Pending
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 500,
      background: style.bg, color: style.color
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: style.dot, flexShrink: 0 }} />
      {status}
    </span>
  )
}

export function FeeTypeBadge({ type }) {
  const colors = {
    Admission: ['#f0eeff', '#5b4fcf'],
    Tuition:   ['#eef4fc', '#1a5fa8'],
    Hostel:    ['#edf7f2', '#1a7a4a'],
    Transport: ['#fff4e0', '#9a5b00'],
    Exam:      ['#fdf0ef', '#c0392b'],
  }
  const [bg, color] = colors[type] || ['#f1f0eb', '#6b6965']
  return (
    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 500, background: bg, color }}>
      {type}
    </span>
  )
}
