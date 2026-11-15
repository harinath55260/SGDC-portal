import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Mic, MicOff, Trash2, X, Sparkles, User, Globe, AlertCircle, ChevronRight } from 'lucide-react';
import { askCollegeAI } from '../../services/geminiAI';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { COLLEGE_INFO } from '../../services/collegeData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language?: string;
}

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { language: currentAppLang } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<'en' | 'te' | 'hi'>(currentAppLang);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('sgdc_chat_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'msg-welcome',
        sender: 'assistant',
        text: `Hello! I am your Shri Gnanambica Degree College AI Assistant. I can answer questions about your attendance, exam schedules, courses, faculty, today's timetable, fees, and campus placements. How can I help you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('sgdc_chat_history', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    setSelectedLang(currentAppLang);
  }, [currentAppLang]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isTyping) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!queryText) setInput('');
    setIsTyping(true);

    try {
      const responseText = await askCollegeAI(textToSend, selectedLang, user);
      const assistantMessage: Message = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: selectedLang
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (e) {
      const errMessage: Message = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: "I don't have this information in the college database. Please contact the college administration.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = selectedLang === 'te' ? 'te-IN' : selectedLang === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          handleSend(transcript);
        }
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  const clearHistory = () => {
    const initialWelcome: Message = {
      id: `init-${Date.now()}`,
      sender: 'assistant',
      text: selectedLang === 'te' 
        ? 'శ్రీ జ్ఞానాంబిక డిగ్రీ కళాశాల AI అసిస్టెంట్‌కి స్వాగతం. మీరు కోర్సులు, హాజరు, పరీక్షలు లేదా కాలపట్టిక గురించి అడగవచ్చు.'
        : selectedLang === 'hi'
        ? 'श्री ज्ञानांबिका डिग्री कॉलेज AI सहायक में आपका स्वागत है। आप पाठ्यक्रम, उपस्थिति, परीक्षा या समय सारणी के बारे में पूछ सकते हैं।'
        : 'Chat history cleared. How may I assist you with Shri Gnanambica Degree College today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([initialWelcome]);
    localStorage.removeItem('sgdc_chat_history');
  };

  const suggestedPrompts = [
    { en: 'What is my attendance?', te: 'నా హాజరు శాతం ఎంత?', hi: 'मेरी उपस्थिति कितनी है?' },
    { en: 'When is my exam?', te: 'నా పరీక్షలు ఎప్పుడు?', hi: 'मेरी परीक्षाएं कब हैं?' },
    { en: 'Show today\'s timetable', te: 'నేటి టైమ్‌టేబుల్ చూపించండి', hi: 'आज की समय सारणी दिखाएं' },
    { en: 'What courses are available?', te: 'ఏ కోర్సులు అందుబాటులో ఉన్నాయి?', hi: 'कौन से पाठ्यक्रम उपलब्ध हैं?' },
    { en: 'What are the latest notices?', te: 'తాజా నోటీసులు ఏమిటి?', hi: 'नवीनतम सूचनाएं क्या हैं?' },
    { en: 'What placement drives are active?', te: 'ప్లేస్‌మెంట్స్ వివరాలు చూపించు', hi: 'सक्रिय प्लेसमेंट कौन से हैं?' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-inner">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-base flex items-center gap-1.5">
                SGDC AI Assistant
                <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-1.5 py-0.5 rounded-full font-semibold border border-emerald-400/40">Grounded</span>
              </div>
              <div className="text-xs text-blue-100/90 font-medium">
                Shri Gnanambica Degree College (Autonomous)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-black/20 rounded-lg p-0.5 border border-white/20">
              {(['en', 'te', 'hi'] as const).map(lng => (
                <button
                  key={lng}
                  onClick={() => setSelectedLang(lng)}
                  className={`px-2 py-0.5 text-[11px] font-semibold rounded-md transition-colors ${
                    selectedLang === lng ? 'bg-white text-blue-900 shadow-xs' : 'text-blue-100 hover:text-white'
                  }`}
                >
                  {lng === 'en' ? 'EN' : lng === 'te' ? 'తెలుగు' : 'हिंदी'}
                </button>
              ))}
            </div>

            <button 
              onClick={clearHistory}
              title="Clear chat history"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Informational Disclaimer banner */}
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/50 flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
          <span>Factual AI powered by approved Shri Gnanambica College knowledge base.</span>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 dark:bg-slate-950/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none whitespace-pre-line'
                }`}
              >
                {msg.text}
                <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-none px-4 py-2.5 text-xs text-slate-500 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-1 text-slate-400">Consulting college database...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries */}
        <div className="px-4 py-2 bg-slate-100/70 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Suggested Quick Inquiries
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {suggestedPrompts.map((p, idx) => {
              const text = p[selectedLang] || p.en;
              return (
                <button
                  key={idx}
                  onClick={() => handleSend(text)}
                  className="px-2.5 py-1 text-xs whitespace-nowrap bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs"
                >
                  {text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                selectedLang === 'te' 
                  ? 'తెలుగులో ఏదైనా అడగండి...' 
                  : selectedLang === 'hi' 
                  ? 'हिंदी में कुछ भी पूछें...' 
                  : 'Ask in English, Telugu or Hindi...'
              }
              className="flex-1 px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />

            {/* Voice Input */}
            <button
              type="button"
              onClick={handleVoiceInput}
              title={isListening ? 'Stop listening' : 'Speak your question'}
              className={`p-2.5 rounded-xl border transition-colors ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:text-blue-600 hover:border-blue-400'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
