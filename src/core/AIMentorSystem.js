export class AIMentorSystem {
  provideSocraticHint(code, error) {
    const type = error?.type || '';
    const msg = error?.message || '';
    if (type === 'SYNTAX') return this._syntaxHint(msg);
    if (type === 'ANNOTATION') return this._annotationHint(msg);
    if (type === 'STRUCTURE') return this._structureHint(msg);
    if (type === 'TEST') return this._testHint(msg);
    return '🤔 Take a step back — re-read the mission objective. What is the code supposed to do?';
  }

  _syntaxHint(msg) {
    if (msg.includes('brace')) return '💡 Every opening { needs a matching }. Count your braces carefully.';
    if (msg.includes('parenthesis')) return '💡 Check your parentheses — every ( needs a ).';
    if (msg.includes('semicolon')) return '💡 In Java, most statements end with a semicolon ;';
    return '💡 There\'s a syntax issue. Read the error message — which line does it point to?';
  }

  _annotationHint(msg) {
    const match = msg.match(/@(\w+)/);
    const ann = match ? match[1] : '';
    const hints = {
      RestController: '🏗️ Think about it — if this class handles HTTP requests and returns data directly, which Spring annotation marks it?',
      Service: '🏗️ This class contains business logic. In Spring\'s layered architecture, what annotation marks a service?',
      Repository: '🏗️ This class talks to the database. Which Spring stereotype annotation is for data access?',
      GetMapping: '🌐 You need to handle GET requests. Which annotation maps a method to GET?',
      PostMapping: '🌐 For handling POST requests with a body, which mapping annotation do you need?',
      Autowired: '🔗 Spring needs to inject this dependency. How does Spring know to inject it?',
      Component: '📦 For Spring to manage this as a bean, what annotation should you add?',
      Entity: '💾 JPA needs to know this class maps to a database table. What annotation declares that?',
      RequestBody: '📨 The data comes in the request body as JSON. How do you tell Spring to deserialize it?',
      PathVariable: '🔗 The value is in the URL path. How do you extract it?',
    };
    return hints[ann] || `🤔 You\'re missing @${ann}. Think about what role this class/method plays in the architecture.`;
  }

  _structureHint(msg) {
    return '🏗️ The code structure doesn\'t match what\'s expected. Re-read the objective — what classes, methods, or patterns are required?';
  }

  _testHint(msg) {
    return '🧪 A test is failing. Look at what the test expects vs. what your code produces. Is the logic correct?';
  }

  explainMistake(code, errors) {
    if (!errors || errors.length === 0) return 'Your code looks good! Try submitting.';
    const first = errors[0];
    const hint = this.provideSocraticHint(code, first);
    return `${hint}\n\n📋 Error: ${first.message}`;
  }

  reviewCode(code) {
    const suggestions = [];
    if (!code.includes('public class')) suggestions.push('Consider defining a public class.');
    if (code.includes('System.out.println') && code.includes('@RestController'))
      suggestions.push('In a REST controller, return data instead of printing to console.');
    if (code.includes('throws Exception') && !code.includes('try'))
      suggestions.push('Consider using specific exception types instead of generic Exception.');
    return suggestions;
  }
}
