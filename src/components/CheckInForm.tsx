import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Droplet, Battery, AlertCircle } from 'lucide-react';
import { CheckInState, ProtocolResult } from '../data/content';

interface CheckInProps {
  onComplete: (state: CheckInState) => void;
  result: ProtocolResult | null;
  onClear: () => void;
  initialState: CheckInState | null;
}

export function MorningCheckIn({ onComplete, result, onClear, initialState }: CheckInProps) {
  const [state, setState] = React.useState<CheckInState>(initialState || {
    pelvicHeaviness: false,
    increasedBleeding: false,
    energized: false,
    zeroPain: false,
  });

  React.useEffect(() => {
     if(initialState) {
        setState(initialState);
     } else {
        setState({
          pelvicHeaviness: false,
          increasedBleeding: false,
          energized: false,
          zeroPain: false,
        });
     }
  }, [initialState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(state);
  };

  return (
    <div className="bg-white rounded-[40px] p-6 md:p-8 shadow-sm border border-natural-border-light h-full flex flex-col">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl font-serif text-natural-primary mb-2">Morning Wellness Check-in</h2>
        <p className="text-sm text-natural-muted">Listen to your body's signals without judgment. They are guides, not failures.</p>
      </div>
      
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit} 
            className="flex-grow flex flex-col"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <button 
                 type="button"
                 onClick={() => setState({...state, pelvicHeaviness: !state.pelvicHeaviness})}
                 className={`p-4 xl:p-5 rounded-2xl text-left flex justify-between items-center transition-colors group ${state.pelvicHeaviness ? 'border-2 border-natural-primary bg-natural-card' : 'border border-natural-border hover:border-natural-primary bg-white'}`}
               >
                  <span className="font-medium text-natural-text text-sm md:text-base flex items-center gap-2">
                     <AlertCircle className={`w-4 h-4 shrink-0 ${state.pelvicHeaviness ? 'text-natural-primary' : 'text-natural-muted'}`} />
                     Pelvic Heaviness
                  </span>
                  <div className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${state.pelvicHeaviness ? 'bg-natural-primary' : 'border border-natural-accent'}`}>
                     {state.pelvicHeaviness && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
              </button>

              <button 
                 type="button"
                 onClick={() => setState({...state, increasedBleeding: !state.increasedBleeding})}
                 className={`p-4 xl:p-5 rounded-2xl text-left flex justify-between items-center transition-colors group ${state.increasedBleeding ? 'border-2 border-natural-primary bg-natural-card' : 'border border-natural-border hover:border-natural-primary bg-white'}`}
               >
                  <span className="font-medium text-natural-text text-sm md:text-base flex items-center gap-2">
                      <Droplet className={`w-4 h-4 shrink-0 ${state.increasedBleeding ? 'text-natural-primary' : 'text-natural-muted'}`} />
                      Increased Bleeding
                  </span>
                  <div className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${state.increasedBleeding ? 'bg-natural-primary' : 'border border-natural-accent'}`}>
                     {state.increasedBleeding && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
              </button>

              <button 
                 type="button"
                 onClick={() => setState({...state, energized: !state.energized})}
                 className={`p-4 xl:p-5 rounded-2xl text-left flex justify-between items-center transition-colors group ${state.energized ? 'border-2 border-natural-primary bg-natural-card' : 'border border-natural-border hover:border-natural-primary bg-white'}`}
               >
                  <span className="font-medium text-natural-text text-sm md:text-base flex items-center gap-2">
                      <Battery className={`w-4 h-4 shrink-0 ${state.energized ? 'text-natural-primary' : 'text-natural-muted'}`} />
                      Feeling Energized
                  </span>
                  <div className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${state.energized ? 'bg-natural-primary' : 'border border-natural-accent'}`}>
                     {state.energized && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
              </button>

              <button 
                 type="button"
                 onClick={() => setState({...state, zeroPain: !state.zeroPain})}
                 className={`p-4 xl:p-5 rounded-2xl text-left flex justify-between items-center transition-colors group ${state.zeroPain ? 'border-2 border-natural-primary bg-natural-card' : 'border border-natural-border hover:border-natural-primary bg-white'}`}
               >
                  <span className="font-medium text-natural-text text-sm md:text-base flex items-center gap-2">
                      <Heart className={`w-4 h-4 shrink-0 ${state.zeroPain ? 'text-natural-primary' : 'text-natural-muted'}`} />
                      Zero Pain
                  </span>
                  <div className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center ${state.zeroPain ? 'bg-natural-primary' : 'border border-natural-accent'}`}>
                     {state.zeroPain && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
              </button>
            </div>

            <div className="mt-auto pt-4 border-t border-natural-border-light flex justify-center md:justify-end">
              <button 
                type="submit"
                className="w-full md:w-auto bg-natural-primary hover:bg-[#4a4a35] text-white font-bold py-4 px-8 rounded-full transition-all active:scale-[0.98] uppercase tracking-wider text-sm"
              >
                Get Daily Protocol
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-auto h-full flex flex-col justify-end"
          >
             <div className="bg-natural-primary text-white p-6 md:p-8 rounded-[32px] relative overflow-hidden">
                <div className="relative z-10">
                   <div className="flex items-center gap-2 mb-2">
                     <span className="text-[10px] uppercase tracking-[0.2em] opacity-80">Current Guidance</span>
                     <div className="h-[1px] flex-grow bg-white opacity-20"></div>
                   </div>
                   <h3 className="text-xl md:text-2xl font-serif mb-3">Protocol: {result?.title}</h3>
                   <p className="text-[#e2e2d5] leading-relaxed mb-6">
                     {result?.message}
                   </p>
                   <div className="flex flex-wrap gap-4">
                     <button onClick={onClear} className="px-6 py-2 bg-white text-natural-primary rounded-full text-sm font-bold uppercase tracking-wider">Log Complete</button>
                     <button onClick={onClear} className="px-6 py-2 border border-white/30 rounded-full text-sm uppercase tracking-wider hover:bg-white/10 transition-colors">Adjust Report</button>
                   </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none"></div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
