import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { allStudents } from '../data/mockUsers';
import {
  User, BookOpen, Bus, FileText, Home, CheckCircle,
  XCircle, CreditCard, Edit2, Send, ChevronRight, Bell, LogOut
} from 'lucide-react';

// ── Mock fee + exam + homework data keyed by studentId ─────────
const feeData = {
  'BHM-001': {
    schoolFee: { status: 'paid',   amount: '₹2,500', term: 'Term 1 (Apr–Jun 2025)', dueDate: '30 Jun 2025' },
    busFee:    { status: 'unpaid', amount: '₹800',   term: 'July 2025',             dueDate: '10 Jul 2025' },
  },
  'BHM-002': {
    schoolFee: { status: 'unpaid', amount: '₹2,500', term: 'Term 1 (Apr–Jun 2025)', dueDate: '30 Jun 2025' },
    busFee:    { status: 'paid',   amount: '₹800',   term: 'July 2025',             dueDate: '10 Jul 2025' },
  },
  'BHM-004': {
    schoolFee: { status: 'paid',   amount: '₹2,500', term: 'Term 1 (Apr–Jun 2025)', dueDate: '30 Jun 2025' },
    busFee:    { status: 'paid',   amount: '₹800',   term: 'July 2025',             dueDate: '10 Jul 2025' },
  },
};

const examData = [
  { subject: 'Arabic & Quran',  date: '15 Jul 2025', time: '9:00 AM',  hall: 'Hall A', result: null },
  { subject: 'Mathematics',     date: '16 Jul 2025', time: '10:30 AM', hall: 'Hall B', result: null },
  { subject: 'English Language',date: '17 Jul 2025', time: '9:00 AM',  hall: 'Hall A', result: 88  },
  { subject: 'Islamic Studies', date: '18 Jul 2025', time: '11:00 AM', hall: 'Hall C', result: 94  },
  { subject: 'Science',         date: '19 Jul 2025', time: '9:00 AM',  hall: 'Hall B', result: 76  },
];

const homeworkData = [
  { subject: 'Mathematics', task: 'Complete exercises 3.5–3.8, Chapter 3 – Fractions.',              due: '12 Jul 2025', status: 'pending' },
  { subject: 'English',     task: 'Write a 200-word essay on "My Favourite Season".',                due: '10 Jul 2025', status: 'done'    },
  { subject: 'Arabic',      task: 'Memorise Surah Al-Mulk verses 1–10 and submit a voice note.',    due: '14 Jul 2025', status: 'pending' },
];

// ── Fee Card ───────────────────────────────────────────────────
const FeeCard = ({ title, data, icon, onPay }) => {
  const isPaid = data?.status === 'paid';
  if (!data) return null;
  return (
    <div className="card" style={{ borderLeft: `5px solid ${isPaid ? '#10B981' : '#EF4444'}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>{icon} {title}</div>
        <span style={{ padding: '3px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, backgroundColor: isPaid ? '#D1FAE5' : '#FEE2E2', color: isPaid ? '#065F46' : '#991B1B', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {isPaid ? <CheckCircle size={12} /> : <XCircle size={12} />}
          {isPaid ? 'PAID' : 'UNPAID'}
        </span>
      </div>
      <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{data.amount}</div>
      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{data.term}</div>
      <div style={{ fontSize: '0.8rem', color: isPaid ? 'var(--text-muted)' : '#EF4444', marginBottom: '1rem' }}>Due: {data.dueDate}</div>
      {!isPaid
        ? <button onClick={onPay} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)', color: 'white', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
            <CreditCard size={16} /> Pay Now
          </button>
        : <div style={{ color: '#10B981', fontWeight: 600, fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={15} /> Payment complete</div>
      }
    </div>
  );
};

// ── Update Profile Form ────────────────────────────────────────
const UpdateForm = () => {
  const [sent, setSent] = useState(false);
  const [field, setField] = useState('');
  const [value, setValue] = useState('');
  const [note, setNote] = useState('');
  const inputStyle = { width: '100%', padding: '0.6rem 0.9rem', borderRadius: '8px', border: '1.5px solid #D1D5DB', fontSize: '0.88rem', outline: 'none', marginBottom: '0.75rem', fontFamily: 'Inter, sans-serif' };
  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Edit2 size={17} color="#8B5CF6" />
        <h2 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>Submit Profile Update Request</h2>
      </div>
      <input placeholder="Field to update (e.g. Phone Number)" value={field} onChange={e => setField(e.target.value)} style={inputStyle} />
      <input placeholder="New value" value={value} onChange={e => setValue(e.target.value)} style={inputStyle} />
      <textarea placeholder="Reason / additional notes…" rows={2} value={note} onChange={e => setNote(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
      <button onClick={() => { setSent(true); setTimeout(() => { setSent(false); setField(''); setValue(''); setNote(''); }, 3000); }}
        style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: 'none', backgroundColor: '#8B5CF6', color: 'white', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontFamily: 'Inter, sans-serif' }}>
        <Send size={15} /> {sent ? '✓ Request Submitted!' : 'Submit for Review'}
      </button>
    </div>
  );
};

// ── StudentPage ────────────────────────────────────────────────
const StudentPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('fees');
  const [payModal, setPayModal] = useState(null);

  // Find the student's record in allStudents using studentId stored in auth user
  const studentRecord = allStudents.find(s => s.studentId === user?.studentId);
  const fees = feeData[user?.studentId] || {};

  const handleLogout = () => { logout(); navigate('/login', { replace: true }); };

  const tabs = [
    { id: 'fees',     label: 'Fees',     icon: <CreditCard size={15} /> },
    { id: 'exams',    label: 'Exams',    icon: <FileText size={15} /> },
    { id: 'homework', label: 'Homework', icon: <BookOpen size={15} /> },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background-light)' }}>
      {/* Header gradient */}
      <div style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)', padding: '1.5rem 1.25rem 4rem', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.65rem' }}>BHM</div>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Bidayathul Hidaya Madrasa</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Bell size={20} />
            <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '6px 12px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={user?.avatar || studentRecord?.avatar} alt={user?.name} style={{ width: '64px', height: '64px', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.5)', objectFit: 'cover' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{user?.name}</div>
            <div style={{ opacity: 0.8, fontSize: '0.88rem' }}>
              {studentRecord ? `${studentRecord.roll} • ${studentRecord.class}` : user?.studentId}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 1rem 2rem', transform: 'translateY(-2rem)' }}>
        {/* Student Info Card */}
        {studentRecord && (
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <User size={17} color="var(--secondary-blue)" />
              <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Student Info</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
              {[
                { label: 'Date of Birth',   value: studentRecord.dob    },
                { label: 'Class',           value: studentRecord.class  },
                { label: "Parent's Name",   value: studentRecord.parent },
                { label: 'Phone',           value: studentRecord.phone  },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.label}</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 500, marginTop: '2px' }}>{item.value || '—'}</div>
                </div>
              ))}
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Address</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 500, marginTop: '2px' }}>{studentRecord.address || '—'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', padding: '4px', marginBottom: '1rem', boxShadow: 'var(--shadow-sm)' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '0.6rem', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '0.83rem', fontWeight: 600, transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
              backgroundColor: tab === t.id ? 'var(--secondary-blue)' : 'transparent',
              color: tab === t.id ? 'white' : 'var(--text-muted)',
            }}>{t.icon} {t.label}</button>
          ))}
        </div>

        {/* Fees Tab */}
        {tab === 'fees' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FeeCard title="School Fee" data={fees.schoolFee} icon={<Home size={17} />} onPay={() => setPayModal('school')} />
            <FeeCard title="Bus Fee"    data={fees.busFee}    icon={<Bus  size={17} />} onPay={() => setPayModal('bus')} />
          </div>
        )}

        {/* Exams Tab */}
        {tab === 'exams' && (
          <div className="card">
            <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700 }}>Exam Timetable & Results</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {examData.map((ex, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', backgroundColor: '#F9FAFB', borderRadius: '8px', borderLeft: '3px solid var(--secondary-blue)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{ex.subject}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ex.date} • {ex.time} • {ex.hall}</div>
                  </div>
                  {ex.result !== null
                    ? <span style={{ fontWeight: 700, color: ex.result >= 80 ? '#10B981' : '#EF4444' }}>{ex.result}%</span>
                    : <span style={{ fontSize: '0.78rem', color: '#F97316', fontWeight: 600 }}>Upcoming</span>
                  }
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Homework Tab */}
        {tab === 'homework' && (
          <div className="card">
            <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700 }}>Homework</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {homeworkData.map((hw, i) => (
                <div key={i} style={{ padding: '0.75rem', backgroundColor: hw.status === 'done' ? '#F0FDF4' : '#FFFBEB', borderRadius: '8px', borderLeft: `4px solid ${hw.status === 'done' ? '#10B981' : '#F97316'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{hw.subject}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: hw.status === 'done' ? '#10B981' : '#F97316' }}>
                      {hw.status === 'done' ? '✓ Done' : `Due: ${hw.due}`}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>{hw.task}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile update */}
        <div style={{ marginTop: '1rem' }}>
          <UpdateForm />
        </div>
      </div>

      {/* Pay Modal (bottom sheet style) */}
      {payModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px 20px 0 0', padding: '2rem', width: '100%', maxWidth: '480px' }}>
            <h2 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: 700 }}>
              Pay {payModal === 'school' ? 'School' : 'Bus'} Fee
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Amount: {payModal === 'school' ? fees.schoolFee?.amount : fees.busFee?.amount}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {['Pay with UPI', 'Pay with Card', 'Net Banking'].map(m => (
                <button key={m} style={{ padding: '0.9rem 1rem', borderRadius: '10px', border: '1.5px solid #D1D5DB', backgroundColor: 'white', cursor: 'pointer', fontWeight: 600, textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Inter, sans-serif' }}>
                  {m} <ChevronRight size={16} />
                </button>
              ))}
            </div>
            <button onClick={() => setPayModal(null)} style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #D1D5DB', backgroundColor: 'white', cursor: 'pointer', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPage;
