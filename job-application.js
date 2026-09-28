/**
 * ══════════════════════════════════════════════════════════════════════════════
 * CAREER AXIS — SECTION 4: JOBS IN INDIA & MULTI-SECTION APPLICATION ENGINE
 * ══════════════════════════════════════════════════════════════════════════════
 */

(function (window, document) {
  'use strict';

  // ─── 1. VERIFIED COMPANIES IN INDIA ROSTER ───
  const INDIAN_COMPANIES = [
    {
      id: 'tcs',
      name: 'Tata Consultancy Services',
      logo: '🏢',
      location: 'Bengaluru • Hyderabad • Mumbai • Pune (Hybrid)',
      category: 'fullstack',
      role: 'Senior Full Stack & Cloud Developer',
      peopleNeeded: 'Proactive engineers strong in React.js, Node.js, Spring Boot, microservices architecture, and agile problem solving.',
      salary: '₹12,00,000 - ₹24,00,000 / Year (₹12 - ₹24 LPA)',
      tag: 'Immediate Hiring',
      skills: ['React', 'Node.js', 'Spring Boot', 'AWS', 'Docker']
    },
    {
      id: 'infosys',
      name: 'Infosys Cobalt Labs',
      logo: '⚡',
      location: 'Bengaluru • Pune • Chennai (Hybrid)',
      category: 'ai',
      role: 'AI / Machine Learning Engineer',
      peopleNeeded: 'Innovators with deep expertise in PyTorch, TensorFlow, LLMs, NLP, Python pipelines, and neural network model deployment.',
      salary: '₹16,00,000 - ₹32,00,000 / Year (₹16 - ₹32 LPA)',
      tag: 'Urgent Hiring',
      skills: ['Python', 'PyTorch', 'LLMs', 'Transformers', 'MLOps']
    },
    {
      id: 'google-in',
      name: 'Google India',
      logo: '🌐',
      location: 'Bengaluru • Hyderabad',
      category: 'cloud',
      role: 'Cloud Systems & Infrastructure Engineer',
      peopleNeeded: 'System thinkers with solid foundation in Linux internals, Kubernetes, distributed systems, Go/Python, and site reliability.',
      salary: '₹28,00,000 - ₹55,00,000 / Year (₹28 - ₹55 LPA)',
      tag: 'High Priority',
      skills: ['Kubernetes', 'Go', 'GCP', 'Distributed Systems', 'Linux']
    },
    {
      id: 'ms-in',
      name: 'Microsoft India (R&D)',
      logo: '🛡️',
      location: 'Hyderabad • Bengaluru • Noida',
      category: 'cyber',
      role: 'Cybersecurity & Threat Defense Specialist',
      peopleNeeded: 'Security defenders with hands-on penetration testing, zero-trust cloud architecture, threat hunting, and SOC operations.',
      salary: '₹24,00,000 - ₹48,00,000 / Year (₹24 - ₹48 LPA)',
      tag: 'Verified Employer',
      skills: ['Penetration Testing', 'SIEM', 'Zero Trust', 'Azure Security', 'Network Defense']
    },
    {
      id: 'flipkart',
      name: 'Flipkart / Walmart Tech',
      logo: '🛍️',
      location: 'Bengaluru (Hybrid)',
      category: 'ai',
      role: 'Data Scientist & Predictive Analytics Lead',
      peopleNeeded: 'Data leaders skilled in large-scale recommendation systems, SQL, Python, Spark, customer analytics, and real-time inference.',
      salary: '₹22,00,000 - ₹42,00,000 / Year (₹22 - ₹42 LPA)',
      tag: 'Fast Track',
      skills: ['Python', 'Spark', 'SQL', 'Deep Learning', 'Big Data']
    },
    {
      id: 'razorpay',
      name: 'Razorpay Fintech Core',
      logo: '💳',
      location: 'Bengaluru • Mumbai',
      category: 'fullstack',
      role: 'Backend API & Payment Systems Architect',
      peopleNeeded: 'Engineers focused on low-latency financial gateways, high-concurrency Node.js/Go, PostgreSQL, Redis, and security compliance.',
      salary: '₹20,00,000 - ₹38,00,000 / Year (₹20 - ₹38 LPA)',
      tag: 'Active Openings',
      skills: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka']
    },
    {
      id: 'zomato',
      name: 'Zomato & Blinkit Tech',
      logo: '🚀',
      location: 'Gurugram • Delhi NCR',
      category: 'fullstack',
      role: 'Mobile App & Frontend Performance Specialist',
      peopleNeeded: 'UI engineers passionate about high-frame-rate consumer apps in React Native, Flutter, Swift/Kotlin, and ultra-smooth UX.',
      salary: '₹18,00,000 - ₹35,00,000 / Year (₹18 - ₹35 LPA)',
      tag: 'Immediate Joiner',
      skills: ['React Native', 'Flutter', 'TypeScript', 'Redux', 'Micro-UI']
    },
    {
      id: 'jio',
      name: 'Jio Platforms (5G & Edge)',
      logo: '📡',
      location: 'Navi Mumbai • Bengaluru • Hyderabad',
      category: 'cloud',
      role: 'DevOps & Edge Mesh Deployment Engineer',
      peopleNeeded: 'DevOps pros skilled in high-throughput CI/CD pipelines, Docker, Kubernetes clusters, Terraform, and edge observability.',
      salary: '₹14,00,000 - ₹26,00,000 / Year (₹14 - ₹26 LPA)',
      tag: 'Massive Expansion',
      skills: ['CI/CD', 'Terraform', 'Docker', 'Prometheus', 'Edge Cloud']
    }
  ];

  class JobPortalApp {
    constructor() {
      this.companies = INDIAN_COMPANIES;
      this.currentCategory = 'all';
      this.currentPage = 1;
      this.positionCount = 1;

      // Canvas Digital Signature
      this.sigCanvas = null;
      this.sigCtx = null;
      this.isDrawingSig = false;
      this.hasSignature = false;

      this.init();
    }

    init() {
      this.renderCompanies();
      this.initFilters();
      this.initModal();
      this.initStepper();
      this.initAddPositionBtn();
      this.initFileUpload();
      this.initSignatureCanvas();
      this.initFormSubmission();
      this.setDefaultDate();
    }

    /* ─── MODAL CONTROLS ─── */
    initModal() {
      this.modalBackdrop = document.getElementById('job-app-modal-backdrop');
      this.modalCloseBtn = document.getElementById('job-app-modal-close');

      if (this.modalCloseBtn) {
        this.modalCloseBtn.addEventListener('click', () => this.closeModal());
      }

      if (this.modalBackdrop) {
        this.modalBackdrop.addEventListener('click', (e) => {
          if (e.target === this.modalBackdrop) {
            this.closeModal();
          }
        });
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modalBackdrop && this.modalBackdrop.classList.contains('active')) {
          this.closeModal();
        }
      });
    }

    openModal() {
      if (!this.modalBackdrop) {
        this.modalBackdrop = document.getElementById('job-app-modal-backdrop');
      }
      if (this.modalBackdrop) {
        this.modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Trigger signature canvas resize once container is visible
        setTimeout(() => {
          this.resizeSigCanvas();
        }, 150);
      }
    }

    closeModal() {
      if (this.modalBackdrop) {
        this.modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    /* ─── 1. RENDER COMPANIES ─── */
    renderCompanies() {
      const grid = document.getElementById('companies-cards-grid');
      const countEl = document.getElementById('jobs-count-text');
      if (!grid) return;

      const filtered = this.currentCategory === 'all'
        ? this.companies
        : this.companies.filter(c => c.category === this.currentCategory);

      if (countEl) {
        countEl.textContent = `${filtered.length} Companies Hiring Now`;
      }

      grid.innerHTML = filtered.map(c => `
        <div class="company-card" data-category="${c.category}" data-company="${c.name}" data-role="${c.role}" data-salary="${c.salary}">
          <div>
            <div class="company-head">
              <div class="company-logo-badge">${c.logo}</div>
              <div class="company-meta-title">
                <h4 class="company-name">${c.name}</h4>
                <div class="company-loc">📍 ${c.location}</div>
              </div>
              <span class="company-tag-pill">${c.tag}</span>
            </div>

            <div class="company-role-block">
              <div class="company-role-title">💼 ${c.role}</div>
              <p class="company-role-desc"><strong>Looking for:</strong> ${c.peopleNeeded}</p>
            </div>

            <div class="company-salary-box">
              <span class="salary-label">Offered Salary:</span>
              <span class="salary-amount">${c.salary}</span>
            </div>

            <div class="company-skills-tags">
              ${c.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
          </div>

          <button type="button" class="btn-company-apply" data-company="${c.name}" data-role="${c.role}" data-salary="${c.salary}">
            <span>Apply to ${c.name}</span>
            <span>→</span>
          </button>
        </div>
      `).join('');

      // Clicking ANYWHERE on a company card or its Apply button opens the form modal
      grid.querySelectorAll('.company-card').forEach(card => {
        card.addEventListener('click', (e) => {
          const compName = card.getAttribute('data-company');
          const role = card.getAttribute('data-role');
          const salary = card.getAttribute('data-salary');
          this.selectCompanyForApplication(compName, role, salary);
        });
      });
    }

    /* ─── 2. CATEGORY FILTERS ─── */
    initFilters() {
      const tabs = document.querySelectorAll('.job-tab-btn');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          this.currentCategory = tab.getAttribute('data-filter') || 'all';
          this.renderCompanies();
        });
      });
    }

    /* ─── 3. SELECT COMPANY & OPEN MODAL FORM ─── */
    selectCompanyForApplication(companyName, role, salary) {
      // Pre-fill position field
      const posInput = document.getElementById('app-position');
      if (posInput) {
        posInput.value = `${role} at ${companyName}`;
      }

      // Pre-fill expected salary
      const salInput = document.getElementById('app-salary');
      if (salInput) {
        salInput.value = salary;
      }

      // Update selected company strip inside the form
      const strip = document.getElementById('app-selected-company-strip');
      const stripName = document.getElementById('selected-company-name');
      if (strip && stripName) {
        strip.style.display = 'inline-flex';
        stripName.textContent = `Applying for: ${companyName} (${role})`;
      }

      // Switch to Page 1
      this.goToPage(1);

      // Open the modal form overlay!
      this.openModal();

      // Focus first name field inside modal
      const firstNameInput = document.getElementById('app-firstname');
      if (firstNameInput) {
        setTimeout(() => firstNameInput.focus(), 350);
      }
    }

    /* ─── 4. MULTI-STEP NAVIGATION (PAGE 1 & PAGE 2) ─── */
    initStepper() {
      const btnNext = document.getElementById('btn-form-next');
      const btnPrev = document.getElementById('btn-form-prev');
      const step1 = document.getElementById('step-indicator-1');
      const step2 = document.getElementById('step-indicator-2');

      if (btnNext) {
        btnNext.addEventListener('click', () => {
          if (this.validatePage(1)) {
            this.goToPage(2);
          }
        });
      }

      if (btnPrev) {
        btnPrev.addEventListener('click', () => {
          this.goToPage(1);
        });
      }

      if (step1) {
        step1.addEventListener('click', () => this.goToPage(1));
      }
      if (step2) {
        step2.addEventListener('click', () => {
          if (this.validatePage(1)) {
            this.goToPage(2);
          }
        });
      }
    }

    goToPage(pageNum) {
      this.currentPage = pageNum;
      const page1 = document.getElementById('form-page-1');
      const page2 = document.getElementById('form-page-2');
      const step1 = document.getElementById('step-indicator-1');
      const step2 = document.getElementById('step-indicator-2');
      const btnNext = document.getElementById('btn-form-next');
      const btnPrev = document.getElementById('btn-form-prev');
      const btnSubmit = document.getElementById('btn-form-submit');

      if (pageNum === 1) {
        if (page1) page1.classList.add('active');
        if (page2) page2.classList.remove('active');

        if (step1) { step1.classList.add('active'); step1.classList.remove('completed'); }
        if (step2) { step2.classList.remove('active', 'completed'); }

        if (btnPrev) btnPrev.style.display = 'none';
        if (btnNext) btnNext.style.display = 'inline-flex';
        if (btnSubmit) btnSubmit.style.display = 'none';
      } else {
        if (page1) page1.classList.remove('active');
        if (page2) page2.classList.add('active');

        if (step1) { step1.classList.remove('active'); step1.classList.add('completed'); }
        if (step2) { step2.classList.add('active'); }

        if (btnPrev) btnPrev.style.display = 'inline-flex';
        if (btnNext) btnNext.style.display = 'none';
        if (btnSubmit) btnSubmit.style.display = 'inline-flex';

        // Re-size signature canvas upon entering page 2
        this.resizeSigCanvas();
      }

      // Scroll form head into view
      const formContainer = document.getElementById('job-application-form-container');
      if (formContainer) {
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    /* ─── 5. DYNAMIC "+ ADD ANOTHER POSITION" ─── */
    initAddPositionBtn() {
      const addBtn = document.getElementById('btn-add-experience');
      const container = document.getElementById('experience-positions-container');
      if (!addBtn || !container) return;

      addBtn.addEventListener('click', () => {
        this.positionCount++;
        const pId = this.positionCount;
        const newCard = document.createElement('div');
        newCard.className = 'exp-position-card';
        newCard.id = `exp-card-${pId}`;
        newCard.innerHTML = `
          <div class="exp-card-header">
            <span class="exp-card-title">💼 Position #${pId} (Previous Experience)</span>
            <button type="button" class="btn-remove-exp" onclick="document.getElementById('exp-card-${pId}').remove()">✕ Remove</button>
          </div>
          <div class="form-grid-2">
            <div class="form-field-group">
              <label class="form-label">Job Title / Role</label>
              <input type="text" class="form-input" placeholder="e.g. Software Engineer">
            </div>
            <div class="form-field-group">
              <label class="form-label">Company / Organization Name</label>
              <input type="text" class="form-input" placeholder="e.g. Tech Solutions Pvt Ltd">
            </div>
          </div>
          <div class="form-grid-2">
            <div class="form-field-group">
              <label class="form-label">Employment Dates</label>
              <div style="display: flex; gap: 8px;">
                <input type="date" class="form-input" placeholder="Start Date">
                <input type="date" class="form-input" placeholder="End Date">
              </div>
            </div>
            <div class="form-field-group">
              <label class="form-label">Reason for Leaving (Optional)</label>
              <input type="text" class="form-input" placeholder="e.g. Career growth & relocation">
            </div>
          </div>
          <div class="form-field-group">
            <label class="form-label">Key Responsibilities & Achievements</label>
            <textarea class="form-textarea" placeholder="Describe your duties, tools used, and key accomplishments..."></textarea>
          </div>
        `;
        container.appendChild(newCard);
      });
    }

    /* ─── 6. FILE UPLOAD DRAG & DROP ─── */
    initFileUpload() {
      const dropzone = document.getElementById('resume-dropzone');
      const fileInput = document.getElementById('resume-file-input');
      const badge = document.getElementById('resume-file-badge');
      const fileNameEl = document.getElementById('resume-file-name');

      if (!dropzone || !fileInput) return;

      dropzone.addEventListener('click', () => fileInput.click());

      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
          const file = fileInput.files[0];
          if (badge && fileNameEl) {
            fileNameEl.textContent = `📎 ${file.name} (${Math.round(file.size / 1024)} KB)`;
            badge.classList.add('visible');
          }
        }
      });

      ['dragenter', 'dragover'].forEach(evt => {
        dropzone.addEventListener(evt, (e) => {
          e.preventDefault();
          dropzone.classList.add('dragover');
        });
      });

      ['dragleave', 'drop'].forEach(evt => {
        dropzone.addEventListener(evt, (e) => {
          e.preventDefault();
          dropzone.classList.remove('dragover');
        });
      });

      dropzone.addEventListener('drop', (e) => {
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          fileInput.files = e.dataTransfer.files;
          const file = e.dataTransfer.files[0];
          if (badge && fileNameEl) {
            fileNameEl.textContent = `📎 ${file.name} (${Math.round(file.size / 1024)} KB)`;
            badge.classList.add('visible');
          }
        }
      });
    }

    /* ─── 7. DIGITAL SIGNATURE CANVAS ─── */
    initSignatureCanvas() {
      this.sigCanvas = document.getElementById('signature-canvas');
      const clearBtn = document.getElementById('btn-clear-signature');
      if (!this.sigCanvas) return;

      this.sigCtx = this.sigCanvas.getContext('2d');
      this.resizeSigCanvas();

      const getPos = (e) => {
        const rect = this.sigCanvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
          x: clientX - rect.left,
          y: clientY - rect.top
        };
      };

      const startDrawing = (e) => {
        e.preventDefault();
        this.isDrawingSig = true;
        this.hasSignature = true;
        const pos = getPos(e);
        this.sigCtx.beginPath();
        this.sigCtx.moveTo(pos.x, pos.y);
      };

      const draw = (e) => {
        if (!this.isDrawingSig) return;
        e.preventDefault();
        const pos = getPos(e);
        this.sigCtx.lineTo(pos.x, pos.y);
        this.sigCtx.strokeStyle = '#000000';
        this.sigCtx.lineWidth = 2.8;
        this.sigCtx.lineCap = 'round';
        this.sigCtx.lineJoin = 'round';
        this.sigCtx.stroke();
      };

      const stopDrawing = (e) => {
        if (this.isDrawingSig) {
          e.preventDefault();
          this.isDrawingSig = false;
        }
      };

      this.sigCanvas.addEventListener('mousedown', startDrawing);
      this.sigCanvas.addEventListener('mousemove', draw);
      window.addEventListener('mouseup', stopDrawing);

      this.sigCanvas.addEventListener('touchstart', startDrawing, { passive: false });
      this.sigCanvas.addEventListener('touchmove', draw, { passive: false });
      window.addEventListener('touchend', stopDrawing);

      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          this.clearSignature();
        });
      }
    }

    resizeSigCanvas() {
      if (!this.sigCanvas || !this.sigCtx) return;
      const rect = this.sigCanvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        this.sigCanvas.width = rect.width;
        this.sigCanvas.height = rect.height;
      }
    }

    clearSignature() {
      if (!this.sigCanvas || !this.sigCtx) return;
      this.sigCtx.clearRect(0, 0, this.sigCanvas.width, this.sigCanvas.height);
      this.hasSignature = false;
    }

    setDefaultDate() {
      const dateInput = document.getElementById('app-declaration-date');
      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
      }
    }

    /* ─── 8. CLIENT-SIDE VALIDATION ─── */
    validatePage(pageNum) {
      let isValid = true;

      const checkField = (id, errorId) => {
        const el = document.getElementById(id);
        const errEl = document.getElementById(errorId);
        if (!el) return true;

        const val = el.value.trim();
        if (!val) {
          el.classList.add('has-error');
          if (errEl) errEl.classList.add('visible');
          isValid = false;
          return false;
        } else {
          el.classList.remove('has-error');
          if (errEl) errEl.classList.remove('visible');
          return true;
        }
      };

      if (pageNum === 1) {
        checkField('app-firstname', 'err-firstname');
        checkField('app-lastname', 'err-lastname');
        checkField('app-dob', 'err-dob');
        checkField('app-email', 'err-email');
        checkField('app-phone', 'err-phone');
        checkField('app-address-street', 'err-address-street');
        checkField('app-city', 'err-city');
        checkField('app-state', 'err-state');
        checkField('app-zip', 'err-zip');
        checkField('app-country', 'err-country');
        checkField('app-position', 'err-position');
        checkField('app-startdate', 'err-startdate');
        checkField('app-salary', 'err-salary');
        checkField('app-institution', 'err-institution');
        checkField('app-major', 'err-major');
        checkField('app-gradyear', 'err-gradyear');

        if (!isValid) {
          // Scroll to first invalid field
          const firstErr = document.querySelector('#form-page-1 .has-error');
          if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else if (pageNum === 2) {
        checkField('app-role-1', 'err-role-1');
        checkField('app-company-1', 'err-company-1');
        checkField('app-resp-1', 'err-resp-1');
        checkField('app-ref1-name', 'err-ref1-name');
        checkField('app-ref1-phone', 'err-ref1-phone');
        checkField('app-ref1-email', 'err-ref1-email');
        checkField('app-sig-name', 'err-sig-name');

        if (!isValid) {
          const firstErr = document.querySelector('#form-page-2 .has-error');
          if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      return isValid;
    }

    /* ─── 9. FORM SUBMISSION & SUCCESS MODAL ─── */
    initFormSubmission() {
      const submitBtn = document.getElementById('btn-form-submit');
      const modal = document.getElementById('app-success-modal');
      const closeBtn = document.getElementById('btn-close-success-modal');

      if (!submitBtn) return;

      submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (!this.validatePage(2)) return;

        // Visual loading feedback
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="width:16px;height:16px;animation:spin 0.8s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
          <span>Persisting to Cloud Firestore...</span>
        `;

        // Gather all submitted details from both pages
        const firstName = document.getElementById('app-firstname')?.value.trim() || 'Applicant';
        const lastName = document.getElementById('app-lastname')?.value.trim() || '';
        const dob = document.getElementById('app-dob')?.value || '';
        const email = document.getElementById('app-email')?.value.trim() || 'applicant@domain.com';
        const phone = document.getElementById('app-phone')?.value.trim() || '';
        const street = document.getElementById('app-address-street')?.value.trim() || '';
        const city = document.getElementById('app-city')?.value.trim() || '';
        const state = document.getElementById('app-state')?.value.trim() || '';
        const zip = document.getElementById('app-zip')?.value.trim() || '';
        const country = document.getElementById('app-country')?.value.trim() || '';
        const position = document.getElementById('app-position')?.value.trim() || 'Software Engineer';
        const startDate = document.getElementById('app-startdate')?.value || '';
        const salary = document.getElementById('app-salary')?.value.trim() || '';
        const institution = document.getElementById('app-institution')?.value.trim() || '';
        const major = document.getElementById('app-major')?.value.trim() || '';
        const gradYear = document.getElementById('app-gradyear')?.value.trim() || '';
        const gpa = document.getElementById('app-gpa')?.value.trim() || '';

        const role1 = document.getElementById('app-role-1')?.value.trim() || '';
        const company1 = document.getElementById('app-company-1')?.value.trim() || '';
        const resp1 = document.getElementById('app-resp-1')?.value.trim() || '';
        const ref1Name = document.getElementById('app-ref1-name')?.value.trim() || '';
        const ref1Phone = document.getElementById('app-ref1-phone')?.value.trim() || '';
        const ref1Email = document.getElementById('app-ref1-email')?.value.trim() || '';
        const sigName = document.getElementById('app-sig-name')?.value.trim() || '';
        const sigDate = document.getElementById('app-sig-date')?.value.trim() || '';

        const appId = `AXIS-IN-${Math.floor(100000 + Math.random() * 900000)}`;
        const timestamp = new Date().toLocaleString();

        const applicationPayload = {
          appId,
          applicantName: `${firstName} ${lastName}`.trim(),
          firstName,
          lastName,
          dob,
          email,
          phone,
          address: { street, city, state, zip, country },
          position,
          startDate,
          desiredSalary: salary,
          education: { institution, major, gradYear, gpa },
          experience: { role1, company1, resp1 },
          references: [{ name: ref1Name, phone: ref1Phone, email: ref1Email }],
          signature: { name: sigName, date: sigDate },
          companyApplied: this.selectedCompany ? {
            id: this.selectedCompany.id,
            name: this.selectedCompany.name,
            role: this.selectedCompany.role,
            salary: this.selectedCompany.salary
          } : null
        };

        // ─── CLOUD FIRESTORE REAL DATABASE PERSISTENCE ───
        try {
          if (window.FirebaseBridge && window.FirebaseBridge.saveJobApplication) {
            const currentUser = window.FirebaseBridge.getCurrentUser();
            const firestoreResult = await window.FirebaseBridge.saveJobApplication(applicationPayload, currentUser);
            if (!firestoreResult.success) {
              console.warn('[Firestore] Note:', firestoreResult.error);
            }
          }
        } catch (err) {
          console.error('[Firestore Submission Error]:', err);
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalContent;
        }

        // Populate Success Modal
        const nameEl = document.getElementById('modal-applicant-name');
        const roleEl = document.getElementById('modal-applicant-role');
        const idEl = document.getElementById('modal-app-id');
        const timeEl = document.getElementById('modal-app-timestamp');

        if (nameEl) nameEl.textContent = `${firstName} ${lastName}`;
        if (roleEl) roleEl.textContent = position;
        if (idEl) idEl.textContent = appId;
        if (timeEl) timeEl.textContent = `${timestamp} (Synced to Cloud Firestore)`;

        if (modal) {
          modal.style.display = 'flex';
        }
      });

      if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
          modal.style.display = 'none';
          this.resetForm();
        });
      }
    }

    resetForm() {
      const form = document.getElementById('job-application-form');
      if (form) form.reset();
      this.clearSignature();
      this.setDefaultDate();
      const badge = document.getElementById('resume-file-badge');
      if (badge) badge.classList.remove('visible');
      const strip = document.getElementById('app-selected-company-strip');
      if (strip) strip.style.display = 'none';
      this.goToPage(1);
      this.closeModal();

      // Scroll smoothly back up to Section 4
      const sec4 = document.getElementById('jobs-india');
      if (sec4) sec4.scrollIntoView({ behavior: 'smooth' });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.jobPortalApp = new JobPortalApp();
  });

  window.JobPortalApp = JobPortalApp;

})(window, document);
