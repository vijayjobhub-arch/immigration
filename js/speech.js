/**
 * BridgeBuilder AI - Web Speech Synthesis Engine
 * Provides client-side speech playback in English and Telugu for elderly accessibility.
 */
class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  speak(text, lang = 'en-US', onStart = null, onEnd = null) {
    if (!this.synth) {
      console.warn('Web Speech Synthesis not supported in this browser.');
      return;
    }

    if (this.synth.speaking) {
      this.synth.cancel();
      if (this.isSpeaking && this.currentText === text) {
        this.isSpeaking = false;
        if (onEnd) onEnd();
        return;
      }
    }

    const cleanText = text.replace(/[*_#`]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.currentText = text;
    this.currentUtterance = utterance;

    // Pick appropriate voice
    const voices = this.synth.getVoices();
    let selectedVoice = null;

    if (lang.startsWith('te')) {
      // Look for Telugu voice
      selectedVoice = voices.find(v => v.lang.includes('te') || v.lang.includes('te-IN'));
      if (!selectedVoice) {
        // Fallback to Indian English or standard English
        selectedVoice = voices.find(v => v.lang.includes('en-IN')) || voices.find(v => v.lang.includes('en'));
      }
    } else {
      selectedVoice = voices.find(v => v.lang.includes('en-US')) || voices.find(v => v.lang.includes('en'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.lang = lang;
    utterance.rate = lang.startsWith('te') ? 0.88 : 0.95; // Slightly slower pace for clarity
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error:', e);
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }
}

window.speechEngine = new SpeechEngine();
