/**
 * ══════════════════════════════════════════════════════════════════════════════
 * STICKMAN COMBAT TYPING ENGINE ("Animator vs. Animation" - Taijutsu Battles)
 * 
 * Features:
 * 1. Close-Range Hand-to-Hand Martial Arts Combat: Hero and Rival stand face-to-face
 * 2. Letter-by-Letter Punch Combat: Every single typed letter throws a clearly
 *    visible Left Jab, Right Cross, or Hook punch with glowing fist impact!
 * 3. Word Completion Special Attack: Typing accurate words triggers an Acrobatic
 *    Flying Jump Kick that launches the rival enemy sliding far back across the floor!
 * 4. Final Word Powerhouse Finisher: Massive supersonic Power Punch with cyan
 *    energy aura, expanding shockwave rings, and skyward KO tumble!
 * 5. Generous, Comfortable Countdown Timer: 48-55 seconds per sentence so players
 *    can enjoy and easily finish rounds without stress!
 * 6. Slowed down, readable animations: Clear hold frames and gentle physics
 *    so punches, kicks, and launches are clean, distinct, and fun to watch.
 * 7. Real-time HTML5 Canvas Hi-DPI scaling, camera shake, shockwaves & particle sparks.
 * 8. Zero-latency procedural Web Audio synthesizer (Whooshes, Punches, Power Blast, KO).
 * 9. Persistent Win Streak System (localStorage) with Top Header HUD Integration.
 * ══════════════════════════════════════════════════════════════════════════════
 */

(function (window, document) {
  'use strict';

  // ════════════════════════════════════════════════════════════════════════════
  // 1. PROCEDURAL SOUND SYNTHESIZER (Web Audio API - 0ms Latency)
  // ════════════════════════════════════════════════════════════════════════════
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.muted = false;
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playKeyClick() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(360 + Math.random() * 80, t);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    }

    playWhoosh() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.exponentialRampToValueAtTime(540, t + 0.12);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.24);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.24);
    }

    playPunchImpact() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260 + Math.random() * 60, t);
      osc.frequency.exponentialRampToValueAtTime(55, t + 0.12);

      gain.gain.setValueAtTime(0.32, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.12);
    }

    playTaijutsuRush() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      [0, 0.07, 0.14].forEach((offset, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280 + idx * 40, t + offset);
        osc.frequency.exponentialRampToValueAtTime(60, t + offset + 0.08);

        gain.gain.setValueAtTime(0.3, t + offset);
        gain.gain.exponentialRampToValueAtTime(0.01, t + offset + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + offset);
        osc.stop(t + offset + 0.08);
      });
    }

    playSpecialJumpKick() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      this.playWhoosh();
      const t = this.ctx.currentTime + 0.1;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(340, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.28);

      gain.gain.setValueAtTime(0.45, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.28);
    }

    playPowerPunch() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;

      // Heavy bass drop
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(190, t);
      osc1.frequency.exponentialRampToValueAtTime(26, t + 0.45);

      gain1.gain.setValueAtTime(0.7, t);
      gain1.gain.exponentialRampToValueAtTime(0.01, t + 0.45);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.45);

      // Sonic crack
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(620, t);
      osc2.frequency.exponentialRampToValueAtTime(80, t + 0.25);

      gain2.gain.setValueAtTime(0.45, t);
      gain2.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t);
      osc2.stop(t + 0.25);
    }

    playEnemyHit() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(50, t + 0.2);

      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    }

    playMiss() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, t);
      osc.frequency.setValueAtTime(80, t + 0.05);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.12);
    }

    playVictory() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + idx * 0.1;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.28, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.45);
      });
    }

    playDefeat() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const notes = [220, 196, 174, 130];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + idx * 0.16;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.45);
      });
    }
  }

  // ════════════════════════════════════════════════════════════════════════════
  // 2. SENTENCE ROSTER (Generous & Comfortable Timers: ~50-55s per sentence)
  // ════════════════════════════════════════════════════════════════════════════
  const ROUND_ROSTER = [
    {
      roundNum: 1,
      title: 'TAIJUTSU TRIAL: AWAKENING',
      bossName: 'ROGUE CYBER NINJA',
      sentence: 'Focus your chakra, strike with precision and conquer the digital arena.',
      totalTime: 55 // Comfortable, easy to finish without stress
    },
    {
      roundNum: 2,
      title: 'TAIJUTSU DUEL: SHADOW FLURRY',
      bossName: 'SHADOW CLONE ASSASSIN',
      sentence: 'Dodge the shadow strike, leap into the heavens and shatter their defenses.',
      totalTime: 52
    },
    {
      roundNum: 3,
      title: 'TAIJUTSU RUSH: DRAGON FIST',
      bossName: 'TITAN ROOTKIT ADVERSARY',
      sentence: 'Speed is nothing without control; unleash the relentless dragon fist now.',
      totalTime: 50
    },
    {
      roundNum: 4,
      title: 'TAIJUTSU OVERDRIVE: EIGHT GATES',
      bossName: 'APEX MALWARE ARCHON',
      sentence: 'Channel pure kinetic energy, break the sound barrier and execute the final blow.',
      totalTime: 50
    },
    {
      roundNum: 5,
      title: 'SUPREME TAIJUTSU: NIGHT GUY',
      bossName: 'CELESTIAL CIPHER OVERLORD',
      sentence: 'Open the ultimate gate of death to achieve absolute legendary supremacy.',
      totalTime: 48
    }
  ];

  // ════════════════════════════════════════════════════════════════════════════
  // 3. MAIN STICKMAN COMBAT COMPONENT
  // ════════════════════════════════════════════════════════════════════════════
  class StickmanCombatGame {
    constructor(containerId = 'stickman-combat-root') {
      this.container = document.getElementById(containerId);
      this.sound = new SoundEngine();

      // State
      this.roundIndex = 0;
      this.playerHp = 100;
      this.maxPlayerHp = 100;
      this.enemyHp = 100;
      this.maxEnemyHp = 100;

      // Sentence Management
      this.sentence = '';
      this.words = [];
      this.wordIndex = 0;
      this.charInWord = 0;
      this.wordHasErrors = false;
      this.letterPunchIndex = 0;

      // Round Countdown Timer (Substantially increased per user request)
      this.roundTimeLimit = 55;
      this.roundTimeRemaining = 55;

      // Stats
      this.combo = 0;
      this.maxCombo = 0;
      this.totalKeystrokes = 0;
      this.correctKeystrokes = 0;
      this.roundStartTime = 0;
      this.isGameStarted = false;
      this.isRoundOver = false;
      this.isPaused = false;

      // Persistent Win Streak
      this.streak = parseInt(localStorage.getItem('stickman_typing_streak') || '0', 10);
      this.bestStreak = parseInt(localStorage.getItem('stickman_typing_best_streak') || '0', 10);

      // Visuals & Physics
      this.canvas = null;
      this.ctx = null;
      this.dpr = window.devicePixelRatio || 1;
      this.canvasWidth = 920;
      this.canvasHeight = 440;
      this.groundY = 370;
      this.screenShake = 0;
      this.impactFlash = 0;

      // Particles & Shockwaves
      this.particles = [];
      this.shockwaves = [];
      this.floatingTexts = [];

      // Hero Fighter (Placed in close-quarters standoff range)
      this.player = {
        x: 405,
        baseX: 405,
        y: 370,
        vx: 0,
        vy: 0,
        state: 'IDLE',
        timer: 0,
        color: '#ffffff',
        accent: '#38bdf8'
      };

      // Rival Enemy (Placed right in front of hero)
      this.enemy = {
        x: 515,
        baseX: 515,
        y: 370,
        vx: 0,
        vy: 0,
        rot: 0,
        state: 'IDLE',
        timer: 0,
        color: '#f87171',
        accent: '#ef4444'
      };

      this.init();
    }

    init() {
      if (!this.container) return;
      this.buildHTML();
      this.initCanvas();
      this.initEventListeners();
      this.updateHeaderStreakHUD();
      this.recoverFirestoreStreak();
      this.loadRound(0);
      this.startLoop();
    }

    recoverFirestoreStreak() {
      const fetchStreak = (bridge) => {
        if (!bridge) return;
        const uid = bridge.getCurrentUser()?.uid || localStorage.getItem('firewall_fallback_uid');
        if (uid) {
          bridge.getTypingStats(uid).then(stats => {
            if (stats && stats.currentStreak !== undefined) {
              this.streak = stats.currentStreak;
              this.bestStreak = stats.bestStreak || 0;
              this.updateHeaderStreakHUD();
            }
          }).catch(e => console.warn('[Combat] Initial streak fetch note:', e));
        }
      };

      if (window.FirebaseBridge) {
        fetchStreak(window.FirebaseBridge);
      } else {
        window.addEventListener('firebase-bridge-ready', (e) => fetchStreak(e.detail));
      }
    }

    updateHeaderStreakHUD() {
      const streakBadge = document.getElementById('header-streak-badge');
      if (streakBadge) {
        streakBadge.innerHTML = `
          <span class="streak-flame">🔥</span>
          <span class="streak-label">Streak: <strong class="streak-num" id="header-streak-val">${this.streak}</strong> Wins</span>
          <span class="streak-best" id="header-best-val">(Best: ${this.bestStreak})</span>
        `;
      }
    }

    saveStreak(newStreak) {
      this.streak = newStreak;
      if (this.streak > this.bestStreak) {
        this.bestStreak = this.streak;
        localStorage.setItem('stickman_typing_best_streak', this.bestStreak.toString());
      }
      localStorage.setItem('stickman_typing_streak', this.streak.toString());
      this.updateHeaderStreakHUD();

      // Firebase Cloud Firestore Realtime Streak & Stats Sync
      if (window.FirebaseBridge && window.FirebaseBridge.recordTypingSession) {
        const activeUid = window.FirebaseBridge.getCurrentUser()?.uid;
        const elapsedSecs = Math.max(1, 55 - (this.roundTimeRemaining || 55));
        const estimatedWpm = this.totalKeystrokes > 0 ? Math.round((this.totalKeystrokes / 5) / (elapsedSecs / 60)) : 45;
        const accuracy = this.totalKeystrokes > 0 ? Math.round((this.correctKeystrokes / this.totalKeystrokes) * 100) : 100;

        window.FirebaseBridge.recordTypingSession(activeUid, {
          wpm: estimatedWpm,
          accuracy: accuracy,
          completed: true
        }).then(res => {
          if (res.success && res.stats) {
            this.streak = res.stats.currentStreak;
            this.bestStreak = res.stats.bestStreak;
            this.updateHeaderStreakHUD();
          }
        }).catch(e => console.warn('[Combat] Firebase sync note:', e));
      }
    }

    buildHTML() {
      this.container.innerHTML = `
        <div class="combat-game-shell">
          <!-- Arena Top HUD (Health Bars, VS Crest, Round Timer) -->
          <div class="combat-hud">
            <!-- Player Bar -->
            <div class="fighter-hud-card player-hud">
              <div class="fighter-meta">
                <div class="fighter-avatar-wrap hero-avatar">
                  <span class="fighter-icon">🥋</span>
                </div>
                <div class="fighter-info">
                  <div class="fighter-name">HERO STICKMAN <span class="tag-you">YOU</span></div>
                  <div class="fighter-hp-text" id="player-hp-text">100 / 100 HP</div>
                </div>
              </div>
              <div class="hp-bar-track">
                <div class="hp-bar-fill player-hp-fill" id="player-hp-bar" style="width: 100%;"></div>
              </div>
            </div>

            <!-- VS Badge, Timer & Round Centerpiece -->
            <div class="combat-center-hud">
              <div class="combat-round-tag" id="combat-round-tag">ROUND 01</div>
              <div class="combat-timer-hud" id="combat-timer-hud" title="Sentence Countdown Timer">
                <span class="timer-clock-icon">⏱️</span>
                <span class="timer-sec-text" id="combat-timer-text">55.0s</span>
              </div>
              <div class="combat-timer-track">
                <div class="combat-timer-fill" id="combat-timer-fill" style="width: 100%;"></div>
              </div>
              <div class="combat-combo-counter" id="combat-combo-badge" style="opacity: 0;">
                <span class="combo-icon">⚡</span>
                <span id="combat-combo-text">COMBO 0x</span>
              </div>
            </div>

            <!-- Enemy Bar -->
            <div class="fighter-hud-card enemy-hud">
              <div class="fighter-meta enemy-meta">
                <div class="fighter-info text-right">
                  <div class="fighter-name" id="enemy-name-text">ROGUE CYBER NINJA</div>
                  <div class="fighter-hp-text" id="enemy-hp-text">100 / 100 HP</div>
                </div>
                <div class="fighter-avatar-wrap enemy-avatar">
                  <span class="fighter-icon">👹</span>
                </div>
              </div>
              <div class="hp-bar-track enemy-track">
                <div class="hp-bar-fill enemy-hp-fill" id="enemy-hp-bar" style="width: 100%;"></div>
              </div>
            </div>
          </div>

          <!-- Main Combat Display Deck -->
          <div class="combat-arena-viewport" id="combat-viewport">
            <!-- TAP ANYWHERE IN GAME SECTION TO START OVERLAY -->
            <div class="combat-start-overlay" id="combat-start-overlay">
              <div class="combat-start-card">
                <div class="combat-start-icon-wrap">
                  <span class="combat-start-hand-icon">👆</span>
                </div>
                <div class="combat-start-tag">ANIMATOR VS ANIMATION DOJO</div>
                <h2 class="combat-start-title">TAP ANYWHERE IN GAME SECTION TO START GAME</h2>
                <p class="combat-start-desc">Click or tap anywhere inside this section to initiate battle & start countdown timer.</p>
                <div class="combat-start-badges">
                  <span class="combat-key-hint">⌨️ Or Press Any Key</span>
                  <span class="combat-timer-notice">⏱️ 55s Timer Begins On Tap</span>
                </div>
              </div>
            </div>

            <!-- Full Sentence Stream HUD -->
            <div class="combat-text-hud" id="combat-text-hud">
              <div class="sentence-stream-wrap" id="sentence-stream-card" aria-live="polite">
                <!-- Dynamically populated sentence words -->
              </div>
            </div>

            <!-- HTML5 Combat Canvas -->
            <canvas id="stickman-canvas" class="stickman-canvas"></canvas>

            <!-- Game Action Controls Bar (Sound, Restart, Instructions) -->
            <div class="arena-controls-bottom">
              <div class="sound-ctrl-wrap">
                <button type="button" class="btn-arena-ctrl" id="btn-combat-sound" title="Toggle Sound">
                  <span id="sound-icon">🔊</span> Audio: <span id="sound-state-label">ON</span>
                </button>
              </div>
              <div class="arena-instructions-pill">
                <span>🥋 Type letters to punch! Finish words with Space to launch Taijutsu jump kicks! Complete sentence to land the Power Punch!</span>
              </div>
              <div class="arena-right-ctrl">
                <button type="button" class="btn-arena-ctrl" id="btn-combat-restart" title="Restart Battle">
                  <span>🔄</span> Reset
                </button>
              </div>
            </div>

            <!-- WIN OVERLAY (Round Cleared) -->
            <div class="combat-modal-overlay" id="combat-win-modal" style="display: none;">
              <div class="combat-modal-card victory-card">
                <div class="modal-badge-banner">🏆 ROUND CLEARED!</div>
                <h3 class="modal-title">KNOCKOUT FINISHER!</h3>
                <p class="modal-sub" id="win-modal-sub">Delivered a colossal powerhouse punch and shattered the enemy defense!</p>

                <div class="modal-stats-grid">
                  <div class="mstat-box">
                    <span class="mstat-val" id="win-wpm">0</span>
                    <span class="mstat-lbl">WPM Speed</span>
                  </div>
                  <div class="mstat-box">
                    <span class="mstat-val" id="win-acc">100%</span>
                    <span class="mstat-lbl">Accuracy</span>
                  </div>
                  <div class="mstat-box">
                    <span class="mstat-val" id="win-combo">0</span>
                    <span class="mstat-lbl">Max Combo</span>
                  </div>
                  <div class="mstat-box highlight">
                    <span class="mstat-val" id="win-streak-display">🔥 1</span>
                    <span class="mstat-lbl">Win Streak</span>
                  </div>
                </div>

                <div class="modal-actions">
                  <button type="button" class="btn-modal-action btn-next-round" id="btn-next-round">
                    Next Round (Enter ↵)
                  </button>
                </div>
              </div>
            </div>

            <!-- LOSS OVERLAY (Defeated) -->
            <div class="combat-modal-overlay" id="combat-loss-modal" style="display: none;">
              <div class="combat-modal-card defeat-card">
                <div class="modal-badge-banner defeat-banner">💀 DEFEATED</div>
                <h3 class="modal-title" id="defeat-modal-title">TIME LIMIT EXPIRED!</h3>
                <p class="modal-sub" id="defeat-modal-sub">You ran out of time before completing the sentence. Streak reset to 0.</p>

                <div class="modal-stats-grid">
                  <div class="mstat-box">
                    <span class="mstat-val" id="loss-wpm">0</span>
                    <span class="mstat-lbl">WPM</span>
                  </div>
                  <div class="mstat-box">
                    <span class="mstat-val" id="loss-acc">0%</span>
                    <span class="mstat-lbl">Accuracy</span>
                  </div>
                  <div class="mstat-box">
                    <span class="mstat-val" style="color: #ef4444;">0</span>
                    <span class="mstat-lbl">Streak Reset</span>
                  </div>
                </div>

                <div class="modal-actions">
                  <button type="button" class="btn-modal-action btn-retry" id="btn-retry-round">
                    Retry Battle (Enter ↵)
                  </button>
                </div>
              </div>
            </div>

            <!-- Mobile Keyboard Helper Trigger -->
            <input type="text" id="combat-hidden-input" class="combat-hidden-input" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Stickman typing input">
          </div>
        </div>
      `;
    }

    initCanvas() {
      this.canvas = document.getElementById('stickman-canvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
      if (!this.canvas || !this.ctx) return;
      const rect = this.canvas.getBoundingClientRect();
      const width = rect.width || 920;
      const height = rect.height || 440;

      this.canvas.width = width * this.dpr;
      this.canvas.height = height * this.dpr;

      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);

      this.canvasWidth = width;
      this.canvasHeight = height;
      this.groundY = height - 70;

      // Position fighters close to each other in realistic face-to-face martial arts range!
      const midX = width * 0.5;
      const fightGap = Math.min(55, width * 0.12);
      this.player.baseX = midX - fightGap;
      this.player.x = this.player.baseX;
      this.player.y = this.groundY;

      this.enemy.baseX = midX + fightGap;
      this.enemy.x = this.enemy.baseX;
      this.enemy.y = this.groundY;
    }

    initEventListeners() {
      // Sound Toggle
      const soundBtn = document.getElementById('btn-combat-sound');
      const soundIcon = document.getElementById('sound-icon');
      const soundLbl = document.getElementById('sound-state-label');
      if (soundBtn) {
        soundBtn.addEventListener('click', () => {
          this.sound.muted = !this.sound.muted;
          soundIcon.textContent = this.sound.muted ? '🔇' : '🔊';
          soundLbl.textContent = this.sound.muted ? 'MUTED' : 'ON';
        });
      }

      // Restart Button
      const restartBtn = document.getElementById('btn-combat-restart');
      if (restartBtn) {
        restartBtn.addEventListener('click', () => this.loadRound(this.roundIndex));
      }

      // Next Round Button
      const nextBtn = document.getElementById('btn-next-round');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => this.advanceRound());
      }

      // Retry Button
      const retryBtn = document.getElementById('btn-retry-round');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => this.loadRound(0));
      }

      // Global Keydown Listener
      window.addEventListener('keydown', (e) => this.handleKeyDown(e));

      // Tap Anywhere in Game Section to Start Game
      const startOverlay = document.getElementById('combat-start-overlay');
      if (startOverlay) {
        startOverlay.addEventListener('click', (e) => {
          e.stopPropagation();
          this.startGame();
        });
      }

      // Mobile Touch Focus & Viewport Tap Trigger
      const viewport = document.getElementById('combat-viewport');
      const hiddenInput = document.getElementById('combat-hidden-input');
      if (viewport) {
        viewport.addEventListener('click', () => {
          if (!this.isGameStarted) {
            this.startGame();
          } else if (hiddenInput) {
            hiddenInput.focus();
          }
        });
      }
      if (hiddenInput) {
        hiddenInput.addEventListener('input', () => {
          const val = hiddenInput.value;
          if (val) {
            const char = val[val.length - 1];
            this.processInput(char);
            hiddenInput.value = '';
          }
        });
      }
    }

    startGame() {
      if (this.isGameStarted) return;
      this.isGameStarted = true;
      this.roundStartTime = Date.now();
      const overlay = document.getElementById('combat-start-overlay');
      if (overlay) {
        overlay.classList.add('is-hidden');
      }
      const hiddenInput = document.getElementById('combat-hidden-input');
      if (hiddenInput) {
        hiddenInput.focus();
      }
      if (this.sound && !this.sound.muted) {
        this.sound.playKeyClick();
      }
    }

    loadRound(idx) {
      this.roundIndex = idx % ROUND_ROSTER.length;
      const ro = ROUND_ROSTER[this.roundIndex];

      this.sentence = ro.sentence;
      this.words = this.sentence.split(' ');
      this.wordIndex = 0;
      this.charInWord = 0;
      this.wordHasErrors = false;
      this.letterPunchIndex = 0;

      this.playerHp = this.maxPlayerHp;
      this.enemyHp = this.maxEnemyHp;
      this.roundTimeLimit = ro.totalTime;
      this.roundTimeRemaining = ro.totalTime;

      this.combo = 0;
      this.maxCombo = 0;
      this.totalKeystrokes = 0;
      this.correctKeystrokes = 0;
      this.roundStartTime = 0;
      this.isGameStarted = false;
      this.isRoundOver = false;

      const overlay = document.getElementById('combat-start-overlay');
      if (overlay) {
        overlay.classList.remove('is-hidden');
      }

      // ALWAYS FULLY RESTORE FIGHTERS TO EXACT GROUND AND CLOSE-RANGE STANCE
      const w = this.canvasWidth || 920;
      const gy = this.groundY || 370;

      const midX = w * 0.5;
      const fightGap = Math.min(55, w * 0.12);

      this.player.baseX = midX - fightGap;
      this.player.x = this.player.baseX;
      this.player.y = gy;
      this.player.vx = 0;
      this.player.vy = 0;
      this.player.state = 'IDLE';
      this.player.timer = 0;

      this.enemy.baseX = midX + fightGap;
      this.enemy.x = this.enemy.baseX;
      this.enemy.y = gy;
      this.enemy.vx = 0;
      this.enemy.vy = 0;
      this.enemy.rot = 0;
      this.enemy.state = 'IDLE';
      this.enemy.timer = 0;

      this.particles = [];
      this.shockwaves = [];
      this.floatingTexts = [];

      // Update UI Text & Tags
      const rTag = document.getElementById('combat-round-tag');
      if (rTag) rTag.textContent = `ROUND 0${ro.roundNum}: ${ro.title}`;

      const eName = document.getElementById('enemy-name-text');
      if (eName) eName.textContent = ro.bossName;

      // Hide Modals
      const winModal = document.getElementById('combat-win-modal');
      const lossModal = document.getElementById('combat-loss-modal');
      if (winModal) winModal.style.display = 'none';
      if (lossModal) lossModal.style.display = 'none';

      this.updateHpBars();
      this.updateTimerHUD();
      this.renderSentenceHUD();
    }

    advanceRound() {
      this.saveStreak(this.streak + 1);
      this.loadRound(this.roundIndex + 1);
    }

    renderSentenceHUD() {
      const card = document.getElementById('sentence-stream-card');
      if (!card) return;

      let html = '';
      for (let wIdx = 0; wIdx < this.words.length; wIdx++) {
        const word = this.words[wIdx];

        if (wIdx < this.wordIndex) {
          // Completed word
          html += `<span class="sent-word word-done">✓ ${word}</span>`;
        } else if (wIdx === this.wordIndex) {
          // Currently active word being typed letter-by-letter
          let charsHtml = '';
          for (let cIdx = 0; cIdx < word.length; cIdx++) {
            const ch = word[cIdx];
            if (cIdx < this.charInWord) {
              charsHtml += `<span class="c-char char-correct">${ch}</span>`;
            } else if (cIdx === this.charInWord) {
              charsHtml += `<span class="c-char char-current">${ch}</span>`;
            } else {
              charsHtml += `<span class="c-char char-pending">${ch}</span>`;
            }
          }

          // If at end of word and waiting for Space
          if (this.charInWord >= word.length && wIdx < this.words.length - 1) {
            charsHtml += `<span class="c-char char-current space-prompt">␣</span>`;
          }

          html += `<span class="sent-word word-active" id="active-word-el">${charsHtml}</span>`;
        } else {
          // Upcoming word
          html += `<span class="sent-word word-upcoming">${word}</span>`;
        }
      }

      card.innerHTML = html;
    }

    handleKeyDown(e) {
      if (this.isRoundOver) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (this.playerHp <= 0 || this.roundTimeRemaining <= 0) {
            this.loadRound(0); // Retry battle
          } else {
            this.advanceRound(); // Advance to next round
          }
        }
        return;
      }

      // Ignore input if combat arena is currently hidden (e.g. user in Laptop Deck)
      if (this.container && this.container.style.display === 'none') {
        return;
      }

      // Check if user is typing into other inputs on page
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') && e.target.id !== 'combat-hidden-input') {
        return;
      }

      // If game has not started yet, pressing any key starts the game!
      if (!this.isGameStarted) {
        this.startGame();
        if ((e.key.length === 1 || e.key === ' ') && !e.ctrlKey && !e.altKey && !e.metaKey) {
          if (e.key === ' ') e.preventDefault();
          this.processInput(e.key);
          return;
        }
      }

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault(); // Prevent page scroll
      }

      // Only handle single characters or Space
      if (e.key.length === 1 || e.key === ' ') {
        this.processInput(e.key);
      }
    }

    processInput(pressedKey) {
      if (this.isRoundOver) return;

      this.totalKeystrokes++;
      const currentWord = this.words[this.wordIndex];
      const isLastWord = this.wordIndex === this.words.length - 1;

      // Check if user has finished characters of current word and must press Space
      if (this.charInWord >= currentWord.length) {
        if (pressedKey === ' ') {
          // WORD FINISHED WITH SPACE -> TRIGGER HAND-TO-HAND / SPECIAL TAIJUTSU ATTACK!
          this.correctKeystrokes++;
          this.triggerWordAttack(!this.wordHasErrors);
          this.wordIndex++;
          this.charInWord = 0;
          this.wordHasErrors = false;
          this.renderSentenceHUD();
        } else {
          // Incorrect key instead of Space
          this.handleTypo();
        }
        return;
      }

      // Compare character with target
      const targetChar = currentWord[this.charInWord];

      if (pressedKey === targetChar) {
        // CORRECT CHARACTER TYPED -> EXECUTE VISIBLE PUNCH IMMEDIATELY!
        this.correctKeystrokes++;
        this.charInWord++;
        this.combo++;
        if (this.combo > this.maxCombo) this.maxCombo = this.combo;
        this.updateComboHUD();
        this.sound.playKeyClick();

        // Trigger visible punch on every keystroke!
        this.triggerLetterPunch();

        // Check if finished final word of whole sentence!
        if (isLastWord && this.charInWord >= currentWord.length) {
          // ULTIMATE POWER PUNCH FINISHER!
          this.triggerFinisher();
        } else {
          this.renderSentenceHUD();
        }
      } else {
        // TYPO / MISTAKE
        this.handleTypo();
      }
    }

    triggerLetterPunch() {
      // Alternate visibly between Left Jab, Right Cross, and Hook Punch
      this.letterPunchIndex = ((this.letterPunchIndex || 0) + 1) % 3;
      const punchNames = ['JAB', 'CROSS', 'HOOK'];
      const pName = punchNames[this.letterPunchIndex];

      this.player.state = pName;
      this.player.timer = 0.35; // Held clearly so every punch is visible!
      this.player.x = this.player.baseX + 18; // Steps into strike pocket

      this.enemy.state = 'HIT';
      this.enemy.timer = 0.28;
      this.enemy.x = this.enemy.baseX + 16; // Recoils from the direct hit

      this.screenShake = 3.5;
      this.sound.playPunchImpact();

      // Spawn bright hit sparks right at the contact point on enemy chin/chest
      const contactX = this.player.x + 82;
      this.spawnSparks(contactX, this.groundY - 70, 8, '#38bdf8');
    }

    handleTypo() {
      this.combo = 0;
      this.wordHasErrors = true;
      this.updateComboHUD();
      this.sound.playMiss();

      // Flinch player and subtract small gentle time penalty (-0.2s)
      this.player.state = 'FLINCH';
      this.player.timer = 0.22;
      this.roundTimeRemaining = Math.max(0, this.roundTimeRemaining - 0.2);

      // Shake active word card in red
      const card = document.getElementById('sentence-stream-card');
      if (card) {
        card.classList.add('shake-error');
        setTimeout(() => card.classList.remove('shake-error'), 250);
      }
    }

    triggerWordAttack(isSpecialAccurate) {
      const damage = Math.round(100 / this.words.length);
      this.enemyHp = Math.max(10, this.enemyHp - damage);
      this.updateHpBars();

      if (isSpecialAccurate) {
        // ⚡ SPECIAL TAIJUTSU ATTACK! (JUMP & FIGHT & THROW ENEMY FAR!)
        this.player.state = 'JUMP_ATTACK';
        this.player.timer = 0.7; // Slower, clearly visible acrobatic dropkick pose!
        this.player.x = this.player.baseX + 48; // Leaps right into strike zone!

        // Enemy gets launched far backward across the screen!
        this.enemy.state = 'LAUNCHED';
        this.enemy.vx = 8.5; // Smooth cinematic launch
        this.enemy.timer = 0.75;

        this.screenShake = 12;
        this.impactFlash = 0.35;
        this.sound.playSpecialJumpKick();

        // Add special floating text
        this.addFloatingText('⚡ FLYING JUMP ATTACK! ⚡', this.enemy.x, this.groundY - 110, '#38bdf8');

        // Sparks & shockwave
        this.spawnSparks(this.player.x + 85, this.groundY - 95, 25, '#38bdf8');
        this.spawnSparks(this.player.x + 85, this.groundY - 95, 20, '#f59e0b');
        this.spawnShockwave(this.player.x + 85, this.groundY - 95, '#38bdf8');
      } else {
        // STANDARD HAND-TO-HAND TAIJUTSU RUSH
        this.player.state = 'TAIJUTSU_RUSH';
        this.player.timer = 0.55; // Visible multi-strike flurry
        this.player.x = this.player.baseX + 24;

        this.enemy.state = 'HIT';
        this.enemy.timer = 0.45;
        this.enemy.x = this.enemy.baseX + 22;

        this.screenShake = 6;
        this.impactFlash = 0.18;
        this.sound.playTaijutsuRush();

        this.addFloatingText('TAIJUTSU RUSH! 🥋', this.enemy.x, this.groundY - 90, '#22c55e');
        this.spawnSparks(this.player.x + 80, this.groundY - 65, 16, '#22c55e');
      }
    }

    triggerFinisher() {
      // 💥 COLOSSAL POWER PUNCH FINISHER!
      this.isRoundOver = true;
      this.enemyHp = 0;
      this.updateHpBars();

      // Hero lunges into epic Power Punch stance - held visibly for 1.8s!
      this.player.state = 'POWER_PUNCH';
      this.player.x = this.player.baseX + 42;
      this.player.timer = 1.8;

      // Enemy gets blasted into the sky and spins off screen (KO)!
      this.enemy.state = 'KO';
      this.enemy.vx = 10;
      this.enemy.vy = -16;
      this.enemy.rot = 0;

      this.screenShake = 22;
      this.impactFlash = 0.7;
      this.sound.playPowerPunch();
      setTimeout(() => this.sound.playVictory(), 250);

      this.addFloatingText('💥 POWER PUNCH FINISHER! 💥', (this.canvasWidth || 920) * 0.5, this.groundY - 140, '#f59e0b');

      // Massive particle fireworks & double shockwaves
      const hitContactX = this.player.x + 95;
      this.spawnSparks(hitContactX, this.groundY - 66, 50, '#38bdf8');
      this.spawnSparks(hitContactX, this.groundY - 66, 50, '#f59e0b');
      this.spawnSparks(hitContactX, this.groundY - 66, 40, '#ffffff');
      this.spawnShockwave(hitContactX, this.groundY - 66, '#f59e0b');
      this.spawnShockwave(hitContactX, this.groundY - 66, '#38bdf8');

      // Calculate Stats
      const elapsedMin = Math.max(0.08, (Date.now() - this.roundStartTime) / 60000);
      const wpm = Math.round((this.correctKeystrokes / 5) / elapsedMin);
      const acc = this.totalKeystrokes > 0
        ? Math.round((this.correctKeystrokes / this.totalKeystrokes) * 100)
        : 100;

      // Reveal Win Modal
      setTimeout(() => {
        const winModal = document.getElementById('combat-win-modal');
        if (winModal) {
          document.getElementById('win-wpm').textContent = wpm.toString();
          document.getElementById('win-acc').textContent = `${acc}%`;
          document.getElementById('win-combo').textContent = `${this.maxCombo}x`;
          document.getElementById('win-streak-display').textContent = `🔥 ${this.streak + 1}`;
          winModal.style.display = 'flex';
        }
      }, 700);
    }

    triggerDefeat(reason = 'TIMEOUT') {
      this.isRoundOver = true;
      this.player.state = 'FLINCH';
      this.player.timer = 999;
      this.screenShake = 16;
      this.impactFlash = 0.5;
      this.sound.playDefeat();

      // Reset Streak on Loss
      this.saveStreak(0);

      // Calculate Stats
      const elapsedMin = Math.max(0.08, (Date.now() - this.roundStartTime) / 60000);
      const wpm = Math.round((this.correctKeystrokes / 5) / elapsedMin);
      const acc = this.totalKeystrokes > 0
        ? Math.round((this.correctKeystrokes / this.totalKeystrokes) * 100)
        : 0;

      // Reveal Loss Modal
      setTimeout(() => {
        const lossModal = document.getElementById('combat-loss-modal');
        if (lossModal) {
          const title = document.getElementById('defeat-modal-title');
          const sub = document.getElementById('defeat-modal-sub');
          if (title && sub) {
            if (reason === 'TIMEOUT') {
              title.textContent = 'TIME LIMIT EXPIRED!';
              sub.textContent = 'You ran out of time before completing the sentence. Keep up the typing tempo to survive!';
            } else {
              title.textContent = 'KNOCKED OUT BY ADVERSARY';
              sub.textContent = 'Your rhythm was broken by enemy counter-attacks. Streak reset to 0.';
            }
          }
          document.getElementById('loss-wpm').textContent = wpm.toString();
          document.getElementById('loss-acc').textContent = `${acc}%`;
          lossModal.style.display = 'flex';
        }
      }, 500);
    }

    updateHpBars() {
      const pBar = document.getElementById('player-hp-bar');
      const eBar = document.getElementById('enemy-hp-bar');
      const pText = document.getElementById('player-hp-text');
      const eText = document.getElementById('enemy-hp-text');

      if (pBar) pBar.style.width = `${Math.max(0, this.playerHp)}%`;
      if (eBar) eBar.style.width = `${Math.max(0, this.enemyHp)}%`;
      if (pText) pText.textContent = `${Math.max(0, this.playerHp)} / 100 HP`;
      if (eText) eText.textContent = `${Math.max(0, this.enemyHp)} / 100 HP`;
    }

    updateTimerHUD() {
      const tText = document.getElementById('combat-timer-text');
      const tFill = document.getElementById('combat-timer-fill');
      if (!tText || !tFill) return;

      const rem = Math.max(0, this.roundTimeRemaining);
      tText.textContent = `${rem.toFixed(1)}s`;

      const pct = Math.min(100, (rem / this.roundTimeLimit) * 100);
      tFill.style.width = `${pct}%`;

      // Warning color shifts
      if (rem <= 8) {
        tText.className = 'timer-sec-text danger';
        tFill.className = 'combat-timer-fill danger';
      } else if (rem <= 18) {
        tText.className = 'timer-sec-text warning';
        tFill.className = 'combat-timer-fill warning';
      } else {
        tText.className = 'timer-sec-text';
        tFill.className = 'combat-timer-fill';
      }
    }

    updateComboHUD() {
      const badge = document.getElementById('combat-combo-badge');
      const text = document.getElementById('combat-combo-text');
      if (!badge || !text) return;

      if (this.combo >= 2) {
        badge.style.opacity = '1';
        badge.style.transform = 'scale(1.15)';
        text.textContent = `COMBO ${this.combo}x`;
        setTimeout(() => { badge.style.transform = 'scale(1)'; }, 100);
      } else {
        badge.style.opacity = '0';
      }
    }

    addFloatingText(str, x, y, color) {
      this.floatingTexts.push({
        str: str,
        x: x,
        y: y,
        vy: -1.0,
        life: 1.2,
        color: color
      });
    }

    spawnSparks(x, y, count = 20, color = '#38bdf8') {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        this.particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: color,
          size: 1.5 + Math.random() * 3,
          life: 1,
          decay: 0.9 + Math.random() * 1.2
        });
      }
    }

    spawnShockwave(x, y, color = '#38bdf8') {
      this.shockwaves.push({
        x: x,
        y: y,
        r: 10,
        maxR: 90,
        life: 1,
        color: color
      });
    }

    startLoop() {
      let lastTime = performance.now();
      const frame = (now) => {
        const dt = Math.min(0.05, (now - lastTime) / 1000);
        lastTime = now;

        this.update(dt);
        this.render();

        this.animId = requestAnimationFrame(frame);
      };
      this.animId = requestAnimationFrame(frame);
    }

    update(dt) {
      if (this.isPaused) return;

      // Update Screen Shake & Impact Flash
      if (this.screenShake > 0) this.screenShake = Math.max(0, this.screenShake - dt * 25);
      if (this.impactFlash > 0) this.impactFlash = Math.max(0, this.impactFlash - dt * 2.5);

      // Update Round Countdown Timer ONLY if game has been started by user tap
      if (!this.isRoundOver && this.isGameStarted) {
        this.roundTimeRemaining = Math.max(0, this.roundTimeRemaining - dt);
        this.updateTimerHUD();

        if (this.roundTimeRemaining <= 0) {
          // TIME RUN OUT -> DEFEAT!
          this.triggerDefeat('TIMEOUT');
        }
      }

      // Update Player Timer & Coordinates
      if (this.player.timer > 0) {
        this.player.timer -= dt;
        if (this.player.timer <= 0 && this.player.state !== 'POWER_PUNCH') {
          this.player.state = 'IDLE';
        }
      }

      // Smoothly return hero to base stance when idle
      if (this.player.state === 'IDLE') {
        this.player.x += (this.player.baseX - this.player.x) * 0.1;
      }

      // Update Enemy State & Physics
      if (this.enemy.state === 'KO') {
        this.enemy.x += this.enemy.vx;
        this.enemy.y += this.enemy.vy;
        this.enemy.vy += 0.55; // gravity
        this.enemy.rot += 0.08;
      } else if (this.enemy.state === 'LAUNCHED') {
        // Flying far back after Special Jump Kick - smooth, clearly visible slide!
        this.enemy.x += this.enemy.vx;
        this.enemy.vx *= 0.94; // gentle deceleration so the launch is clearly visible!

        // Clamp to right edge dojo boundary
        const maxBound = (this.canvasWidth || 920) * 0.88;
        if (this.enemy.x > maxBound) {
          this.enemy.x = maxBound;
          this.enemy.vx = 0;
          this.spawnSparks(maxBound, this.groundY - 50, 12, '#ef4444');
        }

        if (Math.abs(this.enemy.vx) < 0.6) {
          this.enemy.state = 'IDLE';
        }
      } else if (this.enemy.timer > 0) {
        this.enemy.timer -= dt;
        if (this.enemy.timer <= 0) {
          this.enemy.state = 'IDLE';
        }
      }

      // Smoothly glide enemy back towards combat range
      if (this.enemy.state === 'IDLE') {
        this.enemy.x += (this.enemy.baseX - this.enemy.x) * 0.06;
      }

      // Update Shockwaves
      for (let i = this.shockwaves.length - 1; i >= 0; i--) {
        const sw = this.shockwaves[i];
        sw.r += dt * 180;
        sw.life -= dt * 1.8;
        if (sw.life <= 0) {
          this.shockwaves.splice(i, 1);
        }
      }

      // Update Floating Texts
      for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
        const ft = this.floatingTexts[i];
        ft.y += ft.vy;
        ft.life -= dt * 1.0;
        if (ft.life <= 0) {
          this.floatingTexts.splice(i, 1);
        }
      }

      // Update Particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // gravity
        p.life -= dt * p.decay;
        if (p.life <= 0) {
          this.particles.splice(i, 1);
        }
      }
    }

    render() {
      if (!this.ctx || !this.canvasWidth) return;
      const ctx = this.ctx;
      const w = this.canvasWidth;
      const h = this.canvasHeight;

      ctx.save();

      // Camera Shake Transform
      if (this.screenShake > 0) {
        const sx = (Math.random() - 0.5) * this.screenShake;
        const sy = (Math.random() - 0.5) * this.screenShake;
        ctx.translate(sx, sy);
      }

      // 1. Draw High-Contrast Cyber-Paper Dojo Background
      this.drawArenaBackground(ctx, w, h);

      // 2. Draw Floor & Shadows
      this.drawFloor(ctx, w, h);

      // 3. Draw Shockwaves
      this.drawShockwaves(ctx);

      // 4. Draw Hero Stickman (Player)
      this.drawStickmanHero(ctx, this.player);

      // 5. Draw Rival Stickman (Enemy)
      this.drawStickmanEnemy(ctx, this.enemy);

      // 6. Draw Particles (Sparks & Dust)
      this.drawParticles(ctx);

      // 7. Draw Floating Combat Popups
      this.drawFloatingTexts(ctx);

      // 8. Draw Impact Flash Overlay
      if (this.impactFlash > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, this.impactFlash)})`;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.restore();
    }

    drawArenaBackground(ctx, w, h) {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#0c0d14');
      bgGrad.addColorStop(0.65, '#090a10');
      bgGrad.addColorStop(1, '#050508');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Soft architectural graph grid (Animator's desktop paper texture)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 36;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Central Dojo Emblem Watermark
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.font = '800 48px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ANIMATOR VS ANIMATION', w * 0.5, h * 0.44);
      ctx.font = '700 15px "JetBrains Mono", monospace';
      ctx.fillText('TAIJUTSU COMBAT SPEED ARENA // 2026', w * 0.5, h * 0.51);
      ctx.restore();
    }

    drawFloor(ctx, w, h) {
      const gy = this.groundY;

      // Glow Horizon Line
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w * 0.06, gy);
      ctx.lineTo(w * 0.94, gy);
      ctx.stroke();

      // Platform Underdeck
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(w * 0.06, gy, w * 0.88, h - gy);

      // Fighter Contact Shadows
      ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      ctx.beginPath();
      ctx.ellipse(this.player.x, gy + 3, 30, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      if (this.enemy.state !== 'KO') {
        ctx.beginPath();
        ctx.ellipse(this.enemy.x, gy + 3, 30, 8, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 4. HERO STICKMAN SKELETON (Jabs, Crosses, Hooks, Jump Kicks & Power Punch)
    // ══════════════════════════════════════════════════════════════════════════
    drawStickmanHero(ctx, p) {
      ctx.save();
      ctx.translate(p.x, p.y);

      const clock = Date.now() * 0.006;
      let bob = Math.sin(clock) * 3;

      ctx.strokeStyle = p.color;
      ctx.fillStyle = p.color;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = p.accent;
      ctx.shadowBlur = 10;

      // Head Coordinates
      let headX = 0;
      let headY = -90 + bob;
      let headR = 15;

      // Torso Coordinates
      let neckX = 0;
      let neckY = -75 + bob;
      let pelvisX = -4;
      let pelvisY = -35 + bob * 0.5;

      // Arms (Shoulder, Elbow, Hand)
      let lHandX = 18, lHandY = -55 + bob;
      let rHandX = 24, rHandY = -68 + bob;
      let lElbowX = 8, lElbowY = -60 + bob;
      let rElbowX = 14, rElbowY = -70 + bob;

      // Legs (Hip, Knee, Foot)
      let lKneeX = -10, lKneeY = -18;
      let lFootX = -18, lFootY = 0;
      let rKneeX = 12, rKneeY = -16;
      let rFootX = 16, rFootY = 0;

      // Dynamic Taijutsu Poses (Clearly visible extensions!)
      if (p.state === 'JAB') {
        // Fast snap jab with left arm thrust straight forward towards enemy
        headX = 14; neckX = 14; pelvisX = 6;
        lHandX = 82; lHandY = -70; lElbowX = 44; lElbowY = -72;
        rHandX = 14; rHandY = -76; rElbowX = 6; rElbowY = -70;
      } else if (p.state === 'CROSS') {
        // Heavy right straight cross with full extension
        headX = 18; neckX = 16; pelvisX = 10;
        rHandX = 94; rHandY = -66; rElbowX = 52; rElbowY = -68;
        lHandX = 14; lHandY = -78; lElbowX = 6; lElbowY = -70;
      } else if (p.state === 'HOOK') {
        // Heavy curved hook punch
        headX = 16; neckX = 14; pelvisX = 8;
        lHandX = 78; lHandY = -80; lElbowX = 50; lElbowY = -90;
        rHandX = 16; rHandY = -65;
      } else if (p.state === 'JUMP_ATTACK') {
        // ⚡ FLYING ACROBATIC JUMP DROPKICK
        headX = 35; headY = -145; neckX = 28; neckY = -135; pelvisX = 10; pelvisY = -115;
        rKneeX = 55; rKneeY = -115; rFootX = 94; rFootY = -105; // Extended flying spear kick
        lKneeX = -5; lKneeY = -125; lFootX = 15; lFootY = -110;
        lHandX = -15; lHandY = -145; rHandX = 30; rHandY = -155;
      } else if (p.state === 'POWER_PUNCH') {
        // 💥 COLOSSAL POWERHOUSE FINISHER PUNCH
        headX = 36; neckX = 30; pelvisX = 12; pelvisY = -30;
        rHandX = 100; rHandY = -66; rElbowX = 64; rElbowY = -68; // Arm locked straight forward
        lHandX = -10; lHandY = -60; lElbowX = 8; lElbowY = -65;
        rFootX = 52; rFootY = 0; rKneeX = 32; rKneeY = -14;
        lFootX = -44; lFootY = 0; lKneeX = -22; lKneeY = -16;
      } else if (p.state === 'TAIJUTSU_RUSH') {
        // 🥋 MULTI-HIT TAIJUTSU PUNCH & KNEE FLURRY
        const fClock = Date.now() * 0.035;
        headX = 18; neckX = 18; pelvisX = 8;
        lHandX = 78 + Math.sin(fClock) * 16; lHandY = -72 + Math.cos(fClock) * 8;
        rHandX = 82 + Math.cos(fClock) * 16; rHandY = -60 + Math.sin(fClock) * 8;
        lElbowX = 42; lElbowY = -70; rElbowX = 44; rElbowY = -62;
        rFootX = 44; rFootY = -22; rKneeX = 30; rKneeY = -32;
        lFootX = -15; lFootY = 0;
      } else if (p.state === 'FLINCH') {
        headX = -24; headY += 8; neckX = -20; pelvisX = -15;
        lHandX = -10; lHandY = -75; rHandX = -6; rHandY = -80;
        lElbowX = -15; lElbowY = -68; rElbowX = -12; rElbowY = -72;
      }

      // Draw Head
      ctx.beginPath();
      ctx.arc(headX, headY, headR, 0, Math.PI * 2);
      ctx.stroke();

      // Flowing Warrior Headband (Anime cloth ribbon flaps behind)
      ctx.save();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      const flap1 = Math.sin(clock * 2) * 8;
      const flap2 = Math.cos(clock * 2.5) * 8;
      // Headband Knot
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(headX - headR, headY - 2, 3.5, 0, Math.PI * 2);
      ctx.fill();
      // Ribbon 1
      ctx.beginPath();
      ctx.moveTo(headX - headR, headY - 2);
      ctx.quadraticCurveTo(headX - headR - 15, headY + flap1, headX - headR - 32, headY + flap1 * 1.5 + 4);
      ctx.stroke();
      // Ribbon 2
      ctx.beginPath();
      ctx.moveTo(headX - headR, headY - 2);
      ctx.quadraticCurveTo(headX - headR - 12, headY + 8 + flap2, headX - headR - 26, headY + 12 + flap2 * 1.3);
      ctx.stroke();
      ctx.restore();

      // Draw Spine
      ctx.beginPath();
      ctx.moveTo(neckX, neckY);
      ctx.lineTo(pelvisX, pelvisY);
      ctx.stroke();

      // Draw Left Arm
      ctx.beginPath();
      ctx.moveTo(neckX, neckY);
      ctx.lineTo(lElbowX, lElbowY);
      ctx.lineTo(lHandX, lHandY);
      ctx.stroke();

      // Draw Right Arm
      ctx.beginPath();
      ctx.moveTo(neckX, neckY);
      ctx.lineTo(rElbowX, rElbowY);
      ctx.lineTo(rHandX, rHandY);
      ctx.stroke();

      // Draw Left Leg
      ctx.beginPath();
      ctx.moveTo(pelvisX, pelvisY);
      ctx.lineTo(lKneeX, lKneeY);
      ctx.lineTo(lFootX, lFootY);
      ctx.stroke();

      // Draw Right Leg
      ctx.beginPath();
      ctx.moveTo(pelvisX, pelvisY);
      ctx.lineTo(rKneeX, rKneeY);
      ctx.lineTo(rFootX, rFootY);
      ctx.stroke();

      // Glowing Punch Fists (Clear Visual Attack Indicators!)
      if (p.state === 'JAB' || p.state === 'HOOK') {
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(lHandX, lHandY, 8, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.state === 'CROSS') {
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(rHandX, rHandY, 9, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.state === 'POWER_PUNCH') {
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 28;
        ctx.beginPath();
        ctx.arc(rHandX, rHandY, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(rHandX, rHandY, 8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 5. RIVAL ENEMY STICKMAN SKELETON
    // ══════════════════════════════════════════════════════════════════════════
    drawStickmanEnemy(ctx, e) {
      ctx.save();
      ctx.translate(e.x, e.y);

      if (e.rot) {
        ctx.rotate(e.rot);
      }

      const clock = Date.now() * 0.005 + 1.2;
      let bob = Math.sin(clock) * 3;

      ctx.strokeStyle = e.color;
      ctx.fillStyle = e.color;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = e.accent;
      ctx.shadowBlur = 10;

      // Enemy Head
      let headX = 0;
      let headY = -90 + bob;
      let headR = 15;

      // Enemy Torso
      let neckX = 0;
      let neckY = -75 + bob;
      let pelvisX = 4;
      let pelvisY = -35 + bob * 0.5;

      // Enemy Arms (Facing Left towards Player in martial-arts guard)
      let lHandX = -24, lHandY = -68 + bob;
      let rHandX = -16, rHandY = -56 + bob;
      let lElbowX = -12, lElbowY = -72 + bob;
      let rElbowX = -8, rElbowY = -60 + bob;

      // Enemy Legs
      let lKneeX = -10, lKneeY = -16;
      let lFootX = -16, lFootY = 0;
      let rKneeX = 12, rKneeY = -18;
      let rFootX = 20, rFootY = 0;

      // Enemy Animation Poses
      if (e.state === 'LAUNCHED') {
        // ⚡ LAUNCHED & HURLED FAR ACROSS THE ARENA
        headX = 45; headY -= 15; neckX = 35; pelvisX = 20;
        lHandX = 35; lHandY = -95; rHandX = 40; rHandY = -85;
        lFootX = -18; lFootY = -30; rFootX = 15; rFootY = -22;
      } else if (e.state === 'HIT') {
        headX = 24; headY -= 6; neckX = 16; pelvisX = 10;
        lHandX = 14; lHandY = -80; rHandX = 18; rHandY = -72; // Recoils back from punch impact
      } else if (e.state === 'KO') {
        headX = 15; neckX = 10; pelvisX = 0;
        lHandX = -25; lHandY = -40; rHandX = 35; rHandY = -60;
        lFootX = -20; lFootY = 20; rFootX = 30; rFootY = 10;
      }

      // Draw Head
      ctx.beginPath();
      ctx.arc(headX, headY, headR, 0, Math.PI * 2);
      ctx.stroke();

      // Glowing Crimson Horns/Spikes
      ctx.save();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(headX - 6, headY - headR + 2);
      ctx.lineTo(headX - 12, headY - headR - 10);
      ctx.lineTo(headX - 1, headY - headR + 1);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(headX + 2, headY - headR + 1);
      ctx.lineTo(headX + 10, headY - headR - 10);
      ctx.lineTo(headX + 6, headY - headR + 2);
      ctx.stroke();

      // Glowing Eyes
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(headX - 5, headY - 2, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw Spine
      ctx.beginPath();
      ctx.moveTo(neckX, neckY);
      ctx.lineTo(pelvisX, pelvisY);
      ctx.stroke();

      // Draw Left Arm
      ctx.beginPath();
      ctx.moveTo(neckX, neckY);
      ctx.lineTo(lElbowX, lElbowY);
      ctx.lineTo(lHandX, lHandY);
      ctx.stroke();

      // Draw Right Arm
      ctx.beginPath();
      ctx.moveTo(neckX, neckY);
      ctx.lineTo(rElbowX, rElbowY);
      ctx.lineTo(rHandX, rHandY);
      ctx.stroke();

      // Draw Left Leg
      ctx.beginPath();
      ctx.moveTo(pelvisX, pelvisY);
      ctx.lineTo(lKneeX, lKneeY);
      ctx.lineTo(lFootX, lFootY);
      ctx.stroke();

      // Draw Right Leg
      ctx.beginPath();
      ctx.moveTo(pelvisX, pelvisY);
      ctx.lineTo(rKneeX, rKneeY);
      ctx.lineTo(rFootX, rFootY);
      ctx.stroke();

      ctx.restore();
    }

    drawShockwaves(ctx) {
      ctx.save();
      for (const sw of this.shockwaves) {
        ctx.strokeStyle = sw.color;
        ctx.shadowColor = sw.color;
        ctx.shadowBlur = 12;
        ctx.lineWidth = 3.5 * sw.life;
        ctx.globalAlpha = sw.life;

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    drawFloatingTexts(ctx) {
      ctx.save();
      ctx.font = '800 18px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      for (const ft of this.floatingTexts) {
        ctx.fillStyle = ft.color;
        ctx.shadowColor = ft.color;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = Math.max(0, ft.life);
        ctx.fillText(ft.str, ft.x, ft.y);
      }
      ctx.restore();
    }

    drawParticles(ctx) {
      ctx.save();
      for (const p of this.particles) {
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    destroy() {
      if (this.animId) cancelAnimationFrame(this.animId);
      if (this.container) this.container.innerHTML = '';
    }
  }

  // Export globally
  window.StickmanCombatGame = StickmanCombatGame;

})(window, document);
