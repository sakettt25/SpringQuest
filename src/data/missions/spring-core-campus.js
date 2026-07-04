export const SPRING_CORE_MISSIONS = [
  {
    id: 'sc-001', worldId: 'spring-core-campus', order: 1,
    title: 'What is Spring? The IoC Container',
    difficulty: 'easy', xpReward: 200, coinReward: 40, estimatedTime: 15,
    story: 'Welcome to Spring Core Campus! Before Spring, wiring a 50-class app required 500 lines of manual new() calls and passing objects everywhere. Spring\'s IoC (Inversion of Control) container does this wiring for you. You declare what you need; Spring creates and connects everything.',
    objective: 'Understand IoC by writing the "before Spring" version — manually wiring classes — then see how Spring\'s @Component and @Autowired replace it. Annotate classes and write a config that demonstrates the difference.',
    starterCode: `import org.springframework.stereotype.Component;\nimport org.springframework.beans.factory.annotation.Autowired;\n\n// Without Spring (OLD WAY - DON'T DO THIS)\nclass OldEmailService {\n    public void send(String to, String msg) {\n        System.out.println("Email to " + to + ": " + msg);\n    }\n}\n\nclass OldOrderService {\n    private OldEmailService emailService; // manually created!\n    public OldOrderService() {\n        this.emailService = new OldEmailService(); // tight coupling!\n    }\n    public void placeOrder(String customer) {\n        emailService.send(customer, "Your order is placed");\n    }\n}\n\n// WITH SPRING (NEW WAY)\n// TODO: @Component class EmailService with send(String to, String msg) method\n\n// TODO: @Component class OrderService\n//   - private EmailService emailService (NO new() call!)\n//   - Constructor that accepts EmailService (Spring injects it)\n//   - placeOrder(String customer) that calls emailService.send()\n\nclass Main {\n    public static void main(String[] args) {\n        // Old way: manual wiring\n        OldOrderService old = new OldOrderService();\n        old.placeOrder("Alice");\n\n        // With Spring: just declare your @Component classes above\n        // Spring creates them and injects dependencies automatically\n        System.out.println("With Spring, no new() calls needed in OrderService!");\n    }\n}`,
    requirements: {
      annotations: ['Component'],
      patterns: [
        { name: 'EmailService @Component', pattern: '@Component[\\s\\S]{0,50}class\\s+EmailService|class\\s+EmailService[\\s\\S]{0,200}@Component', required: true },
        { name: 'OrderService @Component', pattern: '@Component[\\s\\S]{0,50}class\\s+OrderService|class\\s+OrderService[\\s\\S]{0,200}@Component', required: true },
        { name: 'Constructor injection in OrderService', pattern: 'OrderService\\s*\\(\\s*EmailService', required: true },
        { name: 'No new EmailService in OrderService', pattern: 'new\\s+OldEmailService|new\\s+EmailService', required: false }
      ]
    },
    tests: [
      { name: '@Component on EmailService', visible: true,
        validate: (code) => {
          const hasAnnotation = /@Component[\s\S]{0,100}class\s+EmailService|class\s+EmailService/.test(code);
          const hasComp = /@Component/.test(code);
          return { passed: hasComp && /class\s+EmailService/.test(code), message: 'Add @Component above the EmailService class' };
        }
      },
      { name: '@Component on OrderService', visible: true,
        validate: (code) => ({
          passed: /@Component/.test(code) && /class\s+OrderService/.test(code),
          message: 'Add @Component above the OrderService class'
        })
      },
      { name: 'OrderService uses constructor injection', visible: true,
        validate: (code) => ({
          passed: /OrderService\s*\(\s*EmailService/.test(code),
          message: 'OrderService constructor should accept EmailService parameter — Spring injects it'
        })
      }
    ],
    hiddenTests: [
      { name: 'No new EmailService() inside OrderService', visible: false,
        validate: (code) => {
          const orderServiceSection = code.split('class OrderService')[1] || '';
          const hasNewEmail = /new\s+EmailService\s*\(/.test(orderServiceSection.split('class ')[0]);
          return { passed: !hasNewEmail, message: 'OrderService should NOT use new EmailService() — Spring handles it' };
        }
      }
    ],
    hints: [
      '@Component — place this annotation directly above a class declaration to register it as a Spring bean',
      'class OrderService { private EmailService emailService; public OrderService(EmailService emailService) { this.emailService = emailService; } }',
      'Spring sees @Component on both classes, creates them, detects the constructor dependency, and injects automatically — no new() needed'
    ],
    solution: `import org.springframework.stereotype.Component;\n\n// OLD WAY\nclass OldEmailService {\n    public void send(String to, String msg) {\n        System.out.println("Email to " + to + ": " + msg);\n    }\n}\nclass OldOrderService {\n    private OldEmailService emailService;\n    public OldOrderService() { this.emailService = new OldEmailService(); }\n    public void placeOrder(String customer) { emailService.send(customer, "Your order is placed"); }\n}\n\n// WITH SPRING\n@Component\nclass EmailService {\n    public void send(String to, String msg) {\n        System.out.println("Email to " + to + ": " + msg);\n    }\n}\n\n@Component\nclass OrderService {\n    private final EmailService emailService;\n\n    public OrderService(EmailService emailService) {\n        this.emailService = emailService; // Spring calls this constructor!\n    }\n\n    public void placeOrder(String customer) {\n        emailService.send(customer, "Your order is placed");\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        OldOrderService old = new OldOrderService();\n        old.placeOrder("Alice");\n        System.out.println("With Spring, no new() calls needed in OrderService!");\n    }\n}`,
    explanation: 'IoC (Inversion of Control) means: instead of YOUR code creating dependencies, you invert that control — you tell Spring what you need, and Spring creates and provides it. @Component marks a class as a Spring-managed bean. When Spring sees a constructor requiring EmailService, it finds the @Component EmailService bean and injects it. This is Dependency Injection (DI). The result: loosely coupled, testable, replaceable components.'
  },

  {
    id: 'sc-002', worldId: 'spring-core-campus', order: 2,
    title: '@Component, @Service, @Repository',
    difficulty: 'easy', xpReward: 200, coinReward: 40, estimatedTime: 12,
    story: '@Component is the generic bean annotation. But Spring provides semantic aliases: @Service for business logic, @Repository for data access, @Controller for web layer. Using the right stereotype makes code self-documenting and enables layer-specific features.',
    objective: 'Create a 3-layer architecture using the correct Spring stereotypes: @Repository for data access, @Service for business logic, @RestController for the web layer.',
    starterCode: `import org.springframework.stereotype.Repository;\nimport org.springframework.stereotype.Service;\nimport org.springframework.web.bind.annotation.RestController;\nimport org.springframework.web.bind.annotation.GetMapping;\n\nrecord User(Long id, String name, String email) {}\n\n// TODO: @Repository class UserRepository\n// Method: Optional<User> findById(Long id) — return Optional.of(new User(id, "Saket", "saket@corp.com")) if id == 1L\n// Method: List<User> findAll() — return list with 1 sample user\n\n// TODO: @Service class UserService\n// Inject UserRepository via constructor\n// Method: User getUser(Long id) — calls repo, orElseThrow with RuntimeException("User not found")\n// Method: List<User> getAllUsers() — returns all from repo\n\n// TODO: @RestController class UserController\n// Inject UserService via constructor\n// @GetMapping("/users") — calls service.getAllUsers()\n// @GetMapping("/users/{id}") — calls service.getUser(id)`,
    requirements: {
      annotations: ['Repository', 'Service', 'RestController'],
      patterns: [
        { name: 'UserRepository class', pattern: 'class\\s+UserRepository', required: true },
        { name: 'UserService class', pattern: 'class\\s+UserService', required: true },
        { name: 'UserController class', pattern: 'class\\s+UserController', required: true },
        { name: 'constructor injection', pattern: 'private\\s+final\\s+\\w+Repository|private\\s+final\\s+\\w+Service', required: true }
      ]
    },
    tests: [
      { name: '@Repository on UserRepository', visible: true,
        validate: (code) => ({
          passed: /@Repository[\s\S]{0,100}class\s+UserRepository|@Repository/.test(code) && /class\s+UserRepository/.test(code),
          message: 'Add @Repository above UserRepository class'
        })
      },
      { name: '@Service on UserService', visible: true,
        validate: (code) => ({
          passed: /@Service/.test(code) && /class\s+UserService/.test(code),
          message: 'Add @Service above UserService class'
        })
      },
      { name: '@RestController on UserController', visible: true,
        validate: (code) => ({
          passed: /@RestController/.test(code) && /class\s+UserController/.test(code),
          message: 'Add @RestController above UserController class'
        })
      },
      { name: 'Constructor injection throughout', visible: true,
        validate: (code) => ({
          passed: /private\s+final\s+\w+Repository/.test(code) && /private\s+final\s+\w+Service/.test(code),
          message: 'Use private final + constructor injection for UserRepository and UserService'
        })
      }
    ],
    hiddenTests: [
      { name: 'orElseThrow in service', visible: false,
        validate: (code) => ({ passed: /orElseThrow\s*\(/.test(code), message: 'UserService.getUser() should use orElseThrow()' })
      }
    ],
    hints: [
      '@Repository is for data layer — adds persistence exception translation. @Service is for business logic. @RestController = @Controller + @ResponseBody.',
      'class UserService { private final UserRepository repo; public UserService(UserRepository repo) { this.repo = repo; } }',
      'public User getUser(Long id) { return repo.findById(id).orElseThrow(() -> new RuntimeException("User not found")); }'
    ],
    solution: `import org.springframework.stereotype.Repository;\nimport org.springframework.stereotype.Service;\nimport org.springframework.web.bind.annotation.*;\nimport java.util.*;\n\nrecord User(Long id, String name, String email) {}\n\n@Repository\nclass UserRepository {\n    public Optional<User> findById(Long id) {\n        if (id == 1L) return Optional.of(new User(1L, "Saket", "saket@corp.com"));\n        return Optional.empty();\n    }\n    public List<User> findAll() {\n        return List.of(new User(1L, "Saket", "saket@corp.com"));\n    }\n}\n\n@Service\nclass UserService {\n    private final UserRepository repo;\n    public UserService(UserRepository repo) { this.repo = repo; }\n\n    public User getUser(Long id) {\n        return repo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));\n    }\n    public List<User> getAllUsers() { return repo.findAll(); }\n}\n\n@RestController\nclass UserController {\n    private final UserService service;\n    public UserController(UserService service) { this.service = service; }\n\n    @GetMapping("/users")\n    public List<User> getAll() { return service.getAllUsers(); }\n\n    @GetMapping("/users/{id}")\n    public User getById(@PathVariable Long id) { return service.getUser(id); }\n}`,
    explanation: '@Component, @Service, @Repository, @Controller/@RestController are all equivalent as bean declarations — Spring treats them identically for DI. But they communicate intent to developers and enable layer-specific features: @Repository translates database exceptions into Spring\'s DataAccessException hierarchy. Always use the correct stereotype for your layer.'
  },

  {
    id: 'sc-003', worldId: 'spring-core-campus', order: 3,
    title: 'Constructor Injection — The Right Way',
    difficulty: 'medium', xpReward: 220, coinReward: 45, estimatedTime: 14,
    story: 'There are 3 ways to inject in Spring: field (@Autowired on field), setter, and constructor. Constructor injection is the ONLY correct way for production code. Why? Immutability, mandatory dependencies, testability without a Spring context.',
    objective: 'Refactor a class using field injection to use constructor injection. Demonstrate testing without Spring by calling the constructor directly.',
    starterCode: `import org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.stereotype.Service;\n\n// BAD: Field injection — DO NOT DO IN PRODUCTION\n@Service\nclass BadPaymentService {\n    @Autowired\n    private EmailService emailService; // Cannot test without Spring!\n\n    @Autowired\n    private AuditLogger auditLogger; // Cannot make final!\n\n    public void processPayment(String orderId, double amount) {\n        System.out.println("Processing $" + amount + " for order " + orderId);\n        emailService.send("customer@corp.com", "Payment processed");\n        auditLogger.log("Payment: " + orderId + " = $" + amount);\n    }\n}\n\n@Service\nclass EmailService {\n    public void send(String to, String msg) { System.out.println("Email: " + msg); }\n}\n\n@Service\nclass AuditLogger {\n    public void log(String event) { System.out.println("AUDIT: " + event); }\n}\n\n// TODO: Create GoodPaymentService using CONSTRUCTOR injection\n// - private final EmailService emailService (immutable!)\n// - private final AuditLogger auditLogger (immutable!)\n// - Constructor accepting both dependencies\n// - Same processPayment() method\n// - Demonstrate in main: create without Spring using new GoodPaymentService(new EmailService(), new AuditLogger())\n\nclass Main {\n    public static void main(String[] args) {\n        // TODO: Create GoodPaymentService manually (no Spring needed for tests!)\n        // Call processPayment(\"ORD-001\", 299.99)\n    }\n}`,
    requirements: {
      annotations: ['Service'],
      patterns: [
        { name: 'GoodPaymentService class', pattern: 'class\\s+GoodPaymentService', required: true },
        { name: 'private final EmailService', pattern: 'private\\s+final\\s+EmailService', required: true },
        { name: 'private final AuditLogger', pattern: 'private\\s+final\\s+AuditLogger', required: true },
        { name: 'constructor with both params', pattern: 'GoodPaymentService\\s*\\(\\s*EmailService', required: true },
        { name: 'new GoodPaymentService in main', pattern: 'new\\s+GoodPaymentService\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'GoodPaymentService has private final fields', visible: true,
        validate: (code) => {
          const email = /private\s+final\s+EmailService/.test(code);
          const audit = /private\s+final\s+AuditLogger/.test(code);
          return { passed: email && audit, message: 'Declare: private final EmailService emailService; private final AuditLogger auditLogger;' };
        }
      },
      { name: 'Constructor accepts both dependencies', visible: true,
        validate: (code) => ({
          passed: /GoodPaymentService\s*\(\s*EmailService\s+\w+\s*,\s*AuditLogger/.test(code),
          message: 'Constructor: GoodPaymentService(EmailService emailService, AuditLogger auditLogger)'
        })
      },
      { name: 'Created manually in main (testability demo)', visible: true,
        validate: (code) => ({
          passed: /new\s+GoodPaymentService\s*\(\s*new\s+EmailService/.test(code),
          message: 'In main: new GoodPaymentService(new EmailService(), new AuditLogger()) — no Spring needed!'
        })
      }
    ],
    hiddenTests: [
      { name: 'No @Autowired on fields in GoodPaymentService', visible: false,
        validate: (code) => {
          const goodSection = code.split('GoodPaymentService')[1] || '';
          const classBody = goodSection.split(/class\s+\w+/)[0] || '';
          return { passed: !/@Autowired[\s\S]{0,50}(emailService|auditLogger)/.test(classBody), message: 'GoodPaymentService must NOT use @Autowired on fields' };
        }
      }
    ],
    hints: [
      '@Service class GoodPaymentService { private final EmailService emailService; private final AuditLogger auditLogger; }',
      'public GoodPaymentService(EmailService emailService, AuditLogger auditLogger) { this.emailService = emailService; this.auditLogger = auditLogger; }',
      'In main: GoodPaymentService svc = new GoodPaymentService(new EmailService(), new AuditLogger()); svc.processPayment("ORD-001", 299.99);'
    ],
    solution: `import org.springframework.stereotype.Service;\n\n@Service\nclass EmailService {\n    public void send(String to, String msg) { System.out.println("Email: " + msg); }\n}\n\n@Service\nclass AuditLogger {\n    public void log(String event) { System.out.println("AUDIT: " + event); }\n}\n\n@Service\nclass GoodPaymentService {\n    private final EmailService emailService;\n    private final AuditLogger auditLogger;\n\n    public GoodPaymentService(EmailService emailService, AuditLogger auditLogger) {\n        this.emailService = emailService;\n        this.auditLogger = auditLogger;\n    }\n\n    public void processPayment(String orderId, double amount) {\n        System.out.println("Processing $" + amount + " for order " + orderId);\n        emailService.send("customer@corp.com", "Payment processed");\n        auditLogger.log("Payment: " + orderId + " = $" + amount);\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        GoodPaymentService svc = new GoodPaymentService(new EmailService(), new AuditLogger());\n        svc.processPayment("ORD-001", 299.99);\n    }\n}`,
    explanation: 'Constructor injection advantages: (1) Fields can be final — immutable after construction. (2) Dependencies are explicit — you SEE them in the constructor signature. (3) You can test without Spring: just call new GoodPaymentService(mockEmail, mockAudit). Field injection hides dependencies and makes unit testing painful. Spring 4.3+: if a class has ONE constructor, @Autowired is optional — Spring auto-injects it.'
  },

  {
    id: 'sc-004', worldId: 'spring-core-campus', order: 4,
    title: '@Configuration & @Bean — Manual Bean Registration',
    difficulty: 'medium', xpReward: 230, coinReward: 48, estimatedTime: 15,
    story: 'Sometimes you can\'t annotate a class with @Component — for example, third-party library classes, or when you need different instances with different configs. @Configuration + @Bean lets you manually register any object as a Spring bean.',
    objective: 'Create a @Configuration class with @Bean methods for an HttpClient, a RestTemplate-like object, and an ObjectMapper-like converter with custom configuration.',
    starterCode: `import org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\n\n// Simulated third-party classes (cannot add @Component to these)\nclass HttpClient {\n    private final int timeout;\n    private final int maxConnections;\n    public HttpClient(int timeout, int maxConnections) {\n        this.timeout = timeout;\n        this.maxConnections = maxConnections;\n    }\n    public String getConfig() {\n        return "HttpClient[timeout=" + timeout + ", maxConn=" + maxConnections + "]";\n    }\n}\n\nclass JsonConverter {\n    private final boolean prettyPrint;\n    private final boolean ignoreNulls;\n    public JsonConverter(boolean prettyPrint, boolean ignoreNulls) {\n        this.prettyPrint = prettyPrint;\n        this.ignoreNulls = ignoreNulls;\n    }\n    public String getConfig() {\n        return "JsonConverter[prettyPrint=" + prettyPrint + ", ignoreNulls=" + ignoreNulls + "]";\n    }\n}\n\n// TODO: @Configuration class AppConfig\n// TODO: @Bean HttpClient httpClient() — timeout=30, maxConnections=100\n// TODO: @Bean JsonConverter jsonConverter() — prettyPrint=true, ignoreNulls=true\n\nclass Main {\n    public static void main(String[] args) {\n        // Simulating Spring's container loading the config\n        AppConfig config = new AppConfig();\n        HttpClient client = config.httpClient();\n        JsonConverter converter = config.jsonConverter();\n        System.out.println(client.getConfig());\n        System.out.println(converter.getConfig());\n    }\n}`,
    requirements: {
      annotations: ['Configuration', 'Bean'],
      patterns: [
        { name: 'AppConfig class', pattern: 'class\\s+AppConfig', required: true },
        { name: 'httpClient @Bean', pattern: 'HttpClient\\s+httpClient\\s*\\(\\s*\\)', required: true },
        { name: 'jsonConverter @Bean', pattern: 'JsonConverter\\s+jsonConverter\\s*\\(\\s*\\)', required: true },
        { name: 'returns new instance', pattern: 'return\\s+new\\s+HttpClient|return\\s+new\\s+JsonConverter', required: true }
      ]
    },
    tests: [
      { name: '@Configuration on AppConfig', visible: true,
        validate: (code) => ({
          passed: /@Configuration/.test(code) && /class\s+AppConfig/.test(code),
          message: 'Add @Configuration above AppConfig class'
        })
      },
      { name: '@Bean methods for both classes', visible: true,
        validate: (code) => {
          const h = /@Bean[\s\S]{0,50}HttpClient\s+httpClient/.test(code);
          const j = /@Bean[\s\S]{0,50}JsonConverter\s+jsonConverter/.test(code);
          return { passed: h && j, message: 'Add @Bean above both httpClient() and jsonConverter() methods' };
        }
      },
      { name: 'Beans configured with right values', visible: true,
        validate: (code) => {
          const timeout = /30/.test(code);
          const maxConn = /100/.test(code);
          return { passed: timeout && maxConn, message: 'Configure HttpClient with timeout=30 and maxConnections=100' };
        }
      }
    ],
    hiddenTests: [
      { name: 'Both beans instantiated in main', visible: false,
        validate: (code) => ({
          passed: /config\.httpClient\s*\(\s*\)/.test(code) && /config\.jsonConverter\s*\(\s*\)/.test(code),
          message: 'Call config.httpClient() and config.jsonConverter() in main'
        })
      }
    ],
    hints: [
      '@Configuration class AppConfig { ... }',
      '@Bean public HttpClient httpClient() { return new HttpClient(30, 100); }',
      '@Bean public JsonConverter jsonConverter() { return new JsonConverter(true, true); }'
    ],
    solution: `import org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\n\nclass HttpClient {\n    private final int timeout;\n    private final int maxConnections;\n    public HttpClient(int timeout, int maxConnections) { this.timeout = timeout; this.maxConnections = maxConnections; }\n    public String getConfig() { return "HttpClient[timeout=" + timeout + ", maxConn=" + maxConnections + "]"; }\n}\n\nclass JsonConverter {\n    private final boolean prettyPrint;\n    private final boolean ignoreNulls;\n    public JsonConverter(boolean prettyPrint, boolean ignoreNulls) { this.prettyPrint = prettyPrint; this.ignoreNulls = ignoreNulls; }\n    public String getConfig() { return "JsonConverter[prettyPrint=" + prettyPrint + ", ignoreNulls=" + ignoreNulls + "]"; }\n}\n\n@Configuration\nclass AppConfig {\n    @Bean\n    public HttpClient httpClient() {\n        return new HttpClient(30, 100);\n    }\n\n    @Bean\n    public JsonConverter jsonConverter() {\n        return new JsonConverter(true, true);\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        AppConfig config = new AppConfig();\n        HttpClient client = config.httpClient();\n        JsonConverter converter = config.jsonConverter();\n        System.out.println(client.getConfig());\n        System.out.println(converter.getConfig());\n    }\n}`,
    explanation: '@Configuration marks a class as a source of bean definitions. @Bean on a method tells Spring: call this method, take the returned object, register it as a bean with the method name as the bean name. Use @Configuration+@Bean for: third-party classes, beans needing complex initialization, beans needing conditional logic. In Spring Boot, this is how DataSource, ObjectMapper, RestTemplate, SecurityFilterChain, etc. are configured.'
  },

  {
    id: 'sc-005', worldId: 'spring-core-campus', order: 5,
    title: '@Qualifier & @Primary — Resolving Ambiguity',
    difficulty: 'medium', xpReward: 235, coinReward: 48, estimatedTime: 15,
    story: 'The payment system needs two payment processors: Stripe for online, PayPal for recurring. Both implement PaymentProcessor. Spring panics when it sees two beans of the same type and one injection point. @Primary and @Qualifier resolve this ambiguity.',
    objective: 'Create a PaymentProcessor interface with 2 implementations. Use @Primary to mark the default. Use @Qualifier to inject a specific one in a third class.',
    starterCode: `import org.springframework.beans.factory.annotation.Qualifier;\nimport org.springframework.context.annotation.Primary;\nimport org.springframework.stereotype.Component;\nimport org.springframework.stereotype.Service;\n\ninterface PaymentProcessor {\n    String processPayment(double amount);\n    String getName();\n}\n\n// TODO: @Component @Primary class StripeProcessor implements PaymentProcessor\n// processPayment returns "Stripe charged $[amount]"\n// getName returns "Stripe"\n\n// TODO: @Component @Qualifier("paypal") class PayPalProcessor implements PaymentProcessor\n// processPayment returns "PayPal charged $[amount]"\n// getName returns "PayPal"\n\n// TODO: @Service class CheckoutService\n// Inject DEFAULT (Stripe) processor via constructor — no @Qualifier needed, @Primary handles it\n// Method: checkout(double amount) — calls processor.processPayment(amount) and prints result\n\n// TODO: @Service class SubscriptionService\n// Inject PAYPAL processor specifically using @Qualifier(\"paypal\")\n// Method: subscribe(double amount) — calls processor.processPayment(amount) and prints result\n\nclass Main {\n    public static void main(String[] args) {\n        // Simulating injection\n        PaymentProcessor stripe = new StripeProcessor();\n        PaymentProcessor paypal = new PayPalProcessor();\n        CheckoutService checkout = new CheckoutService(stripe);\n        SubscriptionService subscription = new SubscriptionService(paypal);\n        checkout.checkout(99.99);\n        subscription.subscribe(9.99);\n    }\n}`,
    requirements: {
      annotations: ['Primary', 'Qualifier', 'Component', 'Service'],
      patterns: [
        { name: 'StripeProcessor with @Primary', pattern: '@Primary[\\s\\S]{0,50}class\\s+StripeProcessor|class\\s+StripeProcessor[\\s\\S]{0,200}@Primary', required: true },
        { name: 'PayPalProcessor with @Qualifier', pattern: '@Qualifier[\\s\\S]{0,50}class\\s+PayPalProcessor|class\\s+PayPalProcessor', required: true },
        { name: 'CheckoutService exists', pattern: 'class\\s+CheckoutService', required: true },
        { name: 'SubscriptionService exists', pattern: 'class\\s+SubscriptionService', required: true }
      ]
    },
    tests: [
      { name: '@Primary on StripeProcessor', visible: true,
        validate: (code) => ({
          passed: /@Primary/.test(code) && /class\s+StripeProcessor/.test(code),
          message: 'Add @Primary to StripeProcessor to make it the default PaymentProcessor bean'
        })
      },
      { name: '@Qualifier on PayPalProcessor', visible: true,
        validate: (code) => ({
          passed: /@Qualifier\s*\(\s*["']paypal["']\s*\)/.test(code) && /class\s+PayPalProcessor/.test(code),
          message: 'Add @Qualifier("paypal") to PayPalProcessor'
        })
      },
      { name: 'Both service classes exist', visible: true,
        validate: (code) => {
          const checkout = /class\s+CheckoutService/.test(code);
          const sub = /class\s+SubscriptionService/.test(code);
          return { passed: checkout && sub, message: 'Create both CheckoutService and SubscriptionService' };
        }
      }
    ],
    hiddenTests: [
      { name: 'Both implement PaymentProcessor', visible: false,
        validate: (code) => {
          const stripe = /class\s+StripeProcessor\s+implements\s+PaymentProcessor/.test(code);
          const paypal = /class\s+PayPalProcessor\s+implements\s+PaymentProcessor/.test(code);
          return { passed: stripe && paypal, message: 'Both processors must implement PaymentProcessor' };
        }
      }
    ],
    hints: [
      '@Primary @Component class StripeProcessor implements PaymentProcessor { ... }',
      '@Component @Qualifier("paypal") class PayPalProcessor implements PaymentProcessor { ... }',
      'SubscriptionService constructor: public SubscriptionService(@Qualifier("paypal") PaymentProcessor processor) { this.processor = processor; }'
    ],
    solution: `import org.springframework.beans.factory.annotation.Qualifier;\nimport org.springframework.context.annotation.Primary;\nimport org.springframework.stereotype.Component;\nimport org.springframework.stereotype.Service;\n\ninterface PaymentProcessor {\n    String processPayment(double amount);\n    String getName();\n}\n\n@Primary\n@Component\nclass StripeProcessor implements PaymentProcessor {\n    public String processPayment(double amount) { return "Stripe charged $" + amount; }\n    public String getName() { return "Stripe"; }\n}\n\n@Component\n@Qualifier("paypal")\nclass PayPalProcessor implements PaymentProcessor {\n    public String processPayment(double amount) { return "PayPal charged $" + amount; }\n    public String getName() { return "PayPal"; }\n}\n\n@Service\nclass CheckoutService {\n    private final PaymentProcessor processor;\n    public CheckoutService(PaymentProcessor processor) { this.processor = processor; } // gets Stripe via @Primary\n    public void checkout(double amount) { System.out.println(processor.processPayment(amount)); }\n}\n\n@Service\nclass SubscriptionService {\n    private final PaymentProcessor processor;\n    public SubscriptionService(@Qualifier("paypal") PaymentProcessor processor) { this.processor = processor; }\n    public void subscribe(double amount) { System.out.println(processor.processPayment(amount)); }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        StripeProcessor stripe = new StripeProcessor();\n        PayPalProcessor paypal = new PayPalProcessor();\n        new CheckoutService(stripe).checkout(99.99);\n        new SubscriptionService(paypal).subscribe(9.99);\n    }\n}`,
    explanation: 'When Spring finds 2 beans of the same type (PaymentProcessor), it throws NoUniqueBeanDefinitionException. @Primary marks one as the default when no qualifier is specified. @Qualifier("name") overrides the default — inject THIS specific bean. In production: @Primary for the most common impl, @Qualifier when you need a specific one. Pattern: interface + @Primary impl + @Qualifier alternatives.'
  },

  {
    id: 'sc-006', worldId: 'spring-core-campus', order: 6,
    title: 'Bean Lifecycle — @PostConstruct & @PreDestroy',
    difficulty: 'medium', xpReward: 235, coinReward: 50, estimatedTime: 14,
    story: 'A database connection pool needs warming up on startup, and the Kafka consumer needs graceful shutdown. Spring\'s @PostConstruct runs YOUR code right after the bean is constructed, before it\'s used. @PreDestroy runs before the bean is destroyed.',
    objective: 'Create a CacheService that preloads data on startup with @PostConstruct, and flushes/saves on shutdown with @PreDestroy. Log each lifecycle phase.',
    starterCode: `import jakarta.annotation.PostConstruct;\nimport jakarta.annotation.PreDestroy;\nimport org.springframework.stereotype.Service;\nimport java.util.*;\n\n// TODO: @Service class CacheService\n// Field: Map<String, String> cache = new HashMap<>()\n// Field: boolean initialized = false\n//\n// TODO: @PostConstruct void init()\n//   - Set initialized = true\n//   - Load 3 default entries into cache (e.g., "config.timeout" -> "30s")\n//   - Print "CacheService initialized with [size] entries"\n//\n// TODO: String get(String key) - return cache.getOrDefault(key, "NOT_FOUND")\n// TODO: void put(String key, String value) - add to cache\n//\n// TODO: @PreDestroy void cleanup()\n//   - Print "CacheService shutting down, saving [size] cache entries"\n//   - Clear the cache\n//   - Set initialized = false\n\nclass Main {\n    public static void main(String[] args) {\n        CacheService cache = new CacheService();\n        cache.init(); // Spring calls this after construction\n        System.out.println("timeout: " + cache.get("config.timeout"));\n        cache.put("user.session.123", "Alice");\n        System.out.println("session: " + cache.get("user.session.123"));\n        cache.cleanup(); // Spring calls this before shutdown\n    }\n}`,
    requirements: {
      annotations: ['Service', 'PostConstruct', 'PreDestroy'],
      patterns: [
        { name: 'CacheService class', pattern: 'class\\s+CacheService', required: true },
        { name: 'cache Map field', pattern: 'Map<String,\\s*String>\\s+cache|HashMap<String,\\s*String>', required: true },
        { name: 'init method', pattern: 'void\\s+init\\s*\\(\\s*\\)', required: true },
        { name: 'cleanup method', pattern: 'void\\s+cleanup\\s*\\(\\s*\\)', required: true }
      ]
    },
    tests: [
      { name: '@PostConstruct on init()', visible: true,
        validate: (code) => ({
          passed: /@PostConstruct/.test(code) && /void\s+init\s*\(\s*\)/.test(code),
          message: 'Add @PostConstruct above the init() method'
        })
      },
      { name: '@PreDestroy on cleanup()', visible: true,
        validate: (code) => ({
          passed: /@PreDestroy/.test(code) && /void\s+cleanup\s*\(\s*\)/.test(code),
          message: 'Add @PreDestroy above the cleanup() method'
        })
      },
      { name: 'init() preloads cache entries', visible: true,
        validate: (code) => {
          const hasInit = /void\s+init/.test(code);
          const hasLoad = /cache\.put\s*\(/.test(code);
          return { passed: hasInit && hasLoad, message: 'init() should put default entries into the cache' };
        }
      },
      { name: 'cleanup() clears cache', visible: true,
        validate: (code) => ({
          passed: /cache\.clear\s*\(\s*\)/.test(code),
          message: 'cleanup() should call cache.clear()'
        })
      }
    ],
    hiddenTests: [
      { name: 'initialized flag used', visible: false,
        validate: (code) => ({ passed: /initialized/.test(code), message: 'Track initialization state with a boolean field' })
      }
    ],
    hints: [
      '@PostConstruct public void init() { initialized = true; cache.put("config.timeout", "30s"); cache.put("config.maxRetry", "3"); System.out.println("CacheService initialized with " + cache.size() + " entries"); }',
      '@PreDestroy public void cleanup() { System.out.println("Saving " + cache.size() + " entries"); cache.clear(); initialized = false; }',
      'Spring calls init() AFTER the constructor completes. Spring calls cleanup() before the application context closes.'
    ],
    solution: `import jakarta.annotation.PostConstruct;\nimport jakarta.annotation.PreDestroy;\nimport org.springframework.stereotype.Service;\nimport java.util.*;\n\n@Service\nclass CacheService {\n    private final Map<String, String> cache = new HashMap<>();\n    private boolean initialized = false;\n\n    @PostConstruct\n    public void init() {\n        initialized = true;\n        cache.put("config.timeout", "30s");\n        cache.put("config.maxRetry", "3");\n        cache.put("config.version", "v2.1");\n        System.out.println("CacheService initialized with " + cache.size() + " entries");\n    }\n\n    public String get(String key) {\n        return cache.getOrDefault(key, "NOT_FOUND");\n    }\n\n    public void put(String key, String value) {\n        cache.put(key, value);\n    }\n\n    @PreDestroy\n    public void cleanup() {\n        System.out.println("CacheService shutting down, saving " + cache.size() + " cache entries");\n        cache.clear();\n        initialized = false;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        CacheService cache = new CacheService();\n        cache.init();\n        System.out.println("timeout: " + cache.get("config.timeout"));\n        cache.put("user.session.123", "Alice");\n        System.out.println("session: " + cache.get("user.session.123"));\n        cache.cleanup();\n    }\n}`,
    explanation: 'Spring bean lifecycle: Constructor → @PostConstruct → bean is ready → application runs → @PreDestroy → bean destroyed. Use @PostConstruct for: warming up caches, opening connections, registering listeners, validating config. Use @PreDestroy for: flushing buffers, closing connections, deregistering from service discovery. Never put startup logic in the constructor — Spring might not have finished injection yet.'
  },

  {
    id: 'sc-007', worldId: 'spring-core-campus', order: 7,
    title: '@Value — Injecting Configuration',
    difficulty: 'medium', xpReward: 225, coinReward: 47, estimatedTime: 13,
    story: 'Hardcoding timeouts, URLs, and secrets in Java source code is a cardinal sin. You\'d have to recompile to change them, and secrets would end up in git. @Value reads from application.yml / application.properties at startup — change config, restart, no recompile.',
    objective: 'Use @Value to inject configuration into a service — strings, integers, booleans, and SpEL expressions. Show default values for missing properties.',
    starterCode: `import org.springframework.beans.factory.annotation.Value;\nimport org.springframework.stereotype.Service;\n\n// TODO: @Service class AppConfigService\n// Inject these values using @Value:\n//   @Value("\${app.name}") String appName\n//   @Value("\${server.port:8080}") int serverPort  (default 8080)\n//   @Value("\${app.debug:false}") boolean debugMode\n//   @Value("\${app.max-connections:100}") int maxConnections\n//   @Value("#{\${app.timeout:30} * 1000}") long timeoutMs  (SpEL: multiply by 1000)\n//\n// Method: printConfig() — print all 5 values with labels\n\nclass Main {\n    public static void main(String[] args) {\n        // Simulating @Value injection manually\n        AppConfigService config = new AppConfigService();\n        // Set the values that @Value would inject from application.yml\n        config.appName = "SpringQuest";\n        config.serverPort = 9090;\n        config.debugMode = true;\n        config.maxConnections = 200;\n        config.timeoutMs = 30000L;\n        config.printConfig();\n    }\n}`,
    requirements: {
      annotations: ['Service', 'Value'],
      patterns: [
        { name: 'AppConfigService class', pattern: 'class\\s+AppConfigService', required: true },
        { name: '@Value on appName', pattern: '@Value\\s*\\(\\s*"\\$\\{app\\.name', required: true },
        { name: '@Value with default', pattern: '@Value\\s*\\(\\s*"\\$\\{.*:\\s*\\d', required: true },
        { name: 'printConfig method', pattern: 'void\\s+printConfig\\s*\\(\\s*\\)', required: true }
      ]
    },
    tests: [
      { name: '@Value on at least 3 fields', visible: true,
        validate: (code) => {
          const count = (code.match(/@Value\s*\(/g) || []).length;
          return { passed: count >= 3, actual: `${count} @Value annotations`, message: 'Add @Value on at least 3 fields' };
        }
      },
      { name: 'Default value syntax used', visible: true,
        validate: (code) => ({
          passed: /@Value\s*\(\s*"\$\{[^}]+:\s*\w/.test(code),
          message: 'Use default value syntax: @Value("${property:default}")'
        })
      },
      { name: 'printConfig() exists and prints', visible: true,
        validate: (code) => ({
          passed: /void\s+printConfig\s*\(\s*\)/.test(code) && /System\.out\.println/.test(code),
          message: 'printConfig() must print all configuration values'
        })
      }
    ],
    hiddenTests: [
      { name: 'SpEL expression used', visible: false,
        validate: (code) => ({ passed: /@Value\s*\(\s*"#\{/.test(code), message: 'Use Spring Expression Language (SpEL): @Value("#{...}")' })
      }
    ],
    hints: [
      '@Value("${app.name}") public String appName; — reads app.name from application.yml',
      '@Value("${server.port:8080}") public int serverPort; — uses 8080 if property not set',
      '@Value("#{${app.timeout:30} * 1000}") public long timeoutMs; — SpEL expression multiplies value by 1000'
    ],
    solution: `import org.springframework.beans.factory.annotation.Value;\nimport org.springframework.stereotype.Service;\n\n@Service\nclass AppConfigService {\n    @Value("\${app.name}")\n    public String appName;\n\n    @Value("\${server.port:8080}")\n    public int serverPort;\n\n    @Value("\${app.debug:false}")\n    public boolean debugMode;\n\n    @Value("\${app.max-connections:100}")\n    public int maxConnections;\n\n    @Value("#{\${app.timeout:30} * 1000}")\n    public long timeoutMs;\n\n    public void printConfig() {\n        System.out.println("App Name: " + appName);\n        System.out.println("Server Port: " + serverPort);\n        System.out.println("Debug Mode: " + debugMode);\n        System.out.println("Max Connections: " + maxConnections);\n        System.out.println("Timeout (ms): " + timeoutMs);\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        AppConfigService config = new AppConfigService();\n        config.appName = "SpringQuest";\n        config.serverPort = 9090;\n        config.debugMode = true;\n        config.maxConnections = 200;\n        config.timeoutMs = 30000L;\n        config.printConfig();\n    }\n}`,
    explanation: '@Value("${property}") injects a single property. Syntax: @Value("${property:default}") for defaults. @Value("#{SpEL}") for Spring Expression Language (math, conditionals, bean references). Prefer @ConfigurationProperties for groups of related config — cleaner than many @Value fields. NEVER @Value a password into a field; use Spring Cloud Config or environment variables.'
  },

  {
    id: 'sc-008', worldId: 'spring-core-campus', order: 8,
    title: 'Spring Events — Decoupled Communication',
    difficulty: 'hard', xpReward: 280, coinReward: 60, estimatedTime: 18,
    story: 'When a user registers: send a welcome email, create a profile record, and log to analytics. If you call all three directly from RegisterService, adding a 4th action means editing RegisterService. Spring Events let you publish ONE event; multiple listeners react independently.',
    objective: 'Create a UserRegisteredEvent, publish it from UserService, and have two independent @EventListener classes react to it.',
    starterCode: `import org.springframework.context.ApplicationEvent;\nimport org.springframework.context.ApplicationEventPublisher;\nimport org.springframework.context.event.EventListener;\nimport org.springframework.stereotype.Component;\nimport org.springframework.stereotype.Service;\n\n// TODO: class UserRegisteredEvent extends ApplicationEvent\n// Fields: String username, String email\n// Constructor: super(source) + assign fields\n// Getters for username and email\n\n// TODO: @Service class UserService\n// Inject ApplicationEventPublisher via constructor\n// Method: register(String username, String email)\n//   - Print "Registering user: [username]"\n//   - Publish new UserRegisteredEvent(this, username, email)\n\n// TODO: @Component class EmailListener\n// @EventListener method onUserRegistered(UserRegisteredEvent event)\n//   - Print "Welcome email sent to: [event.getEmail()]"\n\n// TODO: @Component class AnalyticsListener\n// @EventListener method onUserRegistered(UserRegisteredEvent event)\n//   - Print "Analytics: new signup - [event.getUsername()]"\n\nclass Main {\n    public static void main(String[] args) {\n        // Simulating Spring's event system\n        UserRegisteredEvent event = null;\n        EmailListener emailL = new EmailListener();\n        AnalyticsListener analyticsL = new AnalyticsListener();\n\n        UserService svc = new UserService(e -> {\n            event.equals(e); // Spring calls all listeners\n            emailL.onUserRegistered((UserRegisteredEvent) e);\n            analyticsL.onUserRegistered((UserRegisteredEvent) e);\n        });\n        svc.register("saket", "saket@corp.com");\n    }\n}`,
    requirements: {
      annotations: ['Service', 'Component', 'EventListener'],
      patterns: [
        { name: 'UserRegisteredEvent extends ApplicationEvent', pattern: 'class\\s+UserRegisteredEvent\\s+extends\\s+ApplicationEvent', required: true },
        { name: 'ApplicationEventPublisher field', pattern: 'ApplicationEventPublisher', required: true },
        { name: 'publishEvent call', pattern: '\\.publishEvent\\s*\\(', required: true },
        { name: 'EmailListener with @EventListener', pattern: 'class\\s+EmailListener', required: true },
        { name: 'AnalyticsListener with @EventListener', pattern: 'class\\s+AnalyticsListener', required: true }
      ]
    },
    tests: [
      { name: 'UserRegisteredEvent extends ApplicationEvent', visible: true,
        validate: (code) => ({
          passed: /class\s+UserRegisteredEvent\s+extends\s+ApplicationEvent/.test(code),
          message: 'class UserRegisteredEvent extends ApplicationEvent { ... }'
        })
      },
      { name: 'Event published with publishEvent()', visible: true,
        validate: (code) => ({
          passed: /\.publishEvent\s*\(/.test(code) && /new\s+UserRegisteredEvent/.test(code),
          message: 'publisher.publishEvent(new UserRegisteredEvent(this, username, email))'
        })
      },
      { name: '@EventListener on both listener methods', visible: true,
        validate: (code) => {
          const count = (code.match(/@EventListener/g) || []).length;
          return { passed: count >= 2, actual: `${count} @EventListener`, message: 'Add @EventListener to methods in both EmailListener and AnalyticsListener' };
        }
      }
    ],
    hiddenTests: [
      { name: 'Event has username and email fields', visible: false,
        validate: (code) => {
          const hasUser = /String\s+username/.test(code);
          const hasEmail = /String\s+email/.test(code);
          return { passed: hasUser && hasEmail, message: 'UserRegisteredEvent needs String username and String email fields' };
        }
      }
    ],
    hints: [
      'class UserRegisteredEvent extends ApplicationEvent { private final String username; private final String email; public UserRegisteredEvent(Object source, String username, String email) { super(source); this.username = username; this.email = email; } }',
      '@Service class UserService { private final ApplicationEventPublisher publisher; ... publisher.publishEvent(new UserRegisteredEvent(this, username, email)); }',
      '@Component class EmailListener { @EventListener public void onUserRegistered(UserRegisteredEvent e) { System.out.println("Welcome email sent to: " + e.getEmail()); } }'
    ],
    solution: `import org.springframework.context.ApplicationEvent;\nimport org.springframework.context.ApplicationEventPublisher;\nimport org.springframework.context.event.EventListener;\nimport org.springframework.stereotype.Component;\nimport org.springframework.stereotype.Service;\n\nclass UserRegisteredEvent extends ApplicationEvent {\n    private final String username;\n    private final String email;\n\n    public UserRegisteredEvent(Object source, String username, String email) {\n        super(source);\n        this.username = username;\n        this.email = email;\n    }\n\n    public String getUsername() { return username; }\n    public String getEmail() { return email; }\n}\n\n@Service\nclass UserService {\n    private final ApplicationEventPublisher publisher;\n\n    public UserService(ApplicationEventPublisher publisher) {\n        this.publisher = publisher;\n    }\n\n    public void register(String username, String email) {\n        System.out.println("Registering user: " + username);\n        publisher.publishEvent(new UserRegisteredEvent(this, username, email));\n    }\n}\n\n@Component\nclass EmailListener {\n    @EventListener\n    public void onUserRegistered(UserRegisteredEvent event) {\n        System.out.println("Welcome email sent to: " + event.getEmail());\n    }\n}\n\n@Component\nclass AnalyticsListener {\n    @EventListener\n    public void onUserRegistered(UserRegisteredEvent event) {\n        System.out.println("Analytics: new signup - " + event.getUsername());\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        EmailListener emailL = new EmailListener();\n        AnalyticsListener analyticsL = new AnalyticsListener();\n        UserService svc = new UserService(e -> {\n            UserRegisteredEvent evt = (UserRegisteredEvent) e;\n            emailL.onUserRegistered(evt);\n            analyticsL.onUserRegistered(evt);\n        });\n        svc.register("saket", "saket@corp.com");\n    }\n}`,
    explanation: 'Spring Events implement the Observer pattern. Publisher fires an event; it doesn\'t know who listens. Listeners are completely decoupled — adding a 4th listener (e.g., NotificationListener) requires ZERO changes to UserService. Add @Async to @EventListener for non-blocking listeners. This is the in-process step toward microservices messaging with Kafka/RabbitMQ — same concept, different transport.'
  },

  {
    id: 'sc-009', worldId: 'spring-core-campus', order: 9,
    title: '@Profile — Environment-Specific Beans',
    difficulty: 'medium', xpReward: 240, coinReward: 50, estimatedTime: 14,
    story: 'In development, you want to use an in-memory fake database to run fast without a real DB. In production, you want the real PostgreSQL database. @Profile lets you define beans that only activate for specific environments — dev, staging, prod.',
    objective: 'Create a DataSource interface with a "dev" in-memory impl and a "prod" database impl. Use @Profile to activate each in the right environment.',
    starterCode: `import org.springframework.context.annotation.Profile;\nimport org.springframework.stereotype.Component;\n\ninterface DataSource {\n    String connect();\n    String query(String sql);\n}\n\n// TODO: @Component @Profile("dev") class InMemoryDataSource implements DataSource\n// connect() returns "Connected to in-memory H2 database"\n// query(sql) returns "H2 result for: [sql]"\n\n// TODO: @Component @Profile("prod") class PostgresDataSource implements DataSource\n// connect() returns "Connected to PostgreSQL: jdbc:postgresql://prod-db:5432/app"\n// query(sql) returns "PostgreSQL result for: [sql]"\n\n// TODO: @Component @Profile("dev") class DevEmailService\n// Method: send(String to, String msg) — prints "DEV (not sent): " + to + " | " + msg\n\n// TODO: @Component @Profile("prod") class ProdEmailService\n// Method: send(String to, String msg) — prints "SMTP sent to " + to + ": " + msg\n\nclass Main {\n    public static void main(String[] args) {\n        // Simulating different profile activations\n        System.out.println("=== DEV PROFILE ===");\n        DataSource dev = new InMemoryDataSource();\n        System.out.println(dev.connect());\n        System.out.println(dev.query("SELECT * FROM users"));\n        new DevEmailService().send("alice@corp.com", "Test email");\n\n        System.out.println("\\n=== PROD PROFILE ===\");\n        DataSource prod = new PostgresDataSource();\n        System.out.println(prod.connect());\n        System.out.println(prod.query("SELECT * FROM users"));\n        new ProdEmailService().send("alice@corp.com", "Welcome!");\n    }\n}`,
    requirements: {
      annotations: ['Component', 'Profile'],
      patterns: [
        { name: 'InMemoryDataSource with @Profile dev', pattern: '@Profile\\s*\\(\\s*"dev"\\s*\\)[\\s\\S]*?class\\s+InMemoryDataSource|class\\s+InMemoryDataSource[\\s\\S]{0,50}@Profile', required: true },
        { name: 'PostgresDataSource with @Profile prod', pattern: '@Profile\\s*\\(\\s*"prod"\\s*\\)[\\s\\S]*?class\\s+PostgresDataSource|class\\s+PostgresDataSource', required: true },
        { name: 'DevEmailService dev profile', pattern: 'class\\s+DevEmailService', required: true },
        { name: 'ProdEmailService prod profile', pattern: 'class\\s+ProdEmailService', required: true }
      ]
    },
    tests: [
      { name: '@Profile("dev") on dev classes', visible: true,
        validate: (code) => {
          const count = (code.match(/@Profile\s*\(\s*"dev"\s*\)/g) || []).length;
          return { passed: count >= 2, actual: `${count} dev profiles`, message: 'Use @Profile("dev") on both InMemoryDataSource and DevEmailService' };
        }
      },
      { name: '@Profile("prod") on prod classes', visible: true,
        validate: (code) => {
          const count = (code.match(/@Profile\s*\(\s*"prod"\s*\)/g) || []).length;
          return { passed: count >= 2, actual: `${count} prod profiles`, message: 'Use @Profile("prod") on both PostgresDataSource and ProdEmailService' };
        }
      },
      { name: 'Both DataSource implementations exist', visible: true,
        validate: (code) => {
          const mem = /class\s+InMemoryDataSource\s+implements\s+DataSource/.test(code);
          const pg = /class\s+PostgresDataSource\s+implements\s+DataSource/.test(code);
          return { passed: mem && pg, message: 'Both InMemoryDataSource and PostgresDataSource must implement DataSource' };
        }
      }
    ],
    hiddenTests: [
      { name: 'Both email services exist', visible: false,
        validate: (code) => {
          const dev = /class\s+DevEmailService/.test(code);
          const prod = /class\s+ProdEmailService/.test(code);
          return { passed: dev && prod, message: 'Create both DevEmailService and ProdEmailService' };
        }
      }
    ],
    hints: [
      '@Component @Profile("dev") class InMemoryDataSource implements DataSource { ... }',
      '@Component @Profile("prod") class PostgresDataSource implements DataSource { ... }',
      'In Spring Boot, activate with: spring.profiles.active=dev in application.yml, or -Dspring.profiles.active=prod at runtime'
    ],
    solution: `import org.springframework.context.annotation.Profile;\nimport org.springframework.stereotype.Component;\n\ninterface DataSource {\n    String connect();\n    String query(String sql);\n}\n\n@Component\n@Profile("dev")\nclass InMemoryDataSource implements DataSource {\n    public String connect() { return "Connected to in-memory H2 database"; }\n    public String query(String sql) { return "H2 result for: " + sql; }\n}\n\n@Component\n@Profile("prod")\nclass PostgresDataSource implements DataSource {\n    public String connect() { return "Connected to PostgreSQL: jdbc:postgresql://prod-db:5432/app"; }\n    public String query(String sql) { return "PostgreSQL result for: " + sql; }\n}\n\n@Component\n@Profile("dev")\nclass DevEmailService {\n    public void send(String to, String msg) {\n        System.out.println("DEV (not sent): " + to + " | " + msg);\n    }\n}\n\n@Component\n@Profile("prod")\nclass ProdEmailService {\n    public void send(String to, String msg) {\n        System.out.println("SMTP sent to " + to + ": " + msg);\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        System.out.println("=== DEV PROFILE ===\");\n        DataSource dev = new InMemoryDataSource();\n        System.out.println(dev.connect());\n        System.out.println(dev.query("SELECT * FROM users"));\n        new DevEmailService().send("alice@corp.com", "Test email");\n\n        System.out.println("\\n=== PROD PROFILE ===\");\n        DataSource prod = new PostgresDataSource();\n        System.out.println(prod.connect());\n        System.out.println(prod.query("SELECT * FROM users"));\n        new ProdEmailService().send("alice@corp.com", "Welcome!");\n    }\n}`,
    explanation: '@Profile("name") makes a bean only active when that profile is enabled. Activate in Spring Boot via: spring.profiles.active=dev in application.yml, SPRING_PROFILES_ACTIVE=prod environment variable, or -Dspring.profiles.active=prod JVM arg. Multiple profiles: @Profile({"dev","test"}). Combine with @Configuration+@Bean for profile-specific entire config classes. Essential for managing dev/staging/production differences without code changes.'
  },

  {
    id: 'sc-010', worldId: 'spring-core-campus', order: 10,
    title: '🏆 Boss: Wire the SpringCorp Platform',
    difficulty: 'boss', xpReward: 500, coinReward: 150, estimatedTime: 30,
    story: '⚔️ BOSS CHALLENGE! The CTO wants the complete SpringCorp platform wired up. You must use EVERY Spring Core concept learned in this world: @Component hierarchy, constructor injection, @Configuration+@Bean, @Qualifier, @Primary, @PostConstruct, @Profile, and @EventListener.',
    objective: 'Build a mini e-commerce platform: (1) NotificationService interface with Email(@Primary) and SMS(@Qualifier) impls, (2) OrderEvent, (3) ProductRepository(@Repository) with @PostConstruct data loading, (4) OrderService(@Service) that publishes events, (5) @Configuration for a in-memory DataStore bean.',
    starterCode: `import org.springframework.beans.factory.annotation.Qualifier;\nimport org.springframework.context.annotation.*;\nimport org.springframework.context.ApplicationEvent;\nimport org.springframework.context.ApplicationEventPublisher;\nimport org.springframework.context.event.EventListener;\nimport org.springframework.stereotype.*;\nimport jakarta.annotation.*;\nimport java.util.*;\n\n// 1. TODO: interface NotificationService { void notify(String msg); }\n//    @Primary @Component EmailNotification implements it\n//    @Component @Qualifier("sms") SmsNotification implements it\n\n// 2. TODO: class OrderPlacedEvent extends ApplicationEvent\n//    Field: String orderId, double total\n\n// 3. TODO: @Repository class ProductRepository\n//    Map<String, Double> products field\n//    @PostConstruct to load 3 products\n//    Optional<Double> getPrice(String productId)\n//    List<String> findAll()\n\n// 4. TODO: @Service class OrderService\n//    Inject: ProductRepository, ApplicationEventPublisher, NotificationService (default=email)\n//    Method: placeOrder(String productId, int qty)\n//      - Get price from repo (orElseThrow)\n//      - Calculate total = price * qty\n//      - Notify with "Order placed: " + productId\n//      - Publish OrderPlacedEvent\n//      - Print order confirmation\n\n// 5. TODO: @Component class AuditListener\n//    @EventListener void onOrder(OrderPlacedEvent e) — print audit log\n\n// 6. TODO: @Configuration class PlatformConfig\n//    @Bean Map<String, Object> platformInfo() — returns map with "version":"2.0" and "env":"dev"\n\nclass Main {\n    public static void main(String[] args) {\n        // Wire everything manually (simulating Spring)\n        EmailNotification email = new EmailNotification();\n        SmsNotification sms = new SmsNotification();\n        AuditListener audit = new AuditListener();\n\n        ProductRepository repo = new ProductRepository();\n        repo.loadProducts(); // @PostConstruct\n\n        OrderService orderSvc = new OrderService(\n            repo,\n            event -> audit.onOrder((OrderPlacedEvent) event),\n            email\n        );\n\n        orderSvc.placeOrder("laptop", 2);\n        orderSvc.placeOrder("mouse", 5);\n\n        System.out.println("\\nAll products: " + repo.findAll());\n    }\n}`,
    requirements: {
      annotations: ['Primary', 'Qualifier', 'Repository', 'Service', 'Component', 'PostConstruct', 'Configuration', 'Bean', 'EventListener'],
      patterns: [
        { name: 'NotificationService interface', pattern: 'interface\\s+NotificationService', required: true },
        { name: 'OrderPlacedEvent', pattern: 'class\\s+OrderPlacedEvent\\s+extends\\s+ApplicationEvent', required: true },
        { name: 'ProductRepository', pattern: 'class\\s+ProductRepository', required: true },
        { name: 'OrderService', pattern: 'class\\s+OrderService', required: true },
        { name: 'PlatformConfig @Configuration', pattern: '@Configuration[\\s\\S]{0,50}class\\s+PlatformConfig|class\\s+PlatformConfig', required: true }
      ]
    },
    tests: [
      { name: 'All Spring stereotypes present', visible: true,
        validate: (code) => {
          const checks = {
            '@Primary': /@Primary/.test(code),
            '@Qualifier': /@Qualifier/.test(code),
            '@Repository': /@Repository/.test(code),
            '@Service': /@Service/.test(code),
            '@PostConstruct': /@PostConstruct/.test(code),
            '@EventListener': /@EventListener/.test(code),
            '@Configuration': /@Configuration/.test(code),
            '@Bean': /@Bean/.test(code)
          };
          const found = Object.entries(checks).filter(([, v]) => v).map(([k]) => k);
          return { passed: found.length >= 7, actual: `${found.length}/8: ${found.join(', ')}`, message: 'Use all 8 Spring annotations: @Primary @Qualifier @Repository @Service @PostConstruct @EventListener @Configuration @Bean' };
        }
      },
      { name: 'OrderPlacedEvent published', visible: true,
        validate: (code) => ({
          passed: /class\s+OrderPlacedEvent\s+extends\s+ApplicationEvent/.test(code) && /publishEvent\s*\(/.test(code),
          message: 'Create OrderPlacedEvent and publish it from OrderService'
        })
      },
      { name: 'ProductRepository has @PostConstruct', visible: true,
        validate: (code) => ({
          passed: /@PostConstruct/.test(code) && /class\s+ProductRepository/.test(code),
          message: 'ProductRepository must have a @PostConstruct data loading method'
        })
      },
      { name: '@Configuration with @Bean method', visible: true,
        validate: (code) => ({
          passed: /@Configuration/.test(code) && /@Bean/.test(code) && /class\s+PlatformConfig/.test(code),
          message: 'PlatformConfig must be @Configuration with at least one @Bean method'
        })
      }
    ],
    hiddenTests: [
      { name: 'Constructor injection throughout', visible: false,
        validate: (code) => {
          const autowiredCount = (code.match(/@Autowired/g) || []).length;
          return { passed: autowiredCount === 0, message: 'Use constructor injection everywhere — zero @Autowired annotations' };
        }
      }
    ],
    hints: [
      'Start with interfaces and events, then repositories, then services. Wire in main last.',
      'ProductRepository: @PostConstruct void loadProducts() { products.put("laptop", 1299.0); products.put("mouse", 25.0); products.put("keyboard", 79.0); }',
      'OrderService constructor: public OrderService(ProductRepository repo, ApplicationEventPublisher pub, NotificationService notifier) { ... }'
    ],
    solution: `import org.springframework.beans.factory.annotation.Qualifier;\nimport org.springframework.context.annotation.*;\nimport org.springframework.context.ApplicationEvent;\nimport org.springframework.context.ApplicationEventPublisher;\nimport org.springframework.context.event.EventListener;\nimport org.springframework.stereotype.*;\nimport jakarta.annotation.*;\nimport java.util.*;\n\ninterface NotificationService { void notify(String msg); }\n\n@Primary @Component\nclass EmailNotification implements NotificationService {\n    public void notify(String msg) { System.out.println("EMAIL: " + msg); }\n}\n\n@Component @Qualifier("sms")\nclass SmsNotification implements NotificationService {\n    public void notify(String msg) { System.out.println("SMS: " + msg); }\n}\n\nclass OrderPlacedEvent extends ApplicationEvent {\n    private final String orderId;\n    private final double total;\n    public OrderPlacedEvent(Object src, String orderId, double total) { super(src); this.orderId = orderId; this.total = total; }\n    public String getOrderId() { return orderId; }\n    public double getTotal() { return total; }\n}\n\n@Repository\nclass ProductRepository {\n    private final Map<String, Double> products = new HashMap<>();\n\n    @PostConstruct\n    public void loadProducts() {\n        products.put("laptop", 1299.0);\n        products.put("mouse", 25.0);\n        products.put("keyboard", 79.0);\n        System.out.println("ProductRepository loaded " + products.size() + " products");\n    }\n\n    public Optional<Double> getPrice(String id) { return Optional.ofNullable(products.get(id)); }\n    public List<String> findAll() { return new ArrayList<>(products.keySet()); }\n}\n\n@Service\nclass OrderService {\n    private final ProductRepository repo;\n    private final ApplicationEventPublisher publisher;\n    private final NotificationService notifier;\n    private int orderCounter = 1;\n\n    public OrderService(ProductRepository repo, ApplicationEventPublisher publisher, NotificationService notifier) {\n        this.repo = repo; this.publisher = publisher; this.notifier = notifier;\n    }\n\n    public void placeOrder(String productId, int qty) {\n        double price = repo.getPrice(productId).orElseThrow(() -> new RuntimeException("Product not found: " + productId));\n        double total = price * qty;\n        String orderId = "ORD-" + (orderCounter++);\n        notifier.notify("Order placed: " + productId + " x" + qty);\n        publisher.publishEvent(new OrderPlacedEvent(this, orderId, total));\n        System.out.println(orderId + ": " + productId + " x" + qty + " = $" + total);\n    }\n}\n\n@Component\nclass AuditListener {\n    @EventListener\n    public void onOrder(OrderPlacedEvent e) {\n        System.out.println("AUDIT: " + e.getOrderId() + " total=$" + e.getTotal());\n    }\n}\n\n@Configuration\nclass PlatformConfig {\n    @Bean\n    public Map<String, Object> platformInfo() {\n        return Map.of("version", "2.0", "env", "dev");\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        EmailNotification email = new EmailNotification();\n        AuditListener audit = new AuditListener();\n        ProductRepository repo = new ProductRepository();\n        repo.loadProducts();\n        OrderService orderSvc = new OrderService(repo, event -> audit.onOrder((OrderPlacedEvent) event), email);\n        orderSvc.placeOrder("laptop", 2);\n        orderSvc.placeOrder("mouse", 5);\n        System.out.println("\\nAll products: " + repo.findAll());\n    }\n}`,
    explanation: 'You just built a production-structured Spring application using every core concept. In a real Spring Boot app, you wouldn\'t wire things in main() — Spring Boot\'s ApplicationContext does that automatically on startup. You\'d just annotate the classes and Spring handles the rest. The patterns you used here — interfaces, constructor injection, events, profiles, beans — ARE the patterns used in every professional Spring Boot codebase.'
  }
];
