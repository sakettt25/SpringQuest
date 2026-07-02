export const REACTIVE_LAB_MISSIONS = [
  { id:'rl-001', worldId:'reactive-lab', order:1, title:'Understanding Mono', difficulty:'easy', xpReward:200, coinReward:40, estimatedTime:10,
    story:'Welcome to the Reactive Lab! Before building reactive APIs, you must understand the fundamental building block: Mono — a publisher that emits 0 or 1 item.',
    objective:'Create a Mono that emits a single String value "Hello Reactive!" using Mono.just(). Then create an empty Mono using Mono.empty(). Subscribe to both and print the results.',
    starterCode:'import reactor.core.publisher.Mono;\n\npublic class MonoBasics {\n    public static void main(String[] args) {\n        // TODO: Create a Mono that emits "Hello Reactive!"\n        // Mono<String> greeting = ??\n\n        // TODO: Subscribe and print the value\n\n        // TODO: Create an empty Mono\n        // Mono<String> empty = ??\n\n        // TODO: Subscribe with onNext, onError, onComplete\n    }\n}',
    requirements:{ patterns:[
      { name:'Mono.just()', pattern:'Mono\\.just\\s*\\(', required:true },
      { name:'Mono.empty()', pattern:'Mono\\.empty\\s*\\(', required:true },
      { name:'.subscribe()', pattern:'\\.subscribe\\s*\\(', required:true }
    ]},
    tests:[
      { name:'Uses Mono.just with value', visible:true, validate:(c)=>({ passed:/Mono\.just\s*\(\s*"Hello Reactive!"/.test(c), message:'Use Mono.just("Hello Reactive!")' }) },
      { name:'Subscribes to both Monos', visible:true, validate:(c)=>({ passed:(c.match(/\.subscribe\s*\(/g)||[]).length>=2, message:'Subscribe to both Monos' }) }
    ], hiddenTests:[],
    hints:['Mono.just("value") creates a Mono that emits one item.','Mono.empty() creates a Mono that completes without emitting.','Subscribe with: mono.subscribe(value -> System.out.println(value));'],
    solution:'import reactor.core.publisher.Mono;\n\npublic class MonoBasics {\n    public static void main(String[] args) {\n        Mono<String> greeting = Mono.just("Hello Reactive!");\n        greeting.subscribe(\n            value -> System.out.println("Value: " + value),\n            error -> System.err.println("Error: " + error),\n            () -> System.out.println("Completed!")\n        );\n\n        Mono<String> empty = Mono.empty();\n        empty.subscribe(\n            value -> System.out.println("Value: " + value),\n            error -> System.err.println("Error: " + error),\n            () -> System.out.println("Empty completed!")\n        );\n    }\n}',
    explanation:'Mono<T> is a reactive publisher that emits 0 or 1 item. Mono.just() wraps an existing value. Mono.empty() signals completion without data. Nothing happens until you subscribe — this is the lazy nature of reactive streams. The subscribe method takes 3 callbacks: onNext, onError, onComplete.'
  },
  { id:'rl-002', worldId:'reactive-lab', order:2, title:'Understanding Flux', difficulty:'easy', xpReward:200, coinReward:40, estimatedTime:10,
    story:'Now meet Flux — a publisher that can emit 0 to N items. Think of it as a reactive List or Stream.',
    objective:'Create a Flux from a list of server names. Use Flux.just(), Flux.fromIterable(), and Flux.range(). Subscribe and print each item.',
    starterCode:'import reactor.core.publisher.Flux;\nimport java.util.Arrays;\nimport java.util.List;\n\npublic class FluxBasics {\n    public static void main(String[] args) {\n        // TODO: Create Flux using Flux.just()\n        // TODO: Create Flux using Flux.fromIterable()\n        // TODO: Create Flux using Flux.range(1, 5)\n        // Subscribe to each and print\n    }\n}',
    requirements:{ patterns:[
      { name:'Flux.just()', pattern:'Flux\\.just\\s*\\(', required:true },
      { name:'Flux.fromIterable()', pattern:'Flux\\.fromIterable\\s*\\(', required:true },
      { name:'Flux.range()', pattern:'Flux\\.range\\s*\\(', required:true }
    ]},
    tests:[
      { name:'All 3 Flux creation methods used', visible:true, validate:(c)=>{ const a=/Flux\.just/.test(c),b=/Flux\.fromIterable/.test(c),d=/Flux\.range/.test(c); return { passed:a&&b&&d, message:`just:${a} fromIterable:${b} range:${d}` }; } }
    ], hiddenTests:[],
    hints:['Flux.just("a","b","c") creates a Flux from individual items.','Flux.fromIterable(list) creates a Flux from any Iterable.','Flux.range(1,5) emits integers 1,2,3,4,5.'],
    solution:'import reactor.core.publisher.Flux;\nimport java.util.Arrays;\n\npublic class FluxBasics {\n    public static void main(String[] args) {\n        Flux.just("server-1","server-2","server-3")\n            .subscribe(s -> System.out.println("Just: " + s));\n\n        Flux.fromIterable(Arrays.asList("alpha","beta","gamma"))\n            .subscribe(s -> System.out.println("Iterable: " + s));\n\n        Flux.range(1, 5)\n            .subscribe(i -> System.out.println("Range: " + i));\n    }\n}',
    explanation:'Flux<T> emits 0..N items. Three common creation methods: just() for known values, fromIterable() for collections, range() for integer sequences. Like Mono, Flux is lazy — nothing happens without subscribe().'
  },
  { id:'rl-003', worldId:'reactive-lab', order:3, title:'map & filter Operators', difficulty:'easy', xpReward:220, coinReward:45, estimatedTime:12,
    story:'Operators transform data flowing through a reactive pipeline — just like Stream operations but non-blocking.',
    objective:'Use map() to transform strings to uppercase, and filter() to keep only strings longer than 4 characters.',
    starterCode:'import reactor.core.publisher.Flux;\n\npublic class MapFilter {\n    public static void main(String[] args) {\n        Flux<String> names = Flux.just("java","go","spring","rx","kotlin","c");\n        // TODO: .filter() to keep names longer than 2 chars\n        // TODO: .map() to convert to uppercase\n        // TODO: .subscribe() to print\n    }\n}',
    requirements:{ patterns:[{ name:'map()', pattern:'\\.map\\s*\\(', required:true },{ name:'filter()', pattern:'\\.filter\\s*\\(', required:true }]},
    tests:[
      { name:'Uses map and filter in pipeline', visible:true, validate:(c)=>({ passed:/\.filter\s*\(/.test(c)&&/\.map\s*\(/.test(c)&&/\.subscribe/.test(c), message:'Chain filter().map().subscribe()' }) }
    ], hiddenTests:[],
    hints:['filter(s -> s.length() > 2) keeps only matching items.','map(s -> s.toUpperCase()) transforms each item.','Chain them: flux.filter(...).map(...).subscribe(...)'],
    solution:'import reactor.core.publisher.Flux;\n\npublic class MapFilter {\n    public static void main(String[] args) {\n        Flux.just("java","go","spring","rx","kotlin","c")\n            .filter(s -> s.length() > 2)\n            .map(String::toUpperCase)\n            .subscribe(s -> System.out.println(s));\n    }\n}',
    explanation:'map() transforms each element 1-to-1. filter() passes only elements matching a predicate. These are the bread-and-butter of reactive pipelines. They execute lazily and non-blocking.'
  },
  { id:'rl-004', worldId:'reactive-lab', order:4, title:'flatMap vs map', difficulty:'medium', xpReward:250, coinReward:50, estimatedTime:15,
    story:'This is where reactive gets interesting. flatMap is the most important operator — it transforms each item into another Publisher and flattens the results.',
    objective:'Use flatMap to simulate an async database lookup: for each userId, return a Mono<String> of the username. Compare with map() to understand the difference.',
    starterCode:'import reactor.core.publisher.Flux;\nimport reactor.core.publisher.Mono;\n\npublic class FlatMapDemo {\n    // Simulates async DB lookup\n    static Mono<String> findUserById(int id) {\n        return Mono.just("User_" + id);\n    }\n\n    public static void main(String[] args) {\n        Flux<Integer> userIds = Flux.just(1, 2, 3, 4, 5);\n\n        // TODO: Use flatMap to call findUserById for each id\n        // TODO: Subscribe and print results\n    }\n}',
    requirements:{ patterns:[{ name:'flatMap()', pattern:'\\.flatMap\\s*\\(', required:true },{ name:'findUserById', pattern:'findUserById', required:true }]},
    tests:[
      { name:'Uses flatMap with findUserById', visible:true, validate:(c)=>({ passed:/\.flatMap\s*\(.*findUserById/.test(c)||/\.flatMap\s*\(\s*\w+\s*->\s*findUserById/.test(c), message:'Use .flatMap(id -> findUserById(id))' }) }
    ], hiddenTests:[],
    hints:['map() would give you Flux<Mono<String>> — nested publishers!','flatMap() unwraps the inner publisher: Flux<String>.','userIds.flatMap(id -> findUserById(id))'],
    solution:'import reactor.core.publisher.Flux;\nimport reactor.core.publisher.Mono;\n\npublic class FlatMapDemo {\n    static Mono<String> findUserById(int id) {\n        return Mono.just("User_" + id);\n    }\n\n    public static void main(String[] args) {\n        Flux.just(1, 2, 3, 4, 5)\n            .flatMap(id -> findUserById(id))\n            .subscribe(name -> System.out.println("Found: " + name));\n    }\n}',
    explanation:'flatMap is THE most important reactive operator. map(f) transforms A->B. flatMap(f) transforms A->Publisher<B> and flattens. Use flatMap whenever the transformation returns a Mono or Flux (e.g., DB calls, HTTP calls). flatMap executes concurrently by default — order is NOT guaranteed. Use concatMap for ordered execution.'
  },
  { id:'rl-005', worldId:'reactive-lab', order:5, title:'Error Handling', difficulty:'medium', xpReward:250, coinReward:50, estimatedTime:15,
    story:'Production systems fail. A reactive engineer must handle errors gracefully without breaking the pipeline.',
    objective:'Use onErrorReturn() for fallback values and onErrorResume() for fallback publishers. Handle a simulated database error.',
    starterCode:'import reactor.core.publisher.Mono;\nimport reactor.core.publisher.Flux;\n\npublic class ErrorHandling {\n    static Mono<String> riskyCall(int id) {\n        if (id == 3) return Mono.error(new RuntimeException("DB down!"));\n        return Mono.just("Data_" + id);\n    }\n\n    public static void main(String[] args) {\n        // TODO: Use onErrorReturn for a fallback value\n        // TODO: Use onErrorResume for a fallback publisher\n    }\n}',
    requirements:{ patterns:[{ name:'onErrorReturn', pattern:'\\.onErrorReturn\\s*\\(', required:true },{ name:'onErrorResume', pattern:'\\.onErrorResume\\s*\\(', required:true }]},
    tests:[
      { name:'Both error handlers used', visible:true, validate:(c)=>({ passed:/\.onErrorReturn\s*\(/.test(c)&&/\.onErrorResume\s*\(/.test(c), message:'Use both onErrorReturn and onErrorResume' }) }
    ], hiddenTests:[],
    hints:['onErrorReturn("fallback") replaces the error with a static value.','onErrorResume(e -> Mono.just("recovered")) replaces with another publisher.','Try: riskyCall(3).onErrorReturn("N/A")'],
    solution:'import reactor.core.publisher.Mono;\n\npublic class ErrorHandling {\n    static Mono<String> riskyCall(int id) {\n        if (id == 3) return Mono.error(new RuntimeException("DB down!"));\n        return Mono.just("Data_" + id);\n    }\n\n    public static void main(String[] args) {\n        riskyCall(3)\n            .onErrorReturn("Fallback Value")\n            .subscribe(v -> System.out.println("onErrorReturn: " + v));\n\n        riskyCall(3)\n            .onErrorResume(e -> Mono.just("Recovered from: " + e.getMessage()))\n            .subscribe(v -> System.out.println("onErrorResume: " + v));\n    }\n}',
    explanation:'onErrorReturn provides a static fallback value. onErrorResume provides a fallback Publisher — more flexible since you can call another service, log, or return different data based on the error type. Never let errors propagate unhandled in production reactive code.'
  },
  { id:'rl-006', worldId:'reactive-lab', order:6, title:'zip & merge Operators', difficulty:'medium', xpReward:260, coinReward:55, estimatedTime:15,
    story:'Real APIs often need to combine data from multiple sources. zip waits for all, merge interleaves.',
    objective:'Use Mono.zip() to combine user profile and user orders into a single response. Use Flux.merge() to combine two event streams.',
    starterCode:'import reactor.core.publisher.Mono;\nimport reactor.core.publisher.Flux;\n\npublic class CombineOperators {\n    static Mono<String> getProfile(int id) { return Mono.just("Profile_" + id); }\n    static Mono<String> getOrders(int id) { return Mono.just("Orders_" + id); }\n\n    public static void main(String[] args) {\n        // TODO: Use Mono.zip() to combine profile and orders\n        // TODO: Use Flux.merge() to combine two Flux streams\n    }\n}',
    requirements:{ patterns:[{ name:'Mono.zip()', pattern:'Mono\\.zip\\s*\\(|\\.zipWith\\s*\\(', required:true },{ name:'Flux.merge()', pattern:'Flux\\.merge\\s*\\(|merge', required:true }]},
    tests:[
      { name:'Uses zip and merge', visible:true, validate:(c)=>({ passed:(/Mono\.zip|\.zipWith/.test(c))&&(/Flux\.merge|\.mergeWith/.test(c)), message:'Use both Mono.zip() and Flux.merge()' }) }
    ], hiddenTests:[],
    hints:['Mono.zip(mono1, mono2, (a,b) -> a + " + " + b) combines two Monos.','Flux.merge(flux1, flux2) interleaves items from both streams.','zip waits for ALL sources; merge emits as items arrive.'],
    solution:'import reactor.core.publisher.Mono;\nimport reactor.core.publisher.Flux;\n\npublic class CombineOperators {\n    static Mono<String> getProfile(int id) { return Mono.just("Profile_" + id); }\n    static Mono<String> getOrders(int id) { return Mono.just("Orders_" + id); }\n\n    public static void main(String[] args) {\n        Mono.zip(getProfile(1), getOrders(1), (p, o) -> p + " | " + o)\n            .subscribe(r -> System.out.println("Zipped: " + r));\n\n        Flux.merge(\n            Flux.just("Event_A1","Event_A2"),\n            Flux.just("Event_B1","Event_B2")\n        ).subscribe(e -> System.out.println("Merged: " + e));\n    }\n}',
    explanation:'zip() pairs items from multiple publishers 1-to-1 and waits for all. Perfect for parallel API calls. merge() interleaves items as they arrive — no pairing. Use zip when you need data from ALL sources; use merge when you want the fastest response from ANY source.'
  },
  { id:'rl-007', worldId:'reactive-lab', order:7, title:'Backpressure & Schedulers', difficulty:'hard', xpReward:300, coinReward:60, estimatedTime:18,
    story:'When a producer emits faster than a consumer can process, you need backpressure. Schedulers control which threads execute your pipeline.',
    objective:'Use .onBackpressureBuffer() and .onBackpressureDrop() strategies. Use Schedulers.boundedElastic() to move blocking work off the main thread.',
    starterCode:'import reactor.core.publisher.Flux;\nimport reactor.core.scheduler.Schedulers;\n\npublic class BackpressureDemo {\n    public static void main(String[] args) throws InterruptedException {\n        // TODO: Create a fast producer with Flux.range(1, 1000)\n        // TODO: Apply .onBackpressureBuffer(50)\n        // TODO: Use .publishOn(Schedulers.boundedElastic())\n        // TODO: Simulate slow consumer with Thread.sleep\n    }\n}',
    requirements:{ patterns:[{ name:'onBackpressure', pattern:'\\.onBackpressure\\w+\\s*\\(', required:true },{ name:'Schedulers', pattern:'Schedulers\\.', required:true },{ name:'publishOn/subscribeOn', pattern:'publishOn|subscribeOn', required:true }]},
    tests:[
      { name:'Backpressure and Schedulers used', visible:true, validate:(c)=>({ passed:/\.onBackpressure/.test(c)&&/Schedulers\./.test(c), message:'Use backpressure strategy + Schedulers' }) }
    ], hiddenTests:[],
    hints:['onBackpressureBuffer(50) buffers up to 50 items.','publishOn(Schedulers.boundedElastic()) switches downstream execution thread.','subscribeOn() affects the upstream subscription thread.'],
    solution:'import reactor.core.publisher.Flux;\nimport reactor.core.scheduler.Schedulers;\n\npublic class BackpressureDemo {\n    public static void main(String[] args) throws InterruptedException {\n        Flux.range(1, 1000)\n            .onBackpressureBuffer(50)\n            .publishOn(Schedulers.boundedElastic())\n            .subscribe(i -> {\n                System.out.println(Thread.currentThread().getName() + " -> " + i);\n                try { Thread.sleep(10); } catch (Exception e) {}\n            });\n        Thread.sleep(5000);\n    }\n}',
    explanation:'Backpressure prevents overwhelm: buffer() stores excess items, drop() discards them, latest() keeps only the most recent. Schedulers control threading: parallel() for CPU work, boundedElastic() for I/O/blocking work. publishOn switches the downstream thread; subscribeOn switches the subscription/upstream thread.'
  },
  { id:'rl-008', worldId:'reactive-lab', order:8, title:'Hot vs Cold Publishers', difficulty:'hard', xpReward:300, coinReward:60, estimatedTime:15,
    story:'Cold publishers replay data for each subscriber. Hot publishers share data among all subscribers — like a live radio broadcast.',
    objective:'Create a cold Flux and show that each subscriber gets all items. Then use .share() to create a hot publisher.',
    starterCode:'import reactor.core.publisher.Flux;\nimport java.time.Duration;\n\npublic class HotVsCold {\n    public static void main(String[] args) throws InterruptedException {\n        // TODO: Cold publisher - each subscriber gets all items\n        // TODO: Hot publisher using .share() - subscribers share the stream\n    }\n}',
    requirements:{ patterns:[{ name:'share() or publish()', pattern:'\\.share\\s*\\(|\\.publish\\s*\\(|\\.hot', required:true }]},
    tests:[
      { name:'Demonstrates hot publisher', visible:true, validate:(c)=>({ passed:/\.share\s*\(|\.publish\s*\(|Sinks/.test(c), message:'Use .share() or Sinks to create hot publisher' }) }
    ], hiddenTests:[],
    hints:['A cold Flux replays all items for every new subscriber.','flux.share() converts cold to hot — late subscribers miss earlier items.','.share() is shorthand for .publish().refCount()'],
    solution:'import reactor.core.publisher.Flux;\nimport java.time.Duration;\n\npublic class HotVsCold {\n    public static void main(String[] args) throws InterruptedException {\n        // Cold: each subscriber gets everything\n        Flux<Integer> cold = Flux.range(1, 3);\n        cold.subscribe(i -> System.out.println("Sub1: " + i));\n        cold.subscribe(i -> System.out.println("Sub2: " + i));\n\n        // Hot: shared among subscribers\n        Flux<Long> hot = Flux.interval(Duration.ofMillis(500)).share();\n        hot.subscribe(i -> System.out.println("HotSub1: " + i));\n        Thread.sleep(1200);\n        hot.subscribe(i -> System.out.println("HotSub2: " + i));\n        Thread.sleep(2000);\n    }\n}',
    explanation:'Cold publishers (default) are like Netflix — each viewer starts from the beginning. Hot publishers are like live TV — you see whatever is currently broadcasting. Use .share() for multicasting. Understanding hot vs cold is critical for event-driven architectures and SSE endpoints.'
  },
  { id:'rl-009', worldId:'reactive-lab', order:9, title:'StepVerifier Testing', difficulty:'hard', xpReward:300, coinReward:60, estimatedTime:15,
    story:'You cannot use System.out.println to test reactive code. StepVerifier lets you assert exactly what a publisher emits.',
    objective:'Use StepVerifier to test a Mono and a Flux. Verify emitted values, errors, and completion signals.',
    starterCode:'import reactor.core.publisher.Flux;\nimport reactor.core.publisher.Mono;\nimport reactor.test.StepVerifier;\n\npublic class StepVerifierDemo {\n    static Flux<String> getNames() {\n        return Flux.just("Spring","Boot","WebFlux");\n    }\n    static Mono<String> getError() {\n        return Mono.error(new RuntimeException("Oops"));\n    }\n\n    public static void main(String[] args) {\n        // TODO: Use StepVerifier to verify getNames()\n        // TODO: Use StepVerifier to verify getError()\n    }\n}',
    requirements:{ patterns:[{ name:'StepVerifier', pattern:'StepVerifier', required:true },{ name:'expectNext', pattern:'\\.expectNext\\s*\\(', required:true },{ name:'verify()', pattern:'\\.verify\\s*\\(|\\.verifyComplete\\s*\\(|\\.verifyError', required:true }]},
    tests:[
      { name:'Uses StepVerifier with assertions', visible:true, validate:(c)=>({ passed:/StepVerifier/.test(c)&&/expectNext/.test(c)&&/(verify\(|verifyComplete|verifyError)/.test(c), message:'Use StepVerifier.create().expectNext().verifyComplete()' }) }
    ], hiddenTests:[],
    hints:['StepVerifier.create(flux).expectNext("Spring").expectNext("Boot")...','End with .verifyComplete() for success or .verifyError() for errors.','StepVerifier blocks until the publisher completes — safe for testing.'],
    solution:'import reactor.core.publisher.Flux;\nimport reactor.core.publisher.Mono;\nimport reactor.test.StepVerifier;\n\npublic class StepVerifierDemo {\n    static Flux<String> getNames() { return Flux.just("Spring","Boot","WebFlux"); }\n    static Mono<String> getError() { return Mono.error(new RuntimeException("Oops")); }\n\n    public static void main(String[] args) {\n        StepVerifier.create(getNames())\n            .expectNext("Spring")\n            .expectNext("Boot")\n            .expectNext("WebFlux")\n            .verifyComplete();\n\n        StepVerifier.create(getError())\n            .verifyError(RuntimeException.class);\n\n        System.out.println("All tests passed!");\n    }\n}',
    explanation:'StepVerifier is the standard tool for testing reactive code. It subscribes to a publisher and asserts each signal: expectNext() checks values, expectError() checks errors, verifyComplete() asserts normal completion. Always use StepVerifier in tests — never subscribe() manually in production test code.'
  },
  { id:'rl-010', worldId:'reactive-lab', order:10, title:'🏆 Boss: Reactive Data Pipeline', difficulty:'boss', xpReward:500, coinReward:120, estimatedTime:25,
    story:'⚔️ BOSS CHALLENGE! Build a complete reactive pipeline that fetches users, filters active ones, enriches with order data using flatMap, handles errors, and collects results.',
    objective:'Chain: Flux of user IDs → flatMap to fetch user → filter active → flatMap to fetch orders → zip user+orders → onErrorResume → collectList → subscribe.',
    starterCode:'import reactor.core.publisher.Flux;\nimport reactor.core.publisher.Mono;\nimport java.util.List;\n\npublic class ReactivePipeline {\n    record User(int id, String name, boolean active) {}\n    record Order(int userId, String item) {}\n    record UserWithOrders(User user, List<Order> orders) {}\n\n    static Mono<User> fetchUser(int id) {\n        if (id == 4) return Mono.error(new RuntimeException("User not found"));\n        return Mono.just(new User(id, "User_" + id, id % 2 != 0));\n    }\n    static Flux<Order> fetchOrders(int userId) {\n        return Flux.just(new Order(userId, "Item_A"), new Order(userId, "Item_B"));\n    }\n\n    public static void main(String[] args) {\n        // TODO: Build the full reactive pipeline\n    }\n}',
    requirements:{ patterns:[
      { name:'flatMap', pattern:'\\.flatMap\\s*\\(', required:true },
      { name:'filter', pattern:'\\.filter\\s*\\(', required:true },
      { name:'onErrorResume/onErrorReturn', pattern:'\\.onError', required:true },
      { name:'collectList/collect', pattern:'\\.collectList\\s*\\(|\\.collect', required:true },
      { name:'subscribe', pattern:'\\.subscribe\\s*\\(', required:true }
    ]},
    tests:[
      { name:'Full pipeline with all operators', visible:true, validate:(c)=>{ const ops=['.flatMap','.filter','.onError','.collect','.subscribe']; const found=ops.filter(o=>c.includes(o)); return { passed:found.length===5, message:`Found ${found.length}/5 required operators: ${found.join(', ')}` }; } }
    ], hiddenTests:[],
    hints:['Start: Flux.range(1,5).flatMap(id -> fetchUser(id))','Then: .filter(user -> user.active())','Then: .flatMap(user -> fetchOrders(user.id()).collectList().map(orders -> new UserWithOrders(user, orders)))'],
    solution:'import reactor.core.publisher.Flux;\nimport reactor.core.publisher.Mono;\nimport java.util.List;\n\npublic class ReactivePipeline {\n    record User(int id, String name, boolean active) {}\n    record Order(int userId, String item) {}\n    record UserWithOrders(User user, List<Order> orders) {}\n\n    static Mono<User> fetchUser(int id) {\n        if (id == 4) return Mono.error(new RuntimeException("User not found"));\n        return Mono.just(new User(id, "User_" + id, id % 2 != 0));\n    }\n    static Flux<Order> fetchOrders(int userId) {\n        return Flux.just(new Order(userId, "Item_A"), new Order(userId, "Item_B"));\n    }\n\n    public static void main(String[] args) {\n        Flux.range(1, 5)\n            .flatMap(id -> fetchUser(id).onErrorResume(e -> Mono.empty()))\n            .filter(User::active)\n            .flatMap(user -> fetchOrders(user.id())\n                .collectList()\n                .map(orders -> new UserWithOrders(user, orders)))\n            .collectList()\n            .subscribe(results -> {\n                results.forEach(r -> System.out.println(r.user().name() + " -> " + r.orders()));\n                System.out.println("Total active users with orders: " + results.size());\n            });\n    }\n}',
    explanation:'This is a production-grade reactive pipeline: flatMap for async operations, filter for business logic, nested flatMap+collectList for 1-to-many relationships, onErrorResume for resilience, and collectList to gather results. This pattern is exactly how you build reactive microservices — every Spring WebFlux service uses these operators daily.'
  }
];
