import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, Droplet, Battery, Heart, Calendar } from 'lucide-react';
import { CheckInState } from '../data/content';

interface SymptomLogProps {
  logs: Record<number, { checkIn: CheckInState | null }>;
  onGoToLog: () => void;
  currentDay: number;
}

export function SymptomLog({ logs, onGoToLog, currentDay }: SymptomLogProps) {
  const loggedDays = Object.entries(logs)
    .filter(([_, data]) => data.checkIn !== null && data.checkIn !== undefined)
    .map(([day, data]) => ({ day: parseInt(day), ...data.checkIn! }))
    .sort((a, b) => b.day - a.day); // newest first

  const totalLogged = loggedDays.length;
  const trackingPercent = Math.round((totalLogged / 30) * 100);
  
  const painFreeDays = loggedDays.filter(l => l.zeroPain && !l.pelvicHeaviness).length;
  const wellnessPercent = totalLogged > 0 ? Math.round((painFreeDays / totalLogged) * 100) : 0;

  const currentDayLogged = logs[currentDay]?.checkIn !== null && logs[currentDay]?.checkIn !== undefined;

  return (
    <motion.div 
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       className="bg-white rounded-[40px] p-6 md:p-8 shadow-sm border border-natural-border-light h-full flex flex-col"
    >
      <div className="mb-6 md:mb-8 shrink-0">
        <h2 className="text-2xl font-serif text-natural-primary mb-2">Symptom Log & Progress</h2>
        <p className="text-sm text-natural-muted">Track your healing journey and share these patterns with your healthcare provider.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 shrink-0">
         <div className="bg-natural-card p-4 rounded-2xl border border-natural-border flex flex-col justify-between">
           <p className="text-[10px] uppercase tracking-widest font-bold text-natural-muted mb-2">Tracking Consistency</p>
           <div className="flex items-end gap-2 mb-2">
             <span className="text-3xl font-serif text-natural-primary leading-none">{trackingPercent}%</span>
             <span className="text-sm text-natural-muted mb-1">{totalLogged}/30 days</span>
           </div>
           <div className="w-full bg-natural-accent/50 h-1.5 rounded-full overflow-hidden">
             <div className="bg-natural-primary h-full transition-all duration-500" style={{ width: `${trackingPercent}%` }}></div>
           </div>
         </div>
         <div className="bg-natural-card p-4 rounded-2xl border border-natural-border flex flex-col justify-between">
           <p className="text-[10px] uppercase tracking-widest font-bold text-natural-muted mb-2">Pain-Free Days</p>
           <div className="flex items-end gap-2 mb-2">
             <span className="text-3xl font-serif text-natural-primary leading-none">{wellnessPercent}%</span>
             <span className="text-sm text-natural-muted mb-1">of logged days</span>
           </div>
           <div className="w-full bg-natural-accent/50 h-1.5 rounded-full overflow-hidden">
             <div className="bg-emerald-600 h-full transition-all duration-500" style={{ width: `${wellnessPercent}%` }}></div>
           </div>
         </div>
      </div>
      
      {!currentDayLogged && (
         <button 
           onClick={onGoToLog}
           className="shrink-0 w-full mb-6 py-4 rounded-2xl border-2 border-dashed border-natural-primary/30 text-natural-primary hover:bg-natural-primary/5 transition-colors font-medium flex items-center justify-center gap-2"
         >
           + Log Symptoms for Day {currentDay}
         </button>
      )}

      <div className="flex-grow overflow-auto pr-2">
        {loggedDays.length === 0 ? (
           <div className="text-center py-10">
              <Calendar className="w-12 h-12 text-natural-muted/30 mx-auto mb-3" />
              <p className="text-natural-muted font-medium">No symptoms logged yet.</p>
              <p className="text-sm text-natural-muted opacity-80 mt-1">Check in daily to build your recovery map.</p>
           </div>
        ) : (
          <div className="space-y-4 pb-4">
            {loggedDays.map((log) => (
              <div key={log.day} className="p-4 rounded-3xl bg-natural-card border border-natural-border flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-natural-accent text-natural-primary font-medium shadow-sm">
                     {log.day}
                   </div>
                   <span className="text-sm font-semibold uppercase tracking-widest text-natural-muted">Day {log.day}</span>
                 </div>
                 
                 <div className="flex flex-wrap gap-2 sm:justify-end">
                   {log.pelvicHeaviness && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-natural-accent text-xs font-medium text-natural-text">
                         <AlertCircle className="w-3.5 h-3.5 text-natural-primary" />
                         Heaviness
                      </div>
                   )}
                   {log.increasedBleeding && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-natural-accent text-xs font-medium text-natural-text">
                         <Droplet className="w-3.5 h-3.5 text-natural-primary" />
                         Bleeding
                      </div>
                   )}
                   {log.energized && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-natural-accent text-xs font-medium text-natural-text">
                         <Battery className="w-3.5 h-3.5 text-natural-primary" />
                         Energized
                      </div>
                   )}
                   {log.zeroPain && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-natural-accent text-xs font-medium text-natural-text">
                         <Heart className="w-3.5 h-3.5 text-natural-primary" />
                         Zero Pain
                      </div>
                   )}
                   {!log.pelvicHeaviness && !log.increasedBleeding && !log.energized && !log.zeroPain && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-natural-card-alt rounded-full text-xs font-medium text-natural-muted italic">
                         No significant symptoms
                      </div>
                   )}
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
