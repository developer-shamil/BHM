import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import AddStudentIcon from '../components/AddStudentIcon';
import { useAuth } from '../context/AuthContext';
import { Search, CheckCircle, XCircle, Bus, Users, Bell, AlertCircle } from 'lucide-react';

// ── Bus Passenger Data ─────────────────────────────────────────
const initialPassengers = [
  { id: 1, name: 'Ahmed Farhan', class: 'Grade 7A', route: 'Route A – Calicut North', feeStatus: 'paid', phone: '+91 98765 43210', avatar: 'https://i.pravatar.cc/40?img=1' },
  { id: 2, name: 'Sara Banu', class: 'Grade 5B', route: 'Route A – Calicut North', feeStatus: 'unpaid', phone: '+91 87654 32109', avatar: 'https://i.pravatar.cc/40?img=5' },
  { id: 3, name: 'Khalid Hamza', class: 'Grade 9A', route: 'Route B – Calicut South', feeStatus: 'paid', phone: '+91 76543 21098', avatar: 'https://i.pravatar.cc/40?img=3' },
  { id: 4, name: 'Mariam Riyaz', class: 'Grade 4A', route: 'Route B – Calicut South', feeStatus: 'unpaid', phone: '+91 65432 10987', avatar: 'https://i.pravatar.cc/40?img=6' },
  { id: 5, name: 'Umar Siddiq', class: 'Grade 8A', route: 'Route A – Calicut North', feeStatus: 'paid', phone: '+91 54321 09876', avatar: 'https://i.pravatar.cc/40?img=4' },
];

// All students that can be searched and added
const allStudents = [
  { id: 10, name: 'Fatima Noor', class: 'Grade 6A', route: 'Route A – Calicut North', feeStatus: 'unpaid', phone: '+91 43210 98765', avatar: 'https://i.pravatar.cc/40?img=9' },
  { id: 11, name: 'Ibrahim Ali', class: 'Grade 3B', route: 'Route B – Calicut South', feeStatus: 'unpaid', phone: '+91 32109 87654', avatar: 'https://i.pravatar.cc/40?img=7' },
  { id: 12, name: 'Hafsa Banu', class: 'Grade 10A', route: 'Route A – Calicut North', feeStatus: 'unpaid', phone: '+91 21098 76543', avatar: 'https://i.pravatar.cc/40?img=8' },
  { id: 13, name: 'Yusuf Rashed', class: 'Grade 2A', route: 'Route C – Malappuram', feeStatus: 'unpaid', phone: '+91 10987 65432', avatar: 'https://i.pravatar.cc/40?img=2' },
];

// ── Add Student to Bus Panel ───────────────────────────────────
const AddToBusPanel = ({ onAdd, existingIds, assignedRoute }) => {
  const [query, setQuery] = useState('');
  const [added, setAdded] = useState(null);

  // Filter students who are not already on a bus and match name search
  const results = allStudents.filter(s =>
    !existingIds.includes(s.id) &&
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleAdd = (student) => {
    // Add student specifically to the driver's assigned route
    onAdd({ ...student, route: assignedRoute, feeStatus: 'unpaid' });
    setAdded(student.name);
    setQuery('');
    setTimeout(() => setAdded(null), 2500);
  };

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <AddStudentIcon size={52} />
        <div>
          <h2 className="heading-2" style={{ margin: 0 }}>Add Students to Bus List</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>Search and assign students to your route</p>
        </div>
      </div>

      {added && (
        <div style={{ backgroundColor: '#D1FAE5', color: '#065F46', padding: '0.6rem 1rem', borderRadius: '8px', marginBottom: '0.75rem', fontSize: '0.88rem', fontWeight: 500 }}>
          ✓ {added} added to route successfully!
        </div>
      )}

      <div style={{ marginBottom: '0.75rem' }}>
        <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.3rem' }}>Route Assigned</label>
        <div style={{ padding: '0.6rem 0.9rem', borderRadius: '8px', border: '1.5px solid #D1D5DB', fontSize: '0.88rem', backgroundColor: '#F3F4F6', fontWeight: 'bold', color: '#374151' }}>
          {assignedRoute}
        </div>
      </div>

      <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
        <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search student by name…"
          style={{ width: '100%', padding: '0.6rem 0.9rem 0.6rem 34px', borderRadius: '8px', border: '1.5px solid #D1D5DB', fontSize: '0.88rem', outline: 'none', fontFamily: 'Inter, sans-serif' }}
        />
      </div>

      {query && (
        <div style={{ backgroundColor: '#F9FAFB', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
          {results.length === 0 && (
            <div style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.88rem', textAlign: 'center' }}>No students found</div>
          )}
          {results.map(s => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 1rem', borderBottom: '1px solid #E5E7EB' }}>
              <img src={s.avatar} alt={s.name} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{s.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.class}</div>
              </div>
              <Button variant="green" style={{ padding: '4px 12px', fontSize: '0.78rem' }} onClick={() => handleAdd(s)}>Add</Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

// ── Fee Tracking Panel ─────────────────────────────────────────
const FeeTrackingPanel = ({ passengers, onToggleFee }) => {
  const [filter, setFilter] = useState('all');
  const filtered = passengers.filter(p => filter === 'all' ? true : p.feeStatus === filter);
  const paid = passengers.filter(p => p.feeStatus === 'paid').length;

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h2 className="heading-2" style={{ margin: 0 }}>Bus Fee Tracking</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'paid', 'unpaid'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '4px 12px', borderRadius: '20px', border: '1px solid', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600,
              backgroundColor: filter === f ? (f === 'paid' ? '#10B981' : f === 'unpaid' ? '#EF4444' : '#3B82F6') : 'white',
              borderColor: f === 'paid' ? '#10B981' : f === 'unpaid' ? '#EF4444' : '#3B82F6',
              color: filter === f ? 'white' : f === 'paid' ? '#10B981' : f === 'unpaid' ? '#EF4444' : '#3B82F6',
              transition: 'all 0.2s',
              textTransform: 'capitalize',
              fontFamily: 'Inter, sans-serif'
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <div style={{ backgroundColor: '#F0FDF4', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, fontSize: '0.88rem', color: '#065F46' }}>
          ✓ {paid} / {passengers.length} paid ({passengers.length > 0 ? Math.round((paid / passengers.length) * 100) : 0}%)
        </span>
        <div style={{ background: '#E5E7EB', borderRadius: '4px', height: '8px', width: '120px', overflow: 'hidden' }}>
          <div style={{ background: '#10B981', height: '100%', width: `${passengers.length > 0 ? (paid / passengers.length) * 100 : 0}%`, borderRadius: '4px', transition: 'width 0.5s' }} />
        </div>
      </div>

      {filtered.length === 0 && <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>No records found</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filtered.map(p => (
          <div key={p.id} style={{
            display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '8px',
            backgroundColor: p.feeStatus === 'paid' ? '#F0FDF4' : '#FFF5F5',
            border: '1px solid', borderColor: p.feeStatus === 'paid' ? '#A7F3D0' : '#FECACA',
          }}>
            <img src={p.avatar} alt={p.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.class} • {p.route}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.82rem',
                color: p.feeStatus === 'paid' ? '#065F46' : '#991B1B',
              }}>
                {p.feeStatus === 'paid' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                {p.feeStatus === 'paid' ? 'Paid' : 'Unpaid'}
              </div>
              <button onClick={() => onToggleFee(p.id)} style={{
                marginTop: '4px', padding: '3px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                backgroundColor: p.feeStatus === 'paid' ? '#FEE2E2' : '#D1FAE5',
                color: p.feeStatus === 'paid' ? '#EF4444' : '#10B981',
                fontFamily: 'Inter, sans-serif'
              }}>
                Mark {p.feeStatus === 'paid' ? 'Unpaid' : 'Paid'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ── BusDriverPage ──────────────────────────────────────────────
const BusDriverPage = () => {
  const { user } = useAuth();
  const assignedRoute = user?.busRoute || 'Route A – Calicut North';

  // Filter passengers to show only those matching the driver's assigned route
  const [passengers, setPassengers] = useState(
    initialPassengers.filter(p => p.route === assignedRoute)
  );
  
  const existingIds = passengers.map(p => p.id);

  const addPassenger = student => {
    if (!existingIds.includes(student.id)) setPassengers(p => [...p, student]);
  };

  const toggleFee = id => {
    setPassengers(ps => ps.map(p => p.id === id ? { ...p, feeStatus: p.feeStatus === 'paid' ? 'unpaid' : 'paid' } : p));
  };

  const paidCount = passengers.filter(p => p.feeStatus === 'paid').length;
  const unpaidCount = passengers.filter(p => p.feeStatus === 'unpaid').length;

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)', color: 'white', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Bus Driver Admin Panel</h1>
            <p style={{ margin: 0, opacity: 0.85, fontSize: '0.85rem' }}>Bidayathul Hidaya Madrasa • Bus Route Management</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Bell size={20} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src={user?.avatar || 'https://i.pravatar.cc/32?img=30'} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
              <span>{user?.name || 'Driver Hassan'}</span>
            </div>
          </div>
        </div>

        <div className="page-container">
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Total Passengers', value: passengers.length, color: '#F97316', icon: <Users size={20} /> },
              { label: 'Fee Paid', value: paidCount, color: '#10B981', icon: <CheckCircle size={20} /> },
              { label: 'Fee Unpaid', value: unpaidCount, color: '#EF4444', icon: <AlertCircle size={20} /> },
              { label: 'My Route Assigned', value: assignedRoute.split(' – ')[0], color: '#3B82F6', icon: <Bus size={20} /> },
            ].map((m, i) => (
              <div key={i} className="card" style={{ borderTop: `4px solid ${m.color}`, display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem' }}>
                <div style={{ color: m.color }}>{m.icon}</div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 700, color: m.color }}>{m.value}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{m.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="dashboard-grid">
            <AddToBusPanel onAdd={addPassenger} existingIds={existingIds} assignedRoute={assignedRoute} />
            <FeeTrackingPanel passengers={passengers} onToggleFee={toggleFee} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusDriverPage;
