import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Edit3, Clock, Hash, Menu, X, Coffee, Flame, Flower2, Leaf, MessageCircle, Lightbulb, Bot, ChevronRight, Plus, Trash2, Save, RotateCcw } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [affirmations, setAffirmations] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [counter, setCounter] = useState(0);
  const [showSupportMessage, setShowSupportMessage] = useState(false);
  const [dailyQuoteIndex, setDailyQuoteIndex] = useState(0);
  const [affirmationOfDay, setAffirmationOfDay] = useState(null);
  const [editingAffirmation, setEditingAffirmation] = useState(null);
  const [editingJournal, setEditingJournal] = useState(null);
  const [newAffirmation, setNewAffirmation] = useState('');
  const [newJournal, setNewJournal] = useState({ title: '', text: '' });
  const [reminders, setReminders] = useState([]);
  const [countdownTime, setCountdownTime] = useState(0);
  const [countdownRunning, setCountdownRunning] = useState(false);
  const [countdownMinutes, setCountdownMinutes] = useState(10);
  const [timerType, setTimerType] = useState('countdown');
  const [dailyTime, setDailyTime] = useState('09:00');
  const [intervalHours, setIntervalHours] = useState(2);
  const [timerMessage, setTimerMessage] = useState('');
  const [showTimerAlert, setShowTimerAlert] = useState(false);

  const quotes = [
    { text: "If you will assume your desire and live there as though it were true, no power on earth can stop it from becoming a fact.", author: "Neville Goddard" },
    { text: "Change your conception of yourself and you will automatically change the world in which you live.", author: "Neville Goddard" },
    { text: "A change of feeling is a change of destiny.", author: "Neville Goddard" },
    { text: "The world is a mirror, forever reflecting what you are doing, within yourself.", author: "Neville Goddard" },
    { text: "You are already that which you want to be, and your refusal to believe this is the only reason you do not see it.", author: "Neville Goddard" },
    { text: "Nothing comes from without. All things come from within.", author: "Neville Goddard" },
    { text: "The great secret is a controlled imagination and a well-sustained attention, firmly and repeatedly focused on the object to be accomplished.", author: "Neville Goddard" },
    { text: "If you do not feel natural about what you want to be, you will not be it.", author: "Neville Goddard" },
    { text: "Your assumption, to be effective, cannot be a single isolated act; it must be a maintained attitude of the wish fulfilled.", author: "Neville Goddard" },
    { text: "Do not waste time in regret, for to think feelingly of the mistakes of the past is to re-infect yourself.", author: "Neville Goddard" },
    { text: "The meaning of life is just to be alive. It is so plain and so obvious and so simple. And yet, everybody rushes around in a great panic as if it were necessary to achieve something beyond themselves.", author: "Alan Watts" },
    { text: "This is the real secret of life to be completely engaged with what you are doing in the here and now. And instead of calling it work, realize it is play.", author: "Alan Watts" },
    { text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.", author: "Alan Watts" },
    { text: "You are a function of what the whole universe is doing in the same way that a wave is a function of what the whole ocean is doing.", author: "Alan Watts" },
    { text: "A person who thinks all the time has nothing to think about except thoughts, so he loses touch with reality and lives in a world of illusion.", author: "Alan Watts" },
    { text: "Infinite Spirit, open the way for my great abundance. I am an irresistible magnet for all that belongs to me by Divine Right.", author: "Florence Scovel Shinn" },
    { text: "The game of life is a game of boomerangs. Our thoughts, deeds and words return to us sooner or later with astounding accuracy.", author: "Florence Scovel Shinn" },
    { text: "No matter how much money you have, if you feel poor, you begin to lose money. Nothing comes into your life uninvited. You are always inviting poverty or prosperity through your quality of thought.", author: "Florence Scovel Shinn" },
    { text: "There is no separation in Divine Mind, therefore, I cannot be separated from the love and companionship which are mine by divine right.", author: "Florence Scovel Shinn" },
    { text: "It is the law of nonresistance, which is so little understood. Face a situation fearlessly and there is no situation to face; it falls away of its own weight.", author: "Florence Scovel Shinn" }
  ];

  const methods = [
    {
      id: 1,
      title: "Old Story – New Story",
      emoji: "🔥",
      subtitle: "This method helps you let go of old, burdensome stories and create a new reality.",
      description: "Often we carry experiences, thoughts or patterns within us that still influence us today - even though they are long gone. With this exercise you free yourself from them and rewrite your story - the way you really want to live it.",
      steps: [
        "Write down the old story: Take a situation that stresses or saddens you. Write everything down as honestly and detailed as possible.",
        "Let go: Burn the papers outside under safe conditions. Watch them dissolve in flames.",
        "Write the new story: Rewrite your story the way you would have liked to experience it.",
        "Live your new truth: Stay in this new story for three days. When the old resurfaces, say: Stop! This is no longer my truth."
      ]
    },
    {
      id: 2,
      title: "Feel the Feeling",
      emoji: "🌷",
      subtitle: "Feel the true emotion behind your desire and become the person who lives your manifestation.",
      description: "Often we believe we want certain things, but in truth we long for a specific feeling.",
      steps: [
        "Recognize the true goal: What feeling are you seeking?",
        "Embody your new version: Be the person who already has it.",
        "Recognize what is already there: Where do you feel this already?"
      ]
    },
    {
      id: 3,
      title: "I Am That I Am",
      emoji: "🌿",
      subtitle: "Focus on meditation and thought exercises to dissolve doubt.",
      description: "You already are what you wish to be. Only your doubt makes you believe otherwise.",
      steps: [
        "Meditation: 10 minutes morning and evening, repeat I am.",
        "Thought Exercise: Name your actions mindfully throughout the day.",
        "Stay present: This brings you back to your true power."
      ]
    },
    {
      id: 4,
      title: "Talk to Me – Subconscious",
      emoji: "🗣️",
      subtitle: "Communicate directly with your subconscious.",
      description: "Ask a question, listen, and receive the inner answer.",
      steps: [
        "Formulate question as gratitude sentence.",
        "Listen patiently for a quiet answer.",
        "Create right conditions: quiet time, after meditation.",
        "Trust the process within 48 hours."
      ]
    },
    {
      id: 5,
      title: "Thought Awareness",
      emoji: "💡",
      subtitle: "Consciously recognize and redirect your thoughts.",
      description: "Notice when you think about what you don't want and shift to your desire.",
      steps: [
        "Perceive thoughts without judgment.",
        "Visualize your desired reality brighter.",
        "Use physical reminders like tapping your arm.",
        "Practice regularly to strengthen awareness."
      ]
    },
    {
      id: 6,
      title: "Robotic Affirmations",
      emoji: "🤖",
      subtitle: "Repeat affirmations to calm ego resistance.",
      description: "Saturate your mind with positive affirmations.",
      steps: [
        "Choose a supporting affirmation.",
        "Repeat regularly in a loop.",
        "Feel inner peace and stability grow.",
        "Be patient - it's a practice."
      ]
    }
  ];

  useEffect(() => {
    const savedAffirmations = localStorage.getItem('affirmations');
    const savedJournal = localStorage.getItem('journalEntries');
    const savedCounter = localStorage.getItem('counter');
    const savedReminders = localStorage.getItem('reminders');
    const firstVisit = localStorage.getItem('firstVisit');
    
    if (savedAffirmations) setAffirmations(JSON.parse(savedAffirmations));
    if (savedJournal) setJournalEntries(JSON.parse(savedJournal));
    if (savedCounter) setCounter(parseInt(savedCounter));
    if (savedReminders) setReminders(JSON.parse(savedReminders));
    
    if (!firstVisit) {
      localStorage.setItem('firstVisit', new Date().toISOString());
    } else {
      const daysSinceFirst = Math.floor((new Date() - new Date(firstVisit)) / (1000 * 60 * 60 * 24));
      if (daysSinceFirst >= 7 && !localStorage.getItem('supportMessageShown')) {
        setTimeout(() => setShowSupportMessage(true), 3000);
      }
    }

    const today = new Date().toDateString();
    const savedQuoteDate = localStorage.getItem('quoteDate');
    const savedQuoteIndex = localStorage.getItem('quoteIndex');
    
    if (savedQuoteDate === today && savedQuoteIndex) {
      setDailyQuoteIndex(parseInt(savedQuoteIndex));
    } else {
      const newIndex = Math.floor(Math.random() * quotes.length);
      setDailyQuoteIndex(newIndex);
      localStorage.setItem('quoteDate', today);
      localStorage.setItem('quoteIndex', newIndex.toString());
    }

    if (savedAffirmations) {
      const affs = JSON.parse(savedAffirmations);
      if (affs.length > 0) {
        setAffirmationOfDay(affs[Math.floor(Math.random() * affs.length)]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('affirmations', JSON.stringify(affirmations));
    if (affirmations.length > 0 && Math.random() > 0.7) {
      setAffirmationOfDay(affirmations[Math.floor(Math.random() * affirmations.length)]);
    }
  }, [affirmations]);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('counter', counter.toString());
  }, [counter]);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    let interval;
    if (countdownRunning && countdownTime > 0) {
      interval = setInterval(() => {
        setCountdownTime(prev => {
          if (prev <= 1) {
            setCountdownRunning(false);
            setTimerMessage('Time is up! Reflect on your practice.');
            setShowTimerAlert(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdownRunning, countdownTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const startCountdown = () => {
    setCountdownTime(countdownMinutes * 60);
    setCountdownRunning(true);
  };

  const addReminder = (type) => {
    const newReminder = {
      id: Date.now(),
      type,
      time: type === 'daily' ? dailyTime : null,
      hours: type === 'interval' ? intervalHours : null,
      message: timerMessage || 'Time for your practice!'
    };
    setReminders([...reminders, newReminder]);
    setTimerMessage('');
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const addAffirmation = () => {
    if (newAffirmation.trim()) {
      setAffirmations([...affirmations, { id: Date.now(), text: newAffirmation }]);
      setNewAffirmation('');
    }
  };

  const deleteAffirmation = (id) => {
    setAffirmations(affirmations.filter(a => a.id !== id));
  };

  const updateAffirmation = (id, newText) => {
    setAffirmations(affirmations.map(a => a.id === id ? { ...a, text: newText } : a));
    setEditingAffirmation(null);
  };

  const addJournalEntry = () => {
    if (newJournal.title.trim() && newJournal.text.trim()) {
      setJournalEntries([...journalEntries, { 
        id: Date.now(), 
        date: new Date().toLocaleDateString(),
        ...newJournal 
      }]);
      setNewJournal({ title: '', text: '' });
    }
  };

  const deleteJournalEntry = (id) => {
    setJournalEntries(journalEntries.filter(j => j.id !== id));
  };

  const updateJournalEntry = (id, updates) => {
    setJournalEntries(journalEntries.map(j => j.id === id ? { ...j, ...updates } : j));
    setEditingJournal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-rose-50">
      <div className="bg-gradient-to-r from-rose-50 to-amber-50 p-6 shadow-sm sticky top-0 z-40">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-2xl font-light text-rose-900">Manifestation App 🌸</h1>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-rose-900 p-2">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-rose-50 to-amber-50 shadow-2xl p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-light text-rose-900">Menu</h2>
              <button onClick={() => setMenuOpen(false)}><X size={24} /></button>
            </div>
            <nav className="space-y-4">
              <button onClick={() => { setCurrentPage('home'); setMenuOpen(false); setSelectedMethod(null); }} className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-rose-100 transition text-rose-900 text-left"><Heart size={20} /><span>Home</span></button>
              <button onClick={() => { setCurrentPage('methods'); setMenuOpen(false); setSelectedMethod(null); }} className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-rose-100 transition text-rose-900 text-left"><BookOpen size={20} /><span>Methods</span></button>
              <button onClick={() => { setCurrentPage('affirmations'); setMenuOpen(false); setSelectedMethod(null); }} className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-rose-100 transition text-rose-900 text-left"><Edit3 size={20} /><span>Affirmations</span></button>
              <button onClick={() => { setCurrentPage('journal'); setMenuOpen(false); setSelectedMethod(null); }} className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-rose-100 transition text-rose-900 text-left"><Edit3 size={20} /><span>Journal</span></button>
              <button onClick={() => { setCurrentPage('timer'); setMenuOpen(false); setSelectedMethod(null); }} className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-rose-100 transition text-rose-900 text-left"><Clock size={20} /><span>Timer</span></button>
              <button onClick={() => { setCurrentPage('counter'); setMenuOpen(false); setSelectedMethod(null); }} className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-rose-100 transition text-rose-900 text-left"><Hash size={20} /><span>Counter</span></button>
              <div className="pt-6 border-t border-rose-200">
                <button onClick={() => window.open('https://buymeacoffee.com/simoneullmer', '_blank')} className="flex items-center space-x-3 w-full p-3 rounded-lg bg-amber-100 hover:bg-amber-200 transition text-amber-900"><Coffee size={20} /><span>Support</span></button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {showSupportMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => { setShowSupportMessage(false); localStorage.setItem('supportMessageShown', 'true'); }}>
          <div className="bg-white rounded-3xl p-8 max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center space-y-4">
              <Coffee size={48} className="mx-auto text-amber-600" />
              <h3 className="text-2xl font-light text-rose-900">Enjoying the app?</h3>
              <p className="text-gray-600">If this app brings value to your manifestation journey, consider supporting its development!</p>
              <div className="flex space-x-3 justify-center mt-6">
                <button onClick={() => { window.open('https://buymeacoffee.com/simoneullmer', '_blank'); setShowSupportMessage(false); localStorage.setItem('supportMessageShown', 'true'); }} className="bg-amber-500 text-white px-6 py-3 rounded-xl hover:bg-amber-600 transition">Buy me a coffee</button>
                <button onClick={() => { setShowSupportMessage(false); localStorage.setItem('supportMessageShown', 'true'); }} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition">Maybe later</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTimerAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowTimerAlert(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center space-y-4">
              <Clock size={64} className="mx-auto text-rose-500" />
              <h3 className="text-2xl font-light text-rose-900">Timer Alert</h3>
              <p className="text-gray-700 text-lg">{timerMessage}</p>
              <button onClick={() => setShowTimerAlert(false)} className="bg-rose-500 text-white px-8 py-3 rounded-xl hover:bg-rose-600 transition">Got it!</button>
            </div>
          </div>
        </div>
      )}

      <main className="min-h-screen">
        {currentPage === 'home' && (
          <div className="max-w-2xl mx-auto p-6 space-y-8 pb-24">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-light text-rose-900">Welcome beautiful soul</h2>
              <p className="text-lg text-rose-700">to your personal Manifestation App 🌸</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-100">
              <p className="text-lg text-gray-700 leading-relaxed italic">{quotes[dailyQuoteIndex].text}</p>
              <p className="text-right text-rose-600 mt-4 italic">— {quotes[dailyQuoteIndex].author}</p>
            </div>
            {affirmationOfDay && (
              <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-6 shadow-md border border-amber-100">
                <p className="text-sm text-amber-700 mb-2">✨ Your Affirmation of the Day</p>
                <p className="text-lg text-gray-800">{affirmationOfDay.text}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setCurrentPage('methods')} className="bg-rose-100 hover:bg-rose-200 p-6 rounded-2xl transition shadow-md flex flex-col items-center space-y-2 active:scale-95"><BookOpen size={32} className="text-gray-700" /><span className="font-light text-gray-900">Methods</span></button>
              <button onClick={() => setCurrentPage('affirmations')} className="bg-amber-100 hover:bg-amber-200 p-6 rounded-2xl transition shadow-md flex flex-col items-center space-y-2 active:scale-95"><Edit3 size={32} className="text-gray-700" /><span className="font-light text-gray-900">Affirmations</span></button>
              <button onClick={() => setCurrentPage('journal')} className="bg-rose-100 hover:bg-rose-200 p-6 rounded-2xl transition shadow-md flex flex-col items-center space-y-2 active:scale-95"><Edit3 size={32} className="text-gray-700" /><span className="font-light text-gray-900">Journal</span></button>
              <button onClick={() => setCurrentPage('counter')} className="bg-amber-100 hover:bg-amber-200 p-6 rounded-2xl transition shadow-md flex flex-col items-center space-y-2 active:scale-95"><Hash size={32} className="text-gray-700" /><span className="font-light text-gray-900">Counter</span></button>
            </div>
          </div>
        )}

        {currentPage === 'methods' && !selectedMethod && (
          <div className="max-w-4xl mx-auto p-6 pb-24">
            <h2 className="text-3xl font-light text-rose-900 mb-8 text-center">Manifestation Methods</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {methods.map(method => (
                <div key={method.id} onClick={() => setSelectedMethod(method)} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer border border-rose-100 active:scale-95">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-4xl">{method.emoji}</span>
                    <h3 className="text-xl font-light text-rose-900">{method.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{method.subtitle}</p>
                  <div className="mt-4 flex items-center text-rose-600 text-sm">
                    <span>Learn more</span>
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'methods' && selectedMethod && (
          <div className="max-w-3xl mx-auto p-6 pb-24">
            <button onClick={() => setSelectedMethod(null)} className="mb-6 text-rose-600 hover:text-rose-800">← Back to Methods</button>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-100">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-5xl">{selectedMethod.emoji}</span>
                <h2 className="text-3xl font-light text-rose-900">{selectedMethod.title}</h2>
              </div>
              <p className="text-gray-700 text-lg mb-4 font-light italic">{selectedMethod.subtitle}</p>
              {selectedMethod.description && <p className="text-gray-600 mb-6 leading-relaxed">{selectedMethod.description}</p>}
              <div className="space-y-6">
                <h3 className="text-xl font-light text-rose-800 mb-4">Steps:</h3>
                {selectedMethod.steps.map((step, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-rose-200 rounded-full flex items-center justify-center text-rose-900 font-light text-sm">{index + 1}</div>
                    <p className="text-gray-700 pt-1 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'affirmations' && (
          <div className="max-w-3xl mx-auto p-6 pb-24">
            <h2 className="text-3xl font-light text-rose-900 mb-8 text-center">Your Affirmations</h2>
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 border border-rose-100">
              <div className="flex space-x-2">
                <input type="text" value={newAffirmation} onChange={(e) => setNewAffirmation(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addAffirmation()} placeholder="Write your affirmation..." className="flex-1 p-3 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300" />
                <button onClick={addAffirmation} className="bg-rose-500 text-white p-3 rounded-lg hover:bg-rose-600 transition active:scale-95"><Plus size={24} /></button>
              </div>
            </div>
            <div className="space-y-4">
              {affirmations.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Edit3 size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No affirmations yet. Create your first one above! ✨</p>
                </div>
              ) : (
                affirmations.map(aff => (
                  <div key={aff.id} className="bg-white rounded-xl p-6 shadow-md border border-rose-100">
                    {editingAffirmation === aff.id ? (
                      <input type="text" defaultValue={aff.text} onBlur={(e) => updateAffirmation(aff.id, e.target.value)} onKeyPress={(e) => e.key === 'Enter' && updateAffirmation(aff.id, e.target.value)} className="flex-1 p-2 border border-rose-200 rounded focus:outline-none focus:ring-2 focus:ring-rose-300 w-full" autoFocus />
                    ) : (
                      <div className="flex justify-between items-start">
                        <p className="text-gray-800 flex-1">{aff.text}</p>
                        <div className="flex space-x-2 ml-4">
                          <button onClick={() => setEditingAffirmation(aff.id)} className="text-amber-600 hover:text-amber-800"><Edit3 size={18} /></button>
                          <button onClick={() => deleteAffirmation(aff.id)} className="text-rose-600 hover:text-rose-800"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {currentPage === 'journal' && (
          <div className="max-w-3xl mx-auto p-6 pb-24">
            <h2 className="text-3xl font-light text-rose-900 mb-8 text-center">Your Journal</h2>
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 border border-rose-100">
              <input type="text" value={newJournal.title} onChange={(e) => setNewJournal({ ...newJournal, title: e.target.value })} placeholder="Entry title..." className="w-full p-3 mb-3 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300" />
              <textarea value={newJournal.text} onChange={(e) => setNewJournal({ ...newJournal, text: e.target.value })} placeholder="Write your thoughts..." rows="6" className="w-full p-3 border border-rose-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none" />
              <button onClick={addJournalEntry} className="mt-3 bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition flex items-center space-x-2"><Save size={20} /><span>Save Entry</span></button>
            </div>
            <div className="space-y-4">
              {journalEntries.length === 0
