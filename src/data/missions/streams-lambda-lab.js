export const STREAMS_LAMBDA_MISSIONS = [
  {
    id: 'sl-001', worldId: 'streams-lambda-lab', order: 1,
    title: 'Lambda Expressions',
    difficulty: 'easy', xpReward: 170, coinReward: 35, estimatedTime: 12,
    story: 'Welcome to the Streams & Lambda Lab! Every modern Spring service uses lambdas — from .map(user -> user.getName()) in streams to (auth) -> auth.anyRequest().authenticated() in security configs. Lambdas are anonymous functions you pass as arguments.',
    objective: 'Replace verbose anonymous class implementations with lambda expressions. Implement Runnable, Comparator, and a custom FunctionalInterface using lambdas.',
    starterCode: `import java.util.*;\n\n@FunctionalInterface\ninterface Validator<T> {\n    boolean validate(T value);\n}\n\npublic class LambdaBasics {\n    public static void main(String[] args) {\n        // TODO: Create a Runnable lambda that prints "Server started on port 8080"\n        // Run it with thread.start() or run()\n\n        // TODO: Create a Comparator<String> lambda that compares by string length\n        List<String> services = Arrays.asList("auth-service", "api", "user-management");\n        // Sort using your Comparator lambda\n\n        // TODO: Create a Validator<String> lambda that returns true if length > 5\n        // Test it with "hi" and "hello-world"\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'Runnable lambda', pattern: 'Runnable\\s+\\w+\\s*=\\s*\\(\\s*\\)\\s*->|Runnable\\s+\\w+\\s*=\\s*()->|()->\\s*\\{', required: true },
        { name: 'Comparator lambda', pattern: 'Comparator<String>\\s+\\w+\\s*=|\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)\\s*->', required: true },
        { name: 'Validator lambda', pattern: 'Validator<String>|value\\s*->|\\w+\\s*->.*length', required: true },
        { name: 'sort with lambda', pattern: 'sort\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'Runnable lambda defined', visible: true,
        validate: (code) => ({
          passed: /Runnable\s+\w+\s*=\s*\(\s*\)\s*->/.test(code) || /Runnable\s+\w+\s*=\s*\(\)\s*->/.test(code),
          message: 'Runnable r = () -> System.out.println("...");'
        })
      },
      { name: 'Comparator lambda sorts by length', visible: true,
        validate: (code) => {
          const hasComp = /Comparator<String>/.test(code) || /\(\s*\w+\s*,\s*\w+\s*\)\s*->/.test(code);
          const hasLength = /\.length\s*\(\s*\)/.test(code);
          return { passed: hasComp && hasLength, message: 'Use a lambda Comparator that compares by .length()' };
        }
      },
      { name: 'Custom Validator<String> lambda', visible: true,
        validate: (code) => ({
          passed: /Validator<String>/.test(code),
          message: 'Create a Validator<String> lambda'
        })
      }
    ],
    hiddenTests: [
      { name: 'Functional interface annotation present', visible: false,
        validate: (code) => ({ passed: /@FunctionalInterface/.test(code), message: '@FunctionalInterface annotation should be present' })
      }
    ],
    hints: [
      'Runnable r = () -> System.out.println("Server started on port 8080"); r.run();',
      'Comparator<String> byLength = (a, b) -> a.length() - b.length(); services.sort(byLength);',
      'Validator<String> longEnough = value -> value.length() > 5; System.out.println(longEnough.validate("hi"));'
    ],
    solution: `import java.util.*;\n\n@FunctionalInterface\ninterface Validator<T> {\n    boolean validate(T value);\n}\n\npublic class LambdaBasics {\n    public static void main(String[] args) {\n        Runnable startup = () -> System.out.println("Server started on port 8080");\n        startup.run();\n\n        Comparator<String> byLength = (a, b) -> a.length() - b.length();\n        List<String> services = new ArrayList<>(Arrays.asList("auth-service", "api", "user-management"));\n        services.sort(byLength);\n        System.out.println("Sorted by length: " + services);\n\n        Validator<String> longEnough = value -> value.length() > 5;\n        System.out.println("hi valid: " + longEnough.validate("hi"));\n        System.out.println("hello-world valid: " + longEnough.validate("hello-world"));\n    }\n}`,
    explanation: 'A lambda is an anonymous function: (params) -> expression or (params) -> { body; }. Any interface with exactly one method (@FunctionalInterface) can be implemented as a lambda. In Spring, lambdas appear everywhere: security configs, WebClient responses, async callbacks, stream pipelines. Mastering lambda syntax makes Spring code readable and writable.'
  },

  {
    id: 'sl-002', worldId: 'streams-lambda-lab', order: 2,
    title: 'filter() — Selecting Data',
    difficulty: 'easy', xpReward: 175, coinReward: 35, estimatedTime: 12,
    story: 'The admin panel needs to show only active employees earning above 70k. With loops you\'d write 10 lines. With filter(), you write 1. Spring services use filter() constantly to clean up repository results before returning to the controller.',
    objective: 'Use Stream.filter() with multiple predicates to select specific employees from a list. Chain multiple filter() calls.',
    starterCode: `import java.util.*;\nimport java.util.stream.*;\n\nrecord Employee(String name, String department, double salary, boolean active) {}\n\npublic class FilterDemo {\n    public static void main(String[] args) {\n        List<Employee> employees = List.of(\n            new Employee("Alice", "Engineering", 95000, true),\n            new Employee("Bob", "HR", 65000, true),\n            new Employee("Charlie", "Engineering", 80000, false),\n            new Employee("Diana", "Sales", 72000, true),\n            new Employee("Eve", "Engineering", 110000, true)\n        );\n\n        // TODO: Filter to only ACTIVE employees earning > 70000\n        // Print each matching employee's name and salary\n\n        // TODO: Count how many Engineering employees are active\n\n        // TODO: Check if ANY employee earns more than 100000 using anyMatch()\n\n        // TODO: Check if ALL active employees earn more than 50000 using allMatch()\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'stream()', pattern: '\\.stream\\s*\\(\\s*\\)', required: true },
        { name: 'filter()', pattern: '\\.filter\\s*\\(', required: true },
        { name: 'anyMatch or allMatch', pattern: '\\.anyMatch\\s*\\(|\\.allMatch\\s*\\(', required: true },
        { name: 'count() or collect()', pattern: '\\.count\\s*\\(\\s*\\)|\\.collect\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'Uses stream().filter()', visible: true,
        validate: (code) => ({
          passed: /\.stream\s*\(\s*\)[\s\S]*?\.filter\s*\(/.test(code),
          message: 'Use .stream().filter() on the employee list'
        })
      },
      { name: 'Filters by active and salary', visible: true,
        validate: (code) => {
          const hasActive = /active|isActive/.test(code);
          const hasSalary = /salary|70000/.test(code);
          return { passed: hasActive && hasSalary, message: 'Filter by both active status and salary threshold' };
        }
      },
      { name: 'Uses anyMatch() and allMatch()', visible: true,
        validate: (code) => {
          const any = /\.anyMatch\s*\(/.test(code);
          const all = /\.allMatch\s*\(/.test(code);
          return { passed: any && all, message: 'Use both anyMatch() and allMatch()' };
        }
      }
    ],
    hiddenTests: [
      { name: 'Multiple filter() chained', visible: false,
        validate: (code) => {
          const filters = (code.match(/\.filter\s*\(/g) || []).length;
          return { passed: filters >= 2, message: 'Chain multiple filter() calls for different conditions' };
        }
      }
    ],
    hints: [
      'employees.stream().filter(e -> e.active()).filter(e -> e.salary() > 70000).forEach(e -> System.out.println(e.name()));',
      'long count = employees.stream().filter(e -> e.department().equals("Engineering")).filter(e -> e.active()).count();',
      'boolean anyOver100k = employees.stream().anyMatch(e -> e.salary() > 100000);'
    ],
    solution: `import java.util.*;\nimport java.util.stream.*;\n\nrecord Employee(String name, String department, double salary, boolean active) {}\n\npublic class FilterDemo {\n    public static void main(String[] args) {\n        List<Employee> employees = List.of(\n            new Employee("Alice", "Engineering", 95000, true),\n            new Employee("Bob", "HR", 65000, true),\n            new Employee("Charlie", "Engineering", 80000, false),\n            new Employee("Diana", "Sales", 72000, true),\n            new Employee("Eve", "Engineering", 110000, true)\n        );\n\n        System.out.println("Active employees earning > 70k:");\n        employees.stream()\n            .filter(Employee::active)\n            .filter(e -> e.salary() > 70000)\n            .forEach(e -> System.out.println("  " + e.name() + ": $" + e.salary()));\n\n        long engCount = employees.stream()\n            .filter(e -> e.department().equals("Engineering"))\n            .filter(Employee::active)\n            .count();\n        System.out.println("Active Engineering employees: " + engCount);\n\n        boolean anyOver100k = employees.stream().anyMatch(e -> e.salary() > 100000);\n        System.out.println("Anyone over $100k: " + anyOver100k);\n\n        boolean allOver50k = employees.stream().filter(Employee::active).allMatch(e -> e.salary() > 50000);\n        System.out.println("All active over $50k: " + allOver50k);\n    }\n}`,
    explanation: 'filter() takes a Predicate<T> (lambda returning boolean) and keeps only matching elements. Chain multiple filter() calls for AND conditions. anyMatch() returns true if at least one element matches. allMatch() returns true only if ALL match. noneMatch() returns true if none match. In Spring services: userRepository.findAll().stream().filter(u -> u.isActive()) is a common pattern.'
  },

  {
    id: 'sl-003', worldId: 'streams-lambda-lab', order: 3,
    title: 'map() — Transforming Data',
    difficulty: 'easy', xpReward: 185, coinReward: 38, estimatedTime: 12,
    story: 'The REST API must never return database entities directly — you transform them to DTOs first. .map() is how you do this. It\'s the most-used stream operation in Spring: repository.findAll().stream().map(entity -> toDTO(entity)).collect(toList()).',
    objective: 'Use map() to transform Employee entities to EmployeeDTO records, extract a specific field, and convert types. Chain map() with filter().',
    starterCode: `import java.util.*;\nimport java.util.stream.*;\n\nrecord Employee(Long id, String name, String email, double salary, String department) {}\nrecord EmployeeDTO(Long id, String name, String department) {}\n\npublic class MapDemo {\n    public static void main(String[] args) {\n        List<Employee> employees = List.of(\n            new Employee(1L, "Alice Smith", "alice@corp.com", 95000, "Engineering"),\n            new Employee(2L, "Bob Jones", "bob@corp.com", 65000, "HR"),\n            new Employee(3L, "Charlie Brown", "charlie@corp.com", 80000, "Engineering"),\n            new Employee(4L, "Diana Prince", "diana@corp.com", 72000, "Sales")\n        );\n\n        // TODO: Map all employees to EmployeeDTO (hide salary and email)\n        // Collect to List and print\n\n        // TODO: Extract just the names into a List<String>\n        // Print the name list\n\n        // TODO: Filter Engineering dept, map to uppercase names, collect to List\n        // Print the result\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'stream().map()', pattern: '\\.stream\\s*\\(\\s*\\)[\\.\\s\\S]*?\\.map\\s*\\(', required: true },
        { name: 'Collectors.toList or toList()', pattern: 'Collectors\\.toList|collect\\s*\\(\\s*Collectors|\\.toList\\s*\\(\\s*\\)', required: true },
        { name: 'EmployeeDTO mapping', pattern: 'new\\s+EmployeeDTO\\s*\\(|EmployeeDTO::new', required: true }
      ]
    },
    tests: [
      { name: 'Maps entities to DTOs', visible: true,
        validate: (code) => ({
          passed: /\.map\s*\(/.test(code) && /new\s+EmployeeDTO\s*\(/.test(code),
          message: 'Use .map(e -> new EmployeeDTO(...)) to transform entities'
        })
      },
      { name: 'Extracts names to List<String>', visible: true,
        validate: (code) => ({
          passed: /List<String>/.test(code) && /\.map\s*\(.*name|Employee::name/.test(code),
          message: 'Use .map(Employee::name) to extract names'
        })
      },
      { name: 'Chains filter() and map()', visible: true,
        validate: (code) => ({
          passed: /\.filter\s*\([\s\S]*?\.map\s*\(|\.map\s*\([\s\S]*?\.filter\s*\(/.test(code),
          message: 'Chain filter() and map() together'
        })
      }
    ],
    hiddenTests: [
      { name: 'Collects to List', visible: false,
        validate: (code) => ({ passed: /\.collect\s*\(/.test(code) || /\.toList\s*\(\s*\)/.test(code), message: 'Terminate the stream with .collect(Collectors.toList()) or .toList()' })
      }
    ],
    hints: [
      'List<EmployeeDTO> dtos = employees.stream().map(e -> new EmployeeDTO(e.id(), e.name(), e.department())).collect(Collectors.toList());',
      'List<String> names = employees.stream().map(Employee::name).collect(Collectors.toList());',
      'employees.stream().filter(e -> e.department().equals("Engineering")).map(e -> e.name().toUpperCase()).toList();'
    ],
    solution: `import java.util.*;\nimport java.util.stream.*;\n\nrecord Employee(Long id, String name, String email, double salary, String department) {}\nrecord EmployeeDTO(Long id, String name, String department) {}\n\npublic class MapDemo {\n    public static void main(String[] args) {\n        List<Employee> employees = List.of(\n            new Employee(1L, "Alice Smith", "alice@corp.com", 95000, "Engineering"),\n            new Employee(2L, "Bob Jones", "bob@corp.com", 65000, "HR"),\n            new Employee(3L, "Charlie Brown", "charlie@corp.com", 80000, "Engineering"),\n            new Employee(4L, "Diana Prince", "diana@corp.com", 72000, "Sales")\n        );\n\n        List<EmployeeDTO> dtos = employees.stream()\n            .map(e -> new EmployeeDTO(e.id(), e.name(), e.department()))\n            .collect(Collectors.toList());\n        System.out.println("DTOs: " + dtos);\n\n        List<String> names = employees.stream()\n            .map(Employee::name)\n            .collect(Collectors.toList());\n        System.out.println("Names: " + names);\n\n        List<String> engUpperCase = employees.stream()\n            .filter(e -> e.department().equals("Engineering"))\n            .map(e -> e.name().toUpperCase())\n            .toList();\n        System.out.println("Engineering (uppercase): " + engUpperCase);\n    }\n}`,
    explanation: 'map(Function<T,R>) transforms each element from type T to type R. It does NOT filter — it transforms 1-to-1. This is the exact pattern in Spring service layers: entityList.stream().map(this::toDTO).collect(Collectors.toList()). Method references like Employee::name are shorthand for e -> e.name(). In Java 16+, .toList() replaces .collect(Collectors.toList()).'
  },

  {
    id: 'sl-004', worldId: 'streams-lambda-lab', order: 4,
    title: 'collect() — Grouping & Joining',
    difficulty: 'medium', xpReward: 210, coinReward: 45, estimatedTime: 14,
    story: 'The reporting module needs employees grouped by department, joined into CSV, and counted per team. Collectors.groupingBy() builds a Map from a stream in one line — the equivalent of a SQL GROUP BY. This is used heavily in data processing services.',
    objective: 'Use Collectors.groupingBy(), Collectors.joining(), Collectors.counting(), and Collectors.averagingDouble() to aggregate employee data.',
    starterCode: `import java.util.*;\nimport java.util.stream.*;\n\nrecord Employee(String name, String department, double salary) {}\n\npublic class CollectorsDemo {\n    public static void main(String[] args) {\n        List<Employee> employees = List.of(\n            new Employee("Alice", "Engineering", 95000),\n            new Employee("Bob", "HR", 65000),\n            new Employee("Charlie", "Engineering", 80000),\n            new Employee("Diana", "Sales", 72000),\n            new Employee("Eve", "Engineering", 110000),\n            new Employee("Frank", "HR", 70000)\n        );\n\n        // TODO: Group employees by department into Map<String, List<Employee>>\n        // Print each department and its employee count\n\n        // TODO: Join all employee names into one comma-separated string\n        // Print: "Team: Alice, Bob, Charlie, ..."\n\n        // TODO: Count employees per department -> Map<String, Long>\n        // Print each department and count\n\n        // TODO: Average salary per department -> Map<String, Double>\n        // Print each department and average salary\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'groupingBy', pattern: 'Collectors\\.groupingBy\\s*\\(', required: true },
        { name: 'joining', pattern: 'Collectors\\.joining\\s*\\(', required: true },
        { name: 'counting or averagingDouble', pattern: 'Collectors\\.counting\\s*\\(|Collectors\\.averagingDouble\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'Groups by department', visible: true,
        validate: (code) => ({
          passed: /Collectors\.groupingBy\s*\(/.test(code),
          message: 'Use Collectors.groupingBy(Employee::department)'
        })
      },
      { name: 'Joins names to string', visible: true,
        validate: (code) => ({
          passed: /Collectors\.joining\s*\(/.test(code),
          message: 'Use Collectors.joining(", ") to join names'
        })
      },
      { name: 'Counts and averages per department', visible: true,
        validate: (code) => {
          const count = /Collectors\.counting\s*\(/.test(code);
          const avg = /Collectors\.averagingDouble\s*\(/.test(code);
          return { passed: count && avg, message: 'Use counting() and averagingDouble() with groupingBy' };
        }
      }
    ],
    hiddenTests: [
      { name: 'Groups produce Map', visible: false,
        validate: (code) => ({ passed: /Map<String,/.test(code), message: 'groupingBy returns a Map<String, ...>' })
      }
    ],
    hints: [
      'Map<String, List<Employee>> byDept = employees.stream().collect(Collectors.groupingBy(Employee::department));',
      'String csv = employees.stream().map(Employee::name).collect(Collectors.joining(", "));\nSystem.out.println("Team: " + csv);',
      'Map<String, Long> countByDept = employees.stream().collect(Collectors.groupingBy(Employee::department, Collectors.counting()));'
    ],
    solution: `import java.util.*;\nimport java.util.stream.*;\n\nrecord Employee(String name, String department, double salary) {}\n\npublic class CollectorsDemo {\n    public static void main(String[] args) {\n        List<Employee> employees = List.of(\n            new Employee("Alice", "Engineering", 95000),\n            new Employee("Bob", "HR", 65000),\n            new Employee("Charlie", "Engineering", 80000),\n            new Employee("Diana", "Sales", 72000),\n            new Employee("Eve", "Engineering", 110000),\n            new Employee("Frank", "HR", 70000)\n        );\n\n        Map<String, List<Employee>> byDept = employees.stream()\n            .collect(Collectors.groupingBy(Employee::department));\n        byDept.forEach((dept, emps) -> System.out.println(dept + ": " + emps.size() + " employees"));\n\n        String team = employees.stream()\n            .map(Employee::name)\n            .collect(Collectors.joining(", "));\n        System.out.println("Team: " + team);\n\n        Map<String, Long> countByDept = employees.stream()\n            .collect(Collectors.groupingBy(Employee::department, Collectors.counting()));\n        countByDept.forEach((dept, count) -> System.out.println(dept + ": " + count));\n\n        Map<String, Double> avgSalary = employees.stream()\n            .collect(Collectors.groupingBy(Employee::department, Collectors.averagingDouble(Employee::salary)));\n        avgSalary.forEach((dept, avg) -> System.out.printf("%s avg: $%.0f%n", dept, avg));\n    }\n}`,
    explanation: 'Collectors transform a stream into a final result. groupingBy(classifier) builds a Map<K, List<T>> — like SQL GROUP BY. Combine with a downstream collector: groupingBy(dept, counting()) for Map<String, Long>, groupingBy(dept, averagingDouble(salary)) for averages. joining(delimiter) concatenates strings. In Spring data processing services, these replace entire loops and are the standard way to aggregate results.'
  },

  {
    id: 'sl-005', worldId: 'streams-lambda-lab', order: 5,
    title: 'flatMap() — Unwrapping Nested Lists',
    difficulty: 'medium', xpReward: 215, coinReward: 45, estimatedTime: 14,
    story: 'Each order has a list of products. You need one flat list of ALL products across ALL orders. map() would give you List<List<Product>>, but flatMap() flattens it into List<Product>. You\'ll use this when working with nested entities in Spring.',
    objective: 'Use flatMap() to flatten a List<Order> into all contained Products, then filter and count. Also flatten a list of lists of strings.',
    starterCode: `import java.util.*;\nimport java.util.stream.*;\n\nrecord Product(String name, double price, String category) {}\nrecord Order(Long id, String customer, List<Product> products) {}\n\npublic class FlatMapDemo {\n    public static void main(String[] args) {\n        List<Order> orders = List.of(\n            new Order(1L, "Alice", List.of(\n                new Product("Laptop", 1200.0, "Electronics"),\n                new Product("Mouse", 25.0, "Electronics")\n            )),\n            new Order(2L, "Bob", List.of(\n                new Product("Desk", 450.0, "Furniture"),\n                new Product("Lamp", 75.0, "Furniture"),\n                new Product("Keyboard", 80.0, "Electronics")\n            )),\n            new Order(3L, "Charlie", List.of(\n                new Product("Monitor", 350.0, "Electronics")\n            ))\n        );\n\n        // TODO: Use flatMap() to get all products across all orders\n        // Print total product count\n\n        // TODO: Get all unique product categories\n\n        // TODO: Get only Electronics products, sorted by price desc\n        // Print each one\n\n        // TODO: Calculate total revenue (sum of all product prices across all orders)\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'flatMap()', pattern: '\\.flatMap\\s*\\(', required: true },
        { name: 'List::stream or orders.products', pattern: 'Order::products|\.products\\(\\)\\.stream|\.getProducts\\(\\)\\.stream', required: true },
        { name: 'distinct()', pattern: '\\.distinct\\s*\\(\\s*\\)', required: true },
        { name: 'sum or mapToDouble', pattern: '\\.mapToDouble\\s*\\(|\\.sum\\s*\\(\\s*\\)', required: true }
      ]
    },
    tests: [
      { name: 'Uses flatMap() to flatten products', visible: true,
        validate: (code) => ({
          passed: /\.flatMap\s*\(/.test(code) && /products|getProducts/.test(code),
          message: 'Use orders.stream().flatMap(o -> o.products().stream())'
        })
      },
      { name: 'Gets unique categories with distinct()', visible: true,
        validate: (code) => ({
          passed: /\.distinct\s*\(\s*\)/.test(code),
          message: 'Use .map(Product::category).distinct() for unique categories'
        })
      },
      { name: 'Calculates total with mapToDouble().sum()', visible: true,
        validate: (code) => ({
          passed: /\.mapToDouble\s*\(/.test(code) && /\.sum\s*\(\s*\)/.test(code),
          message: 'Use .mapToDouble(Product::price).sum() for total revenue'
        })
      }
    ],
    hiddenTests: [
      { name: 'Filters Electronics correctly', visible: false,
        validate: (code) => ({ passed: /Electronics/.test(code) && /filter/.test(code), message: 'Filter for Electronics category products' })
      }
    ],
    hints: [
      'orders.stream().flatMap(o -> o.products().stream()).count() — gives total product count',
      'orders.stream().flatMap(o -> o.products().stream()).map(Product::category).distinct().toList();',
      'double total = orders.stream().flatMap(o -> o.products().stream()).mapToDouble(Product::price).sum();'
    ],
    solution: `import java.util.*;\nimport java.util.stream.*;\n\nrecord Product(String name, double price, String category) {}\nrecord Order(Long id, String customer, List<Product> products) {}\n\npublic class FlatMapDemo {\n    public static void main(String[] args) {\n        List<Order> orders = List.of(\n            new Order(1L, "Alice", List.of(\n                new Product("Laptop", 1200.0, "Electronics"),\n                new Product("Mouse", 25.0, "Electronics")\n            )),\n            new Order(2L, "Bob", List.of(\n                new Product("Desk", 450.0, "Furniture"),\n                new Product("Lamp", 75.0, "Furniture"),\n                new Product("Keyboard", 80.0, "Electronics")\n            )),\n            new Order(3L, "Charlie", List.of(\n                new Product("Monitor", 350.0, "Electronics")\n            ))\n        );\n\n        long totalProducts = orders.stream().flatMap(o -> o.products().stream()).count();\n        System.out.println("Total products: " + totalProducts);\n\n        List<String> categories = orders.stream()\n            .flatMap(o -> o.products().stream())\n            .map(Product::category)\n            .distinct()\n            .toList();\n        System.out.println("Categories: " + categories);\n\n        System.out.println("Electronics by price:");\n        orders.stream()\n            .flatMap(o -> o.products().stream())\n            .filter(p -> p.category().equals("Electronics"))\n            .sorted(Comparator.comparing(Product::price).reversed())\n            .forEach(p -> System.out.println("  " + p.name() + ": $" + p.price()));\n\n        double total = orders.stream()\n            .flatMap(o -> o.products().stream())\n            .mapToDouble(Product::price)\n            .sum();\n        System.out.printf("Total revenue: $%.2f%n", total);\n    }\n}`,
    explanation: 'map() produces Stream<List<Product>> — each element is still a list. flatMap() flattens it into Stream<Product> — one element per product. mapToDouble() converts to a numeric stream enabling sum(), average(), min(), max(). In Spring, you\'ll flatMap() when dealing with OneToMany entities: orders.stream().flatMap(o -> o.getItems().stream()).'
  },

  {
    id: 'sl-006', worldId: 'streams-lambda-lab', order: 6,
    title: 'Method References',
    difficulty: 'easy', xpReward: 180, coinReward: 38, estimatedTime: 10,
    story: 'Method references make stream pipelines more readable. Instead of e -> e.getName() you write Employee::getName. Spring\'s functional components (RouterFunction, HandlerFunction) use method references to keep routing config clean and readable.',
    objective: 'Replace lambda expressions with method references — static, instance, and constructor references.',
    starterCode: `import java.util.*;\nimport java.util.stream.*;\nimport java.util.function.*;\n\nclass EmailService {\n    public static String formatEmail(String email) {\n        return email.trim().toLowerCase();\n    }\n\n    public boolean isValid(String email) {\n        return email.contains("@") && email.contains(".");\n    }\n}\n\nrecord User(String name, String email) {}\n\npublic class MethodRefDemo {\n    public static void main(String[] args) {\n        List<String> emails = Arrays.asList("  Alice@Corp.COM  ", "bob@test.org", "invalid-email", "charlie@web.io  ");\n        EmailService service = new EmailService();\n\n        // TODO: Use EmailService::formatEmail (static method reference) to clean emails\n        // Collect to List<String> and print\n\n        // TODO: Use service::isValid (instance method reference) to filter valid emails\n        // from the cleaned list, then print\n\n        // TODO: Use User::new (constructor reference) to build a List<User>\n        // Pair names ["Alice","Bob","Charlie"] with cleaned emails\n\n        // TODO: Use System.out::println (instance method ref) in forEach\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'static method reference', pattern: 'EmailService::formatEmail', required: true },
        { name: 'instance method reference', pattern: 'service::isValid', required: true },
        { name: 'constructor reference', pattern: 'User::new', required: true },
        { name: 'System.out::println', pattern: 'System\\.out::println', required: true }
      ]
    },
    tests: [
      { name: 'Static method reference used', visible: true,
        validate: (code) => ({
          passed: /EmailService::formatEmail/.test(code),
          message: 'Use EmailService::formatEmail as a method reference in .map()'
        })
      },
      { name: 'Instance method reference used', visible: true,
        validate: (code) => ({
          passed: /service::isValid/.test(code),
          message: 'Use service::isValid as a method reference in .filter()'
        })
      },
      { name: 'Constructor reference used', visible: true,
        validate: (code) => ({
          passed: /User::new/.test(code),
          message: 'Use User::new as a constructor reference'
        })
      }
    ],
    hiddenTests: [
      { name: 'forEach with System.out::println', visible: false,
        validate: (code) => ({ passed: /System\.out::println/.test(code), message: 'Use System.out::println in a forEach call' })
      }
    ],
    hints: [
      'emails.stream().map(EmailService::formatEmail).toList(); — static ref: ClassName::method',
      'cleaned.stream().filter(service::isValid).toList(); — instance ref: object::method',
      'Use a BiFunction or loop to pair names with emails for constructor ref. Or: List.of("Alice","Bob","Charlie").stream().map(n -> new User(n, ...)).toList();'
    ],
    solution: `import java.util.*;\nimport java.util.stream.*;\nimport java.util.function.*;\n\nclass EmailService {\n    public static String formatEmail(String email) {\n        return email.trim().toLowerCase();\n    }\n\n    public boolean isValid(String email) {\n        return email.contains("@") && email.contains(".");\n    }\n}\n\nrecord User(String name, String email) {}\n\npublic class MethodRefDemo {\n    public static void main(String[] args) {\n        List<String> emails = Arrays.asList("  Alice@Corp.COM  ", "bob@test.org", "invalid-email", "charlie@web.io  ");\n        EmailService service = new EmailService();\n\n        List<String> cleaned = emails.stream()\n            .map(EmailService::formatEmail)\n            .toList();\n        System.out.println("Cleaned: " + cleaned);\n\n        List<String> valid = cleaned.stream()\n            .filter(service::isValid)\n            .toList();\n        System.out.println("Valid emails:");\n        valid.forEach(System.out::println);\n\n        List<String> names = List.of("Alice", "Bob", "Charlie");\n        List<User> users = names.stream()\n            .map(n -> new User(n, n.toLowerCase() + "@corp.com"))\n            .toList();\n        users.stream().map(User::name).forEach(System.out::println);\n    }\n}`,
    explanation: 'Four method reference forms: ClassName::staticMethod, instance::method, ClassName::instanceMethod (first param becomes target), ClassName::new (constructor). Method references are just syntactic sugar for single-method lambdas — they\'re identical in performance. Use them when the lambda body is a single method call — they make code more readable. Spring WebFlux RouterFunction configs are almost entirely method references.'
  },

  {
    id: 'sl-007', worldId: 'streams-lambda-lab', order: 7,
    title: 'reduce() & Numeric Streams',
    difficulty: 'medium', xpReward: 200, coinReward: 42, estimatedTime: 13,
    story: 'The finance service needs to calculate totals, averages, and summaries from transaction lists. reduce() collapses a stream to a single value. IntStream, LongStream, DoubleStream avoid boxing overhead — critical for performance in high-throughput Spring services.',
    objective: 'Use reduce() to calculate total and product. Use IntStream.range() for indexed iteration. Use DoubleStream.of() with sum(), average(), and summaryStatistics().',
    starterCode: `import java.util.*;\nimport java.util.stream.*;\n\npublic class ReduceDemo {\n    public static void main(String[] args) {\n        List<Double> transactions = List.of(250.0, 1500.0, 750.0, 300.0, 2000.0, 450.0);\n\n        // TODO: Use reduce() to calculate total of transactions\n        // reduce(identity, accumulator)\n\n        // TODO: Use reduce() to find the maximum transaction\n        // Use Optional<Double> since list might be empty\n\n        // TODO: Use IntStream.range(0, transactions.size()) to print indexed transactions\n        // "Transaction 0: $250.0"\n\n        // TODO: Use DoubleStream from the list to get summaryStatistics()\n        // Print count, min, max, sum, average\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'reduce()', pattern: '\\.reduce\\s*\\(', required: true },
        { name: 'IntStream.range', pattern: 'IntStream\\.range\\s*\\(', required: true },
        { name: 'summaryStatistics', pattern: '\\.summaryStatistics\\s*\\(\\s*\\)', required: true },
        { name: 'mapToDouble', pattern: '\\.mapToDouble\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'Uses reduce() for total', visible: true,
        validate: (code) => ({
          passed: /\.reduce\s*\(/.test(code),
          message: 'Use stream.reduce(0.0, Double::sum) or reduce(0.0, (a, b) -> a + b)'
        })
      },
      { name: 'Uses IntStream.range()', visible: true,
        validate: (code) => ({
          passed: /IntStream\.range\s*\(/.test(code),
          message: 'Use IntStream.range(0, transactions.size()) for indexed access'
        })
      },
      { name: 'Uses summaryStatistics()', visible: true,
        validate: (code) => ({
          passed: /\.summaryStatistics\s*\(\s*\)/.test(code),
          message: 'Call .mapToDouble(...).summaryStatistics() to get statistics'
        })
      }
    ],
    hiddenTests: [
      { name: 'reduce with max uses Optional', visible: false,
        validate: (code) => ({ passed: /Optional<Double>|OptionalDouble/.test(code), message: 'reduce without identity returns Optional<T>' })
      }
    ],
    hints: [
      'double total = transactions.stream().reduce(0.0, Double::sum);',
      'Optional<Double> max = transactions.stream().reduce(Double::max);',
      'DoubleSummaryStatistics stats = transactions.stream().mapToDouble(Double::doubleValue).summaryStatistics();\nSystem.out.println("Count: " + stats.getCount() + " Sum: " + stats.getSum());'
    ],
    solution: `import java.util.*;\nimport java.util.stream.*;\n\npublic class ReduceDemo {\n    public static void main(String[] args) {\n        List<Double> transactions = List.of(250.0, 1500.0, 750.0, 300.0, 2000.0, 450.0);\n\n        double total = transactions.stream().reduce(0.0, Double::sum);\n        System.out.println("Total: $" + total);\n\n        Optional<Double> max = transactions.stream().reduce(Double::max);\n        max.ifPresent(m -> System.out.println("Max transaction: $" + m));\n\n        System.out.println("Indexed transactions:");\n        IntStream.range(0, transactions.size())\n            .forEach(i -> System.out.println("  Transaction " + i + ": $" + transactions.get(i)));\n\n        DoubleSummaryStatistics stats = transactions.stream()\n            .mapToDouble(Double::doubleValue)\n            .summaryStatistics();\n        System.out.println("Count: " + stats.getCount());\n        System.out.println("Min: $" + stats.getMin());\n        System.out.println("Max: $" + stats.getMax());\n        System.out.printf("Average: $%.2f%n", stats.getAverage());\n        System.out.println("Sum: $" + stats.getSum());\n    }\n}`,
    explanation: 'reduce(identity, BinaryOperator) folds a stream into one value starting from the identity. Without identity, returns Optional (stream might be empty). IntStream/DoubleStream/LongStream are specialised numeric streams — they avoid boxing primitives and offer sum(), average(), min(), max(), summaryStatistics(). Use mapToInt/mapToDouble/mapToLong to convert from object streams.'
  },

  {
    id: 'sl-008', worldId: 'streams-lambda-lab', order: 8,
    title: 'Stream Chaining & Lazy Evaluation',
    difficulty: 'medium', xpReward: 220, coinReward: 47, estimatedTime: 14,
    story: 'A performance review revealed the reporting service processes 100,000 records but only needs the first 10 matching results. Streams are LAZY — filter/map don\'t run until you call a terminal operation. Adding limit() early can save massive processing time.',
    objective: 'Build a complex stream pipeline: filter → sorted → map → distinct → limit → collect. Then demonstrate lazy evaluation with peek().',
    starterCode: `import java.util.*;\nimport java.util.stream.*;\n\nrecord Product(String name, String category, double price, int stock) {}\n\npublic class StreamChaining {\n    public static List<Product> getProducts() {\n        return List.of(\n            new Product("MacBook", "Electronics", 1299.0, 5),\n            new Product("iPhone", "Electronics", 999.0, 12),\n            new Product("AirPods", "Electronics", 249.0, 0),\n            new Product("Desk", "Furniture", 600.0, 3),\n            new Product("Chair", "Furniture", 450.0, 8),\n            new Product("Monitor", "Electronics", 399.0, 4),\n            new Product("Keyboard", "Electronics", 99.0, 20),\n            new Product("Lamp", "Furniture", 75.0, 15)\n        );\n    }\n\n    public static void main(String[] args) {\n        List<Product> products = getProducts();\n\n        // TODO: Get top-3 in-stock Electronics, sorted by price desc, return just names\n        // Pipeline: filter(Electronics) -> filter(stock > 0) -> sorted(price desc) -> limit(3) -> map(name) -> toList()\n\n        // TODO: Use peek() to debug: print each element BEFORE and AFTER a filter\n        // peek() is a non-terminal op — shows stream processing order\n\n        // TODO: Get distinct categories from all products sorted alphabetically\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'sorted() with Comparator', pattern: '\\.sorted\\s*\\(', required: true },
        { name: 'limit()', pattern: '\\.limit\\s*\\(', required: true },
        { name: 'peek()', pattern: '\\.peek\\s*\\(', required: true },
        { name: 'distinct()', pattern: '\\.distinct\\s*\\(\\s*\\)', required: true }
      ]
    },
    tests: [
      { name: 'Chains filter, sorted, limit, map', visible: true,
        validate: (code) => {
          const f = /\.filter\s*\(/.test(code);
          const s = /\.sorted\s*\(/.test(code);
          const l = /\.limit\s*\(/.test(code);
          const m = /\.map\s*\(/.test(code);
          return { passed: f && s && l && m, message: 'Chain: .filter().sorted().limit().map() in one pipeline' };
        }
      },
      { name: 'Uses peek() for debugging', visible: true,
        validate: (code) => ({
          passed: /\.peek\s*\(/.test(code),
          message: 'Use .peek(e -> System.out.println("Passing: " + e)) to debug the stream'
        })
      },
      { name: 'Gets distinct categories', visible: true,
        validate: (code) => ({
          passed: /\.distinct\s*\(\s*\)/.test(code) && /category/.test(code),
          message: 'Use .map(Product::category).distinct() for unique categories'
        })
      }
    ],
    hiddenTests: [
      { name: 'limit(3) before collect', visible: false,
        validate: (code) => ({ passed: /\.limit\s*\(\s*3\s*\)/.test(code), message: 'Use .limit(3) to get top 3 results' })
      }
    ],
    hints: [
      'products.stream().filter(p -> p.category().equals("Electronics")).filter(p -> p.stock() > 0).sorted(Comparator.comparing(Product::price).reversed()).limit(3).map(Product::name).toList()',
      '.peek(p -> System.out.println("Before filter: " + p.name())).filter(p -> p.stock() > 0).peek(p -> System.out.println("After filter: " + p.name()))',
      'products.stream().map(Product::category).distinct().sorted().toList()'
    ],
    solution: `import java.util.*;\nimport java.util.stream.*;\n\nrecord Product(String name, String category, double price, int stock) {}\n\npublic class StreamChaining {\n    public static List<Product> getProducts() {\n        return List.of(\n            new Product("MacBook", "Electronics", 1299.0, 5),\n            new Product("iPhone", "Electronics", 999.0, 12),\n            new Product("AirPods", "Electronics", 249.0, 0),\n            new Product("Desk", "Furniture", 600.0, 3),\n            new Product("Chair", "Furniture", 450.0, 8),\n            new Product("Monitor", "Electronics", 399.0, 4),\n            new Product("Keyboard", "Electronics", 99.0, 20),\n            new Product("Lamp", "Furniture", 75.0, 15)\n        );\n    }\n\n    public static void main(String[] args) {\n        List<Product> products = getProducts();\n\n        List<String> top3Electronics = products.stream()\n            .filter(p -> p.category().equals("Electronics"))\n            .filter(p -> p.stock() > 0)\n            .sorted(Comparator.comparing(Product::price).reversed())\n            .limit(3)\n            .map(Product::name)\n            .toList();\n        System.out.println("Top 3 in-stock Electronics: " + top3Electronics);\n\n        System.out.println("\\nStream debug with peek():");\n        products.stream()\n            .peek(p -> System.out.println("  Input: " + p.name()))\n            .filter(p -> p.category().equals("Electronics"))\n            .peek(p -> System.out.println("  After filter: " + p.name()))\n            .limit(2)\n            .forEach(p -> System.out.println("  Final: " + p.name()));\n\n        List<String> categories = products.stream()\n            .map(Product::category)\n            .distinct()\n            .sorted()\n            .toList();\n        System.out.println("\\nCategories: " + categories);\n    }\n}`,
    explanation: 'Streams are lazy — intermediate operations (filter, map, sorted, peek, limit) don\'t execute until a terminal operation (collect, forEach, count, toList) is called. This means limit(3) stops processing after 3 matches — no need to process 100,000 records to get 3. peek() is a debug-only operation that lets you inspect elements mid-pipeline. Never use peek() in production for side effects.'
  },

  {
    id: 'sl-009', worldId: 'streams-lambda-lab', order: 9,
    title: '🏆 Boss: Reporting Pipeline',
    difficulty: 'boss', xpReward: 430, coinReward: 125, estimatedTime: 25,
    story: '⚔️ BOSS CHALLENGE! The VP wants a complete sales report. No loops allowed — implement the entire report using only Streams, Collectors, and method references. This is what real Spring service methods look like.',
    objective: 'Build a SalesReportService with 5 methods: topSellingProducts(), revenueByCategory(), customerSummary(), productsDueForRestock(), and overallStats() — all implemented with streams.',
    starterCode: `import java.util.*;\nimport java.util.stream.*;\n\nrecord Product(String id, String name, String category, double price) {}\nrecord OrderItem(String productId, int quantity) {}\nrecord Order(String customerId, List<OrderItem> items) {}\n\npublic class SalesReportService {\n    private final List<Product> products;\n    private final List<Order> orders;\n\n    public SalesReportService(List<Product> products, List<Order> orders) {\n        this.products = products;\n        this.orders = orders;\n    }\n\n    // TODO: topN(int n) — top N products by total units sold (across all orders), return List<String> product names\n    public List<String> topN(int n) { return List.of(); }\n\n    // TODO: revenueByCategory() — total revenue per category -> Map<String, Double>\n    public Map<String, Double> revenueByCategory() { return Map.of(); }\n\n    // TODO: customerOrderCount() — number of orders per customer -> Map<String, Long>\n    public Map<String, Long> customerOrderCount() { return Map.of(); }\n\n    // TODO: averageOrderValue() — average total value per order\n    public double averageOrderValue() { return 0; }\n\n    // TODO: mostExpensivePerCategory() — most expensive product per category -> Map<String, String> (category -> product name)\n    public Map<String, String> mostExpensivePerCategory() { return Map.of(); }\n\n    public static void main(String[] args) {\n        List<Product> products = List.of(\n            new Product("p1", "MacBook", "Electronics", 1299.0),\n            new Product("p2", "iPhone", "Electronics", 999.0),\n            new Product("p3", "Desk", "Furniture", 600.0),\n            new Product("p4", "Chair", "Furniture", 450.0),\n            new Product("p5", "Lamp", "Furniture", 75.0)\n        );\n        List<Order> orders = List.of(\n            new Order("alice", List.of(new OrderItem("p1", 1), new OrderItem("p2", 2))),\n            new Order("bob", List.of(new OrderItem("p3", 1), new OrderItem("p5", 3))),\n            new Order("alice", List.of(new OrderItem("p2", 1), new OrderItem("p4", 1))),\n            new Order("charlie", List.of(new OrderItem("p1", 2), new OrderItem("p3", 1)))\n        );\n\n        SalesReportService svc = new SalesReportService(products, orders);\n        System.out.println("Top 3: " + svc.topN(3));\n        System.out.println("Revenue by category: " + svc.revenueByCategory());\n        System.out.println("Customer order count: " + svc.customerOrderCount());\n        System.out.printf("Avg order value: $%.2f%n", svc.averageOrderValue());\n        System.out.println("Most expensive per category: " + svc.mostExpensivePerCategory());\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'flatMap for order items', pattern: '\\.flatMap\\s*\\(', required: true },
        { name: 'groupingBy used', pattern: 'Collectors\\.groupingBy\\s*\\(', required: true },
        { name: 'collect with downstream', pattern: 'Collectors\\.(counting|summingDouble|averagingDouble|toMap|joining)', required: true },
        { name: 'sorted and limit', pattern: '\\.sorted\\s*\\([\s\S]*?\\.limit\\s*\\(|\\.limit\\s*\\([\s\S]*?\\.sorted\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'topN returns product names', visible: true,
        validate: (code) => {
          const hasFlatMap = /\.flatMap\s*\(/.test(code);
          const hasLimit = /\.limit\s*\(/.test(code);
          const hasList = /List<String>\s+topN|topN.*List/.test(code);
          return { passed: hasFlatMap && hasLimit, message: 'topN() needs flatMap() to access items and limit() for top N' };
        }
      },
      { name: 'revenueByCategory groups correctly', visible: true,
        validate: (code) => ({
          passed: /Collectors\.groupingBy\s*\(/.test(code) && /Collectors\.summingDouble\s*\(|Collectors\.summingInt\s*\(/.test(code),
          message: 'revenueByCategory() uses groupingBy + summingDouble'
        })
      },
      { name: 'customerOrderCount uses groupingBy + counting', visible: true,
        validate: (code) => ({
          passed: /Collectors\.counting\s*\(\s*\)/.test(code),
          message: 'customerOrderCount() uses groupingBy + Collectors.counting()'
        })
      },
      { name: 'mostExpensivePerCategory uses toMap or groupingBy', visible: true,
        validate: (code) => ({
          passed: /mostExpensivePerCategory[\s\S]*?(toMap|groupingBy|maxBy)/.test(code),
          message: 'mostExpensivePerCategory() needs groupingBy + Collectors.maxBy()'
        })
      }
    ],
    hiddenTests: [
      { name: 'No traditional loops used', visible: false,
        validate: (code) => {
          const forLoops = (code.match(/\bfor\s*\(/g) || []).length;
          const whileLoops = (code.match(/\bwhile\s*\(/g) || []).length;
          return { passed: forLoops === 0 && whileLoops === 0, message: 'Implement everything with streams — no for/while loops' };
        }
      }
    ],
    hints: [
      'topN: first build a Map<String, Integer> of productId->totalQty using flatMap + groupingBy(summingInt). Then look up product names and sort.',
      'revenueByCategory: flatMap all items, join with product lookup by productId, then groupingBy(category, summingDouble(price*qty)).',
      'mostExpensivePerCategory: products.stream().collect(groupingBy(Product::category, maxBy(Comparator.comparing(Product::price))))'
    ],
    solution: `import java.util.*;\nimport java.util.stream.*;\n\nrecord Product(String id, String name, String category, double price) {}\nrecord OrderItem(String productId, int quantity) {}\nrecord Order(String customerId, List<OrderItem> items) {}\n\npublic class SalesReportService {\n    private final List<Product> products;\n    private final List<Order> orders;\n    private final Map<String, Product> productMap;\n\n    public SalesReportService(List<Product> products, List<Order> orders) {\n        this.products = products;\n        this.orders = orders;\n        this.productMap = products.stream().collect(Collectors.toMap(Product::id, p -> p));\n    }\n\n    public List<String> topN(int n) {\n        Map<String, Integer> qtySold = orders.stream()\n            .flatMap(o -> o.items().stream())\n            .collect(Collectors.groupingBy(OrderItem::productId, Collectors.summingInt(OrderItem::quantity)));\n        return qtySold.entrySet().stream()\n            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())\n            .limit(n)\n            .map(e -> productMap.get(e.getKey()).name())\n            .toList();\n    }\n\n    public Map<String, Double> revenueByCategory() {\n        return orders.stream()\n            .flatMap(o -> o.items().stream())\n            .collect(Collectors.groupingBy(\n                item -> productMap.get(item.productId()).category(),\n                Collectors.summingDouble(item -> productMap.get(item.productId()).price() * item.quantity())\n            ));\n    }\n\n    public Map<String, Long> customerOrderCount() {\n        return orders.stream().collect(Collectors.groupingBy(Order::customerId, Collectors.counting()));\n    }\n\n    public double averageOrderValue() {\n        return orders.stream()\n            .mapToDouble(o -> o.items().stream()\n                .mapToDouble(item -> productMap.get(item.productId()).price() * item.quantity())\n                .sum())\n            .average()\n            .orElse(0);\n    }\n\n    public Map<String, String> mostExpensivePerCategory() {\n        return products.stream()\n            .collect(Collectors.groupingBy(\n                Product::category,\n                Collectors.maxBy(Comparator.comparing(Product::price))\n            ))\n            .entrySet().stream()\n            .filter(e -> e.getValue().isPresent())\n            .collect(Collectors.toMap(Map.Entry::getKey, e -> e.getValue().get().name()));\n    }\n\n    public static void main(String[] args) {\n        List<Product> products = List.of(\n            new Product("p1", "MacBook", "Electronics", 1299.0),\n            new Product("p2", "iPhone", "Electronics", 999.0),\n            new Product("p3", "Desk", "Furniture", 600.0),\n            new Product("p4", "Chair", "Furniture", 450.0),\n            new Product("p5", "Lamp", "Furniture", 75.0)\n        );\n        List<Order> orders = List.of(\n            new Order("alice", List.of(new OrderItem("p1", 1), new OrderItem("p2", 2))),\n            new Order("bob", List.of(new OrderItem("p3", 1), new OrderItem("p5", 3))),\n            new Order("alice", List.of(new OrderItem("p2", 1), new OrderItem("p4", 1))),\n            new Order("charlie", List.of(new OrderItem("p1", 2), new OrderItem("p3", 1)))\n        );\n        SalesReportService svc = new SalesReportService(products, orders);\n        System.out.println("Top 3: " + svc.topN(3));\n        System.out.println("Revenue by category: " + svc.revenueByCategory());\n        System.out.println("Customer order count: " + svc.customerOrderCount());\n        System.out.printf("Avg order value: $%.2f%n", svc.averageOrderValue());\n        System.out.println("Most expensive per category: " + svc.mostExpensivePerCategory());\n    }\n}`,
    explanation: 'This is production-level Spring service code — the exact methods a real analyst service would expose. Each method is a self-contained stream pipeline: flatMap joins tables, groupingBy aggregates them, downstream collectors compute metrics. In Spring, these methods would be inside a @Service class and would call repository.findAll() instead of working from in-memory lists — but the stream logic is identical.'
  }
];
