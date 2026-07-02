export class GameStateManager {
  constructor(storageManager) {
    this.storage = storageManager;
    this.state = null;
  }

  initializeGame() {
    this.state = {
      playerId: this._generateId(),
      playerName: 'saket',
      createdAt: Date.now(),
      lastPlayedAt: Date.now(),
      currentWorldId: 'java-academy',
      currentMissionId: 'ja-001',
      unlockedWorlds: ['java-academy'],
      unlockedMissions: ['ja-001'],
      completedMissions: [],
      totalXP: 0,
      currentLevel: 1,
      coins: 0,
      currentRank: 'Bronze',
      achievements: [],
      dailyStreak: 0,
      longestStreak: 0,
      lastStreakDate: null,
      totalMissionsCompleted: 0,
      totalAttempts: 0,
      averageScore: 0,
      perfectScores: 0,
      totalPlayTime: 0,
      sessionStart: Date.now(),
      xpHistory: [],
      missionAttempts: {},
      missionScores: {},
      interviewsCompleted: 0,
      interviewSuccessRate: 0,
      unlockedSkills: [],
      lastSavedAt: Date.now()
    };
    this.storage.saveGameState(this.state);
    return this.state;
  }

  loadGame() {
    const saved = this.storage.loadGameState();
    if (saved && saved.playerId) {
      this.state = saved;
      this.state.lastPlayedAt = Date.now();
      this.state.sessionStart = Date.now();
      return this.state;
    }
    return null;
  }

  saveGame() {
    if (!this.state) return;
    this.state.lastPlayedAt = Date.now();
    if (this.state.sessionStart) {
      this.state.totalPlayTime += Date.now() - this.state.sessionStart;
      this.state.sessionStart = Date.now();
    }
    this.storage.saveGameState(this.state);
  }

  getState() { return this.state; }

  updateProgress(missionId, result) {
    if (!this.state) return;
    if (!this.state.missionAttempts[missionId]) {
      this.state.missionAttempts[missionId] = { count: 0, hintsUsed: 0, history: [] };
    }
    this.state.missionAttempts[missionId].count++;
    this.state.totalAttempts++;

    if (result.success && !this.state.completedMissions.includes(missionId)) {
      this.state.completedMissions.push(missionId);
      this.state.totalMissionsCompleted++;
      this.state.missionScores[missionId] = result.score;
      if (result.score === 100) this.state.perfectScores++;
      // recalculate average
      const scores = Object.values(this.state.missionScores);
      this.state.averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    }
    this.saveGame();
  }

  getAttempts(missionId) {
    return this.state?.missionAttempts[missionId]?.count || 0;
  }

  getHintsUsed(missionId) {
    return this.state?.missionAttempts[missionId]?.hintsUsed || 0;
  }

  recordHintUsed(missionId) {
    if (!this.state) return;
    if (!this.state.missionAttempts[missionId]) {
      this.state.missionAttempts[missionId] = { count: 0, hintsUsed: 0, history: [] };
    }
    this.state.missionAttempts[missionId].hintsUsed++;
    this.saveGame();
  }

  unlockMission(missionId) {
    if (!this.state) return;
    if (!this.state.unlockedMissions.includes(missionId)) {
      this.state.unlockedMissions.push(missionId);
      this.saveGame();
    }
  }

  unlockWorld(worldId) {
    if (!this.state) return;
    if (!this.state.unlockedWorlds.includes(worldId)) {
      this.state.unlockedWorlds.push(worldId);
      this.saveGame();
    }
  }

  unlockAll(worldIds, missionIds) {
    if (!this.state) return;
    this.state.unlockedWorlds = [...new Set([...this.state.unlockedWorlds, ...worldIds])];
    this.state.unlockedMissions = [...new Set([...this.state.unlockedMissions, ...missionIds])];
    this.saveGame();
  }

  lockAll(unlockedWorlds, unlockedMissions) {
    if (!this.state) return;
    this.state.unlockedWorlds = unlockedWorlds;
    this.state.unlockedMissions = unlockedMissions;
    this.saveGame();
  }

  isMissionCompleted(missionId) {
    return this.state?.completedMissions.includes(missionId) || false;
  }

  isMissionUnlocked(missionId) {
    return this.state?.unlockedMissions.includes(missionId) || false;
  }

  isWorldUnlocked(worldId) {
    return this.state?.unlockedWorlds.includes(worldId) || false;
  }

  getPlayerStats() {
    if (!this.state) return null;
    const s = this.state;
    return {
      playerId: s.playerId, playerName: s.playerName, rank: s.currentRank,
      level: s.currentLevel, totalXP: s.totalXP, coins: s.coins,
      totalMissionsCompleted: s.totalMissionsCompleted, averageScore: s.averageScore,
      perfectScores: s.perfectScores, dailyStreak: s.dailyStreak,
      longestStreak: s.longestStreak, achievements: s.achievements.length,
      totalAttempts: s.totalAttempts
    };
  }

  _generateId() {
    return 'sq_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
  }
}
