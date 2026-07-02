export class CodeValidator {
  validateSyntax(code) {
    const errors = [];
    // Check balanced braces
    let braceCount = 0, parenCount = 0;
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      for (const ch of lines[i]) {
        if (ch === '{') braceCount++;
        if (ch === '}') braceCount--;
        if (ch === '(') parenCount++;
        if (ch === ')') parenCount--;
        if (braceCount < 0) errors.push({ line: i + 1, message: 'Unexpected closing brace' });
        if (parenCount < 0) errors.push({ line: i + 1, message: 'Unexpected closing parenthesis' });
      }
    }
    if (braceCount > 0) errors.push({ line: lines.length, message: `Missing ${braceCount} closing brace(s)` });
    if (parenCount > 0) errors.push({ line: lines.length, message: `Missing ${parenCount} closing parenthesis(es)` });
    // Check for common issues
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if (trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('*') && !trimmed.startsWith('/*') &&
          !trimmed.startsWith('@') && !trimmed.startsWith('import') && !trimmed.startsWith('package') &&
          !trimmed.endsWith('{') && !trimmed.endsWith('}') && !trimmed.endsWith(';') &&
          !trimmed.endsWith('*/') && !trimmed.endsWith(',') && trimmed.length > 0 &&
          !trimmed.startsWith('public class') && !trimmed.startsWith('class') &&
          !trimmed.startsWith('public interface') && !trimmed.startsWith('interface') &&
          !trimmed.startsWith('if') && !trimmed.startsWith('else') && !trimmed.startsWith('for') &&
          !trimmed.startsWith('while') && !trimmed.startsWith('try') && !trimmed.startsWith('catch') &&
          !trimmed.startsWith('switch') && !trimmed.startsWith('case') && !trimmed.startsWith('default')) {
        // Soft warning - not always an error in Java
      }
    }
    return { valid: errors.length === 0, errors };
  }

  checkAnnotations(code, required) {
    const found = [];
    const missing = [];
    for (const ann of required) {
      const regex = new RegExp(`@${ann}\\b`, 'g');
      if (regex.test(code)) found.push(ann);
      else missing.push(ann);
    }
    return { valid: missing.length === 0, found, missing };
  }

  checkPatterns(code, patterns) {
    const results = [];
    for (const p of patterns) {
      const regex = new RegExp(p.pattern, p.flags || 'g');
      const match = regex.test(code);
      results.push({ name: p.name, found: match, required: p.required });
    }
    const failed = results.filter(r => r.required && !r.found);
    return { valid: failed.length === 0, results, failed };
  }

  runTest(code, test) {
    try {
      const result = test.validate(code);
      return { passed: result.passed, testName: test.name, message: result.message || '', expected: test.expected, actual: result.actual };
    } catch (e) {
      return { passed: false, testName: test.name, message: e.message, expected: test.expected, actual: 'Error' };
    }
  }

  validate(code, mission) {
    const result = {
      success: false, score: 0, syntaxValid: false, structureValid: false,
      testsResults: [], errors: [], warnings: [], suggestions: [],
      executionTime: 0, performanceScore: 100
    };
    const startTime = performance.now();

    // Step 1: Syntax
    const syntax = this.validateSyntax(code);
    result.syntaxValid = syntax.valid;
    if (!syntax.valid) {
      result.errors.push(...syntax.errors.map(e => ({ type: 'SYNTAX', line: e.line, message: e.message })));
      return result;
    }

    // Step 2: Structure - annotations
    if (mission.requirements?.annotations) {
      const ann = this.checkAnnotations(code, mission.requirements.annotations);
      if (!ann.valid) {
        result.errors.push(...ann.missing.map(a => ({ type: 'ANNOTATION', message: `Missing required annotation: @${a}` })));
      }
    }

    // Step 2b: patterns
    if (mission.requirements?.patterns) {
      const pat = this.checkPatterns(code, mission.requirements.patterns);
      if (!pat.valid) {
        result.errors.push(...pat.failed.map(f => ({ type: 'STRUCTURE', message: `Missing required: ${f.name}` })));
      }
    }

    result.structureValid = result.errors.length === 0;
    if (!result.structureValid) return result;

    // Step 3: Tests
    const allTests = [...(mission.tests || []), ...(mission.hiddenTests || [])];
    let passed = 0;
    for (const test of allTests) {
      const tr = this.runTest(code, test);
      result.testsResults.push(tr);
      if (tr.passed) passed++;
      else if (test.visible !== false) {
        result.errors.push({ type: 'TEST', message: `❌ ${tr.testName}: ${tr.message}`, expected: tr.expected, actual: tr.actual });
      }
    }

    // Step 4: Score
    result.score = allTests.length > 0 ? Math.round((passed / allTests.length) * 100) : 100;
    result.success = result.score === 100;
    result.executionTime = performance.now() - startTime;
    return result;
  }
}
