// ─── REVISION MODULE DATA ───────────────────────────────────────────
// Comprehensive Spring Boot & Reactive Programming Knowledge Base

export const REVISION_CATEGORIES = [
  {
    id: 'java-fundamentals',
    title: 'Java Fundamentals',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    color: '#10b981',
    topics: [
      { term: 'JVM (Java Virtual Machine)', definition: 'Converts Java bytecode into machine-specific code at runtime. Handles memory management (GC), thread management, and security. Phases: Class Loading → Bytecode Verification → Interpretation/JIT Compilation.' },
      { term: 'JDK vs JRE vs JVM', definition: 'JVM: runs bytecode. JRE = JVM + core libraries (rt.jar). JDK = JRE + dev tools (javac, javadoc, jar, jdb). Use JDK to develop, JRE to run, JVM is the runtime engine inside both.' },
      { term: 'Stack vs Heap Memory', definition: 'Stack: stores method call frames, local variables, primitive values — fast, thread-local, auto-released on method return. Heap: stores all objects — shared across threads, GC-managed. String pool lives in heap. StackOverflowError = too deep recursion.' },
      { term: 'Garbage Collection', definition: 'Automatic memory management. GC reclaims heap memory from objects with no live references. Generational GC: Young (Eden + Survivor) → Old (Tenured). GC algorithms: G1 (default Java 9+), ZGC, Shenandoah. finalize() is deprecated — use Cleaner.' },
      { term: 'OOP Principles (APIE)', definition: 'Abstraction: expose essential features, hide details. Polymorphism: same interface, different behavior. Inheritance: reuse parent class properties. Encapsulation: bundle data + methods, restrict direct access. Java also enforces single inheritance for classes.' },
      { term: 'Interface vs Abstract Class', definition: 'Interface: 100% contract — all methods abstract by default (Java 8+ allows default/static methods). Multiple interfaces per class. Abstract class: partial implementation — mix of abstract + concrete methods. Single inheritance only. Use interface for behavior contract, abstract class for shared implementation.' },
      { term: 'Generics & Type Erasure', definition: 'Enable type-safe collections: List<String>, Map<K,V>. Compiler erases type info at runtime (type erasure) — only raw types remain in bytecode. Wildcards: ? extends T (upper bound, read-only), ? super T (lower bound, write-only). PECS rule: Producer Extends, Consumer Super.' },
      { term: 'Lambda Expressions', definition: 'Anonymous functions: (params) -> body. Enable functional programming. Require a @FunctionalInterface target. Example: Comparator<String> cmp = (a, b) -> a.compareTo(b). Behind the scenes, lambdas are compiled using invokedynamic bytecode instruction for efficiency.' },
      { term: 'Stream API', definition: 'Declarative sequence processing on collections. Lazy: intermediate ops (filter, map, sorted) are not executed until a terminal op (collect, count, forEach, reduce) runs. No reuse: once consumed, must recreate. parallel() uses ForkJoinPool for parallel execution.' },
      { term: 'Optional<T>', definition: 'Container for a value that may be absent. Prevents NPE if used correctly. Key methods: of() (throws on null), ofNullable() (null-safe), isPresent(), ifPresent(consumer), orElse(default), orElseThrow(), map(), flatMap(), filter(). Never call .get() without checking isPresent() — use orElseThrow() instead.' },
      { term: 'Functional Interfaces', definition: 'Interface with exactly one abstract method — annotated @FunctionalInterface. Built-in: Function<T,R> (apply), BiFunction<T,U,R>, Predicate<T> (test), BiPredicate, Consumer<T> (accept), BiConsumer, Supplier<T> (get), UnaryOperator<T>, BinaryOperator<T>.' },
      { term: 'CompletableFuture', definition: 'Represents a future result of an async computation. Key methods: supplyAsync(() -> work), thenApply(fn), thenCompose(fn for another CF), thenCombine(other, biFunc), exceptionally(ex -> fallback), allOf(cf1, cf2), join() / get(). Backed by ForkJoinPool.commonPool() by default.' },
      { term: 'var (Local Variable Type Inference)', definition: 'Java 10+. var x = new ArrayList<String>() — compiler infers the type. Only for local variables with initializers. Cannot be used for fields, parameters, or return types. Does NOT make Java dynamically typed — type is still checked at compile time.' },
      { term: 'Records (Java 16+)', definition: 'Immutable data carriers: record Point(int x, int y) {}. Auto-generates: constructor, getters (x(), y()), equals(), hashCode(), toString(). Cannot extend classes (implicitly extends Record). Can implement interfaces, add compact constructors, custom methods.' },
    ]
  },

  {
    id: 'oop-deep-dive',
    title: 'OOP & Design Patterns',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"></path></svg>`,
    color: '#a855f7',
    topics: [
      { term: 'Encapsulation', definition: 'Private fields + public getters/setters. Protects invariants: setter can validate before setting. Example: setAge(int age) { if (age < 0) throw new IllegalArgumentException(); this.age = age; }. Java Beans convention: getX()/setX()/isX() for booleans.' },
      { term: 'Inheritance & super', definition: 'extends creates IS-A relationship. super() calls parent constructor — must be first statement. super.method() calls parent\'s overridden method. Java: single class inheritance but unlimited interface implementation. Prefer composition over inheritance for flexibility.' },
      { term: 'Polymorphism (Overriding vs Overloading)', definition: 'Override: same signature in subclass (runtime polymorphism — @Override annotation). Overload: same name, different parameters (compile-time). Override rules: same/wider access, same/narrower exception, covariant return types. Static methods cannot be overridden (only hidden).' },
      { term: 'Abstraction (abstract keyword)', definition: 'abstract class cannot be instantiated. abstract methods have no body — subclasses must implement. Non-abstract subclass must implement ALL abstract methods or also be abstract. Constructors in abstract classes ARE called via super() from subclasses.' },
      { term: 'Interfaces (default methods, Java 8+)', definition: 'default methods provide backward-compatible implementation in interfaces. static methods in interfaces — called via Interface.method(). private methods (Java 9+) for internal interface code reuse. Multiple interface inheritance: override if conflict. Functional interface: exactly one abstract method.' },
      { term: 'Enum', definition: 'Type-safe constant set. Each enum constant is an instance of the enum class. Can have fields, constructors (private), and methods. Built-in: name(), ordinal(), values(), valueOf(). Supports switch expressions. Example: enum Status { ACTIVE("Active"), INACTIVE("Inactive"); private final String label; }' },
      { term: 'Singleton Pattern', definition: 'Ensures one instance. Thread-safe options: (1) Enum singleton — simplest, (2) static final field, (3) double-checked locking with volatile. In Spring: beans are singleton by default — don\'t implement your own. Anti-pattern for mutable shared state.' },
      { term: 'Builder Pattern', definition: 'Builds complex objects step by step. Avoids telescoping constructors. Example: User user = User.builder().name("Alice").email("alice@co").role(ADMIN).build(). Lombok @Builder auto-generates. Spring WebClient and MockMvcRequestBuilders use this pattern.' },
      { term: 'Factory Pattern', definition: 'Creates objects without exposing creation logic. Spring\'s BeanFactory is a factory. Static factory methods: Optional.of(), List.of(), Map.of(). Abstract Factory: creates families of related objects (DataSource factory per environment).' },
      { term: 'Strategy Pattern', definition: 'Define a family of algorithms, encapsulate each, make interchangeable. Example: SortStrategy interface with BubbleSort, QuickSort implementations injected via DI. Spring\'s ResourceLoader, HandlerMappings use this pattern. Replaces if-else chains for behavior switching.' },
      { term: 'Observer Pattern', definition: 'Publisher-Subscriber. Publisher notifies all observers on state change. Java: java.util.Observer (deprecated). Spring: ApplicationEventPublisher + @EventListener. Reactive: Flux/Mono are Publisher, subscribe() registers Observer.' },
      { term: 'Decorator Pattern', definition: 'Adds behavior to objects dynamically without subclassing. Java I/O: BufferedReader(new FileReader(f)) wraps FileReader. Spring: HttpServletRequestWrapper, BeanDefinitionDecorator. Compare to inheritance: decorator is runtime, inheritance is compile-time.' },
      { term: 'Proxy Pattern', definition: 'Surrogate that controls access to another object. Spring AOP creates proxies for @Transactional, @Async, @Cacheable. Two types: JDK Dynamic Proxy (interface-based) and CGLIB (subclass-based). Important: self-invocation (this.method()) bypasses Spring proxies!' },
      { term: 'SOLID Principles', definition: 'S: Single Responsibility — one reason to change. O: Open/Closed — open for extension, closed for modification. L: Liskov Substitution — subtypes must be substitutable. I: Interface Segregation — many specific interfaces. D: Dependency Inversion — depend on abstractions, not concretions (DI implements this).' },
    ]
  },

  {
    id: 'collections-streams',
    title: 'Collections & Streams',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`,
    color: '#f59e0b',
    topics: [
      { term: 'List implementations', definition: 'ArrayList: O(1) get, O(n) insert/remove (array-backed). LinkedList: O(n) get, O(1) head/tail ops (doubly-linked). Vector: thread-safe ArrayList (use Collections.synchronizedList() instead). CopyOnWriteArrayList: thread-safe for read-heavy. Use ArrayList by default.' },
      { term: 'Map implementations', definition: 'HashMap: O(1) avg, unordered (null keys/values OK). LinkedHashMap: preserves insertion/access order. TreeMap: O(log n), sorted by key (implements NavigableMap). Hashtable: deprecated. ConcurrentHashMap: thread-safe. EnumMap: optimized for enum keys.' },
      { term: 'Set implementations', definition: 'HashSet: O(1) avg, unordered (backed by HashMap). LinkedHashSet: insertion-ordered. TreeSet: sorted, O(log n) (backed by TreeMap). EnumSet: bit-vector-based, extremely fast for enums. Backed by their Map counterparts — understanding Map = understanding Set.' },
      { term: 'Queue & Deque', definition: 'Queue: FIFO. Key methods: offer() (add), poll() (remove+return), peek() (view head). Deque: double-ended. ArrayDeque: faster than LinkedList for both queue and stack. PriorityQueue: elements ordered by Comparator, not insertion order. BlockingQueue (LinkedBlockingQueue) for producer-consumer.' },
      { term: 'Collections utility class', definition: 'java.util.Collections: sort(list), reverse(list), shuffle(list), min/max, frequency(collection, obj), disjoint, unmodifiableList/Set/Map, synchronizedList/Map, nCopies, singletonList. List.of(), Set.of(), Map.of() (Java 9+) create unmodifiable collections — null not allowed.' },
      { term: 'Comparable vs Comparator', definition: 'Comparable: natural ordering, implemented in the class itself (compareTo). Comparator: external, flexible ordering. Comparator.comparing(Person::getAge).thenComparing(Person::getName).reversed(). Pass Comparator to sort(), TreeSet, PriorityQueue. Use Comparator when you don\'t own the class or need multiple orderings.' },
      { term: 'HashMap internals', definition: 'Array of buckets. hashCode() → bucket index. equals() for key equality. Java 8: bucket becomes Red-Black tree at 8+ elements (TREEIFY_THRESHOLD). Default capacity 16, load factor 0.75 triggers resize (doubles capacity). Always override BOTH hashCode() and equals() when using as key.' },
      { term: 'Stream intermediate operations', definition: 'Lazy, return a new Stream. filter(pred) — removes elements. map(fn) — transforms 1-to-1. flatMap(fn) — transforms 1-to-many, then flattens. distinct() — dedup. sorted(comp) — orders. limit(n) / skip(n). peek(consumer) — side effects for debugging. mapToInt/Long/Double — primitive streams.' },
      { term: 'Stream terminal operations', definition: 'Trigger execution. collect(Collectors.toList/toSet/toMap/groupingBy/joining/counting/averagingDouble). count(), sum(), min(), max(). forEach(consumer). reduce(identity, accumulator). findFirst() / findAny() → Optional. anyMatch/allMatch/noneMatch(pred) → boolean.' },
      { term: 'Collectors.groupingBy', definition: 'Powerful grouping: Map<K, List<T>> by groupingBy(classifier). Downstream collectors: groupingBy(fn, counting()), groupingBy(fn, summarizingInt(...)), groupingBy(fn, mapping(fn, toList())). partitioningBy(pred) → Map<Boolean, List<T>>. toMap(keyFn, valueFn, mergeConflictFn).' },
      { term: 'Method References', definition: 'Shorthand for lambdas when the lambda just calls one method. Types: ClassName::staticMethod (Integer::parseInt), instance::method (System.out::println), ClassName::instanceMethod (String::toUpperCase), ClassName::new (constructor reference). Use when the lambda parameter goes directly to the method.' },
      { term: 'Parallel Streams', definition: 'stream().parallel() or parallelStream(). Uses ForkJoinPool.commonPool(). Beneficial for large datasets + CPU-bound work. Avoid for: I/O-bound ops, small collections (<10k), stateful ops with shared state, ordered operations. Measure before using — often slower due to coordination overhead.' },
    ]
  },

  {
    id: 'spring-core',
    title: 'Spring Core Concepts',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect></svg>`,
    color: '#f97316',
    topics: [
      { term: 'IoC (Inversion of Control)', definition: 'Framework controls object creation and lifecycle instead of programmer code. Before IoC: UserService svc = new UserService(new EmailService()). After IoC: Spring creates and injects EmailService automatically. The "Hollywood Principle" — don\'t call us, we\'ll call you.' },
      { term: 'Dependency Injection (DI)', definition: 'Constructor injection (RECOMMENDED): private final UserRepo repo; @Autowired UserService(UserRepo repo). Setter injection: @Autowired setRepo(). Field injection: @Autowired UserRepo repo (avoid — not testable without Spring). Constructor injection enforces required deps, enables immutability, works without Spring framework.' },
      { term: 'Spring Bean', definition: 'Object managed by the Spring IoC container. Registered via: @Component/@Service/@Repository (auto-scan), @Bean method in @Configuration (manual), XML (legacy). Bean name defaults to lowercase class name. Access: applicationContext.getBean(UserService.class).' },
      { term: 'Bean Scopes', definition: 'singleton (default): one instance per ApplicationContext. prototype: new instance per request from container. request: one per HTTP request (web only). session: one per HTTP session. application: one per ServletContext. websocket: one per WebSocket session. Use @Scope("prototype") to change.' },
      { term: 'ApplicationContext', definition: 'The brain of Spring. Extends BeanFactory with: event publishing, resource loading, i18n, AOP auto-proxying. Types: AnnotationConfigApplicationContext (pure Java), AnnotationConfigWebApplicationContext (web), SpringApplication.run() (Spring Boot auto-creates the right one).' },
      { term: 'Component Scanning', definition: '@ComponentScan("com.example") or via @SpringBootApplication (scans current package + sub-packages). Detects @Component, @Service, @Repository, @Controller, @Configuration, @RestController. Use @ComponentScan(excludeFilters) to exclude specific classes or packages.' },
      { term: 'Bean Lifecycle', definition: 'Constructor → @Autowired fields injected → @PostConstruct → in use → @PreDestroy → destroyed. Alternatively implement InitializingBean(afterPropertiesSet) / DisposableBean(destroy). Use @PostConstruct for cache warmup, connection setup. @PreDestroy for cleanup, resource release.' },
      { term: 'Profiles', definition: '@Profile("dev") bean only active when spring.profiles.active=dev. @ActiveProfiles("dev") in tests. Conditional beans: @ConditionalOnProperty, @ConditionalOnClass, @ConditionalOnMissingBean. Multiple profiles: @Profile({"dev","test"}). Default profile: @Profile("default").' },
      { term: 'SpEL (Spring Expression Language)', definition: 'Evaluate expressions at runtime. In @Value: @Value("#{T(Math).PI}"), @Value("#{userService.users.size()}"), @Value("#{systemProperties[\'user.name\']}"). In Security: @PreAuthorize("hasRole(\'ADMIN\') and #id == authentication.principal.id"). Arithmetic, comparison, regex, method calls, collection projection.' },
      { term: 'AOP (Aspect-Oriented Programming)', definition: 'Separates cross-cutting concerns: logging, security, caching, transactions. Aspect = @Aspect class. Advice = when: @Before, @After, @AfterReturning, @AfterThrowing, @Around. Pointcut = where: @Pointcut("execution(* com.example.service.*.*(..))"). JoinPoint = the method being intercepted. Spring uses proxy-based AOP.' },
    ]
  },

  {
    id: 'spring-annotations',
    title: 'Spring Annotations Glossary',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`,
    color: '#3b82f6',
    topics: [
      { term: '@SpringBootApplication', definition: 'Meta-annotation combining @Configuration + @EnableAutoConfiguration + @ComponentScan. Place on the main class with main(). @EnableAutoConfiguration reads spring.factories / spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports to wire beans based on classpath.' },
      { term: '@Component / @Service / @Repository / @Controller', definition: 'Stereotype annotations for component scanning. Functionally similar to @Component but add semantic meaning. @Repository adds exception translation (DB exceptions → Spring DataAccessException). @Controller marks MVC controller. @RestController = @Controller + @ResponseBody.' },
      { term: '@Autowired / @Inject', definition: '@Autowired: Spring-specific auto-injection. Required by default (required=false makes it optional). @Inject: JSR-330 standard (same behavior). On constructor: Spring 4.3+ can omit @Autowired if only one constructor. Prefer constructor injection for required deps, setter for optional.' },
      { term: '@RequestMapping family', definition: '@GetMapping = @RequestMapping(method=GET). @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping. Supports: path, params, headers, consumes (Content-Type), produces (Accept). At class level: base path. @RequestMapping(value="/api/users", produces="application/json").' },
      { term: '@PathVariable / @RequestParam / @RequestBody', definition: '@PathVariable("id") Long id — from /users/{id}. @RequestParam(defaultValue="0") int page — from ?page=0. @RequestBody @Valid UserDTO dto — deserializes JSON body. @RequestHeader("Authorization") String token. @CookieValue("session") String session.' },
      { term: '@Valid / @Validated', definition: 'JSR-380 validation trigger. @Valid: standard (no group support). @Validated: Spring-enhanced (supports validation groups). Field constraints: @NotNull, @NotBlank (not null AND not blank), @Size(min,max), @Min, @Max, @Email, @Pattern(regexp), @Future, @Past. Handle MethodArgumentNotValidException in @ExceptionHandler.' },
      { term: '@Transactional', definition: 'Declarative transaction management. Attributes: propagation (REQUIRED=default, REQUIRES_NEW, SUPPORTS, NEVER), isolation (READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE), readOnly=true (optimizes SELECT-only), rollbackFor, noRollbackFor, timeout. Put on Service layer, not Repository. REQUIRED: join existing tx or create new.' },
      { term: '@Configuration / @Bean', definition: '@Configuration marks a class as bean definition source — proxied by Spring so @Bean methods return the same instance. @Bean methods declare beans: name from method name, type from return type. @Bean(name="alias", initMethod="init", destroyMethod="close"). Use for third-party class beans.' },
      { term: '@ConditionalOnProperty / @ConditionalOnClass', definition: '@ConditionalOnProperty(name="feature.ml", havingValue="true") — bean created only if property is set. @ConditionalOnClass(value=Kafka.class) — only if class on classpath. @ConditionalOnMissingBean — fallback bean. Powers all Spring Boot auto-configuration.' },
      { term: '@Value / @ConfigurationProperties', definition: '@Value("${app.name}") — single property. @ConfigurationProperties(prefix="app") — binds whole block to POJO, supports relaxed binding (app.maxConnections = maxConnections field). Validated with @Validated on the class. @EnableConfigurationProperties(AppProps.class) to enable.' },
      { term: '@Entity / @Table / @Id / @GeneratedValue', definition: 'JPA annotations. @Entity: maps class to table. @Table(name="products", schema="shop"). @Id: PK field. @GeneratedValue(strategy=IDENTITY|SEQUENCE|AUTO). @Column(name, nullable, length, unique). @Transient: exclude field from persistence. @Enumerated(STRING): store enum by name.' },
      { term: '@OneToMany / @ManyToOne / @ManyToMany', definition: '@OneToMany(mappedBy="parent", cascade=ALL, fetch=LAZY) — parent side. @ManyToOne(fetch=LAZY) @JoinColumn(name="parent_id") — child side owns FK. @ManyToMany: use @JoinTable(joinColumns, inverseJoinColumns). ALWAYS use LAZY fetch — never EAGER. CascadeType.ALL cascades save/delete.' },
    ]
  },

  {
    id: 'spring-data-jpa',
    title: 'Spring Data & JPA',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
    color: '#0ea5e9',
    topics: [
      { term: 'JpaRepository methods', definition: 'Save: save(entity), saveAll(list). Find: findById(id) → Optional, findAll() → List, findAllById(ids), getReferenceById(id). Delete: deleteById(id), delete(entity), deleteAll(). Exists: existsById(id). Count: count(). All with @Transactional internally.' },
      { term: 'Derived Query Methods', definition: 'Spring generates SQL from method name. Keywords: findBy, countBy, deleteBy + field names + modifiers. Modifiers: And, Or, Between, GreaterThan, LessThan, Like, Containing, StartingWith, EndingWith, IgnoreCase, In, NotIn, IsNull, IsNotNull, True, False, OrderBy, Top3/First5.' },
      { term: '@Query (JPQL vs Native)', definition: 'JPQL uses entity/field names: @Query("SELECT u FROM User u WHERE u.email = :email"). Native SQL: @Query(value="SELECT * FROM users WHERE email = :email", nativeQuery=true). @Modifying for UPDATE/DELETE. @Param("name") for named params. Always @Transactional for @Modifying queries.' },
      { term: 'Pagination with Pageable', definition: 'PageRequest.of(page, size, Sort.by("name").descending()). Repository: Page<User> findAll(Pageable pageable). Page<T> metadata: getTotalElements(), getTotalPages(), hasNext(), hasPrevious(), getContent(). page.map(user -> new UserDTO(user)) to transform. REST: ?page=0&size=20&sort=name,desc.' },
      { term: 'Projections (Interface & DTO)', definition: 'Interface projection: interface UserSummary { String getName(); String getEmail(); } — Spring generates proxy. findAllProjectedBy() → List<UserSummary>. DTO projection: @Query("SELECT new com.example.UserDTO(u.name, u.email) FROM User u"). Fetches fewer columns — significant performance gain for lists.' },
      { term: 'Entity Relationships Best Practices', definition: 'ALWAYS use FetchType.LAZY on all relationships. @JsonIgnore or @JsonManagedReference to prevent circular serialization. Use @EntityGraph for specific eager loading. Never use Cascade.REMOVE on @ManyToMany (deletes join table row, not entities). Add orphanRemoval=true on @OneToMany when items can\'t exist without parent.' },
      { term: 'N+1 Problem', definition: 'Fetching 10 orders LAZY loads each order\'s items separately = 1 + 10 = 11 queries. Solutions: @EntityGraph(attributePaths="items"), JOIN FETCH in JPQL, Batch fetching (@BatchSize(size=10)), or projections. Detect with: spring.jpa.show-sql=true and logging. N+1 is the most common JPA performance killer.' },
      { term: '@Transactional in JPA context', definition: 'Required for: @Modifying queries, any write operation outside repository, lazy-loading within a service (Open Session in View anti-pattern). Dirty checking: JPA tracks entity changes within transaction — just mutate the entity, save() not required! spring.jpa.open-in-view=false (recommended).' },
      { term: 'Hibernate-specific tuning', definition: 'spring.jpa.hibernate.ddl-auto: none (prod), validate, update, create-drop (test). spring.jpa.show-sql=true + spring.jpa.properties.hibernate.format_sql=true. Second-level cache: @Cacheable on entity with @Cache(usage=READ_WRITE). Use @NaturalId for business keys. Statistics: spring.jpa.properties.hibernate.generate_statistics=true.' },
      { term: 'Optimistic vs Pessimistic Locking', definition: 'Optimistic: @Version Long version field — if version mismatch on save, throws OptimisticLockException (no DB lock held). Best for low-contention. Pessimistic: @Lock(LockModeType.PESSIMISTIC_WRITE) on query — holds DB lock for duration of transaction. Best for high-contention or financial transactions.' },
    ]
  },

  {
    id: 'spring-boot',
    title: 'Spring Boot Deep Dive',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
    color: '#ef4444',
    topics: [
      { term: 'Auto-Configuration', definition: 'Spring Boot reads META-INF/spring/auto-configuration.imports for AutoConfiguration classes. Each uses @Conditional to check: classpath deps, existing beans, properties. Example: DataSourceAutoConfiguration runs only if JDBC driver on classpath and no DataSource bean defined. @SpringBootApplication → @EnableAutoConfiguration triggers this.' },
      { term: 'Starters', definition: 'spring-boot-starter-web (Tomcat + Spring MVC). spring-boot-starter-data-jpa (Hibernate + Spring Data). spring-boot-starter-security (Spring Security). spring-boot-starter-webflux (Netty + WebFlux). spring-boot-starter-test (JUnit5 + Mockito + AssertJ). spring-boot-starter-actuator (monitoring).' },
      { term: 'application.yml / properties', definition: 'Hierarchical config: server.port=8080, spring.datasource.url=jdbc:.... Profiles: application-dev.yml overrides for dev. Environment variables: SPRING_DATASOURCE_URL overrides spring.datasource.url. Priority (highest to lowest): CLI args, env vars, profile-specific file, application.yml, defaults.' },
      { term: 'Actuator', definition: '/actuator/health: UP/DOWN with component details. /actuator/metrics/{name}: specific metric. /actuator/info: build info, git commit. /actuator/env: all properties. /actuator/loggers: change log level at runtime (no restart!). /actuator/threaddump, /actuator/heapdump. management.endpoints.web.exposure.include=* to expose all.' },
      { term: 'Embedded Server', definition: 'No WAR deployment. Tomcat (default), Jetty (lower memory), Undertow (highest throughput). Configure: server.port, server.servlet.context-path, server.ssl.*. Programmatic: implements EmbeddedServletContainerCustomizer (Boot 1.x) or WebServerFactoryCustomizer (Boot 2+). packaging=jar in pom.xml.' },
      { term: 'DevTools', definition: 'spring-boot-devtools: auto-restart on classpath change (faster than full restart), LiveReload browser integration, disabled caching for Thymeleaf/FreeMarker, H2 console auto-enabled. Excluded from production (not on main classpath). Use Remote DevTools for remote restart over HTTP.' },
      { term: 'Exception Handling', definition: '@RestControllerAdvice class with @ExceptionHandler(ResourceNotFoundException.class) methods. Return ResponseEntity<ProblemDetail> (RFC 9457, Boot 3+) or custom error body. @ResponseStatus(HttpStatus.NOT_FOUND) on exception class. GlobalExceptionHandler vs per-controller @ExceptionHandler (per-controller wins).' },
      { term: '@Async & @Scheduled', definition: '@EnableAsync on config + @Async on method → runs in thread pool (default SimpleAsyncTaskExecutor, configure ThreadPoolTaskExecutor). Return CompletableFuture<T>. @EnableScheduling + @Scheduled(fixedRate=5000) or @Scheduled(cron="0 0 * * * *"). Cron: second minute hour dayOfMonth month dayOfWeek.' },
      { term: 'Spring Boot Test', definition: '@SpringBootTest: full context (slow). @WebMvcTest(UserController.class): only MVC layer, mocks all services. @DataJpaTest: only JPA layer with H2. @MockBean: Spring-managed mock that replaces real bean. MockMvc for MVC tests, WebTestClient for WebFlux. @TestConfiguration for test-specific beans.' },
    ]
  },

  {
    id: 'reactive-programming',
    title: 'Reactive Programming',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
    color: '#06b6d4',
    topics: [
      { term: 'Reactive Streams Specification', definition: 'Standard for async stream processing with non-blocking backpressure. Four interfaces: Publisher<T> (source), Subscriber<T> (sink, has onNext/onError/onComplete/onSubscribe), Subscription (request(n) for backpressure, cancel()), Processor<T,R> (both). Project Reactor implements this spec.' },
      { term: 'Mono<T>', definition: 'Represents 0 or 1 element. Think reactive Optional. Created via Mono.just(val), Mono.empty(), Mono.error(ex), Mono.fromCallable(() -> blockingOp()), Mono.fromFuture(cf), Mono.defer(() -> Mono.just(dynamic)). Mono.zip(m1, m2) combines two Monos.' },
      { term: 'Flux<T>', definition: 'Represents 0 to N elements. Think reactive Stream/List. Created via Flux.just(a,b,c), Flux.fromIterable(list), Flux.range(1,10), Flux.interval(Duration.ofSeconds(1)), Flux.create(sink -> ...), Flux.generate(sink -> ...). Flux.fromStream(stream) — one-time use only.' },
      { term: 'Backpressure', definition: 'Subscriber signals how many items it can handle. request(Long.MAX_VALUE) = unbounded. Custom: BaseSubscriber with hookOnNext + request(1). Strategies for overflow: BUFFER (default, OutOfMemoryError risk), DROP (discard), LATEST (keep latest), ERROR (throw). onBackpressureBuffer(capacity).' },
      { term: 'map() vs flatMap() vs concatMap()', definition: 'map(): sync 1-to-1 transform, returns value. flatMap(): async, returns Publisher, UNORDERED concurrent execution. concatMap(): async, returns Publisher, ORDERED sequential execution (preserves input order). switchMap(): cancels previous inner publisher on new element (good for search-as-you-type).' },
      { term: 'Schedulers', definition: 'Schedulers.parallel(): fixed pool (CPU count), for CPU-bound work. Schedulers.boundedElastic(): expandable pool (10*CPU, max 100k tasks), for BLOCKING I/O. Schedulers.immediate(): current thread. Schedulers.single(): single thread. Schedulers.fromExecutorService(myPool): custom. subscribeOn sets source scheduler; publishOn switches downstream.' },
      { term: 'publishOn() vs subscribeOn()', definition: 'subscribeOn(scheduler): affects subscription side — the source emits on this scheduler. Only the FIRST subscribeOn matters. publishOn(scheduler): switches downstream operators to this scheduler. Multiple publishOn can be chained. Common pattern: subscribeOn(boundedElastic) to offload blocking ops.' },
      { term: 'Hot vs Cold Publishers', definition: 'Cold (default): each subscriber gets its own data stream (like Netflix VOD). Mono.just(), Flux.fromIterable() are cold. Hot: single data stream shared by all subscribers (like live TV). Create hot: flux.publish() → ConnectableFlux, connect() starts. flux.share() = publish().refCount(). WebSocket events are hot.' },
      { term: 'Error Handling in Reactive', definition: 'onErrorReturn(fallback): emit default value on error, complete normally. onErrorResume(ex -> fallbackFlux): switch to fallback publisher. onErrorMap(ex -> new AppException()): transform error. retry(3): re-subscribe on error up to 3 times. retryWhen(Retry.fixedDelay(3, Duration.ofSeconds(1))): with backoff. doOnError: side effects only.' },
      { term: 'StepVerifier', definition: 'Testing tool. StepVerifier.create(flux).expectNext("a","b").expectNextCount(8).expectComplete().verify(). Error: expectError(RuntimeException.class). With time: withVirtualTime(() -> Flux.interval(Duration.ofHours(1))).thenAwait(Duration.ofHours(2)).expectNextCount(2).verifyComplete().' },
      { term: 'WebClient', definition: 'Non-blocking HTTP client. webClient.get().uri("/api/users/{id}", 1).retrieve().bodyToMono(User.class). POST: .post().uri("/api/users").bodyValue(user).retrieve().bodyToMono(User.class). Error handling: .onStatus(status -> status.is4xxClientError(), resp -> resp.bodyToMono(String.class).map(RuntimeException::new)). Builder: WebClient.builder().baseUrl("http://service").build().' },
    ]
  },

  {
    id: 'webflux',
    title: 'Spring WebFlux',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
    color: '#0ea5e9',
    topics: [
      { term: 'WebFlux vs MVC — When to Choose', definition: 'WebFlux: high concurrency + I/O-bound (microservices, streaming, chat). MVC: CPU-bound, JDBC, simpler code when concurrency < 1000 req/s. WebFlux uses Reactor Netty (event-loop) — 1-2 threads per CPU. MVC uses Tomcat thread pool (200 threads default). Key: don\'t BLOCK the event loop thread.' },
      { term: 'Annotated Controllers in WebFlux', definition: 'Same @RestController, @GetMapping as MVC. Difference: return Mono<ResponseEntity<User>> instead of ResponseEntity<User>. Spring WebFlux subscribes automatically. Mono<ServerResponse> (functional style) vs ResponseEntity<T> (annotation style). Both work — choose based on team familiarity.' },
      { term: 'Functional Endpoints (RouterFunction)', definition: 'RouterFunction<ServerResponse> route = route().GET("/api/users", handler::getAll).POST("/api/users", handler::create).build(). Handler: Mono<ServerResponse> getAll(ServerRequest req) { return ServerResponse.ok().body(service.findAll(), User.class); }. Composable, testable without Spring context.' },
      { term: 'ServerWebExchange', definition: 'WebFlux equivalent of HttpServletRequest + HttpServletResponse. exchange.getRequest() → ServerHttpRequest (headers, URI, body as Flux<DataBuffer>). exchange.getResponse() → ServerHttpResponse. exchange.getSession() → Mono<WebSession>. exchange.getPrincipal() → Mono<Principal>.' },
      { term: 'R2DBC (Reactive Relational Database Connectivity)', definition: 'Non-blocking database driver. Add r2dbc-postgresql or r2dbc-h2 driver. ReactiveCrudRepository<User, Long>: findById() → Mono<User>, findAll() → Flux<User>, save() → Mono<User>. No JPA — use @Table, @Id from spring-data-relational. No lazy loading — use explicit joins in @Query.' },
      { term: 'Reactive Security', definition: 'SecurityWebFilterChain (not HttpSecurity). ReactiveAuthenticationManager. @PreAuthorize works. Custom: implement ReactiveUserDetailsService.findByUsername(String) → Mono<UserDetails>. JWT: add filter in SecurityWebFilterChain. Access principal: @AuthenticationPrincipal Mono<User> user.' },
      { term: 'Server-Sent Events (SSE)', definition: 'Stream real-time events to browser without WebSocket. @GetMapping(produces=MediaType.TEXT_EVENT_STREAM_VALUE) return Flux<ServerSentEvent<String>>. Client: new EventSource("/api/stream"). One-directional (server → client). Auto-reconnects. Great for: live dashboards, progress bars, notifications.' },
      { term: 'WebSocket Support', definition: 'WebSocketHandler implementation: handle(WebSocketSession session). session.receive() → Flux<WebSocketMessage>. session.send(publisher) → Mono<Void>. Route via WebSocketHandlerAdapter bean. Full-duplex bidirectional. Use for: chat, collaborative editing, live trading feeds. WebSocketClient for testing.' },
      { term: 'WebTestClient', definition: 'Integration test client. webTestClient.get().uri("/api/users").exchange().expectStatus().isOk().expectBodyList(User.class).hasSize(3). Bind to: ApplicationContext (@SpringBootTest), specific controller (WebTestClient.bindToController(new UserController())), server (WebTestClient.bindToServer("http://localhost:8080")). Supports SSE with .returnResult().getResponseBody().' },
    ]
  },

  {
    id: 'microservices-enterprise',
    title: 'Microservices & Enterprise',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    color: '#ec4899',
    topics: [
      { term: 'API Gateway', definition: 'Single entry point for all clients. Spring Cloud Gateway: route(path).filters(auth, rateLimit, circuitBreaker).uri(serviceUrl). Responsibilities: routing, load balancing, auth/authz, rate limiting, SSL termination, response caching, request/response transformation. Alternative: Kong, NGINX, AWS API Gateway.' },
      { term: 'Service Registry & Discovery', definition: 'Eureka: @EnableEurekaServer + @EnableDiscoveryClient. Services register on startup, deregister on shutdown. Heartbeat every 30s. Ribbon (load balancing) + RestTemplate or @LoadBalanced WebClient for client-side discovery. Alternative: Consul (with health check), Kubernetes native service discovery.' },
      { term: 'Circuit Breaker (Resilience4j)', definition: 'States: CLOSED (normal) → OPEN (failing, fast-fail) → HALF-OPEN (test recovery). @CircuitBreaker(name="userService", fallbackMethod="fallback"). Configuration: slidingWindowSize=10, failureRateThreshold=50, waitDurationInOpenState=60s. Also: @Retry, @RateLimiter, @Bulkhead, @TimeLimiter.' },
      { term: 'Centralized Configuration', definition: 'Spring Cloud Config Server: @EnableConfigServer, git.uri=https://github.com/org/config-repo. Clients: spring.config.import=configserver:http://config-server:8888. Refresh without restart: @RefreshScope + POST /actuator/refresh. Spring Cloud Bus (Kafka/RabbitMQ) for broadcasting refresh to all instances.' },
      { term: 'Distributed Tracing', definition: 'Micrometer Tracing (formerly Sleuth) + Zipkin. Each request gets traceId (entire flow) + spanId (per service). MDC injection: logs automatically include traceId. Propagated via HTTP headers (B3/W3C). Zipkin UI: visualize service call trees, identify latency bottlenecks. OTel (OpenTelemetry) is the new standard.' },
      { term: 'Saga Pattern', definition: 'Choreography: services emit events, others react (loose coupling, harder to debug). Orchestration: central coordinator calls services in order (Spring Batch, Temporal). Compensating transactions: if step 3 fails, execute undo for steps 1 and 2. Use Axon Framework or Eventuate Tram for saga management.' },
      { term: 'CQRS (Command Query Responsibility Segregation)', definition: 'Command side: write operations, strong consistency, normalized SQL. Query side: read operations, eventual consistency, denormalized read models (optimized for display). Event sourcing: store events not state — replay events to rebuild read models. EventBus bridges command → query side updates.' },
      { term: 'Event-Driven Architecture', definition: 'Kafka: log-based, ordered per partition, durable, high-throughput. RabbitMQ: exchange-queue model, flexible routing, ACK/NACK. Spring Kafka: @KafkaListener(topics="orders"), KafkaTemplate.send("orders", event). Spring AMQP for RabbitMQ. Use for: audit logs, event sourcing, decoupling services.' },
      { term: 'JWT Authentication', definition: 'Header.Payload.Signature (Base64 encoded). Claims: sub (subject/userId), exp (expiry), iat (issued at), roles. Verify: check signature + exp. Stateless: no server-side session. Refresh token pattern for long-lived sessions. Store in HttpOnly cookie (not localStorage — prevents XSS). NEVER store secrets in payload.' },
      { term: 'Spring Security Filter Chain', definition: 'SecurityFilterChain bean replaces WebSecurityConfigurerAdapter (deprecated Boot 2.7+). http.authorizeHttpRequests(auth -> auth.requestMatchers("/api/public/**").permitAll().anyRequest().authenticated()). CSRF: disable for stateless JWT APIs. CORS: CorsConfigurationSource bean. Method security: @EnableMethodSecurity + @PreAuthorize.' },
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
        { code: '@SpringBootApplication', desc: 'Main entry point — @Config + @AutoConfig + @Scan' },
        { code: '@Component', desc: 'Generic managed bean (auto-scanned)' },
        { code: '@Service', desc: 'Business logic layer' },
        { code: '@Repository', desc: 'Data access layer + exception translation' },
        { code: '@Configuration', desc: 'Bean definition source (proxied)' },
        { code: '@Bean', desc: 'Method-level bean — use for 3rd-party classes' },
        { code: '@PostConstruct', desc: 'Run after injection completes' },
        { code: '@PreDestroy', desc: 'Run before bean is destroyed' },
      ]},
      { heading: 'Web', items: [
        { code: '@RestController', desc: '@Controller + @ResponseBody' },
        { code: '@GetMapping("/path")', desc: 'Handle GET requests' },
        { code: '@PostMapping("/path")', desc: 'Handle POST requests' },
        { code: '@PutMapping("/path")', desc: 'Handle PUT — full replace' },
        { code: '@PatchMapping("/path")', desc: 'Handle PATCH — partial update' },
        { code: '@DeleteMapping("/path")', desc: 'Handle DELETE' },
        { code: '@PathVariable', desc: 'Extract from URI: /users/{id}' },
        { code: '@RequestParam', desc: 'Extract query: ?page=0&size=20' },
        { code: '@RequestBody @Valid', desc: 'Deserialize + validate JSON body' },
        { code: '@ResponseStatus(HttpStatus.CREATED)', desc: 'Set HTTP status code' },
      ]},
      { heading: 'Data / JPA', items: [
        { code: '@Entity @Table(name="t")', desc: 'Map class to DB table' },
        { code: '@Id @GeneratedValue(IDENTITY)', desc: 'Auto-increment primary key' },
        { code: '@Column(nullable=false)', desc: 'Column constraint mapping' },
        { code: '@OneToMany(mappedBy="x")', desc: 'Parent side of relation' },
        { code: '@ManyToOne @JoinColumn', desc: 'Child side owns the FK' },
        { code: '@Transactional', desc: 'Transaction boundary (put on Service)' },
        { code: '@Query("JPQL or SQL")', desc: 'Custom query on repository' },
        { code: '@Modifying', desc: 'Required for UPDATE/DELETE @Query' },
      ]},
      { heading: 'Injection & Conditionals', items: [
        { code: '@Autowired', desc: 'Auto inject (omit for single constructor)' },
        { code: '@Qualifier("beanName")', desc: 'Disambiguate multiple same-type beans' },
        { code: '@Primary', desc: 'Default bean when multiple match' },
        { code: '@Profile("dev")', desc: 'Active only in specified profile' },
        { code: '@ConditionalOnProperty("f.enabled")', desc: 'Bean if property is true' },
        { code: '@ConditionalOnMissingBean', desc: 'Fallback if no bean exists' },
        { code: '@Async', desc: 'Run method in thread pool' },
        { code: '@Scheduled(cron="0 * * * * *")', desc: 'Scheduled execution' },
      ]},
    ]
  },

  {
    id: 'collections-cheat',
    title: 'Java Collections Cheatsheet',
    color: '#f59e0b',
    sections: [
      { heading: 'Choose Your Collection', items: [
        { code: 'List<T>: ArrayList', desc: 'Default list — fast random access O(1)' },
        { code: 'List<T>: LinkedList', desc: 'Fast head/tail insert O(1)' },
        { code: 'Map<K,V>: HashMap', desc: 'Default map — O(1) avg, unordered' },
        { code: 'Map<K,V>: LinkedHashMap', desc: 'Insertion/access ordered' },
        { code: 'Map<K,V>: TreeMap', desc: 'Sorted by key — O(log n)' },
        { code: 'Set<T>: HashSet', desc: 'Default set — O(1), no order' },
        { code: 'Set<T>: TreeSet', desc: 'Sorted set — O(log n)' },
        { code: 'Queue: ArrayDeque', desc: 'Faster than LinkedList for queue/stack' },
      ]},
      { heading: 'Common Operations', items: [
        { code: 'list.add(e) / list.get(i)', desc: 'Add / get by index' },
        { code: 'list.remove(i) / list.remove(obj)', desc: 'Remove by index or object' },
        { code: 'list.contains(e) / list.size()', desc: 'Membership / size' },
        { code: 'map.put(k,v) / map.get(k)', desc: 'Store / retrieve by key' },
        { code: 'map.getOrDefault(k, fallback)', desc: 'Get with fallback value' },
        { code: 'map.computeIfAbsent(k, fn)', desc: 'Compute value if key missing' },
        { code: 'map.entrySet() / map.keySet()', desc: 'Iterate entries / keys' },
        { code: 'Collections.unmodifiableList(list)', desc: 'Read-only wrapper' },
      ]},
      { heading: 'Sorting', items: [
        { code: 'Collections.sort(list)', desc: 'Natural order (Comparable)' },
        { code: 'list.sort(Comparator.naturalOrder())', desc: 'Explicit comparator' },
        { code: 'Comparator.comparing(Person::getAge)', desc: 'By field' },
        { code: '.thenComparing(Person::getName)', desc: 'Secondary sort' },
        { code: '.reversed()', desc: 'Descending order' },
        { code: 'Comparator.comparingInt(s -> s.length())', desc: 'Primitive-specialized' },
      ]},
      { heading: 'Immutable / Thread-Safe', items: [
        { code: 'List.of(1, 2, 3)', desc: 'Java 9+ — immutable, no nulls' },
        { code: 'Map.of("k", "v")', desc: 'Immutable map (max 10 entries)' },
        { code: 'Map.copyOf(existingMap)', desc: 'Immutable copy' },
        { code: 'ConcurrentHashMap<K,V>', desc: 'Thread-safe map (no locks on read)' },
        { code: 'CopyOnWriteArrayList<T>', desc: 'Thread-safe list for reads' },
        { code: 'Collections.synchronizedList(list)', desc: 'Synchronized wrapper' },
      ]},
    ]
  },

  {
    id: 'streams-cheat',
    title: 'Java Streams & Lambdas',
    color: '#10b981',
    sections: [
      { heading: 'Create Streams', items: [
        { code: 'list.stream()', desc: 'From collection' },
        { code: 'Arrays.stream(arr)', desc: 'From array' },
        { code: 'Stream.of(a, b, c)', desc: 'Varargs' },
        { code: 'IntStream.range(0, 10)', desc: 'Primitive int range [0,10)' },
        { code: 'IntStream.rangeClosed(1, 10)', desc: 'Inclusive range [1,10]' },
        { code: 'Stream.iterate(0, n -> n+2)', desc: 'Infinite from seed + fn' },
        { code: 'Stream.generate(Math::random)', desc: 'Infinite supplier' },
      ]},
      { heading: 'Intermediate (lazy)', items: [
        { code: '.filter(x -> x > 0)', desc: 'Keep matching elements' },
        { code: '.map(x -> x * 2)', desc: 'Transform each element' },
        { code: '.flatMap(x -> x.getItems().stream())', desc: '1-to-many, then flatten' },
        { code: '.distinct()', desc: 'Remove duplicates (uses equals)' },
        { code: '.sorted() / .sorted(comp)', desc: 'Natural or custom order' },
        { code: '.limit(n) / .skip(n)', desc: 'First n / skip first n' },
        { code: '.peek(System.out::println)', desc: 'Debug side-effect (no change)' },
        { code: '.mapToInt(String::length)', desc: 'Primitive stream (sum, avg, etc.)' },
      ]},
      { heading: 'Terminal (trigger execution)', items: [
        { code: '.collect(Collectors.toList())', desc: 'Gather into List' },
        { code: '.collect(Collectors.toSet())', desc: 'Gather into Set (dedup)' },
        { code: '.collect(Collectors.joining(", "))', desc: 'Concatenate strings' },
        { code: '.collect(Collectors.groupingBy(fn))', desc: 'Map<K, List<T>>' },
        { code: '.collect(Collectors.counting())', desc: 'Count as downstream' },
        { code: '.count() / .sum() / .average()', desc: 'Aggregations' },
        { code: '.findFirst() / .findAny()', desc: 'First element → Optional' },
        { code: '.anyMatch(p) / .allMatch(p)', desc: 'Existential / universal check' },
        { code: '.reduce(identity, (a,b) -> a+b)', desc: 'Fold to single value' },
        { code: '.forEach(System.out::println)', desc: 'Terminal side-effect' },
      ]},
      { heading: 'Lambdas & Method Refs', items: [
        { code: 'x -> x.getName()', desc: 'Lambda expression' },
        { code: 'String::toUpperCase', desc: 'Instance method ref (on parameter)' },
        { code: 'System.out::println', desc: 'Specific instance method ref' },
        { code: 'Integer::parseInt', desc: 'Static method ref' },
        { code: 'User::new', desc: 'Constructor ref' },
        { code: '(a, b) -> a.compareTo(b)', desc: 'Multi-param lambda' },
        { code: 'Predicate<T> not = Predicate.not(fn)', desc: 'Negate predicate (Java 11+)' },
      ]},
    ]
  },

  {
    id: 'jpa-cheat',
    title: 'Spring Data JPA Cheatsheet',
    color: '#0ea5e9',
    sections: [
      { heading: 'Entity Basics', items: [
        { code: '@Entity @Table(name="users")', desc: 'Map to DB table "users"' },
        { code: '@Id @GeneratedValue(IDENTITY)', desc: 'Auto-increment PK' },
        { code: '@Column(name="full_name", nullable=false, length=100)', desc: 'Column mapping' },
        { code: '@Enumerated(EnumType.STRING)', desc: 'Store enum as string' },
        { code: '@CreatedDate / @LastModifiedDate', desc: 'Audit timestamps (+ @EnableJpaAuditing)' },
        { code: '@Transient', desc: 'Exclude field from persistence' },
      ]},
      { heading: 'Relationships', items: [
        { code: '@OneToMany(mappedBy="user", cascade=ALL, fetch=LAZY)', desc: 'Parent side' },
        { code: '@ManyToOne(fetch=LAZY) @JoinColumn(name="user_id")', desc: 'Child — owns FK' },
        { code: '@ManyToMany @JoinTable(...)', desc: 'Junction table' },
        { code: 'void addItem(Item i) { i.setParent(this); items.add(i); }', desc: 'Helper — maintain BOTH sides' },
        { code: 'orphanRemoval=true', desc: 'Delete child when removed from collection' },
      ]},
      { heading: 'Repository Methods', items: [
        { code: 'findByNameAndActive(String name, boolean active)', desc: 'Compound condition' },
        { code: 'findByNameContainingIgnoreCase(String kw)', desc: 'LIKE %kw% case-insensitive' },
        { code: 'findBySalaryBetween(double min, double max)', desc: 'BETWEEN' },
        { code: 'findByAgeGreaterThan(int age)', desc: 'Greater than' },
        { code: 'Page<T> findByStatus(String s, Pageable p)', desc: 'Paginated query' },
        { code: 'List<T> findTop5ByOrderByCreatedAtDesc()', desc: 'Top N with sort' },
      ]},
      { heading: '@Query & Performance', items: [
        { code: '@Query("SELECT u FROM User u WHERE u.dept = :d")', desc: 'JPQL named param' },
        { code: '@Query(value="SELECT * FROM users", nativeQuery=true)', desc: 'Native SQL' },
        { code: '@Modifying @Query("UPDATE User u SET u.active = false WHERE u.id = :id")', desc: 'Bulk update' },
        { code: '@EntityGraph(attributePaths="orders")', desc: 'Eager-load specific relation (solve N+1)' },
        { code: 'spring.jpa.show-sql=true', desc: 'Log generated SQL' },
        { code: '@Version Long version', desc: 'Optimistic locking' },
      ]},
    ]
  },

  {
    id: 'reactive-cheat',
    title: 'Reactive / Project Reactor',
    color: '#06b6d4',
    sections: [
      { heading: 'Create', items: [
        { code: 'Mono.just(value)', desc: 'Single value' },
        { code: 'Mono.empty()', desc: 'No value (complete immediately)' },
        { code: 'Mono.error(new Ex())', desc: 'Emit error signal' },
        { code: 'Mono.fromCallable(() -> blockingFn())', desc: 'Wrap blocking call' },
        { code: 'Flux.just(a, b, c)', desc: 'Multiple values' },
        { code: 'Flux.fromIterable(list)', desc: 'From collection' },
        { code: 'Flux.range(1, 10)', desc: 'Integers [1..10]' },
        { code: 'Flux.interval(Duration.ofSeconds(1))', desc: 'Periodic (0, 1, 2...)' },
      ]},
      { heading: 'Transform', items: [
        { code: '.map(x -> transform(x))', desc: 'Sync 1-to-1' },
        { code: '.flatMap(x -> asyncOp(x))', desc: 'Async — unordered merge' },
        { code: '.concatMap(x -> asyncOp(x))', desc: 'Async — order preserved' },
        { code: '.filter(x -> x > 0)', desc: 'Keep matching' },
        { code: '.distinct()', desc: 'Remove duplicates' },
        { code: '.take(n) / .skip(n)', desc: 'First n / skip n' },
        { code: '.collectList()', desc: 'Flux<T> → Mono<List<T>>' },
        { code: '.buffer(5)', desc: 'Flux<T> → Flux<List<T>> batches of 5' },
      ]},
      { heading: 'Combine', items: [
        { code: 'Flux.merge(f1, f2)', desc: 'Interleave as they arrive' },
        { code: 'Flux.concat(f1, f2)', desc: 'Sequential — f1 then f2' },
        { code: 'Flux.zip(f1, f2)', desc: 'Pair 1:1 → Flux<Tuple2>' },
        { code: 'Mono.zip(m1, m2)', desc: 'Combine 2 Monos' },
        { code: 'Mono.when(m1, m2)', desc: 'Wait for all to complete' },
        { code: 'flux.concatWith(other)', desc: 'Append another flux' },
      ]},
      { heading: 'Error Handling', items: [
        { code: '.onErrorReturn(defaultVal)', desc: 'Fallback value' },
        { code: '.onErrorResume(ex -> fallbackFlux)', desc: 'Switch to fallback publisher' },
        { code: '.onErrorMap(ex -> new AppEx())', desc: 'Transform error type' },
        { code: '.retry(3)', desc: 'Re-subscribe up to 3 times' },
        { code: '.retryWhen(Retry.backoff(3, Duration.ofSeconds(1)))', desc: 'Exponential backoff retry' },
        { code: '.doOnError(ex -> log.error(...))', desc: 'Side-effect logging' },
      ]},
      { heading: 'Threading', items: [
        { code: '.subscribeOn(Schedulers.boundedElastic())', desc: 'Run blocking source on BoundedElastic pool' },
        { code: '.publishOn(Schedulers.parallel())', desc: 'Switch downstream to parallel pool' },
        { code: 'Schedulers.boundedElastic()', desc: 'For blocking I/O (file, JDBC)' },
        { code: 'Schedulers.parallel()', desc: 'For CPU-bound, non-blocking' },
      ]},
    ]
  },

  {
    id: 'http-status-cheat',
    title: 'HTTP Status Codes',
    color: '#8b5cf6',
    sections: [
      { heading: '2xx Success', items: [
        { code: '200 OK', desc: 'GET / PUT succeeded' },
        { code: '201 Created', desc: 'POST — resource created, add Location header' },
        { code: '202 Accepted', desc: 'Async — processing not yet complete' },
        { code: '204 No Content', desc: 'DELETE succeeded — no response body' },
      ]},
      { heading: '3xx Redirection', items: [
        { code: '301 Moved Permanently', desc: 'URL changed forever — update bookmarks' },
        { code: '302 Found (Temporary)', desc: 'Temporary redirect' },
        { code: '304 Not Modified', desc: 'Cached response still valid (ETag match)' },
      ]},
      { heading: '4xx Client Error', items: [
        { code: '400 Bad Request', desc: 'Invalid request syntax or payload' },
        { code: '401 Unauthorized', desc: 'Authentication required (no/invalid token)' },
        { code: '403 Forbidden', desc: 'Authenticated but no permission' },
        { code: '404 Not Found', desc: 'Resource does not exist' },
        { code: '405 Method Not Allowed', desc: 'Wrong HTTP verb for this endpoint' },
        { code: '409 Conflict', desc: 'State conflict (duplicate email, version mismatch)' },
        { code: '422 Unprocessable Entity', desc: 'Validation failed (field errors)' },
        { code: '429 Too Many Requests', desc: 'Rate limit exceeded — add Retry-After header' },
      ]},
      { heading: '5xx Server Error', items: [
        { code: '500 Internal Server Error', desc: 'Unexpected bug — log it!' },
        { code: '502 Bad Gateway', desc: 'Upstream service returned invalid response' },
        { code: '503 Service Unavailable', desc: 'Overloaded or in maintenance' },
        { code: '504 Gateway Timeout', desc: 'Upstream service timed out' },
      ]},
    ]
  },

  {
    id: 'design-patterns-cheat',
    title: 'Design Patterns in Spring',
    color: '#f59e0b',
    sections: [
      { heading: 'Creational', items: [
        { code: 'Singleton', desc: 'Default Spring bean scope — one per context' },
        { code: 'Factory Method', desc: 'BeanFactory.getBean() / @Bean methods' },
        { code: 'Builder', desc: 'ResponseEntity.ok().body(dto)' },
        { code: 'Prototype', desc: '@Scope("prototype") — new instance per injection' },
        { code: 'Abstract Factory', desc: 'DataSourceAutoConfiguration per DB type' },
      ]},
      { heading: 'Structural', items: [
        { code: 'Proxy', desc: '@Transactional / @Async — CGLIB/JDK proxy wraps bean' },
        { code: 'Decorator', desc: 'HttpServletRequestWrapper, FilterChain wrapping' },
        { code: 'Adapter', desc: 'HandlerAdapter bridges controller methods to DispatcherServlet' },
        { code: 'Facade', desc: 'JdbcTemplate hides verbose JDBC boilerplate' },
        { code: 'Composite', desc: 'SecurityFilterChain — chain of filters' },
      ]},
      { heading: 'Behavioral', items: [
        { code: 'Template Method', desc: 'JdbcTemplate, RestTemplate, AbstractController' },
        { code: 'Observer', desc: 'ApplicationEvent + @EventListener — pub/sub' },
        { code: 'Strategy', desc: 'Inject different implementations of same interface' },
        { code: 'Chain of Responsibility', desc: 'Spring Security filter chain' },
        { code: 'Command', desc: 'Spring @Async future tasks, CommandLineRunner' },
      ]},
    ]
  },

  {
    id: 'microservices-cheat',
    title: 'Microservices Patterns',
    color: '#ec4899',
    sections: [
      { heading: 'Communication', items: [
        { code: 'Synchronous: REST / gRPC', desc: 'Direct call — tight coupling' },
        { code: 'Async: Kafka / RabbitMQ', desc: 'Message-based — loose coupling' },
        { code: 'OpenFeign: @FeignClient', desc: 'Declarative REST client with load balancing' },
        { code: 'WebClient', desc: 'Non-blocking HTTP client for reactive MS' },
      ]},
      { heading: 'Resilience', items: [
        { code: 'Circuit Breaker (Resilience4j)', desc: 'Stop calls to failing service — fail fast' },
        { code: 'Retry with backoff', desc: 'Retry transient failures with exponential delay' },
        { code: 'Bulkhead', desc: 'Isolate failures — thread pool per downstream' },
        { code: 'Rate Limiter', desc: 'Limit requests per time window' },
        { code: 'Timeout', desc: '@TimeLimiter or WebClient.timeout()' },
      ]},
      { heading: 'Observability', items: [
        { code: 'Micrometer Tracing', desc: 'Distributed tracing — traceId + spanId per request' },
        { code: 'Zipkin / Jaeger', desc: 'Trace visualization dashboards' },
        { code: 'Prometheus + Grafana', desc: 'Metrics collection + dashboards' },
        { code: 'Spring Actuator', desc: '/health /metrics /info endpoints' },
        { code: 'Structured Logging (MDC)', desc: 'Inject traceId into all log lines' },
      ]},
      { heading: 'Data Patterns', items: [
        { code: 'Database per Service', desc: 'Each service owns its own DB (no shared DB)' },
        { code: 'Saga Pattern', desc: 'Distributed transactions via compensating actions' },
        { code: 'CQRS', desc: 'Separate read model from write model' },
        { code: 'Event Sourcing', desc: 'Store events, not state — replay to rebuild' },
        { code: 'Outbox Pattern', desc: 'Atomic: DB write + event publish in one transaction' },
      ]},
    ]
  }
];

// ─── EXTERNAL RESOURCES ─────────────────────────────────────────────

export const RESOURCES = [
  // --- Official Documentation ---
  { title: 'Spring Boot Reference Documentation', url: 'https://docs.spring.io/spring-boot/docs/current/reference/html/', tag: 'Official', tagColor: '#10b981', desc: 'The definitive guide from the Spring team. Auto-configuration, starters, production features.' },
  { title: 'Spring Framework Reference', url: 'https://docs.spring.io/spring-framework/reference/', tag: 'Official', tagColor: '#10b981', desc: 'Core Spring: IoC, AOP, data access, MVC, WebFlux, testing in full detail.' },
  { title: 'Project Reactor Reference', url: 'https://projectreactor.io/docs/core/release/reference/', tag: 'Official', tagColor: '#10b981', desc: 'Mono, Flux, schedulers, backpressure, error handling — the complete Reactor guide.' },
  { title: 'Spring Data JPA Reference', url: 'https://docs.spring.io/spring-data/jpa/reference/', tag: 'Official', tagColor: '#10b981', desc: 'JpaRepository, derived queries, @Query, projections, pagination, auditing.' },

  // --- Tutorials ---
  { title: 'Baeldung Spring Tutorials', url: 'https://www.baeldung.com/spring-tutorial', tag: 'Tutorial', tagColor: '#3b82f6', desc: 'The best third-party Spring tutorials with runnable examples. Start here for practical guides.' },
  { title: 'Baeldung Spring Boot', url: 'https://www.baeldung.com/spring-boot', tag: 'Tutorial', tagColor: '#3b82f6', desc: 'All Baeldung Spring Boot articles: actuator, testing, security, config, deployment.' },
  { title: 'Spring WebFlux Guide (Baeldung)', url: 'https://www.baeldung.com/spring-webflux', tag: 'Tutorial', tagColor: '#3b82f6', desc: 'Comprehensive WebFlux tutorial: annotated vs functional endpoints, WebClient, testing.' },
  { title: 'Reflectoring.io Spring Guides', url: 'https://reflectoring.io/categories/spring-boot/', tag: 'Tutorial', tagColor: '#3b82f6', desc: 'In-depth Spring Boot articles with production focus — security, testing, hexagonal arch.' },

  // --- Interview Prep ---
  { title: 'Spring Boot Interview Questions (GFG)', url: 'https://www.geeksforgeeks.org/springboot/spring-boot-interview-questions-and-answers/', tag: 'Interview', tagColor: '#f97316', desc: 'Top interview questions with detailed answers — auto-configuration, IOC, beans, actuator.' },
  { title: 'Java Interview Questions (GFG)', url: 'https://www.geeksforgeeks.org/java-interview-questions/', tag: 'Interview', tagColor: '#f97316', desc: 'Collections, concurrency, JVM, OOP, exception handling — all common Java interview topics.' },
  { title: 'Spring MVC Interview Questions', url: 'https://www.geeksforgeeks.org/spring-mvc-interview-questions/', tag: 'Interview', tagColor: '#f97316', desc: 'DispatcherServlet, @Controller, ViewResolver, interceptors, filters explained clearly.' },
  { title: 'Microservices Interview Questions', url: 'https://www.geeksforgeeks.org/microservices-interview-questions/', tag: 'Interview', tagColor: '#f97316', desc: 'Circuit breaker, service discovery, API gateway, saga, CQRS — microservices deep dive.' },

  // --- Reactive ---
  { title: 'Spring WebFlux Reference', url: 'https://docs.spring.io/spring-framework/reference/web/webflux.html', tag: 'Reactive', tagColor: '#06b6d4', desc: 'Official WebFlux docs: annotated controllers, functional endpoints, R2DBC, security.' },
  { title: 'Reactor by Example (DZone)', url: 'https://dzone.com/articles/reactor-core-tutorial', tag: 'Reactive', tagColor: '#06b6d4', desc: 'Hands-on Reactor tutorial with Mono/Flux examples, operators, and real-world patterns.' },

  // --- Design & Architecture ---
  { title: 'Refactoring Guru — Design Patterns (Java)', url: 'https://refactoring.guru/design-patterns/java', tag: 'Patterns', tagColor: '#8b5cf6', desc: 'Visual, high-quality explanations of all 23 Gang of Four patterns with Java code examples.' },
  { title: 'Martin Fowler — Microservices Guide', url: 'https://martinfowler.com/microservices/', tag: 'Architecture', tagColor: '#ec4899', desc: 'The seminal resource on microservices patterns, trade-offs, and when to use them.' },
];
