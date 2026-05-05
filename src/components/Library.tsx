import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, ArrowLeft } from 'lucide-react';

export function Library() {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const resources = [
    {
      title: "Diaphragmatic Breathing 101",
      category: "Article",
      icon: <FileText className="w-5 h-5" />,
      description: "Learn how to reconnect with your core using the gentle power of your breath.",
      content: "Diaphragmatic breathing (often called belly breathing) is the foundation of postpartum core recovery. During pregnancy, your growing baby changes the mechanics of your diaphragm and pelvic floor. The goal now isn't to force your belly in, but to re-establish the piston-like coordination between these two muscle groups.\n\nTo practice:\n1. Lie comfortably on your back with your knees bent (hook-lying position).\n2. Place one hand on your chest and the other on your belly.\n3. Inhale deeply through your nose. Feel your belly rise against your hand, expanding gently 360 degrees into your sides and back. Your chest should remain relatively still.\n4. Exhale softly through your mouth (like blowing through a straw). Notice how your belly gently falls, and your pelvic floor naturally recoils.\n\nThis simple act massages your internal organs, calms your nervous system, and gently reminds your deep core muscles how to function together again. Aim for 5-10 breaths a few times a day."
    },
    {
      title: "Understanding Pelvic Heaviness",
      category: "Article",
      icon: <FileText className="w-5 h-5" />,
      description: "A trauma-informed guide to understanding heaviness, pressure, and the recovery journey.",
      content: "Feeling heaviness, dragging, or pressure in your pelvis postpartum is incredibly common, but it's a signal that your body needs attention—specifically, rest.\n\nDuring pregnancy and birth, the connective tissue, ligaments, and muscles of your pelvic floor undergo immense stretching and strain. Postpartum heaviness is often your tissue's way of saying, \"Gravity is too much for me right now.\"\n\nWhat to do when you feel it:\n- Listen immediately: Do not push through the feeling.\n- Assume a gravity-eliminated position: Lie down flat. Putting your feet up or lying on your side removes the downward pressure on your pelvic floor.\n- Breathe: Use diaphragmatic breathing to relieve intra-abdominal pressure.\n- Communicate: If the heaviness persists, is accompanied by pain, or worsens, consult your pelvic floor physical therapist.\n\nRemember, your body is not broken. It is healing. Honoring these signals early on builds a much stronger foundation for long-term recovery."
    },
    {
      title: "The First 14 Days: Horizontal Rest",
      category: "Article",
      icon: <FileText className="w-5 h-5" />,
      description: "Why laying down is the deeply productive work your body needs right now.",
      content: "In many traditional cultures, the first 30 to 40 days postpartum are a dedicated period of deep rest—often called the \"lying-in\" period. In modern western culture, we are unfortunately pushed to \"bounce back\" and resume normal activities far too quickly.\n\nFor the first 14 days, your primary goal should be Horizontal Rest.\n\nWhy Horizontal?\nWhen you stand or sit upright, gravity exerts downward force on your healing uterus and stretched pelvic floor. By laying down, you completely eliminate this gravitational pull, allowing tissues to shrink, repair, and recover without added stress.\n\nWhat this looks like:\n- Stay in bed or on the couch as much as possible.\n- Limit walking to the bathroom and small necessary trips.\n- Feed your baby in side-lying or highly supported reclining positions.\n\nResting is not lazy; it is a highly active biological process. Your body is doing the invisible, massive work of tissue repair, hormone regulation, and milk production. Honor this time."
    },
    {
      title: "Hydration and Tissue Healing",
      category: "Article",
      icon: <FileText className="w-5 h-5" />,
      description: "Tissue recovery needs water. Tips to easily hit your 2.0L goal while feeding.",
      content: "Water is the unsung hero of postpartum recovery. Every cellular process involved in tissue repair requires adequate hydration. If you are body-feeding (nursing/pumping), your fluid needs are even higher.\n\nWhy it matters:\n- Tissue repair: Connective tissue and muscles need hydration to maintain elasticity and heal tearing or surgical incisions.\n- Constipation prevention: The first postpartum bowel movements can be daunting. Water combined with dietary fiber keeps stool soft, preventing the dangerous need to bear down or strain your healing pelvic floor.\n- Energy: Even mild dehydration can drastically exacerbate exhaustion.\n\nPractical tips:\n- Create a hydration station wherever you feed your baby.\n- Drink a glass of water every time you sit down to feed.\n- Use a straw; many people find they drink more water faster with a straw.\n- Add electrolytes if you are sweating heavily from postpartum hormone shifts."
    },
    {
      title: "The Log Roll Transition",
      category: "Article",
      icon: <FileText className="w-5 h-5" />,
      description: "Protect your abdominal wall when getting out of bed to prevent diastasis recti strain.",
      content: "How you get out of bed matters, especially in the early weeks postpartum. The traditional \"sit-up\" motion creates a massive spike in intra-abdominal pressure. This pressure pushes outward against your healing abdominal muscles (linea alba) and downward onto your pelvic floor.\n\nInstead, use the Log Roll technique to protect your core:\n\n1. From lying on your back, bend your knees.\n2. Keep your shoulders, hips, and knees moving together as one unit (like a log) and roll onto your side.\n3. Let your legs drop softly over the edge of the bed.\n4. Use your top arm and bottom elbow to push your upper body up into a seated position.\n5. Exhale gently as you push up.\n\nBy pushing up from your side, you rely on your arm strength rather than straining your vulnerable abdominal wall. This simple habit prevents exacerbating diastasis recti (abdominal separation) and protects your pelvic floor."
    }
  ];

  return (
    <motion.div 
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       className="bg-white rounded-[40px] p-6 md:p-8 shadow-sm border border-natural-border-light h-full flex flex-col relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {selectedArticle === null ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
          >
            <div className="mb-6 md:mb-8 shrink-0">
              <h2 className="text-2xl font-serif text-natural-primary mb-2">Resource Library</h2>
              <p className="text-sm text-natural-muted">Gentle education to support your healing. No pressure, read at your own pace.</p>
            </div>
            
            <div className="flex-grow overflow-auto pr-2">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resources.map((res, index) => (
                      <button 
                        key={index}
                        onClick={() => setSelectedArticle(index)}
                        className="p-5 rounded-3xl bg-natural-card border border-natural-border hover:border-natural-primary text-left transition-colors flex flex-col h-full group"
                      >
                         <div className="flex items-center gap-2 mb-3">
                           <span className="text-natural-primary">{res.icon}</span>
                           <span className="text-[10px] uppercase tracking-widest font-bold text-natural-muted">{res.category}</span>
                         </div>
                         <h3 className="font-serif text-lg text-natural-primary mb-2 line-clamp-2">{res.title}</h3>
                         <p className="text-sm text-natural-muted leading-relaxed mt-auto">{res.description}</p>
                      </button>
                  ))}
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="article"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full"
          >
             <button 
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-natural-muted hover:text-natural-primary transition-colors mb-6 shrink-0 w-fit"
             >
                <ArrowLeft className="w-4 h-4" />
                Back to Library
             </button>

             <div className="flex-grow overflow-auto pr-2 pb-6">
                <div className="max-w-prose">
                   <div className="flex items-center gap-2 mb-4">
                     <span className="text-natural-primary">{resources[selectedArticle].icon}</span>
                     <span className="text-[10px] uppercase tracking-widest font-bold text-natural-primary">{resources[selectedArticle].category}</span>
                   </div>
                   <h2 className="text-3xl font-serif text-natural-primary mb-6 leading-tight">
                     {resources[selectedArticle].title}
                   </h2>
                   
                   <div className="space-y-4 text-natural-text leading-relaxed">
                      {resources[selectedArticle].content.split('\n\n').map((paragraph, i) => (
                         <p key={i}>{paragraph}</p>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
