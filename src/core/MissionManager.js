export class MissionManager {
  constructor(gameStateManager, codeValidator, gamificationSystem) {
    this.gsm = gameStateManager;
    this.validator = codeValidator;
    this.gamification = gamificationSystem;
    this.missions = new Map();
    this.currentMission = null;
  }

  registerMissions(missionArray) {
    for (const m of missionArray) this.missions.set(m.id, m);
  }

  loadMission(missionId) {
    const mission = this.missions.get(missionId);
    if (mission) this.currentMission = mission;
    return mission || null;
  }

  getMissionsByWorld(worldId) {
    return Array.from(this.missions.values()).filter(m => m.worldId === worldId);
  }

  submitCode(code) {
    if (!this.currentMission) return { success: false, errors: [{ message: 'No mission loaded' }] };
    const result = this.validator.validate(code, this.currentMission);
    const attempts = this.gsm.getAttempts(this.currentMission.id);
    const hintsUsed = this.gsm.getHintsUsed(this.currentMission.id);
    result.attemptsCount = attempts + 1;
    result.hintsUsed = hintsUsed;
    result.canRequestHint = !result.success;
    result.canViewSolution = hintsUsed >= 3 || result.attemptsCount >= 5;
    this.gsm.updateProgress(this.currentMission.id, result);
    return result;
  }

  completeMission(missionId) {
    const mission = this.missions.get(missionId);
    if (!mission) return null;
    const attempts = this.gsm.getAttempts(missionId);
    const bonus = this.gamification.calculateAttemptBonus(attempts);
    const xp = Math.round(mission.xpReward * bonus);
    const levelResult = this.gamification.awardXP(xp, `Completed: ${mission.title}`);
    this.gamification.awardCoins(mission.coinReward, `Completed: ${mission.title}`);

    // Unlock next mission
    const worldMissions = this.getMissionsByWorld(mission.worldId).sort((a, b) => a.order - b.order);
    const idx = worldMissions.findIndex(m => m.id === missionId);
    const nextMission = idx >= 0 && idx < worldMissions.length - 1 ? worldMissions[idx + 1] : null;
    if (nextMission) this.gsm.unlockMission(nextMission.id);

    return {
      xpGained: xp, coinsGained: mission.coinReward, bonus,
      leveledUp: levelResult.leveledUp, newLevel: levelResult.newLevel,
      nextMission
    };
  }

  getNextMission(missionId) {
    const mission = this.missions.get(missionId);
    if (!mission) return null;
    const worldMissions = this.getMissionsByWorld(mission.worldId).sort((a, b) => a.order - b.order);
    const idx = worldMissions.findIndex(m => m.id === missionId);
    return idx >= 0 && idx < worldMissions.length - 1 ? worldMissions[idx + 1] : null;
  }

  isWorldComplete(worldId) {
    const worldMissions = this.getMissionsByWorld(worldId);
    return worldMissions.length > 0 && worldMissions.every(m => this.gsm.isMissionCompleted(m.id));
  }

  getWorldProgress(worldId) {
    const worldMissions = this.getMissionsByWorld(worldId);
    if (worldMissions.length === 0) return 0;
    const completed = worldMissions.filter(m => this.gsm.isMissionCompleted(m.id)).length;
    return Math.round((completed / worldMissions.length) * 100);
  }
}
