import React, { useState } from 'react';
import { EVENTS } from '../../services/collegeData';
import { Calendar, Clock, MapPin, User, CheckCircle2, Ticket } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { BackButton } from '../../components/common/BackButton';

interface EventsProps {
  onBack?: () => void;
}

export const Events: React.FC<EventsProps> = ({ onBack }) => {
  const { showToast } = useNotification();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const filteredEvents = filter === 'all' 
    ? EVENTS 
    : EVENTS.filter(e => e.status === filter);

  const handleRegister = (id: string, title: string) => {
    setRegisteredEvents(prev => [...prev, id]);
    showToast(`You have registered for ${title}! Check your email for badge pass.`, 'success', 'Event Registration');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <BackButton onClick={onBack} label="Back to Previous Page" />
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Shri Gnanambica Degree College (Autonomous) • College Events
        </span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
          Campus Life & Celebrations
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-outfit">
          College Events & TechFests
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Stay informed about national symposiums, hackathons, sports meets, cultural celebrations, and convocation ceremonies.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2">
        {[
          { label: 'All Events', id: 'all' },
          { label: 'Upcoming Events', id: 'upcoming' },
          { label: 'Past Highlights', id: 'past' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === t.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.map((evt) => {
          const isRegistered = registeredEvents.includes(evt.id);

          return (
            <div
              key={evt.id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-blue-600 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-md shadow-md">
                      {evt.category}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-md shadow-md ${
                      evt.status === 'upcoming' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'
                    }`}>
                      {evt.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-outfit">
                    {evt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span>{evt.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-500" />
                      <span className="truncate">{evt.organizer}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                {evt.status === 'upcoming' ? (
                  isRegistered ? (
                    <div className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Registered Successfully</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRegister(evt.id, evt.title)}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>Register for Event (Free Entry)</span>
                    </button>
                  )
                ) : (
                  <div className="w-full py-2.5 text-center text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                    Event Concluded
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
