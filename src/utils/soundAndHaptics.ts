/**
 * Web Audio API & Vibration API Utility for FitMos
 * Sintetik tovushlar — internetsiz, fayllarsiz 100% offline ishlaydi.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Qisqa chertish tovushi (1-Tap ovozi)
export function playTapSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.debug('Audio tap ignored', e);
  }
}

// Podxod bajarilgandagi g'alaba signali
export function playSetCompleteSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Ikki pog'onali yoqimli akkord
    const playTone = (freq: number, start: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + dur);
    };

    playTone(523.25, now, 0.12); // C5
    playTone(659.25, now + 0.1, 0.2); // E5
  } catch (e) {
    console.debug('Audio set complete error', e);
  }
}

// Dam olish taymeri tugaganda jiringlaydigan ogohlantirish (3 ta qisqa signal)
export function playRestTimerFinishedSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const playChime = (freq: number, time: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.25);
    };

    playChime(659.25, now);        // E5
    playChime(783.99, now + 0.15); // G5
    playChime(1046.50, now + 0.3); // C6
  } catch (e) {
    console.debug('Audio chime error', e);
  }
}

// Web Vibration API (Telefonda titrash)
export function triggerHaptic(pattern: number | number[] = 50) {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignored
    }
  }
}

// Dam olish taymeri tugagandagi qattiq titrash: [200ms titrash, 100ms tanaffus, 300ms titrash]
export function triggerTimerVibration() {
  triggerHaptic([250, 100, 250, 100, 400]);
}

// Screen Wake Lock API — Mashg'ulot paytida telefon ekrani o'chib qolmasligi uchun
let wakeLockSentinel: any = null;

export async function requestScreenWakeLock(): Promise<boolean> {
  if (typeof window !== 'undefined' && 'wakeLock' in navigator) {
    try {
      wakeLockSentinel = await (navigator as any).wakeLock.request('screen');
      wakeLockSentinel.addEventListener('release', () => {
        wakeLockSentinel = null;
      });
      return true;
    } catch (err) {
      console.debug('Wake Lock request failed:', err);
      return false;
    }
  }
  return false;
}

export function releaseScreenWakeLock() {
  if (wakeLockSentinel) {
    try {
      wakeLockSentinel.release();
      wakeLockSentinel = null;
    } catch {
      // Ignored
    }
  }
}
