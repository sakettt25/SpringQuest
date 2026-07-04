export const SPRING_BOOT_OFFICE_MISSIONS = [
  {
    id: 'sbo-001', worldId: 'spring-boot-office', order: 1,
    title: 'application.yml — Your App\'s Control Panel',
    difficulty: 'easy', xpReward: 200, coinReward: 40, estimatedTime: 12,
    story: 'Welcome to Spring Boot Office! Every Spring Boot app has application.yml (or .properties) — a single file that controls everything: port, database URL, logging level, custom config. No more hardcoded values in Java code. Changing behaviour is a config edit, not a code change.',
    objective: 'Write a complete application.yml for a production Spring Boot app and then read those values in a @ConfigurationProperties class.',
    starterCode: `import org.springframework.boot.context.properties.ConfigurationProperties;\nimport org.springframework.boot.context.properties.EnableConfigurationProperties;\nimport org.springframework.stereotype.Component;\n\n// The corresponding application.yml for this class would be:\n// server:\n//   port: 9090\n// spring:\n//   application:\n//     name: springcorp-api\n//   datasource:\n//     url: jdbc:postgresql://localhost:5432/springcorp\n//     username: admin\n// app:\n//   max-page-size: 50\n//   enable-cache: true\n//   api-version: v2\n\n// TODO: @Component @ConfigurationProperties(prefix = "app")\n// class AppProperties with fields:\n//   int maxPageSize\n//   boolean enableCache\n//   String apiVersion\n//   Method: printAll() — print all 3 values\n\nclass Main {\n    public static void main(String[] args) {\n        AppProperties props = new AppProperties();\n        // Simulating what Spring Boot reads from application.yml\n        props.setMaxPageSize(50);\n        props.setEnableCache(true);\n        props.setApiVersion("v2");\n        props.printAll();\n    }\n}`,
    requirements: {
      annotations: ['Component', 'ConfigurationProperties'],
      patterns: [
        { name: 'AppProperties class', pattern: 'class\\s+AppProperties', required: true },
        { name: 'maxPageSize field', pattern: 'int\\s+maxPageSize|private\\s+int\\s+maxPage', required: true },
        { name: 'enableCache field', pattern: 'boolean\\s+enableCache', required: true },
        { name: 'apiVersion field', pattern: 'String\\s+apiVersion', required: true },
        { name: 'getters and setters', pattern: 'setMaxPageSize|setEnableCache|setApiVersion', required: true }
      ]
    },
    tests: [
      { name: '@ConfigurationProperties with prefix app', visible: true,
        validate: (code) => ({
          passed: /@ConfigurationProperties\s*\(\s*prefix\s*=\s*"app"\s*\)/.test(code),
          message: 'Add @ConfigurationProperties(prefix = "app") to AppProperties'
        })
      },
      { name: 'All 3 fields present', visible: true,
        validate: (code) => {
          const p = /int\s+maxPageSize/.test(code);
          const c = /boolean\s+enableCache/.test(code);
          const v = /String\s+apiVersion/.test(code);
          return { passed: p && c && v, message: 'Add int maxPageSize, boolean enableCache, String apiVersion fields' };
        }
      },
      { name: 'Setters for Spring binding', visible: true,
        validate: (code) => {
          const s1 = /setMaxPageSize/.test(code);
          const s2 = /setEnableCache/.test(code);
          const s3 = /setApiVersion/.test(code);
          return { passed: s1 && s2 && s3, message: 'Add setters — Spring uses them to bind yml values' };
        }
      }
    ],
    hiddenTests: [
      { name: 'printAll() prints all values', visible: false,
        validate: (code) => ({
          passed: /void\s+printAll/.test(code) && /System\.out\.println/.test(code),
          message: 'printAll() should print maxPageSize, enableCache, and apiVersion'
        })
      }
    ],
    hints: [
      '@Component @ConfigurationProperties(prefix = "app") class AppProperties { private int maxPageSize; private boolean enableCache; private String apiVersion; }',
      'Add standard getters AND setters — Spring needs setters to inject yml values: public void setMaxPageSize(int maxPageSize) { this.maxPageSize = maxPageSize; }',
      'yml key "max-page-size" maps to Java field "maxPageSize" — Spring auto-converts kebab-case to camelCase'
    ],
    solution: `import org.springframework.boot.context.properties.ConfigurationProperties;\nimport org.springframework.stereotype.Component;\n\n@Component\n@ConfigurationProperties(prefix = "app")\nclass AppProperties {\n    private int maxPageSize;\n    private boolean enableCache;\n    private String apiVersion;\n\n    public int getMaxPageSize() { return maxPageSize; }\n    public void setMaxPageSize(int maxPageSize) { this.maxPageSize = maxPageSize; }\n\n    public boolean isEnableCache() { return enableCache; }\n    public void setEnableCache(boolean enableCache) { this.enableCache = enableCache; }\n\n    public String getApiVersion() { return apiVersion; }\n    public void setApiVersion(String apiVersion) { this.apiVersion = apiVersion; }\n\n    public void printAll() {\n        System.out.println("maxPageSize: " + maxPageSize);\n        System.out.println("enableCache: " + enableCache);\n        System.out.println("apiVersion: " + apiVersion);\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        AppProperties props = new AppProperties();\n        props.setMaxPageSize(50);\n        props.setEnableCache(true);\n        props.setApiVersion("v2");\n        props.printAll();\n    }\n}`,
    explanation: '@ConfigurationProperties binds an entire yml block to a Java class. prefix = "app" means it reads all keys under "app:". Kebab-case yml keys (max-page-size) auto-convert to camelCase Java fields (maxPageSize). Prefer @ConfigurationProperties over multiple @Value annotations when you have 3+ related properties. Add @Validated to the class for automatic validation on startup.'
  },

  {
    id: 'sbo-002', worldId: 'spring-boot-office', order: 2,
    title: 'Spring Profiles — Dev vs Prod',
    difficulty: 'medium', xpReward: 220, coinReward: 45, estimatedTime: 14,
    story: 'SpringCorp runs in 3 environments: dev (local laptop), staging (test server), prod (live). Each needs different database URLs, logging levels, and feature flags. Spring Profiles let one codebase serve all environments — just switch the active profile.',
    objective: 'Create profile-specific configuration classes and @ConfigurationProperties that behave differently per profile. Show how properties override across profiles.',
    starterCode: `import org.springframework.boot.context.properties.ConfigurationProperties;\nimport org.springframework.context.annotation.Profile;\nimport org.springframework.stereotype.Component;\n\n// Base config (all profiles)\n// application.yml:\n// app:\n//   name: SpringCorp\n//   log-level: INFO\n\n// application-dev.yml adds:\n// app:\n//   log-level: DEBUG\n//   db-url: jdbc:h2:mem:devdb\n\n// application-prod.yml adds:\n// app:\n//   log-level: WARN\n//   db-url: jdbc:postgresql://prod:5432/app\n\n// TODO: @Component @ConfigurationProperties(prefix = "app") class BaseConfig\n// Fields: String name, String logLevel, String dbUrl\n// Method: describe() prints the config\n\n// TODO: @Component @Profile("dev") class DevBanner\n// @PostConstruct void show() — prints "=== DEV MODE === Hot reload enabled ==="\n\n// TODO: @Component @Profile("prod") class ProdBanner\n// @PostConstruct void show() — prints "=== PRODUCTION MODE === All monitoring active ==="\n\nclass Main {\n    public static void main(String[] args) {\n        System.out.println("Active profile: dev");\n        BaseConfig devConfig = new BaseConfig();\n        devConfig.setName("SpringCorp");\n        devConfig.setLogLevel("DEBUG"); // overridden by application-dev.yml\n        devConfig.setDbUrl("jdbc:h2:mem:devdb");\n        devConfig.describe();\n        new DevBanner().show();\n\n        System.out.println("\\nActive profile: prod");\n        BaseConfig prodConfig = new BaseConfig();\n        prodConfig.setName("SpringCorp");\n        prodConfig.setLogLevel("WARN");\n        prodConfig.setDbUrl("jdbc:postgresql://prod:5432/app");\n        prodConfig.describe();\n        new ProdBanner().show();\n    }\n}`,
    requirements: {
      annotations: ['Component', 'ConfigurationProperties', 'Profile'],
      patterns: [
        { name: 'BaseConfig class', pattern: 'class\\s+BaseConfig', required: true },
        { name: 'DevBanner with @Profile dev', pattern: '@Profile\\s*\\(\\s*"dev"\\s*\\)[\\s\\S]*?class\\s+DevBanner|class\\s+DevBanner', required: true },
        { name: 'ProdBanner with @Profile prod', pattern: '@Profile\\s*\\(\\s*"prod"\\s*\\)[\\s\\S]*?class\\s+ProdBanner|class\\s+ProdBanner', required: true },
        { name: 'describe method', pattern: 'void\\s+describe\\s*\\(\\s*\\)', required: true }
      ]
    },
    tests: [
      { name: 'BaseConfig has all 3 fields', visible: true,
        validate: (code) => {
          const n = /String\s+name/.test(code);
          const l = /String\s+logLevel/.test(code);
          const d = /String\s+dbUrl/.test(code);
          return { passed: n && l && d, message: 'BaseConfig needs String name, String logLevel, String dbUrl fields' };
        }
      },
      { name: 'Dev and Prod banners with @Profile', visible: true,
        validate: (code) => {
          const dev = /@Profile\s*\(\s*"dev"\s*\)/.test(code);
          const prod = /@Profile\s*\(\s*"prod"\s*\)/.test(code);
          return { passed: dev && prod, message: 'Add @Profile("dev") and @Profile("prod") to the banner classes' };
        }
      },
      { name: 'describe() prints config', visible: true,
        validate: (code) => ({
          passed: /void\s+describe\s*\(\s*\)/.test(code) && /System\.out\.println/.test(code),
          message: 'describe() should print name, logLevel, and dbUrl'
        })
      }
    ],
    hiddenTests: [
      { name: 'setters exist for binding', visible: false,
        validate: (code) => ({
          passed: /setName|setLogLevel|setDbUrl/.test(code),
          message: 'Add setters to BaseConfig so Spring can bind yml values'
        })
      }
    ],
    hints: [
      '@Component @ConfigurationProperties(prefix = "app") class BaseConfig { private String name; private String logLevel; private String dbUrl; // + getters + setters }',
      '@Component @Profile("dev") class DevBanner { @PostConstruct public void show() { System.out.println("=== DEV MODE ==="); } }',
      'Spring Boot profile activation: SPRING_PROFILES_ACTIVE=prod java -jar app.jar OR spring.profiles.active=dev in application.yml'
    ],
    solution: `import org.springframework.boot.context.properties.ConfigurationProperties;\nimport org.springframework.context.annotation.Profile;\nimport org.springframework.stereotype.Component;\nimport jakarta.annotation.PostConstruct;\n\n@Component\n@ConfigurationProperties(prefix = "app")\nclass BaseConfig {\n    private String name;\n    private String logLevel;\n    private String dbUrl;\n\n    public String getName() { return name; }\n    public void setName(String name) { this.name = name; }\n    public String getLogLevel() { return logLevel; }\n    public void setLogLevel(String logLevel) { this.logLevel = logLevel; }\n    public String getDbUrl() { return dbUrl; }\n    public void setDbUrl(String dbUrl) { this.dbUrl = dbUrl; }\n\n    public void describe() {\n        System.out.println("App: " + name + " | Log: " + logLevel + " | DB: " + dbUrl);\n    }\n}\n\n@Component\n@Profile("dev")\nclass DevBanner {\n    @PostConstruct\n    public void show() {\n        System.out.println("=== DEV MODE === Hot reload enabled ===\");\n    }\n}\n\n@Component\n@Profile("prod")\nclass ProdBanner {\n    @PostConstruct\n    public void show() {\n        System.out.println("=== PRODUCTION MODE === All monitoring active ===\");\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        System.out.println("Active profile: dev");\n        BaseConfig devCfg = new BaseConfig();\n        devCfg.setName("SpringCorp"); devCfg.setLogLevel("DEBUG"); devCfg.setDbUrl("jdbc:h2:mem:devdb");\n        devCfg.describe(); new DevBanner().show();\n\n        System.out.println("\\nActive profile: prod");\n        BaseConfig prodCfg = new BaseConfig();\n        prodCfg.setName("SpringCorp"); prodCfg.setLogLevel("WARN"); prodCfg.setDbUrl("jdbc:postgresql://prod:5432/app");\n        prodCfg.describe(); new ProdBanner().show();\n    }\n}`,
    explanation: 'Spring Boot profile resolution order: application.yml (base) → application-{profile}.yml (override). Profile-specific files merge with and override the base. Activate: spring.profiles.active=dev in application.yml OR SPRING_PROFILES_ACTIVE env var (preferred for production — never hardcode prod in yml). Environment variables always win over yml file values in Spring Boot.'
  },

  {
    id: 'sbo-003', worldId: 'spring-boot-office', order: 3,
    title: 'Spring Boot Actuator — Health & Metrics',
    difficulty: 'medium', xpReward: 230, coinReward: 47, estimatedTime: 14,
    story: 'Your production app is running but is it healthy? Is memory OK? How many HTTP requests per second? Actuator adds /actuator/health, /actuator/metrics, /actuator/info endpoints with zero code. Kubernetes uses /health for pod readiness probes.',
    objective: 'Configure Actuator endpoints and create a custom HealthIndicator and InfoContributor to expose application-specific health status.',
    starterCode: `import org.springframework.boot.actuate.health.*;\nimport org.springframework.boot.actuate.info.*;\nimport org.springframework.stereotype.Component;\nimport java.util.*;\n\n// In application.yml you would have:\n// management:\n//   endpoints:\n//     web:\n//       exposure:\n//         include: health,info,metrics,env\n//   endpoint:\n//     health:\n//       show-details: always\n\n// TODO: @Component class DatabaseHealthIndicator implements HealthIndicator\n// health() method:\n//   - Check if "connection" is available (simulate: always true in dev)\n//   - If UP: Health.up().withDetail("database", "PostgreSQL").withDetail("responseMs", 5).build()\n//   - If DOWN: Health.down().withDetail("error", "Cannot connect").build()\n\n// TODO: @Component class AppInfoContributor implements InfoContributor\n// contribute(Info.Builder builder) method:\n//   Add details: "version" -> "2.1.0", "team" -> "SpringCorp Engineering",\n//               "contact" -> "ops@springcorp.com"\n\nclass Main {\n    public static void main(String[] args) {\n        DatabaseHealthIndicator health = new DatabaseHealthIndicator();\n        Health h = health.health();\n        System.out.println("Health status: " + h.getStatus());\n        System.out.println("Health details: " + h.getDetails());\n\n        AppInfoContributor info = new AppInfoContributor();\n        Info.Builder builder = new Info.Builder();\n        info.contribute(builder);\n        System.out.println("App info: " + builder.build().getDetails());\n    }\n}`,
    requirements: {
      annotations: ['Component'],
      patterns: [
        { name: 'DatabaseHealthIndicator', pattern: 'class\\s+DatabaseHealthIndicator\\s+implements\\s+HealthIndicator', required: true },
        { name: 'Health.up() or Health.down()', pattern: 'Health\\.(up|down)\\s*\\(\\s*\\)', required: true },
        { name: 'withDetail()', pattern: '\\.withDetail\\s*\\(', required: true },
        { name: 'AppInfoContributor', pattern: 'class\\s+AppInfoContributor\\s+implements\\s+InfoContributor', required: true },
        { name: 'Info.Builder contribute', pattern: 'Info\\.Builder|builder\\.withDetail', required: true }
      ]
    },
    tests: [
      { name: 'DatabaseHealthIndicator implements HealthIndicator', visible: true,
        validate: (code) => ({
          passed: /class\s+DatabaseHealthIndicator\s+implements\s+HealthIndicator/.test(code),
          message: 'class DatabaseHealthIndicator implements HealthIndicator'
        })
      },
      { name: 'health() returns Health with details', visible: true,
        validate: (code) => ({
          passed: /Health\.(up|down)\s*\(\s*\)/.test(code) && /\.withDetail\s*\(/.test(code),
          message: 'Return Health.up().withDetail("key","value").build()'
        })
      },
      { name: 'AppInfoContributor implements InfoContributor', visible: true,
        validate: (code) => ({
          passed: /class\s+AppInfoContributor\s+implements\s+InfoContributor/.test(code),
          message: 'class AppInfoContributor implements InfoContributor'
        })
      }
    ],
    hiddenTests: [
      { name: 'Info has version and team details', visible: false,
        validate: (code) => ({
          passed: /version|2\.1\.0/.test(code) && /team|SpringCorp/.test(code),
          message: 'InfoContributor should include version and team details'
        })
      }
    ],
    hints: [
      '@Component class DatabaseHealthIndicator implements HealthIndicator { @Override public Health health() { return Health.up().withDetail("database","PostgreSQL").withDetail("responseMs",5).build(); } }',
      '@Component class AppInfoContributor implements InfoContributor { @Override public void contribute(Info.Builder builder) { builder.withDetail("version","2.1.0").withDetail("team","SpringCorp Engineering"); } }',
      'Access at runtime: GET /actuator/health → {"status":"UP","components":{"database":{"status":"UP","details":{...}}}}'
    ],
    solution: `import org.springframework.boot.actuate.health.*;\nimport org.springframework.boot.actuate.info.*;\nimport org.springframework.stereotype.Component;\nimport java.util.*;\n\n@Component\nclass DatabaseHealthIndicator implements HealthIndicator {\n    @Override\n    public Health health() {\n        boolean connected = true; // simulate DB check\n        if (connected) {\n            return Health.up()\n                .withDetail("database", "PostgreSQL")\n                .withDetail("responseMs", 5)\n                .build();\n        } else {\n            return Health.down()\n                .withDetail("error", "Cannot connect to database")\n                .build();\n        }\n    }\n}\n\n@Component\nclass AppInfoContributor implements InfoContributor {\n    @Override\n    public void contribute(Info.Builder builder) {\n        builder\n            .withDetail("version", "2.1.0")\n            .withDetail("team", "SpringCorp Engineering")\n            .withDetail("contact", "ops@springcorp.com");\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        DatabaseHealthIndicator health = new DatabaseHealthIndicator();\n        Health h = health.health();\n        System.out.println("Health status: " + h.getStatus());\n        System.out.println("Health details: " + h.getDetails());\n\n        AppInfoContributor info = new AppInfoContributor();\n        Info.Builder builder = new Info.Builder();\n        info.contribute(builder);\n        System.out.println("App info: " + builder.build().getDetails());\n    }\n}`,
    explanation: 'Actuator auto-registers HealthIndicator beans and aggregates them in /actuator/health. Status: UP, DOWN, UNKNOWN, OUT_OF_SERVICE. Kubernetes uses /health for readiness/liveness probes — if DOWN, K8s stops routing traffic and restarts the pod. InfoContributor adds data to /actuator/info. In microservices, every service needs health endpoints for the service mesh to monitor.'
  },

  {
    id: 'sbo-004', worldId: 'spring-boot-office', order: 4,
    title: '@ConditionalOnProperty — Feature Flags',
    difficulty: 'medium', xpReward: 235, coinReward: 48, estimatedTime: 14,
    story: 'The analytics team wants to enable a new recommendation engine but only for 10% of users. Engineering wants to be able to turn it off instantly without a deployment. @ConditionalOnProperty enables/disables beans based on config — instant feature flags.',
    objective: 'Use @ConditionalOnProperty to conditionally register a RecommendationEngine bean. Show how changing the config enables/disables the feature.',
    starterCode: `import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.stereotype.Service;\nimport java.util.*;\n\ninterface RecommendationEngine {\n    List<String> recommend(String userId);\n}\n\n// TODO: class MLRecommendationEngine implements RecommendationEngine\n// recommend() returns List.of("Product A", "Product B", "Product C")\n// Print "ML Engine: generating recommendations for [userId]" first\n\n// TODO: class FallbackRecommendationEngine implements RecommendationEngine\n// recommend() returns List.of("Best Sellers")\n// Print "Fallback: returning best sellers" first\n\n// TODO: @Configuration class RecommendationConfig\n// @Bean @ConditionalOnProperty(name = "features.ml-recommendations", havingValue = "true")\n// RecommendationEngine mlEngine() — returns new MLRecommendationEngine()\n//\n// @Bean @ConditionalOnProperty(name = "features.ml-recommendations", havingValue = "true", matchIfMissing = false)\n// can also use @ConditionalOnMissingBean for the fallback\n\n// TODO: @Service class ProductService\n// Inject Optional<RecommendationEngine> recommender\n// Method: getRecommendations(String userId) — uses recommender if present, else returns fallback\n\nclass Main {\n    public static void main(String[] args) {\n        System.out.println("=== Feature flag ON ===\");\n        MLRecommendationEngine ml = new MLRecommendationEngine();\n        System.out.println(ml.recommend("user-123"));\n\n        System.out.println("\\n=== Feature flag OFF ===\");\n        FallbackRecommendationEngine fallback = new FallbackRecommendationEngine();\n        System.out.println(fallback.recommend("user-123"));\n    }\n}`,
    requirements: {
      annotations: ['Configuration', 'Bean', 'ConditionalOnProperty', 'Service'],
      patterns: [
        { name: 'MLRecommendationEngine', pattern: 'class\\s+MLRecommendationEngine\\s+implements\\s+RecommendationEngine', required: true },
        { name: 'FallbackRecommendationEngine', pattern: 'class\\s+FallbackRecommendationEngine\\s+implements\\s+RecommendationEngine', required: true },
        { name: 'RecommendationConfig @Configuration', pattern: 'class\\s+RecommendationConfig', required: true },
        { name: 'ConditionalOnProperty usage', pattern: '@ConditionalOnProperty', required: true },
        { name: 'features.ml-recommendations property', pattern: 'features\\.ml-recommendations|ml.recommendations', required: true }
      ]
    },
    tests: [
      { name: 'Both engine implementations', visible: true,
        validate: (code) => {
          const ml = /class\s+MLRecommendationEngine\s+implements\s+RecommendationEngine/.test(code);
          const fb = /class\s+FallbackRecommendationEngine\s+implements\s+RecommendationEngine/.test(code);
          return { passed: ml && fb, message: 'Create both MLRecommendationEngine and FallbackRecommendationEngine' };
        }
      },
      { name: '@ConditionalOnProperty on ML engine bean', visible: true,
        validate: (code) => ({
          passed: /@ConditionalOnProperty/.test(code) && /ml.recommendations|ml-recommendations/.test(code),
          message: '@ConditionalOnProperty(name = "features.ml-recommendations", havingValue = "true")'
        })
      },
      { name: 'RecommendationConfig is @Configuration', visible: true,
        validate: (code) => ({
          passed: /@Configuration/.test(code) && /class\s+RecommendationConfig/.test(code),
          message: 'Add @Configuration to RecommendationConfig'
        })
      }
    ],
    hiddenTests: [
      { name: 'recommend() returns non-empty list', visible: false,
        validate: (code) => ({
          passed: /List\.of\s*\(/.test(code) && /recommend/.test(code),
          message: 'recommend() should return a non-empty List<String>'
        })
      }
    ],
    hints: [
      '@Bean @ConditionalOnProperty(name = "features.ml-recommendations", havingValue = "true") public RecommendationEngine mlEngine() { return new MLRecommendationEngine(); }',
      'application.yml to enable: features: ml-recommendations: true; to disable: false (or remove the key)',
      'In ProductService: if (recommender.isPresent()) { return recommender.get().recommend(userId); } else { return List.of("Best Sellers"); }'
    ],
    solution: `import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;\nimport org.springframework.context.annotation.Bean;\nimport org.springframework.context.annotation.Configuration;\nimport org.springframework.stereotype.Service;\nimport java.util.*;\n\ninterface RecommendationEngine {\n    List<String> recommend(String userId);\n}\n\nclass MLRecommendationEngine implements RecommendationEngine {\n    @Override\n    public List<String> recommend(String userId) {\n        System.out.println("ML Engine: generating recommendations for " + userId);\n        return List.of("Product A", "Product B", "Product C");\n    }\n}\n\nclass FallbackRecommendationEngine implements RecommendationEngine {\n    @Override\n    public List<String> recommend(String userId) {\n        System.out.println("Fallback: returning best sellers");\n        return List.of("Best Sellers");\n    }\n}\n\n@Configuration\nclass RecommendationConfig {\n    @Bean\n    @ConditionalOnProperty(name = "features.ml-recommendations", havingValue = "true")\n    public RecommendationEngine mlEngine() {\n        return new MLRecommendationEngine();\n    }\n\n    @Bean\n    @ConditionalOnProperty(name = "features.ml-recommendations", havingValue = "true", matchIfMissing = false)\n    public RecommendationEngine fallbackEngine() {\n        return new FallbackRecommendationEngine();\n    }\n}\n\n@Service\nclass ProductService {\n    private final Optional<RecommendationEngine> recommender;\n\n    public ProductService(Optional<RecommendationEngine> recommender) {\n        this.recommender = recommender;\n    }\n\n    public List<String> getRecommendations(String userId) {\n        return recommender.map(r -> r.recommend(userId))\n            .orElseGet(() -> List.of("Best Sellers"));\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        System.out.println("=== Feature flag ON ===\");\n        MLRecommendationEngine ml = new MLRecommendationEngine();\n        System.out.println(ml.recommend("user-123"));\n\n        System.out.println("\\n=== Feature flag OFF ===\");\n        FallbackRecommendationEngine fallback = new FallbackRecommendationEngine();\n        System.out.println(fallback.recommend("user-123"));\n    }\n}`,
    explanation: '@ConditionalOnProperty(name, havingValue) registers a bean ONLY if the property equals the value. matchIfMissing=true means "activate if property not set." @ConditionalOnMissingBean registers a bean only if no other bean of that type exists. These are used extensively in Spring Boot Auto-configuration — starters like spring-boot-starter-web conditionally configure themselves based on what\'s on the classpath and in your properties.'
  },

  {
    id: 'sbo-005', worldId: 'spring-boot-office', order: 5,
    title: 'Global Exception Handling — @ControllerAdvice',
    difficulty: 'medium', xpReward: 240, coinReward: 50, estimatedTime: 15,
    story: 'Without error handling, Spring returns ugly stack traces to clients when something goes wrong. Professional APIs return structured error responses with correct HTTP status codes. @RestControllerAdvice intercepts ALL exceptions across ALL controllers in one place.',
    objective: 'Build a complete error handling system: custom exceptions, an error response record, and a @RestControllerAdvice with handlers for each exception type.',
    starterCode: `import org.springframework.http.*;\nimport org.springframework.web.bind.annotation.*;\nimport java.time.*;\n\n// TODO: Custom exceptions\n// class ResourceNotFoundException extends RuntimeException (message constructor)\n// class ValidationException extends RuntimeException (message constructor)\n// class ConflictException extends RuntimeException (message constructor)\n\n// TODO: record ApiError(int status, String error, String message, String path, LocalDateTime timestamp)\n\n// TODO: @RestControllerAdvice class GlobalExceptionHandler\n// @ExceptionHandler(ResourceNotFoundException.class) -> 404 NOT_FOUND\n// @ExceptionHandler(ValidationException.class) -> 400 BAD_REQUEST\n// @ExceptionHandler(ConflictException.class) -> 409 CONFLICT\n// @ExceptionHandler(Exception.class) -> 500 INTERNAL_SERVER_ERROR (catch-all)\n// Each returns ResponseEntity<ApiError> with a built ApiError\n\n// TODO: @RestController @RequestMapping("/test") class TestController\n// @GetMapping("/not-found") throws ResourceNotFoundException(\"User 99 not found\")\n// @GetMapping("/bad") throws ValidationException(\"Email format invalid\")\n// @GetMapping("/ok") returns \"OK\" string\n\nclass Main {\n    public static void main(String[] args) {\n        GlobalExceptionHandler handler = new GlobalExceptionHandler();\n        ResponseEntity<ApiError> response;\n\n        response = handler.handleNotFound(new ResourceNotFoundException("User 99 not found"), "/test/not-found");\n        System.out.println("404: " + response.getStatusCode() + " | " + response.getBody().message());\n\n        response = handler.handleValidation(new ValidationException("Email format invalid"), "/test/bad");\n        System.out.println("400: " + response.getStatusCode() + " | " + response.getBody().message());\n    }\n}`,
    requirements: {
      annotations: ['RestControllerAdvice', 'ExceptionHandler', 'RestController', 'RequestMapping'],
      patterns: [
        { name: 'ResourceNotFoundException', pattern: 'class\\s+ResourceNotFoundException\\s+extends\\s+RuntimeException', required: true },
        { name: 'ValidationException', pattern: 'class\\s+ValidationException\\s+extends\\s+RuntimeException', required: true },
        { name: 'ApiError record', pattern: 'record\\s+ApiError\\s*\\(', required: true },
        { name: 'GlobalExceptionHandler', pattern: 'class\\s+GlobalExceptionHandler', required: true },
        { name: 'ResponseEntity return type', pattern: 'ResponseEntity<ApiError>', required: true }
      ]
    },
    tests: [
      { name: 'Custom exceptions defined', visible: true,
        validate: (code) => {
          const r = /class\s+ResourceNotFoundException\s+extends\s+RuntimeException/.test(code);
          const v = /class\s+ValidationException\s+extends\s+RuntimeException/.test(code);
          const c = /class\s+ConflictException\s+extends\s+RuntimeException/.test(code);
          return { passed: r && v && c, message: 'Create ResourceNotFoundException, ValidationException, and ConflictException' };
        }
      },
      { name: 'ApiError record with required fields', visible: true,
        validate: (code) => ({
          passed: /record\s+ApiError\s*\(/.test(code) && /int\s+status|LocalDateTime/.test(code),
          message: 'ApiError record needs status, error, message, path, timestamp fields'
        })
      },
      { name: '@RestControllerAdvice with @ExceptionHandler methods', visible: true,
        validate: (code) => {
          const advice = /@RestControllerAdvice/.test(code);
          const handlers = (code.match(/@ExceptionHandler/g) || []).length;
          return { passed: advice && handlers >= 3, actual: `${handlers} handlers`, message: '@RestControllerAdvice with at least 3 @ExceptionHandler methods' };
        }
      }
    ],
    hiddenTests: [
      { name: 'Catch-all for Exception.class', visible: false,
        validate: (code) => ({ passed: /@ExceptionHandler\s*\(\s*Exception\.class\s*\)/.test(code), message: 'Add a catch-all @ExceptionHandler(Exception.class) for 500 errors' })
      }
    ],
    hints: [
      'class ResourceNotFoundException extends RuntimeException { public ResourceNotFoundException(String msg) { super(msg); } }',
      'record ApiError(int status, String error, String message, String path, LocalDateTime timestamp) {}',
      '@ExceptionHandler(ResourceNotFoundException.class) public ResponseEntity<ApiError> handleNotFound(ResourceNotFoundException ex, HttpServletRequest req) { return ResponseEntity.status(404).body(new ApiError(404, "Not Found", ex.getMessage(), req.getRequestURI(), LocalDateTime.now())); }'
    ],
    solution: `import org.springframework.http.*;\nimport org.springframework.web.bind.annotation.*;\nimport jakarta.servlet.http.HttpServletRequest;\nimport java.time.*;\n\nclass ResourceNotFoundException extends RuntimeException {\n    public ResourceNotFoundException(String msg) { super(msg); }\n}\nclass ValidationException extends RuntimeException {\n    public ValidationException(String msg) { super(msg); }\n}\nclass ConflictException extends RuntimeException {\n    public ConflictException(String msg) { super(msg); }\n}\n\nrecord ApiError(int status, String error, String message, String path, LocalDateTime timestamp) {}\n\n@RestControllerAdvice\nclass GlobalExceptionHandler {\n    @ExceptionHandler(ResourceNotFoundException.class)\n    public ResponseEntity<ApiError> handleNotFound(ResourceNotFoundException ex, String path) {\n        return ResponseEntity.status(HttpStatus.NOT_FOUND)\n            .body(new ApiError(404, "Not Found", ex.getMessage(), path, LocalDateTime.now()));\n    }\n\n    @ExceptionHandler(ValidationException.class)\n    public ResponseEntity<ApiError> handleValidation(ValidationException ex, String path) {\n        return ResponseEntity.status(HttpStatus.BAD_REQUEST)\n            .body(new ApiError(400, "Bad Request", ex.getMessage(), path, LocalDateTime.now()));\n    }\n\n    @ExceptionHandler(ConflictException.class)\n    public ResponseEntity<ApiError> handleConflict(ConflictException ex, String path) {\n        return ResponseEntity.status(HttpStatus.CONFLICT)\n            .body(new ApiError(409, "Conflict", ex.getMessage(), path, LocalDateTime.now()));\n    }\n\n    @ExceptionHandler(Exception.class)\n    public ResponseEntity<ApiError> handleAll(Exception ex, String path) {\n        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)\n            .body(new ApiError(500, "Internal Error", "An unexpected error occurred", path, LocalDateTime.now()));\n    }\n}\n\n@RestController\n@RequestMapping("/test")\nclass TestController {\n    @GetMapping("/not-found")\n    public void notFound() { throw new ResourceNotFoundException("User 99 not found"); }\n\n    @GetMapping("/bad")\n    public void bad() { throw new ValidationException("Email format invalid"); }\n\n    @GetMapping("/ok")\n    public String ok() { return "OK"; }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        GlobalExceptionHandler handler = new GlobalExceptionHandler();\n        var r1 = handler.handleNotFound(new ResourceNotFoundException("User 99 not found"), "/test/not-found");\n        System.out.println("404: " + r1.getStatusCode() + " | " + r1.getBody().message());\n        var r2 = handler.handleValidation(new ValidationException("Email format invalid"), "/test/bad");\n        System.out.println("400: " + r2.getStatusCode() + " | " + r2.getBody().message());\n    }\n}`,
    explanation: '@RestControllerAdvice = @ControllerAdvice + @ResponseBody. It\'s a global interceptor for all exceptions from all controllers. @ExceptionHandler(SpecificException.class) targets one exception type. Always include a catch-all @ExceptionHandler(Exception.class) for 500 errors. Always return structured ApiError with timestamp and path — clients and monitoring tools need this for debugging. NEVER expose stack traces to clients in production.'
  },

  {
    id: 'sbo-006', worldId: 'spring-boot-office', order: 6,
    title: 'Logging — Structured & Levelled',
    difficulty: 'easy', xpReward: 200, coinReward: 40, estimatedTime: 10,
    story: 'System.out.println() is amateur logging. It can\'t be disabled in production, has no timestamps, no level filtering, and no log aggregation. Spring Boot uses SLF4J + Logback. Use Logger and log at the right level: TRACE < DEBUG < INFO < WARN < ERROR.',
    objective: 'Replace System.out.println with proper SLF4J logging at appropriate levels throughout a service. Use MDC for request-scoped context.',
    starterCode: `import org.slf4j.Logger;\nimport org.slf4j.LoggerFactory;\nimport org.slf4j.MDC;\nimport org.springframework.stereotype.Service;\n\n// TODO: @Service class OrderProcessingService\n// Field: private static final Logger log = LoggerFactory.getLogger(OrderProcessingService.class)\n//\n// Method: processOrder(String orderId, double amount)\n//   - MDC.put("orderId", orderId)  — adds orderId to ALL log lines in this thread\n//   - log.info("Processing order: {} for amount: {}", orderId, amount)\n//   - if (amount > 10000) log.warn("Large order detected: {} — review required", amount)\n//   - if (amount <= 0) log.error("Invalid amount: {} for order {}", amount, orderId)\n//   - Try a risky operation in try-catch: log.debug("Connecting to payment gateway")\n//   - In catch: log.error("Payment gateway failed for order {}", orderId, exception)\n//   - log.info("Order {} completed", orderId)\n//   - MDC.clear()  — always clean up MDC\n\nclass Main {\n    public static void main(String[] args) {\n        OrderProcessingService svc = new OrderProcessingService();\n        svc.processOrder("ORD-001", 299.99);\n        svc.processOrder("ORD-002", 15000.00); // should trigger WARN\n        svc.processOrder("ORD-003", -50.00);   // should trigger ERROR\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'Logger declaration', pattern: 'Logger\\s+log\\s*=\\s*LoggerFactory\\.getLogger', required: true },
        { name: 'log.info()', pattern: 'log\\.info\\s*\\(', required: true },
        { name: 'log.warn()', pattern: 'log\\.warn\\s*\\(', required: true },
        { name: 'log.error()', pattern: 'log\\.error\\s*\\(', required: true },
        { name: 'MDC.put()', pattern: 'MDC\\.put\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'Logger properly initialised', visible: true,
        validate: (code) => ({
          passed: /private\s+static\s+final\s+Logger\s+log/.test(code) && /LoggerFactory\.getLogger/.test(code),
          message: 'private static final Logger log = LoggerFactory.getLogger(OrderProcessingService.class);'
        })
      },
      { name: 'Uses all 3 log levels', visible: true,
        validate: (code) => {
          const info = /log\.info\s*\(/.test(code);
          const warn = /log\.warn\s*\(/.test(code);
          const error = /log\.error\s*\(/.test(code);
          return { passed: info && warn && error, message: 'Use log.info(), log.warn(), and log.error()' };
        }
      },
      { name: 'MDC used for context', visible: true,
        validate: (code) => ({
          passed: /MDC\.put\s*\(/.test(code) && /MDC\.clear\s*\(\s*\)/.test(code),
          message: 'Use MDC.put() to add context and MDC.clear() to clean up'
        })
      }
    ],
    hiddenTests: [
      { name: 'Parameterised logging (no string concat)', visible: false,
        validate: (code) => {
          const hasConcat = /log\.(info|warn|error|debug)\s*\(\s*"[^"]*"\s*\+/.test(code);
          return { passed: !hasConcat, message: 'Use {} placeholders instead of string concatenation in log messages' };
        }
      }
    ],
    hints: [
      'private static final Logger log = LoggerFactory.getLogger(OrderProcessingService.class);',
      'log.info("Processing order: {} for amount: {}", orderId, amount); — {} is a placeholder, fills in order of args',
      'MDC.put("orderId", orderId); // must call MDC.clear() in finally{} block to prevent leaking'
    ],
    solution: `import org.slf4j.Logger;\nimport org.slf4j.LoggerFactory;\nimport org.slf4j.MDC;\nimport org.springframework.stereotype.Service;\n\n@Service\nclass OrderProcessingService {\n    private static final Logger log = LoggerFactory.getLogger(OrderProcessingService.class);\n\n    public void processOrder(String orderId, double amount) {\n        MDC.put("orderId", orderId);\n        try {\n            log.info("Processing order: {} for amount: {}", orderId, amount);\n\n            if (amount > 10000) {\n                log.warn("Large order detected: {} — manual review required", amount);\n            }\n            if (amount <= 0) {\n                log.error("Invalid amount: {} for order {}", amount, orderId);\n                return;\n            }\n\n            log.debug("Connecting to payment gateway");\n            // simulate processing\n            log.info("Order {} completed successfully", orderId);\n\n        } catch (Exception e) {\n            log.error("Payment gateway failed for order {}", orderId, e);\n        } finally {\n            MDC.clear();\n        }\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        OrderProcessingService svc = new OrderProcessingService();\n        svc.processOrder("ORD-001", 299.99);\n        svc.processOrder("ORD-002", 15000.00);\n        svc.processOrder("ORD-003", -50.00);\n    }\n}`,
    explanation: 'SLF4J is the logging facade, Logback/Log4j2 is the implementation. Log levels in order: TRACE → DEBUG → INFO → WARN → ERROR. In production: set INFO or WARN level to reduce noise. Use {} placeholders — they only evaluate the arguments if that log level is active (performance). MDC (Mapped Diagnostic Context) is thread-local storage for request-scoped data like requestId, userId, traceId — it auto-appears in every log line from that thread.'
  },

  {
    id: 'sbo-007', worldId: 'spring-boot-office', order: 7,
    title: '@Async & @Scheduled — Background Processing',
    difficulty: 'medium', xpReward: 240, coinReward: 50, estimatedTime: 15,
    story: 'Sending a welcome email shouldn\'t make the user wait 2 seconds for their registration to complete. @Async runs it in a background thread pool. @Scheduled runs tasks on a timer — daily reports, cleanup jobs, heartbeat pings to external services.',
    objective: 'Configure @EnableAsync and @EnableScheduling. Create an @Async email service and a @Scheduled report generator.',
    starterCode: `import org.springframework.context.annotation.Configuration;\nimport org.springframework.scheduling.annotation.EnableAsync;\nimport org.springframework.scheduling.annotation.EnableScheduling;\nimport org.springframework.scheduling.annotation.Async;\nimport org.springframework.scheduling.annotation.Scheduled;\nimport org.springframework.stereotype.Component;\nimport org.springframework.stereotype.Service;\nimport java.time.LocalDateTime;\nimport java.util.concurrent.CompletableFuture;\n\n// TODO: @Configuration @EnableAsync @EnableScheduling class AsyncConfig\n\n// TODO: @Service class NotificationService\n// @Async method: CompletableFuture<String> sendWelcomeEmail(String to)\n//   - Thread.sleep(100) to simulate slow email\n//   - Print "Email sent to: [to] on thread: [Thread.currentThread().getName()]"\n//   - return CompletableFuture.completedFuture("Sent to " + to)\n\n// TODO: @Component class ReportScheduler\n// @Scheduled(fixedRate = 5000) void generateHourlyReport()\n//   - Print "Hourly report generated at: [LocalDateTime.now()]"\n// @Scheduled(cron = "0 0 2 * * ?") void generateDailyReport()\n//   - Print "Daily report generated at: [LocalDateTime.now()]"\n\nclass Main {\n    public static void main(String[] args) throws Exception {\n        // Demonstrate async (non-blocking)\n        NotificationService notif = new NotificationService();\n        System.out.println("Starting email send...");\n        CompletableFuture<String> future = notif.sendWelcomeEmail("alice@corp.com");\n        System.out.println("Control returned immediately! (email runs in background)");\n        System.out.println("Result: " + future.get()); // wait for result\n\n        // Demonstrate scheduled\n        ReportScheduler scheduler = new ReportScheduler();\n        scheduler.generateHourlyReport();\n    }\n}`,
    requirements: {
      annotations: ['Configuration', 'EnableAsync', 'EnableScheduling', 'Async', 'Scheduled', 'Service', 'Component'],
      patterns: [
        { name: 'AsyncConfig class', pattern: 'class\\s+AsyncConfig', required: true },
        { name: 'CompletableFuture return type', pattern: 'CompletableFuture<String>', required: true },
        { name: '@Scheduled fixedRate', pattern: '@Scheduled\\s*\\(\\s*fixedRate', required: true },
        { name: '@Scheduled cron', pattern: '@Scheduled\\s*\\(\\s*cron', required: true }
      ]
    },
    tests: [
      { name: '@EnableAsync and @EnableScheduling configured', visible: true,
        validate: (code) => {
          const async = /@EnableAsync/.test(code);
          const sched = /@EnableScheduling/.test(code);
          return { passed: async && sched, message: 'Add @EnableAsync and @EnableScheduling to the config class' };
        }
      },
      { name: '@Async on email method with CompletableFuture', visible: true,
        validate: (code) => ({
          passed: /@Async/.test(code) && /CompletableFuture<String>/.test(code),
          message: '@Async public CompletableFuture<String> sendWelcomeEmail(String to)'
        })
      },
      { name: 'Both @Scheduled variants used', visible: true,
        validate: (code) => {
          const fixed = /@Scheduled\s*\(\s*fixedRate/.test(code);
          const cron = /@Scheduled\s*\(\s*cron/.test(code);
          return { passed: fixed && cron, message: 'Use @Scheduled(fixedRate=...) and @Scheduled(cron="...")' };
        }
      }
    ],
    hiddenTests: [
      { name: 'Cron expression is valid', visible: false,
        validate: (code) => ({
          passed: /@Scheduled\s*\(\s*cron\s*=\s*"0\s+0\s+/.test(code),
          message: 'Cron expression should be in "s m h dom mon dow" format'
        })
      }
    ],
    hints: [
      '@Configuration @EnableAsync @EnableScheduling class AsyncConfig {}',
      '@Async public CompletableFuture<String> sendWelcomeEmail(String to) { Thread.sleep(100); return CompletableFuture.completedFuture("Sent to " + to); }',
      '@Scheduled(fixedRate = 5000) — runs every 5 seconds | @Scheduled(cron = "0 0 2 * * ?") — runs at 2:00 AM daily'
    ],
    solution: `import org.springframework.context.annotation.Configuration;\nimport org.springframework.scheduling.annotation.EnableAsync;\nimport org.springframework.scheduling.annotation.EnableScheduling;\nimport org.springframework.scheduling.annotation.Async;\nimport org.springframework.scheduling.annotation.Scheduled;\nimport org.springframework.stereotype.Component;\nimport org.springframework.stereotype.Service;\nimport java.time.LocalDateTime;\nimport java.util.concurrent.CompletableFuture;\n\n@Configuration\n@EnableAsync\n@EnableScheduling\nclass AsyncConfig {}\n\n@Service\nclass NotificationService {\n    @Async\n    public CompletableFuture<String> sendWelcomeEmail(String to) throws InterruptedException {\n        Thread.sleep(100);\n        System.out.println("Email sent to: " + to + " on thread: " + Thread.currentThread().getName());\n        return CompletableFuture.completedFuture("Sent to " + to);\n    }\n}\n\n@Component\nclass ReportScheduler {\n    @Scheduled(fixedRate = 5000)\n    public void generateHourlyReport() {\n        System.out.println("Hourly report generated at: " + LocalDateTime.now());\n    }\n\n    @Scheduled(cron = "0 0 2 * * ?")\n    public void generateDailyReport() {\n        System.out.println("Daily report generated at: " + LocalDateTime.now());\n    }\n}\n\nclass Main {\n    public static void main(String[] args) throws Exception {\n        NotificationService notif = new NotificationService();\n        System.out.println("Starting email send...");\n        CompletableFuture<String> future = notif.sendWelcomeEmail("alice@corp.com");\n        System.out.println("Control returned immediately!");\n        System.out.println("Result: " + future.get());\n        ReportScheduler scheduler = new ReportScheduler();\n        scheduler.generateHourlyReport();\n    }\n}`,
    explanation: '@Async executes a method in a separate thread from Spring\'s task executor pool. The caller continues immediately. Return CompletableFuture<T> to get the result later. @Scheduled runs methods on a timer: fixedRate (every N ms, measured from start), fixedDelay (N ms after completion), cron ("s m h dom mon dow"). Always configure a custom thread pool for @Async in production (otherwise it defaults to a simple executor that can cause issues under load).'
  },

  {
    id: 'sbo-008', worldId: 'spring-boot-office', order: 8,
    title: '🏆 Boss: Complete Spring Boot App Config',
    difficulty: 'boss', xpReward: 480, coinReward: 140, estimatedTime: 30,
    story: '⚔️ BOSS CHALLENGE! Configure a complete production-ready Spring Boot application. Every real app needs ALL of this: configuration properties, health checks, exception handling, async processing, scheduling, and proper logging.',
    objective: 'Build SpringCorp\'s platform config: AppProperties, a HealthIndicator, GlobalExceptionHandler, async EmailService, @Scheduled cleanup job, and proper Logger setup across all classes.',
    starterCode: `import org.springframework.boot.context.properties.ConfigurationProperties;\nimport org.springframework.boot.actuate.health.*;\nimport org.springframework.http.*;\nimport org.springframework.scheduling.annotation.*;\nimport org.springframework.stereotype.*;\nimport org.springframework.web.bind.annotation.*;\nimport org.slf4j.*;\nimport jakarta.annotation.*;\nimport java.time.*;\nimport java.util.concurrent.CompletableFuture;\n\n// 1. TODO: @ConfigurationProperties(prefix="springcorp") class SpringCorpProperties\n//    Fields: String appVersion, int maxUsers, boolean maintenanceMode\n//    Getters + setters\n\n// 2. TODO: @Component class PlatformHealthIndicator implements HealthIndicator\n//    If maintenanceMode: Health.down().withDetail("reason","maintenance")\n//    Else: Health.up().withDetail("appVersion", props.getAppVersion()).withDetail("maxUsers", props.getMaxUsers())\n\n// 3. TODO: @RestControllerAdvice class PlatformExceptionHandler\n//    @ExceptionHandler(IllegalArgumentException.class) -> 400\n//    @ExceptionHandler(Exception.class) -> 500\n//    Both log.error() the exception and return ResponseEntity<String>\n\n// 4. TODO: @Service class PlatformEmailService\n//    Logger log = LoggerFactory.getLogger(...)\n//    @Async CompletableFuture<String> sendAsync(String to, String subject)\n//      log.info(), Thread.sleep(50), return CompletableFuture.completedFuture\n\n// 5. TODO: @Component class PlatformScheduler\n//    Logger log = ...\n//    @PostConstruct startup log\n//    @Scheduled(fixedRate=60000) healthCheck() - log.info(\"Health OK\")\n//    @Scheduled(cron=\"0 0 0 * * ?\") dailyCleanup() - log.info(\"Daily cleanup\")\n\nclass Main {\n    public static void main(String[] args) throws Exception {\n        SpringCorpProperties props = new SpringCorpProperties();\n        props.setAppVersion("3.0.0");\n        props.setMaxUsers(5000);\n        props.setMaintenanceMode(false);\n\n        PlatformHealthIndicator health = new PlatformHealthIndicator(props);\n        System.out.println("Health: " + health.health().getStatus() + " | " + health.health().getDetails());\n\n        PlatformEmailService email = new PlatformEmailService();\n        CompletableFuture<String> result = email.sendAsync("user@corp.com", "Welcome!");\n        System.out.println("Email result: " + result.get());\n\n        PlatformScheduler scheduler = new PlatformScheduler();\n        scheduler.startup();\n        scheduler.healthCheck();\n    }\n}`,
    requirements: {
      annotations: ['ConfigurationProperties', 'Component', 'RestControllerAdvice', 'ExceptionHandler', 'Service', 'Async', 'Scheduled', 'PostConstruct'],
      patterns: [
        { name: 'SpringCorpProperties', pattern: 'class\\s+SpringCorpProperties', required: true },
        { name: 'PlatformHealthIndicator', pattern: 'class\\s+PlatformHealthIndicator\\s+implements\\s+HealthIndicator', required: true },
        { name: 'PlatformExceptionHandler', pattern: 'class\\s+PlatformExceptionHandler', required: true },
        { name: 'PlatformEmailService with @Async', pattern: 'class\\s+PlatformEmailService', required: true },
        { name: 'PlatformScheduler', pattern: 'class\\s+PlatformScheduler', required: true },
        { name: 'Logger in at least 2 classes', pattern: 'LoggerFactory\\.getLogger', required: true }
      ]
    },
    tests: [
      { name: 'All 5 components defined', visible: true,
        validate: (code) => {
          const checks = [
            /class\s+SpringCorpProperties/.test(code),
            /class\s+PlatformHealthIndicator\s+implements\s+HealthIndicator/.test(code),
            /class\s+PlatformExceptionHandler/.test(code),
            /class\s+PlatformEmailService/.test(code),
            /class\s+PlatformScheduler/.test(code)
          ];
          const count = checks.filter(Boolean).length;
          return { passed: count === 5, actual: `${count}/5`, message: 'All 5 classes required: Properties, HealthIndicator, ExceptionHandler, EmailService, Scheduler' };
        }
      },
      { name: 'Proper logging in services', visible: true,
        validate: (code) => {
          const loggers = (code.match(/LoggerFactory\.getLogger/g) || []).length;
          return { passed: loggers >= 2, actual: `${loggers} loggers`, message: 'Add Logger to at least 2 classes' };
        }
      },
      { name: '@Async email with CompletableFuture', visible: true,
        validate: (code) => ({
          passed: /@Async/.test(code) && /CompletableFuture/.test(code),
          message: 'PlatformEmailService needs @Async method returning CompletableFuture<String>'
        })
      },
      { name: '@Scheduled with both fixedRate and cron', visible: true,
        validate: (code) => {
          const fr = /@Scheduled\s*\(\s*fixedRate/.test(code);
          const cr = /@Scheduled\s*\(\s*cron/.test(code);
          return { passed: fr && cr, message: 'PlatformScheduler needs both fixedRate and cron @Scheduled methods' };
        }
      }
    ],
    hiddenTests: [
      { name: 'HealthIndicator uses props', visible: false,
        validate: (code) => ({
          passed: /PlatformHealthIndicator\s*\(\s*SpringCorpProperties/.test(code) || /maintenanceMode|getMaintenanceMode/.test(code),
          message: 'PlatformHealthIndicator should inject SpringCorpProperties and use maintenanceMode'
        })
      }
    ],
    hints: [
      'PlatformHealthIndicator constructor: public PlatformHealthIndicator(SpringCorpProperties props) { this.props = props; }',
      'health() method: if (props.isMaintenanceMode()) return Health.down().withDetail("reason","maintenance").build(); else return Health.up()...',
      '@Async public CompletableFuture<String> sendAsync(String to, String subject) { log.info("Sending async email to {}", to); Thread.sleep(50); return CompletableFuture.completedFuture("Sent: " + subject + " to " + to); }'
    ],
    solution: `import org.springframework.boot.context.properties.ConfigurationProperties;\nimport org.springframework.boot.actuate.health.*;\nimport org.springframework.http.*;\nimport org.springframework.scheduling.annotation.*;\nimport org.springframework.stereotype.*;\nimport org.springframework.web.bind.annotation.*;\nimport org.slf4j.*;\nimport jakarta.annotation.*;\nimport java.time.*;\nimport java.util.concurrent.CompletableFuture;\n\n@Component\n@ConfigurationProperties(prefix = "springcorp")\nclass SpringCorpProperties {\n    private String appVersion = "1.0.0";\n    private int maxUsers = 1000;\n    private boolean maintenanceMode = false;\n    public String getAppVersion() { return appVersion; }\n    public void setAppVersion(String v) { this.appVersion = v; }\n    public int getMaxUsers() { return maxUsers; }\n    public void setMaxUsers(int m) { this.maxUsers = m; }\n    public boolean isMaintenanceMode() { return maintenanceMode; }\n    public void setMaintenanceMode(boolean m) { this.maintenanceMode = m; }\n}\n\n@Component\nclass PlatformHealthIndicator implements HealthIndicator {\n    private final SpringCorpProperties props;\n    public PlatformHealthIndicator(SpringCorpProperties props) { this.props = props; }\n    @Override\n    public Health health() {\n        if (props.isMaintenanceMode()) return Health.down().withDetail("reason","maintenance").build();\n        return Health.up().withDetail("appVersion", props.getAppVersion()).withDetail("maxUsers", props.getMaxUsers()).build();\n    }\n}\n\n@RestControllerAdvice\nclass PlatformExceptionHandler {\n    private static final Logger log = LoggerFactory.getLogger(PlatformExceptionHandler.class);\n    @ExceptionHandler(IllegalArgumentException.class)\n    public ResponseEntity<String> handleBad(IllegalArgumentException ex) {\n        log.error("Bad request: {}", ex.getMessage()); return ResponseEntity.badRequest().body(ex.getMessage());\n    }\n    @ExceptionHandler(Exception.class)\n    public ResponseEntity<String> handleAll(Exception ex) {\n        log.error("Unexpected error", ex); return ResponseEntity.internalServerError().body("Internal error");\n    }\n}\n\n@Service\nclass PlatformEmailService {\n    private static final Logger log = LoggerFactory.getLogger(PlatformEmailService.class);\n    @Async\n    public CompletableFuture<String> sendAsync(String to, String subject) throws InterruptedException {\n        log.info("Sending async email to {} subject: {}", to, subject);\n        Thread.sleep(50);\n        return CompletableFuture.completedFuture("Sent: " + subject + " to " + to);\n    }\n}\n\n@Component\nclass PlatformScheduler {\n    private static final Logger log = LoggerFactory.getLogger(PlatformScheduler.class);\n    @PostConstruct\n    public void startup() { log.info("PlatformScheduler started at {}", LocalDateTime.now()); }\n    @Scheduled(fixedRate = 60000)\n    public void healthCheck() { log.info("Health check OK at {}", LocalDateTime.now()); }\n    @Scheduled(cron = "0 0 0 * * ?")\n    public void dailyCleanup() { log.info("Daily cleanup at {}", LocalDateTime.now()); }\n}\n\nclass Main {\n    public static void main(String[] args) throws Exception {\n        SpringCorpProperties props = new SpringCorpProperties();\n        props.setAppVersion("3.0.0"); props.setMaxUsers(5000); props.setMaintenanceMode(false);\n        PlatformHealthIndicator health = new PlatformHealthIndicator(props);\n        System.out.println("Health: " + health.health().getStatus() + " | " + health.health().getDetails());\n        PlatformEmailService email = new PlatformEmailService();\n        CompletableFuture<String> result = email.sendAsync("user@corp.com", "Welcome!");\n        System.out.println("Email: " + result.get());\n        PlatformScheduler scheduler = new PlatformScheduler();\n        scheduler.startup(); scheduler.healthCheck();\n    }\n}`,
    explanation: 'You just configured a production-grade Spring Boot application: type-safe config, health monitoring for Kubernetes, structured error responses for API consumers, async processing for performance, scheduled jobs for maintenance, and proper logging throughout. This is the boilerplate that every real Spring Boot service at any company starts with. The patterns here are identical to what you\'d see at Netflix, Uber, or any modern tech company using Spring.'
  }
];
