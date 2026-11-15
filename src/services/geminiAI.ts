import { GoogleGenAI } from '@google/genai';
import { 
  COLLEGE_INFO, 
  DEPARTMENTS, 
  FACULTY_MEMBERS, 
  COURSES, 
  NOTICES, 
  EVENTS, 
  PLACEMENTS, 
  WEEKLY_TIMETABLE, 
  DEMO_ATTENDANCE_SUMMARY, 
  DEMO_RESULTS, 
  DEMO_FEES 
} from './collegeData';
import { UserProfile } from '../types';

// College Knowledge Base System Prompt
const buildCollegeContext = (currentUser?: UserProfile | null) => {
  return `
You are the official College AI Assistant for Shri Gnanambica Degree College (Autonomous), Madanapalle.
College Name: Shri Gnanambica Degree College (Autonomous)
Established: 1999 by Shri Devarshi Educational Society.
Location: 3-153-5, Near R.T.C. Bus Stand, Madanapalle - 517325, Annamayya District, Andhra Pradesh.
Affiliation: Permanently Affiliated to Sri Venkateswara University (SVU), Tirupati.
Recognitions & Accreditations: NAAC Accredited Autonomous Institution, ISO 9001:2015, ISO 14001:2015, ISO 50001:2011 Certified.
National Award: Top Biotech Institute of the Year 2025 by The Academic Insights for B.Sc. Biotechnology program.
Correspondent & Secretary: Dr. Ratakonda Guru Prasad (M.Sc., Ph.D.)
Principal: Dr. Sri Ramadevi (M.Sc., M.Phil., Ph.D.)
Statutory Cells: Anti-Ragging Committee (Helpline: 1800-180-5522 / 08571-223199), Women Empowerment Cell (WEC), Internal Quality Assurance Cell (IQAC), NCC Army Platoon, NSS Units, Career Guidance & Placement Cell.
Key Departments: Computer Science & AI (HOD: Mahesh Sir), Biotechnology & Life Sciences, Commerce (HOD: Anitha Madam), Physics (HOD: Ravi Sir), Chemistry (HOD: Lakshmi Madam), Mathematics (HOD: Kiran Sir), Electronics (HOD: Devendra Nayak Sir).
Computer Science Faculty: Mahesh Sir (HOD), Rajanikanth Sir, Kavitha Madam, Devendra Nayak Sir, Megha Vardhan Sir, Krishna Hasan Sir, Moulali Sir, Swethan Sir, Teja Sir.
All 16 Offered Courses:
- BCA (Artificial Intelligence) - 3 Years Honours
- BCA (Computer Applications)
- B.Sc. Biotechnology, Botany, Chemistry (BtBC) - Awarded Top Biotech Institute 2025
- B.Sc. Data Science & Big Data Analytics
- B.Sc. Mathematics, Physics, Computer Science (MPCS)
- B.Sc. Mathematics, Electronics, Computer Science (MECS)
- B.Sc. Mathematics, Statistics, Computer Science (MSCS)
- B.Sc. Chemistry, Botany, Zoology (CBZ)
- BBA (Bachelor of Business Administration)
- BBA (Digital Marketing & E-Commerce)
- B.Com. (Computer Applications)
- B.Com. (General & Taxation)
- BSW (Bachelor of Social Work)
- B.A. (History, Economics, Political Science - HEP)
- M.Sc. Organic Chemistry (Postgraduate)
- M.Sc. Computer Science (Postgraduate)

Current Active Announcements / Notices:
${NOTICES.map(n => `- [${n.priority.toUpperCase()}] ${n.title} (${n.date}): ${n.description}`).join('\n')}

Upcoming Events:
${EVENTS.map(e => `- ${e.title} on ${e.date} at ${e.location}`).join('\n')}

Active Placements:
${PLACEMENTS.map(p => `- ${p.company}: ${p.role}, Package: ${p.package}, Eligibility: ${p.eligibility}`).join('\n')}

Timetable Schedule:
${WEEKLY_TIMETABLE.slice(0, 8).map(t => `- ${t.day} ${t.time}: ${t.subject} by ${t.faculty} in ${t.room}`).join('\n')}

${currentUser ? `
Current Logged-in User Context:
- Name: ${currentUser.name}
- Role: ${currentUser.role}
- Student ID: ${currentUser.studentId || 'N/A'}
- Roll No: ${currentUser.rollNo || 'N/A'}
- Course: ${currentUser.course || 'BCA - Artificial Intelligence'}
- Current Semester: ${currentUser.semester || 6}
- Overall Attendance: ${DEMO_ATTENDANCE_SUMMARY.overallPercentage}% (${DEMO_ATTENDANCE_SUMMARY.classesAttended}/${DEMO_ATTENDANCE_SUMMARY.totalClassesHeld} classes)
- Current CGPA: 8.86 (SGPA Sem 5: 9.15)
- Pending Fees: ₹2,500 (Autonomous Semester End Exam Fee due 15 Oct 2026)
` : 'User is currently exploring as guest.'}

CRITICAL RULES:
1. You must answer ONLY based on the approved college information provided above.
2. If information is not available in the database, explicitly respond:
"I don't have this information in the college database. Please contact the college administration."
3. Respond in the language requested by the user: English, Telugu (తెలుగు), or Hindi (हिंदी).
4. Keep answers friendly, professional, respectful, concise, and formatted with bullet points where appropriate.
`;
};

// Fallback intelligent offline knowledge-base responder
const fallbackKnowledgeQuery = (query: string, language: 'en' | 'te' | 'hi', currentUser?: UserProfile | null): string => {
  const q = query.toLowerCase();

  // Attendance
  if (q.includes('attendance') || q.includes('హాజరు') || q.includes('उपस्थिति')) {
    if (language === 'te') {
      return `మీ ప్రస్తుత మొత్తం హాజరు ${DEMO_ATTENDANCE_SUMMARY.overallPercentage}% (${DEMO_ATTENDANCE_SUMMARY.classesAttended}/${DEMO_ATTENDANCE_SUMMARY.totalClassesHeld} తరగతులు). అటానమస్ నిబంధనల ప్రకారం 75% పైగా ఉండటం తప్పనిసరి. మీ హాజరు సంతృప్తికరంగా ఉంది!`;
    }
    if (language === 'hi') {
      return `आपकी वर्तमान कुल उपस्थिति ${DEMO_ATTENDANCE_SUMMARY.overallPercentage}% है (${DEMO_ATTENDANCE_SUMMARY.classesAttended}/${DEMO_ATTENDANCE_SUMMARY.totalClassesHeld} कक्षाएं)। स्वायत्त नियमों के अनुसार 75% से अधिक उपस्थिति अनिवार्य है।`;
    }
    return `Your current overall attendance is ${DEMO_ATTENDANCE_SUMMARY.overallPercentage}% (${DEMO_ATTENDANCE_SUMMARY.classesAttended}/${DEMO_ATTENDANCE_SUMMARY.totalClassesHeld} classes). Autonomous regulation requires minimum 75%. Your status is: Good!`;
  }

  // Exams
  if (q.includes('exam') || q.includes('పరీక్ష') || q.includes('परीक्षा')) {
    if (language === 'te') {
      return `శ్రీ జ్ఞానాంబిక డిగ్రీ కళాశాల అటానమస్ సెమిస్టర్ పరీక్షలు అక్టోబర్ 20, 2026 నుండి ప్రారంభమవుతాయి. అధికారిక టైమ్‌టేబుల్ మరియు హాల్ టికెట్లను స్టూడెంట్ పోర్టల్ నుండి డౌన్‌లోడ్ చేసుకోవచ్చు.`;
    }
    if (language === 'hi') {
      return `श्री ज्ञानांबिका डिग्री कॉलेज स्वायत्त सेमेस्टर परीक्षाएं 20 अक्टूबर, 2026 से शुरू होंगी। छात्र पोर्टल से हॉल टिकट डाउनलोड किए जा सकते हैं।`;
    }
    return `Shri Gnanambica Degree College Autonomous End Semester Examinations commence from October 20, 2026. Hall tickets and timetable are published on your Student Portal.`;
  }

  // Courses
  if (q.includes('course') || q.includes('కోర్సు') || q.includes('पाठ्यक्रम')) {
    if (language === 'te') {
      return `శ్రీ జ్ఞానాంబిక డిగ్రీ కళాశాలలో 16 రకాల డిగ్రీ కోర్సులు అందుబాటులో ఉన్నాయి:\n• BCA - Artificial Intelligence (ఆధునిక AI & GPU ల్యాబ్‌లు)\n• BCA (కంప్యూటర్ అప్లికేషన్స్)\n• B.Sc. బయోటెక్నాలజీ (Top Biotech Institute of the Year 2025 అవార్డు గ్రహీత)\n• B.Sc. డేటా సైన్స్ & బిగ్ డేటా\n• B.Sc. (MPCS / MECS / MSCS / CBZ)\n• BBA (జనరల్ & డిజిటల్ మార్కెటింగ్)\n• B.Com (కంప్యూటర్ అప్లికేషన్స్ & టాక్సేషన్)\n• BSW, B.A. (HEP) & M.Sc. (ఆర్గానిక్ కెమిస్ట్రీ, కంప్యూటర్ సైన్స్)`;
    }
    if (language === 'hi') {
      return `श्री ज्ञानांबिका डिग्री कॉलेज में 16 प्रमुख पाठ्यक्रम उपलब्ध हैं:\n• BCA - Artificial Intelligence\n• BCA (कंप्यूटर एप्लीकेशन्स)\n• B.Sc. बायोटेक्नोलॉजी (Top Biotech Institute 2025 विजेता)\n• B.Sc. डेटा साइंस\n• B.Sc. (MPCS / MECS / MSCS / CBZ)\n• BBA (सामान्य एवं डिजिटल मार्केटिंग)\n• B.Com (कंप्यूटर एप्लीकेशन्स एवं कराधान)\n• BSW, B.A. (HEP) एवं M.Sc. (केमिस्ट्री, CS)`;
    }
    return `Shri Gnanambica Degree College offers 16 versatile undergraduate & postgraduate programs:\n• BCA (Artificial Intelligence) - 3 Years Honours\n• BCA (General Computer Applications)\n• B.Sc. Biotechnology, Botany, Chemistry (Awarded Top Biotech Institute 2025)\n• B.Sc. Data Science & Big Data Analytics\n• B.Sc. (MPCS / MECS / MSCS / CBZ)\n• BBA (General Management & Digital Marketing)\n• B.Com (Computer Applications & Taxation)\n• BSW (Social Work) & B.A. (HEP)\n• M.Sc. Organic Chemistry & M.Sc. Computer Science`;
  }

  // Timetable
  if (q.includes('timetable') || q.includes('time table') || q.includes('టైమ్‌టేబుల్') || q.includes('समय सारणी')) {
    const todaySlots = WEEKLY_TIMETABLE.slice(0, 4);
    if (language === 'te') {
      return `నేటి కాలపట్టిక (BCA-AI సెమిస్టర్ 6):\n${todaySlots.map(s => `• ${s.time}: ${s.subject} (${s.faculty} - ${s.room})`).join('\n')}`;
    }
    if (language === 'hi') {
      return `आज की समय सारणी (BCA-AI सेमेस्टर 6):\n${todaySlots.map(s => `• ${s.time}: ${s.subject} (${s.faculty} - ${s.room})`).join('\n')}`;
    }
    return `Today's Timetable Schedule (BCA-AI Sem 6):\n${todaySlots.map(s => `• ${s.time}: ${s.subject} (${s.faculty} - ${s.room})`).join('\n')}`;
  }

  // Notices
  if (q.includes('notice') || q.includes('నోటీసు') || q.includes('सूचना')) {
    const latest = NOTICES.slice(0, 3);
    if (language === 'te') {
      return `తాజా కళాశాల నోటీసులు:\n${latest.map(n => `• [${n.priority}] ${n.title} (${n.date})`).join('\n')}`;
    }
    if (language === 'hi') {
      return `नवीनतम कॉलेज सूचनाएं:\n${latest.map(n => `• [${n.priority}] ${n.title} (${n.date})`).join('\n')}`;
    }
    return `Latest College Notices:\n${latest.map(n => `• [${n.priority.toUpperCase()}] ${n.title} (${n.date})`).join('\n')}`;
  }

  // Placements
  if (q.includes('placement') || q.includes('job') || q.includes('ప్లేస్‌మెంట్') || q.includes('प्लेसमेंट')) {
    const topPlc = PLACEMENTS.slice(0, 3);
    if (language === 'te') {
      return `ప్రస్తుత ప్లేస్‌మెంట్ అవకాశాలు:\n${topPlc.map(p => `• ${p.company} - ${p.role} (${p.package}), దరఖాస్తు గడువు: ${p.deadline}`).join('\n')}`;
    }
    if (language === 'hi') {
      return `वर्तमान प्लेसमेंट अवसर:\n${topPlc.map(p => `• ${p.company} - ${p.role} (${p.package}), अंतिम तिथि: ${p.deadline}`).join('\n')}`;
    }
    return `Active Placement Drives:\n${topPlc.map(p => `• ${p.company} - ${p.role} (${p.package}), Deadline: ${p.deadline}`).join('\n')}`;
  }

  // Fees
  if (q.includes('fee') || q.includes('ఫీజు') || q.includes('फीस')) {
    if (language === 'te') {
      return `ఫీజు సమాచారం: సెమిస్టర్ 6 ట్యూషన్ ఫీజు పూర్తిగా చెల్లించబడింది. రాబోయే అటానమస్ సెమిస్టర్ ఎగ్జామినేషన్ ఫీజు ₹2,500 అక్టోబర్ 15, 2026 లోపు చెల్లించాల్సి ఉంది.`;
    }
    if (language === 'hi') {
      return `फीस जानकारी: सेमेस्टर 6 ट्यूशन फीस पूर्णतः जमा है। आगामी स्वायत्त परीक्षा फीस ₹2,500 की अंतिम तिथि 15 अक्टूबर, 2026 है।`;
    }
    return `Fee Details: Semester 6 tuition fee is paid in full. Examination fee of ₹2,500 is pending with due date October 15, 2026.`;
  }

  // Principal / Correspondent
  if (q.includes('principal') || q.includes('ప్రిన్సిపాల్') || q.includes('प्रिंसिपल')) {
    return `Principal: ${COLLEGE_INFO.principal.name}, ${COLLEGE_INFO.principal.qualification}. Experienced academician with over 20 years of leadership in higher education.`;
  }
  if (q.includes('correspondent') || q.includes('కరస్పాండెంట్') || q.includes('guru prasad') || q.includes('గురుప్రసాద్')) {
    return `Correspondent: ${COLLEGE_INFO.correspondent.name}. Visionary leader dedicated to holistic student development and state-of-the-art campus infrastructure.`;
  }

  // Default fallback requirement:
  if (language === 'te') {
    return `కాలేజీ డేటాబేస్‌లో ఈ సమాచారం అందుబాటులో లేదు. దయచేసి కళాశాల పరిపాలనా విభాగాన్ని (College Administration) సంప్రదించండి.`;
  }
  if (language === 'hi') {
    return `कॉलेज डेटाबेस में यह जानकारी उपलब्ध नहीं है। कृपया कॉलेज प्रशासन से संपर्क करें।`;
  }
  return `I don't have this information in the college database. Please contact the college administration.`;
};

export async function askCollegeAI(
  prompt: string, 
  language: 'en' | 'te' | 'hi' = 'en', 
  currentUser?: UserProfile | null
): Promise<string> {
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    import.meta.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = buildCollegeContext(currentUser);
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt + `\nPlease answer in ${language === 'te' ? 'Telugu' : language === 'hi' ? 'Hindi' : 'English'}.` }
            ]
          }
        ],
        config: {
          systemInstruction,
          temperature: 0.2, // Low temperature for high factual accuracy
        }
      });

      if (response && response.text) {
        return response.text.trim();
      }
    } catch (error) {
      console.warn('Gemini API call returned error, using grounded college knowledge base:', error);
    }
  }

  // Grounded offline knowledge fallback
  return fallbackKnowledgeQuery(prompt, language, currentUser);
}
