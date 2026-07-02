const ICONS = {
  code: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
  cube: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
  layers: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
  activity: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
  cpu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
  layout: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
  server: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
  database: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
  shield: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
};

export const WORLDS = [
  { id: 'java-academy', name: 'Java Academy', icon: ICONS.code, color: '#10b981', order: 1,
    description: 'Master Java fundamentals — variables, loops, methods, and more.' },
  { id: 'oop-city', name: 'OOP City', icon: ICONS.cube, color: '#3b82f6', order: 2,
    description: 'Object-Oriented Programming — classes, inheritance, polymorphism.' },
  { id: 'collections-kingdom', name: 'Collections Kingdom', icon: ICONS.layers, color: '#8b5cf6', order: 3,
    description: 'Lists, Sets, Maps — master the Collections framework.' },
  { id: 'streams-lambda-lab', name: 'Streams & Lambda Lab', icon: ICONS.activity, color: '#f59e0b', order: 4,
    description: 'Functional programming — lambdas, streams, Optional.' },
  { id: 'spring-core-campus', name: 'Spring Core Campus', icon: ICONS.cpu, color: '#f97316', order: 5,
    description: 'Dependency Injection, Beans, Component Scanning.' },
  { id: 'spring-boot-office', name: 'Spring Boot Office', icon: ICONS.layout, color: '#ef4444', order: 6,
    description: 'Auto-configuration, starters, and application structure.' },
  { id: 'rest-api-dept', name: 'REST API Department', icon: ICONS.server, color: '#a855f7', order: 7,
    description: 'Build production REST APIs with Spring Boot.' },
  { id: 'database-division', name: 'Database Division', icon: ICONS.database, color: '#6366f1', order: 8,
    description: 'JPA, PostgreSQL, CRUD, relationships, and queries.' },
  { id: 'reactive-lab', name: 'Reactive Lab', icon: ICONS.activity, color: '#06b6d4', order: 9,
    description: 'Mono, Flux, operators — reactive programming from scratch.' },
  { id: 'webflux-hq', name: 'WebFlux Headquarters', icon: ICONS.layers, color: '#0ea5e9', order: 10,
    description: 'Reactive REST APIs with Spring WebFlux.' },
  { id: 'enterprise-tower', name: 'Enterprise Tower', icon: ICONS.shield, color: '#ec4899', order: 11,
    description: 'Security, JWT, caching, microservices patterns.' },
];

export function getWorldById(id) {
  return WORLDS.find(w => w.id === id);
}

export function getNextWorld(currentWorldId) {
  const current = WORLDS.find(w => w.id === currentWorldId);
  if (!current) return null;
  return WORLDS.find(w => w.order === current.order + 1) || null;
}
