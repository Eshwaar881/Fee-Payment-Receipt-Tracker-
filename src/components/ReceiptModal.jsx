import React from 'react'
import { X, Printer } from 'lucide-react'
import { FeeTypeBadge } from './Badge'
import { totalFees } from '../data/seed'

export function ReceiptModal({ receipt, student, onClose }) {
  const total = student ? totalFees(student.fees) : null
  const balance = student ? total - student.paid : null

  function handlePrint() {
    window.print()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 16 }}>
      <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', width: 440, maxWidth: '100%', padding: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--mono)', letterSpacing: '.05em' }}>{receipt.id}</div>
            <h2 style={{ fontSize: 16, fontWeight: 600 }}>Payment receipt</h2>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4 }}>
            <X size={18} color="var(--text2)" />
          </button>
        </div>

        {/* School header */}
        <div style={{ textAlign: 'center', paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>School Management System</div>
          <div style={{ fontSize: 11, color: 'var(--text2)' }}>Fee Payment Receipt · AY 2025–26</div>
        </div>

        <div style={{ background: 'var(--surface2)', borderRadius: 'var(--radius)', padding: '14px 16px', marginBottom: 16 }}>
          {[
            ['Student', receipt.studentName],
            ['Roll no.', receipt.roll],
            ['Class', receipt.cls],
            ['Fee type', null, <FeeTypeBadge key="ft" type={receipt.feeType} />],
            ['Date', receipt.date],
            ['Payment mode', receipt.mode + (receipt.ref ? ` · ${receipt.ref}` : '')],
          ].map(([k, v, node]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
              <span style={{ color: 'var(--text2)' }}>{k}</span>
              {node || <span style={{ fontWeight: 500 }}>{v}</span>}
            </div>
          ))}

          {/* Amount paid */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
            <span style={{ color: 'var(--text2)' }}>Amount paid</span>
            <span style={{ fontWeight: 600, fontSize: 15, color: '#1a7a4a' }}>₹{receipt.amount.toLocaleString()}</span>
          </div>

          {balance !== null && balance > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', fontSize: 13 }}>
              <span style={{ color: '#c0392b' }}>Balance due</span>
              <span style={{ fontWeight: 500, color: '#c0392b' }}>₹{balance.toLocaleString()}</span>
            </div>
          )}
          {balance !== null && balance === 0 && (
            <div style={{ padding: '5px 0', textAlign: 'center', fontSize: 12, color: '#1a7a4a', fontWeight: 500 }}>
              ✓ Fees fully paid
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 18px', border: '1px solid var(--border2)', borderRadius: 8, background: 'transparent', color: 'var(--text)', fontSize: 13 }}>
            Close
          </button>
          <button onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 18px', border: 'none', borderRadius: 8, background: 'var(--text)', color: 'var(--surface)', fontSize: 13, fontWeight: 500 }}>
            <Printer size={14} /> Print receipt
          </button>
        </div>
      </div>
    </div>
  )
}
