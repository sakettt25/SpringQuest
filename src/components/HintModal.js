export class HintModal {
  show(hint, onNext, onSolution, canViewSolution) {
    const existing = document.querySelector('.hint-modal');
    if (existing) existing.remove();
    const modal = document.createElement('div');
    modal.className = 'hint-modal';
    modal.innerHTML = `
      <div class="hint-content">
        <div class="hint-header">
          <h3>💡 Hint ${hint.number} of ${hint.total}</h3>
          <button class="close-btn hint-close">&times;</button>
        </div>
        <div class="hint-text">${hint.text}</div>
        <div class="hint-actions">
          ${hint.hasMore ? '<button class="btn btn-warning" id="hint-next">Next Hint</button>' : ''}
          ${canViewSolution ? '<button class="btn btn-danger" id="hint-solution">View Solution</button>' : ''}
          <button class="btn btn-ghost hint-close">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelectorAll('.hint-close').forEach(b => b.addEventListener('click', () => modal.remove()));
    modal.querySelector('#hint-next')?.addEventListener('click', () => { modal.remove(); if (onNext) onNext(); });
    modal.querySelector('#hint-solution')?.addEventListener('click', () => { modal.remove(); if (onSolution) onSolution(); });
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
  }
}

export class AchievementNotification {
  show(achievement) {
    const notif = document.createElement('div');
    notif.className = 'achievement-notification';
    notif.innerHTML = `
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-info">
        <h4>🏆 Achievement Unlocked!</h4>
        <p><strong>${achievement.name}</strong> — ${achievement.description}</p>
      </div>
    `;
    document.body.appendChild(notif);
    setTimeout(() => { if (notif.parentNode) notif.remove(); }, 5000);
  }
}
