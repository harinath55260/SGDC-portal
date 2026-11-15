import {
  DepartmentInfo,
  FacultyMember,
  Notice,
  CollegeEvent,
  PlacementOpportunity,
  SemesterResult,
  SubjectAttendance,
  FeeItem,
  TimetableSlot,
  Assignment,
  StudyMaterial,
  AdmissionApplication,
  NotificationItem,
  UserProfile
} from '../types';

export const COLLEGE_INFO = {
  name: 'Shri Gnanambica Degree College',
  tagline: '(Autonomous) — An Abode of Learning & Excellence',
  shortName: 'SGDC',
  code: 'SGDC-MDP',
  society: 'Shri Devarshi Educational Society',
  location: '3-153-5, Near R.T.C. Bus Stand, Madanapalle - 517325, Annamayya District, Andhra Pradesh, India',
  phone: '08571-223199 / +91 9440 123 456',
  email: 'gnanambicadegreecollege@gmail.com',
  secondaryEmail: 'info@sgnanambica.edu.in',
  admissionsEmail: 'admissions@sgnanambica.edu.in',
  website: 'http://shrignanambicacollege.edu.in/',
  githubWebsite: 'https://harinath55260.github.io/college-website2026/',
  developer: {
    name: 'K. Harinath',
    github: 'https://github.com/harinath55260',
    role: 'Student & Lead Platform Architect'
  },
  established: 1999,
  accreditation: 'NAAC Accredited Autonomous Institution',
  affiliation: 'Permanently Affiliated to Sri Venkateswara University (SVU), Tirupati',
  recognizedBy: 'APSCHE & Higher Education Department, Govt. of Andhra Pradesh',
  certifications: [
    'NAAC Accredited Institution',
    'ISO 9001:2015 (Quality Management System)',
    'ISO 14001:2015 (Environmental Management System)',
    'ISO 50001:2011 (Energy Management System)'
  ],
  awards: [
    {
      title: 'Top Biotech Institute of the Year 2025',
      awardedBy: 'The Academic Insights',
      year: '2025',
      description: 'Recognized for state-of-the-art laboratory infrastructure, molecular biology research and student innovation in B.Sc. Biotechnology.'
    },
    {
      title: 'Best Emerging Autonomous College in Rayalaseema',
      awardedBy: 'Higher Education Excellence Forum',
      year: '2024',
      description: 'Honored for digital campus modernization, high placement percentages and holistic student development.'
    }
  ],
  aboutText: `Shri Gnanambica Degree College, established in 1999 under the aegis of Shri Devarshi Educational Society, is located conveniently near the R.T.C. Bus Stand in Madanapalle. Permanently affiliated with Sri Venkateswara University (SVU), Tirupati, and accredited by NAAC with ISO 9001, 14001, and 50001 certifications, the college offers 16 versatile undergraduate and postgraduate programs. With over 2,800 students, modern research labs including specialized Biotechnology and Artificial Intelligence facilities, and 100+ distinguished faculty members, SGDC is a premier center of holistic learning, discipline, and career empowerment.`,
  correspondent: {
    name: 'Dr. Ratakonda Guru Prasad',
    honorificName: 'Dr. R. Guru Prasad sir (M.Sc., Ph.D.)',
    title: 'Correspondent & Secretary',
    societyTitle: 'Secretary, Shri Devarshi Educational Society',
    image: '/correspondent.jpg',
    message: `Dr. Ratakonda Guru Prasad is a visionary educational leader committed to providing accessible, high-caliber higher education and fostering overall student empowerment. Under his leadership, Shri Devarshi Educational Society established Shri Gnanambica Degree College in 1999, creating modern campus infrastructure, high-end science and computing research laboratories, and industry-tailored curricula. He encourages faculty and students to embrace innovative pedagogy, ethical character building, and creative entrepreneurship.`
  },
  principal: {
    name: 'Dr. Sri Ramadevi',
    title: 'Principal',
    image: '/principal.jpg',
    qualification: 'M.Sc., M.Phil., Ph.D.',
    message: `Dr. Sri Ramadevi is an accomplished academic administrator with over 20 years of dedication to higher education and student success. Known for academic discipline and student-first leadership, she ensures adherence to autonomous academic regulations, fosters experiential lab learning, and guides faculty toward pedagogical excellence.`
  },
  stats: [
    { label: 'Academic Heritage', value: 'Since 1999', icon: 'Award' },
    { label: 'Enrolled Students', value: '2,830+', icon: 'Users' },
    { label: 'Distinguished Faculty', value: '102+', icon: 'GraduationCap' },
    { label: 'Programs Offered', value: '16 Courses', icon: 'BookOpen' },
    { label: 'Campus Placements', value: '92%', icon: 'Briefcase' },
    { label: 'Research & ISO Labs', value: '18+ Labs', icon: 'Cpu' }
  ]
};

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'cs',
    code: 'CS & AI',
    name: 'Computer Science & Artificial Intelligence',
    hodName: 'Mahesh Sir',
    hodQualification: 'M.Tech, (Ph.D.) - Associate Professor & HOD',
    hodImage: '/images/college4.jpg',
    description: 'Pioneering cutting-edge computer education with advanced labs in AI, Machine Learning, Python, Full-Stack Development, and Cloud Computing.',
    coursesCount: 3,
    facultyCount: 9,
    labsCount: 5
  },
  {
    id: 'commerce',
    code: 'COMM',
    name: 'Commerce & Management',
    hodName: 'Anitha Madam',
    hodQualification: 'M.Com, M.Phil, MBA',
    description: 'Empowering future business leaders and accountants with practical training in Financial Accounting, Tally ERP, Business Analytics, and Taxation.',
    coursesCount: 2,
    facultyCount: 6,
    labsCount: 2
  },
  {
    id: 'physics',
    code: 'PHY',
    name: 'Physics & Applied Sciences',
    hodName: 'Ravi Sir',
    hodQualification: 'M.Sc., B.Ed.',
    description: 'Fostering deep scientific inquiry with well-equipped optics, acoustics, electronics, and solid-state physics laboratories.',
    coursesCount: 2,
    facultyCount: 5,
    labsCount: 3
  },
  {
    id: 'chemistry',
    code: 'CHEM',
    name: 'Chemistry',
    hodName: 'Lakshmi Madam',
    hodQualification: 'M.Sc., CSIR-NET',
    description: 'Hands-on experiential learning in organic, inorganic, analytical, and physical chemistry with modern safety instrumentation.',
    coursesCount: 2,
    facultyCount: 4,
    labsCount: 3
  },
  {
    id: 'maths',
    code: 'MATH',
    name: 'Mathematics & Statistics',
    hodName: 'Kiran Sir',
    hodQualification: 'M.Sc., APSET',
    description: 'Strong foundations in calculus, algebra, probability, mathematical modeling, and quantitative problem-solving for research and careers.',
    coursesCount: 3,
    facultyCount: 5,
    labsCount: 2
  },
  {
    id: 'biotech',
    code: 'BIOTECH',
    name: 'Biotechnology & Life Sciences',
    hodName: 'Dr. Surendra Babu',
    hodQualification: 'M.Sc., Ph.D. (Molecular Biology)',
    description: 'Top Biotech Institute of the Year 2025. Modern molecular genetics, plant tissue culture, microbiology and fermentation laboratories.',
    coursesCount: 2,
    facultyCount: 4,
    labsCount: 4
  },
  {
    id: 'electronics',
    code: 'ELEC',
    name: 'Electronics & Hardware Systems',
    hodName: 'Devendra Nayak Sir',
    hodQualification: 'M.Tech (VLSI & Embedded Systems)',
    description: 'Comprehensive education in microprocessors, digital electronics, IoT sensors, robotics, and communication systems.',
    coursesCount: 1,
    facultyCount: 4,
    labsCount: 3
  },
  {
    id: 'humanities',
    code: 'HUMAN',
    name: 'Humanities, Languages & Physical Education',
    hodName: 'Smt. Radhika Madam',
    hodQualification: 'M.A., M.Phil., (Ph.D.)',
    description: 'English communication labs, Telugu literature, social sciences, and comprehensive physical education & sports training.',
    coursesCount: 2,
    facultyCount: 5,
    labsCount: 2
  }
];

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Mahesh Sir',
    honorific: 'Prof.',
    departmentId: 'cs',
    departmentName: 'Computer Science',
    designation: 'Head of the Department (HOD) & Associate Professor',
    qualification: 'M.Tech (CSE), (Ph.D.)',
    pdfProfile: '/pdfs/computers 6 Mahesh.pdf',
    specialization: 'Artificial Intelligence, Machine Learning & Algorithms',
    experience: '14 Years'
  },
  {
    id: 'fac-2',
    name: 'Rajanikanth Sir',
    honorific: 'Prof.',
    departmentId: 'cs',
    departmentName: 'Computer Science',
    designation: 'Assistant Professor',
    qualification: 'MCA, M.Phil',
    pdfProfile: '/pdfs/profile rajanikanth.pdf',
    specialization: 'Database Management Systems & Web Technologies',
    experience: '11 Years'
  },
  {
    id: 'fac-3',
    name: 'Kavitha Madam',
    honorific: 'Prof.',
    departmentId: 'cs',
    departmentName: 'Computer Science',
    designation: 'Assistant Professor',
    qualification: 'M.Tech (CS)',
    pdfProfile: '/pdfs/computers 4 Kavitha.pdf',
    specialization: 'Object Oriented Programming with Java, Software Engineering',
    experience: '9 Years'
  },
  {
    id: 'fac-4',
    name: 'Devendra Nayak Sir',
    honorific: 'Prof.',
    departmentId: 'cs',
    departmentName: 'Computer Science',
    designation: 'Assistant Professor & HOD Electronics',
    qualification: 'M.Tech (CSE)',
    specialization: 'Computer Networks & Operating Systems',
    experience: '8 Years'
  },
  {
    id: 'fac-5',
    name: 'Megha Vardhan Sir',
    honorific: 'Prof.',
    departmentId: 'cs',
    departmentName: 'Computer Science',
    designation: 'Assistant Professor',
    qualification: 'MCA, M.Tech',
    specialization: 'Cloud Computing & Cyber Security',
    experience: '7 Years'
  },
  {
    id: 'fac-6',
    name: 'Krishna Hasan Sir',
    honorific: 'Prof.',
    departmentId: 'cs',
    departmentName: 'Computer Science',
    designation: 'Assistant Professor',
    qualification: 'M.Sc (CS), B.Ed',
    pdfProfile: '/pdfs/computers 5 krishna hasan.pdf',
    specialization: 'C Programming & Data Structures',
    experience: '10 Years'
  },
  {
    id: 'fac-7',
    name: 'Moulali Sir',
    honorific: 'Prof.',
    departmentId: 'cs',
    departmentName: 'Computer Science',
    designation: 'Assistant Professor',
    qualification: 'MCA',
    pdfProfile: '/pdfs/computers 7 moulali.pdf',
    specialization: 'Python Programming, Deep Learning',
    experience: '8 Years'
  },
  {
    id: 'fac-8',
    name: 'Swethan Sir',
    honorific: 'Prof.',
    departmentId: 'cs',
    departmentName: 'Computer Science',
    designation: 'Assistant Professor',
    qualification: 'M.Tech',
    pdfProfile: '/pdfs/computers 10 swethan.pdf',
    specialization: 'Data Mining & Big Data Analytics',
    experience: '6 Years'
  },
  {
    id: 'fac-9',
    name: 'Teja Sir',
    honorific: 'Prof.',
    departmentId: 'cs',
    departmentName: 'Computer Science',
    designation: 'Assistant Professor',
    qualification: 'M.Sc (CS)',
    pdfProfile: '/pdfs/computers 11 teja.pdf',
    specialization: 'Digital Logic & Microprocessors',
    experience: '5 Years'
  },
  {
    id: 'fac-10',
    name: 'Dr. Anitha Madam',
    honorific: 'Dr.',
    departmentId: 'commerce',
    departmentName: 'Commerce',
    designation: 'HOD & Associate Professor',
    qualification: 'M.Com, M.Phil, Ph.D.',
    specialization: 'Financial Accounting, Cost Auditing & Corporate Law',
    experience: '16 Years'
  },
  {
    id: 'fac-10b',
    name: 'Sri B. V. Ramanjaneyulu Sir',
    honorific: 'Prof.',
    departmentId: 'commerce',
    departmentName: 'Commerce',
    designation: 'Assistant Professor',
    qualification: 'M.Com, MBA',
    specialization: 'Income Tax, GST & Auditing',
    experience: '10 Years'
  },
  {
    id: 'fac-10c',
    name: 'Smt. Swapna Madam',
    honorific: 'Prof.',
    departmentId: 'commerce',
    departmentName: 'Commerce',
    designation: 'Assistant Professor',
    qualification: 'M.Com',
    specialization: 'TallyPrime, Banking & E-Commerce',
    experience: '7 Years'
  },
  {
    id: 'fac-11',
    name: 'Ravi Sir',
    honorific: 'Prof.',
    departmentId: 'physics',
    departmentName: 'Physics',
    designation: 'HOD & Senior Lecturer (NCC Officer)',
    qualification: 'M.Sc, B.Ed',
    specialization: 'Modern Physics, Optics & Spectroscopy',
    experience: '15 Years'
  },
  {
    id: 'fac-11b',
    name: 'Sri Srinivasulu Sir',
    honorific: 'Prof.',
    departmentId: 'physics',
    departmentName: 'Physics',
    designation: 'Lecturer in Physics',
    qualification: 'M.Sc.',
    specialization: 'Solid State Physics & Electronics',
    experience: '8 Years'
  },
  {
    id: 'fac-12',
    name: 'Dr. Lakshmi Madam',
    honorific: 'Dr.',
    departmentId: 'chemistry',
    departmentName: 'Chemistry',
    designation: 'HOD & Assistant Professor',
    qualification: 'M.Sc, Ph.D.',
    specialization: 'Organic Synthesis, Medicinal Chemistry & Analytical Methods',
    experience: '12 Years'
  },
  {
    id: 'fac-12b',
    name: 'Sri Venkatesh Sir',
    honorific: 'Prof.',
    departmentId: 'chemistry',
    departmentName: 'Chemistry',
    designation: 'Assistant Professor',
    qualification: 'M.Sc (Chemistry)',
    specialization: 'Inorganic Chemistry & Lab Instrumentation',
    experience: '9 Years'
  },
  {
    id: 'fac-13',
    name: 'Kiran Sir',
    honorific: 'Prof.',
    departmentId: 'maths',
    departmentName: 'Mathematics',
    designation: 'HOD & Associate Professor',
    qualification: 'M.Sc, APSET',
    specialization: 'Differential Equations & Numerical Methods',
    experience: '13 Years'
  },
  {
    id: 'fac-13b',
    name: 'Sri Gangadhar Sir',
    honorific: 'Prof.',
    departmentId: 'maths',
    departmentName: 'Mathematics',
    designation: 'Assistant Professor in Statistics',
    qualification: 'M.Sc. (Statistics)',
    specialization: 'Probability Distributions, Biostatistics & R Analytics',
    experience: '9 Years'
  },
  {
    id: 'fac-14',
    name: 'Dr. Surendra Babu',
    honorific: 'Dr.',
    departmentId: 'biotech',
    departmentName: 'Biotechnology',
    designation: 'HOD & Associate Professor',
    qualification: 'M.Sc., Ph.D.',
    specialization: 'Molecular Biology, Genetic Engineering & Recombinant DNA',
    experience: '15 Years'
  },
  {
    id: 'fac-14b',
    name: 'Smt. Sridevi Madam',
    honorific: 'Prof.',
    departmentId: 'biotech',
    departmentName: 'Biotechnology',
    designation: 'Assistant Professor in Biotechnology',
    qualification: 'M.Sc. (Biotech)',
    specialization: 'Plant Tissue Culture & Microbial Biotechnology',
    experience: '8 Years'
  },
  {
    id: 'fac-14c',
    name: 'Sri Sudhakar Sir',
    honorific: 'Prof.',
    departmentId: 'biotech',
    departmentName: 'Biotechnology',
    designation: 'Assistant Professor in Botany & Life Sciences',
    qualification: 'M.Sc.',
    specialization: 'Immunology & Clinical Biochemistry',
    experience: '7 Years'
  },
  {
    id: 'fac-15',
    name: 'Smt. Radhika Madam',
    honorific: 'Prof.',
    departmentId: 'humanities',
    departmentName: 'Humanities & Languages',
    designation: 'HOD & Associate Professor of English',
    qualification: 'M.A., M.Phil., (Ph.D.)',
    specialization: 'Phonetics, Business English & Soft Skills',
    experience: '14 Years'
  },
  {
    id: 'fac-15b',
    name: 'Sri Chandrasekhar Sir',
    honorific: 'Prof.',
    departmentId: 'humanities',
    departmentName: 'Humanities & Languages',
    designation: 'Lecturer in Telugu Literature',
    qualification: 'M.A. (Telugu), NET',
    specialization: 'Telugu Classical Literature & Cultural Arts',
    experience: '11 Years'
  },
  {
    id: 'fac-16',
    name: 'Sri Venkat Reddy Sir',
    honorific: 'Prof.',
    departmentId: 'humanities',
    departmentName: 'Physical Education & Sports',
    designation: 'Physical Education Director',
    qualification: 'M.P.Ed, M.Phil',
    specialization: 'Athletic Coaching, Cricket & Volleyball Training',
    experience: '16 Years'
  },
  {
    id: 'fac-17',
    name: 'Sri Bhaskar Rao Sir',
    honorific: 'Sri',
    departmentId: 'humanities',
    departmentName: 'Library & Information Science',
    designation: 'Chief Librarian',
    qualification: 'M.L.I.Sc, PGDCA',
    specialization: 'DELNET, NDL E-Resources & Digital Cataloging',
    experience: '18 Years'
  }
];

export const COURSES = [
  {
    id: 'bca-ai',
    name: 'BCA - Artificial Intelligence',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate (UG Honours)',
    seats: 60,
    eligibility: 'Pass in 10+2 / Intermediate with Mathematics or Computer Science',
    department: 'Computer Science',
    highlights: ['Machine Learning', 'Deep Learning', 'Python & Java', 'Cloud Computing', 'AI Capstone Projects'],
    feePerYear: 32000,
    syllabus: [
      {
        semester: 1,
        subjects: ['Mathematics-I', 'Physics', 'C Programming', 'English & Communication', 'Environmental Science']
      },
      {
        semester: 2,
        subjects: ['Mathematics-II', 'Data Structures', 'Electrical Engineering & Circuits', 'Soft Skills & Personality', 'Computer Organization & Architecture']
      },
      {
        semester: 3,
        subjects: ['Digital Logic Design', 'Probability & Statistics', 'Object Oriented Programming with Java', 'Operating Systems', 'Database Management System (DBMS)']
      },
      {
        semester: 4,
        subjects: ['Computer Networks', 'Microprocessors & Microcontrollers', 'Software Engineering', 'Artificial Intelligence Foundations', 'Web Technologies & Frameworks']
      },
      {
        semester: 5,
        subjects: ['Machine Learning Techniques', 'Cloud Computing & DevOps', 'Data Mining & Warehousing', 'Cryptography & Network Security', 'Python for Data Science']
      },
      {
        semester: 6,
        subjects: ['Deep Learning & Neural Networks', 'Big Data Analytics', 'Mobile Computing (Android & Flutter)', 'Blockchain Technology', 'Autonomous Capstone Major Project']
      }
    ]
  },
  {
    id: 'bca-regular',
    name: 'BCA (Bachelor of Computer Applications)',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    seats: 90,
    eligibility: 'Pass in Intermediate / 10+2 with MPC or MEC',
    department: 'Computer Science',
    highlights: ['Full-Stack Web Dev', 'RDBMS', 'Cybersecurity', 'Mobile Apps', 'Internships'],
    feePerYear: 28000
  },
  {
    id: 'bsc-biotech',
    name: 'B.Sc. Biotechnology, Botany, Chemistry (BtBC)',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate (Award Winning)',
    seats: 60,
    eligibility: 'Pass in Intermediate / 10+2 with Bi.P.C or equivalent',
    department: 'Biotechnology & Life Sciences',
    highlights: ['Top Biotech Institute 2025 Awardee', 'Molecular Biology Lab', 'Genetic Engineering', 'Plant Tissue Culture', 'Pharma Internships'],
    feePerYear: 26000
  },
  {
    id: 'bsc-datascience',
    name: 'B.Sc. Data Science & Big Data Analytics',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    seats: 60,
    eligibility: 'Intermediate with MPC / MEC',
    department: 'Computer Science',
    highlights: ['Python for Data Analysis', 'Apache Spark & Hadoop', 'Tableau & PowerBI', 'Predictive Modeling'],
    feePerYear: 28000
  },
  {
    id: 'bsc-mpcs',
    name: 'B.Sc. Mathematics, Physics, Computer Science (MPCS)',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    seats: 120,
    eligibility: 'Intermediate MPC',
    department: 'Computer Science & Sciences',
    highlights: ['Differential Calculus', 'Modern Optics & Spectroscopy', 'C++ & Python Programming', 'Scientific Computing'],
    feePerYear: 24000
  },
  {
    id: 'bsc-mecs',
    name: 'B.Sc. Mathematics, Electronics, Computer Science (MECS)',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    seats: 60,
    eligibility: 'Intermediate MPC',
    department: 'Electronics & Computer Science',
    highlights: ['VLSI & Embedded Systems', 'Microprocessor 8086/ARM', 'IoT Sensor Networks', 'Object Oriented Programming'],
    feePerYear: 24000
  },
  {
    id: 'bsc-mscs',
    name: 'B.Sc. Mathematics, Statistics, Computer Science (MSCS)',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    seats: 60,
    eligibility: 'Intermediate MPC / MEC',
    department: 'Mathematics & Statistics',
    highlights: ['Actuarial Statistics', 'Probability Theory', 'R & Python Analytics', 'Database Systems'],
    feePerYear: 24000
  },
  {
    id: 'bsc-cbz',
    name: 'B.Sc. Chemistry, Botany, Zoology (CBZ)',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    seats: 60,
    eligibility: 'Intermediate Bi.P.C',
    department: 'Life Sciences & Chemistry',
    highlights: ['Organic & Inorganic Syntheses', 'Taxonomy & Medicinal Flora', 'Cell Biology & Physiology'],
    feePerYear: 22000
  },
  {
    id: 'bba',
    name: 'BBA (Bachelor of Business Administration)',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    seats: 60,
    eligibility: 'Intermediate (Any Stream)',
    department: 'Commerce & Management',
    highlights: ['Entrepreneurship & Startups', 'Marketing & Sales', 'HR Management', 'Business Analytics'],
    feePerYear: 26000
  },
  {
    id: 'bba-digital',
    name: 'BBA (Digital Marketing & E-Commerce Analytics)',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    seats: 60,
    eligibility: 'Intermediate (Any Stream)',
    department: 'Commerce & Management',
    highlights: ['SEO & Performance Marketing', 'Social Media Strategy', 'E-Commerce Operations', 'Financial Modeling'],
    feePerYear: 28000
  },
  {
    id: 'bcom-ca',
    name: 'B.Com. (Computer Applications)',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    seats: 120,
    eligibility: 'Intermediate (Commerce / Arts / Science)',
    department: 'Commerce',
    highlights: ['TallyPrime with GST', 'Corporate Accounting', 'E-Commerce Applications', 'Banking & Insurance'],
    feePerYear: 22000
  },
  {
    id: 'bcom-gen',
    name: 'B.Com. (General & Taxation)',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    seats: 60,
    eligibility: 'Intermediate (Commerce / Arts / Science)',
    department: 'Commerce',
    highlights: ['Direct & Indirect Tax Laws', 'Auditing Standards', 'Cost Accounting', 'Financial Management'],
    feePerYear: 20000
  },
  {
    id: 'bsw',
    name: 'BSW (Bachelor of Social Work)',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    seats: 40,
    eligibility: 'Intermediate (Any stream)',
    department: 'Social Sciences',
    highlights: ['Community Development', 'NGO Management', 'Social Research', 'Rural Immersion Camps'],
    feePerYear: 18000
  },
  {
    id: 'ba',
    name: 'B.A. (History, Economics, Political Science - HEP)',
    duration: '3 Years (6 Semesters)',
    type: 'Undergraduate',
    seats: 60,
    eligibility: 'Intermediate (Any stream)',
    department: 'Arts & Humanities',
    highlights: ['Civil Services & APPSC Coaching', 'Constitutional Law', 'Indian & Global Economy', 'Public Policy'],
    feePerYear: 16000
  },
  {
    id: 'msc-chem',
    name: 'M.Sc. Organic Chemistry',
    duration: '2 Years (4 Semesters)',
    type: 'Postgraduate (PG)',
    seats: 30,
    eligibility: 'B.Sc. with Chemistry as core subject',
    department: 'Postgraduate Studies',
    highlights: ['Advanced Spectroscopy', 'Drug Synthesis & Formulations', 'Pharma Analytical Labs', 'CSIR-NET Prep'],
    feePerYear: 36000
  },
  {
    id: 'msc-cs',
    name: 'M.Sc. Computer Science',
    duration: '2 Years (4 Semesters)',
    type: 'Postgraduate (PG)',
    seats: 40,
    eligibility: 'BCA / B.Sc Computer Science / B.Sc MPCS',
    department: 'Postgraduate Studies',
    highlights: ['Advanced Algorithms', 'Cloud Architecture', 'Natural Language Processing', 'Master Dissertation'],
    feePerYear: 38000
  }
];

export const INSTITUTIONAL_CELLS = [
  {
    id: 'anti-ragging',
    name: 'Anti-Ragging Committee & Flying Squad',
    head: 'Dr. Sri Ramadevi (Principal & Chairperson)',
    helpline: 'Toll-Free 1800-180-5522 / 08571-223199',
    description: 'Strict zero-tolerance policy against any form of ragging or harassment. 24x7 flying squads monitor campus, laboratories, and the RTC bus station route.',
    badge: 'Statutory Body'
  },
  {
    id: 'wec',
    name: 'Women Empowerment Cell (WEC) & ICC',
    head: 'Dr. Anitha Madam (Convener)',
    helpline: '+91 9440 987 654',
    description: 'Empowers female students and faculty through leadership programs, health camps, cybersecurity workshops, and redressal mechanisms.',
    badge: 'Gender Equity'
  },
  {
    id: 'iqac',
    name: 'Internal Quality Assurance Cell (IQAC)',
    head: 'Prof. Mahesh Sir (Coordinator)',
    helpline: 'iqac@shrignanambicacollege.edu.in',
    description: 'Coordinates NAAC quality audits, faculty development programs, institutional benchmarking, and ISO 9001/14001 compliance.',
    badge: 'Quality & NAAC'
  },
  {
    id: 'ncc-nss',
    name: 'National Cadet Corps (NCC) & NSS Units',
    head: 'Lt. Ravi Sir (ANO) & NSS Program Officers',
    helpline: '08571-223199',
    description: 'Active Army Wing NCC platoon and two NSS units organizing blood donation drives, flood relief, Swachh Bharat, and Republic Day camps.',
    badge: 'Community & Defense'
  },
  {
    id: 'placement-cell',
    name: 'Career Guidance & Placement Cell (CRPC)',
    head: 'Dr. Ratakonda Guru Prasad sir (Chief Patron)',
    helpline: 'gnanambicadegreecollege@gmail.com',
    description: 'Conducts industry aptitude tests, coding bootcamps, and mock interviews. Tied with 65+ MNC recruiters including TCS, Infosys, Wipro, and ICICI.',
    badge: 'Career Gateway'
  },
  {
    id: 'edc',
    name: 'Entrepreneurship Development Cell (EDC)',
    head: 'Dr. Lakshmi Madam',
    helpline: '08571-223199',
    description: 'Fosters student innovation, rural technology prototypes, MSME incubation, and patent awareness in Rayalaseema region.',
    badge: 'Startups & Innovation'
  }
];

export const CAMPUS_FACILITIES = [
  {
    id: 'fac-1',
    title: 'Modern AI & Computing Laboratories',
    description: 'Over 250 high-end workstations equipped with NVIDIA GPUs, gigabit fiber network, and latest enterprise development tools.',
    image: '/images/college4.jpg',
    tag: 'Technology'
  },
  {
    id: 'fac-2',
    title: 'Central Digital Library',
    description: 'Comprehensive repository of over 35,000 textbooks, DELNET, IEEE digital explorer subscriptions, and serene reading halls.',
    image: '/images/college6.jpg',
    tag: 'Academic'
  },
  {
    id: 'fac-3',
    title: 'Auditorium & Seminar Halls',
    description: 'Acoustically treated 800-seat main auditorium and 3 audiovisual seminar halls for conferences, seminars, and cultural meets.',
    image: '/images/college8.jpg',
    tag: 'Events'
  },
  {
    id: 'fac-4',
    title: 'Extensive Sports Complex & Grounds',
    description: 'Full-size cricket ground, volleyball courts, basketball court, badminton hall, and athletic track with dedicated physical directors.',
    image: '/images/sport1.jpg',
    tag: 'Sports'
  },
  {
    id: 'fac-5',
    title: 'Campus Wi-Fi & Smart Classrooms',
    description: 'Interactive smart boards, high-definition digital projectors, and college-wide high-speed Wi-Fi coverage for blended learning.',
    image: '/images/college7.jpg',
    tag: 'Infrastructure'
  },
  {
    id: 'fac-6',
    title: 'Dedicated Placement & Training Cell',
    description: 'Specialized interview suites, GD rooms, aptitude testing halls, and industry skill labs run by certified trainers.',
    image: '/images/college10.jpg',
    tag: 'Career'
  }
];

export const SPORTS_ITEMS = [
  { id: 1, title: 'Annual Inter-Collegiate Cricket Championship', img: '/images/sport1.jpg' },
  { id: 2, title: 'State Level Volleyball Tournament', img: '/images/sport2.jpg' },
  { id: 3, title: 'Track & Field Athletics Meet', img: '/images/sport3.jpg' },
  { id: 4, title: 'Inter-Department Football Trophy', img: '/images/sport4.jpg' },
  { id: 5, title: 'Indoor Badminton & Table Tennis Arena', img: '/images/sport5.jpg' },
  { id: 6, title: 'Kabaddi League Finals', img: '/images/sport6.jpg' },
  { id: 7, title: 'Chess & Carrom Championship', img: '/images/sport7.jpg' },
  { id: 8, title: 'Basketball District Level Tournament', img: '/images/sport8.jpg' },
  { id: 9, title: 'College Sports Day Celebrations', img: '/images/sport9.jpg' },
  { id: 10, title: 'Annual Trophy Distribution & Champions', img: '/images/sport10.jpg' },
  { id: 11, title: 'Physical Fitness & Yoga Bootcamp', img: '/images/sport11.jpg' },
  { id: 12, title: 'SGDC Sports Captains & Gold Medalists', img: '/images/sport12.jpg' }
];

export const GALLERY_IMAGES = [
  { id: 1, url: '/images/college4.jpg', caption: 'Main Campus Academic Block & Entrance' },
  { id: 2, url: '/images/college1.jpg', caption: 'Administrative Wing & Gardens' },
  { id: 3, url: '/images/college5.jpg', caption: 'Faculty & Student Collaborative Zone' },
  { id: 4, url: '/images/college6.jpg', caption: 'Central Digital Research Library' },
  { id: 5, url: '/images/college7.jpg', caption: 'Advanced Computer & Artificial Intelligence Lab' },
  { id: 6, url: '/images/college8.jpg', caption: 'Conference & Convocation Auditorium' },
  { id: 7, url: '/images/college9.jpg', caption: 'Science & Physics Experimental Lab' },
  { id: 8, url: '/images/college2.jpg', caption: 'Student Activity Center' },
  { id: 9, url: '/images/college10.jpg', caption: 'Placement Drives & Interview Suites' },
  { id: 10, url: '/images/college3.jpg', caption: 'Green Campus Quadrant' },
  { id: 11, url: '/images/college11.jpg', caption: 'Cultural Celebrations & TechFest' },
  { id: 12, url: '/images/college12.jpg', caption: 'Graduation Day Celebrations' }
];

export const NOTICES: Notice[] = [
  {
    id: 'not-1',
    title: 'Autonomous End Semester Examinations (Even Sem) - Official Timetable Released',
    description: 'All regular and supplementary students of BCA, B.Sc, BBA, and B.Com are informed that Semester II, IV, and VI examinations will commence from October 20, 2026. Hall tickets can be downloaded from the student portal.',
    date: '2026-10-01',
    department: 'Controller of Examinations',
    priority: 'urgent',
    author: 'Chief Superintendent of Exams',
    pinned: true
  },
  {
    id: 'not-2',
    title: 'Wipro & Infosys Campus Recruitment Drive for 2026 Graduating Batch',
    description: 'Registration is open for BCA, BSc (CS/Maths) final year students with 60% and above. Online technical aptitude round scheduled on October 14, 2026 in Labs 1-4.',
    date: '2026-09-28',
    department: 'Placement & Career Cell',
    priority: 'important',
    author: 'Placement Officer',
    pinned: true
  },
  {
    id: 'not-3',
    title: 'Fee Payment Deadline for Academic Year 2026-27 (Term 2)',
    description: 'Students who have pending fee dues for Term 2 must clear the payments via online student portal or college fee counter before October 15, 2026 to avoid late fee penalties.',
    date: '2026-09-25',
    department: 'Accounts Office',
    priority: 'important',
    author: 'Finance Officer'
  },
  {
    id: 'not-4',
    title: 'Annual State Level TechFest & Codeathon "GNANA-FEST 2026"',
    description: 'Department of Computer Science invites students to submit entries for Web Design, Paper Presentation, Coding Hackathon, and AI Prompt Engineering by October 10.',
    date: '2026-09-22',
    department: 'Computer Science',
    priority: 'normal',
    author: 'HOD Computer Science'
  },
  {
    id: 'not-5',
    title: 'Minimum 75% Attendance Requirement for Semester End Exams',
    description: 'Students with attendance below 75% will be placed in the condonation list. Students below 65% will not be permitted for semester examinations as per Autonomous Academic Regulations.',
    date: '2026-09-20',
    department: 'Principal Office',
    priority: 'urgent',
    author: 'Principal Dr. Sri Ramadevi'
  }
];

export const EVENTS: CollegeEvent[] = [
  {
    id: 'evt-1',
    title: 'GNANA-TECH 2026: National Level Technical Symposium',
    description: 'Flagship national technical symposium featuring Paper Presentations, AI Hackathons, Bug Hunting, Project Expo, and Guest Lectures from industry leaders.',
    image: '/images/college11.jpg',
    date: '2026-10-18',
    time: '09:30 AM - 05:00 PM',
    location: 'Main Auditorium & CS Labs',
    organizer: 'Department of Computer Science',
    registrationOpen: true,
    category: 'workshop',
    status: 'upcoming'
  },
  {
    id: 'evt-2',
    title: 'Mega On-Campus Placement Drive (MNCs & Startups)',
    description: 'Top IT companies and BFSI firms visiting SGDC campus for pooled placements for final year UG students.',
    image: '/images/college10.jpg',
    date: '2026-10-25',
    time: '08:30 AM - 06:00 PM',
    location: 'Seminar Hall & Placement Block',
    organizer: 'Training & Placement Cell',
    registrationOpen: true,
    category: 'placement',
    status: 'upcoming'
  },
  {
    id: 'evt-3',
    title: 'Inter-College Sports Olympiad 2026',
    description: 'Competitions in Cricket, Volleyball, Badminton, Kabaddi, and Track & Field events across 24 regional degree colleges.',
    image: '/images/sport1.jpg',
    date: '2026-11-05',
    time: '08:00 AM - 05:30 PM',
    location: 'College Sports Grounds',
    organizer: 'Physical Education Department',
    registrationOpen: true,
    category: 'sports',
    status: 'upcoming'
  },
  {
    id: 'evt-4',
    title: 'Silver Jubilee Alumni Reunion & Mentorship Meet',
    description: 'Distinguished alumni from across India and abroad gather to mentor current undergraduate students.',
    image: '/images/college12.jpg',
    date: '2026-08-15',
    time: '10:00 AM - 04:00 PM',
    location: 'Campus Open Air Theatre',
    organizer: 'SGDC Alumni Association',
    registrationOpen: false,
    category: 'cultural',
    status: 'past'
  }
];

export const PLACEMENTS: PlacementOpportunity[] = [
  {
    id: 'plc-1',
    company: 'Infosys Limited',
    logo: 'https://logo.clearbit.com/infosys.com',
    role: 'Operations Executive & Junior Software Engineer',
    package: '₹4.2 - ₹6.5 LPA',
    eligibility: 'BCA, B.Sc (CS/Maths) with 60%+ in 10th, Inter & Degree',
    location: 'Bengaluru / Hyderabad / Chennai',
    deadline: '2026-10-12',
    selectionProcess: 'Online Aptitude Test -> Technical Coding Interview -> HR Round',
    openings: 45,
    applied: true,
    status: 'Shortlisted'
  },
  {
    id: 'plc-2',
    company: 'Wipro Technologies',
    logo: 'https://logo.clearbit.com/wipro.com',
    role: 'Scholar Trainee & Associate Developer',
    package: '₹4.0 - ₹5.5 LPA + Sponsored M.Tech Program',
    eligibility: 'BCA / B.Sc (2026 batch)',
    location: 'Bengaluru / Hyderabad',
    deadline: '2026-10-16',
    selectionProcess: 'Aptitude Test -> Communication Assessment -> Technical & HR',
    openings: 35,
    applied: true,
    status: 'Applied'
  },
  {
    id: 'plc-3',
    company: 'TCS (Tata Consultancy Services)',
    logo: 'https://logo.clearbit.com/tcs.com',
    role: 'TCS Smart Hiring - Graduate Trainee',
    package: '₹3.8 - ₹5.0 LPA',
    eligibility: 'BCA, B.Sc, B.Com, BBA (All disciplines)',
    location: 'Pan India',
    deadline: '2026-10-22',
    selectionProcess: 'TCS NQT (National Qualifier Test) -> Technical Interview',
    openings: 60,
    applied: false
  },
  {
    id: 'plc-4',
    company: 'Cognizant Technology Solutions',
    logo: 'https://logo.clearbit.com/cognizant.com',
    role: 'Programmer Analyst Trainee',
    package: '₹4.5 - ₹5.2 LPA',
    eligibility: 'BCA & B.Sc (CS) with no active backlogs',
    location: 'Chennai / Coimbatore',
    deadline: '2026-10-28',
    selectionProcess: 'Skill Assessment -> Domain Round -> HR',
    openings: 25,
    applied: false
  },
  {
    id: 'plc-5',
    company: 'ICICI Bank',
    logo: 'https://logo.clearbit.com/icicibank.com',
    role: 'Relationship Manager / Banking Operations',
    package: '₹3.6 - ₹4.8 LPA',
    eligibility: 'BBA & B.Com graduates',
    location: 'Tirupati / Chittoor / Bengaluru',
    deadline: '2026-11-02',
    selectionProcess: 'Group Discussion -> Personal Interview',
    openings: 20,
    applied: false
  }
];

// Demo Profile for K. Harinath (Owner & Lead Student)
export const DEMO_STUDENT_PROFILE: UserProfile = {
  id: 'usr-student-1',
  name: 'K. Harinath',
  email: 'harinath@sgnanambica.edu.in',
  role: 'student',
  studentId: 'SGDC22BCA042',
  rollNo: '22042BCA',
  course: 'BCA - Artificial Intelligence',
  department: 'Computer Science',
  year: 3,
  semester: 6,
  phone: '+91 98765 43210',
  dob: '2004-05-18',
  address: 'Gandhi Road, Madanapalle, Andhra Pradesh - 517325',
  fatherName: 'K. Ramamurthy',
  motherName: 'K. Lakshmi Devi',
  guardianPhone: '+91 94400 98765',
  createdAt: '2022-08-10'
};

export const DEMO_FACULTY_PROFILE: UserProfile = {
  id: 'usr-fac-1',
  name: 'Mahesh Sir',
  email: 'mahesh@sgnanambica.edu.in',
  role: 'faculty',
  department: 'Computer Science',
  designation: 'Associate Professor & HOD',
  qualification: 'M.Tech, (Ph.D.)',
  specialization: 'Artificial Intelligence & Neural Networks',
  experienceYears: 14,
  phone: '+91 98480 11223',
  createdAt: '2012-06-15'
};

export const DEMO_PARENT_PROFILE: UserProfile = {
  id: 'usr-parent-1',
  name: 'K. Ramamurthy',
  email: 'parent.harinath@sgnanambica.edu.in',
  role: 'parent',
  phone: '+91 94400 98765',
  linkedStudentId: 'usr-student-1',
  linkedStudentName: 'K. Harinath',
  linkedRollNo: '22042BCA',
  createdAt: '2022-08-12'
};

export const DEMO_ADMIN_PROFILE: UserProfile = {
  id: 'usr-admin-1',
  name: 'SGDC Administrator',
  email: 'admin@sgnanambica.edu.in',
  role: 'admin',
  department: 'Academic Administration',
  phone: '+91 8571 222 345',
  createdAt: '2020-01-01'
};

export const DEMO_ATTENDANCE_SUMMARY = {
  overallPercentage: 86.4,
  totalClassesHeld: 250,
  classesAttended: 216,
  classesAbsent: 34,
  status: 'Good (Above 75% Requirement)',
  subjects: [
    { subjectCode: 'BCA601', subjectName: 'Deep Learning & Neural Networks', totalClasses: 48, attendedClasses: 43, percentage: 89.6, faculty: 'Mahesh Sir (HOD)' },
    { subjectCode: 'BCA602', subjectName: 'Big Data Analytics', totalClasses: 44, attendedClasses: 38, percentage: 86.4, faculty: 'Swethan Sir' },
    { subjectCode: 'BCA603', subjectName: 'Mobile Computing with Flutter', totalClasses: 42, attendedClasses: 36, percentage: 85.7, faculty: 'Krishna Hasan Sir' },
    { subjectCode: 'BCA604', subjectName: 'Blockchain Technology', totalClasses: 40, attendedClasses: 33, percentage: 82.5, faculty: 'Devendra Nayak Sir' },
    { subjectCode: 'BCA605', subjectName: 'AI Capstone Project Lab', totalClasses: 46, attendedClasses: 42, percentage: 91.3, faculty: 'Rajanikanth Sir' },
    { subjectCode: 'BCA606', subjectName: 'Python for AI Lab', totalClasses: 30, attendedClasses: 24, percentage: 80.0, faculty: 'Moulali Sir' }
  ] as SubjectAttendance[],
  recentLogs: [
    { date: '2026-10-01', subject: 'Deep Learning', status: 'present', time: '09:30 AM' },
    { date: '2026-10-01', subject: 'Big Data Analytics', status: 'present', time: '10:30 AM' },
    { date: '2026-09-30', subject: 'Mobile Computing', status: 'present', time: '11:30 AM' },
    { date: '2026-09-30', subject: 'Blockchain Technology', status: 'absent', time: '02:00 PM' },
    { date: '2026-09-29', subject: 'AI Capstone Lab', status: 'present', time: '03:00 PM' }
  ]
};

export const DEMO_RESULTS: SemesterResult[] = [
  {
    id: 'res-sem5',
    studentId: 'usr-student-1',
    semester: 5,
    academicYear: '2025-2026',
    sgpa: 9.15,
    cgpa: 8.86,
    totalCredits: 24,
    overallStatus: 'PASSED',
    subjects: [
      { code: 'BCA501', name: 'Machine Learning Techniques', credits: 4, internalMarks: 28, midMarks: 18, semesterMarks: 48, totalMarks: 94, maxMarks: 100, grade: 'O', gradePoints: 10, status: 'PASS' },
      { code: 'BCA502', name: 'Cloud Computing & DevOps', credits: 4, internalMarks: 26, midMarks: 17, semesterMarks: 45, totalMarks: 88, maxMarks: 100, grade: 'A+', gradePoints: 9, status: 'PASS' },
      { code: 'BCA503', name: 'Data Mining & Warehousing', credits: 4, internalMarks: 25, midMarks: 16, semesterMarks: 46, totalMarks: 87, maxMarks: 100, grade: 'A+', gradePoints: 9, status: 'PASS' },
      { code: 'BCA504', name: 'Cryptography & Network Security', credits: 4, internalMarks: 27, midMarks: 17, semesterMarks: 44, totalMarks: 88, maxMarks: 100, grade: 'A+', gradePoints: 9, status: 'PASS' },
      { code: 'BCA505', name: 'Python for Data Science', credits: 4, internalMarks: 29, midMarks: 19, semesterMarks: 49, totalMarks: 97, maxMarks: 100, grade: 'O', gradePoints: 10, status: 'PASS' },
      { code: 'BCA506', name: 'Machine Learning Lab', credits: 4, internalMarks: 30, midMarks: 20, semesterMarks: 48, totalMarks: 98, maxMarks: 100, grade: 'O', gradePoints: 10, status: 'PASS' }
    ]
  },
  {
    id: 'res-sem4',
    studentId: 'usr-student-1',
    semester: 4,
    academicYear: '2024-2025',
    sgpa: 8.78,
    cgpa: 8.72,
    totalCredits: 24,
    overallStatus: 'PASSED',
    subjects: [
      { code: 'BCA401', name: 'Computer Networks', credits: 4, internalMarks: 26, midMarks: 16, semesterMarks: 43, totalMarks: 85, maxMarks: 100, grade: 'A+', gradePoints: 9, status: 'PASS' },
      { code: 'BCA402', name: 'Microprocessors', credits: 4, internalMarks: 24, midMarks: 15, semesterMarks: 41, totalMarks: 80, maxMarks: 100, grade: 'A', gradePoints: 8, status: 'PASS' },
      { code: 'BCA403', name: 'Software Engineering', credits: 4, internalMarks: 27, midMarks: 18, semesterMarks: 45, totalMarks: 90, maxMarks: 100, grade: 'O', gradePoints: 10, status: 'PASS' },
      { code: 'BCA404', name: 'Artificial Intelligence Foundations', credits: 4, internalMarks: 28, midMarks: 19, semesterMarks: 46, totalMarks: 93, maxMarks: 100, grade: 'O', gradePoints: 10, status: 'PASS' },
      { code: 'BCA405', name: 'Web Technologies & Frameworks', credits: 4, internalMarks: 29, midMarks: 19, semesterMarks: 47, totalMarks: 95, maxMarks: 100, grade: 'O', gradePoints: 10, status: 'PASS' }
    ]
  }
];

export const DEMO_FEES: FeeItem[] = [
  {
    id: 'fee-1',
    studentId: 'usr-student-1',
    semester: 6,
    title: 'Semester 6 Tuition & Lab Maintenance Fee',
    totalAmount: 16000,
    paidAmount: 16000,
    pendingAmount: 0,
    dueDate: '2026-08-30',
    status: 'paid',
    receipts: [
      { receiptNo: 'SGDC-REC-8921', date: '2026-08-25', amount: 16000, paymentMethod: 'UPI / NetBanking', transactionId: 'TXN2026892199', status: 'SUCCESS' }
    ]
  },
  {
    id: 'fee-2',
    studentId: 'usr-student-1',
    semester: 6,
    title: 'Autonomous Semester End Examination & Convocation Fee',
    totalAmount: 2500,
    paidAmount: 0,
    pendingAmount: 2500,
    dueDate: '2026-10-15',
    status: 'pending',
    receipts: []
  },
  {
    id: 'fee-3',
    studentId: 'usr-student-1',
    semester: 5,
    title: 'Semester 5 Tuition & Training Special Fee',
    totalAmount: 16000,
    paidAmount: 16000,
    pendingAmount: 0,
    dueDate: '2025-12-10',
    status: 'paid',
    receipts: [
      { receiptNo: 'SGDC-REC-6410', date: '2025-12-05', amount: 16000, paymentMethod: 'UPI / NetBanking', transactionId: 'TXN2025641011', status: 'SUCCESS' }
    ]
  }
];

export const WEEKLY_TIMETABLE: TimetableSlot[] = [
  // Monday
  { id: 'tt-1', day: 'Monday', time: '09:30 AM - 10:30 AM', subject: 'Deep Learning (BCA601)', faculty: 'Mahesh Sir (HOD)', room: 'Room 204', course: 'BCA-AI', semester: 6 },
  { id: 'tt-2', day: 'Monday', time: '10:30 AM - 11:30 AM', subject: 'Big Data Analytics (BCA602)', faculty: 'Swethan Sir', room: 'Room 204', course: 'BCA-AI', semester: 6 },
  { id: 'tt-3', day: 'Monday', time: '11:45 AM - 12:45 PM', subject: 'Mobile Computing (BCA603)', faculty: 'Krishna Hasan Sir', room: 'Room 204', course: 'BCA-AI', semester: 6 },
  { id: 'tt-4', day: 'Monday', time: '01:30 PM - 04:30 PM', subject: 'AI Capstone Lab (BCA605)', faculty: 'Rajanikanth Sir & Mahesh Sir', room: 'AI Lab 2', course: 'BCA-AI', semester: 6 },

  // Tuesday
  { id: 'tt-5', day: 'Tuesday', time: '09:30 AM - 10:30 AM', subject: 'Blockchain Tech (BCA604)', faculty: 'Devendra Nayak Sir', room: 'Room 204', course: 'BCA-AI', semester: 6 },
  { id: 'tt-6', day: 'Tuesday', time: '10:30 AM - 11:30 AM', subject: 'Deep Learning (BCA601)', faculty: 'Mahesh Sir (HOD)', room: 'Room 204', course: 'BCA-AI', semester: 6 },
  { id: 'tt-7', day: 'Tuesday', time: '11:45 AM - 12:45 PM', subject: 'Python for AI Lab (BCA606)', faculty: 'Moulali Sir', room: 'Lab 3', course: 'BCA-AI', semester: 6 },
  { id: 'tt-8', day: 'Tuesday', time: '01:30 PM - 03:30 PM', subject: 'Industry Aptitude & Soft Skills', faculty: 'Training Cell', room: 'Seminar Hall B', course: 'BCA-AI', semester: 6 },

  // Wednesday
  { id: 'tt-9', day: 'Wednesday', time: '09:30 AM - 10:30 AM', subject: 'Mobile Computing (BCA603)', faculty: 'Krishna Hasan Sir', room: 'Room 204', course: 'BCA-AI', semester: 6 },
  { id: 'tt-10', day: 'Wednesday', time: '10:30 AM - 11:30 AM', subject: 'Big Data Analytics (BCA602)', faculty: 'Swethan Sir', room: 'Room 204', course: 'BCA-AI', semester: 6 },
  { id: 'tt-11', day: 'Wednesday', time: '11:45 AM - 12:45 PM', subject: 'Blockchain Tech (BCA604)', faculty: 'Devendra Nayak Sir', room: 'Room 204', course: 'BCA-AI', semester: 6 },
  { id: 'tt-12', day: 'Wednesday', time: '01:30 PM - 04:30 PM', subject: 'Project Mentorship Sessions', faculty: 'All CS Faculty', room: 'AI Lab 1', course: 'BCA-AI', semester: 6 },

  // Thursday
  { id: 'tt-13', day: 'Thursday', time: '09:30 AM - 10:30 AM', subject: 'Deep Learning (BCA601)', faculty: 'Mahesh Sir (HOD)', room: 'Room 204', course: 'BCA-AI', semester: 6 },
  { id: 'tt-14', day: 'Thursday', time: '10:30 AM - 11:30 AM', subject: 'Mobile Computing (BCA603)', faculty: 'Krishna Hasan Sir', room: 'Room 204', course: 'BCA-AI', semester: 6 },
  { id: 'tt-15', day: 'Thursday', time: '11:45 AM - 12:45 PM', subject: 'Big Data Analytics (BCA602)', faculty: 'Swethan Sir', room: 'Room 204', course: 'BCA-AI', semester: 6 },
  { id: 'tt-16', day: 'Thursday', time: '02:00 PM - 04:00 PM', subject: 'Library & Online Research Hour', faculty: 'Chief Librarian', room: 'Digital Library', course: 'BCA-AI', semester: 6 },

  // Friday
  { id: 'tt-17', day: 'Friday', time: '09:30 AM - 10:30 AM', subject: 'Blockchain Tech (BCA604)', faculty: 'Devendra Nayak Sir', room: 'Room 204', course: 'BCA-AI', semester: 6 },
  { id: 'tt-18', day: 'Friday', time: '10:30 AM - 11:30 AM', subject: 'Deep Learning (BCA601)', faculty: 'Mahesh Sir (HOD)', room: 'Room 204', course: 'BCA-AI', semester: 6 },
  { id: 'tt-19', day: 'Friday', time: '11:45 AM - 01:15 PM', subject: 'Big Data Hadoop & Spark Lab', faculty: 'Swethan Sir', room: 'Lab 4', course: 'BCA-AI', semester: 6 },
  { id: 'tt-20', day: 'Friday', time: '02:30 PM - 04:30 PM', subject: 'Sports & Extra-Curriculars', faculty: 'Physical Directors', room: 'Sports Complex', course: 'BCA-AI', semester: 6 },

  // Saturday
  { id: 'tt-21', day: 'Saturday', time: '09:30 AM - 11:00 AM', subject: 'Guest Lecture / Seminar', faculty: 'Industry Expert', room: 'Auditorium', course: 'BCA-AI', semester: 6 },
  { id: 'tt-22', day: 'Saturday', time: '11:15 AM - 01:00 PM', subject: 'Weekly Coding Assessment', faculty: 'Kavitha Madam & Teja Sir', room: 'Lab 1', course: 'BCA-AI', semester: 6 }
];

export const ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'Convolutional Neural Networks (CNN) for Medical Image Classification',
    description: 'Implement a CNN model in Python using PyTorch or TensorFlow for pneumonia classification from chest X-Ray datasets. Submit your Jupyter notebook with accuracy graphs and analysis.',
    subject: 'Deep Learning & Neural Networks',
    course: 'BCA-AI',
    semester: 6,
    assignedBy: 'Mahesh Sir (HOD)',
    dueDate: '2026-10-15',
    totalMarks: 25,
    submissionsCount: 48,
    submitted: true,
    submissionStatus: 'graded',
    myMarks: 24,
    myFeedback: 'Excellent architecture design and clean loss curves. Good explanation of regularization.'
  },
  {
    id: 'asg-2',
    title: 'MapReduce & Spark RDD Operations on E-Commerce Dataset',
    description: 'Write PySpark jobs to compute top purchasing categories, peak hours, and user engagement metrics on an Amazon review dataset.',
    subject: 'Big Data Analytics',
    course: 'BCA-AI',
    semester: 6,
    assignedBy: 'Swethan Sir',
    dueDate: '2026-10-18',
    totalMarks: 20,
    submissionsCount: 42,
    submitted: true,
    submissionStatus: 'submitted'
  },
  {
    id: 'asg-3',
    title: 'Smart Contract Development for Student Credential Verification',
    description: 'Design and deploy an ERC-721 based Solidity smart contract on Sepolia testnet to issue and verify tamper-proof autonomous semester grade sheets.',
    subject: 'Blockchain Technology',
    course: 'BCA-AI',
    semester: 6,
    assignedBy: 'Devendra Nayak Sir',
    dueDate: '2026-10-24',
    totalMarks: 30,
    submissionsCount: 22,
    submitted: false,
    submissionStatus: 'pending'
  }
];

export const STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-1',
    title: 'Unit 1-3 Deep Learning Fundamentals & Backpropagation',
    description: 'Comprehensive handwritten and digitized lecture notes covering perceptrons, activation functions, gradient descent, and PyTorch tensors.',
    category: 'Notes',
    department: 'Computer Science',
    course: 'BCA-AI',
    semester: 6,
    subject: 'Deep Learning',
    uploadedBy: 'Mahesh Sir (HOD)',
    uploadedDate: '2026-09-12',
    fileUrl: '/pdfs/computers 6 Mahesh.pdf',
    fileSize: '4.2 MB'
  },
  {
    id: 'mat-2',
    title: 'Previous 5 Years Autonomous Solved Question Papers (2021-2025)',
    description: 'Compilation of all semester end question papers with detailed model answers and marking scheme.',
    category: 'Question Papers',
    department: 'Computer Science',
    course: 'BCA-AI',
    semester: 6,
    subject: 'All Subjects',
    uploadedBy: 'Controller of Exams',
    uploadedDate: '2026-09-18',
    fileUrl: '/pdfs/computers 4 Kavitha.pdf',
    fileSize: '7.8 MB'
  },
  {
    id: 'mat-3',
    title: 'Big Data Analytics Lab Manual with PySpark Scripts',
    description: 'Step-by-step laboratory experiment guide for setting up multi-node Hadoop, HDFS commands, and MapReduce.',
    category: 'Lab Materials',
    department: 'Computer Science',
    course: 'BCA-AI',
    semester: 6,
    subject: 'Big Data Analytics',
    uploadedBy: 'Swethan Sir',
    uploadedDate: '2026-08-20',
    fileUrl: '/pdfs/computers 10 swethan.pdf',
    fileSize: '3.1 MB'
  },
  {
    id: 'mat-4',
    title: 'Full-Stack Web Technologies & REST API Slides',
    description: 'Presentation slides on Node.js, Express, React, and MongoDB database integration.',
    category: 'PPT',
    department: 'Computer Science',
    course: 'BCA',
    semester: 4,
    subject: 'Web Technologies',
    uploadedBy: 'Rajanikanth Sir',
    uploadedDate: '2026-07-15',
    fileUrl: '/pdfs/profile rajanikanth.pdf',
    fileSize: '5.5 MB'
  }
];

export const DEMO_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'ntf-1',
    title: 'Exam Schedule Announced',
    message: 'Autonomous Semester VI examinations timetable has been officially posted.',
    date: '2026-10-01',
    type: 'exam',
    read: false,
    link: 'timetable'
  },
  {
    id: 'ntf-2',
    title: 'New Placement Drive: Wipro',
    message: 'Wipro Technologies has opened applications for BCA-AI and BSc graduates.',
    date: '2026-09-28',
    type: 'placement',
    read: false,
    link: 'placements'
  },
  {
    id: 'ntf-3',
    title: 'Assignment Graded',
    message: 'Mahesh Sir evaluated your Deep Learning CNN Assignment (Score: 24/25).',
    date: '2026-09-27',
    type: 'assignment',
    read: true,
    link: 'assignments'
  },
  {
    id: 'ntf-4',
    title: 'Fee Payment Reminder',
    message: 'Exam fee of ₹2,500 is due before October 15, 2026.',
    date: '2026-09-25',
    type: 'fee',
    read: false,
    link: 'fees'
  }
];

export const INITIAL_ADMISSIONS: AdmissionApplication[] = [
  {
    id: 'adm-101',
    firstName: 'Sai',
    middleName: 'Kiran',
    lastName: 'Reddy',
    fatherName: 'S. Venkat Reddy',
    motherName: 'S. Sujatha',
    gender: 'Male',
    mobile: '9848099881',
    email: 'saikiran.reddy@gmail.com',
    dob: '2005-06-12',
    address: 'Near Clock Tower, Madanapalle',
    sscSchool: 'ZPHS Madanapalle',
    interCollege: 'Govt Junior College, Madanapalle',
    course: 'BCA-AI',
    skills: ['Python', 'AI', 'SQL'],
    appliedDate: '2026-09-20',
    status: 'approved'
  },
  {
    id: 'adm-102',
    firstName: 'Bhavani',
    lastName: 'Prasad',
    fatherName: 'B. Narayana',
    motherName: 'B. Annapurna',
    gender: 'Female',
    mobile: '9700112233',
    email: 'bhavani.prasad@gmail.com',
    dob: '2005-09-18',
    address: 'Kurabalakota, Madanapalle Mandal',
    sscSchool: 'Sri Chaitanya High School',
    interCollege: 'Narayana Junior College, Tirupati',
    course: 'BSC',
    skills: ['Java', 'HTML'],
    appliedDate: '2026-09-22',
    status: 'pending'
  }
];
