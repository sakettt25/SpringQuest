import { MonacoEditorIntegration } from './MonacoEditorIntegration.js';
import { ValidationFeedback } from './ValidationFeedback.js';

export class MissionView {
  constructor(missionManager, gameStateManager, gamificationSystem, animationEngine, hintSystem, aiMentor, achievementDefs) {
    this.mm = missionManager;
    this.gsm = gameStateManager;
    this.gam = gamificationSystem;
    this.anim = animationEngine;
    this.hints = hintSystem;
    this.mentor = aiMentor;
    this.achievementDefs = achievementDefs;
    this.editor = null;
    this.feedback = new ValidationFeedback();
    this.currentMission = null;
    this.onBack = null;
    this.hintIndex = 0;
  }

  async render(container, missionId) {
    this.currentMission = this.mm.loadMission(missionId);
    if (!this.currentMission) { container.innerHTML = '<p>Mission not found</p>'; return; }
    const m = this.currentMission;
    const completed = this.gsm.isMissionCompleted(m.id);
    const descIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;vertical-align:middle;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
    const solIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;vertical-align:middle;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    const codeIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;vertical-align:middle;"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
    const playIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;vertical-align:middle;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    const refreshIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`;

    container.innerHTML = `
      <div class="mission-view">
        <div class="mission-sidebar">
          <div class="lc-tabs">
            <div class="lc-tab active" data-tab="desc" style="cursor:pointer;">${descIcon}Description</div>
            <div class="lc-tab" data-tab="solution" style="cursor:pointer; color: var(--text-muted);">${solIcon}Solution</div>
          </div>
          <div class="lc-content" style="padding: 1.5rem; overflow-y: auto; flex: 1; min-height: 0;">
            <div id="tab-content-desc">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
                <h2 style="font-size:1.4rem; font-weight: 600; letter-spacing:-0.02em;">${m.order}. ${m.title}</h2>
                <button class="btn btn-ghost" id="back-to-map" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;">Back to Map</button>
              </div>
              <div style="display:flex;gap:1rem;margin-bottom:2rem; align-items: center;">
                <span class="difficulty-${m.difficulty}" style="font-size:0.85rem; font-weight:500;">${m.difficulty.charAt(0).toUpperCase() + m.difficulty.slice(1)}</span>
                ${completed ? '<span style="font-size:0.85rem;color:var(--accent-green);font-weight:500;">Solved</span>' : ''}
                <span style="font-size:0.85rem;color:var(--text-muted)">Time: ~${m.estimatedTime}m</span>
                <span style="font-size:0.85rem;color:var(--text-muted)">+${m.xpReward} XP</span>
              </div>
              
              <div class="mission-story">${m.story}</div>
              
              <div class="mission-objective">
                <h3>Objective</h3>
                <p style="font-size:0.95rem;color:var(--text-primary); line-height: 1.6;">${m.objective}</p>
              </div>
              
              <div id="feedback-container" style="margin-top:2rem"></div>
            </div>
            
            <div id="tab-content-solution" style="display:none;">
              <h2 style="font-size:1.4rem; font-weight: 600; margin-bottom: 1.5rem;">Solution & Explanation</h2>
              <div id="solution-container">
                 <div style="padding:2rem;text-align:center;color:var(--text-muted);border:1px dashed var(--border);border-radius:var(--radius);">
                   Solution is locked. Try the mission or use hints to unlock!
                 </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mission-editor-area">
          <div class="editor-toolbar">
            <div class="lc-tabs" style="border: none;">
              <div class="lc-tab active" style="padding: 0 1rem;">${codeIcon}Code</div>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <span class="editor-lang" style="background: var(--bg-primary); padding: 0.3rem 0.6rem; border-radius: var(--radius-sm); border: 1px solid var(--border); font-size: 0.75rem;">Java</span>
              <button class="btn btn-ghost" id="btn-reset" title="Reset Code" style="padding: 0.3rem 0.5rem; color: var(--text-muted);">${refreshIcon}</button>
            </div>
          </div>
          <div class="editor-container" id="monaco-editor"></div>
          
          <div class="editor-footer" style="display: flex; justify-content: space-between; padding: 0.8rem 1rem; background: var(--bg-secondary); border-top: 1px solid var(--border);">
            <div style="display: flex; gap: 0.5rem;">
               <button class="btn btn-ghost" id="btn-hint">Hint</button>
               <button class="btn btn-ghost" id="btn-solution" ${this._canViewSolution(m.id) ? '' : 'disabled'}>Show Solution</button>
            </div>
            <div style="display: flex; gap: 0.5rem;">
               ${completed && this.mm.getNextMission(m.id) ? `<button class="btn btn-ghost" id="btn-next-top" style="color: var(--accent-green);">Next Challenge</button>` : ''}
               <button class="btn btn-primary" id="btn-submit" style="font-weight: 500;">${playIcon}Run & Submit</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Init editor
    this.editor = new MonacoEditorIntegration('monaco-editor');
    await this.editor.initialize();
    this.editor.setContent(this._getSavedCode(m.id) || m.starterCode);

    // Auto-save
    this.editor.onContentChange((code) => {
      this.gsm.getState() && (this.gsm.getState()['_savedCode_' + m.id] = code);
      this.gsm.saveGame();
    });

    // Tabs logic
    const tabs = container.querySelectorAll('.lc-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => { t.classList.remove('active'); t.style.color = 'var(--text-muted)'; });
        tab.classList.add('active');
        tab.style.color = 'var(--text-primary)';
        
        const target = tab.getAttribute('data-tab');
        container.querySelector('#tab-content-desc').style.display = target === 'desc' ? 'block' : 'none';
        container.querySelector('#tab-content-solution').style.display = target === 'solution' ? 'block' : 'none';
        
        if (target === 'solution' && this._canViewSolution(m.id)) {
           this._renderSolutionContent();
        }
      });
    });

    // Buttons
    const backBtn = container.querySelector('#back-to-map');
    if (backBtn) backBtn.addEventListener('click', () => { this.editor.dispose(); if (this.onBack) this.onBack(); });
    container.querySelector('#btn-submit').addEventListener('click', () => this._handleSubmit());
    container.querySelector('#btn-hint').addEventListener('click', () => this._handleHint());
    container.querySelector('#btn-solution').addEventListener('click', () => {
       const solTab = document.querySelector('.lc-tab[data-tab="solution"]');
       if (solTab) solTab.click();
    });
    container.querySelector('#btn-reset').addEventListener('click', () => this.editor.setContent(m.starterCode));
    
    const nextBtnTop = container.querySelector('#btn-next-top');
    if (nextBtnTop) {
      nextBtnTop.addEventListener('click', () => {
        this.editor.dispose();
        if (this._keyHandler) document.removeEventListener('keydown', this._keyHandler);
        const nextMission = this.mm.getNextMission(m.id);
        if (nextMission) this.render(document.getElementById('main-content'), nextMission.id);
      });
    }

    // Keyboard shortcut
    document.addEventListener('keydown', this._keyHandler = (e) => {
      if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); this._handleSubmit(); }
    });
  }

  _getSavedCode(missionId) {
    return this.gsm.getState()?.['_savedCode_' + missionId] || null;
  }

  _canViewSolution(missionId) {
    const hints = this.gsm.getHintsUsed(missionId);
    const attempts = this.gsm.getAttempts(missionId);
    return this.hints.canViewSolution(hints, attempts);
  }

  _handleSubmit() {
    const code = this.editor.getContent();
    const btn = document.querySelector('#btn-submit');
    btn.disabled = true; btn.textContent = '⏳ Validating...';
    this.editor.clearErrors();

    setTimeout(() => {
      // IMPORTANT: Check completion BEFORE submitCode, because submitCode->updateProgress marks it completed
      const wasAlreadyCompleted = this.gsm.isMissionCompleted(this.currentMission.id);

      const result = this.mm.submitCode(code);
      const feedbackEl = document.querySelector('#feedback-container');
      let mentorMsg = null;
      if (!result.success && result.errors.length > 0) {
        mentorMsg = this.mentor.explainMistake(code, result.errors);
      }
      this.feedback.render(feedbackEl, result, mentorMsg);

      // Highlight errors in editor
      for (const err of result.errors) {
        if (err.line) this.editor.highlightError(err.line, err.message);
      }

      if (result.success) {
        // Safety net: Always ensure the next mission is unlocked if the code is valid,
        // even if they had already completed this mission previously.
        const fallbackNext = this.mm.getNextMission(this.currentMission.id);
        if (fallbackNext) {
          this.gsm.unlockMission(fallbackNext.id);
        }

        if (!wasAlreadyCompleted) {
          const reward = this.mm.completeMission(this.currentMission.id);
          if (reward) {
            this.anim.playConfetti();
            this.anim.showXPGain(reward.xpGained);
            this.anim.showCoinGain(reward.coinsGained);

            // Check achievements
            const { AchievementNotification } = this._getNotifModule();
            const newAchs = this.gam.checkAchievements({ type: 'MISSION_COMPLETE', missionId: this.currentMission.id, attempts: result.attemptsCount }, this.achievementDefs);
            const notif = new AchievementNotification();
            for (const a of newAchs) setTimeout(() => notif.show(a), 500);

            // Check if world complete
            if (this.mm.isWorldComplete(this.currentMission.worldId)) {
              const { getNextWorld } = this._getWorldsModule();
              const next = getNextWorld(this.currentMission.worldId);
              if (next) { this.gsm.unlockWorld(next.id); const firstM = this.mm.getMissionsByWorld(next.id).sort((a, b) => a.order - b.order)[0]; if (firstM) this.gsm.unlockMission(firstM.id); }
              this.gam.checkAchievements({ type: 'WORLD_COMPLETE' }, this.achievementDefs);
            }

            this.gam.checkRankPromotion();
            if (reward.leveledUp) setTimeout(() => this.anim.showLevelUp(reward.newLevel), 1000);

            // Show Next Mission button
            if (reward.nextMission) {
              this._showNextMissionButton(feedbackEl, reward.nextMission);
            } else if (this.mm.isWorldComplete(this.currentMission.worldId)) {
              this._showWorldCompleteButton(feedbackEl);
            }
          }
        } else {
          // If already completed, just show the next button for convenience
          if (fallbackNext) {
             this._showNextMissionButton(feedbackEl, fallbackNext);
          } else if (this.mm.isWorldComplete(this.currentMission.worldId)) {
             this._showWorldCompleteButton(feedbackEl);
          }
        }
        
        // Update solution button
        const solBtn = document.querySelector('#btn-solution');
        if (solBtn) { solBtn.disabled = false; }
      } else {
        this.anim.shakeElement(feedbackEl);
      }

      btn.disabled = false; btn.textContent = '▶ Run & Submit';
      // Update solution button state
      const solBtn = document.querySelector('#btn-solution');
      if (solBtn) solBtn.disabled = !this._canViewSolution(this.currentMission.id);
    }, 300);
  }

  _showNextMissionButton(container, nextMission) {
    const div = document.createElement('div');
    div.style.cssText = 'margin-top:1.5rem; border-top: 1px solid var(--border); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;';
    div.innerHTML = `
      <div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.2rem;text-transform:uppercase;">Up Next</div>
        <div style="font-weight:500;color:var(--text-primary);font-size:0.9rem;">${nextMission.title}</div>
      </div>
      <button class="btn btn-primary" id="btn-next-mission" style="font-size:0.85rem;">
        Next Challenge
      </button>
    `;
    container.appendChild(div);
    div.querySelector('#btn-next-mission').addEventListener('click', () => {
      this.editor.dispose();
      if (this._keyHandler) document.removeEventListener('keydown', this._keyHandler);
      const mainContent = document.getElementById('main-content');
      if (mainContent) this.render(mainContent, nextMission.id);
    });
  }

  _showWorldCompleteButton(container) {
    const div = document.createElement('div');
    div.style.cssText = 'margin-top:1rem;';
    div.innerHTML = `
      <div style="padding:1rem;background:var(--bg-input);border-left:3px solid var(--accent-blue);border-radius:var(--radius-sm);margin-bottom:1rem;">
        <h3 style="color:var(--text-primary);margin-bottom:0.5rem;font-size:1rem;font-weight:600;">Module Complete</h3>
        <p style="font-size:0.85rem;color:var(--text-secondary);">You have successfully completed this module. The next module is now unlocked.</p>
      </div>
      <button class="btn btn-primary" id="btn-back-map" style="font-size:0.9rem;padding:0.5rem 1.5rem;">
        Back to Modules
      </button>
    `;
    container.appendChild(div);
    div.querySelector('#btn-back-map').addEventListener('click', () => {
      this.editor.dispose();
      if (this.onBack) this.onBack();
    });
  }

  _handleHint() {
    const m = this.currentMission;
    this.gsm.recordHintUsed(m.id);
    const hintsUsed = this.gsm.getHintsUsed(m.id);
    const hint = this.hints.getHint(m, hintsUsed - 1);
    if (!hint) return;
    import('./HintModal.js').then(({ HintModal }) => {
      const modal = new HintModal();
      modal.show(hint, () => this._handleHint(), () => this._handleSolution(), this._canViewSolution(m.id));
    });
    // Update solution button
    const solBtn = document.querySelector('#btn-solution');
    if (solBtn) solBtn.disabled = !this._canViewSolution(m.id);
  }

  _renderSolutionContent() {
    const m = this.currentMission;
    const solContainer = document.querySelector('#solution-container');
    if (solContainer && m.solution) {
      solContainer.innerHTML = `
        <div style="margin-bottom:1.5rem">
          <h3 style="font-size:1rem;color:var(--text-primary);margin-bottom:0.5rem">Reference Code</h3>
          <pre style="background:var(--bg-primary);padding:1rem;border-radius:var(--radius);overflow-x:auto;font-family:var(--font-mono);font-size:0.85rem;border:1px solid var(--border);color:#e2e8f0;"><code>${m.solution.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
          <button class="btn btn-ghost" id="btn-copy-solution" style="margin-top:0.5rem;font-size:0.75rem">📋 Copy to Editor</button>
        </div>
        <div style="padding:1.5rem;background:var(--bg-card);border:1px solid var(--accent-purple);border-radius:var(--radius);margin-top:0.5rem">
          <h4 style="color:var(--accent-purple);margin-bottom:0.8rem;font-size:1rem;display:flex;align-items:center;gap:0.5rem">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
             Explanation
          </h4>
          <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.7">${m.explanation}</p>
        </div>
      `;
      
      const copyBtn = solContainer.querySelector('#btn-copy-solution');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          this.editor.setContent(m.solution);
          copyBtn.textContent = '✔ Copied!';
          setTimeout(() => { copyBtn.textContent = '📋 Copy to Editor'; }, 2000);
        });
      }
    }
  }

  _getNotifModule() { return { AchievementNotification: class { show(a) { const n=document.createElement('div'); n.className='achievement-notification'; n.innerHTML=`<div class="achievement-icon">${a.icon}</div><div class="achievement-info"><h4>🏆 Achievement Unlocked!</h4><p><strong>${a.name}</strong> — ${a.description}</p></div>`; document.body.appendChild(n); setTimeout(()=>{if(n.parentNode)n.remove()},5000); } } }; }
  _getWorldsModule() { return { getNextWorld: (id) => { const worlds = ['java-academy','oop-city','collections-kingdom','streams-lambda-lab','spring-core-campus','spring-boot-office','rest-api-dept','database-division','reactive-lab','webflux-hq','enterprise-tower']; const i=worlds.indexOf(id); return i>=0&&i<worlds.length-1?{id:worlds[i+1]}:null; } }; }

  dispose() {
    if (this.editor) this.editor.dispose();
    if (this._keyHandler) document.removeEventListener('keydown', this._keyHandler);
  }
}
