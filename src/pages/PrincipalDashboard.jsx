import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap, Users, TrendingUp, AlertTriangle,
  CheckCircle, XCircle, ChevronRight, Bell, Calendar
} from 'lucide-react';

// ── Metric Cards ───────────────────────────────────────────────
const MetricCard = ({ label, value, color, icon, change }) => (
  <div className="card" style={{ borderTop: `4px solid ${color}`, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color }}>{value}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{label}</div>
      </div>
      <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
        {icon}
      </div>
    </div>
    {change && <div style={{ fontSize: '0.8rem', color: change > 0 ? '#10B981' : '#EF4444', fontWeight: 500 }}>
      {change > 0 ? '▲' : '▼'} {Math.abs(change)}% from last month
    </div>}
  </div>
);

// ── Overdue Fees Panel ─────────────────────────────────────────
const overdueData = [
  { name: 'Ahmed Farhan', class: 'Grade 7', type: 'School Fee', amount: '₹2,500', overdueDays: 15, avatar: 'https://i.pravatar.cc/40?img=1' },
  { name: 'Sara Banu', class: 'Grade 5', type: 'Bus Fee', amount: '₹800', overdueDays: 22, avatar: 'https://i.pravatar.cc/40?img=5' },
  { name: 'Khalid Hamza', class: 'Grade 9', type: 'School Fee', amount: '₹3,000', overdueDays: 8, avatar: 'https://i.pravatar.cc/40?img=3' },
  { name: 'Fatima Noor', class: 'Grade 6', type: 'Bus Fee', amount: '₹800', overdueDays: 30, avatar: 'https://i.pravatar.cc/40?img=9' },
  { name: 'Umar Siddiq', class: 'Grade 8', type: 'School Fee', amount: '₹2,500', overdueDays: 5, avatar: 'https://i.pravatar.cc/40?img=4' },
  { name: 'Mariam Riyaz', class: 'Grade 4', type: 'School Fee', amount: '₹2,000', overdueDays: 12, avatar: 'https://i.pravatar.cc/40?img=6' },
];

const OverduePanel = () => {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? overdueData : overdueData.filter(d => d.type === filter);

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AlertTriangle size={20} color="#EF4444" />
          <h2 className="heading-2" style={{ margin: 0, color: '#EF4444' }}>Overdue Fees Alerts</h2>
          <span style={{ background: '#FEE2E2', color: '#EF4444', borderRadius: '20px', padding: '2px 10px', fontSize: '0.78rem', fontWeight: 600 }}>{overdueData.length} pending</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'School Fee', 'Bus Fee'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '4px 12px', borderRadius: '20px', border: '1px solid', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500,
              backgroundColor: filter === f ? '#EF4444' : 'white',
              borderColor: filter === f ? '#EF4444' : '#D1D5DB',
              color: filter === f ? 'white' : '#6B7280',
              transition: 'all 0.2s',
              fontFamily: 'Inter, sans-serif'
            }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.map((student, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', backgroundColor: student.overdueDays >= 20 ? '#FFF5F5' : '#FAFAFA', borderRadius: '8px', border: '1px solid', borderColor: student.overdueDays >= 20 ? '#FECACA' : '#F3F4F6' }}>
            <img src={student.avatar} alt={student.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{student.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{student.class} • {student.type}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, color: '#EF4444' }}>{student.amount}</div>
              <div style={{ fontSize: '0.75rem', color: student.overdueDays >= 20 ? '#EF4444' : '#F97316' }}>{student.overdueDays} days overdue</div>
            </div>
            <Button variant="primary" style={{ padding: '4px 12px', fontSize: '0.78rem' }}>Remind</Button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--secondary-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>
          View All Overdue <ChevronRight size={16} />
        </button>
      </div>
    </Card>
  );
};

// ── Staff Overview ─────────────────────────────────────────────
const staffData = [
  { name: 'Mr. Abdullah', subject: 'Arabic & Quran', present: true, avatar: 'https://i.pravatar.cc/40?img=10' },
  { name: 'Mrs. Zainab', subject: 'Mathematics', present: true, avatar: 'https://i.pravatar.cc/40?img=20' },
  { name: 'Mr. Kareem', subject: 'Science', present: false, avatar: 'https://i.pravatar.cc/40?img=12' },
  { name: 'Mrs. Hana', subject: 'English', present: true, avatar: 'https://i.pravatar.cc/40?img=23' },
  { name: 'Mr. Yusuf', subject: 'Social Studies', present: false, avatar: 'https://i.pravatar.cc/15' },
];

const StaffOverview = () => (
  <Card>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
      <h2 className="heading-2" style={{ margin: 0 }}>Staff Overview</h2>
      <span style={{ background: '#D1FAE5', color: '#065F46', borderRadius: '20px', padding: '2px 10px', fontSize: '0.8rem', fontWeight: 600 }}>
        {staffData.filter(s => s.present).length}/{staffData.length} Present
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {staffData.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 0', borderBottom: i < staffData.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
          <img src={s.avatar} alt={s.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{s.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.subject}</div>
          </div>
          {s.present
            ? <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981', fontWeight: 500, fontSize: '0.85rem' }}><CheckCircle size={16} /> Present</div>
            : <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EF4444', fontWeight: 500, fontSize: '0.85rem' }}><XCircle size={16} /> Absent</div>
          }
        </div>
      ))}
    </div>
  </Card>
);

// ── Upcoming Events ────────────────────────────────────────────
const events = [
  { title: 'Parent-Teacher Meeting', date: 'Tomorrow, 3:00 PM', icon: <Users size={16} />, color: '#3B82F6' },
  { title: 'Annual Sports Day', date: 'Fri, 15 Jul 2025', icon: <Calendar size={16} />, color: '#10B981' },
  { title: 'Exam Results Published', date: 'Mon, 18 Jul 2025', icon: <GraduationCap size={16} />, color: '#F97316' },
];

const EventsPanel = () => (
  <Card>
    <h2 className="heading-2">Upcoming Events</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {events.map((ev, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.75rem', backgroundColor: '#F9FAFB', borderRadius: '8px', borderLeft: `4px solid ${ev.color}` }}>
          <span style={{ color: ev.color }}>{ev.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{ev.title}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ev.date}</div>
          </div>
          <ChevronRight size={16} color="#9CA3AF" />
        </div>
      ))}
    </div>
  </Card>
);

// ── PrincipalDashboard ─────────────────────────────────────────
const PrincipalDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div style={{ backgroundColor: 'var(--primary-blue)', color: 'white', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Principal Dashboard</h1>
            <p style={{ margin: 0, opacity: 0.75, fontSize: '0.85rem' }}>Bidayathul Hidaya Madrasa</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={18} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src={user?.avatar || 'https://i.pravatar.cc/32?img=11'} alt="Principal" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
              <span style={{ fontSize: '0.9rem' }}>{user?.name || 'Principal Ahmed'}</span>
            </div>
          </div>
        </div>

        <div className="page-container">
          {/* Metric cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <MetricCard label="Total Students" value="520" color="#3B82F6" icon={<GraduationCap size={22} />} change={5} />
            <MetricCard label="Attendance Rate" value="94%" color="#10B981" icon={<TrendingUp size={22} />} change={2} />
            <MetricCard label="Teaching Staff" value="38" color="#8B5CF6" icon={<Users size={22} />} change={0} />
            <MetricCard label="Overdue Fees" value="12" color="#EF4444" icon={<AlertTriangle size={22} />} change={-3} />
          </div>

          {/* Main content grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <OverduePanel />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <StaffOverview />
              <EventsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
