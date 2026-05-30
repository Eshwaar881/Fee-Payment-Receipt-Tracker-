import React, { useState } from 'react'
import { X } from 'lucide-react'
import { format } from 'date-fns'
import { FEE_TYPES, CLASSES, PAYMENT_MODES, totalFees } from '../data/seed'

const today = format(new Date(), 'yyyy-MM-dd')

export function PaymentModal({ students, onSave, onClose }) {
  const [mode, setMode] = useState('existing') // 'existing' | 'new'
  const [selectedId, setSelectedId] = useState('')
  const [feeType, setFeeType] = useState('Tuition')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(today)
  const [dueDate, setDueDate] = useState('')
  const [payMode, setPayMode] = useState('Cash')
  const [ref, setRef] = useState('')
  const [newName, setNewName] = useState('')
  const [newRoll, setNewRoll] = useState('')
  const [newCls, setNewCls] = useState('Class 6')
  const [newParent, setNewParent] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFees, setNewFees] = useState({ Admission: 0, Tuition: 0, Hostel: 0, Transport: 0, Exam: 0 })
  const [errors, setErrors] = useState({})

  const selectedStudent = students.find(s => s.id === selectedId)

  function validate() {
    const e = {}
    if (mode === 'existing' && !selectedId) e.student = 'Select a student'
    if (mode === 'new') {
      if (!newName.trim()) e.name = 'Required'
      if (!newRoll.trim()) e.roll = 'Required'
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) e.amount = 'Enter a valid amount'
    if (!dueDate) e.dueDate = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    if (mode === 'existing') {
      onSave({ studentId: selectedId, feeType, amount: Number(amount), date, dueDate, mode: payMode, ref })
    } else {
      onSave({
        newStudent: { name: newName, roll: newRoll, cls: newCls, parent: newParent, phone: newPhone, fees: newFees },
        feeType, amount: Number(amount), date, dueDate, mode: payMode, ref
      })
    }
  }

  const inputStyle = (err) => ({
    width: '100%', height: 36, border: `1px solid ${err ? '#e74c3c' : 'var(--border2)'}`,
    borderRadius: 8, padding: '0 10px', fontSize: 13, background: 'var(--surface)',
    color: 'var(--text)', outline: 'none'
  })

  const label = (text, err) => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: 'var(--text2)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>{text}</label>
    </div>
  )

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 16 }}>
      <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', width: 520, maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto', padding: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600 }}>Record payment</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4 }}>
            <X size={18} color="var(--text2)" />
          </button>
        </div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
          {['existing', 'new'].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, padding: '7px 0', fontSize: 12, fontWeight: 500, border: `1px solid ${mode === m ? 'var(--text)' : 'var(--border)'}`,
              borderRadius: 8, background: mode === m ? 'var(--text)' : 'transparent', color: mode === m ? 'var(--surface)' : 'var(--text2)', transition: 'all .15s'
            }}>
              {m === 'existing' ? 'Existing student' : 'New student'}
            </button>
          ))}
        </div>

        {mode === 'existing' ? (
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Student</label>
            <select value={selectedId} onChange={e => setSelectedId(e.target.value)} style={inputStyle(errors.student)}>
              <option value="">Select student…</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.roll})</option>)}
            </select>
            {errors.student && <div style={{ color: '#c0392b', fontSize: 11, marginTop: 3 }}>{errors.student}</div>}
            {selectedStudent && (
              <div style={{ marginTop: 8, padding: '8px 12px', background: 'var(--surface2)', borderRadius: 8, fontSize: 12, color: 'var(--text2)' }}>
                {selectedStudent.cls} · Paid ₹{selectedStudent.paid.toLocaleString()} of ₹{totalFees(selectedStudent.fees).toLocaleString()}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Full name</label>
                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Student name" style={inputStyle(errors.name)} />
                {errors.name && <div style={{ color: '#c0392b', fontSize: 11, marginTop: 3 }}>{errors.name}</div>}
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Roll no.</label>
                <input value={newRoll} onChange={e => setNewRoll(e.target.value)} placeholder="e.g. 2025-042" style={inputStyle(errors.roll)} />
                {errors.roll && <div style={{ color: '#c0392b', fontSize: 11, marginTop: 3 }}>{errors.roll}</div>}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Class</label>
                <select value={newCls} onChange={e => setNewCls(e.target.value)} style={inputStyle(false)}>
                  {CLASSES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Parent name</label>
                <input value={newParent} onChange={e => setNewParent(e.target.value)} placeholder="Optional" style={inputStyle(false)} />
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>Fee structure (₹)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                {FEE_TYPES.map(ft => (
                  <div key={ft}>
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 3 }}>{ft}</div>
                    <input type="number" value={newFees[ft]} onChange={e => setNewFees(p => ({ ...p, [ft]: Number(e.target.value) }))} style={{ ...inputStyle(false), padding: '0 6px' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ height: 1, background: 'var(--border)', margin: '14px 0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Fee type</label>
            <select value={feeType} onChange={e => setFeeType(e.target.value)} style={inputStyle(false)}>
              {FEE_TYPES.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Amount paid (₹)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" style={inputStyle(errors.amount)} />
            {errors.amount && <div style={{ color: '#c0392b', fontSize: 11, marginTop: 3 }}>{errors.amount}</div>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Payment date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle(false)} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Due date</label>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={inputStyle(errors.dueDate)} />
            {errors.dueDate && <div style={{ color: '#c0392b', fontSize: 11, marginTop: 3 }}>{errors.dueDate}</div>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Payment mode</label>
            <select value={payMode} onChange={e => setPayMode(e.target.value)} style={inputStyle(false)}>
              {PAYMENT_MODES.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text2)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.04em' }}>Transaction ref.</label>
            <input value={ref} onChange={e => setRef(e.target.value)} placeholder="Optional" style={inputStyle(false)} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 18px', border: '1px solid var(--border2)', borderRadius: 8, background: 'transparent', color: 'var(--text)', fontSize: 13 }}>
            Cancel
          </button>
          <button onClick={handleSubmit} style={{ padding: '8px 18px', border: 'none', borderRadius: 8, background: 'var(--text)', color: 'var(--surface)', fontSize: 13, fontWeight: 500 }}>
            Save & generate receipt
          </button>
        </div>
      </div>
    </div>
  )
}
