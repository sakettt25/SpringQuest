export const DATABASE_DIVISION_MISSIONS = [
  {
    id: 'db-001', worldId: 'database-division', order: 1,
    title: '@Entity & @Table — Mapping Classes to Tables',
    difficulty: 'easy', xpReward: 220, coinReward: 45, estimatedTime: 14,
    story: 'Welcome to Database Division! Every data-driven Spring app needs to persist data. JPA (Jakarta Persistence API) maps Java classes to database tables. Instead of writing SQL CREATE TABLE statements, you annotate a class and JPA creates the schema for you.',
    objective: 'Create a Product @Entity with @Id, @GeneratedValue, @Column annotations. Map fields to database column names explicitly.',
    starterCode: `import jakarta.persistence.*;\n\n// TODO: @Entity @Table(name = "products") class Product\n// Fields:\n//   @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n//   Long id\n//\n//   @Column(name = "product_name", nullable = false, length = 100)\n//   String name\n//\n//   @Column(nullable = false)\n//   double price\n//\n//   @Column(name = "stock_qty")\n//   int stockQuantity\n//\n//   @Column(name = "is_active")\n//   boolean active\n//\n// TODO: No-arg constructor (required by JPA)\n// TODO: All-args constructor\n// TODO: Getters for all fields\n// TODO: Override toString() showing id, name, price\n\nclass Main {\n    public static void main(String[] args) {\n        Product p = new Product(null, "MacBook Pro", 1299.99, 50, true);\n        System.out.println(p);\n        System.out.println("Name: " + p.getName());\n        System.out.println("Price: " + p.getPrice());\n        System.out.println("Active: " + p.isActive());\n    }\n}`,
    requirements: {
      annotations: ['Entity', 'Table', 'Id', 'GeneratedValue', 'Column'],
      patterns: [
        { name: 'Product class', pattern: 'class\\s+Product', required: true },
        { name: '@Table with name', pattern: '@Table\\s*\\(\\s*name\\s*=\\s*"products"', required: true },
        { name: 'GenerationType.IDENTITY', pattern: 'GenerationType\\.IDENTITY', required: true },
        { name: 'No-arg constructor', pattern: 'Product\\s*\\(\\s*\\)', required: true },
        { name: 'Getters defined', pattern: 'getName\\s*\\(\\s*\\)|getPrice\\s*\\(\\s*\\)', required: true }
      ]
    },
    tests: [
      { name: '@Entity and @Table on Product', visible: true,
        validate: (code) => ({
          passed: /@Entity/.test(code) && /@Table\s*\(\s*name\s*=\s*"products"/.test(code),
          message: 'Add @Entity and @Table(name = "products") to the Product class'
        })
      },
      { name: '@Id and @GeneratedValue on id field', visible: true,
        validate: (code) => ({
          passed: /@Id/.test(code) && /@GeneratedValue/.test(code) && /GenerationType\.IDENTITY/.test(code),
          message: '@Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id'
        })
      },
      { name: '@Column with custom names', visible: true,
        validate: (code) => {
          const count = (code.match(/@Column\s*\(/g) || []).length;
          const hasName = /@Column\s*\([^)]*name\s*=/.test(code);
          return { passed: count >= 3 && hasName, actual: `${count} @Column`, message: 'Add @Column with name="" on at least 2 fields' };
        }
      },
      { name: 'No-arg constructor exists', visible: true,
        validate: (code) => ({
          passed: /Product\s*\(\s*\)\s*\{/.test(code) || /Product\s*\(\s*\)\s*\{\s*\}/.test(code),
          message: 'Add a no-arg constructor — JPA requires it for entity instantiation'
        })
      }
    ],
    hiddenTests: [
      { name: 'toString() overridden', visible: false,
        validate: (code) => ({ passed: /@Override[\s\S]{0,50}toString|toString[\s\S]{0,200}@Override/.test(code), message: 'Override toString() to display entity information' })
      }
    ],
    hints: [
      '@Entity @Table(name = "products") public class Product { ... }',
      '@Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;',
      '@Column(name = "product_name", nullable = false, length = 100) private String name;',
      'JPA requires a public no-arg constructor: public Product() {}'
    ],
    solution: `import jakarta.persistence.*;\n\n@Entity\n@Table(name = "products")\npublic class Product {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @Column(name = "product_name", nullable = false, length = 100)\n    private String name;\n\n    @Column(nullable = false)\n    private double price;\n\n    @Column(name = "stock_qty")\n    private int stockQuantity;\n\n    @Column(name = "is_active")\n    private boolean active;\n\n    public Product() {}\n\n    public Product(Long id, String name, double price, int stockQuantity, boolean active) {\n        this.id = id; this.name = name; this.price = price;\n        this.stockQuantity = stockQuantity; this.active = active;\n    }\n\n    public Long getId() { return id; }\n    public String getName() { return name; }\n    public double getPrice() { return price; }\n    public int getStockQuantity() { return stockQuantity; }\n    public boolean isActive() { return active; }\n\n    @Override\n    public String toString() {\n        return "Product{id=" + id + ", name='" + name + "', price=" + price + "}";\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Product p = new Product(null, "MacBook Pro", 1299.99, 50, true);\n        System.out.println(p);\n        System.out.println("Name: " + p.getName());\n        System.out.println("Price: " + p.getPrice());\n    }\n}`,
    explanation: '@Entity marks a class as a JPA entity — it maps to a database table. @Table(name="products") overrides the default table name (class name). @Id marks the primary key. @GeneratedValue(IDENTITY) lets the database auto-increment it. @Column(name="x") maps to a specific column, nullable=false adds NOT NULL constraint, length= sets VARCHAR length. JPA requires a no-arg constructor to instantiate entities when loading from the database.'
  },

  {
    id: 'db-002', worldId: 'database-division', order: 2,
    title: 'JpaRepository — Free CRUD Operations',
    difficulty: 'easy', xpReward: 230, coinReward: 47, estimatedTime: 14,
    story: 'Before Spring Data, writing a DAO meant implementing save(), findById(), findAll(), deleteById() for EVERY entity. JpaRepository gives you all of these for free — just extend the interface. Zero SQL, zero implementation code.',
    objective: 'Create a ProductRepository extending JpaRepository. Use all provided CRUD methods. Create a ProductService that uses the repository.',
    starterCode: `import org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.stereotype.Repository;\nimport org.springframework.stereotype.Service;\nimport java.util.*;\n\n// Assume Product entity from previous mission exists\nclass Product {\n    private Long id; private String name; private double price; private boolean active;\n    public Product() {}\n    public Product(Long id, String name, double price, boolean active) { this.id = id; this.name = name; this.price = price; this.active = active; }\n    public Long getId() { return id; } public String getName() { return name; }\n    public double getPrice() { return price; } public boolean isActive() { return active; }\n    public void setId(Long id) { this.id = id; }\n    @Override public String toString() { return "Product[" + id + ", " + name + ", $" + price + "]"; }\n}\n\n// TODO: @Repository interface ProductRepository extends JpaRepository<Product, Long>\n// That's it! JPA provides: save(), findById(), findAll(), deleteById(),\n//   count(), existsById(), findAllById(), saveAll()\n\n// TODO: @Service class ProductService\n// Inject ProductRepository via constructor\n// Methods:\n//   Product createProduct(String name, double price)\n//   Optional<Product> findProduct(Long id)\n//   List<Product> getAllProducts()\n//   void deleteProduct(Long id)\n//   long countProducts()\n\nclass Main {\n    public static void main(String[] args) {\n        // Simulating with our in-memory fake repo\n        InMemoryProductRepo fakeRepo = new InMemoryProductRepo();\n        ProductService svc = new ProductService(fakeRepo);\n\n        svc.createProduct("Laptop", 1299.99);\n        svc.createProduct("Mouse", 25.00);\n        svc.createProduct("Keyboard", 79.99);\n\n        System.out.println("All: " + svc.getAllProducts());\n        System.out.println("Count: " + svc.countProducts());\n        System.out.println("Find 1: " + svc.findProduct(1L));\n        svc.deleteProduct(2L);\n        System.out.println("After delete: " + svc.getAllProducts());\n    }\n}\n\n// Fake in-memory implementation for simulation (not part of the exercise)\nclass InMemoryProductRepo implements ProductRepository {\n    private final Map<Long, Product> store = new java.util.HashMap<>();\n    private long nextId = 1;\n    public Product save(Product p) { if (p.getId() == null) p.setId(nextId++); store.put(p.getId(), p); return p; }\n    public Optional<Product> findById(Long id) { return Optional.ofNullable(store.get(id)); }\n    public List<Product> findAll() { return new ArrayList<>(store.values()); }\n    public void deleteById(Long id) { store.remove(id); }\n    public long count() { return store.size(); }\n    public boolean existsById(Long id) { return store.containsKey(id); }\n    public void delete(Product p) { store.remove(p.getId()); }\n    public <S extends Product> List<S> saveAll(Iterable<S> entities) { entities.forEach(this::save); return new ArrayList<>(); }\n    public List<Product> findAllById(Iterable<Long> ids) { return new ArrayList<>(); }\n    public void deleteAll() { store.clear(); }\n    public void deleteAll(Iterable<? extends Product> e) {}\n    public void deleteAllById(Iterable<? extends Long> ids) { ids.forEach(store::remove); }\n    public void flush() {}\n    public <S extends Product> S saveAndFlush(S e) { return save(e); }\n    public <S extends Product> List<S> saveAllAndFlush(Iterable<S> e) { return saveAll(e); }\n    public void deleteAllInBatch(Iterable<Product> e) {}\n    public void deleteAllByIdInBatch(Iterable<Long> ids) {}\n    public void deleteAllInBatch() {}\n    public Product getOne(Long id) { return store.get(id); }\n    public Product getById(Long id) { return store.get(id); }\n    public Product getReferenceById(Long id) { return store.get(id); }\n    public <S extends Product> Optional<S> findOne(org.springframework.data.domain.Example<S> ex) { return Optional.empty(); }\n    public <S extends Product> List<S> findAll(org.springframework.data.domain.Example<S> ex) { return new ArrayList<>(); }\n    public <S extends Product> List<S> findAll(org.springframework.data.domain.Example<S> ex, org.springframework.data.domain.Sort sort) { return new ArrayList<>(); }\n    public <S extends Product> org.springframework.data.domain.Page<S> findAll(org.springframework.data.domain.Example<S> ex, org.springframework.data.domain.Pageable p) { return org.springframework.data.domain.Page.empty(); }\n    public <S extends Product> long count(org.springframework.data.domain.Example<S> ex) { return 0; }\n    public <S extends Product> boolean exists(org.springframework.data.domain.Example<S> ex) { return false; }\n    public <S extends Product, R> R findBy(org.springframework.data.domain.Example<S> ex, java.util.function.Function<org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery<S>, R> fn) { return null; }\n    public List<Product> findAll(org.springframework.data.domain.Sort sort) { return new ArrayList<>(store.values()); }\n    public org.springframework.data.domain.Page<Product> findAll(org.springframework.data.domain.Pageable p) { return org.springframework.data.domain.Page.empty(); }\n}`,
    requirements: {
      annotations: ['Repository', 'Service'],
      patterns: [
        { name: 'ProductRepository extends JpaRepository', pattern: 'interface\\s+ProductRepository\\s+extends\\s+JpaRepository\\s*<\\s*Product\\s*,\\s*Long\\s*>', required: true },
        { name: 'ProductService class', pattern: 'class\\s+ProductService', required: true },
        { name: 'constructor injection', pattern: 'private\\s+final\\s+ProductRepository', required: true },
        { name: 'createProduct method', pattern: 'Product\\s+createProduct|createProduct\\s*\\(', required: true },
        { name: 'findProduct returns Optional', pattern: 'Optional<Product>\\s+findProduct|findProduct.*Optional', required: true }
      ]
    },
    tests: [
      { name: 'ProductRepository extends JpaRepository<Product, Long>', visible: true,
        validate: (code) => ({
          passed: /interface\s+ProductRepository\s+extends\s+JpaRepository\s*<\s*Product\s*,\s*Long\s*>/.test(code),
          message: 'interface ProductRepository extends JpaRepository<Product, Long> {} — that\'s the entire interface!'
        })
      },
      { name: 'ProductService with all CRUD methods', visible: true,
        validate: (code) => {
          const create = /createProduct\s*\(/.test(code);
          const find = /findProduct\s*\(/.test(code);
          const getAll = /getAllProducts\s*\(/.test(code);
          const del = /deleteProduct\s*\(/.test(code);
          const count = /countProducts\s*\(/.test(code);
          const total = [create, find, getAll, del, count].filter(Boolean).length;
          return { passed: total >= 4, actual: `${total}/5 methods`, message: 'ProductService needs createProduct, findProduct, getAllProducts, deleteProduct, countProducts' };
        }
      },
      { name: 'Uses repository methods', visible: true,
        validate: (code) => {
          const repo = /repository\.(save|findById|findAll|deleteById|count)\s*\(/.test(code);
          return { passed: repo, message: 'ProductService must call repository.save(), findById(), findAll(), deleteById(), count()' };
        }
      }
    ],
    hiddenTests: [
      { name: 'findProduct uses Optional', visible: false,
        validate: (code) => ({ passed: /Optional<Product>/.test(code) && /repository\.findById/.test(code), message: 'findProduct() should return Optional<Product> from repository.findById()' })
      }
    ],
    hints: [
      '@Repository public interface ProductRepository extends JpaRepository<Product, Long> {} — empty body is fine, all methods are inherited!',
      'public Product createProduct(String name, double price) { return repository.save(new Product(null, name, price, true)); }',
      'public Optional<Product> findProduct(Long id) { return repository.findById(id); }'
    ],
    solution: `import org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.stereotype.Repository;\nimport org.springframework.stereotype.Service;\nimport java.util.*;\n\nclass Product {\n    private Long id; private String name; private double price; private boolean active;\n    public Product() {}\n    public Product(Long id, String name, double price, boolean active) { this.id=id; this.name=name; this.price=price; this.active=active; }\n    public Long getId() { return id; } public String getName() { return name; }\n    public double getPrice() { return price; } public boolean isActive() { return active; }\n    public void setId(Long id) { this.id = id; }\n    @Override public String toString() { return "Product[" + id + ", " + name + ", $" + price + "]"; }\n}\n\n@Repository\npublic interface ProductRepository extends JpaRepository<Product, Long> {\n    // 15+ methods available for free: save, findById, findAll, deleteById, count, existsById...\n}\n\n@Service\nclass ProductService {\n    private final ProductRepository repository;\n\n    public ProductService(ProductRepository repository) {\n        this.repository = repository;\n    }\n\n    public Product createProduct(String name, double price) {\n        return repository.save(new Product(null, name, price, true));\n    }\n\n    public Optional<Product> findProduct(Long id) {\n        return repository.findById(id);\n    }\n\n    public List<Product> getAllProducts() {\n        return repository.findAll();\n    }\n\n    public void deleteProduct(Long id) {\n        repository.deleteById(id);\n    }\n\n    public long countProducts() {\n        return repository.count();\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        InMemoryProductRepo fakeRepo = new InMemoryProductRepo();\n        ProductService svc = new ProductService(fakeRepo);\n        svc.createProduct("Laptop", 1299.99);\n        svc.createProduct("Mouse", 25.00);\n        svc.createProduct("Keyboard", 79.99);\n        System.out.println("All: " + svc.getAllProducts());\n        System.out.println("Count: " + svc.countProducts());\n        System.out.println("Find 1: " + svc.findProduct(1L));\n        svc.deleteProduct(2L);\n        System.out.println("After delete: " + svc.getAllProducts());\n    }\n}`,
    explanation: 'JpaRepository<Entity, ID> provides: save(), saveAll(), findById(), findAll(), findAllById(), deleteById(), deleteAll(), count(), existsById(). Returning Optional<T> from findById() forces you to handle the missing case. Spring Data generates the SQL at startup. JpaRepository extends PagingAndSortingRepository (+ pagination) which extends CrudRepository (core CRUD). You almost never need to write SQL for basic CRUD.'
  },

  {
    id: 'db-003', worldId: 'database-division', order: 3,
    title: 'Derived Query Methods — Zero SQL',
    difficulty: 'medium', xpReward: 250, coinReward: 52, estimatedTime: 15,
    story: 'Spring Data reads your method names and GENERATES the SQL. findByEmail() becomes SELECT * FROM users WHERE email = ?. findBySalaryGreaterThan() becomes SELECT * FROM employees WHERE salary > ?. No SQL, no annotations — just method naming conventions.',
    objective: 'Add derived query methods to ProductRepository: find by name, find by price range, find by active status, find by category, and count by active.',
    starterCode: `import org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.stereotype.Repository;\nimport java.util.*;\n\nclass Product {\n    private Long id; private String name; private String category;\n    private double price; private boolean active; private int stockQuantity;\n    public Product() {}\n    public Product(Long id, String name, String category, double price, boolean active, int stock) {\n        this.id=id; this.name=name; this.category=category;\n        this.price=price; this.active=active; this.stockQuantity=stock;\n    }\n    public Long getId() { return id; } public String getName() { return name; }\n    public String getCategory() { return category; } public double getPrice() { return price; }\n    public boolean isActive() { return active; } public int getStockQuantity() { return stockQuantity; }\n    public void setId(Long id) { this.id = id; }\n    @Override public String toString() { return name + " ($" + price + ")\"; }\n}\n\n@Repository\npublic interface ProductRepository extends JpaRepository<Product, Long> {\n    // TODO: Find all products by name (exact match)\n    // Method name: findByName(String name) -> List<Product>\n\n    // TODO: Find by name containing keyword (case-insensitive)\n    // Method: findByNameContainingIgnoreCase(String keyword) -> List<Product>\n\n    // TODO: Find by price between min and max\n    // Method: findByPriceBetween(double min, double max) -> List<Product>\n\n    // TODO: Find all active (or inactive) products\n    // Method: findByActive(boolean active) -> List<Product>\n\n    // TODO: Find by category and active status combined\n    // Method: findByCategoryAndActive(String category, boolean active) -> List<Product>\n\n    // TODO: Count products that are active\n    // Method: countByActive(boolean active) -> long\n\n    // TODO: Find products with stock quantity greater than a threshold\n    // Method: findByStockQuantityGreaterThan(int threshold) -> List<Product>\n}\n\nclass Main {\n    public static void main(String[] args) {\n        // Demonstrate what these methods generate in SQL:\n        System.out.println("findByName() → SELECT * FROM products WHERE name = ?");\n        System.out.println("findByNameContainingIgnoreCase() → SELECT * FROM products WHERE LOWER(name) LIKE %?%");\n        System.out.println("findByPriceBetween() → SELECT * FROM products WHERE price BETWEEN ? AND ?");\n        System.out.println("findByCategoryAndActive() → SELECT * FROM products WHERE category = ? AND active = ?");\n        System.out.println("countByActive() → SELECT COUNT(*) FROM products WHERE active = ?");\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'findByName', pattern: 'findByName\\s*\\(\\s*String', required: true },
        { name: 'findByNameContaining', pattern: 'findByNameContaining', required: true },
        { name: 'findByPriceBetween', pattern: 'findByPriceBetween', required: true },
        { name: 'findByActive', pattern: 'findByActive\\s*\\(\\s*boolean', required: true },
        { name: 'findByCategoryAndActive', pattern: 'findByCategoryAndActive', required: true },
        { name: 'countByActive', pattern: 'countByActive', required: true }
      ]
    },
    tests: [
      { name: 'Basic find methods defined', visible: true,
        validate: (code) => {
          const n = /findByName\s*\(/.test(code);
          const a = /findByActive\s*\(/.test(code);
          return { passed: n && a, message: 'Add findByName() and findByActive() methods' };
        }
      },
      { name: 'Range and pattern methods', visible: true,
        validate: (code) => {
          const between = /findByPriceBetween/.test(code);
          const contains = /findByNameContaining/.test(code);
          return { passed: between && contains, message: 'Add findByPriceBetween() and findByNameContaining()' };
        }
      },
      { name: 'Compound and count methods', visible: true,
        validate: (code) => {
          const compound = /findByCategoryAndActive/.test(code);
          const count = /countByActive/.test(code);
          return { passed: compound && count, message: 'Add findByCategoryAndActive() and countByActive()' };
        }
      },
      { name: 'Stock quantity method', visible: true,
        validate: (code) => ({
          passed: /findByStockQuantityGreaterThan/.test(code),
          message: 'Add findByStockQuantityGreaterThan(int threshold)'
        })
      }
    ],
    hiddenTests: [
      { name: 'Return types are correct', visible: false,
        validate: (code) => {
          const listMethods = /List<Product>\s+findBy/.test(code);
          const countMethod = /long\s+countByActive/.test(code);
          return { passed: listMethods && countMethod, message: 'findBy methods return List<Product>, countBy returns long' };
        }
      }
    ],
    hints: [
      'Spring Data naming keywords: findBy, countBy, deleteBy + field names + And/Or/Between/GreaterThan/LessThan/Like/Containing/IgnoreCase',
      'List<Product> findByName(String name); — generates: SELECT * FROM products WHERE name = ?',
      'List<Product> findByPriceBetween(double min, double max); — generates: WHERE price BETWEEN ? AND ?'
    ],
    solution: `import org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.stereotype.Repository;\nimport java.util.*;\n\n@Repository\npublic interface ProductRepository extends JpaRepository<Product, Long> {\n    List<Product> findByName(String name);\n    List<Product> findByNameContainingIgnoreCase(String keyword);\n    List<Product> findByPriceBetween(double min, double max);\n    List<Product> findByActive(boolean active);\n    List<Product> findByCategoryAndActive(String category, boolean active);\n    long countByActive(boolean active);\n    List<Product> findByStockQuantityGreaterThan(int threshold);\n}`,
    explanation: 'Spring Data parses method names to generate JPQL/SQL. Keywords: findBy (SELECT WHERE), countBy (SELECT COUNT), deleteBy (DELETE WHERE). Modifiers: And (AND), Or (OR), Between (BETWEEN ? AND ?), GreaterThan (> ?), LessThan (< ?), Like (%?%), Containing (%keyword%), StartingWith (keyword%), EndingWith (%keyword), IgnoreCase (LOWER/UPPER). Combine freely: findByDepartmentNameAndSalaryGreaterThanAndActiveTrue(String dept, double salary).'
  },

  {
    id: 'db-004', worldId: 'database-division', order: 4,
    title: '@OneToMany & @ManyToOne — Relationships',
    difficulty: 'medium', xpReward: 270, coinReward: 56, estimatedTime: 18,
    story: 'One Customer places many Orders. One Order belongs to one Customer. This is the most common database relationship pattern. JPA handles the JOIN automatically via @OneToMany and @ManyToOne annotations — no SQL JOIN needed.',
    objective: 'Map a Customer → Orders relationship with @OneToMany and @ManyToOne. Configure cascade, fetch type, and demonstrate loading orders through a customer.',
    starterCode: `import jakarta.persistence.*;\nimport java.util.*;\n\n// TODO: @Entity class Customer\n// Fields:\n//   @Id @GeneratedValue Long id\n//   String name, String email\n//   @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)\n//   List<Order> orders = new ArrayList<>()\n// Constructors, getters\n// Method: addOrder(Order order) — sets order.customer = this, then orders.add(order)\n\n// TODO: @Entity class Order\n// Fields:\n//   @Id @GeneratedValue Long id\n//   String productName, double totalAmount\n//   @ManyToOne(fetch = FetchType.LAZY)\n//   @JoinColumn(name = "customer_id")\n//   Customer customer\n// Constructors, getters, setters\n\nclass Main {\n    public static void main(String[] args) {\n        Customer customer = new Customer(1L, "Alice", "alice@corp.com");\n\n        Order order1 = new Order(1L, "MacBook Pro", 1299.99);\n        Order order2 = new Order(2L, "iPhone 15", 999.99);\n\n        customer.addOrder(order1);\n        customer.addOrder(order2);\n\n        System.out.println("Customer: " + customer.getName());\n        System.out.println("Orders: " + customer.getOrders().size());\n        customer.getOrders().forEach(o -> System.out.println("  " + o.getProductName() + " - $" + o.getTotalAmount()));\n        System.out.println("Order's customer: " + order1.getCustomer().getName());\n    }\n}`,
    requirements: {
      annotations: ['Entity', 'Id', 'GeneratedValue', 'OneToMany', 'ManyToOne', 'JoinColumn'],
      patterns: [
        { name: 'Customer @Entity', pattern: '@Entity[\\s\\S]{0,50}class\\s+Customer', required: true },
        { name: 'Order @Entity', pattern: '@Entity[\\s\\S]{0,50}class\\s+Order', required: true },
        { name: 'mappedBy in @OneToMany', pattern: 'mappedBy\\s*=\\s*"customer"', required: true },
        { name: 'CascadeType.ALL', pattern: 'CascadeType\\.ALL', required: true },
        { name: '@JoinColumn on Order', pattern: '@JoinColumn\\s*\\(\\s*name\\s*=\\s*"customer_id"', required: true },
        { name: 'addOrder helper method', pattern: 'void\\s+addOrder\\s*\\(', required: true }
      ]
    },
    tests: [
      { name: 'Customer has @OneToMany List<Order>', visible: true,
        validate: (code) => ({
          passed: /@OneToMany/.test(code) && /List<Order>/.test(code) && /mappedBy\s*=\s*"customer"/.test(code),
          message: '@OneToMany(mappedBy = "customer") List<Order> orders'
        })
      },
      { name: 'Order has @ManyToOne Customer', visible: true,
        validate: (code) => ({
          passed: /@ManyToOne/.test(code) && /@JoinColumn/.test(code),
          message: '@ManyToOne @JoinColumn(name = "customer_id") Customer customer'
        })
      },
      { name: 'CascadeType.ALL configured', visible: true,
        validate: (code) => ({
          passed: /CascadeType\.ALL/.test(code),
          message: 'Add cascade = CascadeType.ALL to @OneToMany so orders are saved/deleted with customer'
        })
      },
      { name: 'addOrder() maintains both sides', visible: true,
        validate: (code) => {
          const hasMethod = /void\s+addOrder\s*\(/.test(code);
          const setsCustomer = /order\s*\.\s*setCustomer|order\s*\.\s*customer\s*=\s*this/.test(code);
          return { passed: hasMethod && setsCustomer, message: 'addOrder() must set order.customer = this AND add to orders list' };
        }
      }
    ],
    hiddenTests: [
      { name: 'FetchType.LAZY configured', visible: false,
        validate: (code) => ({ passed: /FetchType\.LAZY/.test(code), message: 'Use FetchType.LAZY for both relationships to prevent N+1 issues' })
      }
    ],
    hints: [
      '@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY) private List<Order> orders = new ArrayList<>();',
      '@ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "customer_id") private Customer customer;',
      'void addOrder(Order order) { order.setCustomer(this); orders.add(order); } — ALWAYS maintain both sides of the relationship!'
    ],
    solution: `import jakarta.persistence.*;\nimport java.util.*;\n\n@Entity\nclass Customer {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String name;\n    private String email;\n\n    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)\n    private List<Order> orders = new ArrayList<>();\n\n    public Customer() {}\n    public Customer(Long id, String name, String email) { this.id=id; this.name=name; this.email=email; }\n\n    public Long getId() { return id; }\n    public String getName() { return name; }\n    public String getEmail() { return email; }\n    public List<Order> getOrders() { return orders; }\n\n    public void addOrder(Order order) {\n        order.setCustomer(this);\n        orders.add(order);\n    }\n}\n\n@Entity\n@jakarta.persistence.Table(name = "orders")\nclass Order {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    private String productName;\n    private double totalAmount;\n\n    @ManyToOne(fetch = FetchType.LAZY)\n    @JoinColumn(name = "customer_id")\n    private Customer customer;\n\n    public Order() {}\n    public Order(Long id, String productName, double totalAmount) { this.id=id; this.productName=productName; this.totalAmount=totalAmount; }\n\n    public Long getId() { return id; }\n    public String getProductName() { return productName; }\n    public double getTotalAmount() { return totalAmount; }\n    public Customer getCustomer() { return customer; }\n    public void setCustomer(Customer customer) { this.customer = customer; }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Customer customer = new Customer(1L, "Alice", "alice@corp.com");\n        Order order1 = new Order(1L, "MacBook Pro", 1299.99);\n        Order order2 = new Order(2L, "iPhone 15", 999.99);\n        customer.addOrder(order1);\n        customer.addOrder(order2);\n        System.out.println("Customer: " + customer.getName());\n        System.out.println("Orders: " + customer.getOrders().size());\n        customer.getOrders().forEach(o -> System.out.println("  " + o.getProductName() + " - $" + o.getTotalAmount()));\n        System.out.println("Order's customer: " + order1.getCustomer().getName());\n    }\n}`,
    explanation: '@OneToMany side is the "parent". mappedBy = "customer" says "the foreign key is on the Order table in the customer field." CascadeType.ALL means save/delete Customer automatically cascades to Orders. FetchType.LAZY means orders are NOT loaded until you call getOrders() — critical for performance. @ManyToOne side owns the foreign key column. ALWAYS maintain both sides of the relationship with a helper method like addOrder().'
  },

  {
    id: 'db-005', worldId: 'database-division', order: 5,
    title: '@Transactional — Data Integrity',
    difficulty: 'medium', xpReward: 265, coinReward: 55, estimatedTime: 15,
    story: 'A bank transfer: debit Alice $500, credit Bob $500. If the debit succeeds but the credit fails, you\'ve destroyed $500. Both must succeed or both must fail — atomically. @Transactional wraps your method in a database transaction: all-or-nothing.',
    objective: 'Implement @Transactional on service methods. Show rollback on exception. Understand read-only transactions for performance.',
    starterCode: `import org.springframework.transaction.annotation.Transactional;\nimport org.springframework.stereotype.Service;\nimport org.springframework.stereotype.Repository;\nimport java.util.*;\n\nclass Account {\n    private Long id; private String owner; private double balance;\n    public Account(Long id, String owner, double balance) { this.id=id; this.owner=owner; this.balance=balance; }\n    public Long getId() { return id; }\n    public String getOwner() { return owner; }\n    public double getBalance() { return balance; }\n    public void setBalance(double balance) { this.balance = balance; }\n    @Override public String toString() { return owner + ": $" + balance; }\n}\n\n@Repository\nclass AccountRepository {\n    private final Map<Long, Account> store = new HashMap<>(Map.of(\n        1L, new Account(1L, "Alice", 1000.0),\n        2L, new Account(2L, "Bob", 500.0)\n    ));\n    public Account findById(Long id) { return store.get(id); }\n    public Account save(Account a) { store.put(a.getId(), a); return a; }\n    public List<Account> findAll() { return new ArrayList<>(store.values()); }\n}\n\n// TODO: @Service class BankService\n// Inject AccountRepository via constructor\n//\n// @Transactional\n// void transfer(Long fromId, Long toId, double amount)\n//   - Find both accounts\n//   - Validate: if fromAccount.balance < amount throw IllegalArgumentException("Insufficient funds")\n//   - Debit fromAccount: balance -= amount\n//   - Credit toAccount: balance += amount\n//   - Save both\n//   - Print "Transferred $X from [from] to [to]"\n//\n// @Transactional(readOnly = true)\n// List<Account> getAllAccounts() — returns all accounts (read-only = optimised, no write locks)\n//\n// @Transactional(rollbackFor = Exception.class)\n// void riskyTransfer(Long fromId, Long toId, double amount)\n//   - Same as transfer, but after saving, throw new RuntimeException("Simulated network failure")\n//   - The @Transactional will ROLLBACK both saves!\n\nclass Main {\n    public static void main(String[] args) {\n        AccountRepository repo = new AccountRepository();\n        BankService bank = new BankService(repo);\n\n        System.out.println("Before: " + bank.getAllAccounts());\n        bank.transfer(1L, 2L, 200.0);\n        System.out.println("After transfer: " + bank.getAllAccounts());\n\n        try {\n            bank.transfer(1L, 2L, 5000.0); // should fail: insufficient funds\n        } catch (IllegalArgumentException e) {\n            System.out.println("Transfer failed: " + e.getMessage());\n        }\n        System.out.println("After failed transfer: " + bank.getAllAccounts());\n    }\n}`,
    requirements: {
      annotations: ['Service', 'Transactional'],
      patterns: [
        { name: 'BankService class', pattern: 'class\\s+BankService', required: true },
        { name: '@Transactional on transfer', pattern: '@Transactional[\\s\\S]{0,100}void\\s+transfer|@Transactional[\\s\\S]{0,5}\ntransfer|@Transactional\\s+void\\s+transfer', required: true },
        { name: 'readOnly transaction', pattern: '@Transactional\\s*\\(\\s*readOnly\\s*=\\s*true\\s*\\)', required: true },
        { name: 'Insufficient funds check', pattern: 'Insufficient|insufficient|balance\\s*<\\s*amount', required: true },
        { name: 'Both accounts saved', pattern: 'repo\\.save|repository\\.save', required: true }
      ]
    },
    tests: [
      { name: '@Transactional on transfer() method', visible: true,
        validate: (code) => ({
          passed: /@Transactional/.test(code) && /void\s+transfer\s*\(/.test(code),
          message: 'Add @Transactional to the transfer() method'
        })
      },
      { name: 'Validates insufficient funds', visible: true,
        validate: (code) => ({
          passed: /balance\s*<\s*amount|Insufficient/.test(code),
          message: 'Check if fromAccount.balance < amount and throw IllegalArgumentException'
        })
      },
      { name: '@Transactional(readOnly=true) on getAllAccounts', visible: true,
        validate: (code) => ({
          passed: /@Transactional\s*\(\s*readOnly\s*=\s*true\s*\)/.test(code) && /getAllAccounts/.test(code),
          message: 'Add @Transactional(readOnly = true) to getAllAccounts()'
        })
      }
    ],
    hiddenTests: [
      { name: 'riskyTransfer throws after saves', visible: false,
        validate: (code) => ({
          passed: /riskyTransfer/.test(code) && /throw\s+new\s+RuntimeException/.test(code),
          message: 'riskyTransfer() should save both accounts then throw — @Transactional rolls back both saves'
        })
      }
    ],
    hints: [
      '@Transactional public void transfer(Long fromId, Long toId, double amount) { Account from = repo.findById(fromId); Account to = repo.findById(toId); if (from.getBalance() < amount) throw new IllegalArgumentException("Insufficient funds"); from.setBalance(from.getBalance() - amount); to.setBalance(to.getBalance() + amount); repo.save(from); repo.save(to); }',
      '@Transactional(readOnly = true) public List<Account> getAllAccounts() { return repo.findAll(); }',
      'readOnly = true: JPA skips dirty-checking and write locks — faster for SELECT-only operations'
    ],
    solution: `import org.springframework.transaction.annotation.Transactional;\nimport org.springframework.stereotype.Service;\nimport org.springframework.stereotype.Repository;\nimport java.util.*;\n\nclass Account {\n    private Long id; private String owner; private double balance;\n    public Account(Long id, String owner, double balance) { this.id=id; this.owner=owner; this.balance=balance; }\n    public Long getId() { return id; } public String getOwner() { return owner; }\n    public double getBalance() { return balance; } public void setBalance(double b) { this.balance = b; }\n    @Override public String toString() { return owner + ": $" + balance; }\n}\n\n@Repository\nclass AccountRepository {\n    private final Map<Long, Account> store = new HashMap<>(Map.of(\n        1L, new Account(1L, "Alice", 1000.0), 2L, new Account(2L, "Bob", 500.0)));\n    public Account findById(Long id) { return store.get(id); }\n    public Account save(Account a) { store.put(a.getId(), a); return a; }\n    public List<Account> findAll() { return new ArrayList<>(store.values()); }\n}\n\n@Service\nclass BankService {\n    private final AccountRepository repo;\n    public BankService(AccountRepository repo) { this.repo = repo; }\n\n    @Transactional\n    public void transfer(Long fromId, Long toId, double amount) {\n        Account from = repo.findById(fromId);\n        Account to = repo.findById(toId);\n        if (from.getBalance() < amount) throw new IllegalArgumentException("Insufficient funds");\n        from.setBalance(from.getBalance() - amount);\n        to.setBalance(to.getBalance() + amount);\n        repo.save(from);\n        repo.save(to);\n        System.out.println("Transferred $" + amount + " from " + from.getOwner() + " to " + to.getOwner());\n    }\n\n    @Transactional(readOnly = true)\n    public List<Account> getAllAccounts() { return repo.findAll(); }\n\n    @Transactional(rollbackFor = Exception.class)\n    public void riskyTransfer(Long fromId, Long toId, double amount) {\n        Account from = repo.findById(fromId);\n        Account to = repo.findById(toId);\n        from.setBalance(from.getBalance() - amount);\n        to.setBalance(to.getBalance() + amount);\n        repo.save(from);\n        repo.save(to);\n        throw new RuntimeException("Simulated network failure"); // both saves ROLLED BACK\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        AccountRepository repo = new AccountRepository();\n        BankService bank = new BankService(repo);\n        System.out.println("Before: " + bank.getAllAccounts());\n        bank.transfer(1L, 2L, 200.0);\n        System.out.println("After transfer: " + bank.getAllAccounts());\n        try { bank.transfer(1L, 2L, 5000.0); } catch (IllegalArgumentException e) { System.out.println("Failed: " + e.getMessage()); }\n        System.out.println("After failed: " + bank.getAllAccounts());\n    }\n}`,
    explanation: '@Transactional wraps a method in a database transaction. If the method throws a RuntimeException, Spring rolls back ALL database changes made in that method — atomically. rollbackFor = Exception.class also rolls back on checked exceptions. readOnly = true tells JPA to skip dirty-checking (no need to track changes) and tells the database to use read-only mode — significant performance gain for read-heavy services. Always put @Transactional on Service methods, not Repository methods.'
  },

  {
    id: 'db-006', worldId: 'database-division', order: 6,
    title: '@Query — Custom JPQL & Native SQL',
    difficulty: 'medium', xpReward: 270, coinReward: 57, estimatedTime: 16,
    story: 'Derived query methods can\'t express complex queries: multi-table JOINs, aggregations, subqueries. @Query lets you write JPQL (Java Persistence Query Language — like SQL but on entities) or native SQL directly on the repository interface.',
    objective: 'Write @Query methods for complex scenarios: search with multiple optional filters, aggregation, and a native SQL query.',
    starterCode: `import org.springframework.data.jpa.repository.*;\nimport org.springframework.data.repository.query.Param;\nimport java.util.*;\n\nclass Employee {\n    private Long id; private String name; private String department;\n    private double salary; private boolean active;\n    public Employee() {}\n    public Employee(Long id, String name, String department, double salary, boolean active) {\n        this.id=id; this.name=name; this.department=department; this.salary=salary; this.active=active;\n    }\n    public Long getId() { return id; } public String getName() { return name; }\n    public String getDepartment() { return department; } public double getSalary() { return salary; }\n    public boolean isActive() { return active; }\n    @Override public String toString() { return name + " (" + department + ") $" + salary; }\n}\n\npublic interface EmployeeRepository extends JpaRepository<Employee, Long> {\n\n    // TODO: @Query using JPQL - find employees by department with salary above threshold\n    // JPQL: SELECT e FROM Employee e WHERE e.department = :dept AND e.salary > :minSalary AND e.active = true\n    // Method: findHighEarnersByDept(@Param("dept") String department, @Param("minSalary") double minSalary)\n\n    // TODO: @Query - find average salary per department (returns List<Object[]>)\n    // JPQL: SELECT e.department, AVG(e.salary) FROM Employee e GROUP BY e.department\n    // Method: findAvgSalaryByDepartment()\n\n    // TODO: @Query - count active employees per department (Map-friendly)\n    // JPQL: SELECT e.department, COUNT(e) FROM Employee e WHERE e.active = true GROUP BY e.department\n    // Method: countActiveByDepartment()\n\n    // TODO: @Query(nativeQuery = true) - raw SQL query\n    // SQL: SELECT * FROM employees WHERE salary BETWEEN :min AND :max ORDER BY salary DESC\n    // Method: findBySalaryRange(@Param(\"min\") double min, @Param(\"max\") double max)\n\n    // TODO: @Modifying @Query - update salary for a department\n    // JPQL: UPDATE Employee e SET e.salary = e.salary * :multiplier WHERE e.department = :dept\n    // Method: raiseSalaryByDept(@Param(\"dept\") String dept, @Param(\"multiplier\") double multiplier)\n}\n\nclass Main {\n    public static void main(String[] args) {\n        System.out.println("@Query examples:");\n        System.out.println("JPQL: SELECT e FROM Employee e WHERE e.department = :dept AND e.salary > :minSalary");\n        System.out.println("Native: SELECT * FROM employees WHERE salary BETWEEN :min AND :max");\n        System.out.println("Modifying: UPDATE Employee e SET e.salary = e.salary * :multiplier WHERE e.department = :dept");\n    }\n}`,
    requirements: {
      annotations: ['Query', 'Modifying'],
      patterns: [
        { name: 'JPQL query with parameters', pattern: '@Query\\s*\\(\\s*"SELECT\\s+e\\s+FROM\\s+Employee', required: true },
        { name: '@Param usage', pattern: '@Param\\s*\\(', required: true },
        { name: 'GROUP BY aggregation query', pattern: 'GROUP\\s+BY', required: true },
        { name: 'nativeQuery = true', pattern: 'nativeQuery\\s*=\\s*true', required: true },
        { name: '@Modifying on update', pattern: '@Modifying', required: true }
      ]
    },
    tests: [
      { name: 'JPQL query with @Param', visible: true,
        validate: (code) => ({
          passed: /@Query\s*\(\s*"SELECT\s+e\s+FROM\s+Employee/.test(code) && /@Param\s*\(/.test(code),
          message: '@Query("SELECT e FROM Employee e WHERE ...") with @Param("name") parameters'
        })
      },
      { name: 'Aggregation query with GROUP BY', visible: true,
        validate: (code) => ({
          passed: /GROUP\s+BY/.test(code) && /AVG|COUNT/.test(code),
          message: 'Write a GROUP BY query using AVG() or COUNT()'
        })
      },
      { name: 'Native SQL query', visible: true,
        validate: (code) => ({
          passed: /nativeQuery\s*=\s*true/.test(code),
          message: '@Query(value = "...", nativeQuery = true)'
        })
      },
      { name: '@Modifying UPDATE query', visible: true,
        validate: (code) => ({
          passed: /@Modifying/.test(code) && /UPDATE\s+Employee/.test(code),
          message: '@Modifying @Query("UPDATE Employee e SET...") for bulk updates'
        })
      }
    ],
    hiddenTests: [
      { name: 'All methods have return types', visible: false,
        validate: (code) => {
          const hasListReturn = /List<Employee>\s+findHighEarners|List<Object\[\]>\s+findAvg|List<Object\[\]>\s+count/.test(code);
          return { passed: hasListReturn, message: 'JPQL queries should return List<Employee> or List<Object[]> for projections' };
        }
      }
    ],
    hints: [
      '@Query("SELECT e FROM Employee e WHERE e.department = :dept AND e.salary > :minSalary AND e.active = true") List<Employee> findHighEarnersByDept(@Param("dept") String dept, @Param("minSalary") double minSalary);',
      '@Query("SELECT e.department, AVG(e.salary) FROM Employee e GROUP BY e.department") List<Object[]> findAvgSalaryByDepartment();',
      '@Modifying @Query("UPDATE Employee e SET e.salary = e.salary * :multiplier WHERE e.department = :dept") int raiseSalaryByDept(@Param("dept") String dept, @Param("multiplier") double multiplier);'
    ],
    solution: `import org.springframework.data.jpa.repository.*;\nimport org.springframework.data.repository.query.Param;\nimport java.util.*;\n\npublic interface EmployeeRepository extends JpaRepository<Employee, Long> {\n\n    @Query("SELECT e FROM Employee e WHERE e.department = :dept AND e.salary > :minSalary AND e.active = true")\n    List<Employee> findHighEarnersByDept(@Param("dept") String department, @Param("minSalary") double minSalary);\n\n    @Query("SELECT e.department, AVG(e.salary) FROM Employee e GROUP BY e.department")\n    List<Object[]> findAvgSalaryByDepartment();\n\n    @Query("SELECT e.department, COUNT(e) FROM Employee e WHERE e.active = true GROUP BY e.department")\n    List<Object[]> countActiveByDepartment();\n\n    @Query(value = "SELECT * FROM employees WHERE salary BETWEEN :min AND :max ORDER BY salary DESC", nativeQuery = true)\n    List<Employee> findBySalaryRange(@Param("min") double min, @Param("max") double max);\n\n    @Modifying\n    @Query("UPDATE Employee e SET e.salary = e.salary * :multiplier WHERE e.department = :dept")\n    int raiseSalaryByDept(@Param("dept") String dept, @Param("multiplier") double multiplier);\n}`,
    explanation: '@Query with JPQL uses entity/field names (not table/column names). Use :paramName with @Param("paramName") for named params. GROUP BY aggregations return List<Object[]> — each Object[] is one row. nativeQuery = true uses actual SQL (table/column names). @Modifying is required for UPDATE/DELETE queries — returns int (rows affected). Always add @Transactional to the service method that calls @Modifying queries.'
  },

  {
    id: 'db-007', worldId: 'database-division', order: 7,
    title: 'Pagination & Sorting with Pageable',
    difficulty: 'medium', xpReward: 260, coinReward: 55, estimatedTime: 14,
    story: 'Your product listing returns 50,000 products in one query — it crashes the browser and hammers the database. Pagination fetches one page at a time: /products?page=0&size=20&sort=price,desc. Spring Data handles this with Pageable — no manual LIMIT/OFFSET SQL needed.',
    objective: 'Implement pagination in a repository and service. Return Page<T> with metadata. Accept Pageable from controller query params.',
    starterCode: `import org.springframework.data.domain.*;\nimport org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.stereotype.Service;\nimport java.util.*;\n\nrecord Product(Long id, String name, String category, double price) {}\nrecord ProductDTO(Long id, String name, double price) {}\n\npublic interface ProductRepository extends JpaRepository<Product, Long> {\n    // JpaRepository already has:\n    // Page<Product> findAll(Pageable pageable)\n\n    // TODO: Add paginated version of findByCategory\n    // Method: findByCategory(String category, Pageable pageable) -> Page<Product>\n\n    // TODO: Add paginated search by name containing keyword\n    // Method: findByNameContainingIgnoreCase(String keyword, Pageable pageable) -> Page<Product>\n}\n\n// TODO: @Service class ProductService\n// Inject ProductRepository via constructor\n//\n// Method: getProducts(int page, int size, String sortBy, String direction)\n//   - Create Pageable using PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sortBy))\n//   - Call repository.findAll(pageable)\n//   - Map Page<Product> to Page<ProductDTO> (hide nothing, just transform)\n//   - Return Page<ProductDTO>\n//\n// Method: getByCategory(String category, int page, int size)\n//   - PageRequest.of(page, size)\n//   - repository.findByCategory(category, pageable)\n//   - Return Page<Product>\n//\n// Method: printPageInfo(Page<?> page)\n//   - Print: "Page X of Y | Total: Z items | Has next: T"\n\nclass Main {\n    public static void main(String[] args) {\n        // Demonstrating PageRequest creation\n        Pageable page0 = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "price"));\n        Pageable page1 = PageRequest.of(1, 10, Sort.by("name"));\n        System.out.println("Page 0, size 10, sort by price DESC: " + page0);\n        System.out.println("Page 1, size 10, sort by name ASC: " + page1);\n        System.out.println("\\nPage<T> response includes: content, totalElements, totalPages, number, size, hasNext, hasPrevious");\n    }\n}`,
    requirements: {
      annotations: ['Service'],
      patterns: [
        { name: 'findByCategory with Pageable', pattern: 'findByCategory\\s*\\(\\s*String.*Pageable', required: true },
        { name: 'ProductService class', pattern: 'class\\s+ProductService', required: true },
        { name: 'PageRequest.of', pattern: 'PageRequest\\.of\\s*\\(', required: true },
        { name: 'Sort.by usage', pattern: 'Sort\\.by\\s*\\(', required: true },
        { name: 'Page<ProductDTO>', pattern: 'Page<ProductDTO>', required: true },
        { name: '.map() to transform pages', pattern: 'page\\.map|pageable\\.map|\\.map\\s*\\(.*DTO|Page.*map', required: true }
      ]
    },
    tests: [
      { name: 'findByCategory with Pageable added', visible: true,
        validate: (code) => ({
          passed: /findByCategory\s*\(\s*String\s+\w+\s*,\s*Pageable/.test(code),
          message: 'Page<Product> findByCategory(String category, Pageable pageable)'
        })
      },
      { name: 'ProductService uses PageRequest.of', visible: true,
        validate: (code) => ({
          passed: /PageRequest\.of\s*\(/.test(code),
          message: 'Use PageRequest.of(page, size, Sort.by(...)) to create Pageable'
        })
      },
      { name: 'Page mapped to DTO', visible: true,
        validate: (code) => ({
          passed: /Page<ProductDTO>/.test(code) && /\.map\s*\(/.test(code),
          message: 'Use page.map(p -> new ProductDTO(...)) to transform Page<Product> to Page<ProductDTO>'
        })
      },
      { name: 'printPageInfo shows metadata', visible: true,
        validate: (code) => ({
          passed: /printPageInfo/.test(code) && /(getTotalPages|getTotalElements|hasNext)/.test(code),
          message: 'printPageInfo() should show page number, total pages, total items'
        })
      }
    ],
    hiddenTests: [
      { name: 'Sort direction handled', visible: false,
        validate: (code) => ({ passed: /Sort\.Direction\.fromString|Sort\.Direction\.DESC|Sort\.Direction\.ASC/.test(code), message: 'Use Sort.Direction.fromString() or Sort.Direction.ASC/DESC' })
      }
    ],
    hints: [
      'Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sortBy));',
      'Page<ProductDTO> result = repository.findAll(pageable).map(p -> new ProductDTO(p.id(), p.name(), p.price()));',
      'page.getTotalElements() — total records; page.getTotalPages() — number of pages; page.hasNext() — more pages?'
    ],
    solution: `import org.springframework.data.domain.*;\nimport org.springframework.data.jpa.repository.JpaRepository;\nimport org.springframework.stereotype.Service;\nimport java.util.*;\n\nrecord Product(Long id, String name, String category, double price) {}\nrecord ProductDTO(Long id, String name, double price) {}\n\npublic interface ProductRepository extends JpaRepository<Product, Long> {\n    Page<Product> findByCategory(String category, Pageable pageable);\n    Page<Product> findByNameContainingIgnoreCase(String keyword, Pageable pageable);\n}\n\n@Service\nclass ProductService {\n    private final ProductRepository repository;\n    public ProductService(ProductRepository repository) { this.repository = repository; }\n\n    public Page<ProductDTO> getProducts(int page, int size, String sortBy, String direction) {\n        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);\n        Pageable pageable = PageRequest.of(page, size, sort);\n        return repository.findAll(pageable)\n            .map(p -> new ProductDTO(p.id(), p.name(), p.price()));\n    }\n\n    public Page<Product> getByCategory(String category, int page, int size) {\n        Pageable pageable = PageRequest.of(page, size);\n        return repository.findByCategory(category, pageable);\n    }\n\n    public void printPageInfo(Page<?> page) {\n        System.out.println("Page " + (page.getNumber() + 1) + " of " + page.getTotalPages()\n            + " | Total: " + page.getTotalElements() + " items\"\n            + " | Has next: " + page.hasNext());\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        Pageable page0 = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "price"));\n        Pageable page1 = PageRequest.of(1, 10, Sort.by("name"));\n        System.out.println("Page 0, size 10, sort by price DESC: " + page0);\n        System.out.println("Page 1, size 10, sort by name ASC: " + page1);\n        System.out.println("Page<T> response includes: content, totalElements, totalPages, number, size, hasNext, hasPrevious");\n    }\n}`,
    explanation: 'Pageable encapsulates page number (0-indexed), page size, and sorting. PageRequest.of(page, size, sort) creates one. findAll(pageable) generates: SELECT ... LIMIT size OFFSET page*size ORDER BY ..., plus a COUNT query for totalElements. Page<T>.map() transforms the content while preserving page metadata. In controllers: Spring auto-creates Pageable from ?page=0&size=20&sort=price,desc query params — zero code needed in the controller.'
  },

  {
    id: 'db-008', worldId: 'database-division', order: 8,
    title: 'Spring Data Projections — Fetch Only What You Need',
    difficulty: 'hard', xpReward: 290, coinReward: 60, estimatedTime: 16,
    story: 'Loading a full 20-field Product entity just to show a 3-column list is wasteful. Projections tell JPA to SELECT only the columns you need. Fewer columns = smaller result set = faster query. Interface projections require zero mapping code.',
    objective: 'Define interface-based projections and record-based DTO projections. Use @Query to return projections directly from the database.',
    starterCode: `import org.springframework.data.jpa.repository.*;\nimport org.springframework.data.repository.query.Param;\nimport java.util.*;\n\n// Assume full Product entity with many fields\nclass Product {\n    Long id; String name; String description; String category;\n    double price; double costPrice; int stockQuantity;\n    String supplier; boolean active; java.time.LocalDateTime createdAt;\n    // ... imagine 10 more fields\n    public Product() {}\n    public Product(Long id, String name, String category, double price) {\n        this.id=id; this.name=name; this.category=category; this.price=price; this.active=true;\n    }\n}\n\n// TODO: Interface projection ProductSummary\n// Spring generates a proxy that only SELECTs these columns\n// Methods: Long getId(), String getName(), double getPrice()\n\n// TODO: Interface projection CategoryStats\n// Methods: String getCategory(), long getCount(), double getAvgPrice()\n\n// TODO: record ProductListItem(Long id, String name, String category, double price)\n// Used as a DTO projection in @Query\n\npublic interface ProductRepository extends JpaRepository<Product, Long> {\n\n    // TODO: Return List<ProductSummary> — Spring auto-generates the projection\n    // Method: findAllProjectedBy() -> List<ProductSummary>\n    // No @Query needed — Spring knows to use the interface projection\n\n    // TODO: @Query returning category stats using record DTO projection\n    // JPQL: SELECT new ProductListItem(p.id, p.name, p.category, p.price) FROM Product p WHERE p.active = true\n    // Method: findActiveProductItems() -> List<ProductListItem>\n\n    // TODO: @Query returning CategoryStats projection\n    // JPQL: SELECT p.category as category, COUNT(p) as count, AVG(p.price) as avgPrice FROM Product p GROUP BY p.category\n    // Method: findCategoryStats() -> List<CategoryStats>\n}\n\nclass Main {\n    public static void main(String[] args) {\n        System.out.println("Projection types:");\n        System.out.println("1. Interface projection: Spring generates proxy — SELECT id, name, price FROM products");\n        System.out.println("2. DTO/record projection: SELECT new ProductListItem(p.id, p.name, ...) FROM Product p");\n        System.out.println("3. Category stats: SELECT p.category, COUNT(p), AVG(p.price) FROM Product p GROUP BY p.category");\n    }\n}`,
    requirements: {
      patterns: [
        { name: 'ProductSummary interface projection', pattern: 'interface\\s+ProductSummary', required: true },
        { name: 'CategoryStats interface', pattern: 'interface\\s+CategoryStats', required: true },
        { name: 'ProductListItem record', pattern: 'record\\s+ProductListItem\\s*\\(', required: true },
        { name: 'findAllProjectedBy', pattern: 'findAllProjectedBy|List<ProductSummary>', required: true },
        { name: 'SELECT new for DTO projection', pattern: 'SELECT\\s+new\\s+ProductListItem', required: true },
        { name: 'GROUP BY for category stats', pattern: 'GROUP\\s+BY.*category', required: true }
      ]
    },
    tests: [
      { name: 'Interface projection ProductSummary defined', visible: true,
        validate: (code) => {
          const hasInterface = /interface\s+ProductSummary/.test(code);
          const hasGetters = /Long\s+getId\s*\(\s*\)|String\s+getName\s*\(\s*\)|double\s+getPrice\s*\(\s*\)/.test(code);
          return { passed: hasInterface && hasGetters, message: 'interface ProductSummary { Long getId(); String getName(); double getPrice(); }' };
        }
      },
      { name: 'Record DTO projection defined', visible: true,
        validate: (code) => ({
          passed: /record\s+ProductListItem\s*\(/.test(code),
          message: 'Define record ProductListItem(Long id, String name, String category, double price)'
        })
      },
      { name: 'findAllProjectedBy returns List<ProductSummary>', visible: true,
        validate: (code) => ({
          passed: /List<ProductSummary>/.test(code) && /findAllProjectedBy/.test(code),
          message: 'List<ProductSummary> findAllProjectedBy(); — Spring only SELECTs projected columns'
        })
      },
      { name: '@Query with SELECT new for DTO', visible: true,
        validate: (code) => ({
          passed: /SELECT\s+new\s+ProductListItem/.test(code),
          message: '@Query("SELECT new ProductListItem(p.id, p.name, p.category, p.price) FROM Product p WHERE p.active = true")'
        })
      }
    ],
    hiddenTests: [
      { name: 'CategoryStats has correct methods', visible: false,
        validate: (code) => ({
          passed: /interface\s+CategoryStats/.test(code) && /getCategory|getCount|getAvgPrice/.test(code),
          message: 'CategoryStats interface needs getCategory(), getCount(), getAvgPrice() methods'
        })
      }
    ],
    hints: [
      'interface ProductSummary { Long getId(); String getName(); double getPrice(); } — no implementation needed, Spring generates a proxy',
      '@Query("SELECT new ProductListItem(p.id, p.name, p.category, p.price) FROM Product p WHERE p.active = true") List<ProductListItem> findActiveProductItems();',
      '@Query("SELECT p.category as category, COUNT(p) as count, AVG(p.price) as avgPrice FROM Product p GROUP BY p.category") List<CategoryStats> findCategoryStats();'
    ],
    solution: `import org.springframework.data.jpa.repository.*;\nimport org.springframework.data.repository.query.Param;\nimport java.util.*;\n\ninterface ProductSummary {\n    Long getId();\n    String getName();\n    double getPrice();\n}\n\ninterface CategoryStats {\n    String getCategory();\n    long getCount();\n    double getAvgPrice();\n}\n\nrecord ProductListItem(Long id, String name, String category, double price) {}\n\npublic interface ProductRepository extends JpaRepository<Product, Long> {\n\n    List<ProductSummary> findAllProjectedBy();\n\n    @Query("SELECT new ProductListItem(p.id, p.name, p.category, p.price) FROM Product p WHERE p.active = true")\n    List<ProductListItem> findActiveProductItems();\n\n    @Query("SELECT p.category as category, COUNT(p) as count, AVG(p.price) as avgPrice FROM Product p GROUP BY p.category")\n    List<CategoryStats> findCategoryStats();\n}\n\nclass Main {\n    public static void main(String[] args) {\n        System.out.println("Projection types:");\n        System.out.println("1. Interface: Spring generates proxy — only selected columns loaded");\n        System.out.println("2. Record DTO: SELECT new ... FROM ... — maps directly to record");\n        System.out.println("3. Category stats with GROUP BY — returns aggregated data");\n    }\n}`,
    explanation: 'Interface projections: define an interface with getter methods; Spring generates a proxy and adds SELECT only for those columns. Closed projections (all fields from one entity) are most efficient. Open projections use @Value("#{target.field}") for computed values. Record/DTO projections: use SELECT new FullyQualifiedClass(...) in JPQL. Both significantly reduce data transfer from database to application. Use projections on list endpoints where you don\'t need all entity fields.'
  },

  {
    id: 'db-009', worldId: 'database-division', order: 9,
    title: '🏆 Boss: Complete E-Commerce Schema',
    difficulty: 'boss', xpReward: 550, coinReward: 160, estimatedTime: 35,
    story: '⚔️ BOSS CHALLENGE! Design the complete data layer for SpringCorp\'s e-commerce platform. This is what a senior backend developer does on their first week at a new company: entity design, relationships, custom queries, transactions, and pagination — all connected.',
    objective: 'Build: User @Entity, Product @Entity, Order @Entity with OrderItem. Map OneToMany relationships. Add repositories with custom @Query, projections, and paginated queries. Create a transactional OrderService.',
    starterCode: `import jakarta.persistence.*;\nimport org.springframework.data.domain.*;\nimport org.springframework.data.jpa.repository.*;\nimport org.springframework.data.repository.query.Param;\nimport org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\nimport java.time.LocalDateTime;\nimport java.util.*;\n\n// 1. TODO: @Entity User\n//    Fields: Long id, String username, String email, boolean active, LocalDateTime createdAt\n//    @OneToMany(mappedBy="user", cascade=ALL, fetch=LAZY) List<Order> orders\n\n// 2. TODO: @Entity Product\n//    Fields: Long id, String name, String category, double price, int stock, boolean available\n\n// 3. TODO: @Entity Order\n//    Fields: Long id, @ManyToOne User user, @JoinColumn(name="user_id")\n//           LocalDateTime placedAt, double totalAmount, String status\n//    @OneToMany(mappedBy="order", cascade=ALL) List<OrderItem> items\n\n// 4. TODO: @Entity OrderItem\n//    Fields: Long id, @ManyToOne Order order @JoinColumn, @ManyToOne Product product @JoinColumn\n//           int quantity, double unitPrice\n\n// 5. TODO: UserRepository extends JpaRepository<User, Long>\n//    findByEmail(String email) -> Optional<User>\n//    findByActiveTrue(Pageable pageable) -> Page<User>\n\n// 6. TODO: ProductRepository extends JpaRepository<Product, Long>\n//    findByCategoryAndAvailableTrue(String cat, Pageable p) -> Page<Product>\n//    @Query find top 5 products by category sorted by price asc\n\n// 7. TODO: OrderRepository extends JpaRepository<Order, Long>\n//    findByUser(User user, Pageable p) -> Page<Order>\n//    @Query: SELECT o FROM Order o WHERE o.user.id = :userId AND o.placedAt >= :since\n\n// 8. TODO: @Service OrderService\n//    Inject all 3 repositories via constructor\n//    @Transactional placeOrder(Long userId, List<Long> productIds, List<Integer> quantities)\n//      - Load user (orElseThrow)\n//      - Create Order with status "PENDING", placedAt = now\n//      - For each product: reduce stock, create OrderItem, add to order\n//      - Calculate totalAmount\n//      - Save order (cascades to items)\n//      - Return saved order\n\nclass Main {\n    public static void main(String[] args) {\n        System.out.println("Schema designed:");\n        System.out.println("users (1) ----< orders (N)");\n        System.out.println("orders (1) ----< order_items (N)");\n        System.out.println("products (1) ----< order_items (N)");\n    }\n}`,
    requirements: {
      annotations: ['Entity', 'Table', 'Id', 'GeneratedValue', 'OneToMany', 'ManyToOne', 'JoinColumn', 'Transactional', 'Service'],
      patterns: [
        { name: 'User @Entity', pattern: '@Entity[\\s\\S]{0,50}class\\s+User|class\\s+User', required: true },
        { name: 'Product @Entity', pattern: '@Entity[\\s\\S]{0,50}class\\s+Product|class\\s+Product', required: true },
        { name: 'Order @Entity', pattern: '@Entity[\\s\\S]{0,50}class\\s+Order|class\\s+Order', required: true },
        { name: 'OrderItem @Entity', pattern: 'class\\s+OrderItem', required: true },
        { name: 'OrderService', pattern: 'class\\s+OrderService', required: true },
        { name: 'placeOrder @Transactional', pattern: '@Transactional[\\s\\S]{0,100}placeOrder|placeOrder[\\s\\S]{0,20}@Transactional', required: true }
      ]
    },
    tests: [
      { name: 'All 4 entities defined', visible: true,
        validate: (code) => {
          const entities = ['User', 'Product', 'Order', 'OrderItem']
            .filter(e => code.includes('class ' + e)).length;
          return { passed: entities === 4, actual: `${entities}/4 entities`, message: 'Define @Entity classes: User, Product, Order, OrderItem' };
        }
      },
      { name: 'Relationships correctly mapped', visible: true,
        validate: (code) => {
          const oneToMany = (code.match(/@OneToMany/g) || []).length;
          const manyToOne = (code.match(/@ManyToOne/g) || []).length;
          const joinCol = (code.match(/@JoinColumn/g) || []).length;
          return { passed: oneToMany >= 2 && manyToOne >= 2 && joinCol >= 2, actual: `@OneToMany:${oneToMany} @ManyToOne:${manyToOne} @JoinColumn:${joinCol}`, message: 'Map 2+ @OneToMany and 2+ @ManyToOne relationships' };
        }
      },
      { name: '@Transactional placeOrder exists', visible: true,
        validate: (code) => ({
          passed: /@Transactional/.test(code) && /placeOrder\s*\(/.test(code),
          message: '@Transactional placeOrder() method in OrderService'
        })
      },
      { name: 'Repositories extend JpaRepository', visible: true,
        validate: (code) => {
          const repos = (code.match(/extends\s+JpaRepository/g) || []).length;
          return { passed: repos >= 2, actual: `${repos} repositories`, message: 'At least 2 repositories extending JpaRepository' };
        }
      }
    ],
    hiddenTests: [
      { name: 'Stock reduced in placeOrder', visible: false,
        validate: (code) => ({
          passed: /stock|getStock|setStock/.test(code) && /placeOrder/.test(code),
          message: 'placeOrder() should reduce product stock for each ordered item'
        })
      }
    ],
    hints: [
      'Start with entities (User, Product, Order, OrderItem), then repositories, then OrderService.',
      'OrderItem has two @ManyToOne: one to Order, one to Product. Both need @JoinColumn.',
      'placeOrder: Order order = new Order(); order.setUser(user); order.setPlacedAt(LocalDateTime.now()); order.setStatus("PENDING"); then loop productIds adding OrderItems, then orderRepo.save(order).'
    ],
    solution: `import jakarta.persistence.*;\nimport org.springframework.data.domain.*;\nimport org.springframework.data.jpa.repository.*;\nimport org.springframework.data.repository.query.Param;\nimport org.springframework.stereotype.Service;\nimport org.springframework.transaction.annotation.Transactional;\nimport java.time.LocalDateTime;\nimport java.util.*;\n\n@Entity\n@jakarta.persistence.Table(name = "users")\nclass User {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;\n    private String username; private String email; private boolean active;\n    private LocalDateTime createdAt;\n    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)\n    private List<Order> orders = new ArrayList<>();\n    public User() {}\n    public User(String username, String email) { this.username=username; this.email=email; this.active=true; this.createdAt=LocalDateTime.now(); }\n    public Long getId() { return id; } public String getUsername() { return username; }\n    public String getEmail() { return email; } public boolean isActive() { return active; }\n    public List<Order> getOrders() { return orders; }\n    public void setId(Long id) { this.id = id; }\n}\n\n@Entity\nclass Product {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;\n    private String name; private String category; private double price; private int stock; private boolean available;\n    public Product() {}\n    public Product(String name, String category, double price, int stock) { this.name=name; this.category=category; this.price=price; this.stock=stock; this.available=true; }\n    public Long getId() { return id; } public String getName() { return name; }\n    public String getCategory() { return category; } public double getPrice() { return price; }\n    public int getStock() { return stock; } public boolean isAvailable() { return available; }\n    public void setId(Long id) { this.id = id; }\n    public void setStock(int stock) { this.stock = stock; }\n}\n\n@Entity\n@jakarta.persistence.Table(name = "orders")\nclass Order {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;\n    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id") private User user;\n    private LocalDateTime placedAt; private double totalAmount; private String status;\n    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL) private List<OrderItem> items = new ArrayList<>();\n    public Order() {}\n    public Long getId() { return id; } public User getUser() { return user; }\n    public void setUser(User user) { this.user = user; }\n    public LocalDateTime getPlacedAt() { return placedAt; } public void setPlacedAt(LocalDateTime t) { this.placedAt = t; }\n    public double getTotalAmount() { return totalAmount; } public void setTotalAmount(double t) { this.totalAmount = t; }\n    public String getStatus() { return status; } public void setStatus(String s) { this.status = s; }\n    public List<OrderItem> getItems() { return items; }\n    public void addItem(OrderItem item) { item.setOrder(this); items.add(item); }\n    public void setId(Long id) { this.id = id; }\n}\n\n@Entity\nclass OrderItem {\n    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;\n    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "order_id") private Order order;\n    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "product_id") private Product product;\n    private int quantity; private double unitPrice;\n    public OrderItem() {}\n    public OrderItem(Product product, int quantity) { this.product=product; this.quantity=quantity; this.unitPrice=product.getPrice(); }\n    public void setOrder(Order order) { this.order = order; }\n    public Product getProduct() { return product; } public int getQuantity() { return quantity; } public double getUnitPrice() { return unitPrice; }\n}\n\npublic interface UserRepository extends JpaRepository<User, Long> {\n    Optional<User> findByEmail(String email);\n    Page<User> findByActiveTrue(Pageable pageable);\n}\n\npublic interface ProductRepository extends JpaRepository<Product, Long> {\n    Page<Product> findByCategoryAndAvailableTrue(String category, Pageable pageable);\n    @Query("SELECT p FROM Product p WHERE p.category = :cat AND p.available = true ORDER BY p.price ASC") // limit in service\n    List<Product> findTop5ByCategoryOrderByPriceAsc(@Param("cat") String category);\n}\n\npublic interface OrderRepository extends JpaRepository<Order, Long> {\n    Page<Order> findByUser(User user, Pageable pageable);\n    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND o.placedAt >= :since")\n    List<Order> findRecentOrders(@Param("userId") Long userId, @Param("since") LocalDateTime since);\n}\n\n@Service\nclass OrderService {\n    private final UserRepository userRepo;\n    private final ProductRepository productRepo;\n    private final OrderRepository orderRepo;\n\n    public OrderService(UserRepository userRepo, ProductRepository productRepo, OrderRepository orderRepo) {\n        this.userRepo = userRepo; this.productRepo = productRepo; this.orderRepo = orderRepo;\n    }\n\n    @Transactional\n    public Order placeOrder(Long userId, List<Long> productIds, List<Integer> quantities) {\n        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found: " + userId));\n        Order order = new Order();\n        order.setUser(user);\n        order.setPlacedAt(LocalDateTime.now());\n        order.setStatus("PENDING");\n        double total = 0;\n        for (int i = 0; i < productIds.size(); i++) {\n            Product product = productRepo.findById(productIds.get(i)).orElseThrow(() -> new RuntimeException("Product not found"));\n            int qty = quantities.get(i);\n            if (product.getStock() < qty) throw new IllegalStateException("Insufficient stock for: " + product.getName());\n            product.setStock(product.getStock() - qty);\n            productRepo.save(product);\n            OrderItem item = new OrderItem(product, qty);\n            order.addItem(item);\n            total += item.getUnitPrice() * qty;\n        }\n        order.setTotalAmount(total);\n        return orderRepo.save(order);\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        System.out.println("Schema: users (1)----< orders (N)----< order_items (N)---->(1) products");\n        User u = new User("saket", "saket@corp.com");\n        u.setId(1L);\n        Product p = new Product("MacBook", "Electronics", 1299.99, 10);\n        p.setId(1L);\n        Order o = new Order(); o.setUser(u); o.setStatus("PENDING"); o.setPlacedAt(LocalDateTime.now());\n        o.setId(1L); o.setTotalAmount(1299.99);\n        OrderItem item = new OrderItem(p, 1); item.setOrder(o);\n        System.out.println("Order placed for: " + u.getUsername() + " | Product: " + p.getName() + " | Total: $" + o.getTotalAmount());\n    }\n}`,
    explanation: 'You designed a complete e-commerce data layer: 4 entities, 3 repositories, 1 transactional service. Every table has proper primary keys, foreign keys, and lazy loading to prevent N+1. CascadeType.ALL on OneToMany means saving a User saves their Orders; deleting an Order deletes its items. The @Transactional placeOrder method ensures stock reduction and order creation are atomic — both succeed or both fail. This is the exact schema pattern used by every Spring Boot e-commerce service.'
  }
];
