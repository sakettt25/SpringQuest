export class ValidationFeedback {
  render(container, result, mentorFeedback) {
    container.innerHTML = '';
    if (!result) return;
    const panel = document.createElement('div');
    panel.className = 'validation-panel';
    if (result.success) {
      panel.innerHTML = `<div class="validation-success"><h3 style="color:var(--accent-green);font-size:1.2rem;font-weight:600;margin-bottom:0.5rem;">Accepted</h3><p style="color:var(--text-secondary);font-size:0.9rem;">Runtime: ${Math.round(result.executionTime)} ms</p></div>`;
    } else {
      let errHtml = result.errors.map(e => `<div class="error-item">${e.line ? `<span class="error-line">Line ${e.line}:</span> ` : ''}${e.message}</div>`).join('');
      let passIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      let failIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      let testHtml = result.testsResults?.map(t => `<div class="test-item ${t.passed ? 'test-pass' : 'test-fail'}" style="display:flex;align-items:center;">${t.passed ? passIcon : failIcon} ${t.testName}</div>`).join('') || '';
      
      let bulbIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;vertical-align:middle;"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A6 6 0 1 0 7.5 11.5c.76.76 1.23 1.52 1.41 2.5"></path></svg>`;
      let mentorHtml = mentorFeedback ? `<div style="margin-top:1rem;padding:0.8rem;background:var(--bg-input);border-radius:var(--radius-sm);border-left:3px solid var(--accent-blue);font-size:0.85rem;color:var(--text-secondary)"><strong style="color:var(--text-primary);display:inline-flex;align-items:center;">${bulbIcon}Hint:</strong> ${mentorFeedback}</div>` : '';
      
      panel.innerHTML = `<div class="validation-error"><h3 style="color:var(--accent-red);font-size:1.2rem;font-weight:600;margin-bottom:0.5rem;">Wrong Answer</h3>${errHtml}<div class="test-results">${testHtml}</div>${mentorHtml}</div>`;
    }
    container.appendChild(panel);
  }
}
