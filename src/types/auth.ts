// src/types/auth.ts
// Shared enum for user authorization status.
//
// WHY an enum instead of a plain boolean `isAuthorized`:
// A boolean only has two states. Auth status has three:
//   - Auth    → user is logged in with a valid JWT
//   - NoAuth  → user is not logged in
//   - Unknown → auth check is in-flight (initial page load before API responds)
// Without Unknown, PrivateRoute would flash a login redirect on every page
// load before the token check completes.
//
// WHY a string enum:
// String enums serialize cleanly in Redux DevTools and test assertions
// (AuthorizationStatus.Auth → "Auth", not 0).
//
// TODO: When Redux is wired, set the auth slice initial state to Unknown
// and dispatch checkAuthAction() on app mount.

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}
