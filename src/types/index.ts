export type UserRole = 'student' | 'faculty' | 'parent' | 'admin';

export interface UserProfile {
  id: string;
  uid?: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  department?: string;
  createdAt?: string;

  // Student specific
  studentId?: string;
  rollNo?: string;
  course?: string;
  year?: number;
  semester?: number;
  dob?: string;
  address?: string;
  fatherName?: string;
  motherName?: string;
  guardianPhone?: string;

  // Faculty specific
  designation?: string;
  qualification?: string;
  specialization?: string;
  experienceYears?: number;

  // Parent specific
  linkedStudentId?: string;
  linkedStudentName?: string;
  linkedRollNo?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  course: string;
  semester: number;
  date: string;
  subject: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  facultyName: string;
}

export interface SubjectAttendance {
  subjectCode: string;
  subjectName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  faculty: string;
}

export interface SemesterResult {
  id: string;
  studentId: string;
  semester: number;
  academicYear: string;
  subjects: {
    code: string;
    name: string;
    credits: number;
    internalMarks: number;
    midMarks: number;
    semesterMarks: number;
    totalMarks: number;
    maxMarks: number;
    grade: string;
    gradePoints: number;
    status: 'PASS' | 'FAIL';
  }[];
  sgpa: number;
  cgpa: number;
  totalCredits: number;
  overallStatus: 'PASSED' | 'FAILED';
}

export interface FeeItem {
  id: string;
  studentId: string;
  semester: number;
  title: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'pending';
  receipts: FeeReceipt[];
}

export interface FeeReceipt {
  receiptNo: string;
  date: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  subject: string;
  faculty: string;
  room: string;
  course: string;
  semester: number;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  course: string;
  semester: number;
  assignedBy: string;
  dueDate: string;
  totalMarks: number;
  attachmentUrl?: string;
  submissionsCount?: number;
  submitted?: boolean;
  submissionStatus?: 'pending' | 'submitted' | 'graded';
  myMarks?: number;
  myFeedback?: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  submittedAt: string;
  fileUrl?: string;
  fileName?: string;
  notes?: string;
  marks?: number;
  feedback?: string;
  status: 'submitted' | 'graded';
}

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  category: 'PDF' | 'Notes' | 'PPT' | 'Videos' | 'Question Papers' | 'Lab Materials';
  department: string;
  course: string;
  semester: number;
  subject: string;
  uploadedBy: string;
  uploadedDate: string;
  fileUrl: string;
  fileSize?: string;
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
  department: string;
  priority: 'normal' | 'important' | 'urgent';
  attachmentUrl?: string;
  author: string;
  pinned?: boolean;
}

export interface CollegeEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  registrationOpen: boolean;
  category: 'academic' | 'sports' | 'cultural' | 'workshop' | 'placement';
  status: 'upcoming' | 'past';
}

export interface PlacementOpportunity {
  id: string;
  company: string;
  logo?: string;
  role: string;
  package: string; // e.g. "₹4.5 - ₹7.0 LPA"
  eligibility: string; // e.g. "BCA, BSc (CS), 65%+ throughout"
  location: string;
  deadline: string;
  selectionProcess: string;
  openings: number;
  applied?: boolean;
  status?: 'Applied' | 'Shortlisted' | 'Selected' | 'Rejected';
}

export interface DepartmentInfo {
  id: string;
  code: string;
  name: string;
  hodName: string;
  hodQualification: string;
  hodImage?: string;
  description: string;
  coursesCount: number;
  facultyCount: number;
  labsCount: number;
}

export interface FacultyMember {
  id: string;
  name: string;
  honorific?: string;
  departmentId: string;
  departmentName: string;
  designation: string;
  qualification: string;
  pdfProfile?: string;
  email?: string;
  phone?: string;
  photo?: string;
  specialization?: string;
  experience?: string;
}

export interface AdmissionApplication {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  gender: 'Male' | 'Female' | 'Others';
  mobile: string;
  email: string;
  dob: string;
  address: string;
  sscSchool: string;
  sscMarks?: string;
  interCollege: string;
  interMarks?: string;
  course: string;
  skills: string[];
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'assignment' | 'exam' | 'attendance' | 'notice' | 'placement' | 'fee';
  read: boolean;
  targetRole?: UserRole | 'all';
  link?: string;
}
