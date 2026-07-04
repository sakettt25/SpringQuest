export const OOP_CITY_MISSIONS = [
  {
    id: 'oc-001', worldId: 'oop-city', order: 1,
    title: 'Classes & Constructors',
    difficulty: 'easy', xpReward: 150, coinReward: 30, estimatedTime: 12,
    story: 'Welcome to OOP City! SpringCorp\'s codebase is growing. You need to model a Department. In Spring, everything is a class — @Service, @Repository, @Controller are all classes Spring manages. Mastering class design is step one.',
    objective: 'Create a Department class with private fields (name, teamSize, budget), a parameterized constructor, and a getSummary() method that returns a formatted String.',
    starterCode: `public class Department {\n    // TODO: private String name, int teamSize, double budget\n\n    // TODO: Constructor that accepts all 3 fields\n\n    // TODO: getSummary() returns a String with all field values\n\n    public static void main(String[] args) {\n        // TODO: Create a Department instance and print getSummary()\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'private fields', pattern: 'private\\s+(String|int|double)\\s+\\w+', required: true },
        { name: 'constructor', pattern: 'Department\\s*\\(', required: true },
        { name: 'getSummary method', pattern: 'String\\s+getSummary\\s*\\(\\s*\\)', required: true },
        { name: 'new instance', pattern: 'new\\s+Department\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'Has 3 typed fields', visible: true,
        validate: (code) => {
          const n = /String\s+name/.test(code);
          const s = /int\s+teamSize/.test(code);
          const b = /double\s+budget/.test(code);
          return { passed: n && s && b, message: 'Declare: private String name; private int teamSize; private double budget;' };
        }
      },
      { name: 'Constructor initialises all fields', visible: true,
        validate: (code) => {
          const hasCons = /Department\s*\(/.test(code);
          const hasThis = /this\.(name|teamSize|budget)/.test(code);
          return { passed: hasCons && hasThis, message: 'Constructor should use this.field = param to set each field' };
        }
      },
      { name: 'getSummary returns a String', visible: true,
        validate: (code) => {
          const has = /String\s+getSummary/.test(code) && /return/.test(code);
          return { passed: has, message: 'getSummary must return a String' };
        }
      }
    ],
    hiddenTests: [
      { name: 'Instance created in main', visible: false,
        validate: (code) => ({ passed: /new\s+Department\s*\(/.test(code) && /System\.out\.println/.test(code), message: 'Create a Department instance and print getSummary()' })
      }
    ],
    hints: [
      'Private fields: private String name; private int teamSize; private double budget;',
      'Constructor: public Department(String name, int teamSize, double budget) { this.name = name; this.teamSize = teamSize; this.budget = budget; }',
      'getSummary: public String getSummary() { return "Dept: " + name + " | Team: " + teamSize + " | Budget: $" + budget; }'
    ],
    solution: `public class Department {\n    private String name;\n    private int teamSize;\n    private double budget;\n\n    public Department(String name, int teamSize, double budget) {\n        this.name = name;\n        this.teamSize = teamSize;\n        this.budget = budget;\n    }\n\n    public String getSummary() {\n        return "Department: " + name + " | Team: " + teamSize + " | Budget: $" + budget;\n    }\n\n    public static void main(String[] args) {\n        Department eng = new Department("Engineering", 12, 500000.0);\n        System.out.println(eng.getSummary());\n    }\n}`,
    explanation: 'A class is a blueprint; an object is the instance. Fields = state, methods = behaviour. The `this` keyword refers to the current instance. In Spring, every @Service class you write follows this exact pattern — Spring calls the constructor, manages the object, and injects it wherever needed.'
  },

  {
    id: 'oc-002', worldId: 'oop-city', order: 2,
    title: 'Encapsulation & Getters/Setters',
    difficulty: 'easy', xpReward: 155, coinReward: 30, estimatedTime: 12,
    story: 'A junior dev directly modified the salary field and set it to -50000. Encapsulation prevents illegal state. Spring\'s beans use encapsulation to protect internal state while exposing only what\'s needed.',
    objective: 'Create an Employee class with private fields. Add public getters for all fields and a setter for salary that rejects negative values.',
    starterCode: `public class Employee {\n    private String name;\n    private int id;\n    private double salary;\n\n    public Employee(String name, int id, double salary) {\n        this.name = name;\n        this.id = id;\n        this.salary = salary;\n    }\n\n    // TODO: getters for name, id, salary\n    // TODO: setSalary(double salary) — reject if salary < 0\n\n    public static void main(String[] args) {\n        Employee e = new Employee("Saket", 1, 75000);\n        e.setSalary(-5000); // should print error\n        e.setSalary(80000); // should succeed\n        System.out.println(e.getName() + " earns " + e.getSalary());\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'getName getter', pattern: 'String\\s+getName\\s*\\(\\s*\\)', required: true },
        { name: 'getSalary getter', pattern: 'double\\s+getSalary\\s*\\(\\s*\\)', required: true },
        { name: 'setSalary with validation', pattern: 'void\\s+setSalary\\s*\\(', required: true },
        { name: 'salary validation', pattern: 'salary\\s*<\\s*0|salary\\s*<=\\s*0', required: true }
      ]
    },
    tests: [
      { name: 'Getters exist for all fields', visible: true,
        validate: (code) => {
          const n = /String\s+getName\s*\(\s*\)/.test(code);
          const i = /int\s+getId\s*\(\s*\)/.test(code);
          const s = /double\s+getSalary\s*\(\s*\)/.test(code);
          return { passed: n && i && s, message: 'Add getName(), getId(), getSalary()' };
        }
      },
      { name: 'setSalary validates negative values', visible: true,
        validate: (code) => {
          const hasSetter = /void\s+setSalary\s*\(\s*double/.test(code);
          const hasCheck = /salary\s*<\s*0|salary\s*<=\s*0/.test(code);
          return { passed: hasSetter && hasCheck, message: 'setSalary must reject negative values with an if-check' };
        }
      }
    ],
    hiddenTests: [
      { name: 'getter returns the field', visible: false,
        validate: (code) => ({ passed: /return\s+name/.test(code) && /return\s+salary/.test(code), message: 'Getters must return the corresponding field' })
      }
    ],
    hints: [
      'public String getName() { return name; } — same pattern for getId() and getSalary()',
      'public void setSalary(double salary) { if (salary < 0) { System.out.println("Invalid!"); return; } ... }',
      'Inside setSalary, after the check: this.salary = salary;'
    ],
    solution: `public class Employee {\n    private String name;\n    private int id;\n    private double salary;\n\n    public Employee(String name, int id, double salary) {\n        this.name = name;\n        this.id = id;\n        this.salary = salary;\n    }\n\n    public String getName() { return name; }\n    public int getId() { return id; }\n    public double getSalary() { return salary; }\n\n    public void setSalary(double salary) {\n        if (salary < 0) {\n            System.out.println("Invalid salary: cannot be negative");\n            return;\n        }\n        this.salary = salary;\n    }\n\n    public static void main(String[] args) {\n        Employee e = new Employee("Saket", 1, 75000);\n        e.setSalary(-5000);\n        e.setSalary(80000);\n        System.out.println(e.getName() + " earns " + e.getSalary());\n    }\n}`,
    explanation: 'Encapsulation = private fields + public getters/setters with validation. This prevents objects from entering invalid state. Spring\'s @ConfigurationProperties classes use this exact pattern — private fields, public setters — to bind application.yml values safely.'
  },

  {
    id: 'oc-003', worldId: 'oop-city', order: 3,
    title: 'Inheritance & extends',
    difficulty: 'easy', xpReward: 165, coinReward: 35, estimatedTime: 14,
    story: 'SpringCorp has Employees but also Managers who have a team. Instead of duplicating code, Managers should EXTEND Employee. Spring\'s own framework uses inheritance everywhere — ApplicationContext extends BeanFactory, for example.',
    objective: 'Create a Manager class that extends Employee. Add a teamSize field, override toString(), and call the parent constructor with super().',
    starterCode: `public class Employee {\n    protected String name;\n    protected double salary;\n\n    public Employee(String name, double salary) {\n        this.name = name;\n        this.salary = salary;\n    }\n\n    public String getRole() {\n        return "Employee";\n    }\n\n    @Override\n    public String toString() {\n        return getRole() + ": " + name + " ($" + salary + ")";\n    }\n}\n\n// TODO: Manager extends Employee\n// TODO: Add int teamSize field\n// TODO: Constructor using super() + teamSize\n// TODO: Override getRole() to return "Manager"\n// TODO: Override toString() to include teamSize\n\nclass Main {\n    public static void main(String[] args) {\n        Employee emp = new Employee("Alice", 60000);\n        Manager mgr = new Manager("Bob", 90000, 8);\n        System.out.println(emp);\n        System.out.println(mgr);\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'extends Employee', pattern: 'class\\s+Manager\\s+extends\\s+Employee', required: true },
        { name: 'super() call', pattern: 'super\\s*\\(', required: true },
        { name: 'teamSize field', pattern: 'int\\s+teamSize|private\\s+int\\s+team', required: true },
        { name: '@Override', pattern: '@Override', required: true }
      ]
    },
    tests: [
      { name: 'Manager extends Employee', visible: true,
        validate: (code) => ({ passed: /class\s+Manager\s+extends\s+Employee/.test(code), message: 'Declare: class Manager extends Employee' })
      },
      { name: 'Uses super() in constructor', visible: true,
        validate: (code) => ({ passed: /super\s*\(/.test(code), message: 'Call super(name, salary) in Manager constructor' })
      },
      { name: 'Overrides getRole()', visible: true,
        validate: (code) => {
          const hasOverride = /@Override/.test(code);
          const hasRole = /getRole\s*\(\s*\)\s*\{[^}]*Manager/.test(code);
          return { passed: hasOverride && hasRole, message: '@Override getRole() should return "Manager"' };
        }
      }
    ],
    hiddenTests: [
      { name: 'teamSize is stored', visible: false,
        validate: (code) => ({ passed: /this\.teamSize\s*=|this\.team\s*=/.test(code), message: 'Store teamSize in the Manager constructor' })
      }
    ],
    hints: [
      'class Manager extends Employee { private int teamSize; ... }',
      'Manager constructor: public Manager(String name, double salary, int teamSize) { super(name, salary); this.teamSize = teamSize; }',
      '@Override public String getRole() { return "Manager"; }'
    ],
    solution: `public class Employee {\n    protected String name;\n    protected double salary;\n\n    public Employee(String name, double salary) {\n        this.name = name;\n        this.salary = salary;\n    }\n\n    public String getRole() { return "Employee"; }\n\n    @Override\n    public String toString() {\n        return getRole() + ": " + name + " ($" + salary + ")";\n    }\n}\n\nclass Manager extends Employee {\n    private int teamSize;\n\n    public Manager(String name, double salary, int teamSize) {\n        super(name, salary);\n        this.teamSize = teamSize;\n    }\n\n    @Override\n    public String getRole() { return "Manager"; }\n\n    @Override\n    public String toString() {\n        return super.toString() + " [Team: " + teamSize + "]";\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Employee emp = new Employee("Alice", 60000);\n        Manager mgr = new Manager("Bob", 90000, 8);\n        System.out.println(emp);\n        System.out.println(mgr);\n    }\n}`,
    explanation: 'Inheritance lets a child class reuse and extend parent behaviour. super() calls the parent constructor. @Override tells the compiler you\'re replacing a parent method. In Spring, this same mechanism allows you to extend abstract base classes to add shared behaviour to multiple controllers or services.'
  },

  {
    id: 'oc-004', worldId: 'oop-city', order: 4,
    title: 'Interfaces — The Spring Way',
    difficulty: 'medium', xpReward: 200, coinReward: 40, estimatedTime: 15,
    story: 'Interfaces are the most important OOP concept for Spring developers. Spring\'s entire architecture is built on interfaces: Repository, Service, ApplicationContext, BeanFactory. When you code to an interface, you can swap implementations without touching calling code.',
    objective: 'Define a NotificationService interface with a send() method. Create EmailNotification and SmsNotification classes that implement it. Write a client class that works with the interface, not the implementations.',
    starterCode: `// TODO: Define interface NotificationService\n// Method: void send(String recipient, String message)\n\n// TODO: class EmailNotification implements NotificationService\n// Prints: "Email to [recipient]: [message]"\n\n// TODO: class SmsNotification implements NotificationService\n// Prints: "SMS to [recipient]: [message]"\n\nclass AlertSystem {\n    private NotificationService notifier;\n\n    public AlertSystem(NotificationService notifier) {\n        this.notifier = notifier;\n    }\n\n    public void alert(String user, String msg) {\n        notifier.send(user, msg);\n    }\n\n    public static void main(String[] args) {\n        AlertSystem emailAlert = new AlertSystem(new EmailNotification());\n        AlertSystem smsAlert = new AlertSystem(new SmsNotification());\n        emailAlert.alert("saket@corp.com", "Deploy successful");\n        smsAlert.alert("+91-9999", "Server is down!");\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'interface declaration', pattern: 'interface\\s+NotificationService', required: true },
        { name: 'send method in interface', pattern: 'void\\s+send\\s*\\(', required: true },
        { name: 'EmailNotification implements', pattern: 'class\\s+EmailNotification\\s+implements\\s+NotificationService', required: true },
        { name: 'SmsNotification implements', pattern: 'class\\s+SmsNotification\\s+implements\\s+NotificationService', required: true }
      ]
    },
    tests: [
      { name: 'Interface defined with send()', visible: true,
        validate: (code) => {
          const hasInterface = /interface\s+NotificationService/.test(code);
          const hasMethod = /void\s+send\s*\(/.test(code);
          return { passed: hasInterface && hasMethod, message: 'Define interface NotificationService with void send(String, String)' };
        }
      },
      { name: 'Both classes implement the interface', visible: true,
        validate: (code) => {
          const email = /class\s+EmailNotification\s+implements\s+NotificationService/.test(code);
          const sms = /class\s+SmsNotification\s+implements\s+NotificationService/.test(code);
          return { passed: email && sms, message: 'Both EmailNotification and SmsNotification must implement NotificationService' };
        }
      },
      { name: 'Both implementations have send()', visible: true,
        validate: (code) => {
          const count = (code.match(/void\s+send\s*\(/g) || []).length;
          return { passed: count >= 3, actual: `${count} send() definitions`, message: 'Interface + 2 implementations = 3 send() declarations total' };
        }
      }
    ],
    hiddenTests: [
      { name: 'AlertSystem uses interface type', visible: false,
        validate: (code) => ({ passed: /NotificationService\s+notifier/.test(code), message: 'AlertSystem field should be of type NotificationService (the interface)' })
      }
    ],
    hints: [
      'interface NotificationService { void send(String recipient, String message); }',
      'class EmailNotification implements NotificationService { @Override public void send(String r, String m) { System.out.println("Email to " + r + ": " + m); } }',
      'AlertSystem holds a NotificationService reference — not Email, not SMS. This is the key Spring pattern: depend on interfaces, not implementations.'
    ],
    solution: `interface NotificationService {\n    void send(String recipient, String message);\n}\n\nclass EmailNotification implements NotificationService {\n    @Override\n    public void send(String recipient, String message) {\n        System.out.println("Email to " + recipient + ": " + message);\n    }\n}\n\nclass SmsNotification implements NotificationService {\n    @Override\n    public void send(String recipient, String message) {\n        System.out.println("SMS to " + recipient + ": " + message);\n    }\n}\n\nclass AlertSystem {\n    private NotificationService notifier;\n\n    public AlertSystem(NotificationService notifier) {\n        this.notifier = notifier;\n    }\n\n    public void alert(String user, String msg) {\n        notifier.send(user, msg);\n    }\n\n    public static void main(String[] args) {\n        AlertSystem emailAlert = new AlertSystem(new EmailNotification());\n        AlertSystem smsAlert = new AlertSystem(new SmsNotification());\n        emailAlert.alert("saket@corp.com", "Deploy successful");\n        smsAlert.alert("+91-9999", "Server is down!");\n    }\n}`,
    explanation: 'Interfaces define a CONTRACT — what must be done, not how. Classes decide how. AlertSystem only knows about NotificationService, so you can add WhatsAppNotification tomorrow without touching AlertSystem. This is EXACTLY how Spring\'s Dependency Injection works: you declare interface dependencies, Spring injects the right implementation at runtime.'
  },

  {
    id: 'oc-005', worldId: 'oop-city', order: 5,
    title: 'Abstract Classes',
    difficulty: 'medium', xpReward: 190, coinReward: 40, estimatedTime: 14,
    story: 'Some methods should be mandatory in every subclass, while others should have shared default logic. Abstract classes give you both. Spring\'s AbstractController, AbstractJpaQuery, and many other base classes use this exact pattern.',
    objective: 'Create an abstract Report class with an abstract generate() method and a concrete printHeader() method. Create two subclasses: SalesReport and HRReport.',
    starterCode: `// TODO: abstract class Report\n// Abstract method: abstract String generate()\n// Concrete method: void printHeader() — prints "=== REPORT ===" then calls generate()\n\n// TODO: class SalesReport extends Report\n// generate() returns "Sales: Q1=$120K, Q2=$145K"\n\n// TODO: class HRReport extends Report\n// generate() returns "HR: 42 active employees, 3 open positions"\n\nclass Main {\n    public static void main(String[] args) {\n        Report sales = new SalesReport();\n        Report hr = new HRReport();\n        sales.printHeader();\n        hr.printHeader();\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'abstract class', pattern: 'abstract\\s+class\\s+Report', required: true },
        { name: 'abstract method', pattern: 'abstract\\s+String\\s+generate', required: true },
        { name: 'SalesReport extends', pattern: 'class\\s+SalesReport\\s+extends\\s+Report', required: true },
        { name: 'HRReport extends', pattern: 'class\\s+HRReport\\s+extends\\s+Report', required: true }
      ]
    },
    tests: [
      { name: 'Abstract class and method declared', visible: true,
        validate: (code) => {
          const hasAbsClass = /abstract\s+class\s+Report/.test(code);
          const hasAbsMethod = /abstract\s+String\s+generate/.test(code);
          return { passed: hasAbsClass && hasAbsMethod, message: 'Declare abstract class Report with abstract String generate()' };
        }
      },
      { name: 'Both subclasses exist', visible: true,
        validate: (code) => {
          const s = /class\s+SalesReport\s+extends\s+Report/.test(code);
          const h = /class\s+HRReport\s+extends\s+Report/.test(code);
          return { passed: s && h, message: 'Create SalesReport and HRReport extending Report' };
        }
      },
      { name: 'Both override generate()', visible: true,
        validate: (code) => {
          const count = (code.match(/String\s+generate\s*\(\s*\)/g) || []).length;
          return { passed: count >= 3, actual: `${count} generate() declarations`, message: 'Abstract + 2 overrides = 3 generate() declarations' };
        }
      }
    ],
    hiddenTests: [
      { name: 'printHeader() calls generate()', visible: false,
        validate: (code) => ({ passed: /printHeader[\s\S]*?generate\s*\(\s*\)/.test(code), message: 'printHeader() should call generate() internally' })
      }
    ],
    hints: [
      'abstract class Report { abstract String generate(); void printHeader() { System.out.println("=== REPORT ==="); System.out.println(generate()); } }',
      'class SalesReport extends Report { @Override public String generate() { return "Sales: Q1=$120K..."; } }',
      'Abstract classes cannot be instantiated directly — always use a concrete subclass like new SalesReport()'
    ],
    solution: `abstract class Report {\n    abstract String generate();\n\n    void printHeader() {\n        System.out.println("=== REPORT ===");\n        System.out.println(generate());\n        System.out.println("==============");\n    }\n}\n\nclass SalesReport extends Report {\n    @Override\n    public String generate() {\n        return "Sales: Q1=$120K, Q2=$145K";\n    }\n}\n\nclass HRReport extends Report {\n    @Override\n    public String generate() {\n        return "HR: 42 active employees, 3 open positions";\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Report sales = new SalesReport();\n        Report hr = new HRReport();\n        sales.printHeader();\n        hr.printHeader();\n    }\n}`,
    explanation: 'Abstract classes combine interface-like contracts (abstract methods subclasses MUST implement) with shared concrete logic (printHeader here). Use an abstract class when subclasses share some behaviour but must define their own version of certain methods. Spring uses this heavily in template classes like AbstractController.'
  },

  {
    id: 'oc-006', worldId: 'oop-city', order: 6,
    title: 'Generics — Type-Safe Code',
    difficulty: 'medium', xpReward: 210, coinReward: 45, estimatedTime: 15,
    story: 'Spring\'s most powerful APIs use generics: JpaRepository<User, Long>, ResponseEntity<User>, Optional<User>, Page<User>. Generics let you write one class that works with any type while remaining type-safe.',
    objective: 'Create a generic ApiResponse<T> class that wraps any data type with a status code and message. Use it with String and Integer payloads.',
    starterCode: `// TODO: Generic class ApiResponse<T>\n// Fields: int statusCode, String message, T data\n// Constructor: ApiResponse(int statusCode, String message, T data)\n// Method: void print() — prints all 3 fields\n\n// Hint: T is the type parameter — like a placeholder\n\nclass Main {\n    public static void main(String[] args) {\n        // Use ApiResponse with a String\n        ApiResponse<String> stringResp = new ApiResponse<>(200, "OK", "Hello World");\n        stringResp.print();\n\n        // Use ApiResponse with an Integer\n        ApiResponse<Integer> intResp = new ApiResponse<>(201, "Created", 42);\n        intResp.print();\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'generic class', pattern: 'class\\s+ApiResponse\\s*<\\s*T\\s*>', required: true },
        { name: 'T data field', pattern: 'T\\s+data', required: true },
        { name: 'print method', pattern: 'void\\s+print\\s*\\(\\s*\\)', required: true },
        { name: 'generic usage', pattern: 'ApiResponse<String>|ApiResponse<Integer>', required: true }
      ]
    },
    tests: [
      { name: 'Generic class ApiResponse<T> declared', visible: true,
        validate: (code) => ({
          passed: /class\s+ApiResponse\s*<\s*T\s*>/.test(code),
          message: 'Declare: class ApiResponse<T> { ... }'
        })
      },
      { name: 'T used as field type', visible: true,
        validate: (code) => ({
          passed: /T\s+data/.test(code),
          message: 'Declare field: T data — T is the generic type parameter'
        })
      },
      { name: 'Used with String and Integer', visible: true,
        validate: (code) => {
          const s = /ApiResponse<String>/.test(code);
          const i = /ApiResponse<Integer>/.test(code);
          return { passed: s && i, message: 'Use ApiResponse<String> and ApiResponse<Integer> in main' };
        }
      }
    ],
    hiddenTests: [
      { name: 'Constructor takes T parameter', visible: false,
        validate: (code) => ({ passed: /ApiResponse\s*\(\s*int\s+\w+\s*,\s*String\s+\w+\s*,\s*T\s+\w+/.test(code), message: 'Constructor: ApiResponse(int statusCode, String message, T data)' })
      }
    ],
    hints: [
      'class ApiResponse<T> { private int statusCode; private String message; private T data; }',
      'Constructor: public ApiResponse(int statusCode, String message, T data) { this.statusCode = statusCode; this.message = message; this.data = data; }',
      'void print() { System.out.println(statusCode + " " + message + " — " + data); }'
    ],
    solution: `class ApiResponse<T> {\n    private int statusCode;\n    private String message;\n    private T data;\n\n    public ApiResponse(int statusCode, String message, T data) {\n        this.statusCode = statusCode;\n        this.message = message;\n        this.data = data;\n    }\n\n    public void print() {\n        System.out.println("Status: " + statusCode + " | " + message + " | Data: " + data);\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        ApiResponse<String> stringResp = new ApiResponse<>(200, "OK", "Hello World");\n        stringResp.print();\n\n        ApiResponse<Integer> intResp = new ApiResponse<>(201, "Created", 42);\n        intResp.print();\n    }\n}`,
    explanation: 'Generics allow one class to work with any type safely. <T> is a type placeholder. When you write ApiResponse<User>, T becomes User everywhere. Spring uses this exact pattern: JpaRepository<User, Long> is generic — one repository interface works for every entity. ResponseEntity<T> wraps any response body. You\'ll write this daily as a Spring developer.'
  },

  {
    id: 'oc-007', worldId: 'oop-city', order: 7,
    title: 'Enums — Type-Safe Constants',
    difficulty: 'easy', xpReward: 170, coinReward: 35, estimatedTime: 10,
    story: 'SpringCorp\'s order system uses strings like "PENDING", "SHIPPED", "DELIVERED" — but a bug let someone set status to "SHIPED" (typo). Enums solve this. Spring uses enums everywhere: HttpStatus.OK, HttpMethod.GET, RequestMethod.POST.',
    objective: 'Create an OrderStatus enum with values PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED. Add a getLabel() method. Use it in an Order class.',
    starterCode: `// TODO: enum OrderStatus\n// Values: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED\n// Add a field: private final String label\n// Constructor: OrderStatus(String label)\n// Method: String getLabel()\n\nclass Order {\n    private int id;\n    private OrderStatus status;\n\n    public Order(int id) {\n        this.id = id;\n        this.status = OrderStatus.PENDING; // default\n    }\n\n    public void updateStatus(OrderStatus newStatus) {\n        this.status = newStatus;\n        System.out.println("Order " + id + " is now: " + status.getLabel());\n    }\n\n    public static void main(String[] args) {\n        Order order = new Order(1001);\n        order.updateStatus(OrderStatus.PROCESSING);\n        order.updateStatus(OrderStatus.SHIPPED);\n        order.updateStatus(OrderStatus.DELIVERED);\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'enum declaration', pattern: 'enum\\s+OrderStatus', required: true },
        { name: 'PENDING value', pattern: 'PENDING', required: true },
        { name: 'SHIPPED value', pattern: 'SHIPPED', required: true },
        { name: 'getLabel method', pattern: 'String\\s+getLabel\\s*\\(\\s*\\)', required: true }
      ]
    },
    tests: [
      { name: 'Enum with 5 values', visible: true,
        validate: (code) => {
          const vals = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
          const found = vals.filter(v => code.includes(v)).length;
          return { passed: found === 5, actual: `${found}/5 values found`, message: 'Include all 5 enum values' };
        }
      },
      { name: 'Enum has getLabel() method', visible: true,
        validate: (code) => ({
          passed: /enum\s+OrderStatus[\s\S]*?String\s+getLabel/.test(code),
          message: 'Add getLabel() method inside the enum'
        })
      },
      { name: 'Order uses the enum', visible: true,
        validate: (code) => ({
          passed: /OrderStatus\s+status|OrderStatus\.\w+/.test(code),
          message: 'Use OrderStatus enum type in the Order class'
        })
      }
    ],
    hiddenTests: [
      { name: 'Enum has label field', visible: false,
        validate: (code) => ({ passed: /private\s+final\s+String\s+label/.test(code), message: 'Enum should have a private final String label field' })
      }
    ],
    hints: [
      'enum OrderStatus { PENDING("Pending"), PROCESSING("In Progress"), SHIPPED("Shipped"), DELIVERED("Delivered"), CANCELLED("Cancelled"); }',
      'Inside the enum: private final String label; OrderStatus(String label) { this.label = label; }',
      'public String getLabel() { return label; }'
    ],
    solution: `enum OrderStatus {\n    PENDING("Pending"),\n    PROCESSING("In Progress"),\n    SHIPPED("Shipped"),\n    DELIVERED("Delivered"),\n    CANCELLED("Cancelled");\n\n    private final String label;\n\n    OrderStatus(String label) {\n        this.label = label;\n    }\n\n    public String getLabel() {\n        return label;\n    }\n}\n\nclass Order {\n    private int id;\n    private OrderStatus status;\n\n    public Order(int id) {\n        this.id = id;\n        this.status = OrderStatus.PENDING;\n    }\n\n    public void updateStatus(OrderStatus newStatus) {\n        this.status = newStatus;\n        System.out.println("Order " + id + " is now: " + status.getLabel());\n    }\n\n    public static void main(String[] args) {\n        Order order = new Order(1001);\n        order.updateStatus(OrderStatus.PROCESSING);\n        order.updateStatus(OrderStatus.SHIPPED);\n        order.updateStatus(OrderStatus.DELIVERED);\n    }\n}`,
    explanation: 'Enums are type-safe constants. You can\'t accidentally pass "SHIPED" when the type is OrderStatus. Enums can have fields, constructors, and methods — they\'re full classes. In Spring, HttpStatus is an enum: HttpStatus.OK (200), HttpStatus.NOT_FOUND (404), HttpStatus.CREATED (201). You\'ll use enums in entities with @Enumerated and in switch expressions for business logic.'
  },

  {
    id: 'oc-008', worldId: 'oop-city', order: 8,
    title: 'Records — Modern Java DTOs',
    difficulty: 'medium', xpReward: 200, coinReward: 45, estimatedTime: 12,
    story: 'Every Spring API needs Data Transfer Objects (DTOs) — objects that carry data between layers. Java 16+ records give you immutable DTOs with zero boilerplate: no constructor, no getters, no toString, no equals/hashCode needed.',
    objective: 'Create UserRequest and UserResponse records. Show how records auto-generate constructors, accessors, toString, and equals. Use them like you would in a Spring controller.',
    starterCode: `// TODO: record UserRequest(String name, String email, int age)\n// TODO: record UserResponse(Long id, String name, String email)\n\n// Mapper class to convert between them\nclass UserMapper {\n    private long nextId = 1;\n\n    // TODO: UserResponse toResponse(UserRequest request)\n    // Assign an id, copy name and email\n\n    public static void main(String[] args) {\n        UserMapper mapper = new UserMapper();\n\n        UserRequest req = new UserRequest("Saket", "saket@corp.com", 25);\n        System.out.println("Request: " + req);\n        System.out.println("Name: " + req.name()); // accessor, not getName()\n\n        UserResponse res = mapper.toResponse(req);\n        System.out.println("Response: " + res);\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'UserRequest record', pattern: 'record\\s+UserRequest\\s*\\(', required: true },
        { name: 'UserResponse record', pattern: 'record\\s+UserResponse\\s*\\(', required: true },
        { name: 'toResponse method', pattern: 'UserResponse\\s+toResponse\\s*\\(', required: true },
        { name: 'accessor usage', pattern: 'req\\.(name|email|age)\\s*\\(\\s*\\)', required: true }
      ]
    },
    tests: [
      { name: 'Both records declared', visible: true,
        validate: (code) => {
          const req = /record\s+UserRequest\s*\(/.test(code);
          const res = /record\s+UserResponse\s*\(/.test(code);
          return { passed: req && res, message: 'Declare both record UserRequest(...) and record UserResponse(...)' };
        }
      },
      { name: 'Records have correct fields', visible: true,
        validate: (code) => {
          const hasName = /record\s+UserRequest\s*\([^)]*String\s+name/.test(code);
          const hasEmail = /record\s+UserRequest\s*\([^)]*String\s+email/.test(code);
          return { passed: hasName && hasEmail, message: 'UserRequest must have String name and String email fields' };
        }
      },
      { name: 'toResponse() maps the record', visible: true,
        validate: (code) => ({
          passed: /UserResponse\s+toResponse/.test(code) && /new\s+UserResponse\s*\(/.test(code),
          message: 'toResponse() should return new UserResponse(...)'
        })
      }
    ],
    hiddenTests: [
      { name: 'Accessors used (not getters)', visible: false,
        validate: (code) => ({ passed: /\.(name|email|age)\s*\(\s*\)/.test(code), message: 'Records use accessor methods: req.name() not req.getName()' })
      }
    ],
    hints: [
      'record UserRequest(String name, String email, int age) {} — that\'s the entire declaration',
      'record UserResponse(Long id, String name, String email) {}',
      'In toResponse: return new UserResponse(nextId++, request.name(), request.email());'
    ],
    solution: `record UserRequest(String name, String email, int age) {}\nrecord UserResponse(Long id, String name, String email) {}\n\nclass UserMapper {\n    private long nextId = 1;\n\n    public UserResponse toResponse(UserRequest request) {\n        return new UserResponse(nextId++, request.name(), request.email());\n    }\n\n    public static void main(String[] args) {\n        UserMapper mapper = new UserMapper();\n\n        UserRequest req = new UserRequest("Saket", "saket@corp.com", 25);\n        System.out.println("Request: " + req);\n        System.out.println("Name: " + req.name());\n\n        UserResponse res = mapper.toResponse(req);\n        System.out.println("Response: " + res);\n    }\n}`,
    explanation: 'Records are immutable data carriers. They auto-generate: compact constructor, accessor methods (name(), not getName()), toString(), equals(), hashCode(). In Spring REST APIs, you\'ll use records constantly for DTOs — request bodies, response bodies, projections. The REST API world already uses them in missions like ra-002 and ra-008.'
  },

  {
    id: 'oc-009', worldId: 'oop-city', order: 9,
    title: '🏆 Boss: Design the SpringCorp Model',
    difficulty: 'boss', xpReward: 400, coinReward: 120, estimatedTime: 25,
    story: '⚔️ BOSS CHALLENGE! The CTO has asked you to design the core domain model for SpringCorp\'s HR system. This requires every OOP skill you\'ve learned: classes, inheritance, interfaces, generics, enums, and records.',
    objective: 'Build: (1) Status enum with ACTIVE/INACTIVE, (2) Payable interface with getAnnualPay() method, (3) Employee base class implementing Payable, (4) Manager extends Employee with teamBonus, (5) generic Result<T> wrapper, (6) record EmployeeDTO for API responses.',
    starterCode: `// 1. TODO: enum Status { ACTIVE, INACTIVE }\n\n// 2. TODO: interface Payable { double getAnnualPay(); }\n\n// 3. TODO: class Employee implements Payable\n//    Fields: String name, double salary, Status status\n//    getAnnualPay() returns salary * 12\n\n// 4. TODO: class Manager extends Employee\n//    Extra field: double teamBonus\n//    Override getAnnualPay() to add teamBonus * 12\n\n// 5. TODO: generic class Result<T>\n//    Fields: boolean success, T data, String message\n\n// 6. TODO: record EmployeeDTO(String name, double annualPay, String status)\n\nclass Main {\n    public static void main(String[] args) {\n        Employee emp = new Employee("Alice", 5000, Status.ACTIVE);\n        Manager mgr = new Manager("Bob", 7000, Status.ACTIVE, 1000);\n\n        EmployeeDTO empDTO = new EmployeeDTO(emp.name, emp.getAnnualPay(), emp.status.name());\n        EmployeeDTO mgrDTO = new EmployeeDTO(mgr.name, mgr.getAnnualPay(), mgr.status.name());\n\n        Result<EmployeeDTO> result = new Result<>(true, empDTO, "Found");\n        System.out.println(result.success + ": " + result.data + " — " + result.message);\n        System.out.println("Manager annual pay: " + mgr.getAnnualPay());\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'Status enum', pattern: 'enum\\s+Status', required: true },
        { name: 'Payable interface', pattern: 'interface\\s+Payable', required: true },
        { name: 'Employee implements Payable', pattern: 'class\\s+Employee\\s+implements\\s+Payable', required: true },
        { name: 'Manager extends Employee', pattern: 'class\\s+Manager\\s+extends\\s+Employee', required: true },
        { name: 'Result<T> generic', pattern: 'class\\s+Result\\s*<\\s*T\\s*>', required: true },
        { name: 'EmployeeDTO record', pattern: 'record\\s+EmployeeDTO\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'All 6 components defined', visible: true,
        validate: (code) => {
          const checks = [
            /enum\s+Status/.test(code),
            /interface\s+Payable/.test(code),
            /class\s+Employee\s+implements\s+Payable/.test(code),
            /class\s+Manager\s+extends\s+Employee/.test(code),
            /class\s+Result\s*<\s*T\s*>/.test(code),
            /record\s+EmployeeDTO\s*\(/.test(code)
          ];
          const count = checks.filter(Boolean).length;
          return { passed: count === 6, actual: `${count}/6 components`, message: 'All 6 components required: enum, interface, Employee, Manager, Result<T>, record' };
        }
      },
      { name: 'Payable getAnnualPay() implemented', visible: true,
        validate: (code) => ({
          passed: /double\s+getAnnualPay\s*\(\s*\)/.test(code) && /return.*salary.*12|return.*12.*salary/.test(code),
          message: 'getAnnualPay() should return salary * 12'
        })
      },
      { name: 'Manager overrides getAnnualPay', visible: true,
        validate: (code) => ({
          passed: /class\s+Manager[\s\S]*?@Override[\s\S]*?getAnnualPay|@Override[\s\S]*?class\s+Manager/.test(code) || (code.indexOf('Manager') < code.lastIndexOf('getAnnualPay') && /teamBonus/.test(code)),
          message: 'Manager should override getAnnualPay() to include teamBonus'
        })
      },
      { name: 'Result<T> wraps EmployeeDTO', visible: true,
        validate: (code) => ({
          passed: /Result<EmployeeDTO>/.test(code),
          message: 'Use Result<EmployeeDTO> to wrap the response'
        })
      }
    ],
    hiddenTests: [
      { name: 'Inheritance chain is correct', visible: false,
        validate: (code) => ({
          passed: /class\s+Manager\s+extends\s+Employee/.test(code) && /super\s*\(/.test(code),
          message: 'Manager must extend Employee and call super() in constructor'
        })
      }
    ],
    hints: [
      'Start simple: enum Status first, then Payable interface, then Employee, then Manager with super().',
      'class Employee implements Payable { protected String name; protected double salary; protected Status status; }',
      'class Result<T> { boolean success; T data; String message; Result(boolean success, T data, String message) { ... } }'
    ],
    solution: `enum Status { ACTIVE, INACTIVE }\n\ninterface Payable {\n    double getAnnualPay();\n}\n\nclass Employee implements Payable {\n    protected String name;\n    protected double salary;\n    protected Status status;\n\n    public Employee(String name, double salary, Status status) {\n        this.name = name;\n        this.salary = salary;\n        this.status = status;\n    }\n\n    @Override\n    public double getAnnualPay() {\n        return salary * 12;\n    }\n}\n\nclass Manager extends Employee {\n    private double teamBonus;\n\n    public Manager(String name, double salary, Status status, double teamBonus) {\n        super(name, salary, status);\n        this.teamBonus = teamBonus;\n    }\n\n    @Override\n    public double getAnnualPay() {\n        return super.getAnnualPay() + (teamBonus * 12);\n    }\n}\n\nclass Result<T> {\n    boolean success;\n    T data;\n    String message;\n\n    Result(boolean success, T data, String message) {\n        this.success = success;\n        this.data = data;\n        this.message = message;\n    }\n}\n\nrecord EmployeeDTO(String name, double annualPay, String status) {}\n\nclass Main {\n    public static void main(String[] args) {\n        Employee emp = new Employee("Alice", 5000, Status.ACTIVE);\n        Manager mgr = new Manager("Bob", 7000, Status.ACTIVE, 1000);\n\n        EmployeeDTO empDTO = new EmployeeDTO(emp.name, emp.getAnnualPay(), emp.status.name());\n        EmployeeDTO mgrDTO = new EmployeeDTO(mgr.name, mgr.getAnnualPay(), mgr.status.name());\n\n        Result<EmployeeDTO> result = new Result<>(true, empDTO, "Found");\n        System.out.println(result.success + ": " + result.data + " — " + result.message);\n        System.out.println("Manager annual pay: " + mgr.getAnnualPay());\n    }\n}`,
    explanation: 'You just built a mini-domain model using every OOP tool. In real Spring apps: the enum becomes @Enumerated in a JPA entity, Payable becomes a service interface Spring injects, Employee becomes a JPA @Entity, Result<T> becomes ResponseEntity<T>, and EmployeeDTO becomes a REST response record. Every concept maps directly to production Spring code.'
  }
];
