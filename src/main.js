import { LocalStorageManager } from './core/LocalStorageManager.js';
import { GameStateManager } from './core/GameStateManager.js';
import { GamificationSystem } from './core/GamificationSystem.js';
import { CodeValidator } from './core/CodeValidator.js';
import { MissionManager } from './core/MissionManager.js';
import { HintSystem } from './core/HintSystem.js';
import { AIMentorSystem } from './core/AIMentorSystem.js';
import { AnimationEngine } from './core/AnimationEngine.js';
import { ThreeBackground } from './core/ThreeBackground.js';
import { WorldMapSystem } from './components/WorldMapSystem.js';
import { MissionView } from './components/MissionView.js';
import { StatsPanel } from './components/StatsPanel.js';
import { WORLDS } from './data/worlds.js';
import { JAVA_ACADEMY_MISSIONS } from './data/missions/java-academy.js';
import { REST_API_MISSIONS } from './data/missions/rest-api-dept.js';
import { REACTIVE_LAB_MISSIONS } from './data/missions/reactive-lab.js';
import { WEBFLUX_HQ_MISSIONS } from './data/missions/webflux-hq.js';
import { ENTERPRISE_TOWER_MISSIONS } from './data/missions/enterprise-tower.js';
import { ACHIEVEMENTS } from './data/achievements.js';

class SpringQuestApp {
  constructor() {
    this.storage = new LocalStorageManager('springquest_v1');
    this.gsm = new GameStateManager(this.storage);
    this.gam = new GamificationSystem(this.gsm);
    this.validator = new CodeValidator();
    this.mm = new MissionManager(this.gsm, this.validator, this.gam);
    this.hintSystem = new HintSystem();
    this.mentor = new AIMentorSystem();
    this.anim = new AnimationEngine();
    this.statsPanel = new StatsPanel(this.gsm, this.gam);
    this.worldMap = new WorldMapSystem(this.gsm, this.mm, WORLDS);
    this.missionView = null;
    this.appEl = document.getElementById('app');
  }

  async init() {
    this.threeBg = new ThreeBackground();
    // Register all world missions
    this.mm.registerMissions(JAVA_ACADEMY_MISSIONS);
    this.mm.registerMissions(REST_API_MISSIONS);
    this.mm.registerMissions(REACTIVE_LAB_MISSIONS);
    this.mm.registerMissions(WEBFLUX_HQ_MISSIONS);
    this.mm.registerMissions(ENTERPRISE_TOWER_MISSIONS);

    // Load or init game
    let state = this.gsm.loadGame();
    if (!state) state = this.gsm.initializeGame();

    // Record daily activity
    const streak = this.gam.recordDailyActivity();
    
    // Setup cheat code
    this._setupCheatCode();

    // Hide loading screen
    setTimeout(() => {
      const loading = document.getElementById('loading-screen');
      if (loading) loading.style.display = 'none';
      this._renderHeader();
      this._showWorldMap();
      if (streak.isNew && streak.count > 1) {
        setTimeout(() => this.anim.showXPGain(streak.count * 10, window.innerWidth / 2, 100), 500);
      }
    }, 1500);
  }

  _renderHeader() {
    const s = this.gsm.getState();
    const xpProg = this.gam.getXPProgress();
    const header = document.createElement('div');
    header.className = 'game-header';
    header.id = 'game-header';
    header.innerHTML = `
      <div class="header-logo designer-text" id="header-logo" style="font-size:1.4rem;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;vertical-align:middle;color:var(--accent-blue);"><polygon points="12 2 2 22 12 18 22 22 12 2"></polygon></svg>
        SpringQuest
      </div>
      <div class="header-stats">
        <div class="stat-item editable" id="edit-player-name" title="Click to edit name">
          <svg class="stat-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span class="stat-value" style="font-size:0.9rem; font-weight: 600;">${s.playerName}</span>
        </div>
        
        <div class="stat-divider"></div>
        
        <div class="stat-group" title="Level ${s.currentLevel}">
          <div class="level-badge">
            <span class="level-label">LV</span>
            <span class="level-value">${s.currentLevel}</span>
          </div>
        </div>

        <div class="stat-group xp-group" title="Experience: ${s.totalXP} XP">
          <div class="xp-info">
            <span class="xp-label">XP</span>
            <span class="xp-value designer-text" style="font-size:1rem;">${s.totalXP}</span>
          </div>
          <div class="xp-bar-container">
            <div class="xp-bar-fill" style="width:${xpProg.percent}%"></div>
          </div>
        </div>
        
        <div class="stat-divider"></div>

        <div class="stat-item coin-item" title="Coins: ${s.coins}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 4px rgba(251,191,36,0.6));"><circle cx="12" cy="12" r="8"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          <span class="stat-value" style="color: #fbbf24; font-size: 0.9rem; text-shadow: 0 0 10px rgba(251,191,36,0.3);">${s.coins}</span>
        </div>

        ${s.dailyStreak > 0 ? `
        <div class="streak-badge" title="Daily Streak: ${s.dailyStreak} Days">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;vertical-align:middle;filter: drop-shadow(0 0 4px rgba(249,115,22,0.6));"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
          <span style="color:#f97316; font-weight:700;">${s.dailyStreak}</span>
        </div>` : ''}
      </div>
      <div id="header-actions" style="display:flex;gap:0.5rem"></div>
    `;
    this.appEl.insertBefore(header, this.appEl.firstChild);
    header.querySelector('#header-logo').addEventListener('click', () => this._showWorldMap());
    
    // Edit Player Name
    const nameBtn = header.querySelector('#edit-player-name');
    if (nameBtn) {
      nameBtn.addEventListener('click', () => {
        const newName = prompt('Enter your player name:', s.playerName);
        if (newName && newName.trim().length > 0) {
          s.playerName = newName.trim();
          this.gsm.saveGame();
          this._updateHeader();
          this.anim.showSystemMessage("Profile Updated", "Your player name has been saved.", "success");
        }
      });
    }

    header.querySelector('#header-actions').appendChild(this.statsPanel.createToggleButton());
  }

  _updateHeader() {
    const old = document.getElementById('game-header');
    if (old) old.remove();
    this._renderHeader();
  }

  _showWorldMap() {
    this._updateHeader();
    const content = document.createElement('div');
    content.id = 'main-content';
    const existing = document.getElementById('main-content');
    if (existing) existing.remove();
    this.appEl.appendChild(content);
    this.worldMap.onMissionSelect = (missionId) => this._showMission(missionId);
    this.worldMap.render(content);
  }

  async _showMission(missionId) {
    this._updateHeader();
    const content = document.createElement('div');
    content.id = 'main-content';
    const existing = document.getElementById('main-content');
    if (existing) existing.remove();
    this.appEl.appendChild(content);
    this.missionView = new MissionView(this.mm, this.gsm, this.gam, this.anim, this.hintSystem, this.mentor, ACHIEVEMENTS);
    this.missionView.onBack = () => {
      this.missionView.dispose();
      this._showWorldMap();
    };
    await this.missionView.render(content, missionId);
  }

  _setupCheatCode() {
    let keyBuffer = '';
    
    document.addEventListener('keydown', (e) => {
      // Don't listen to keypresses inside the editor (monaco) or textareas/inputs
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 10) keyBuffer = keyBuffer.slice(-10);
      
      if (keyBuffer.endsWith('unlock')) {
        console.log("Cheat code activated! Unlocking all levels...");
        keyBuffer = ''; // Reset buffer
        
        const allWorlds = WORLDS.map(w => w.id);
        const allMissions = Array.from(this.mm.missions.values()).map(m => m.id);
        this.gsm.unlockAll(allWorlds, allMissions);
        
        this.anim.showSystemMessage("System Bypassed", "All Modules and Missions Unlocked.", "success");
        this._refreshView();
      } 
      else if (keyBuffer.endsWith('lock')) {
        console.log("Cheat code activated! Locking uncompleted levels...");
        keyBuffer = ''; // Reset buffer
        
        // Rebuild legitimate unlocks based on completed missions
        const unlockedW = new Set(['java-academy']);
        const unlockedM = new Set(['ja-001']);
        
        const state = this.gsm.getState();
        if (state && state.completedMissions) {
          for (const mId of state.completedMissions) {
            unlockedM.add(mId);
            const mission = this.mm.missions.get(mId);
            if (mission) {
              unlockedW.add(mission.worldId);
              
              // Next mission logic
              const nextM = this.mm.getNextMission(mId);
              if (nextM) unlockedM.add(nextM.id);
              
              if (this.mm.isWorldComplete(mission.worldId)) {
                // Safely get next world by using WORLDS array
                const currentWorldIndex = WORLDS.findIndex(w => w.id === mission.worldId);
                const nextW = currentWorldIndex >= 0 && currentWorldIndex < WORLDS.length - 1 ? WORLDS[currentWorldIndex + 1] : null;
                if (nextW) unlockedW.add(nextW.id);
              }
            }
          }
        }
        
        this.gsm.lockAll(Array.from(unlockedW), Array.from(unlockedM));
        this.anim.showSystemMessage("System Locked", "Progression Reset to Valid State.", "error");
        this._refreshView();
      }
    });
  }

  _refreshView() {
    if (this.missionView) {
      this.missionView.dispose();
      this.missionView = null;
    }
    this._showWorldMap();
  }
}

// Boot
const app = new SpringQuestApp();
app.init().catch(console.error);
