import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, ChevronLeft, ChevronRight, Droplets, Wheat, Calendar, Activity } from 'lucide-react';
import { dailyContent, getProtocol, CheckInState, ProtocolResult } from './data/content';
import { MorningCheckIn } from './components/CheckInForm';
import { Library } from './components/Library';
import { SymptomLog } from './components/SymptomLog';

export interface DayData {
  hydratedState: boolean[];
  fiberState: boolean[];
  checkIn: CheckInState | null;
  protocolResult: ProtocolResult | null;
}

function WelcomeScreen({ onComplete }: { onComplete: (name: string) => void }) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-natural-bg font-sans selection:bg-natural-accent/30 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-natural-card p-8 md:p-12 rounded-[40px] border border-natural-border shadow-sm max-w-md w-full"
      >
        <div className="flex justify-center mb-6">
           <Leaf className="w-10 h-10 text-natural-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif italic text-natural-primary text-center mb-4">Welcome</h1>
        <p className="text-center text-natural-muted mb-8 text-sm md:text-base leading-relaxed">
          This space is dedicated to your healing. Please tell us your name to personalize your 30-day journey.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)}
            placeholder="Your preferred name"
            className="w-full bg-white border border-natural-accent/50 rounded-2xl px-6 py-4 text-natural-text focus:outline-none focus:ring-2 focus:ring-natural-primary focus:border-transparent text-center font-serif text-lg"
            autoFocus
          />
          <button 
            type="submit" 
            disabled={!name.trim()}
            className="w-full bg-natural-primary text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm disabled:opacity-50 transition-opacity"
          >
            Begin Journey
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userName, setUserName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  
  const [currentDay, setCurrentDay] = useState(1);
  const [activeTab, setActiveTab] = useState<'daily' | 'library' | 'symptoms'>('daily');
  
  const [allDaysData, setAllDaysData] = useState<Record<number, DayData>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('postpartumTrackerState');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.userName) {
          setUserName(parsed.userName);
          setIsNameSet(true);
        }
        if (parsed.currentDay) setCurrentDay(parsed.currentDay);
        if (parsed.allDaysData) setAllDaysData(parsed.allDaysData);
      }
    } catch (e) {
      console.error("Failed to load state", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && isNameSet) {
      localStorage.setItem('postpartumTrackerState', JSON.stringify({
        userName,
        currentDay,
        allDaysData
      }));
    }
  }, [userName, currentDay, allDaysData, isLoaded, isNameSet]);

  const content = dailyContent.find(d => d.day === currentDay) || dailyContent[0];

  const dayData = allDaysData[currentDay] || {
    hydratedState: [false, false, false, false],
    fiberState: [false, false],
    checkIn: null,
    protocolResult: null
  };

  const updateDayData = (updates: Partial<DayData>) => {
    setAllDaysData(prev => ({
      ...prev,
      [currentDay]: {
        ...(prev[currentDay] || {
          hydratedState: [false, false, false, false],
          fiberState: [false, false],
          checkIn: null,
          protocolResult: null
        }),
        ...updates
      }
    }));
  };

  const handleCheckInComplete = (state: CheckInState) => {
    updateDayData({
      checkIn: state,
      protocolResult: getProtocol(state)
    });
  };

  const handleClearCheckIn = () => {
    updateDayData({
      checkIn: null,
      protocolResult: null
    });
  };

  const nextDay = () => setCurrentDay(Math.min(30, currentDay + 1));
  const prevDay = () => setCurrentDay(Math.max(1, currentDay - 1));

  if (!isLoaded) return null;

  if (!isNameSet) {
    return (
      <WelcomeScreen 
        onComplete={(name) => {
          setUserName(name);
          setIsNameSet(true);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-natural-bg text-natural-text font-sans selection:bg-natural-accent/30 flex flex-col items-center">
      <div className="w-full max-w-[1024px] min-h-screen flex flex-col p-4 md:p-8 overflow-x-hidden">
        
        {/* Header Navigation */}
        <header className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4 shrink-0">
          <div>
            <h1 className="text-3xl font-serif italic text-natural-primary mb-1">
               {userName ? `${userName}'s Healing Journey` : `Postpartum Healing Journey`}
            </h1>
            <p className="text-sm tracking-widest uppercase opacity-70 flex items-center">
              Day {currentDay} of 30 • Phase: {currentDay <= 14 ? 'Deep Rest' : 'Gentle Awakening'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                 <button onClick={prevDay} disabled={currentDay === 1} className="p-1.5 rounded-full hover:bg-natural-accent/50 disabled:opacity-30 transition-colors">
                     <ChevronLeft className="w-5 h-5 text-natural-primary" />
                 </button>
                 <div className="flex gap-2 mx-2">
                   {[...Array(4)].map((_, i) => (
                      <div key={i} className={`w-8 md:w-12 h-1 rounded-full ${i < Math.ceil(currentDay/(30/4)) ? 'bg-natural-primary' : 'bg-natural-accent'}`}></div>
                   ))}
                </div>
                 <button onClick={nextDay} disabled={currentDay === 30} className="p-1.5 rounded-full hover:bg-natural-accent/50 disabled:opacity-30 transition-colors">
                     <ChevronRight className="w-5 h-5 text-natural-primary" />
                 </button>
             </div>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-12 gap-8 flex-grow">
          {/* Left Sidebar: Daily Intention & Reminders */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div 
                key={`intention-${currentDay}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-natural-card p-6 rounded-[32px] border border-natural-border shadow-sm"
              >
                <span className="text-[10px] uppercase tracking-widest font-bold text-natural-muted mb-4 block">Today's Intention: {content.focus}</span>
                <p className="font-serif text-xl italic leading-relaxed text-natural-primary">
                  "{content.intention}"
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="bg-natural-card-alt p-6 rounded-[32px] border border-natural-border-alt flex-grow flex flex-col justify-center space-y-6">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-natural-muted">Nourishment Baseline</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-natural-accent flex items-center justify-center text-lg shrink-0">💧</div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                       <p className="text-sm font-semibold">Hydration</p>
                       <p className="text-xs text-natural-muted text-right">{dayData.hydratedState.filter(Boolean).length * 0.5}L / 2.0L</p>
                    </div>
                    <div className="flex gap-2">
                       {[0, 1, 2, 3].map(i => (
                         <button 
                           key={`water-${i}`}
                           onClick={() => {
                             const newH = [...dayData.hydratedState];
                             newH[i] = !newH[i];
                             updateDayData({ hydratedState: newH });
                           }}
                           className={`h-8 flex-1 rounded-md transition-all ${
                             dayData.hydratedState[i] 
                               ? 'bg-natural-primary opacity-80' 
                               : 'bg-white border border-natural-border hover:bg-natural-bg'
                           }`}
                         />
                       ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-natural-accent flex items-center justify-center text-lg shrink-0">🌾</div>
                  <div className="flex-grow">
                     <div className="flex justify-between items-center mb-1">
                       <p className="text-sm font-semibold">Fiber Intake</p>
                       <p className="text-xs text-natural-muted text-right">{dayData.fiberState.filter(Boolean).length}/2 meals</p>
                    </div>
                    <div className="flex gap-2">
                       {[0, 1].map(i => (
                         <button 
                           key={`fiber-${i}`}
                           onClick={() => {
                             const newF = [...dayData.fiberState];
                             newF[i] = !newF[i];
                             updateDayData({ fiberState: newF });
                           }}
                           className={`h-8 flex-1 rounded-md transition-all ${
                             dayData.fiberState[i] 
                               ? 'bg-natural-primary opacity-80' 
                               : 'bg-white border border-natural-border hover:bg-natural-bg'
                           }`}
                         />
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 text-center border-t border-natural-accent opacity-60 italic text-xs text-natural-text mt-auto shrink-0">
              Trauma-informed • Compassionate Care • Non-Judgmental
            </div>
          </div>

          {/* Main Tracker Logic */}
          <div className="col-span-1 md:col-span-8 flex flex-col">
            {activeTab === 'daily' && (
              <MorningCheckIn 
                onComplete={handleCheckInComplete} 
                result={dayData.protocolResult} 
                onClear={handleClearCheckIn} 
                initialState={dayData.checkIn} 
              />
            )}
            {activeTab === 'library' && (
              <Library />
            )}
            {activeTab === 'symptoms' && (
              <SymptomLog 
                logs={allDaysData}
                currentDay={currentDay}
                onGoToLog={() => setActiveTab('daily')}
              />
            )}
          </div>
        </main>
        
        {/* Footer Navigation */}
        <footer className="mt-8 flex justify-center shrink-0">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] uppercase tracking-widest font-bold text-natural-muted">
            <button 
              onClick={() => setActiveTab('daily')} 
              className={`transition-colors ${activeTab === 'daily' ? 'text-natural-primary border-b-2 border-natural-primary pb-1' : 'hover:text-natural-primary pb-[6px]'}`}
            >
              Daily Track
            </button>
            <button 
              onClick={() => setActiveTab('library')} 
              className={`transition-colors ${activeTab === 'library' ? 'text-natural-primary border-b-2 border-natural-primary pb-1' : 'hover:text-natural-primary pb-[6px]'}`}
            >
              Library
            </button>
            <button 
              onClick={() => setActiveTab('symptoms')} 
              className={`transition-colors ${activeTab === 'symptoms' ? 'text-natural-primary border-b-2 border-natural-primary pb-1' : 'hover:text-natural-primary pb-[6px]'}`}
            >
              Symptom Log
            </button>
            <a href="#" className="hover:text-natural-primary transition-colors pb-[6px]">Support</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
