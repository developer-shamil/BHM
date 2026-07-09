/**
 * src/data/mockUsers.js
 * 
 * Central source of truth for all mock users and their role/class assignments.
 * In production this would be replaced by a real API call.
 */

export const ROLES = {
  PRINCIPAL: 'principal',
  TEACHER:   'teacher',
  BUS_DRIVER: 'bus_driver',
  STUDENT:   'student',
};

/**
 * Each user object:
 *  id          – unique user ID
 *  username    – login username
 *  password    – plain-text (mock only – never do this in production)
 *  role        – one of ROLES
 *  name        – display name
 *  avatar      – avatar URL
 *  assignedClass – (teacher only) the class they manage, e.g. "Grade 10A"
 *  studentId   – (student only) links to a record in allStudents
 *  busRoute    – (bus_driver only) which route they manage
 */
export const mockUsers = [
  // ── Principal ────────────────────────────────────────────────
  {
    id: 'u-principal',
    username: 'principal',
    password: 'admin123',
    role: ROLES.PRINCIPAL,
    name: 'Principal Ahmed',
    avatar: 'https://i.pravatar.cc/100?img=11',
  },

  // ── Teachers ─────────────────────────────────────────────────
  {
    id: 'u-teacher-10',
    username: 'teacher_10',
    password: 'teacher123',
    role: ROLES.TEACHER,
    name: 'Mrs. Hana (Grade 10)',
    avatar: 'https://i.pravatar.cc/100?img=23',
    assignedClass: 'Grade 10A',
  },
  {
    id: 'u-teacher-7',
    username: 'teacher_7',
    password: 'teacher123',
    role: ROLES.TEACHER,
    name: 'Mrs. Zainab (Grade 7)',
    avatar: 'https://i.pravatar.cc/100?img=20',
    assignedClass: 'Grade 7A',
  },
  {
    id: 'u-teacher-5',
    username: 'teacher_5',
    password: 'teacher123',
    role: ROLES.TEACHER,
    name: 'Mr. Abdullah (Grade 5)',
    avatar: 'https://i.pravatar.cc/100?img=10',
    assignedClass: 'Grade 5B',
  },

  // ── Bus Drivers ───────────────────────────────────────────────
  {
    id: 'u-driver-1',
    username: 'driver1',
    password: 'driver123',
    role: ROLES.BUS_DRIVER,
    name: 'Driver Hassan',
    avatar: 'https://i.pravatar.cc/100?img=30',
    busRoute: 'Route A – Calicut North',
  },
  {
    id: 'u-driver-2',
    username: 'driver2',
    password: 'driver123',
    role: ROLES.BUS_DRIVER,
    name: 'Driver Rashid',
    avatar: 'https://i.pravatar.cc/100?img=31',
    busRoute: 'Route B – Calicut South',
  },

  // ── Students ─────────────────────────────────────────────────
  {
    id: 'u-student-1',
    username: 'ahmed_farhan',
    password: 'student123',
    role: ROLES.STUDENT,
    name: 'Ahmed Farhan',
    avatar: 'https://i.pravatar.cc/100?img=1',
    studentId: 'BHM-001',
  },
  {
    id: 'u-student-2',
    username: 'sara_banu',
    password: 'student123',
    role: ROLES.STUDENT,
    name: 'Sara Banu',
    avatar: 'https://i.pravatar.cc/100?img=5',
    studentId: 'BHM-002',
  },
  {
    id: 'u-student-3',
    username: 'fatima_noor',
    password: 'student123',
    role: ROLES.STUDENT,
    name: 'Fatima Noor',
    avatar: 'https://i.pravatar.cc/100?img=9',
    studentId: 'BHM-004',
  },
];

/**
 * All students in the school, keyed by class so teachers can filter.
 * Each student also has a `userId` linking to mockUsers above (for student login).
 */
export const allStudents = [
  // Grade 7A ──────────────────────────────────────────────────
  { id: 1, studentId: 'BHM-001', userId: 'u-student-1', name: 'Ahmed Farhan',  class: 'Grade 7A', roll: 'BHM-001', attendance: 'Present', score: 88, avatar: 'https://i.pravatar.cc/40?img=1',  phone: '+91 98765 43210', parent: 'Mr. Farhan Khalid', dob: '12 Mar 2013', address: 'No. 14, Rose Nagar, Calicut' },
  { id: 2, studentId: 'BHM-002', userId: 'u-student-2', name: 'Sara Banu',     class: 'Grade 7A', roll: 'BHM-002', attendance: 'Present', score: 92, avatar: 'https://i.pravatar.cc/40?img=5',  phone: '+91 87654 32109', parent: 'Mr. Banu Rashid',   dob: '5 Jun 2013',  address: 'No. 8, Green Street, Calicut' },
  { id: 3, studentId: 'BHM-003', userId: null,           name: 'Khalid Hamza', class: 'Grade 7A', roll: 'BHM-003', attendance: 'Absent',  score: 75, avatar: 'https://i.pravatar.cc/40?img=3',  phone: '+91 76543 21098', parent: 'Mr. Hamza Ali',     dob: '22 Jan 2013', address: 'No. 22, Hill View, Calicut' },
  { id: 4, studentId: 'BHM-004', userId: 'u-student-3', name: 'Fatima Noor',  class: 'Grade 7A', roll: 'BHM-004', attendance: 'Present', score: 95, avatar: 'https://i.pravatar.cc/40?img=9',  phone: '+91 65432 10987', parent: 'Mr. Noor Ibrahim',  dob: '8 Sep 2013',  address: 'No. 5, Palm Avenue, Calicut' },
  { id: 5, studentId: 'BHM-005', userId: null,           name: 'Umar Siddiq', class: 'Grade 7A', roll: 'BHM-005', attendance: 'Present', score: 80, avatar: 'https://i.pravatar.cc/40?img=4',  phone: '+91 54321 09876', parent: 'Mr. Siddiq Omar',   dob: '30 Apr 2013', address: 'No. 17, Lake Road, Calicut' },

  // Grade 10A ─────────────────────────────────────────────────
  { id: 6,  studentId: 'BHM-010', userId: null, name: 'Zaid Malik',     class: 'Grade 10A', roll: 'BHM-010', attendance: 'Present', score: 91, avatar: 'https://i.pravatar.cc/40?img=13', phone: '+91 91234 56789', parent: 'Mr. Malik Zain',    dob: '3 Feb 2010',  address: 'No. 2, East Side, Calicut' },
  { id: 7,  studentId: 'BHM-011', userId: null, name: 'Ruqayya Bint',   class: 'Grade 10A', roll: 'BHM-011', attendance: 'Absent',  score: 78, avatar: 'https://i.pravatar.cc/40?img=16', phone: '+91 90123 45678', parent: 'Mr. Bint Hassan',   dob: '19 Aug 2010', address: 'No. 9, West Lane, Calicut' },
  { id: 8,  studentId: 'BHM-012', userId: null, name: 'Hassan Tariq',   class: 'Grade 10A', roll: 'BHM-012', attendance: 'Present', score: 85, avatar: 'https://i.pravatar.cc/40?img=14', phone: '+91 89012 34567', parent: 'Mr. Tariq Bilal',   dob: '7 Dec 2010',  address: 'No. 33, North Block, Calicut' },
  { id: 9,  studentId: 'BHM-013', userId: null, name: 'Amina Syed',     class: 'Grade 10A', roll: 'BHM-013', attendance: 'Present', score: 96, avatar: 'https://i.pravatar.cc/40?img=17', phone: '+91 78901 23456', parent: 'Mr. Syed Riyaz',    dob: '14 May 2010', address: 'No. 11, Central Park, Calicut' },
  { id: 10, studentId: 'BHM-014', userId: null, name: 'Bilal Farooq',   class: 'Grade 10A', roll: 'BHM-014', attendance: 'Present', score: 70, avatar: 'https://i.pravatar.cc/40?img=15', phone: '+91 67890 12345', parent: 'Mr. Farooq Ahmed',  dob: '28 Oct 2010', address: 'No. 7, South Street, Calicut' },

  // Grade 5B ──────────────────────────────────────────────────
  { id: 11, studentId: 'BHM-020', userId: null, name: 'Ibrahim Ali',    class: 'Grade 5B', roll: 'BHM-020', attendance: 'Present', score: 82, avatar: 'https://i.pravatar.cc/40?img=7',  phone: '+91 56789 01234', parent: 'Mr. Ali Hassan',    dob: '11 Jan 2015', address: 'No. 6, River View, Calicut' },
  { id: 12, studentId: 'BHM-021', userId: null, name: 'Hafsa Banu',     class: 'Grade 5B', roll: 'BHM-021', attendance: 'Absent',  score: 74, avatar: 'https://i.pravatar.cc/40?img=8',  phone: '+91 45678 90123', parent: 'Mr. Banu Siddiq',   dob: '25 Mar 2015', address: 'No. 21, Old Town, Calicut' },
  { id: 13, studentId: 'BHM-022', userId: null, name: 'Mariam Riyaz',   class: 'Grade 5B', roll: 'BHM-022', attendance: 'Present', score: 89, avatar: 'https://i.pravatar.cc/40?img=6',  phone: '+91 34567 89012', parent: 'Mr. Riyaz Omar',    dob: '9 Jul 2015',  address: 'No. 3, Garden Colony, Calicut' },
  { id: 14, studentId: 'BHM-023', userId: null, name: 'Yusuf Rashed',   class: 'Grade 5B', roll: 'BHM-023', attendance: 'Present', score: 77, avatar: 'https://i.pravatar.cc/40?img=2',  phone: '+91 23456 78901', parent: 'Mr. Rashed Khalid', dob: '17 Nov 2015', address: 'No. 44, New Block, Calicut' },
];

/** Authenticate a user — returns user object or null */
export function authenticate(username, password) {
  return mockUsers.find(u => u.username === username && u.password === password) || null;
}
