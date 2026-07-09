import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import AddStudentIcon from '../components/AddStudentIcon';
import { useAuth } from '../context/AuthContext';
import { allStudents } from '../data/mockUsers';
import {
  BookOpen, Search, Bell, Send, Trash2, UserMinus
} from 'lucide-react';

// ── Add Student Modal ──────────────────────────────────────────
const AddStudentModal = ({ assignedClass, onClose, onAdd }) => {
  const [form, setForm] = useState({ name: '', roll: '', parent: '', phone: '', dob: '' });
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = () => {
    if (!form.name.trim() || !form.roll.trim()) return;
    onAdd({
      id: Date.now(),
      studentId: form.roll,
      userId: null,
      name: form.name,
      class: assignedClass,
      roll: form.roll,
      attendance: 'Present',
      score: '-',
      avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 50) + 1}`,
      phone: form.phone,
      parent: form.parent,
      dob: form.dob,
      address: '',
    });
    onClose();
  };

  const inputStyle = {
    width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px',
    border: '1.5px solid #D1D5DB', fontSize: '0.9rem', outline: 'none',
    fontFamily: 'Inter, sans-serif', backgroundColor: '#F9FAFB', transition: 'all 0.2s',
  };

  const fields = [
    { label: 'Full Name *',       name: 'name',   placeholder: 'e.g. Ahmad bin Khalid' },
    { label: 'Roll Number *',     name: 'roll',   placeholder: `e.g. ${assignedClass.replace('Grade ', 'BHM-G')}-01` },
    { label: "Parent's Name",     name: 'parent', placeholder: "Father's / Guardian's name" },
    { label: 'Phone Number',      name: 'phone',  placeholder: '+91 98765 43210' },
    { label: 'Date of Birth',     name: 'dob',    placeholder: 'e.g. 12 Mar 2013' },
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
      <div className="card" style={{ width: '480px', padding: '2rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 className="heading-2" style={{ margin: 0 }}>Add New Student</h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Adding to: <strong>{assignedClass}</strong></p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', fontSize: '1.4rem', lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {fields.map(f => (
            <div key={f.name}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.3rem', color: '#374151' }}>{f.label}</label>
              <input name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder} style={inputStyle}
                onFocus={e => { e.target.style.borderColor = '#3B82F6'; e.target.style.backgroundColor = 'white'; }}
                onBlur={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.backgroundColor = '#F9FAFB'; }}
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={submit}>Add Student</Button>
        </div>
      </div>
    </div>
  );
};

// ── Remove Confirm Modal ───────────────────────────────────────
const RemoveConfirmModal = ({ student, onClose, onConfirm }) => (
  <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
    <div className="card" style={{ width: '380px', padding: '2rem', textAlign: 'center' }}>
      <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
        <UserMinus size={28} color="#EF4444" />
      </div>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Remove Student?</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        Are you sure you want to remove <strong>{student?.name}</strong> from the class list? This action cannot be undone.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <button onClick={onConfirm} style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', backgroundColor: '#EF4444', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
          Yes, Remove
        </button>
      </div>
    </div>
  </div>
);

// ── Homework Panel ─────────────────────────────────────────────
const HomeworkPanel = ({ students }) => {
  const [mode, setMode] = useState('class');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [task, setTask] = useState('');
  const [due, setDue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (!subject || !task || !due) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setSubject(''); setTask(''); setDue(''); setSelectedStudent(''); }, 2500);
  };

  const inputStyle = {
    width: '100%', padding: '0.6rem 0.9rem', borderRadius: '8px',
    border: '1.5px solid #D1D5DB', fontSize: '0.88rem', outline: 'none', fontFamily: 'Inter, sans-serif',
  };

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <BookOpen size={20} color="#F97316" />
        <h2 className="heading-2" style={{ margin: 0 }}>Assign Homework</h2>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {['class', 'student'].map(m => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: '6px 16px', borderRadius: '20px', border: '1px solid', cursor: 'pointer',
            backgroundColor: mode === m ? '#F97316' : 'white',
            borderColor: mode === m ? '#F97316' : '#D1D5DB',
            color: mode === m ? 'white' : '#6B7280',
            fontWeight: 500, fontSize: '0.85rem', fontFamily: 'Inter, sans-serif',
          }}>{m === 'class' ? 'Entire Class' : 'Specific Student'}</button>
        ))}
      </div>
      {mode === 'student' && (
        <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} style={{ ...inputStyle, marginBottom: '0.75rem' }}>
          <option value="">Select student…</option>
          {students.map(s => <option key={s.id} value={s.name}>{s.name} ({s.roll})</option>)}
        </select>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} style={inputStyle} />
        <textarea placeholder="Task description…" value={task} onChange={e => setTask(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
        <input type="date" value={due} onChange={e => setDue(e.target.value)} style={inputStyle} />
        <Button variant="orange" onClick={submit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
          <Send size={16} /> {submitted ? '✓ Assigned!' : 'Assign Homework'}
        </Button>
      </div>
    </Card>
  );
};

// ── TeacherDashboard ───────────────────────────────────────────
const TeacherDashboard = () => {
  const { user } = useAuth();
  const assignedClass = user?.assignedClass || '';

  // Filter allStudents to only those in the teacher's assigned class
  const [students, setStudents] = useState(
    allStudents.filter(s => s.class === assignedClass)
  );
  const [showAddModal, setShowAddModal]     = useState(false);
  const [removeTarget, setRemoveTarget]     = useState(null);
  const [search, setSearch]                 = useState('');

  const addStudent = newStudent => setStudents(s => [...s, newStudent]);
  const confirmRemove = () => {
    setStudents(s => s.filter(st => st.id !== removeTarget.id));
    setRemoveTarget(null);
  };
  const toggleAttendance = id => setStudents(s => s.map(st => st.id === id ? { ...st, attendance: st.attendance === 'Present' ? 'Absent' : 'Present' } : st));

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const present  = students.filter(s => s.attendance === 'Present').length;
  const avgScore = students.filter(s => s.score !== '-').length
    ? Math.round(students.filter(s => s.score !== '-').reduce((a, s) => a + s.score, 0) / students.filter(s => s.score !== '-').length)
    : 0;

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        {/* Header */}
        <div style={{ backgroundColor: '#065F46', color: 'white', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Teacher Dashboard</h1>
            <p style={{ margin: 0, opacity: 0.8, fontSize: '0.85rem' }}>
              {assignedClass} — {user?.name} &nbsp;
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '1px 8px', borderRadius: '20px', fontSize: '0.75rem' }}>
                {students.length} students
              </span>
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Bell size={20} />
            <img src={user?.avatar} alt="" style={{ width: '34px', height: '34px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.5)' }} />
          </div>
        </div>

        <div className="page-container">
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Total Students', value: students.length, color: '#3B82F6' },
              { label: 'Present Today',  value: present,         color: '#10B981' },
              { label: 'Absent Today',   value: students.length - present, color: '#EF4444' },
              { label: 'Avg Score',      value: `${avgScore}%`,  color: '#F97316' },
            ].map((m, i) => (
              <div key={i} className="card" style={{ borderTop: `4px solid ${m.color}`, padding: '1rem' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: m.color }}>{m.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            {/* Student list */}
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <h2 className="heading-2" style={{ margin: 0 }}>{assignedClass} — Student List</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {/* Search */}
                  <div style={{ position: 'relative' }}>
                    <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
                      style={{ paddingLeft: '32px', padding: '0.48rem 0.75rem 0.48rem 32px', borderRadius: '8px', border: '1.5px solid #D1D5DB', fontSize: '0.85rem', outline: 'none', width: '160px', fontFamily: 'Inter, sans-serif' }} />
                  </div>
                  {/* ADD STUDENT icon */}
                  <div onClick={() => setShowAddModal(true)} title="Add Student to class" style={{ cursor: 'pointer' }}>
                    <AddStudentIcon size={50} />
                  </div>
                </div>
              </div>

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem', fontSize: '0.9rem' }}>
                  No students found.
                </div>
              )}

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  {filtered.length > 0 && (
                    <thead>
                      <tr style={{ backgroundColor: '#F9FAFB' }}>
                        {['Student', 'Roll', 'Score', 'Attendance', 'Actions'].map(h => (
                          <th key={h} style={{ padding: '0.65rem 0.75rem', textAlign: 'left', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid #F3F4F6', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {filtered.map(st => (
                      <tr key={st.id} style={{ borderBottom: '1px solid #F9FAFB' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <td style={{ padding: '0.65rem 0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <img src={st.avatar} alt={st.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{st.name}</div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{st.parent || '—'}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '0.65rem 0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{st.roll}</td>
                        <td style={{ padding: '0.65rem 0.75rem', fontWeight: 700, color: st.score === '-' ? '#9CA3AF' : st.score >= 80 ? '#10B981' : '#EF4444' }}>
                          {st.score}{st.score !== '-' ? '%' : ''}
                        </td>
                        <td style={{ padding: '0.65rem 0.75rem' }}>
                          <span style={{
                            padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
                            backgroundColor: st.attendance === 'Present' ? '#D1FAE5' : '#FEE2E2',
                            color: st.attendance === 'Present' ? '#065F46' : '#991B1B',
                          }}>{st.attendance}</span>
                        </td>
                        <td style={{ padding: '0.65rem 0.75rem' }}>
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            {/* Toggle attendance */}
                            <button onClick={() => toggleAttendance(st.id)} style={{
                              padding: '3px 9px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600, fontFamily: 'Inter, sans-serif',
                              backgroundColor: st.attendance === 'Present' ? '#FEE2E2' : '#D1FAE5',
                              color: st.attendance === 'Present' ? '#EF4444' : '#10B981',
                            }}>
                              {st.attendance === 'Present' ? 'Absent' : 'Present'}
                            </button>
                            {/* Remove */}
                            <button onClick={() => setRemoveTarget(st)} style={{
                              padding: '3px 8px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: '#FEE2E2', color: '#EF4444', display: 'flex', alignItems: 'center',
                            }} title="Remove student">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Homework */}
            <HomeworkPanel students={students} />
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddStudentModal
          assignedClass={assignedClass}
          onClose={() => setShowAddModal(false)}
          onAdd={addStudent}
        />
      )}
      {removeTarget && (
        <RemoveConfirmModal
          student={removeTarget}
          onClose={() => setRemoveTarget(null)}
          onConfirm={confirmRemove}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
