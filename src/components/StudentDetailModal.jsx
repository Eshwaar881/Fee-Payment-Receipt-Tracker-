import React from 'react'
import { X, Phone, Mail, User } from 'lucide-react'
import { StatusBadge, FeeTypeBadge } from './Badge'
import { totalFees, FEE_TYPES } from '../data/seed'

export function StudentDetailModal({ student, receipts, onClose, onAddPayment }) {
  const total = totalFees(student.fees)
  const pending = total - student.paid
  const pct = Math.round((student.paid / total) * 100)
  const studentReceipts = receipts.filter(r => r.roll === student.roll)

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 16 }}>
      <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', width: 540, maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto', padding: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 600 }}>{student.name}</h2>
            <div style={{ fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--mono)', marginTop: 2 }}>{student.roll} · {student.cls}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <StatusBadge status={student.status} />
            <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4 }}>
              <X size={18} color="var(--text2)" />
            </button>
          </div>
        </div>

        {/* Contact */}
        {(student.parent || student.phone || student.email) && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            {student.parent && <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text2)' }}><User size={12} />{student.parent}</span>}
            {student.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text2)' }}><Phone size={12} />{student.phone}</span>}
            {student.email && <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text2)' }}><Mail size={12} />{student.email}</span>}
          </div>
        )}

        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
          {[['Total fees', `₹${total.toLocaleString()}`, 'var(--text)'], ['Paid', `₹${student.paid.toLocaleString()}`, '#1a7a4a'], ['Pending', `₹${pending.toLocaleString()}`, pending > 0 ? '#c0392b' : '#1a7a4a']].map(([l,v,c]) => (
            <div key={l} style={{ background: 'var(--surface2)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 4 }}>{l}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: c }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>
            <span>Payment progress</span><span>{pct}% paid</span>
          </div>
          <div style={{ height: 8, background: 'var(--surface2)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: pct === 100 ? '#1a7a4a' : pct > 50 ? '#f0a500' : '#e74c3c', borderRadius: 4, transition: 'width .4s' }} />
          </div>
        </div>

        {/* Fee breakdown */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>Fee breakdown</div>
          <div style={{ background: 'var(--surface2)', borderRadius: 10, overflow: 'hidden' }}>
            {FEE_TYPES.filter(ft => student.fees[ft] > 0).map(ft => (
              <div key={ft} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <FeeTypeBadge type={ft} />
                <span style={{ fontWeight: 500 }}>₹{student.fees[ft].toLocaleString()}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', fontSize: 13, fontWeight: 600 }}>
              <span>Total</span><span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment history */}
        {studentReceipts.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text2)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.04em' }}>Payment history ({studentReceipts.length})</div>
            {studentReceipts.map(r => (
              <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
                <div>
                  <span style={{ fontFamily: 'var(--mono)', color: 'var(--text3)', fontSize: 11 }}>{r.id}</span>
                  <span style={{ marginLeft: 8, color: 'var(--text2)' }}>{r.feeType} · {r.mode}</span>
                </div>
                <div>
                  <span style={{ color: '#1a7a4a', fontWeight: 600 }}>₹{r.amount.toLocaleString()}</span>
                  <span style={{ marginLeft: 8, color: 'var(--text3)', fontSize: 11 }}>{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 18px', border: '1px solid var(--border2)', borderRadius: 8, background: 'transparent', color: 'var(--text)', fontSize: 13 }}>Close</button>
          {pending > 0 && (
            <button onClick={() => { onClose(); onAddPayment() }} style={{ padding: '8px 18px', border: 'none', borderRadius: 8, background: 'var(--text)', color: 'var(--surface)', fontSize: 13, fontWeight: 500 }}>
              Record payment
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
