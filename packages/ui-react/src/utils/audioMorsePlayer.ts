// packages/ui-react/src/utils/audioMorsePlayer.ts

let audioCtx: AudioContext | null = null;
let oscillator: OscillatorNode | null = null;
let gainNode: GainNode | null = null;
let signalStartTime = 0;

// --- Background Awake Stream Primitives ---
let silentOscillator: OscillatorNode | null = null;
let silentGainNode: GainNode | null = null;

interface WebkitWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

export const audioMorsePlayer = {
  preWarm: (): void => {
    try {
      if (!audioCtx) {
        const currentWindow = window as WebkitWindow & typeof globalThis;
        const AudioContextClass = currentWindow.AudioContext || currentWindow.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        void audioCtx.resume();
      }
    } catch (err) {
      console.warn('Audio pre-warm error:', err);
    }
  },

  /**
   * Forces the browser to awake the hardware stream by playing an un-throttled sub-bass wave loop.
   * This forces the browser speaker tab icon to appear and keeps the sound context unblocked.
   */
  startDummySilence: (): void => {
    try {
      if (!audioCtx) { audioMorsePlayer.preWarm(); }
      if (!audioCtx) return;

      if (audioCtx.state === 'suspended') {
        void audioCtx.resume();
      }

      if (silentOscillator) {
        try { silentOscillator.stop(); } catch { /* noop */ }
        silentOscillator.disconnect();
      }

      silentOscillator = audioCtx.createOscillator();
      silentGainNode = audioCtx.createGain();

      // 15Hz is below human hearing thresholds but recognized by browsers as valid active content
      silentOscillator.type = 'sine';
      silentOscillator.frequency.value = 15;

      // Infinitesimal gain fraction forces hardware channels open without creating audible noise
      silentGainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);

      silentOscillator.connect(silentGainNode);
      silentGainNode.connect(audioCtx.destination);
      silentOscillator.start();
    } catch (err) {
      console.warn('Hardware awake stream execution failure:', err);
    }
  },

  /**
   * Destroys background listeners completely when system untoggles or timeouts.
   */
  stopDummySilence: (): void => {
    try {
      if (silentOscillator) {
        try { silentOscillator.stop(); } catch { /* noop */ }
        silentOscillator.disconnect();
        silentOscillator = null;
      }
      if (silentGainNode) {
        silentGainNode.disconnect();
        silentGainNode = null;
      }
    } catch (err) {
      console.warn('Silent node destruction interception:', err);
    }
  },

  startSignal: (frequency = 600): void => {
    try {
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') { void audioCtx.resume(); }

      if (oscillator) {
        try { oscillator.stop(); } catch { /* noop */ }
        oscillator.disconnect();
      }

      oscillator = audioCtx.createOscillator();
      gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;

      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.002);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      signalStartTime = audioCtx.currentTime;
      oscillator.start();
    } catch (err) {
      console.warn('Web Audio API hardware failure:', err);
    }
  },

  stopSignal: (): void => {
    try {
      if (!audioCtx || !oscillator || !gainNode) return;

      const currentTime = audioCtx.currentTime;
      const minimumDuration = 0.05;
      const elapsedSinceStart = currentTime - signalStartTime;

      const targetStopTime = elapsedSinceStart < minimumDuration
        ? signalStartTime + minimumDuration
        : currentTime;

      gainNode.gain.setValueAtTime(gainNode.gain.value, targetStopTime);
      gainNode.gain.linearRampToValueAtTime(0, targetStopTime + 0.005);

      const targetOsc = oscillator;
      setTimeout(() => {
        try {
          targetOsc.stop();
          targetOsc.disconnect();
        } catch { /* noop */ }
      }, (targetStopTime - currentTime) * 1000 + 15);

      oscillator = null;
      gainNode = null;
    } catch (err) {
      console.warn('Web Audio API halt failure:', err);
    }
  }
};
