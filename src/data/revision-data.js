// ─── REVISION MODULE DATA ───────────────────────────────────────────
// Comprehensive Spring Boot & Reactive Programming Knowledge Base

export const REVISION_CATEGORIES = [
  {
    id: 'java-fundamentals',
    title: 'Java Fundamentals',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    color: '#10b981',
    topics: [
      { term: 'JVM (Java Virtual Machine)', definition: 'An abstract computing machine that enables a computer to run Java programs. It converts Java bytecode into machine-specific code at runtime.' },
      { term: 'JDK vs JRE', definition: 'JDK (Java Development Kit) includes development tools + JRE. JRE (Java Runtime Environment) includes JVM + core libraries needed to run Java apps.' },
      { term: 'OOP Principles', definition: 'Encapsulation (data hiding), Inheritance (reuse), Polymorphism (many forms), Abstraction (hiding complexity). The four pillars of Object-Oriented Programming.' },
      { term: 'Interface vs Abstract Class', definition: 'Interface: 100% abstract contract (Java 8+ allows default methods). Abstract class: partial implementation with abstract + concrete methods. A class can implement multiple interfaces but extend only one abstract class.' },
      { term: 'Generics', definition: 'Enable type-safe collections and methods. E.g., List<String> ensures only Strings are added. Eliminates ClassCastException at runtime.' },
      { term: 'Lambda Expressions', definition: 'Anonymous functions introduced in Java 8. Syntax: (params) -> expression. Enable functional programming style. E.g., list.forEach(item -> System.out.println(item))' },
      { term: 'Stream API', definition: 'A sequence of elements supporting sequential and parallel aggregate operations. Key ops: filter(), map(), reduce(), collect(), flatMap(). Introduced in Java 8.' },
      { term: 'Optional<T>', definition: 'A container object that may or may not contain a non-null value. Prevents NullPointerException. Methods: of(), ofNullable(), isPresent(), orElse(), map().' },
      { term: 'Functional Interfaces', definition: 'An interface with exactly one abstract method. Annotated with @FunctionalInterface. Examples: Predicate<T>, Function<T,R>, Consumer<T>, Supplier<T>.' },
      { term: 'CompletableFuture', definition: 'Represents a future result of an async computation. Supports chaining with thenApply(), thenCompose(), thenCombine(). Foundation for async programming in Java.' },
    ]
  },
  {
    id: 'spring-core',
    title: 'Spring Core Concepts',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect></svg>`,
    color: '#f97316',
    topics: [
      { term: 'IoC (Inversion of Control)', definition: 'A design principle where the framework controls object creation and lifecycle instead of the programmer. Spring IoC container manages beans and their dependencies.' },
      { term: 'Dependency Injection (DI)', definition: 'A pattern where objects receive their dependencies from an external source rather than creating them. Types: Constructor injection (recommended), Setter injection, Field injection.' },
      { term: 'Spring Bean', definition: 'An object managed by the Spring IoC container. Created via @Component, @Service, @Repository, @Controller, or @Bean in @Configuration classes.' },
      { term: 'Bean Scopes', definition: 'singleton (default, one instance per container), prototype (new instance per request), request (per HTTP request), session (per HTTP session), application (per ServletContext).' },
      { term: 'ApplicationContext', definition: 'The central interface for Spring IoC container. Provides bean factory methods, resource loading, event publishing, and internationalization support.' },
      { term: 'Component Scanning', definition: 'Spring automatically detects and registers beans by scanning packages for classes annotated with stereotype annotations (@Component, @Service, etc.).' },
      { term: 'Bean Lifecycle', definition: 'Instantiation → Populate Properties → BeanNameAware → BeanFactoryAware → Pre-Initialization (BeanPostProcessor) → InitializingBean/init-method → Ready → DisposableBean/destroy-method.' },
      { term: 'Profiles', definition: 'Allow conditional bean registration based on environment. Activated via spring.profiles.active. E.g., @Profile("dev") registers bean only in development.' },
      { term: 'SpEL (Spring Expression Language)', definition: 'A powerful expression language for querying and manipulating objects at runtime. Used in @Value annotations. E.g., @Value("#{systemProperties[\'user.name\']}").' },
      { term: 'AOP (Aspect-Oriented Programming)', definition: 'Separates cross-cutting concerns (logging, security, transactions) from business logic. Key concepts: Aspect, Advice (Before/After/Around), Pointcut, JoinPoint.' },
    ]
  },
  {
    id: 'spring-annotations',
    title: 'Spring Annotations Glossary',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`,
    color: '#3b82f6',
    topics: [
      { term: '@SpringBootApplication', definition: 'Combines @Configuration + @EnableAutoConfiguration + @ComponentScan. The entry point annotation for every Spring Boot application.' },
      { term: '@Component', definition: 'Generic stereotype annotation marking a class as a Spring-managed bean. Base for @Service, @Repository, @Controller.' },
      { term: '@Service', definition: 'Specialization of @Component for service layer classes. Semantic annotation indicating business logic layer.' },
      { term: '@Repository', definition: 'Specialization of @Component for data access layer. Enables automatic exception translation from database exceptions to Spring DataAccessException.' },
      { term: '@Controller / @RestController', definition: '@Controller handles web requests with view resolution. @RestController = @Controller + @ResponseBody, returns data directly (JSON/XML) instead of views.' },
      { term: '@Autowired', definition: 'Marks a constructor, setter, or field for automatic dependency injection. Constructor injection is preferred (can omit @Autowired if single constructor).' },
      { term: '@RequestMapping / @GetMapping / @PostMapping', definition: '@RequestMapping maps HTTP requests to handler methods. Shortcut annotations: @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping.' },
      { term: '@PathVariable / @RequestParam / @RequestBody', definition: '@PathVariable extracts URI template variables. @RequestParam extracts query parameters. @RequestBody deserializes HTTP request body to Java object.' },
      { term: '@Valid / @Validated', definition: 'Triggers JSR-303/380 bean validation on method parameters. Works with @NotNull, @Size, @Email, @Pattern, @Min, @Max annotations on fields.' },
      { term: '@Transactional', definition: 'Manages database transactions declaratively. Supports propagation levels (REQUIRED, REQUIRES_NEW), isolation levels, rollback rules, and read-only optimization.' },
      { term: '@Configuration / @Bean', definition: '@Configuration marks a class as a source of bean definitions. @Bean marks a method whose return value is registered as a bean in the container.' },
      { term: '@ConditionalOnProperty', definition: 'Conditionally creates a bean based on a property value in application.properties. Part of Spring Boot auto-configuration magic.' },
      { term: '@Value', definition: 'Injects values from properties files, environment variables, or SpEL expressions into fields. E.g., @Value("${server.port}").' },
      { term: '@Qualifier', definition: 'Disambiguates bean injection when multiple beans of the same type exist. Used with @Autowired to specify which bean to inject.' },
      { term: '@Entity / @Table / @Id', definition: 'JPA annotations. @Entity marks a class as a database entity. @Table specifies the table name. @Id marks the primary key field.' },
      { term: '@OneToMany / @ManyToOne / @ManyToMany', definition: 'JPA relationship annotations. Define entity associations. Use fetch types (LAZY/EAGER) and cascade types to control loading and persistence behavior.' },
    ]
  },
  {
    id: 'spring-boot',
    title: 'Spring Boot Deep Dive',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
    color: '#ef4444',
    topics: [
      { term: 'Auto-Configuration', definition: 'Spring Boot automatically configures beans based on classpath dependencies. E.g., adding spring-boot-starter-data-jpa auto-configures DataSource, EntityManager, TransactionManager.' },
      { term: 'Starters', definition: 'Pre-packaged dependency descriptors. spring-boot-starter-web (MVC), spring-boot-starter-data-jpa (JPA), spring-boot-starter-security (Security), spring-boot-starter-webflux (Reactive).' },
      { term: 'application.properties / application.yml', definition: 'Externalized configuration files. Support profiles (application-dev.yml), property placeholders, and hierarchical configuration.' },
      { term: 'Actuator', definition: 'Production-ready features for monitoring and managing apps. Endpoints: /health, /metrics, /info, /env, /loggers, /threaddump. Secured by default.' },
      { term: 'Embedded Server', definition: 'Spring Boot embeds Tomcat (default), Jetty, or Undertow. No need for external server deployment. Configured via server.port, server.servlet.context-path.' },
      { term: 'Spring Boot DevTools', definition: 'Development productivity tools: automatic restart on code changes, LiveReload browser integration, relaxed property binding, H2 console auto-configuration.' },
      { term: 'CommandLineRunner / ApplicationRunner', definition: 'Interfaces for executing code after Spring Boot startup. CommandLineRunner receives raw String[] args, ApplicationRunner receives parsed ApplicationArguments.' },
      { term: 'Exception Handling', definition: '@ControllerAdvice + @ExceptionHandler for global exception handling. ResponseStatusException for inline errors. ProblemDetail (RFC 7807) for standardized error responses.' },
      { term: 'Spring Boot Test', definition: '@SpringBootTest loads full context. @WebMvcTest for controller layer. @DataJpaTest for repository layer. @MockBean for mocking dependencies. TestRestTemplate for integration tests.' },
    ]
  },
  {
    id: 'reactive-programming',
    title: 'Reactive Programming',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
    color: '#06b6d4',
    topics: [
      { term: 'Reactive Streams Specification', definition: 'A standard for asynchronous stream processing with non-blocking backpressure. Four interfaces: Publisher, Subscriber, Subscription, Processor.' },
      { term: 'Mono<T>', definition: 'A Reactor type representing 0 or 1 element asynchronously. Think of it as a reactive Optional. Created via Mono.just(), Mono.empty(), Mono.error(), Mono.fromCallable().' },
      { term: 'Flux<T>', definition: 'A Reactor type representing 0 to N elements asynchronously. Think of it as a reactive List/Stream. Created via Flux.just(), Flux.fromIterable(), Flux.range(), Flux.interval().' },
      { term: 'Backpressure', definition: 'A mechanism where the subscriber controls the rate of data emission from the publisher. Prevents overwhelming consumers. Strategies: BUFFER, DROP, LATEST, ERROR.' },
      { term: 'subscribe()', definition: 'Triggers the reactive pipeline. Nothing happens until you subscribe. Variants: subscribe(), subscribe(consumer), subscribe(consumer, errorConsumer, completeConsumer).' },
      { term: 'map() vs flatMap()', definition: 'map(): synchronous 1-to-1 transformation. flatMap(): asynchronous transformation that returns a Publisher, then flattens the result. Use flatMap for async operations (DB calls, HTTP).' },
      { term: 'Schedulers', definition: 'Control which thread executes reactive operations. Schedulers.parallel() for CPU-bound, Schedulers.boundedElastic() for blocking I/O, Schedulers.immediate() for current thread.' },
      { term: 'publishOn() vs subscribeOn()', definition: 'publishOn(): switches the execution context for downstream operators. subscribeOn(): affects the subscription and upstream operators. publishOn is more commonly used.' },
      { term: 'Hot vs Cold Publishers', definition: 'Cold: data is generated per subscriber (like a DVD). Hot: data is generated regardless of subscribers (like a radio broadcast). Flux.create() can be hot or cold.' },
      { term: 'Error Handling in Reactive', definition: 'onErrorReturn(): fallback value. onErrorResume(): fallback Publisher. onErrorMap(): transform error. retry(): re-subscribe on error. doOnError(): side-effect logging.' },
      { term: 'StepVerifier', definition: 'Testing utility for reactive streams. Verifies elements, errors, and completion signals. E.g., StepVerifier.create(flux).expectNext("a").expectComplete().verify().' },
      { term: 'WebClient', definition: 'Non-blocking, reactive HTTP client replacing RestTemplate. Supports streaming. E.g., webClient.get().uri("/api").retrieve().bodyToMono(String.class).' },
    ]
  },
  {
    id: 'webflux',
    title: 'Spring WebFlux',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
    color: '#0ea5e9',
    topics: [
      { term: 'WebFlux vs MVC', definition: 'MVC: thread-per-request (blocking). WebFlux: event-loop (non-blocking). WebFlux handles more concurrent requests with fewer threads. Choose WebFlux for I/O-heavy apps.' },
      { term: 'Annotated Controllers', definition: 'Same @RestController pattern as MVC but return Mono/Flux instead of plain objects. Spring WebFlux handles the reactive subscription automatically.' },
      { term: 'Functional Endpoints (RouterFunction)', definition: 'Alternative to annotations. Define routes programmatically: RouterFunction<ServerResponse> route = route().GET("/api", handler::getAll).build().' },
      { term: 'ServerWebExchange', definition: 'The WebFlux equivalent of HttpServletRequest/Response. Provides access to request, response, session, and attributes in a non-blocking way.' },
      { term: 'R2DBC (Reactive Relational Database Connectivity)', definition: 'A non-blocking database driver specification for relational databases. Replaces JDBC in reactive apps. Supports PostgreSQL, MySQL, H2, MSSQL.' },
      { term: 'ReactiveCrudRepository', definition: 'Spring Data interface for reactive CRUD operations. Returns Mono/Flux instead of Optional/List. Methods: findById() → Mono<T>, findAll() → Flux<T>.' },
      { term: 'WebTestClient', definition: 'Test client for WebFlux endpoints. Binds to ApplicationContext or specific controllers. Supports fluent assertions on status, headers, and body.' },
      { term: 'Server-Sent Events (SSE)', definition: 'WebFlux can stream events to clients using Flux<ServerSentEvent>. Content-Type: text/event-stream. Ideal for real-time dashboards and notifications.' },
      { term: 'WebSocket Support', definition: 'WebFlux supports reactive WebSocket connections via WebSocketHandler. Bidirectional communication for chat apps, live updates, collaborative editing.' },
    ]
  },
  {
    id: 'microservices-enterprise',
    title: 'Microservices & Enterprise',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    color: '#ec4899',
    topics: [
      { term: 'API Gateway', definition: 'A single entry point for all clients. Handles routing, authentication, rate limiting, and load balancing. E.g., Spring Cloud Gateway.' },
      { term: 'Service Registry & Discovery', definition: 'A database of available service instances. Allows services to find each other dynamically without hardcoded IPs. E.g., Netflix Eureka, Consul.' },
      { term: 'Circuit Breaker', definition: 'Prevents cascading failures by stopping calls to a failing service after a threshold. E.g., Resilience4j, Hystrix. Uses closed, open, and half-open states.' },
      { term: 'Centralized Configuration', definition: 'Externalizes configuration for all microservices into a central repository (Git) served by a Config Server. E.g., Spring Cloud Config.' },
      { term: 'Distributed Tracing', definition: 'Tracks requests flowing across multiple services using Trace IDs and Span IDs to debug latency and failures. E.g., Zipkin, Spring Cloud Sleuth/Micrometer.' },
      { term: 'Saga Pattern', definition: 'Manages distributed transactions by splitting them into local transactions. If one fails, compensating transactions are triggered to undo previous steps.' },
      { term: 'CQRS (Command Query Responsibility Segregation)', definition: 'Separates read (Query) and write (Command) operations into different models/databases to optimize performance and scalability independently.' },
      { term: 'Event-Driven Architecture', definition: 'Services communicate asynchronously via events/messages instead of synchronous HTTP calls. Uses message brokers like Apache Kafka or RabbitMQ.' },
      { term: 'JWT (JSON Web Token)', definition: 'A compact, URL-safe token format for stateless authentication. Structure: Header.Payload.Signature. Contains claims like sub, exp, iat, roles.' },
      { term: 'Spring Security Filter Chain', definition: 'Replaces WebSecurityConfigurerAdapter. Defines security rules via @Bean SecurityFilterChain. Configures CORS, CSRF, session management, and authorization.' },
    ]
  }
];

// ─── CHEATSHEETS ────────────────────────────────────────────────────

export const CHEATSHEETS = [
  {
    id: 'annotations-cheat',
    title: 'Spring Annotations Cheatsheet',
    color: '#3b82f6',
    sections: [
      { heading: 'Core', items: [
        { code: '@SpringBootApplication', desc: 'Main entry point' },
        { code: '@Component', desc: 'Generic managed bean' },
        { code: '@Service', desc: 'Business logic layer' },
        { code: '@Repository', desc: 'Data access layer' },
        { code: '@Configuration', desc: 'Bean definition source' },
        { code: '@Bean', desc: 'Method-level bean declaration' },
      ]},
      { heading: 'Web', items: [
        { code: '@RestController', desc: '@Controller + @ResponseBody' },
        { code: '@GetMapping("/path")', desc: 'Handle GET requests' },
        { code: '@PostMapping("/path")', desc: 'Handle POST requests' },
        { code: '@PutMapping("/path")', desc: 'Handle PUT requests' },
        { code: '@DeleteMapping("/path")', desc: 'Handle DELETE requests' },
        { code: '@PathVariable', desc: 'Extract from URI path' },
        { code: '@RequestParam', desc: 'Extract query parameter' },
        { code: '@RequestBody', desc: 'Deserialize request body' },
      ]},
      { heading: 'Data', items: [
        { code: '@Entity', desc: 'JPA entity class' },
        { code: '@Id @GeneratedValue', desc: 'Primary key with auto-gen' },
        { code: '@Column(name="col")', desc: 'Column mapping' },
        { code: '@Transactional', desc: 'Transaction boundary' },
        { code: '@Query("JPQL")', desc: 'Custom query method' },
      ]},
      { heading: 'Injection', items: [
        { code: '@Autowired', desc: 'Auto dependency injection' },
        { code: '@Qualifier("name")', desc: 'Disambiguate beans' },
        { code: '@Value("${prop}")', desc: 'Inject property value' },
        { code: '@Primary', desc: 'Default bean preference' },
      ]},
    ]
  },
  {
    id: 'reactive-cheat',
    title: 'Reactive Programming Cheatsheet',
    color: '#06b6d4',
    sections: [
      { heading: 'Creating', items: [
        { code: 'Mono.just(value)', desc: 'Single value' },
        { code: 'Mono.empty()', desc: 'Empty Mono' },
        { code: 'Mono.error(ex)', desc: 'Error signal' },
        { code: 'Flux.just(a, b, c)', desc: 'Multiple values' },
        { code: 'Flux.fromIterable(list)', desc: 'From collection' },
        { code: 'Flux.range(1, 10)', desc: 'Integer range' },
        { code: 'Flux.interval(Duration)', desc: 'Periodic emission' },
      ]},
      { heading: 'Transforming', items: [
        { code: '.map(x -> transform(x))', desc: 'Sync transform' },
        { code: '.flatMap(x -> asyncOp(x))', desc: 'Async transform + flatten' },
        { code: '.filter(x -> condition)', desc: 'Filter elements' },
        { code: '.distinct()', desc: 'Remove duplicates' },
        { code: '.take(n)', desc: 'First n elements' },
        { code: '.skip(n)', desc: 'Skip first n elements' },
        { code: '.collectList()', desc: 'Flux → Mono<List>' },
      ]},
      { heading: 'Combining', items: [
        { code: 'Flux.merge(f1, f2)', desc: 'Interleave emissions' },
        { code: 'Flux.concat(f1, f2)', desc: 'Sequential concat' },
        { code: 'Flux.zip(f1, f2)', desc: 'Pair elements' },
        { code: 'mono.zipWith(other)', desc: 'Combine two Monos' },
        { code: 'flux.concatWith(other)', desc: 'Append flux' },
      ]},
      { heading: 'Error Handling', items: [
        { code: '.onErrorReturn(val)', desc: 'Fallback value' },
        { code: '.onErrorResume(fn)', desc: 'Fallback publisher' },
        { code: '.onErrorMap(ex -> new)', desc: 'Transform error' },
        { code: '.retry(n)', desc: 'Re-subscribe n times' },
        { code: '.doOnError(ex -> log)', desc: 'Side effect on error' },
      ]},
    ]
  },
  {
    id: 'http-status-cheat',
    title: 'HTTP Status Codes Cheatsheet',
    color: '#8b5cf6',
    sections: [
      { heading: '2xx Success', items: [
        { code: '200 OK', desc: 'Request succeeded' },
        { code: '201 Created', desc: 'Resource created' },
        { code: '204 No Content', desc: 'Success, no body' },
      ]},
      { heading: '3xx Redirection', items: [
        { code: '301 Moved Permanently', desc: 'URL changed permanently' },
        { code: '304 Not Modified', desc: 'Cached response is valid' },
      ]},
      { heading: '4xx Client Error', items: [
        { code: '400 Bad Request', desc: 'Invalid request syntax' },
        { code: '401 Unauthorized', desc: 'Authentication required' },
        { code: '403 Forbidden', desc: 'Authenticated but no access' },
        { code: '404 Not Found', desc: 'Resource not found' },
        { code: '409 Conflict', desc: 'Resource state conflict' },
        { code: '422 Unprocessable', desc: 'Validation failed' },
        { code: '429 Too Many Requests', desc: 'Rate limit exceeded' },
      ]},
      { heading: '5xx Server Error', items: [
        { code: '500 Internal Server Error', desc: 'Unexpected server error' },
        { code: '502 Bad Gateway', desc: 'Upstream server error' },
        { code: '503 Service Unavailable', desc: 'Server overloaded/maintenance' },
      ]},
    ]
  },
  {
    id: 'design-patterns-cheat',
    title: 'Design Patterns in Spring',
    color: '#f59e0b',
    sections: [
      { heading: 'Creational', items: [
        { code: 'Singleton', desc: 'Default Spring bean scope' },
        { code: 'Factory Method', desc: 'BeanFactory creates beans' },
        { code: 'Builder', desc: 'ResponseEntity.ok().body()' },
        { code: 'Prototype', desc: '@Scope("prototype") bean' },
      ]},
      { heading: 'Structural', items: [
        { code: 'Proxy', desc: 'AOP proxies for @Transactional' },
        { code: 'Decorator', desc: 'HandlerInterceptor wrapping' },
        { code: 'Adapter', desc: 'HandlerAdapter in MVC' },
      ]},
      { heading: 'Behavioral', items: [
        { code: 'Template Method', desc: 'JdbcTemplate, RestTemplate' },
        { code: 'Observer', desc: 'ApplicationEvent publishing' },
        { code: 'Strategy', desc: 'Resource loading strategies' },
        { code: 'Chain of Responsibility', desc: 'Security filter chain' },
      ]},
    ]
  },
  {
    id: 'microservices-cheat',
    title: 'Microservices Components',
    color: '#ec4899',
    sections: [
      { heading: 'Spring Cloud', items: [
        { code: 'Eureka', desc: 'Service Registry & Discovery' },
        { code: 'Spring Cloud Gateway', desc: 'API Routing & Filtering' },
        { code: 'Spring Cloud Config', desc: 'Centralized Configuration' },
        { code: 'OpenFeign', desc: 'Declarative REST Client' },
      ]},
      { heading: 'Resilience & Tracing', items: [
        { code: 'Resilience4j', desc: 'Circuit Breaker / Rate Limiter' },
        { code: 'Micrometer Tracing', desc: 'Distributed Tracing (formerly Sleuth)' },
        { code: 'Zipkin', desc: 'Trace visualization server' },
      ]},
      { heading: 'Data & Events', items: [
        { code: 'Kafka / RabbitMQ', desc: 'Message Brokers for Event-Driven' },
        { code: 'Saga Pattern', desc: 'Distributed Transactions' },
        { code: 'CQRS', desc: 'Separate Read/Write Models' },
      ]},
    ]
  }
];

// ─── EXTERNAL RESOURCES ─────────────────────────────────────────────

export const RESOURCES = [
  { title: 'Spring Boot Interview Questions (GFG)', url: 'https://www.geeksforgeeks.org/springboot/spring-boot-interview-questions-and-answers/', tag: 'Interview' },
  { title: 'Spring Official Documentation', url: 'https://docs.spring.io/spring-boot/docs/current/reference/html/', tag: 'Docs' },
  { title: 'Project Reactor Reference', url: 'https://projectreactor.io/docs/core/release/reference/', tag: 'Reactive' },
  { title: 'Baeldung Spring Tutorials', url: 'https://www.baeldung.com/spring-tutorial', tag: 'Tutorial' },
  { title: 'Spring WebFlux Guide', url: 'https://docs.spring.io/spring-framework/reference/web/webflux.html', tag: 'WebFlux' },
  { title: 'Java Design Patterns', url: 'https://refactoring.guru/design-patterns/java', tag: 'Patterns' },
];
