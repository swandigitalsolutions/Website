// Home page sections that need JavaScript. Everything else is shipped as plain
// pre-rendered HTML. Each section below loads and starts independently, only
// when it is needed (see src/main.jsx).
export const ISLANDS = {
  Navbar: () => import('./components/Navbar'),
  Hero: () => import('./components/Hero'),
  ProjectOrbit: () => import('./components/ProjectOrbit'),
  Works: () => import('./components/Works'),
  AIStudio: () => import('./components/AIStudio'),
  Internships: () => import('./components/Internships'),
  Contact: () => import('./components/Contact'),
}

// Started shortly after first paint; the rest start as they near the viewport.
export const EAGER_ISLANDS = ['Navbar']
