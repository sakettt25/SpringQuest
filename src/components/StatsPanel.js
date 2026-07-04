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

    const rankColors = {
      bronze:  { color: '#cd7f32', bg: 'rgba(205,127,50,0.1)'  },
      silver:  { color: '#9ca3af', bg: 'rgba(156,163,175,0.1)' },
      gold:    { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)'  },
      diamond: { color: '#38bdf8', bg: 'rgba(56,189,248,0.1)'  },
      master:  { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)'  },
      legend:  { color: '#ec4899', bg: 'rgba(236,72,153,0.1)'  },
    };
    const rank = s.currentRank?.toLowerCase() || 'bronze';
    const rc = rankColors[rank] || rankColors.bronze;

    const initials = (s.playerName || 'Dev').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const avgPct = Math.round(s.averageScore || 0);

    this.panel.innerHTML = `
      <div class="sp-header">
        <span class="sp-title">Player Profile</span>
        <button class="sp-close" id="close-stats" aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- Identity card -->
      <div class="sp-identity">
        <div class="sp-avatar" style="background:${rc.bg};border-color:${rc.color}30;color:${rc.color}">${initials}</div>
        <div class="sp-identity-info">
          <div class="sp-name">${s.playerName}</div>
          <div class="sp-rank-badge" style="background:${rc.bg};border-color:${rc.color}50;color:${rc.color}">
            ${s.currentRank}
          </div>
        </div>
        <div class="sp-level-block">
          <div class="sp-level-num">${s.currentLevel}</div>
          <div class="sp-level-label">LV</div>
        </div>
      </div>

      <!-- XP Progress -->
      <div class="sp-section">
        <div class="sp-section-label">Experience</div>
        <div class="sp-xp-row">
          <span class="sp-xp-val">${s.totalXP.toLocaleString()} XP</span>
          <span class="sp-xp-next">${Math.max(0, xpProg.needed - xpProg.current)} to next level</span>
        </div>
        <div class="sp-progress-track">
          <div class="sp-progress-fill" style="width:${xpProg.percent}%"></div>
        </div>
        <div class="sp-progress-pct">${xpProg.percent}%</div>
      </div>

      <!-- Stats grid -->
      <div class="sp-section">
        <div class="sp-section-label">Progress</div>
        <div class="sp-stats-grid">
          <div class="sp-stat-cell">
            <div class="sp-stat-num">${s.totalMissionsCompleted}</div>
            <div class="sp-stat-desc">Completed</div>
          </div>
          <div class="sp-stat-cell">
            <div class="sp-stat-num">${s.perfectScores}</div>
            <div class="sp-stat-desc">Perfect</div>
          </div>
          <div class="sp-stat-cell">
            <div class="sp-stat-num">${avgPct}%</div>
            <div class="sp-stat-desc">Avg Score</div>
          </div>
          <div class="sp-stat-cell">
            <div class="sp-stat-num">${s.coins}</div>
            <div class="sp-stat-desc">Coins</div>
          </div>
        </div>
      </div>

      <!-- Streaks -->
      <div class="sp-section">
        <div class="sp-section-label">Streaks</div>
        <div class="sp-streak-row">
          <div class="sp-streak-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
            <span class="sp-streak-num" style="color:#f97316">${s.dailyStreak}</span>
            <span class="sp-streak-desc">Current</span>
          </div>
          <div class="sp-streak-divider"></div>
          <div class="sp-streak-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-yellow)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span class="sp-streak-num" style="color:var(--accent-yellow)">${s.longestStreak}</span>
            <span class="sp-streak-desc">Best</span>
          </div>
        </div>
      </div>

      <!-- Achievements -->
      <div class="sp-section">
        <div class="sp-section-label">Achievements</div>
        <div class="sp-achieve-row">
          <span class="sp-achieve-count">${s.achievements.length}</span>
          <span class="sp-achieve-label">unlocked</span>
        </div>
      </div>

      <div class="sp-footer">
        <button class="sp-reset-btn" id="btn-reset-progress">Reset All Progress</button>
      </div>
    `;

    this.panel.querySelector('#close-stats').addEventListener('click', () => this.toggle());
    this.panel.querySelector('#btn-reset-progress').addEventListener('click', () => {
      if (confirm('Reset ALL progress? This cannot be undone.')) {
        localStorage.removeItem('springquest_v1');
        window.location.reload();
      }
    });
  }
}
