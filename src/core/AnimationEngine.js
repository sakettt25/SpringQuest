export class AnimationEngine {
  showXPGain(amount, x, y) {
    const el = document.createElement('div');
    el.className = 'xp-float';
    el.textContent = `+${amount} XP`;
    el.style.left = `${x || window.innerWidth / 2}px`;
    el.style.top = `${y || window.innerHeight / 2}px`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1600);
  }

  showCoinGain(amount, x, y) {
    const el = document.createElement('div');
    el.className = 'xp-float';
    el.style.color = '#f59e0b';
    el.textContent = `+${amount} Coins`;
    el.style.left = `${(x || window.innerWidth / 2) + 60}px`;
    el.style.top = `${y || window.innerHeight / 2}px`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1600);
  }

  playConfetti() {
    const container = document.getElementById('particle-container');
    if (!container) return;
    const colors = ['#fbbf24', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444', '#ec4899', '#f97316'];
    for (let i = 0; i < 40; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position:fixed; width:8px; height:8px; border-radius:50%;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        left:${Math.random() * 100}vw; top:-10px; z-index:9999;
        pointer-events:none;
        animation: confettiFall ${1.5 + Math.random() * 2}s ease-out forwards;
        animation-delay: ${Math.random() * 0.5}s;
      `;
      container.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }
  }

  showLevelUp(newLevel, onClose) {
    const modal = document.createElement('div');
    modal.className = 'levelup-modal';
    modal.innerHTML = `
      <div class="levelup-content">
        <h2>LEVEL UP</h2>
        <div class="level-number">${newLevel}</div>
        <p>You've reached Level ${newLevel}! Keep pushing forward.</p>
        <button class="btn btn-primary" id="levelup-close">Continue</button>
      </div>
    `;
    document.body.appendChild(modal);
    this.playConfetti();
    modal.querySelector('#levelup-close').addEventListener('click', () => {
      modal.remove();
      if (onClose) onClose();
    });
    setTimeout(() => { if (modal.parentNode) modal.remove(); }, 5000);
  }

  shakeElement(el) {
    if (!el) return;
    el.classList.add('animate-shake');
    setTimeout(() => el.classList.remove('animate-shake'), 600);
  }

  pulseElement(el) {
    if (!el) return;
    el.classList.add('animate-pulse');
    setTimeout(() => el.classList.remove('animate-pulse'), 2000);
  }

  fadeIn(el) {
    if (!el) return;
    el.style.opacity = '0';
    el.style.display = '';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.3s ease';
      el.style.opacity = '1';
    });
  }

  fadeOut(el, callback) {
    if (!el) return;
    el.style.transition = 'opacity 0.3s ease';
    el.style.opacity = '0';
    setTimeout(() => { el.style.display = 'none'; if (callback) callback(); }, 300);
  }

  showSystemMessage(title, message, type = 'success') {
    const el = document.createElement('div');
    const color = type === 'success' ? 'var(--accent-green)' : 'var(--accent-red)';
    const icon = type === 'success' ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>` : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
    el.style.cssText = `
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%) translateY(-20px);
      background: var(--bg-card); border: 1px solid var(--border);
      border-left: 3px solid ${color}; border-radius: var(--radius);
      padding: 1rem 1.5rem; display: flex; align-items: center; gap: 1rem;
      box-shadow: var(--shadow-lg); z-index: 9999; opacity: 0;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    el.innerHTML = `
      <div style="color:${color}">${icon}</div>
      <div>
        <div style="font-weight:600;font-size:0.9rem;color:var(--text-primary);margin-bottom:0.2rem;">${title}</div>
        <div style="font-size:0.8rem;color:var(--text-secondary);">${message}</div>
      </div>
    `;
    document.body.appendChild(el);
    
    // Animate in
    requestAnimationFrame(() => {
      el.style.transform = 'translateX(-50%) translateY(0)';
      el.style.opacity = '1';
    });
    
    // Animate out
    setTimeout(() => {
      el.style.transform = 'translateX(-50%) translateY(-20px)';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 400);
    }, 3000);
  }
}
