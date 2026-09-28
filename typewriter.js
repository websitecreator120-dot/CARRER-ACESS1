/**
 * Production-Ready Typewriter Text Animation Component
 * 
 * Supports:
 * - Single word (e.g. "ANIMATE") or multi-line paragraphs (array of strings)
 * - Step 0: Blinking cursor only
 * - Steps 1-4: Character-by-character sequential reveal with subtle blue glow & settle
 * - Step 5: Finish & blinking cursor
 * - Configurable typing speed, initial delay, pause after complete, loop
 * - Zero layout shift via ghost sizer
 * - Respects prefers-reduced-motion
 * - Comprehensive timer cleanup (zero memory leaks / runaway intervals)
 * - Safe state management: IDLE -> TYPING -> COMPLETE -> WAIT -> RESTART
 */

class TypewriterText {
  constructor(options = {}) {
    this.target = typeof options.target === 'string'
      ? document.querySelector(options.target)
      : (options.target || options.container);

    if (Array.isArray(options.lines)) {
      this.lines = options.lines;
    } else if (typeof options.text === 'string') {
      this.lines = [options.text];
    } else {
      this.lines = ['ANIMATE'];
    }

    this.typingSpeed = typeof options.typingSpeed === 'number' ? options.typingSpeed : 45;
    this.initialDelay = typeof options.initialDelay === 'number' ? options.initialDelay : 100;
    this.pauseAfterComplete = typeof options.pauseAfterComplete === 'number' ? options.pauseAfterComplete : 2600;
    this.pauseBeforeRestart = typeof options.pauseBeforeRestart === 'number' ? options.pauseBeforeRestart : 700;
    this.loop = options.loop !== false;
    this.showCursor = options.showCursor !== false;
    this.className = options.className || '';
    this.onComplete = typeof options.onComplete === 'function' ? options.onComplete : null;

    this.timers = [];
    this.state = 'IDLE'; // 'IDLE', 'TYPING', 'COMPLETE', 'WAIT', 'DESTROYED'
    this.currentLineIndex = 0;
    this.currentCharIndex = 0;
    this.lineElements = [];
    this.textElements = [];
    this.cursor = null;

    this.reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.target) {
      this.init();
    }
  }

  addTimer(id) {
    this.timers.push(id);
    return id;
  }

  clearAllTimers() {
    for (let i = 0; i < this.timers.length; i++) {
      clearTimeout(this.timers[i]);
    }
    this.timers = [];
  }

  init() {
    if (this.className) {
      this.target.classList.add(this.className);
    }

    // Set accessible label for screen readers
    const fullText = this.lines.join(' ');
    this.target.setAttribute('aria-label', fullText);
    this.target.setAttribute('role', 'text');

    this.buildDOM();

    if (this.reducedMotion) {
      this.renderFullText();
      return;
    }

    this.start();
  }

  buildDOM() {
    this.target.innerHTML = '';

    // 1. Ghost Sizer to reserve exact bounds and prevent any layout shifts
    const sizer = document.createElement('span');
    sizer.className = 'tw-sizer';
    sizer.setAttribute('aria-hidden', 'true');
    this.lines.forEach((lineText) => {
      const lineSpan = document.createElement('span');
      lineSpan.className = 'tw-sizer-line';
      lineSpan.textContent = lineText;
      sizer.appendChild(lineSpan);
    });
    this.target.appendChild(sizer);

    // 2. Active Typing Surface
    const surface = document.createElement('span');
    surface.className = 'tw-surface';
    surface.setAttribute('aria-hidden', 'true');

    this.lineElements = [];
    this.textElements = [];

    this.lines.forEach((_, idx) => {
      const lineWrap = document.createElement('span');
      lineWrap.className = 'tw-line';
      lineWrap.setAttribute('data-line', idx);

      const textSpan = document.createElement('span');
      textSpan.className = 'tw-text';
      lineWrap.appendChild(textSpan);

      surface.appendChild(lineWrap);
      this.lineElements.push(lineWrap);
      this.textElements.push(textSpan);
    });

    // 3. Dedicated animated cursor element (never "|" in the text stream)
    if (this.showCursor) {
      this.cursor = document.createElement('span');
      this.cursor.className = 'typing-cursor solid';
      this.cursor.setAttribute('aria-hidden', 'true');

      if (this.lineElements.length > 0) {
        this.lineElements[0].appendChild(this.cursor);
      }
    } else {
      this.cursor = null;
    }

    this.target.appendChild(surface);
  }

  renderFullText() {
    this.clearAllTimers();
    this.state = 'COMPLETE';
    this.lines.forEach((lineText, idx) => {
      const textContainer = this.textElements[idx];
      if (!textContainer) return;
      textContainer.innerHTML = '';
      for (let i = 0; i < lineText.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.className = 'tw-char tw-char-settled';
        charSpan.textContent = lineText[i];
        textContainer.appendChild(charSpan);
      }
    });

    const lastLine = this.lineElements[this.lineElements.length - 1];
    if (lastLine && this.cursor) {
      lastLine.appendChild(this.cursor);
      this.cursor.className = 'typing-cursor blinking';
    }
  }

  start() {
    if (this.state === 'DESTROYED') return;
    this.clearAllTimers();
    this.currentLineIndex = 0;
    this.currentCharIndex = 0;
    this.state = 'IDLE';

    // Clear all line text containers
    this.textElements.forEach((el) => {
      el.innerHTML = '';
    });

    // STEP 0 — CURSOR ONLY: |
    if (this.lineElements[0] && this.cursor) {
      this.lineElements[0].appendChild(this.cursor);
      this.cursor.className = 'typing-cursor blinking';
    }

    // Step 0 duration (approximately 0-0.1s)
    const t = setTimeout(() => {
      if (this.state === 'DESTROYED') return;
      this.state = 'TYPING';
      if (this.cursor) {
        this.cursor.className = 'typing-cursor solid';
      }
      this.typeNextChar();
    }, this.initialDelay);
    this.addTimer(t);
  }

  typeNextChar() {
    if (this.state !== 'TYPING') return;

    if (this.currentLineIndex >= this.lines.length) {
      this.onFinishTyping();
      return;
    }

    const currentLineText = this.lines[this.currentLineIndex];

    if (this.currentCharIndex < currentLineText.length) {
      const char = currentLineText[this.currentCharIndex];
      const textContainer = this.textElements[this.currentLineIndex];

      // STEPS 1-4: Character appears with subtle blue glow and settles
      const charSpan = document.createElement('span');
      charSpan.className = 'tw-char tw-char-active';
      charSpan.textContent = char;
      textContainer.appendChild(charSpan);

      // Keep cursor immediately following current character
      const currentLineWrap = this.lineElements[this.currentLineIndex];
      if (currentLineWrap && this.cursor) {
        currentLineWrap.appendChild(this.cursor);
      }

      // Settle character into normal text color after 220ms
      const settleTimer = setTimeout(() => {
        charSpan.classList.remove('tw-char-active');
        charSpan.classList.add('tw-char-settled');
      }, 220);
      this.addTimer(settleTimer);

      this.currentCharIndex++;

      // Natural humanized typing cadence
      let delay = this.typingSpeed;
      if (char === ',' || char === ';') {
        delay = this.typingSpeed * 2.8;
      } else if (char === '.' || char === '!' || char === '?') {
        delay = this.typingSpeed * 3.4;
      } else if (char === ' ') {
        delay = this.typingSpeed * 1.15;
      } else {
        // Subtle micro-rhythm variance
        delay = this.typingSpeed + (Math.sin(this.currentCharIndex * 1.7) * 8);
      }

      const nextTimer = setTimeout(() => {
        this.typeNextChar();
      }, Math.max(20, delay));
      this.addTimer(nextTimer);
    } else {
      // Line complete; advance to next line
      this.currentLineIndex++;
      this.currentCharIndex = 0;

      if (this.currentLineIndex < this.lines.length) {
        const nextLineWrap = this.lineElements[this.currentLineIndex];
        if (nextLineWrap && this.cursor) {
          nextLineWrap.appendChild(this.cursor);
        }
        const lineBreakTimer = setTimeout(() => {
          this.typeNextChar();
        }, 180);
        this.addTimer(lineBreakTimer);
      } else {
        this.onFinishTyping();
      }
    }
  }

  onFinishTyping() {
    // STEP 5 — FINISH & BLINK
    this.state = 'COMPLETE';
    if (this.cursor) {
      this.cursor.className = 'typing-cursor blinking';
    }

    if (this.onComplete) {
      this.onComplete();
    }

    if (!this.loop) return;

    // WAIT state before seamless restart
    const waitTimer = setTimeout(() => {
      if (this.state === 'DESTROYED') return;
      this.state = 'WAIT';
      const restartTimer = setTimeout(() => {
        if (this.state === 'DESTROYED') return;
        this.start();
      }, this.pauseBeforeRestart);
      this.addTimer(restartTimer);
    }, this.pauseAfterComplete);
    this.addTimer(waitTimer);
  }

  stop() {
    this.clearAllTimers();
    this.state = 'IDLE';
    if (this.cursor) {
      this.cursor.className = 'typing-cursor blinking';
    }
  }

  destroy() {
    this.state = 'DESTROYED';
    this.clearAllTimers();
    if (this.target) {
      this.target.innerHTML = '';
    }
  }
}

// Export for global browser use and modular loaders
if (typeof window !== 'undefined') {
  window.TypewriterText = TypewriterText;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TypewriterText;
}
