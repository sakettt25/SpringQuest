export class MonacoEditorIntegration {
  constructor(containerId) {
    this.containerId = containerId;
    this.editor = null;
    this.fallbackTextarea = null;
    this.isMonaco = false;
    this._onChange = null;
  }

  async initialize() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    try {
      await this._loadMonaco();
      this.editor = monaco.editor.create(container, {
        value: '', language: 'java', theme: 'vs-dark',
        fontSize: 14, fontFamily: "'JetBrains Mono', monospace",
        minimap: { enabled: false }, lineNumbers: 'on',
        scrollBeyondLastLine: false, wordWrap: 'on',
        automaticLayout: true, tabSize: 4,
        suggestOnTriggerCharacters: true,
        padding: { top: 10 }
      });
      this._registerCompletions();
      this.isMonaco = true;
      if (this._onChange) {
        this.editor.onDidChangeModelContent(() => this._onChange(this.getContent()));
      }
    } catch (e) {
      console.warn('Monaco failed, using fallback textarea', e);
      this._createFallback(container);
    }
  }

  _loadMonaco() {
    return new Promise((resolve, reject) => {
      if (typeof monaco !== 'undefined') return resolve();
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js';
      script.onload = () => {
        require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
        require(['vs/editor/editor.main'], () => resolve());
      };
      script.onerror = () => reject(new Error('CDN load failed'));
      document.head.appendChild(script);
      setTimeout(() => reject(new Error('Timeout')), 8000);
    });
  }

  _createFallback(container) {
    this.fallbackTextarea = document.createElement('textarea');
    this.fallbackTextarea.style.cssText = 'width:100%;height:100%;resize:none;background:#0d1117;color:#e2e8f0;border:none;padding:1rem;font-family:"JetBrains Mono",monospace;font-size:14px;line-height:1.6;outline:none;tab-size:4;';
    this.fallbackTextarea.spellcheck = false;
    container.appendChild(this.fallbackTextarea);
    this.fallbackTextarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') { e.preventDefault(); const s = this.fallbackTextarea.selectionStart; this.fallbackTextarea.value = this.fallbackTextarea.value.substring(0, s) + '    ' + this.fallbackTextarea.value.substring(this.fallbackTextarea.selectionEnd); this.fallbackTextarea.selectionStart = this.fallbackTextarea.selectionEnd = s + 4; }
    });
    if (this._onChange) {
      this.fallbackTextarea.addEventListener('input', () => this._onChange(this.getContent()));
    }
  }

  _registerCompletions() {
    if (!this.isMonaco) return;
    const annotations = ['RestController','Controller','Service','Repository','Component','Autowired','GetMapping','PostMapping','PutMapping','DeleteMapping','RequestMapping','RequestBody','PathVariable','RequestParam','Entity','Table','Id','GeneratedValue','Valid','Configuration','Bean','Value','Qualifier'];
    monaco.languages.registerCompletionItemProvider('java', {
      triggerCharacters: ['@'],
      provideCompletionItems: (model, position) => {
        const suggestions = annotations.map(a => ({
          label: `@${a}`, kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: a, detail: `Spring annotation`
        }));
        return { suggestions };
      }
    });
  }

  setContent(code) {
    if (this.isMonaco && this.editor) this.editor.setValue(code);
    else if (this.fallbackTextarea) this.fallbackTextarea.value = code;
  }

  getContent() {
    if (this.isMonaco && this.editor) return this.editor.getValue();
    if (this.fallbackTextarea) return this.fallbackTextarea.value;
    return '';
  }

  highlightError(line, message) {
    if (!this.isMonaco || !this.editor) return;
    const model = this.editor.getModel();
    monaco.editor.setModelMarkers(model, 'validation', [
      ...monaco.editor.getModelMarkers({ resource: model.uri }),
      { startLineNumber: line, startColumn: 1, endLineNumber: line, endColumn: 1000, message, severity: monaco.MarkerSeverity.Error }
    ]);
  }

  clearErrors() {
    if (this.isMonaco && this.editor) {
      monaco.editor.setModelMarkers(this.editor.getModel(), 'validation', []);
    }
  }

  onContentChange(callback) { this._onChange = callback; }
  dispose() { if (this.editor) this.editor.dispose(); }
}
