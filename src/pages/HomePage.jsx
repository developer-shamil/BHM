import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { BookOpen, Bus, Calendar, TrendingUp, ChevronLeft, ChevronRight, Bell, Users, GraduationCap, Star } from 'lucide-react';

// ── Slider Slides ──────────────────────────────────────────────
const slides = [
  {
    id: 1,
    title: 'Student Enrolment Growth',
    subtitle: '2020 – 2025',
    type: 'chart',
    data: [120, 180, 230, 290, 360, 420],
    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
    color: '#3B82F6',
    bg: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
  },
  {
    id: 2,
    title: '🎉 New Tahfeedh Programme',
    subtitle: 'Admissions Open – Join the Quran Memorisation Track starting Aug 2025',
    type: 'announcement',
    bg: 'linear-gradient(135deg, #065F46 0%, #10B981 100%)',
    icon: <BookOpen size={64} color="rgba(255,255,255,0.25)" />,
  },
  {
    id: 3,
    title: 'New Computer Lab Inaugurated',
    subtitle: '50 high-speed workstations now available for students',
    type: 'facility',
    bg: 'linear-gradient(135deg, #92400E 0%, #F97316 100%)',
    icon: <Star size={64} color="rgba(255,255,255,0.25)" />,
  },
  {
    id: 4,
    title: 'Attendance Rate',
    subtitle: '2024-25 Academic Year',
    type: 'chart',
    data: [88, 91, 86, 93, 95, 92, 97, 94, 90, 96],
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    color: '#10B981',
    bg: 'linear-gradient(135deg, #1E3A8A 0%, #0D9488 100%)',
  },
];

// ── Mini Bar Chart ─────────────────────────────────────────────
const BarChart = ({ data, labels, color }) => {
  const max = Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px', marginTop: '1rem' }}>
      {data.map((val, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <div style={{
            height: `${(val / max) * 100}%`,
            backgroundColor: color || '#3B82F6',
            borderRadius: '4px 4px 0 0',
            width: '100%',
            opacity: 0.85,
            transition: 'height 0.6s ease',
          }} />
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>{labels[i]}</div>
        </div>
      ))}
    </div>
  );
};

// ── Slider ─────────────────────────────────────────────────────
const Slider = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const next = () => setCurrent(c => (c + 1) % slides.length);
  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  const slide = slides[current];

  return (
    <div style={{
      position: 'relative',
      background: slide.bg,
      borderRadius: 'var(--radius-xl)',
      padding: '3rem',
      color: 'white',
      minHeight: '280px',
      overflow: 'hidden',
      transition: 'background 0.6s ease',
      boxShadow: 'var(--shadow-lg)',
    }}>
      {/* Decorative blob */}
      <div style={{
        position: 'absolute', right: '-60px', top: '-60px',
        width: '220px', height: '220px', borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.08)',
      }} />
      <div style={{
        position: 'absolute', right: '60px', bottom: '-80px',
        width: '160px', height: '160px', borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.05)',
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>{slide.title}</h2>
        <p style={{ opacity: 0.85, fontSize: '1rem', maxWidth: '500px' }}>{slide.subtitle}</p>

        {slide.type === 'chart' && (
          <BarChart data={slide.data} labels={slide.labels} color={slide.color} />
        )}
        {(slide.type === 'announcement' || slide.type === 'facility') && (
          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {slide.icon}
            <Button variant="outline" style={{ borderColor: 'white', color: 'white', marginTop: '0' }}>
              Learn More
            </Button>
          </div>
        )}
      </div>

      {/* Controls */}
      <button onClick={prev} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
        <ChevronLeft size={18} />
      </button>
      <button onClick={next} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 3 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? '20px' : '8px', height: '8px', borderRadius: '4px', border: 'none', backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
        ))}
      </div>
    </div>
  );
};

// ── Quick Link Card ────────────────────────────────────────────
const QuickLinkCard = ({ icon, title, desc, bg, linkText }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer', transition: 'transform 0.2s', borderTop: `4px solid ${bg}` }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${bg}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: bg }}>
      {icon}
    </div>
    <div>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{title}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{desc}</p>
      <Button variant="outline" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>{linkText}</Button>
    </div>
  </div>
);

// ── Stats Bar ──────────────────────────────────────────────────
const StatBadge = ({ icon, label, value, color }) => (
  <div className="card flex items-center gap-4" style={{ padding: '1rem 1.5rem', borderLeft: `4px solid ${color}` }}>
    <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</div>
    </div>
  </div>
);

// ── HomePage ───────────────────────────────────────────────────
const HomePage = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Navbar />
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Slider */}
      <Slider />

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <StatBadge icon={<GraduationCap size={22} />} label="Total Students" value="520" color="#3B82F6" />
        <StatBadge icon={<Users size={22} />} label="Teaching Staff" value="38" color="#10B981" />
        <StatBadge icon={<TrendingUp size={22} />} label="Attendance Rate" value="94%" color="#F97316" />
        <StatBadge icon={<BookOpen size={22} />} label="Active Classes" value="18" color="#8B5CF6" />
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="heading-1" style={{ marginBottom: '1.25rem' }}>Quick Links</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <QuickLinkCard icon={<BookOpen size={24} />} title="School Fee Payment" desc="Pay your term fees securely online." bg="#3B82F6" linkText="Pay Now →" />
          <QuickLinkCard icon={<Bus size={24} />} title="Bus Fee Payment" desc="Check and pay monthly transport fees." bg="#F97316" linkText="Pay Now →" />
          <QuickLinkCard icon={<Calendar size={24} />} title="Academic Calendar" desc="View exam dates, holidays & events." bg="#10B981" linkText="View Calendar →" />
          <QuickLinkCard icon={<Bell size={24} />} title="Notices & Circulars" desc="Latest announcements from the Madrasa." bg="#8B5CF6" linkText="View All →" />
        </div>
      </div>

      {/* About section */}
      <Card style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Bidayathul Hidaya Madrasa</h2>
            <p style={{ opacity: 0.85, maxWidth: '500px', fontSize: '0.95rem' }}>Providing quality Islamic and modern education since 1998. Nurturing the next generation with faith, knowledge and character.</p>
          </div>
          <Button style={{ backgroundColor: 'white', color: 'var(--primary-blue)', fontWeight: 600, padding: '0.75rem 1.5rem' }}>
            Apply for Admission
          </Button>
        </div>
      </Card>
    </div>
  </div>
);

export default HomePage;
