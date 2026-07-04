export const COLLECTIONS_KINGDOM_MISSIONS = [
  {
    id: 'ck-001', worldId: 'collections-kingdom', order: 1,
    title: 'ArrayList — Dynamic Lists',
    difficulty: 'easy', xpReward: 160, coinReward: 32, estimatedTime: 12,
    story: 'Arrays have a fixed size. SpringCorp\'s employee list grows every week. ArrayList grows dynamically and is the most common collection in Java. Spring returns List<T> from repositories — ArrayList is what\'s behind it.',
    objective: 'Create an ArrayList of employee names. Add 4 names, remove one by value, check if a name exists, and iterate with a for-each loop.',
    starterCode: `import java.util.ArrayList;\nimport java.util.List;\n\npublic class EmployeeList {\n    public static void main(String[] args) {\n        // TODO: Create ArrayList<String> named employees\n        // TODO: Add 4 names: "Alice", "Bob", "Charlie", "Diana"\n        // TODO: Remove "Bob"\n        // TODO: Print whether "Alice" is in the list\n        // TODO: Print all remaining names with for-each\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'ArrayList import', pattern: 'import\\s+java\\.util\\.ArrayList', required: true },
        { name: 'ArrayList creation', pattern: 'new\\s+ArrayList\\s*<', required: true },
        { name: 'add()', pattern: '\\.add\\s*\\(', required: true },
        { name: 'remove()', pattern: '\\.remove\\s*\\(', required: true },
        { name: 'contains()', pattern: '\\.contains\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'Creates ArrayList and adds items', visible: true,
        validate: (code) => {
          const hasNew = /new\s+ArrayList\s*</.test(code);
          const adds = (code.match(/\.add\s*\(/g) || []).length;
          return { passed: hasNew && adds >= 4, actual: `${adds} add() calls`, message: 'Create ArrayList and add at least 4 names' };
        }
      },
      { name: 'Uses remove() and contains()', visible: true,
        validate: (code) => {
          const r = /\.remove\s*\(/.test(code);
          const c = /\.contains\s*\(/.test(code);
          return { passed: r && c, message: 'Use .remove() and .contains()' };
        }
      },
      { name: 'Iterates with for-each', visible: true,
        validate: (code) => ({
          passed: /for\s*\(\s*String\s+\w+\s*:\s*\w+/.test(code),
          message: 'Iterate with: for (String name : employees)'
        })
      }
    ],
    hiddenTests: [
      { name: 'Declared as List<String>', visible: false,
        validate: (code) => ({ passed: /List<String>/.test(code), message: 'Declare as List<String> employees — code to the interface, not the implementation' })
      }
    ],
    hints: [
      'List<String> employees = new ArrayList<>();',
      'employees.add("Alice"); employees.remove("Bob"); employees.contains("Alice");',
      'for (String name : employees) { System.out.println(name); }'
    ],
    solution: `import java.util.ArrayList;\nimport java.util.List;\n\npublic class EmployeeList {\n    public static void main(String[] args) {\n        List<String> employees = new ArrayList<>();\n        employees.add("Alice");\n        employees.add("Bob");\n        employees.add("Charlie");\n        employees.add("Diana");\n\n        employees.remove("Bob");\n        System.out.println("Alice present: " + employees.contains("Alice"));\n        System.out.println("Total: " + employees.size());\n\n        for (String name : employees) {\n            System.out.println("- " + name);\n        }\n    }\n}`,
    explanation: 'ArrayList<T> is a resizable array. Key methods: add(), remove(), contains(), size(), get(index), set(index, value). Always declare as List<T> (the interface), not ArrayList<T>. Spring\'s JpaRepository.findAll() returns List<T> — you\'ll work with ArrayList results constantly.'
  },

  {
    id: 'ck-002', worldId: 'collections-kingdom', order: 2,
    title: 'HashMap — Key-Value Store',
    difficulty: 'easy', xpReward: 170, coinReward: 35, estimatedTime: 12,
    story: 'The auth system needs to look up user sessions by token (a String key). HashMap gives O(1) lookup. Spring\'s application context itself is essentially a HashMap of bean names to bean instances.',
    objective: 'Create a HashMap to store employee IDs mapped to names. Add 3 entries, retrieve by key, check if a key exists, and iterate over all entries.',
    starterCode: `import java.util.HashMap;\nimport java.util.Map;\n\npublic class SessionStore {\n    public static void main(String[] args) {\n        // TODO: Create Map<Integer, String> named employeeMap\n        // TODO: put 3 entries: 101->"Alice", 102->"Bob", 103->"Charlie"\n        // TODO: get employee with id 102 and print it\n        // TODO: check if id 999 exists\n        // TODO: iterate over all entries and print "ID: key -> Name: value"\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'HashMap import', pattern: 'import\\s+java\\.util\\.HashMap', required: true },
        { name: 'HashMap creation', pattern: 'new\\s+HashMap\\s*<', required: true },
        { name: 'put()', pattern: '\\.put\\s*\\(', required: true },
        { name: 'get()', pattern: '\\.get\\s*\\(', required: true },
        { name: 'containsKey()', pattern: '\\.containsKey\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'Creates HashMap with entries', visible: true,
        validate: (code) => {
          const hasMap = /new\s+HashMap\s*</.test(code);
          const puts = (code.match(/\.put\s*\(/g) || []).length;
          return { passed: hasMap && puts >= 3, actual: `${puts} put() calls`, message: 'Create HashMap and put at least 3 entries' };
        }
      },
      { name: 'Uses get() and containsKey()', visible: true,
        validate: (code) => {
          const g = /\.get\s*\(/.test(code);
          const c = /\.containsKey\s*\(/.test(code);
          return { passed: g && c, message: 'Use .get() to retrieve and .containsKey() to check existence' };
        }
      },
      { name: 'Iterates over entries', visible: true,
        validate: (code) => ({
          passed: /entrySet\s*\(\s*\)|keySet\s*\(\s*\)|forEach\s*\(/.test(code),
          message: 'Iterate using entrySet(), keySet(), or forEach()'
        })
      }
    ],
    hiddenTests: [
      { name: 'Declared as Map<K,V>', visible: false,
        validate: (code) => ({ passed: /Map<\s*Integer\s*,\s*String\s*>/.test(code), message: 'Declare as Map<Integer, String> — code to the interface' })
      }
    ],
    hints: [
      'Map<Integer, String> employeeMap = new HashMap<>();',
      'employeeMap.put(101, "Alice"); String name = employeeMap.get(102);',
      'for (Map.Entry<Integer, String> e : employeeMap.entrySet()) { System.out.println(e.getKey() + " -> " + e.getValue()); }'
    ],
    solution: `import java.util.HashMap;\nimport java.util.Map;\n\npublic class SessionStore {\n    public static void main(String[] args) {\n        Map<Integer, String> employeeMap = new HashMap<>();\n        employeeMap.put(101, "Alice");\n        employeeMap.put(102, "Bob");\n        employeeMap.put(103, "Charlie");\n\n        System.out.println("Employee 102: " + employeeMap.get(102));\n        System.out.println("ID 999 exists: " + employeeMap.containsKey(999));\n        System.out.println("Total entries: " + employeeMap.size());\n\n        for (Map.Entry<Integer, String> entry : employeeMap.entrySet()) {\n            System.out.println("ID: " + entry.getKey() + " -> Name: " + entry.getValue());\n        }\n    }\n}`,
    explanation: 'HashMap<K,V> stores key-value pairs. put(k,v), get(k), containsKey(k), remove(k) are O(1). Keys must be unique — putting the same key twice overwrites. In Spring, you\'ll use Map for caching, configuration lookup, grouping query results, and building in-memory indexes for fast lookups.'
  },

  {
    id: 'ck-003', worldId: 'collections-kingdom', order: 3,
    title: 'HashSet — Unique Collections',
    difficulty: 'easy', xpReward: 160, coinReward: 32, estimatedTime: 10,
    story: 'Users are submitting duplicate orders. The system needs to track which order IDs have already been processed — instantly, without duplicates. HashSet guarantees uniqueness and O(1) contains(). Spring Security uses Set<GrantedAuthority> for user roles.',
    objective: 'Create a HashSet of processed order IDs. Try adding the same ID twice and prove it stays unique. Find the intersection of two sets using retainAll().',
    starterCode: `import java.util.HashSet;\nimport java.util.Set;\n\npublic class OrderProcessor {\n    public static void main(String[] args) {\n        // TODO: Create Set<Integer> processedOrders\n        // TODO: Add IDs: 1001, 1002, 1003, 1001 (duplicate)\n        // TODO: Print size — should be 3, not 4\n        // TODO: Check if 1002 is processed\n        // TODO: Create another Set<Integer> pendingOrders with 1003, 1004, 1005\n        // TODO: Find duplicates between both sets using retainAll() on a copy\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'HashSet import', pattern: 'import\\s+java\\.util\\.HashSet', required: true },
        { name: 'HashSet creation', pattern: 'new\\s+HashSet\\s*<', required: true },
        { name: 'add()', pattern: '\\.add\\s*\\(', required: true },
        { name: 'contains()', pattern: '\\.contains\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'Creates HashSet and adds duplicates', visible: true,
        validate: (code) => {
          const hasSet = /new\s+HashSet\s*</.test(code);
          const adds = (code.match(/\.add\s*\(/g) || []).length;
          return { passed: hasSet && adds >= 4, actual: `${adds} add() calls`, message: 'Add at least 4 items including a duplicate' };
        }
      },
      { name: 'Uses contains() for lookup', visible: true,
        validate: (code) => ({
          passed: /\.contains\s*\(/.test(code),
          message: 'Use .contains() to check if an order ID exists'
        })
      },
      { name: 'Shows set intersection', visible: true,
        validate: (code) => ({
          passed: /retainAll\s*\(|new\s+HashSet\s*<[^>]*>\s*\(.*Set/.test(code),
          message: 'Create a second Set and use retainAll() to find common elements'
        })
      }
    ],
    hiddenTests: [
      { name: 'Declared as Set<T>', visible: false,
        validate: (code) => ({ passed: /Set<Integer>/.test(code), message: 'Declare as Set<Integer> — code to the interface' })
      }
    ],
    hints: [
      'Set<Integer> processedOrders = new HashSet<>();',
      'Adding 1001 twice: processedOrders.add(1001); processedOrders.add(1001); — size will still be 1',
      'Intersection: Set<Integer> copy = new HashSet<>(processedOrders); copy.retainAll(pendingOrders); — copy now has only common elements'
    ],
    solution: `import java.util.HashSet;\nimport java.util.Set;\n\npublic class OrderProcessor {\n    public static void main(String[] args) {\n        Set<Integer> processedOrders = new HashSet<>();\n        processedOrders.add(1001);\n        processedOrders.add(1002);\n        processedOrders.add(1003);\n        processedOrders.add(1001); // duplicate\n\n        System.out.println("Processed count: " + processedOrders.size()); // 3\n        System.out.println("1002 processed: " + processedOrders.contains(1002));\n\n        Set<Integer> pendingOrders = new HashSet<>();\n        pendingOrders.add(1003);\n        pendingOrders.add(1004);\n        pendingOrders.add(1005);\n\n        Set<Integer> overlap = new HashSet<>(processedOrders);\n        overlap.retainAll(pendingOrders);\n        System.out.println("Already processed from pending: " + overlap);\n    }\n}`,
    explanation: 'HashSet<T> stores unique elements. Adding a duplicate silently does nothing — the set stays unchanged. Contains is O(1). Use retainAll() for intersection, addAll() for union, removeAll() for difference. In Spring Security, roles are stored as Set<GrantedAuthority> — no duplicate roles per user.'
  },

  {
    id: 'ck-004', worldId: 'collections-kingdom', order: 4,
    title: 'Optional<T> — Goodbye NullPointerException',
    difficulty: 'medium', xpReward: 220, coinReward: 45, estimatedTime: 14,
    story: 'NullPointerException is the most common Java runtime error. Spring Data\'s findById() returns Optional<T> — if the entity doesn\'t exist, you get an empty Optional instead of null. Learning Optional is mandatory for every Spring developer.',
    objective: 'Use Optional.ofNullable(), isPresent(), orElse(), orElseThrow(), and map() to safely handle values that might be absent.',
    starterCode: `import java.util.Optional;\n\npublic class UserService {\n\n    // Simulates a database lookup\n    public Optional<String> findUserById(int id) {\n        // TODO: Return Optional.of("Alice") if id == 1\n        // TODO: Return Optional.empty() for any other id\n        return Optional.empty();\n    }\n\n    public static void main(String[] args) {\n        UserService service = new UserService();\n\n        // TODO: Find user with id=1, print with orElse("Not found")\n        // TODO: Find user with id=99, print with orElse("Not found")\n        // TODO: Find user with id=1, use map() to uppercase the name, print result\n        // TODO: Find user with id=99, use orElseThrow() with a RuntimeException\n        //       Wrap in try-catch and print the caught message\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'Optional import', pattern: 'import\\s+java\\.util\\.Optional', required: true },
        { name: 'Optional.of or ofNullable', pattern: 'Optional\\.(of|ofNullable|empty)\\s*\\(', required: true },
        { name: 'orElse()', pattern: '\\.orElse\\s*\\(', required: true },
        { name: 'map()', pattern: '\\.map\\s*\\(', required: true },
        { name: 'orElseThrow()', pattern: '\\.orElseThrow\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'findUserById returns Optional', visible: true,
        validate: (code) => ({
          passed: /Optional<String>\s+findUserById|Optional\.of\s*\(|Optional\.empty/.test(code),
          message: 'findUserById() must return Optional<String>'
        })
      },
      { name: 'Uses orElse() for fallback', visible: true,
        validate: (code) => ({
          passed: /\.orElse\s*\(/.test(code),
          message: 'Use .orElse("Not found") when user is absent'
        })
      },
      { name: 'Uses map() for transformation', visible: true,
        validate: (code) => ({
          passed: /\.map\s*\(/.test(code) && /toUpperCase|toLowerCase|\w+::\w+/.test(code),
          message: 'Use .map() to transform the value if present'
        })
      },
      { name: 'Uses orElseThrow()', visible: true,
        validate: (code) => ({
          passed: /\.orElseThrow\s*\(/.test(code),
          message: 'Use .orElseThrow() to throw when value is absent'
        })
      }
    ],
    hiddenTests: [
      { name: 'orElseThrow is caught', visible: false,
        validate: (code) => ({ passed: /try\s*\{[\s\S]*?orElseThrow[\s\S]*?catch/.test(code), message: 'Wrap orElseThrow() in try-catch to handle the exception' })
      }
    ],
    hints: [
      'Return Optional.of("Alice") when id == 1, else Optional.empty()',
      'String name = service.findUserById(1).orElse("Not found");',
      'String upper = service.findUserById(1).map(String::toUpperCase).orElse("None");\nservice.findUserById(99).orElseThrow(() -> new RuntimeException("User not found"));'
    ],
    solution: `import java.util.Optional;\n\npublic class UserService {\n\n    public Optional<String> findUserById(int id) {\n        if (id == 1) return Optional.of("Alice");\n        return Optional.empty();\n    }\n\n    public static void main(String[] args) {\n        UserService service = new UserService();\n\n        String found = service.findUserById(1).orElse("Not found");\n        System.out.println("ID 1: " + found);\n\n        String missing = service.findUserById(99).orElse("Not found");\n        System.out.println("ID 99: " + missing);\n\n        String upper = service.findUserById(1)\n            .map(String::toUpperCase)\n            .orElse("None");\n        System.out.println("Uppercase: " + upper);\n\n        try {\n            service.findUserById(99).orElseThrow(() -> new RuntimeException("User not found"));\n        } catch (RuntimeException e) {\n            System.out.println("Caught: " + e.getMessage());\n        }\n    }\n}`,
    explanation: 'Optional<T> is a container that may or may not hold a value. It forces you to handle the absent case. JpaRepository.findById(id) returns Optional<T> — you must call .orElse(), .orElseThrow(), or .isPresent() before accessing the value. Never call .get() without checking — that defeats the purpose. map() transforms the value if present, otherwise stays empty.'
  },

  {
    id: 'ck-005', worldId: 'collections-kingdom', order: 5,
    title: 'Sorting with Comparator',
    difficulty: 'medium', xpReward: 200, coinReward: 40, estimatedTime: 14,
    story: 'The dashboard needs to display employees sorted by salary (desc), and products sorted by name (asc). Java\'s Comparator lets you define any sort order. Spring Data\'s Sort class uses the same concept under the hood.',
    objective: 'Sort a list of Employee objects first by salary descending, then by name ascending. Use Comparator.comparing() and thenComparing().',
    starterCode: `import java.util.*;\n\nrecord Employee(String name, double salary, String department) {}\n\npublic class SortDemo {\n    public static void main(String[] args) {\n        List<Employee> employees = new ArrayList<>();\n        employees.add(new Employee("Charlie", 85000, "Eng"));\n        employees.add(new Employee("Alice", 95000, "Eng"));\n        employees.add(new Employee("Bob", 85000, "HR"));\n        employees.add(new Employee("Diana", 110000, "Sales"));\n\n        // TODO: Sort by salary descending\n        // TODO: Print sorted list\n\n        // TODO: Sort by name ascending (use Comparator.comparing)\n        // TODO: Print sorted list\n\n        // TODO: Sort by salary desc THEN by name asc (thenComparing)\n        // TODO: Print sorted list\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'Comparator.comparing', pattern: 'Comparator\\.comparing\\s*\\(', required: true },
        { name: 'reversed() or thenComparing', pattern: '\\.reversed\\s*\\(\\s*\\)|\\.thenComparing\\s*\\(', required: true },
        { name: 'sort or sorted', pattern: '\\.sort\\s*\\(|\\.sorted\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'Uses Comparator.comparing()', visible: true,
        validate: (code) => ({
          passed: /Comparator\.comparing\s*\(/.test(code),
          message: 'Use Comparator.comparing(Employee::salary) or similar'
        })
      },
      { name: 'Uses reversed() or reversed comparator', visible: true,
        validate: (code) => ({
          passed: /\.reversed\s*\(\s*\)|Comparator\.reverseOrder/.test(code),
          message: 'Use .reversed() to sort in descending order'
        })
      },
      { name: 'Uses thenComparing() for multi-field sort', visible: true,
        validate: (code) => ({
          passed: /\.thenComparing\s*\(/.test(code),
          message: 'Use .thenComparing() to add a secondary sort criterion'
        })
      }
    ],
    hiddenTests: [
      { name: 'List is actually sorted', visible: false,
        validate: (code) => ({ passed: /employees\.sort\s*\(/.test(code) || /\.sorted\s*\(/.test(code), message: 'Call .sort() or .sorted() on the list' })
      }
    ],
    hints: [
      'employees.sort(Comparator.comparing(Employee::salary).reversed());',
      'employees.sort(Comparator.comparing(Employee::name));',
      'employees.sort(Comparator.comparing(Employee::salary).reversed().thenComparing(Employee::name));'
    ],
    solution: `import java.util.*;\n\nrecord Employee(String name, double salary, String department) {}\n\npublic class SortDemo {\n    public static void main(String[] args) {\n        List<Employee> employees = new ArrayList<>(Arrays.asList(\n            new Employee("Charlie", 85000, "Eng"),\n            new Employee("Alice", 95000, "Eng"),\n            new Employee("Bob", 85000, "HR"),\n            new Employee("Diana", 110000, "Sales")\n        ));\n\n        employees.sort(Comparator.comparing(Employee::salary).reversed());\n        System.out.println("By salary desc:");\n        employees.forEach(e -> System.out.println("  " + e.name() + ": " + e.salary()));\n\n        employees.sort(Comparator.comparing(Employee::name));\n        System.out.println("By name asc:");\n        employees.forEach(e -> System.out.println("  " + e.name()));\n\n        employees.sort(Comparator.comparing(Employee::salary).reversed().thenComparing(Employee::name));\n        System.out.println("By salary desc, then name asc:");\n        employees.forEach(e -> System.out.println("  " + e.name() + ": " + e.salary()));\n    }\n}`,
    explanation: 'Comparator.comparing() takes a key extractor (method reference or lambda). Chain .reversed() for descending. Chain .thenComparing() for tie-breaking on a second field. In Spring Data, Sort.by("salary").descending().and(Sort.by("name")) uses this exact concept to build SQL ORDER BY clauses.'
  },

  {
    id: 'ck-006', worldId: 'collections-kingdom', order: 6,
    title: 'Queue & Deque — Task Scheduling',
    difficulty: 'medium', xpReward: 190, coinReward: 40, estimatedTime: 12,
    story: 'The deployment pipeline needs to process jobs in order. First-In-First-Out. LinkedList implements both List and Queue. ArrayDeque is faster. Understanding Queue prepares you for message queues like RabbitMQ and Kafka — essential microservices tools.',
    objective: 'Build a simple job queue using ArrayDeque. Enqueue 4 jobs, peek at the next job, and dequeue all jobs processing each one.',
    starterCode: `import java.util.ArrayDeque;\nimport java.util.Queue;\n\npublic class JobQueue {\n    public static void main(String[] args) {\n        // TODO: Create Queue<String> named queue using ArrayDeque\n        // TODO: offer() 4 jobs: "Build", "Test", "Package", "Deploy"\n        // TODO: peek() at the front job and print it (does NOT remove)\n        // TODO: Print queue size before processing\n        // TODO: Process all jobs using poll() in a while loop\n        //       Print "Processing: [job]" for each\n        // TODO: Print queue size after — should be 0\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'Queue import', pattern: 'import\\s+java\\.util\\.Queue|import\\s+java\\.util\\.ArrayDeque', required: true },
        { name: 'ArrayDeque creation', pattern: 'new\\s+ArrayDeque\\s*<', required: true },
        { name: 'offer()', pattern: '\\.offer\\s*\\(', required: true },
        { name: 'poll()', pattern: '\\.poll\\s*\\(', required: true },
        { name: 'peek()', pattern: '\\.peek\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'Queue created with ArrayDeque', visible: true,
        validate: (code) => ({
          passed: /new\s+ArrayDeque\s*</.test(code) && /Queue<String>/.test(code),
          message: 'Declare as Queue<String> using new ArrayDeque<>()'
        })
      },
      { name: 'Uses offer(), peek(), poll()', visible: true,
        validate: (code) => {
          const o = /\.offer\s*\(/.test(code);
          const pe = /\.peek\s*\(/.test(code);
          const po = /\.poll\s*\(/.test(code);
          return { passed: o && pe && po, message: 'Use offer() to add, peek() to view front, poll() to remove' };
        }
      },
      { name: 'Processes all jobs in loop', visible: true,
        validate: (code) => ({
          passed: /while\s*\(/.test(code) && /\.poll\s*\(/.test(code),
          message: 'Use a while loop with poll() to drain the queue'
        })
      }
    ],
    hiddenTests: [
      { name: '4 jobs offered', visible: false,
        validate: (code) => {
          const n = (code.match(/\.offer\s*\(/g) || []).length;
          return { passed: n >= 4, message: 'Offer at least 4 jobs to the queue' };
        }
      }
    ],
    hints: [
      'Queue<String> queue = new ArrayDeque<>();',
      'queue.offer("Build"); queue.offer("Test");',
      'while (!queue.isEmpty()) { String job = queue.poll(); System.out.println("Processing: " + job); }'
    ],
    solution: `import java.util.ArrayDeque;\nimport java.util.Queue;\n\npublic class JobQueue {\n    public static void main(String[] args) {\n        Queue<String> queue = new ArrayDeque<>();\n        queue.offer("Build");\n        queue.offer("Test");\n        queue.offer("Package");\n        queue.offer("Deploy");\n\n        System.out.println("Next job: " + queue.peek());\n        System.out.println("Queue size: " + queue.size());\n\n        while (!queue.isEmpty()) {\n            String job = queue.poll();\n            System.out.println("Processing: " + job);\n        }\n\n        System.out.println("Queue size after: " + queue.size());\n    }\n}`,
    explanation: 'Queue is FIFO (First-In-First-Out). Use offer() not add(), poll() not remove(), peek() not element() — the Queue-specific methods return null instead of throwing when the queue is empty. ArrayDeque is faster than LinkedList for queues. This same pattern is how RabbitMQ/Kafka work: producers offer(), consumers poll() — the backbone of microservices communication.'
  },

  {
    id: 'ck-007', worldId: 'collections-kingdom', order: 7,
    title: 'Collections Utilities',
    difficulty: 'medium', xpReward: 195, coinReward: 42, estimatedTime: 12,
    story: 'Java\'s Collections utility class has powerful static methods: frequency, min, max, shuffle, unmodifiableList. Spring uses List.of() and Map.of() to create immutable configurations — these unmodifiable collections prevent accidental mutations.',
    objective: 'Use Collections.frequency(), Collections.min(), Collections.max(), Collections.unmodifiableList(), and List.of() to process a score list.',
    starterCode: `import java.util.*;\n\npublic class ScoreAnalyzer {\n    public static void main(String[] args) {\n        List<Integer> scores = new ArrayList<>(Arrays.asList(85, 92, 78, 92, 95, 78, 88, 92));\n\n        // TODO: Print min and max scores using Collections.min/max\n        // TODO: Print how many times 92 appears using Collections.frequency\n        // TODO: Sort the list ascending using Collections.sort\n        // TODO: Create an unmodifiable view using Collections.unmodifiableList\n        //       Try to add to it in a try-catch — print the exception message\n        // TODO: Create an immutable list using List.of() with 3 config values\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'Collections.min', pattern: 'Collections\\.min\\s*\\(', required: true },
        { name: 'Collections.max', pattern: 'Collections\\.max\\s*\\(', required: true },
        { name: 'Collections.frequency', pattern: 'Collections\\.frequency\\s*\\(', required: true },
        { name: 'unmodifiableList or List.of', pattern: 'unmodifiableList\\s*\\(|List\\.of\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'Uses min() and max()', visible: true,
        validate: (code) => {
          const min = /Collections\.min\s*\(/.test(code);
          const max = /Collections\.max\s*\(/.test(code);
          return { passed: min && max, message: 'Use Collections.min() and Collections.max()' };
        }
      },
      { name: 'Uses frequency()', visible: true,
        validate: (code) => ({
          passed: /Collections\.frequency\s*\(/.test(code),
          message: 'Use Collections.frequency(list, value) to count occurrences'
        })
      },
      { name: 'Creates unmodifiable collection', visible: true,
        validate: (code) => ({
          passed: /unmodifiableList\s*\(/.test(code) || /List\.of\s*\(/.test(code),
          message: 'Use Collections.unmodifiableList() or List.of() for immutable collections'
        })
      }
    ],
    hiddenTests: [
      { name: 'UnsupportedOperationException caught', visible: false,
        validate: (code) => ({ passed: /UnsupportedOperationException|try\s*\{/.test(code), message: 'Catch the UnsupportedOperationException when mutating an unmodifiable list' })
      }
    ],
    hints: [
      'System.out.println(Collections.min(scores)); System.out.println(Collections.max(scores));',
      'System.out.println(Collections.frequency(scores, 92));',
      'List<Integer> locked = Collections.unmodifiableList(scores); try { locked.add(100); } catch (UnsupportedOperationException e) { System.out.println("Cannot modify!"); }'
    ],
    solution: `import java.util.*;\n\npublic class ScoreAnalyzer {\n    public static void main(String[] args) {\n        List<Integer> scores = new ArrayList<>(Arrays.asList(85, 92, 78, 92, 95, 78, 88, 92));\n\n        System.out.println("Min: " + Collections.min(scores));\n        System.out.println("Max: " + Collections.max(scores));\n        System.out.println("92 appears: " + Collections.frequency(scores, 92) + " times");\n\n        Collections.sort(scores);\n        System.out.println("Sorted: " + scores);\n\n        List<Integer> locked = Collections.unmodifiableList(scores);\n        try {\n            locked.add(100);\n        } catch (UnsupportedOperationException e) {\n            System.out.println("Cannot modify unmodifiable list!");\n        }\n\n        List<String> config = List.of("prod", "us-east-1", "v2.1");\n        System.out.println("Config: " + config);\n    }\n}`,
    explanation: 'Collections utility class has static helpers: min/max (O(n)), frequency (count occurrences), sort/shuffle/reverse (mutate in place). unmodifiableList() returns a view that throws on mutation. List.of() creates a truly immutable list. In Spring configs and bean definitions, you\'ll frequently use List.of() and Map.of() to express immutable data safely.'
  },

  {
    id: 'ck-008', worldId: 'collections-kingdom', order: 8,
    title: 'LinkedHashMap — Ordered Cache',
    difficulty: 'medium', xpReward: 210, coinReward: 45, estimatedTime: 14,
    story: 'The API gateway needs a simple LRU cache — keep the most recently accessed N items, evict the oldest when full. LinkedHashMap maintains insertion order (or access order) and has a removeEldestEntry hook — the simplest cache you can build in Java.',
    objective: 'Build a SimpleCache class using LinkedHashMap with access-order enabled. Override removeEldestEntry() to limit cache to 3 entries. Demonstrate LRU eviction.',
    starterCode: `import java.util.LinkedHashMap;\nimport java.util.Map;\n\npublic class SimpleCache<K, V> extends LinkedHashMap<K, V> {\n    private final int capacity;\n\n    public SimpleCache(int capacity) {\n        // TODO: Call super() with initialCapacity=capacity, loadFactor=0.75f, accessOrder=true\n        this.capacity = capacity;\n    }\n\n    // TODO: Override removeEldestEntry(Map.Entry eldest)\n    // Remove when size() > capacity\n\n    public static void main(String[] args) {\n        SimpleCache<String, String> cache = new SimpleCache<>(3);\n\n        cache.put("user:1", "Alice");\n        cache.put("user:2", "Bob");\n        cache.put("user:3", "Charlie");\n        System.out.println("Cache: " + cache);\n\n        // Access user:1 to mark it recently used\n        cache.get("user:1");\n\n        // Add user:4 — should evict the LRU entry (user:2)\n        cache.put("user:4", "Diana");\n        System.out.println("After adding user:4: " + cache);\n        // user:2 should be gone\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'extends LinkedHashMap', pattern: 'extends\\s+LinkedHashMap\\s*<', required: true },
        { name: 'super() with accessOrder', pattern: 'super\\s*\\(.*true\\s*\\)', required: true },
        { name: 'removeEldestEntry override', pattern: 'removeEldestEntry\\s*\\(', required: true },
        { name: 'size() > capacity', pattern: 'size\\s*\\(\\s*\\)\\s*>\\s*capacity', required: true }
      ]
    },
    tests: [
      { name: 'Extends LinkedHashMap', visible: true,
        validate: (code) => ({
          passed: /extends\s+LinkedHashMap\s*</.test(code),
          message: 'class SimpleCache<K,V> extends LinkedHashMap<K,V>'
        })
      },
      { name: 'super() enables access-order', visible: true,
        validate: (code) => ({
          passed: /super\s*\(.*true\s*\)/.test(code),
          message: 'Call super(capacity, 0.75f, true) — third param true enables access-order (LRU)'
        })
      },
      { name: 'removeEldestEntry limits size', visible: true,
        validate: (code) => ({
          passed: /removeEldestEntry/.test(code) && /size\s*\(\s*\)\s*>\s*capacity/.test(code),
          message: 'Override removeEldestEntry to return size() > capacity'
        })
      }
    ],
    hiddenTests: [
      { name: 'Demo shows eviction', visible: false,
        validate: (code) => ({ passed: /cache\.put\s*\(/.test(code) && /cache\.get\s*\(/.test(code), message: 'Demonstrate put() and get() showing LRU eviction' })
      }
    ],
    hints: [
      'super(capacity, 0.75f, true) — the boolean enables access-order mode',
      '@Override protected boolean removeEldestEntry(Map.Entry<K,V> eldest) { return size() > capacity; }',
      'After cache.get("user:1"), it becomes most recently used — adding a 4th entry evicts user:2 instead'
    ],
    solution: `import java.util.LinkedHashMap;\nimport java.util.Map;\n\npublic class SimpleCache<K, V> extends LinkedHashMap<K, V> {\n    private final int capacity;\n\n    public SimpleCache(int capacity) {\n        super(capacity, 0.75f, true);\n        this.capacity = capacity;\n    }\n\n    @Override\n    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {\n        return size() > capacity;\n    }\n\n    public static void main(String[] args) {\n        SimpleCache<String, String> cache = new SimpleCache<>(3);\n        cache.put("user:1", "Alice");\n        cache.put("user:2", "Bob");\n        cache.put("user:3", "Charlie");\n        System.out.println("Cache: " + cache);\n\n        cache.get("user:1"); // mark as recently used\n\n        cache.put("user:4", "Diana"); // evicts user:2 (LRU)\n        System.out.println("After adding user:4: " + cache);\n        System.out.println("user:2 evicted: " + !cache.containsKey("user:2"));\n    }\n}`,
    explanation: 'LinkedHashMap maintains insertion order by default, or access order when the third constructor argument is true. Overriding removeEldestEntry() enables automatic eviction — this is a textbook LRU cache implementation. In production you\'d use Spring\'s @Cacheable with Caffeine or Redis, but understanding the underlying mechanics makes you a better developer.'
  },

  {
    id: 'ck-009', worldId: 'collections-kingdom', order: 9,
    title: '🏆 Boss: In-Memory Product Store',
    difficulty: 'boss', xpReward: 420, coinReward: 120, estimatedTime: 25,
    story: '⚔️ BOSS CHALLENGE! Before JPA existed, developers used in-memory Collections as data stores. Build a ProductRepository using only Collections — this is literally what JpaRepository does under the hood with an actual database.',
    objective: 'Build a ProductRepository with: HashMap for storage, findAll() returning unmodifiable List, findById() returning Optional<Product>, findByCategory() using stream-style iteration, deleteById(), and a method that returns the top-3 most expensive products.',
    starterCode: `import java.util.*;\n\nrecord Product(Long id, String name, String category, double price) {}\n\npublic class ProductRepository {\n    private final Map<Long, Product> store = new HashMap<>();\n    private long nextId = 1L;\n\n    // TODO: save(Product p) — assign id, store in map, return saved product\n    public Product save(String name, String category, double price) {\n        return null; // implement\n    }\n\n    // TODO: findAll() — return unmodifiable list of all products\n    public List<Product> findAll() {\n        return null;\n    }\n\n    // TODO: findById(Long id) — return Optional<Product>\n    public Optional<Product> findById(Long id) {\n        return Optional.empty();\n    }\n\n    // TODO: findByCategory(String category) — return list matching category\n    public List<Product> findByCategory(String category) {\n        return null;\n    }\n\n    // TODO: deleteById(Long id) — remove from map\n    public void deleteById(Long id) {}\n\n    // TODO: findTop3Expensive() — return 3 most expensive, sorted by price desc\n    public List<Product> findTop3Expensive() {\n        return null;\n    }\n\n    public static void main(String[] args) {\n        ProductRepository repo = new ProductRepository();\n        repo.save("MacBook", "Electronics", 1299.0);\n        repo.save("Chair", "Furniture", 450.0);\n        repo.save("Desk", "Furniture", 600.0);\n        repo.save("iPhone", "Electronics", 999.0);\n        repo.save("Lamp", "Furniture", 75.0);\n\n        System.out.println("All: " + repo.findAll().size());\n        System.out.println("ID 2: " + repo.findById(2L).orElse(null));\n        System.out.println("Electronics: " + repo.findByCategory("Electronics").size());\n\n        repo.deleteById(1L);\n        System.out.println("After delete: " + repo.findAll().size());\n        System.out.println("Top 3 expensive: " + repo.findTop3Expensive());\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'HashMap store', pattern: 'Map<Long,\\s*Product>|HashMap<Long', required: true },
        { name: 'findById returns Optional', pattern: 'Optional<Product>\\s+findById', required: true },
        { name: 'findByCategory', pattern: 'List<Product>\\s+findByCategory', required: true },
        { name: 'findTop3Expensive with sort', pattern: 'findTop3Expensive', required: true },
        { name: 'unmodifiable or List.copyOf', pattern: 'unmodifiableList|List\\.copyOf|Collections\\.unmodifiable', required: true }
      ]
    },
    tests: [
      { name: 'save() assigns ID and stores', visible: true,
        validate: (code) => {
          const hasStore = /store\.put\s*\(/.test(code);
          const hasId = /nextId|next_id/.test(code);
          return { passed: hasStore && hasId, message: 'save() must assign an incremented ID and store in the map' };
        }
      },
      { name: 'findById() returns Optional', visible: true,
        validate: (code) => ({
          passed: /Optional\.ofNullable\s*\(.*store\.get|Optional\.of\s*\(.*store\.get/.test(code),
          message: 'findById() should return Optional.ofNullable(store.get(id))'
        })
      },
      { name: 'findByCategory() filters correctly', visible: true,
        validate: (code) => ({
          passed: /findByCategory[\s\S]*?(category|getCategory)[\s\S]*?equals|stream/.test(code),
          message: 'findByCategory() must filter by category field'
        })
      },
      { name: 'findTop3Expensive() sorts and limits', visible: true,
        validate: (code) => ({
          passed: /findTop3Expensive[\s\S]*?(sort|sorted)[\s\S]*?(3|subList|limit)/.test(code),
          message: 'findTop3Expensive() should sort by price desc and return at most 3'
        })
      }
    ],
    hiddenTests: [
      { name: 'deleteById removes entry', visible: false,
        validate: (code) => ({ passed: /store\.remove\s*\(/.test(code), message: 'deleteById() should call store.remove(id)' })
      }
    ],
    hints: [
      'save(): Product p = new Product(nextId++, name, category, price); store.put(p.id(), p); return p;',
      'findById(): return Optional.ofNullable(store.get(id));',
      'findTop3Expensive(): List<Product> all = new ArrayList<>(store.values()); all.sort(Comparator.comparing(Product::price).reversed()); return all.subList(0, Math.min(3, all.size()));'
    ],
    solution: `import java.util.*;\n\nrecord Product(Long id, String name, String category, double price) {}\n\npublic class ProductRepository {\n    private final Map<Long, Product> store = new HashMap<>();\n    private long nextId = 1L;\n\n    public Product save(String name, String category, double price) {\n        Product p = new Product(nextId++, name, category, price);\n        store.put(p.id(), p);\n        return p;\n    }\n\n    public List<Product> findAll() {\n        return Collections.unmodifiableList(new ArrayList<>(store.values()));\n    }\n\n    public Optional<Product> findById(Long id) {\n        return Optional.ofNullable(store.get(id));\n    }\n\n    public List<Product> findByCategory(String category) {\n        List<Product> result = new ArrayList<>();\n        for (Product p : store.values()) {\n            if (p.category().equals(category)) result.add(p);\n        }\n        return result;\n    }\n\n    public void deleteById(Long id) {\n        store.remove(id);\n    }\n\n    public List<Product> findTop3Expensive() {\n        List<Product> all = new ArrayList<>(store.values());\n        all.sort(Comparator.comparing(Product::price).reversed());\n        return all.subList(0, Math.min(3, all.size()));\n    }\n\n    public static void main(String[] args) {\n        ProductRepository repo = new ProductRepository();\n        repo.save("MacBook", "Electronics", 1299.0);\n        repo.save("Chair", "Furniture", 450.0);\n        repo.save("Desk", "Furniture", 600.0);\n        repo.save("iPhone", "Electronics", 999.0);\n        repo.save("Lamp", "Furniture", 75.0);\n\n        System.out.println("All: " + repo.findAll().size());\n        System.out.println("ID 2: " + repo.findById(2L).orElse(null));\n        System.out.println("Electronics: " + repo.findByCategory("Electronics").size());\n        repo.deleteById(1L);\n        System.out.println("After delete: " + repo.findAll().size());\n        System.out.println("Top 3 expensive: " + repo.findTop3Expensive());\n    }\n}`,
    explanation: 'You just built a hand-rolled repository. Every method you implemented has a direct JPA equivalent: save() → JpaRepository.save(), findAll() → findAll(), findById() → findById(), findByCategory() → findByCategory() (derived query), deleteById() → deleteById(). When you write Spring Data JPA code next, you know exactly what\'s happening underneath.'
  }
];
