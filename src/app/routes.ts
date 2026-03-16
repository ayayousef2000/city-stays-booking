// src/app/routes.ts
// Route path constants — single source of truth for all navigation paths.
//
// WHY constants instead of magic strings:
// Writing '/login' directly in <Link>, <Navigate>, and <Route> means a path
// change requires a grep across the entire codebase. With AppRoute, you fix
// it in one place and TypeScript catches every usage automatically.

export const AppRoute = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',
  NotFound: '*',
} as const;
