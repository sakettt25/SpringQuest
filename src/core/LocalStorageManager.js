export class LocalStorageManager {
  constructor(storageKey = 'springquest_v1') {
    this.storageKey = storageKey;
    this.backupKey = `${storageKey}_backup`;
  }

  save(key, data) {
    try {
      localStorage.setItem(`${this.storageKey}_${key}`, JSON.stringify(data));
      return true;
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        this._compressData();
        try {
          localStorage.setItem(`${this.storageKey}_${key}`, JSON.stringify(data));
          return true;
        } catch { return false; }
      }
      return false;
    }
  }

  load(key) {
    try {
      const data = localStorage.getItem(`${this.storageKey}_${key}`);
      return data ? JSON.parse(data) : null;
    } catch { return null; }
  }

  delete(key) { localStorage.removeItem(`${this.storageKey}_${key}`); }
  clear() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(this.storageKey));
    keys.forEach(k => localStorage.removeItem(k));
  }

  saveGameState(state) {
    // backup before save
    const current = this.loadGameState();
    if (current) {
      try { localStorage.setItem(this.backupKey, JSON.stringify(current)); } catch {}
    }
    state.lastSavedAt = Date.now();
    return this.save('gamestate', state);
  }

  loadGameState() { return this.load('gamestate'); }

  exportData() {
    const state = this.loadGameState();
    return JSON.stringify(state, null, 2);
  }

  importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (!data || !data.playerId) throw new Error('Invalid data');
      this.saveGameState(data);
      return true;
    } catch { return false; }
  }

  getStorageSize() {
    let total = 0;
    for (let key in localStorage) {
      if (key.startsWith(this.storageKey)) {
        total += localStorage.getItem(key).length * 2;
      }
    }
    return total;
  }

  _compressData() {
    const state = this.loadGameState();
    if (!state) return;
    if (state.xpHistory && state.xpHistory.length > 100) {
      state.xpHistory = state.xpHistory.slice(-100);
    }
    if (state.missionAttempts) {
      for (const id in state.missionAttempts) {
        const a = state.missionAttempts[id];
        if (a.history && a.history.length > 5) a.history = a.history.slice(-5);
      }
    }
    this.save('gamestate', state);
  }
}
