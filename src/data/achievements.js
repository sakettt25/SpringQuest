const A_ICONS = {
  star: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  zap: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  award: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
  flame: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
  check: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  coin: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`,
  target: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
  compass: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`
};

export const ACHIEVEMENTS = [
  {
    id: 'first-steps', name: 'First Steps', icon: A_ICONS.compass,
    description: 'Complete your first mission', tier: 'bronze',
    xpBonus: 50, coinBonus: 10,
    checkCondition: (s) => s.totalMissionsCompleted >= 1
  },
  {
    id: 'getting-started', name: 'Getting Started', icon: A_ICONS.check,
    description: 'Complete 5 missions', tier: 'bronze',
    xpBonus: 100, coinBonus: 25,
    checkCondition: (s) => s.totalMissionsCompleted >= 5
  },
  {
    id: 'ten-down', name: 'Ten Down', icon: A_ICONS.check,
    description: 'Complete 10 missions', tier: 'silver',
    xpBonus: 200, coinBonus: 50,
    checkCondition: (s) => s.totalMissionsCompleted >= 10
  },
  {
    id: 'perfect-score', name: 'Perfect Score', icon: A_ICONS.target,
    description: 'Get 100% on any mission', tier: 'silver',
    xpBonus: 75, coinBonus: 20,
    checkCondition: (s) => s.perfectScores >= 1
  },
  {
    id: 'speed-runner', name: 'Speed Runner', icon: A_ICONS.zap,
    description: 'Complete a mission on first attempt', tier: 'gold',
    xpBonus: 100, coinBonus: 30,
    checkCondition: (s, action) => action?.type === 'MISSION_COMPLETE' && action?.attempts === 1
  },
  {
    id: 'world-champion', name: 'World Champion', icon: A_ICONS.award,
    description: 'Complete an entire world', tier: 'gold',
    xpBonus: 300, coinBonus: 100,
    checkCondition: (s, action) => action?.type === 'WORLD_COMPLETE'
  },
  {
    id: 'streak-3', name: 'On Fire', icon: A_ICONS.flame,
    description: 'Maintain a 3-day streak', tier: 'bronze',
    xpBonus: 50, coinBonus: 15,
    checkCondition: (s) => s.dailyStreak >= 3
  },
  {
    id: 'streak-7', name: 'Streak Master', icon: A_ICONS.flame,
    description: 'Maintain a 7-day streak', tier: 'silver',
    xpBonus: 150, coinBonus: 50,
    checkCondition: (s) => s.dailyStreak >= 7
  },
  {
    id: 'level-5', name: 'Rising Star', icon: A_ICONS.star,
    description: 'Reach Level 5', tier: 'bronze',
    xpBonus: 100, coinBonus: 25,
    checkCondition: (s) => s.currentLevel >= 5
  },
  {
    id: 'level-10', name: 'Seasoned Dev', icon: A_ICONS.star,
    description: 'Reach Level 10', tier: 'silver',
    xpBonus: 200, coinBonus: 75,
    checkCondition: (s) => s.currentLevel >= 10
  },
  {
    id: 'coin-collector', name: 'Coin Collector', icon: A_ICONS.coin,
    description: 'Earn 500 coins', tier: 'bronze',
    xpBonus: 50, coinBonus: 50,
    checkCondition: (s) => s.coins >= 500
  },
  {
    id: 'perfectionist', name: 'Perfectionist', icon: A_ICONS.target,
    description: 'Get 5 perfect scores', tier: 'gold',
    xpBonus: 250, coinBonus: 100,
    checkCondition: (s) => s.perfectScores >= 5
  },
];
