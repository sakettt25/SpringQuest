export class GamificationSystem {
  constructor(gameStateManager) {
    this.gsm = gameStateManager;
  }

  calculateLevel(totalXP) {
    if (totalXP < 100) return 1;
    return Math.max(1, Math.floor(Math.pow(totalXP / 100, 1 / 1.5)));
  }

  getXPForNextLevel(currentLevel) {
    return Math.floor(100 * Math.pow(currentLevel + 1, 1.5));
  }

  getXPProgress() {
    const s = this.gsm.getState();
    if (!s) return { current: 0, needed: 100, percent: 0 };
    const currentLevelXP = s.currentLevel <= 1 ? 0 : Math.floor(100 * Math.pow(s.currentLevel, 1.5));
    const nextLevelXP = this.getXPForNextLevel(s.currentLevel);
    const progress = s.totalXP - currentLevelXP;
    const needed = nextLevelXP - currentLevelXP;
    return { current: progress, needed, percent: Math.min(100, (progress / needed) * 100) };
  }

  awardXP(amount, reason) {
    const s = this.gsm.getState();
    if (!s) return { leveledUp: false };
    const oldLevel = s.currentLevel;
    s.totalXP += Math.round(amount);
    s.currentLevel = this.calculateLevel(s.totalXP);
    s.xpHistory.push({ timestamp: Date.now(), amount: Math.round(amount), reason });
    if (s.xpHistory.length > 200) s.xpHistory = s.xpHistory.slice(-100);
    this.gsm.saveGame();
    return {
      leveledUp: s.currentLevel > oldLevel,
      oldLevel, newLevel: s.currentLevel,
      xpGained: Math.round(amount), totalXP: s.totalXP
    };
  }

  awardCoins(amount, reason) {
    const s = this.gsm.getState();
    if (!s) return;
    s.coins += amount;
    this.gsm.saveGame();
  }

  calculateAttemptBonus(attempts) {
    if (attempts === 1) return 1.5;
    if (attempts === 2) return 1.25;
    if (attempts === 3) return 1.0;
    if (attempts <= 5) return 0.75;
    return 0.5;
  }

  calculateRank(stats) {
    const m = stats?.totalMissionsCompleted || 0;
    const avg = stats?.averageScore || 0;
    if (m >= 151 && avg >= 80) return 'Legend';
    if (m >= 101 && avg >= 80) return 'Master';
    if (m >= 61 && avg >= 80) return 'Diamond';
    if (m >= 31 && avg >= 70) return 'Gold';
    if (m >= 11 && avg >= 60) return 'Silver';
    return 'Bronze';
  }

  checkRankPromotion() {
    const s = this.gsm.getState();
    if (!s) return null;
    const newRank = this.calculateRank(s);
    if (newRank !== s.currentRank) {
      const old = s.currentRank;
      s.currentRank = newRank;
      this.gsm.saveGame();
      return { oldRank: old, newRank };
    }
    return null;
  }

  recordDailyActivity() {
    const s = this.gsm.getState();
    if (!s) return { continued: false, count: 0 };
    
    const now = new Date();
    const todayStr = now.toDateString();
    
    if (s.lastStreakDate === todayStr) {
      return { continued: true, count: s.dailyStreak, isNew: false };
    }
    
    if (s.lastStreakDate) {
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      
      if (s.lastStreakDate === yesterday.toDateString()) {
        s.dailyStreak++;
      } else {
        s.dailyStreak = 1; // Broken streak
      }
    } else {
      s.dailyStreak = 1; // First ever activity
    }
    
    s.lastStreakDate = todayStr;
    if (s.dailyStreak > s.longestStreak) s.longestStreak = s.dailyStreak;
    this.gsm.saveGame();
    return { continued: true, count: s.dailyStreak, isNew: true };
  }

  checkAchievements(action, achievementDefs) {
    const s = this.gsm.getState();
    if (!s || !achievementDefs) return [];
    const newlyUnlocked = [];
    for (const ach of achievementDefs) {
      if (s.achievements.includes(ach.id)) continue;
      if (ach.checkCondition(s, action)) {
        s.achievements.push(ach.id);
        if (ach.xpBonus) this.awardXP(ach.xpBonus, `Achievement: ${ach.name}`);
        if (ach.coinBonus) this.awardCoins(ach.coinBonus, `Achievement: ${ach.name}`);
        newlyUnlocked.push(ach);
      }
    }
    if (newlyUnlocked.length > 0) this.gsm.saveGame();
    return newlyUnlocked;
  }
}
