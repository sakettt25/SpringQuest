export class WorldMapSystem {
  constructor(gameStateManager, missionManager, worlds) {
    this.gsm = gameStateManager;
    this.mm = missionManager;
    this.worlds = worlds;
    this.onWorldSelect = null;
    this.onMissionSelect = null;
  }

  render(container) {
    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'world-map-container';
    wrapper.innerHTML = `
      <div class="world-map-head">
        <div>
          <h1 class="world-map-title">Curriculum</h1>
          <p class="world-map-subtitle">Welcome back, <strong style="color:var(--text-primary)">${this.gsm.getState()?.playerName || 'Developer'}</strong>. Select a module to continue.</p>
        </div>
        <div class="world-map-meta">
          <span class="world-map-badge">${this.worlds.length} Modules</span>
        </div>
      </div>
      <div class="worlds-grid" id="worlds-grid"></div>
    `;
    container.appendChild(wrapper);
    const grid = wrapper.querySelector('#worlds-grid');
    for (const world of this.worlds) {
      grid.appendChild(this._createWorldCard(world));
    }
  }

  _createWorldCard(world) {
    const unlocked = this.gsm.isWorldUnlocked(world.id);
    const progress = this.mm.getWorldProgress(world.id);
    const isComplete = progress === 100;
    const card = document.createElement('div');
    card.className = `world-card${unlocked ? '' : ' locked'}${isComplete ? ' completed' : ''}`;
    card.style.setProperty('--world-color', world.color);
    card.innerHTML = `
      <div class="world-card-header">
        <div class="world-icon">${world.icon}</div>
        <div>
          <div class="world-name">${world.name}</div>
          <div class="world-order">Module ${world.order} of ${this.worlds.length}</div>
        </div>
      </div>
      <div class="world-desc">${world.description}</div>
      <div class="world-progress-bar">
        <div class="world-progress-fill" style="width:${progress}%;"></div>
      </div>
      <div class="world-progress-text">${progress}% Complete</div>
      ${!unlocked ? '<div class="world-lock-icon">🔒</div>' : ''}
      ${isComplete ? '<div class="world-badge">Completed</div>' : ''}
    `;
    if (unlocked) {
      card.addEventListener('click', () => this._showMissionList(world));
    }
    return card;
  }

  _showMissionList(world) {
    const missions = this.mm.getMissionsByWorld(world.id).sort((a, b) => a.order - b.order);
    const overlay = document.createElement('div');
    overlay.className = 'mission-list-overlay';
    overlay.innerHTML = `
      <div class="mission-list-panel">
        <div class="mission-list-header">
          <div>
            <div class="mission-list-title">${world.name}</div>
            <div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.15rem;">${world.description}</div>
          </div>
          <button class="close-btn" id="close-mission-list" aria-label="Close">&times;</button>
        </div>
        <div class="mission-items-scroll" id="mission-items"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    const itemsContainer = overlay.querySelector('#mission-items');
    let delay = 0;
    for (const m of missions) {
      const unlocked = this.gsm.isMissionUnlocked(m.id);
      const completed = this.gsm.isMissionCompleted(m.id);
      const item = document.createElement('div');
      item.className = `mission-item${completed ? ' completed' : ''}${!unlocked ? ' locked' : ''}`;
      item.style.animationDelay = `${delay}s`;
      delay += 0.05; // 50ms stagger
      item.innerHTML = `
        <div class="mission-number">${completed ? '✔' : m.order}</div>
        <div class="mission-info">
          <div class="mission-title-text">${m.title}</div>
          <div class="mission-meta">
            <span class="difficulty-${m.difficulty}">${m.difficulty.charAt(0).toUpperCase() + m.difficulty.slice(1)}</span>
            <span>~${m.estimatedTime}m</span>
          </div>
        </div>
        <div class="mission-xp">+${m.xpReward} XP</div>
      `;
      if (unlocked || completed) {
        item.addEventListener('click', () => { overlay.remove(); if (this.onMissionSelect) this.onMissionSelect(m.id); });
      }
      itemsContainer.appendChild(item);
    }
    overlay.querySelector('#close-mission-list').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  }
}
