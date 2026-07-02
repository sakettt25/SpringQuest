import { REVISION_CATEGORIES, CHEATSHEETS, RESOURCES } from '../data/revision-data.js';
import { MCQ_CATEGORIES } from '../data/mcq-data.js';

export class RevisionModule {
  constructor(gsm, anim) {
    this.gsm = gsm;
    this.anim = anim;
    this.onBack = null;
  }

  render(container) {
    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'revision-container';
    wrapper.innerHTML = `
      <div class="revision-header">
        <div>
          <h1 class="revision-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:8px;color:var(--accent-blue);">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            Knowledge Hub
          </h1>
          <p class="revision-subtitle">Master every concept from Java fundamentals to Reactive Spring Boot</p>
        </div>
        <button class="back-btn" id="rev-back-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Back to Curriculum
        </button>
      </div>

      <div class="revision-tabs" id="revision-tabs">
        <button class="rev-tab active" data-tab="concepts">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          Concepts
        </button>
        <button class="rev-tab" data-tab="cheatsheets">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Cheatsheets
        </button>
        <button class="rev-tab" data-tab="mcq">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          MCQ Quiz
        </button>
        <button class="rev-tab" data-tab="resources">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          Resources
        </button>
      </div>

      <div id="revision-content" class="revision-content"></div>
    `;
    container.appendChild(wrapper);

    wrapper.querySelector('#rev-back-btn').addEventListener('click', () => { if (this.onBack) this.onBack(); });

    // Tab switching
    const tabs = wrapper.querySelectorAll('.rev-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this._renderTab(tab.dataset.tab);
      });
    });

    this._renderTab('concepts');
  }

  _renderTab(tab) {
    const el = document.getElementById('revision-content');
    if (!el) return;
    el.innerHTML = '';
    el.style.opacity = '0';

    switch(tab) {
      case 'concepts': this._renderConcepts(el); break;
      case 'cheatsheets': this._renderCheatsheets(el); break;
      case 'mcq': this._renderMCQ(el); break;
      case 'resources': this._renderResources(el); break;
    }
    // Animate in
    requestAnimationFrame(() => { el.style.transition = 'opacity 0.3s ease'; el.style.opacity = '1'; });
  }

  // ─── CONCEPTS TAB ──────────────────────────────────────────────
  _renderConcepts(el) {
    let html = '<div class="concepts-grid">';
    for (const cat of REVISION_CATEGORIES) {
      html += `
        <div class="concept-category" style="--cat-color:${cat.color}">
          <div class="concept-cat-header" data-cat-id="${cat.id}">
            <div class="concept-cat-icon" style="background:${cat.color}20;color:${cat.color}">${cat.icon}</div>
            <div>
              <div class="concept-cat-title">${cat.title}</div>
              <div class="concept-cat-count">${cat.topics.length} terms</div>
            </div>
            <svg class="concept-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <div class="concept-topics-list" id="topics-${cat.id}" style="display:none;">
            ${cat.topics.map((t, i) => `
              <div class="concept-topic" style="animation-delay:${i * 0.03}s">
                <div class="concept-term">${t.term}</div>
                <div class="concept-def">${t.definition}</div>
              </div>
            `).join('')}
          </div>
        </div>`;
    }
    html += '</div>';
    el.innerHTML = html;

    // Accordion toggle
    el.querySelectorAll('.concept-cat-header').forEach(header => {
      header.addEventListener('click', () => {
        const list = document.getElementById('topics-' + header.dataset.catId);
        const chevron = header.querySelector('.concept-chevron');
        const isOpen = list.style.display !== 'none';
        list.style.display = isOpen ? 'none' : 'block';
        chevron.style.transform = isOpen ? 'rotate(0)' : 'rotate(180deg)';
      });
    });
  }

  // ─── CHEATSHEETS TAB ───────────────────────────────────────────
  _renderCheatsheets(el) {
    let html = '<div class="cheatsheets-grid">';
    for (const sheet of CHEATSHEETS) {
      html += `
        <div class="cheatsheet-card" style="--sheet-color:${sheet.color}">
          <div class="cheatsheet-title" style="border-bottom-color:${sheet.color}40">${sheet.title}</div>
          ${sheet.sections.map(sec => `
            <div class="cheatsheet-section">
              <div class="cheatsheet-section-heading">${sec.heading}</div>
              ${sec.items.map(item => `
                <div class="cheatsheet-item">
                  <code class="cheatsheet-code">${item.code}</code>
                  <span class="cheatsheet-desc">${item.desc}</span>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>`;
    }
    html += '</div>';
    el.innerHTML = html;
  }

  // ─── MCQ QUIZ TAB ─────────────────────────────────────────────
  _renderMCQ(el) {
    let html = `
      <div class="mcq-intro" id="mcq-intro">
        <h2 style="font-size:1.2rem;margin-bottom:0.5rem;">Interview Quiz Engine</h2>
        <p style="color:var(--text-secondary);margin-bottom:1.5rem;font-size:0.9rem;">Test your knowledge with curated interview questions. Select a category to begin.</p>
        <div class="mcq-categories-grid">
          ${MCQ_CATEGORIES.map(cat => `
            <div class="mcq-category-card" data-cat-id="${cat.id}" style="--cat-color:${cat.color}">
              <div class="mcq-cat-icon" style="background:${cat.color}20;color:${cat.color}">${cat.icon}</div>
              <div class="mcq-cat-title">${cat.title}</div>
              <div class="mcq-cat-count">${cat.questions.length} Questions</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div id="mcq-quiz-area" style="display:none;"></div>
    `;
    el.innerHTML = html;

    el.querySelectorAll('.mcq-category-card').forEach(card => {
      card.addEventListener('click', () => {
        const cat = MCQ_CATEGORIES.find(c => c.id === card.dataset.catId);
        if (cat) this._startQuiz(cat);
      });
    });
  }

  _startQuiz(category) {
    const area = document.getElementById('mcq-quiz-area');
    const intro = document.getElementById('mcq-intro');
    if (!area || !intro) return;
    intro.style.display = 'none';
    area.style.display = 'block';

    const questions = [...category.questions].sort(() => Math.random() - 0.5);
    let current = 0;
    let score = 0;
    let answered = new Array(questions.length).fill(-1);
    const diffStats = { easy: { total: 0, correct: 0 }, medium: { total: 0, correct: 0 }, hard: { total: 0, correct: 0 } };
    questions.forEach(q => { if (diffStats[q.difficulty]) diffStats[q.difficulty].total++; });

    const renderQuestion = () => {
      const q = questions[current];
      area.innerHTML = `
        <div class="quiz-header">
          <button class="back-btn" id="quiz-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Back to Categories
          </button>
          <div class="quiz-progress-info">
            <span style="color:${category.color};font-weight:600;">${category.title}</span>
            <span class="quiz-counter">${current + 1} / ${questions.length}</span>
          </div>
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width:${((current + 1) / questions.length) * 100}%;background:${category.color}"></div>
          </div>
        </div>
        <div class="quiz-question-card">
          <div style="margin-bottom:0.8rem;">
            <span class="difficulty-${q.difficulty || 'medium'}" style="font-size:0.75rem;padding:0.2rem 0.5rem;border-radius:4px;background:var(--bg-secondary);border:1px solid var(--border);text-transform:uppercase;font-weight:700;">${q.difficulty || 'Medium'}</span>
          </div>
          <div class="quiz-question-text">${q.q}</div>
          <div class="quiz-options" id="quiz-options">
            ${q.options.map((opt, i) => `
              <button class="quiz-option ${answered[current] === i ? (i === q.answer ? 'correct' : 'wrong') : ''} ${answered[current] >= 0 && i === q.answer ? 'correct' : ''}" data-idx="${i}" ${answered[current] >= 0 ? 'disabled' : ''}>
                <span class="quiz-option-letter">${String.fromCharCode(65 + i)}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
          ${answered[current] >= 0 ? `
            <div class="quiz-explanation ${answered[current] === q.answer ? 'correct' : 'wrong'}">
              <strong>${answered[current] === q.answer ? 'Correct!' : 'Incorrect.'}</strong> ${q.explanation}
            </div>
          ` : ''}
          <div class="quiz-nav">
            <button class="btn btn-ghost" id="quiz-prev" ${current === 0 ? 'disabled' : ''}>Previous</button>
            ${answered[current] >= 0 && current < questions.length - 1 ? '<button class="btn btn-primary" id="quiz-next">Next →</button>' : ''}
            ${answered[current] >= 0 && current === questions.length - 1 ? '<button class="btn btn-primary" id="quiz-finish">View Results</button>' : ''}
          </div>
        </div>
      `;

      // Event listeners
      area.querySelector('#quiz-back').addEventListener('click', () => {
        area.style.display = 'none';
        intro.style.display = 'block';
      });

      if (answered[current] < 0) {
        area.querySelectorAll('.quiz-option').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx);
            answered[current] = idx;
            if (idx === q.answer) {
              score++;
              if (diffStats[q.difficulty]) diffStats[q.difficulty].correct++;
            }
            renderQuestion(); // re-render with answer feedback
          });
        });
      }

      const prevBtn = area.querySelector('#quiz-prev');
      if (prevBtn) prevBtn.addEventListener('click', () => { current--; renderQuestion(); });

      const nextBtn = area.querySelector('#quiz-next');
      if (nextBtn) nextBtn.addEventListener('click', () => { current++; renderQuestion(); });

      const finishBtn = area.querySelector('#quiz-finish');
      if (finishBtn) finishBtn.addEventListener('click', () => this._showResults(area, intro, category, score, questions.length, diffStats));
    };

    renderQuestion();
  }

  _showResults(area, intro, category, score, total, diffStats) {
    const pct = Math.round((score / total) * 100);
    const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : pct >= 50 ? 'D' : 'F';
    const gradeColor = pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444';

    area.innerHTML = `
      <div class="quiz-results">
        <div class="quiz-results-grade" style="background:${gradeColor}15;border-color:${gradeColor}40;color:${gradeColor}">
          <div class="grade-letter">${grade}</div>
          <div class="grade-score">${score}/${total}</div>
        </div>
        <h2 style="margin:1rem 0 0.5rem;font-size:1.2rem;">${category.title} — Quiz Complete</h2>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1.5rem;">
          ${pct >= 80 ? 'Excellent! You have strong knowledge of this topic.' : pct >= 60 ? 'Good effort! Review the concepts you missed.' : 'Keep studying! Revisit the Concepts tab for this topic.'}
        </p>
        <div style="display:flex;justify-content:center;gap:1rem;margin:1.5rem 0;">
          ${diffStats ? ['easy', 'medium', 'hard'].map(d => {
            const st = diffStats[d];
            if (!st || st.total === 0) return '';
            const c = d === 'easy' ? 'var(--accent-green)' : d === 'medium' ? 'var(--accent-yellow)' : 'var(--accent-red)';
            return `<div style="background:var(--bg-secondary);border:1px solid var(--border);padding:0.75rem;border-radius:8px;text-align:center;min-width:80px;">
              <div style="color:${c};font-size:0.7rem;text-transform:uppercase;font-weight:700;margin-bottom:0.2rem;">${d}</div>
              <div style="font-weight:600;font-size:0.9rem;color:var(--text-primary);">${st.correct} / ${st.total}</div>
            </div>`;
          }).join('') : ''}
        </div>
        <div class="quiz-results-bar">
          <div class="quiz-results-fill" style="width:${pct}%;background:${gradeColor}"></div>
        </div>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-top:0.5rem;">${pct}% Accuracy</div>
        <div class="quiz-results-actions">
          <button class="btn btn-ghost" id="result-back">Back to Categories</button>
          <button class="btn btn-primary" id="result-retry">Retry Quiz</button>
        </div>
      </div>
    `;

    if (pct >= 80 && this.anim) this.anim.playConfetti();

    area.querySelector('#result-back').addEventListener('click', () => {
      area.style.display = 'none';
      intro.style.display = 'block';
    });
    area.querySelector('#result-retry').addEventListener('click', () => {
      const cat = MCQ_CATEGORIES.find(c => c.id === category.id);
      if (cat) this._startQuiz(cat);
    });
  }

  // ─── RESOURCES TAB ────────────────────────────────────────────
  _renderResources(el) {
    el.innerHTML = `
      <div class="resources-section">
        <h2 style="font-size:1.1rem;margin-bottom:1rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:6px;"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          Curated Learning Resources
        </h2>
        <div class="resources-grid">
          ${RESOURCES.map(r => `
            <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="resource-card">
              <div class="resource-tag">${r.tag}</div>
              <div class="resource-title">${r.title}</div>
              <div class="resource-url">${r.url.replace(/https?:\/\/(www\.)?/, '').split('/')[0]}</div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="resource-arrow"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }
}
