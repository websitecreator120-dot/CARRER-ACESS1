/**
 * ══════════════════════════════════════════════════════════════════════════════
 * CAREER AXIS — 3D LOGO OPENING ANIMATION & ENGINE
 * 
 * Features:
 * 1. 3D Perspective Cinematic Intro sequence upon opening website.
 * 2. Real-time interactive 3D gyroscope/cursor tilt & specular glint.
 * 3. Cybernetic constellation star-grid background with particle physics.
 * 4. Seamless flight & docking animation from center screen into topbar navbar.
 * 5. Instant skip controls (ESC, SPACE, Click) & Replay 3D trigger.
 * ══════════════════════════════════════════════════════════════════════════════
 */

(function (window, document) {
  'use strict';

  class CareerAxis3DIntro {
    constructor() {
      this.overlay = document.getElementById('career-axis-3d-intro');
      this.card = document.getElementById('axis-3d-card');
      this.glare = document.getElementById('axis-specular-glare');
      this.canvas = document.getElementById('axis-intro-canvas');
      this.skipBtn = document.getElementById('btn-skip-intro');
      this.brandNav = document.getElementById('navbar-brand-logo');
      this.replayBtns = document.querySelectorAll('.btn-replay-3d, #footer-replay-3d');

      this.ctx = null;
      this.particles = [];
      this.numParticles = 55;
      this.animFrameId = null;
      this.isDocked = false;
      this.autoDockTimer = null;

      // Mouse tracking state for 3D card tilt
      this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
      this.boundHandleMouseMove = this.handleMouseMove.bind(this);

      this.init();
    }

    init() {
      if (!this.overlay || !this.card) return;

      this.initCanvas();
      this.initEventListeners();

      // Launch 3D intro sequence upon opening website
      this.startSequence();
    }

    checkIsLoginAction() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const hasLoginParam = urlParams.get('signed_in') === 'true' ||
                              urlParams.get('login') === 'true' ||
                              urlParams.get('auth') === 'true';

        let hasSessionLogin = false;
        try {
          hasSessionLogin = sessionStorage.getItem('firewall_just_logged_in') === 'true';
        } catch (e) {}

        const isLogin = hasLoginParam || hasSessionLogin;

        // Clean up temporary login indicators so future back/forward navigation won't replay
        if (hasSessionLogin) {
          try {
            sessionStorage.removeItem('firewall_just_logged_in');
          } catch (e) {}
        }

        if (hasLoginParam) {
          try {
            const cleanUrl = window.location.pathname + (window.location.hash || '');
            window.history.replaceState({}, document.title, cleanUrl);
          } catch (e) {}
        }

        // Mark that user has visited in this session
        try {
          sessionStorage.setItem('firewall_session_active', 'true');
        } catch (e) {}

        return isLogin;
      } catch (err) {
        return false;
      }
    }

    skipToDocked() {
      this.isDocked = true;
      if (this.autoDockTimer) clearTimeout(this.autoDockTimer);
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
      window.removeEventListener('mousemove', this.boundHandleMouseMove);

      if (this.overlay) {
        this.overlay.classList.add('is-hidden');
        this.overlay.classList.remove('is-docking');
      }

      // Signal typewriter to begin typing smoothly without delay
      if (window.heroTypewriter && typeof window.heroTypewriter.reset === 'function') {
        window.heroTypewriter.reset(true);
      }

      window.dispatchEvent(new CustomEvent('career-axis-intro-finished'));
    }

    /* ─── 1. CYBERNETIC BACKGROUND CONSTELLATION CANVAS ─── */
    initCanvas() {
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());

      // Seed particles
      const w = this.canvas.width;
      const h = this.canvas.height;
      this.particles = [];
      for (let i = 0; i < this.numParticles; i++) {
        this.particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.75,
          vy: (Math.random() - 0.5) * 0.75,
          size: 1 + Math.random() * 2.2,
          alpha: 0.2 + Math.random() * 0.65,
          glow: Math.random() > 0.6
        });
      }

      this.startCanvasLoop();
    }

    resizeCanvas() {
      if (!this.canvas) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      this.canvas.width = window.innerWidth * dpr;
      this.canvas.height = window.innerHeight * dpr;
      if (this.ctx) this.ctx.scale(dpr, dpr);
    }

    startCanvasLoop() {
      const render = () => {
        if (!this.ctx || this.isDocked) return;
        const ctx = this.ctx;
        const w = window.innerWidth;
        const h = window.innerHeight;

        ctx.clearRect(0, 0, w, h);

        // Draw connecting constellation lines
        ctx.lineWidth = 0.75;
        for (let i = 0; i < this.particles.length; i++) {
          const p1 = this.particles[i];
          for (let j = i + 1; j < this.particles.length; j++) {
            const p2 = this.particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
              const alpha = (1 - dist / 110) * 0.18;
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Draw and update glowing particles
        for (const p of this.particles) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          ctx.fillStyle = p.glow ? '#38bdf8' : '#e0f2fe';
          ctx.shadowColor = p.glow ? '#38bdf8' : 'transparent';
          ctx.shadowBlur = p.glow ? 10 : 0;
          ctx.globalAlpha = p.alpha;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        this.animFrameId = requestAnimationFrame(render);
      };

      this.animFrameId = requestAnimationFrame(render);
    }

    /* ─── 2. INTERACTIVE 3D PERSPECTIVE TILT ─── */
    handleMouseMove(e) {
      if (this.isDocked) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1 to 1
      const dy = (e.clientY - cy) / cy; // -1 to 1

      const maxTilt = 18; // Maximum 3D tilt degrees
      const rotY = dx * maxTilt;
      const rotX = -dy * maxTilt;

      if (this.card) {
        this.card.style.transform = `perspective(1400px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(15px)`;
      }

      // Move specular glare with light reflection
      if (this.glare) {
        const glareX = 50 + dx * 35;
        const glareY = 50 + dy * 35;
        this.glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, rgba(56, 189, 248, 0.18) 35%, transparent 65%)`;
      }
    }

    /* ─── 3. TIMELINE & DOCKING FLIGHT TRANSITION ─── */
    startSequence() {
      this.isDocked = false;
      this.overlay.classList.remove('is-hidden', 'is-docking');
      this.card.style.transform = '';

      window.addEventListener('mousemove', this.boundHandleMouseMove);

      // Auto-dock into navbar after 3.2 seconds
      if (this.autoDockTimer) clearTimeout(this.autoDockTimer);
      this.autoDockTimer = setTimeout(() => {
        this.dockToNavbar();
      }, 3200);
    }

    dockToNavbar() {
      if (this.isDocked) return;
      this.isDocked = true;

      if (this.autoDockTimer) clearTimeout(this.autoDockTimer);
      window.removeEventListener('mousemove', this.boundHandleMouseMove);

      // Calculate target coordinates of topbar navbar brand
      const brandRect = this.brandNav ? this.brandNav.getBoundingClientRect() : null;
      const cardRect = this.card.getBoundingClientRect();

      let targetX = 0;
      let targetY = 0;
      let targetScale = 0.12;

      if (brandRect && cardRect) {
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const brandCenterX = brandRect.left + 50;
        const brandCenterY = brandRect.top + brandRect.height / 2;

        targetX = brandCenterX - cardCenterX;
        targetY = brandCenterY - cardCenterY;
        targetScale = Math.max(0.1, (brandRect.height * 1.8) / cardRect.height);
      } else {
        targetX = -window.innerWidth * 0.38;
        targetY = -window.innerHeight * 0.42;
      }

      this.card.style.setProperty('--dock-x', `${Math.round(targetX)}px`);
      this.card.style.setProperty('--dock-y', `${Math.round(targetY)}px`);
      this.card.style.setProperty('--dock-scale', targetScale.toFixed(3));

      // Trigger docking flight animation
      this.overlay.classList.add('is-docking');

      // Docking arrival sound / visual burst
      setTimeout(() => {
        if (this.brandNav) {
          this.brandNav.classList.add('dock-burst');
          setTimeout(() => this.brandNav.classList.remove('dock-burst'), 1000);
        }

        // Dissolve overlay
        this.overlay.classList.add('is-hidden');
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

        // Signal typewriter to begin typing smoothly on first load
        if (window.heroTypewriter && typeof window.heroTypewriter.reset === 'function') {
          window.heroTypewriter.reset(true);
        }

        // Notify that intro is finished to trigger after-intro popup
        window.dispatchEvent(new CustomEvent('career-axis-intro-finished'));
      }, 700);
    }

    /* ─── 4. EVENT LISTENERS & SHORTCUTS ─── */
    initEventListeners() {
      // Skip Button
      if (this.skipBtn) {
        this.skipBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.dockToNavbar();
        });
      }

      // Click anywhere on overlay to skip
      this.overlay.addEventListener('click', () => {
        this.dockToNavbar();
      });

      // Keyboard shortcuts: ESC, Space, Enter
      window.addEventListener('keydown', (e) => {
        if (!this.isDocked && (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter')) {
          e.preventDefault();
          this.dockToNavbar();
        }
      });

      // Replay 3D intro via Navbar Brand Logo or Replay Buttons
      if (this.brandNav) {
        this.brandNav.addEventListener('click', (e) => {
          e.preventDefault();
          this.replayIntro();
        });
      }

      this.replayBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.replayIntro();
        });
      });

      // Browser back/forward cache (bfcache) - ensure overlay stays hidden when navigated back
      window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
          this.skipToDocked();
        }
      });
    }

    playLoginIntro() {
      try {
        sessionStorage.removeItem('firewall_just_logged_in');
      } catch (e) {}
      this.replayIntro();
    }

    replayIntro() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.overlay.classList.remove('is-hidden', 'is-docking');
      this.card.style.transform = '';
      this.card.style.removeProperty('--dock-x');
      this.card.style.removeProperty('--dock-y');
      this.card.style.removeProperty('--dock-scale');

      // Re-trigger reveal animation
      this.card.style.animation = 'none';
      void this.card.offsetWidth; // Force reflow
      this.card.style.animation = 'axis3dReveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';

      this.startSequence();
      this.startCanvasLoop();
    }
  }

  // Auto-instantiate on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    window.careerAxis3DIntro = new CareerAxis3DIntro();
  });

  window.CareerAxis3DIntro = CareerAxis3DIntro;
  window.playCareerAxisLoginIntro = function() {
    if (window.careerAxis3DIntro && typeof window.careerAxis3DIntro.playLoginIntro === 'function') {
      window.careerAxis3DIntro.playLoginIntro();
    }
  };

})(window, document);
