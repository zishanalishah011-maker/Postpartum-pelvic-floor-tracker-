export interface DailyContent {
  day: number;
  focus: string;
  intention: string;
}

export const dailyContent: DailyContent[] = [
  { day: 1, focus: "Horizontal Rest", intention: "Embrace the stillness. Your only job today is to rest horizontally and bond with your baby." },
  { day: 2, focus: "Diaphragmatic Breathing", intention: "Breathe into your belly. Let your abdomen softly expand on the inhale and relax on the exhale." },
  { day: 3, focus: "Horizontal Rest", intention: "Prioritize gravity-eliminated positions. Your pelvic floor needs this time without gravity to begin healing." },
  { day: 4, focus: "Mindful Tension Release", intention: "Release tension in your jaw and shoulders. Remember that where your jaw goes, your pelvic floor often follows." },
  { day: 5, focus: "Mindful Movement", intention: "Practice 'The Mindful Pause' before lifting your baby. Exhale gently as you lift to protect your core." },
  { day: 6, focus: "Horizontal Rest", intention: "Rest is not a reward; it is a biological necessity right now. Allow yourself to be cared for today." },
  { day: 7, focus: "Postural Awareness", intention: "Notice your posture when feeding. Bring the baby to you, rather than rounding your spine to reach them." },
  { day: 8, focus: "Diaphragmatic Breathing", intention: "Tune into your pelvic floor as you breathe. Feel it gently descend on the inhale and passively recoil on the exhale." },
  { day: 9, focus: "Mindset", intention: "There is no rush to return to 'normal'. Your body has performed a miracle and deserves profound rest." },
  { day: 10, focus: "Mindful Movement", intention: "Try rolling to your side before sitting up from bed. This protects your healing abdominal wall." },
  { day: 11, focus: "Gentle Core Activation", intention: "Engage your deep core gently during a sneeze or cough. Exhale and softly lift your pelvic floor before the pressure hits." },
  { day: 12, focus: "Nourishment", intention: "Hydration is healing. Every time you feed your baby, take a moment to nourish yourself with a glass of water." },
  { day: 13, focus: "Body Literacy", intention: "Listen to the whispers of your body before they become screams. If you feel tired, lie down." },
  { day: 14, focus: "Horizontal Rest", intention: "Celebrate two weeks of survival and gentle healing. Your foundational recovery is building." },
  { day: 15, focus: "Gentle Core Activation", intention: "Incorporate a gentle pelvic tilt while lying down. Small movements are profound right now." },
  { day: 16, focus: "Mindful Movement", intention: "As you walk, notice how your feet hit the ground. Grounding yourself helps reset your nervous system." },
  { day: 17, focus: "Gentle Core Activation", intention: "Practice a seated Kegel only if you are pain-free. Focus on the release just as much as the contraction." },
  { day: 18, focus: "Mindset", intention: "Your recovery is uniquely yours. Release any timeline expectations and honor your body's current pace." },
  { day: 19, focus: "Diaphragmatic Breathing", intention: "Coordinate your breath with movement. Exhale on the exertion, no matter how small the task." },
  { day: 20, focus: "Mindful Movement", intention: "Take a 5-minute slow walk today. Stop immediately if you feel heaviness or pressure." },
  { day: 21, focus: "Gentle Core Activation", intention: "Connect with your transverse abdominis. Imagine gently drawing your hip bones together." },
  { day: 22, focus: "Mindful Tension Release", intention: "Include gentle neck and shoulder circles today. Releasing upper body tension aids pelvic floor relaxation." },
  { day: 23, focus: "Gentle Core Activation", intention: "Try a gentle glute bridge if you feel ready. Keep your breath flowing continuously." },
  { day: 24, focus: "Mindset", intention: "Appreciate your body for what it has done, not just how it looks. You are life-giving and strong." },
  { day: 25, focus: "Body Literacy", intention: "Notice if you are gripping your stomach throughout the day. Intentionally let your belly be soft." },
  { day: 26, focus: "Postural Awareness", intention: "Stand with equal weight on both feet. Finding your center of gravity anew helps foundational stability." },
  { day: 27, focus: "Gentle Core Activation", intention: "Practice 'blow before you go'. Exhale before standing up from a chair to manage intra-abdominal pressure." },
  { day: 28, focus: "Mindful Movement", intention: "Incorporate gentle spinal twists while seated. Movement should feel nourishing, never punishing." },
  { day: 29, focus: "Mindset", intention: "Acknowledge the strength required to heal slowly and incrementally. You are doing beautiful work." },
  { day: 30, focus: "Mindful Transition", intention: "Your 30-day foundation is complete. Continue to move with intention, listen to your body, and seek joy in small moments." }
];

export interface CheckInState {
  pelvicHeaviness: boolean;
  increasedBleeding: boolean;
  energized: boolean;
  zeroPain: boolean;
}

export type ProtocolType = 'REST' | 'MOVEMENT' | 'GENTLE';

export interface ProtocolResult {
  type: ProtocolType;
  title: string;
  message: string;
}

export function getProtocol(state: CheckInState): ProtocolResult | null {
  // If no check-in done (all false, though energized/zeroPain might be legitimately false, 
  // usually we only show protocol after a submission, handled in UI).
  
  if (state.pelvicHeaviness || state.increasedBleeding) {
    return {
      type: 'REST',
      title: 'Rest Protocol Needed',
      message: "Please prioritize Horizontal Rest today. Lie down as much as possible to eliminate gravity on your pelvic floor. Avoid lifting anything heavier than your baby. If bleeding significantly increases, please contact your healthcare provider."
    };
  }
  
  if (state.energized && state.zeroPain) {
    return {
      type: 'MOVEMENT',
      title: 'Movement Suggestion',
      message: "Your body is feeling good! You may try one low-impact movement today, such as a gentle 'seated Kegel' or 'pelvic tilt' while lying down. Remember to coordinate with your breath (exhale on effort) and stop if you experience any heaviness."
    };
  }

  // Mixed or neutral state
  return {
    type: 'GENTLE',
    title: 'Gentle Day Protocol',
    message: "Continue with your mindful healing. Focus on diaphragmatic breathing and gentle daily activities. Rest when you can, and prioritize your basic needs."
  };
}
