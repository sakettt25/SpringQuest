export class StatsPanel {
  constructor(gameStateManager, gamificationSystem) {
    this.gsm = gameStateManager;
    this.gam = gamificationSystem;
    this.panel = null;
  }

  createToggleButton() {
    const btn = document.createElement('button');
    btn.className = 'btn btn-ghost';
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
    btn.title = 'Player Profile';
    btn.addEventListener('click', () => this.toggle());
    return btn;
  }

  toggle() {
    if (!this.panel) this._create();
    this.panel.classList.toggle('open');
    if (this.panel.classList.contains('open')) this._update();
  }

  _create() {
    this.panel = document.createElement('div');
    this.panel.className = 'stats-panel';
    this.panel.id = 'stats-panel';
    document.body.appendChild(this.panel);
  }

  _update() {
    const s = this.gsm.getState();
    if (!s || !this.panel) return;
    const xpProg = this.gam.getXPProgress();
    this.panel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem">
        <h2 style="font-size:1.1rem; display:flex; align-items:center; gap:0.5rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          Player Profile
        </h2>
        <button class="close-btn" id="close-stats">&times;</button>
      </div>
      <div class="stats-section">
        <div class="stats-section-title">Identity</div>
        <div class="stat-row"><span class="stat-label">Name</span><span class="stat-value">${s.playerName}</span></div>
        <div class="stat-row"><span class="stat-label">Rank</span><span class="rank-badge rank-${s.currentRank.toLowerCase()}">${s.currentRank}</span></div>
        <div class="stat-row"><span class="stat-label">Level</span><span class="stat-value">${s.currentLevel}</span></div>
      </div>
      <div class="stats-section">
        <div class="stats-section-title">Experience</div>
        <div class="stat-row"><span class="stat-label">Total XP</span><span class="stat-value" style="color:var(--accent-yellow)">${s.totalXP}</span></div>
        <div style="margin:0.3rem 0"><div class="xp-bar-mini" style="width:100%"><div class="xp-bar-mini-fill" style="width:${xpProg.percent}%"></div></div></div>
        <div class="stat-row"><span class="stat-label">To Next Level</span><span class="stat-value">${Math.max(0, xpProg.needed - xpProg.current)} XP</span></div>
        <div class="stat-row"><span class="stat-label">Coins</span><span class="stat-value" style="color:var(--accent-yellow)">${s.coins}</span></div>
      </div>
      <div class="stats-section">
        <div class="stats-section-title">Progress</div>
        <div class="stat-row"><span class="stat-label">Missions Completed</span><span class="stat-value">${s.totalMissionsCompleted}</span></div>
        <div class="stat-row"><span class="stat-label">Perfect Scores</span><span class="stat-value">${s.perfectScores}</span></div>
        <div class="stat-row"><span class="stat-label">Avg Score</span><span class="stat-value">${Math.round(s.averageScore)}%</span></div>
        <div class="stat-row"><span class="stat-label">Total Attempts</span><span class="stat-value">${s.totalAttempts}</span></div>
      </div>
      <div class="stats-section">
        <div class="stats-section-title">Streaks</div>
        <div class="stat-row"><span class="stat-label">Daily Streak</span><span class="stat-value">${s.dailyStreak}</span></div>
        <div class="stat-row"><span class="stat-label">Longest</span><span class="stat-value">${s.longestStreak}</span></div>
      </div>
      <div class="stats-section">
        <div class="stats-section-title">Achievements</div>
        <div class="stat-row"><span class="stat-label">Unlocked</span><span class="stat-value">${s.achievements.length}</span></div>
      </div>
      <div style="margin-top: 1.5rem; text-align: center;">
        <button class="btn btn-ghost" id="btn-reset-progress" style="color: var(--accent-red); font-size: 0.75rem; border: 1px solid var(--accent-red);">⚠️ Reset All Progress</button>
      </div>
    `;
    this.panel.querySelector('#close-stats').addEventListener('click', () => this.toggle());
    
    this.panel.querySelector('#btn-reset-progress').addEventListener('click', () => {
      if (confirm('Are you sure you want to reset ALL your progress? This cannot be undone.')) {
        localStorage.removeItem('springquest_v1');
        window.location.reload();
      }
    });
  }
}
