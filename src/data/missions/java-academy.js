export const JAVA_ACADEMY_MISSIONS = [
  {
    id: 'ja-001', worldId: 'java-academy', order: 1, title: 'Hello SpringCorp!',
    difficulty: 'easy', xpReward: 100, coinReward: 20, estimatedTime: 5,
    story: 'Welcome to SpringCorp, saket! Your first task as an intern: write a simple Java program that prints a welcome message.',
    objective: 'Create a class with a main method that prints "Hello, SpringCorp!" to the console.',
    starterCode: `public class HelloWorld {\n    public static void main(String[] args) {\n        // TODO: Print "Hello, SpringCorp!"\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'public class', pattern: 'public\\s+class\\s+\\w+', required: true },
        { name: 'main method', pattern: 'public\\s+static\\s+void\\s+main', required: true },
        { name: 'print statement', pattern: 'System\\.out\\.println', required: true }
      ]
    },
    tests: [
      { name: 'Prints correct message', visible: true, expected: 'Hello, SpringCorp!',
        validate: (code) => {
          const match = code.match(/System\.out\.println\s*\(\s*"([^"]*)"\s*\)/);
          return { passed: match && match[1] === 'Hello, SpringCorp!', actual: match ? match[1] : 'nothing', message: match ? (match[1] === 'Hello, SpringCorp!' ? '' : `Expected "Hello, SpringCorp!" but got "${match[1]}"`) : 'No println statement found' };
        }
      }
    ],
    hiddenTests: [
      { name: 'Has class declaration', visible: false,
        validate: (code) => ({ passed: /public\s+class\s+HelloWorld/.test(code), message: 'Class should be named HelloWorld' })
      }
    ],
    hints: [
      'Use System.out.println() to print text to the console.',
      'The text inside println must be exactly: "Hello, SpringCorp!" — with the comma and exclamation mark.',
      'Complete line: System.out.println("Hello, SpringCorp!");'
    ],
    solution: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, SpringCorp!");\n    }\n}`,
    explanation: 'Every Java program needs a class and a main method. System.out.println() prints text followed by a newline. This is the entry point of any Java application.'
  },
  {
    id: 'ja-002', worldId: 'java-academy', order: 2, title: 'Variables & Data Types',
    difficulty: 'easy', xpReward: 120, coinReward: 25, estimatedTime: 8,
    story: 'Your manager asks you to store employee data. You need to understand Java\'s primitive data types.',
    objective: 'Declare variables of different types: a String name, an int age, a double salary, and a boolean isActive. Print them all.',
    starterCode: `public class EmployeeData {\n    public static void main(String[] args) {\n        // TODO: Declare variables\n        // String name = ??\n        // int age = ??\n        // double salary = ??\n        // boolean isActive = ??\n        // Print each variable\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'String variable', pattern: 'String\\s+\\w+\\s*=', required: true },
        { name: 'int variable', pattern: 'int\\s+\\w+\\s*=', required: true },
        { name: 'double variable', pattern: 'double\\s+\\w+\\s*=', required: true },
        { name: 'boolean variable', pattern: 'boolean\\s+\\w+\\s*=', required: true }
      ]
    },
    tests: [
      { name: 'Has all 4 data types', visible: true,
        validate: (code) => {
          const hasStr = /String\s+\w+\s*=\s*"[^"]*"/.test(code);
          const hasInt = /int\s+\w+\s*=\s*\d+/.test(code);
          const hasDbl = /double\s+\w+\s*=\s*[\d.]+/.test(code);
          const hasBool = /boolean\s+\w+\s*=\s*(true|false)/.test(code);
          const all = hasStr && hasInt && hasDbl && hasBool;
          return { passed: all, actual: `String:${hasStr} int:${hasInt} double:${hasDbl} boolean:${hasBool}`, message: all ? '' : 'Declare all 4 types with values' };
        }
      },
      { name: 'Prints variables', visible: true,
        validate: (code) => {
          const prints = (code.match(/System\.out\.println/g) || []).length;
          return { passed: prints >= 4, actual: `${prints} print statements`, message: prints >= 4 ? '' : 'Print each variable using System.out.println()' };
        }
      }
    ],
    hiddenTests: [],
    hints: ['Java has 8 primitive types. For this mission you need: String, int, double, boolean.', 'Example: String name = "Saket"; — assign any value you want.', 'Use System.out.println(variableName) to print each one.'],
    solution: `public class EmployeeData {\n    public static void main(String[] args) {\n        String name = "Saket";\n        int age = 25;\n        double salary = 75000.50;\n        boolean isActive = true;\n        System.out.println(name);\n        System.out.println(age);\n        System.out.println(salary);\n        System.out.println(isActive);\n    }\n}`,
    explanation: 'Java is statically typed — every variable must have a declared type. String holds text, int holds whole numbers, double holds decimals, boolean holds true/false.'
  },
  {
    id: 'ja-003', worldId: 'java-academy', order: 3, title: 'If-Else Logic',
    difficulty: 'easy', xpReward: 130, coinReward: 25, estimatedTime: 8,
    story: 'The HR system needs to classify employees by experience level based on their years at the company.',
    objective: 'Write an if-else chain: if years >= 10 print "Senior", else if years >= 5 print "Mid-Level", else if years >= 2 print "Junior", else print "Intern".',
    starterCode: `public class ExperienceLevel {\n    public static void main(String[] args) {\n        int years = 7; // test with different values\n        // TODO: if-else chain to classify experience\n    }\n}`,
    requirements: { patterns: [{ name: 'if statement', pattern: 'if\\s*\\(', required: true }, { name: 'else clause', pattern: 'else', required: true }] },
    tests: [
      { name: 'Has if-else chain', visible: true,
        validate: (code) => {
          const hasIf = /if\s*\(.*years/.test(code);
          const hasElse = /else\s+if/.test(code);
          const hasSenior = /Senior/.test(code);
          const hasMid = /Mid-Level|Mid Level|MidLevel/.test(code);
          const hasJunior = /Junior/.test(code);
          const hasIntern = /Intern/.test(code);
          const all = hasIf && hasElse && hasSenior && hasMid && hasJunior && hasIntern;
          return { passed: all, message: all ? '' : 'Include all 4 levels: Senior, Mid-Level, Junior, Intern' };
        }
      }
    ],
    hiddenTests: [{ name: 'Correct order', visible: false, validate: (code) => { const si = code.indexOf('Senior'); const mi = code.indexOf('Mid'); const ji = code.indexOf('Junior'); return { passed: si < mi && mi < ji, message: 'Check >= 10 first, then >= 5, then >= 2' }; }}],
    hints: ['Start with the highest value: if (years >= 10)', 'Use else if for the next conditions in descending order.', 'The final else handles the remaining case (Intern).'],
    solution: `public class ExperienceLevel {\n    public static void main(String[] args) {\n        int years = 7;\n        if (years >= 10) {\n            System.out.println("Senior");\n        } else if (years >= 5) {\n            System.out.println("Mid-Level");\n        } else if (years >= 2) {\n            System.out.println("Junior");\n        } else {\n            System.out.println("Intern");\n        }\n    }\n}`,
    explanation: 'if-else chains evaluate conditions top-down. The first true condition executes. Always check the largest values first when using >= comparisons.'
  },
  {
    id: 'ja-004', worldId: 'java-academy', order: 4, title: 'Loops & Iteration',
    difficulty: 'easy', xpReward: 140, coinReward: 30, estimatedTime: 10,
    story: 'The DevOps team needs a script to print server status for servers 1 through 5.',
    objective: 'Use a for loop to print "Server 1: Online" through "Server 5: Online".',
    starterCode: `public class ServerStatus {\n    public static void main(String[] args) {\n        // TODO: Use a for loop from 1 to 5\n        // Print: "Server X: Online" for each\n    }\n}`,
    requirements: { patterns: [{ name: 'for loop', pattern: 'for\\s*\\(', required: true }] },
    tests: [
      { name: 'Uses for loop with 1-5', visible: true,
        validate: (code) => {
          const hasFor = /for\s*\(\s*int\s+\w+\s*=\s*1/.test(code);
          const hasServer = /Server/.test(code) && /Online/.test(code);
          return { passed: hasFor && hasServer, message: hasFor ? (hasServer ? '' : 'Print "Server X: Online"') : 'Start loop at 1: for (int i = 1; ...)' };
        }
      }
    ],
    hiddenTests: [{ name: 'Loop runs 5 times', visible: false, validate: (code) => ({ passed: /<=\s*5|<\s*6/.test(code), message: 'Loop should run exactly 5 times' })}],
    hints: ['for (int i = 1; i <= 5; i++) — starts at 1, ends at 5.', 'Use string concatenation: "Server " + i + ": Online"', 'System.out.println("Server " + i + ": Online");'],
    solution: `public class ServerStatus {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            System.out.println("Server " + i + ": Online");\n        }\n    }\n}`,
    explanation: 'for loops have 3 parts: initialization (int i=1), condition (i<=5), and update (i++). The loop body executes while the condition is true.'
  },
  {
    id: 'ja-005', worldId: 'java-academy', order: 5, title: 'Arrays',
    difficulty: 'easy', xpReward: 150, coinReward: 30, estimatedTime: 10,
    story: 'You need to store the names of all team members in an array and display them.',
    objective: 'Create a String array with at least 4 names. Loop through and print each name with its index.',
    starterCode: `public class TeamMembers {\n    public static void main(String[] args) {\n        // TODO: Create a String array of team members\n        // TODO: Loop and print "Member 0: Name"\n    }\n}`,
    requirements: { patterns: [{ name: 'String array', pattern: 'String\\[\\]\\s+\\w+|String\\s+\\w+\\[\\]', required: true }, { name: 'loop', pattern: 'for\\s*\\(', required: true }] },
    tests: [
      { name: 'Has String array with 4+ elements', visible: true,
        validate: (code) => {
          const match = code.match(/\{([^}]*)\}/g);
          const arrayInit = match?.find(m => m.includes('"'));
          const count = arrayInit ? (arrayInit.match(/"/g) || []).length / 2 : 0;
          return { passed: count >= 4, actual: `${count} elements`, message: count >= 4 ? '' : 'Array needs at least 4 names' };
        }
      },
      { name: 'Prints with index', visible: true,
        validate: (code) => {
          const has = /Member|#|\[\s*\w+\s*\]/.test(code) && /System\.out\.println/.test(code);
          return { passed: has, message: has ? '' : 'Print each member with their index' };
        }
      }
    ],
    hiddenTests: [],
    hints: ['String[] names = {"Alice", "Bob", "Charlie", "Dave"};', 'Use names.length in your for loop condition.', 'Access elements with names[i] inside the loop.'],
    solution: `public class TeamMembers {\n    public static void main(String[] args) {\n        String[] members = {"Alice", "Bob", "Charlie", "Dave"};\n        for (int i = 0; i < members.length; i++) {\n            System.out.println("Member " + i + ": " + members[i]);\n        }\n    }\n}`,
    explanation: 'Arrays store fixed-size collections. Access elements by index (0-based). Use .length to get the size. Arrays are the foundation for Collections.'
  },
  {
    id: 'ja-006', worldId: 'java-academy', order: 6, title: 'Methods & Return Types',
    difficulty: 'medium', xpReward: 170, coinReward: 35, estimatedTime: 12,
    story: 'The finance team needs reusable methods to calculate employee bonuses.',
    objective: 'Create a method calculateBonus(double salary, int rating) that returns salary * rating * 0.1. Call it from main and print the result.',
    starterCode: `public class BonusCalculator {\n    // TODO: Create calculateBonus method\n\n    public static void main(String[] args) {\n        // TODO: Call calculateBonus and print result\n    }\n}`,
    requirements: { patterns: [{ name: 'method declaration', pattern: 'static\\s+double\\s+calculateBonus', required: true }, { name: 'return statement', pattern: 'return\\s+', required: true }] },
    tests: [
      { name: 'Method exists with correct signature', visible: true,
        validate: (code) => {
          const has = /static\s+double\s+calculateBonus\s*\(\s*double\s+\w+\s*,\s*int\s+\w+\s*\)/.test(code);
          return { passed: has, message: has ? '' : 'Method signature: static double calculateBonus(double salary, int rating)' };
        }
      },
      { name: 'Returns correct calculation', visible: true,
        validate: (code) => {
          const has = /return.*\*.*\*.*0\.1|return.*0\.1.*\*/.test(code);
          return { passed: has, message: has ? '' : 'Return salary * rating * 0.1' };
        }
      }
    ],
    hiddenTests: [{ name: 'Called from main', visible: false, validate: (code) => ({ passed: /calculateBonus\s*\(/.test(code.split('main')[1] || ''), message: 'Call the method from main' })}],
    hints: ['Method signature: public static double calculateBonus(double salary, int rating)', 'Inside the method: return salary * rating * 0.1;', 'In main: double bonus = calculateBonus(50000, 4); System.out.println(bonus);'],
    solution: `public class BonusCalculator {\n    public static double calculateBonus(double salary, int rating) {\n        return salary * rating * 0.1;\n    }\n\n    public static void main(String[] args) {\n        double bonus = calculateBonus(50000, 4);\n        System.out.println("Bonus: " + bonus);\n    }\n}`,
    explanation: 'Methods promote code reuse. The return type (double) tells Java what the method gives back. Parameters let you pass data in. static methods belong to the class, not an instance.'
  },
  {
    id: 'ja-007', worldId: 'java-academy', order: 7, title: 'String Operations',
    difficulty: 'medium', xpReward: 160, coinReward: 35, estimatedTime: 10,
    story: 'The search team needs you to process user queries — trim whitespace, convert to lowercase, and check if it contains a keyword.',
    objective: 'Given a String query, trim it, convert to lowercase, check if it contains "spring", and print the result.',
    starterCode: `public class QueryProcessor {\n    public static void main(String[] args) {\n        String query = "  Learn SPRING Boot  ";\n        // TODO: trim, toLowerCase, contains("spring")\n        // Print the processed query and whether it contains "spring"\n    }\n}`,
    requirements: { patterns: [{ name: 'trim()', pattern: '\\.trim\\(\\)', required: true }, { name: 'toLowerCase()', pattern: '\\.toLowerCase\\(\\)', required: true }, { name: 'contains()', pattern: '\\.contains\\(', required: true }] },
    tests: [
      { name: 'Uses all 3 String methods', visible: true,
        validate: (code) => {
          const t = /\.trim\(\)/.test(code);
          const l = /\.toLowerCase\(\)/.test(code);
          const c = /\.contains\(/.test(code);
          return { passed: t && l && c, message: `trim:${t} toLowerCase:${l} contains:${c}` };
        }
      }
    ],
    hiddenTests: [],
    hints: ['String has methods: .trim() removes whitespace, .toLowerCase() converts to lowercase.', 'You can chain them: query.trim().toLowerCase()', '.contains("spring") returns a boolean.'],
    solution: `public class QueryProcessor {\n    public static void main(String[] args) {\n        String query = "  Learn SPRING Boot  ";\n        String processed = query.trim().toLowerCase();\n        boolean hasSpring = processed.contains("spring");\n        System.out.println("Processed: " + processed);\n        System.out.println("Contains spring: " + hasSpring);\n    }\n}`,
    explanation: 'Strings in Java are immutable — methods like trim() and toLowerCase() return NEW strings. Method chaining works because each method returns a String.'
  },
  {
    id: 'ja-008', worldId: 'java-academy', order: 8, title: 'Exception Handling',
    difficulty: 'medium', xpReward: 180, coinReward: 40, estimatedTime: 12,
    story: 'A production bug! The app crashes when users enter invalid numbers. You need to add error handling.',
    objective: 'Wrap Integer.parseInt() in a try-catch block. Catch NumberFormatException and print a friendly error message.',
    starterCode: `public class SafeParser {\n    public static void main(String[] args) {\n        String input = "not_a_number";\n        // TODO: try to parse, catch NumberFormatException\n        // Print the number if valid, or "Invalid input: <value>" if not\n    }\n}`,
    requirements: { patterns: [{ name: 'try block', pattern: 'try\\s*\\{', required: true }, { name: 'catch block', pattern: 'catch\\s*\\(\\s*NumberFormatException', required: true }] },
    tests: [
      { name: 'Has try-catch with NumberFormatException', visible: true,
        validate: (code) => {
          const hasTry = /try\s*\{/.test(code);
          const hasCatch = /catch\s*\(\s*NumberFormatException/.test(code);
          const hasParseInt = /Integer\.parseInt/.test(code);
          const all = hasTry && hasCatch && hasParseInt;
          return { passed: all, message: all ? '' : 'Use try { Integer.parseInt() } catch (NumberFormatException e) { }' };
        }
      }
    ],
    hiddenTests: [],
    hints: ['Wrap the risky code in try { ... }', 'catch (NumberFormatException e) { // handle error }', 'Inside catch: System.out.println("Invalid input: " + input);'],
    solution: `public class SafeParser {\n    public static void main(String[] args) {\n        String input = "not_a_number";\n        try {\n            int number = Integer.parseInt(input);\n            System.out.println("Parsed: " + number);\n        } catch (NumberFormatException e) {\n            System.out.println("Invalid input: " + input);\n        }\n    }\n}`,
    explanation: 'try-catch prevents crashes from runtime errors. Always catch SPECIFIC exceptions (NumberFormatException) rather than generic Exception. This is a Java best practice.'
  },
  {
    id: 'ja-009', worldId: 'java-academy', order: 9, title: 'Working with Objects',
    difficulty: 'medium', xpReward: 200, coinReward: 45, estimatedTime: 15,
    story: 'Time to create your first real Java object! The HR system needs an Employee class.',
    objective: 'Create an Employee class with fields (name, id, salary), a constructor, and a display() method. Create an instance in main.',
    starterCode: `public class Employee {\n    // TODO: Declare fields: String name, int id, double salary\n\n    // TODO: Constructor\n\n    // TODO: display() method that prints all fields\n\n    public static void main(String[] args) {\n        // TODO: Create Employee instance and call display()\n    }\n}`,
    requirements: { patterns: [
      { name: 'fields', pattern: '(private|public)\\s+(String|int|double)\\s+\\w+', required: true },
      { name: 'constructor', pattern: 'Employee\\s*\\(', required: true },
      { name: 'display method', pattern: 'void\\s+display\\s*\\(', required: true },
      { name: 'new keyword', pattern: 'new\\s+Employee\\s*\\(', required: true }
    ]},
    tests: [
      { name: 'Has constructor and fields', visible: true,
        validate: (code) => {
          const hasFields = /String\s+name|int\s+id|double\s+salary/.test(code);
          const hasCons = /Employee\s*\(.*String.*int|Employee\s*\(.*\w+/.test(code);
          return { passed: hasFields && hasCons, message: 'Define fields and a constructor' };
        }
      },
      { name: 'Creates instance in main', visible: true,
        validate: (code) => {
          const has = /new\s+Employee\s*\(/.test(code) && /\.display\s*\(/.test(code);
          return { passed: has, message: has ? '' : 'Create: Employee emp = new Employee(...); emp.display();' };
        }
      }
    ],
    hiddenTests: [],
    hints: ['Declare fields: private String name; private int id; private double salary;', 'Constructor: public Employee(String name, int id, double salary) { this.name = name; ... }', 'In main: Employee emp = new Employee("Saket", 1, 75000); emp.display();'],
    solution: `public class Employee {\n    private String name;\n    private int id;\n    private double salary;\n\n    public Employee(String name, int id, double salary) {\n        this.name = name;\n        this.id = id;\n        this.salary = salary;\n    }\n\n    public void display() {\n        System.out.println("Name: " + name);\n        System.out.println("ID: " + id);\n        System.out.println("Salary: " + salary);\n    }\n\n    public static void main(String[] args) {\n        Employee emp = new Employee("Saket", 1, 75000.0);\n        emp.display();\n    }\n}`,
    explanation: 'Objects encapsulate data (fields) and behavior (methods). Constructors initialize objects. The "this" keyword refers to the current instance. This is the foundation of OOP.'
  },
  {
    id: 'ja-010', worldId: 'java-academy', order: 10, title: '🏆 Boss: Build a Calculator',
    difficulty: 'boss', xpReward: 350, coinReward: 100, estimatedTime: 20,
    story: '⚔️ BOSS CHALLENGE! The CTO personally assigned this. Build a calculator that handles multiple operations. Prove you belong at SpringCorp.',
    objective: 'Create a Calculator class with methods: add, subtract, multiply, divide. Handle division by zero. Call all methods from main.',
    starterCode: `public class Calculator {\n    // TODO: add(double a, double b)\n    // TODO: subtract(double a, double b)\n    // TODO: multiply(double a, double b)\n    // TODO: divide(double a, double b) - handle division by zero!\n\n    public static void main(String[] args) {\n        Calculator calc = new Calculator();\n        // TODO: Test all 4 operations and print results\n        // TODO: Test divide by zero\n    }\n}`,
    requirements: { patterns: [
      { name: 'add method', pattern: 'double\\s+add\\s*\\(', required: true },
      { name: 'subtract method', pattern: 'double\\s+subtract\\s*\\(', required: true },
      { name: 'multiply method', pattern: 'double\\s+multiply\\s*\\(', required: true },
      { name: 'divide method', pattern: 'double\\s+divide\\s*\\(', required: true },
      { name: 'division by zero check', pattern: '==\\s*0|!=\\s*0', required: true }
    ]},
    tests: [
      { name: 'All 4 methods exist', visible: true,
        validate: (code) => {
          const a = /double\s+add\s*\(/.test(code); const s = /double\s+subtract\s*\(/.test(code);
          const m = /double\s+multiply\s*\(/.test(code); const d = /double\s+divide\s*\(/.test(code);
          return { passed: a && s && m && d, message: `add:${a} subtract:${s} multiply:${m} divide:${d}` };
        }
      },
      { name: 'Handles division by zero', visible: true,
        validate: (code) => {
          const has = /==\s*0|!=\s*0/.test(code) && /(throw|ArithmeticException|println|return|IllegalArgument)/.test(code);
          return { passed: has, message: has ? '' : 'Check if divisor is 0 before dividing' };
        }
      },
      { name: 'All methods called in main', visible: true,
        validate: (code) => {
          const mainPart = code.split('main')[1] || '';
          const calls = ['add', 'subtract', 'multiply', 'divide'].every(m => mainPart.includes(m + '('));
          return { passed: calls, message: calls ? '' : 'Call all 4 methods from main' };
        }
      }
    ],
    hiddenTests: [{ name: 'Uses return statements', visible: false, validate: (code) => ({ passed: (code.match(/return\s+/g) || []).length >= 4, message: 'Each method should return a value' })}],
    hints: ['Each method takes (double a, double b) and returns a double.', 'For divide: if (b == 0) throw new ArithmeticException("Cannot divide by zero");', 'In main: System.out.println("10 + 5 = " + calc.add(10, 5));'],
    solution: `public class Calculator {\n    public double add(double a, double b) {\n        return a + b;\n    }\n    public double subtract(double a, double b) {\n        return a - b;\n    }\n    public double multiply(double a, double b) {\n        return a * b;\n    }\n    public double divide(double a, double b) {\n        if (b == 0) throw new ArithmeticException("Cannot divide by zero");\n        return a / b;\n    }\n    public static void main(String[] args) {\n        Calculator calc = new Calculator();\n        System.out.println("10 + 5 = " + calc.add(10, 5));\n        System.out.println("10 - 5 = " + calc.subtract(10, 5));\n        System.out.println("10 * 5 = " + calc.multiply(10, 5));\n        System.out.println("10 / 5 = " + calc.divide(10, 5));\n        try { calc.divide(10, 0); } catch (ArithmeticException e) { System.out.println("Error: " + e.getMessage()); }\n    }\n}`,
    explanation: 'This combines everything: classes, methods, return types, parameters, error handling. A Calculator is a classic example of encapsulating related operations in one class. Always validate inputs (like checking for zero).'
  }
];
