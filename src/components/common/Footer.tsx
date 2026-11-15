import React from 'react';
import { 
  MapPin, Phone, Mail, Globe, ExternalLink, ShieldCheck, 
  Award, Heart, Facebook, Linkedin, Youtube, Instagram 
} from 'lucide-react';
import { COLLEGE_INFO } from '../../services/collegeData';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Identity & Correspondent / Principal */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/college1-logo.png" 
                alt="SGDC Logo" 
                className="w-12 h-12 object-contain bg-white rounded-xl p-1 shadow-sm"
              />
              <div>
                <h3 className="text-lg font-extrabold text-white tracking-tight">
                  Shri Gnanambica Degree College
                </h3>
                <span className="text-xs font-semibold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-800">
                  (Autonomous Institution • NAAC)
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Shri Gnanambica Degree College is located in Madanapalle and provides quality higher education with modern labs, distinguished faculty, and comprehensive student development.
            </p>

            <div className="pt-2 text-xs space-y-1 text-slate-400 border-t border-slate-900">
              <div><strong>Correspondent:</strong> {COLLEGE_INFO.correspondent.name}</div>
              <div><strong>Principal:</strong> {COLLEGE_INFO.principal.name}, {COLLEGE_INFO.principal.qualification}</div>
              <div><strong>Affiliation:</strong> Sri Venkateswara University (SVU), Tirupati</div>
            </div>

            {/* Social Links (preserved from original site) */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-medium text-slate-400">Follow Us:</span>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-blue-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-red-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-pink-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Academic Programs */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Programs & Degrees
            </h4>
            <ul className="space-y-2 text-xs">
              {['BCA - Artificial Intelligence', 'BCA (Honours)', 'B.Sc Computer Science', 'BBA (Management)', 'B.Com Computer Applications', 'BSW (Social Work)', 'B.A. Arts'].map((p) => (
                <li key={p}>
                  <button 
                    onClick={() => onNavigate('courses')}
                    className="hover:text-blue-400 text-slate-400 transition-colors text-left"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-indigo-500 pl-2">
              Campus Links
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Admissions 2026-27', page: 'admissions' },
                { name: 'Faculty Directory', page: 'departments' },
                { name: 'Sports & Athletics', page: 'sports' },
                { name: 'Campus Placements', page: 'placements' },
                { name: 'Autonomous Notices', page: 'notices' },
                { name: 'Campus Gallery', page: 'gallery' },
                { name: 'Student Portal', page: 'student-dashboard' }
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="hover:text-indigo-400 text-slate-400 transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Campus Contact & Location */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Contact & Address
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{COLLEGE_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COLLEGE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COLLEGE_INFO.email}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('admissions')}
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-md transition-colors"
                >
                  Apply Online Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Developer Attribution */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 Shri Gnanambica Degree College (Autonomous), Madanapalle. All Rights Reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Platform Architect & Developer:</span>
            <a 
              href="https://github.com/harinath55260" 
              target="_blank" 
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800"
            >
              K. Harinath (harinath55260)
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
