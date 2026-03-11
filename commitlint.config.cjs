// commitlint.config.cjs
// WHY CommonJS (.cjs): commitlint is invoked by Husky as a Node script.
// Since package.json has "type": "module", Node treats .js files as ESM.
// The .cjs extension forces CommonJS mode so `module.exports` works correctly.

/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  // Extends the Conventional Commits specification.
  // WHY Conventional Commits:
  //   1. CHANGELOG generation via `git log --oneline` becomes readable.
  //   2. Semantic versioning automation (standard-version / release-it).
  //   3. CI can parse `feat:` vs `fix:` to decide bump strategy.
  //   4. Reviewers instantly understand scope and intent from the subject line.
  extends: ['@commitlint/config-conventional'],

  rules: {
    // ── Type Rules ────────────────────────────────────────────────────────────
    // The only valid commit types for this project.
    // 2 = error, 'always' = the rule must always pass.
    'type-enum': [
      2,
      'always',
      [
        'feat',     // A new feature visible to the user
        'fix',      // A bug fix
        'docs',     // Documentation changes only
        'style',    // Formatting, whitespace — no logic change
        'refactor', // Code change that neither fixes a bug nor adds a feature
        'perf',     // Performance improvement
        'test',     // Adding or updating tests
        'build',    // Changes to build system or dependencies (vite, package.json)
        'ci',       // CI/CD pipeline changes (.github/workflows)
        'chore',    // Maintenance tasks that don't affect source or tests
        'revert',   // Revert a previous commit
      ],
    ],

    // Subject line must not start with a capital letter.
    // CORRECT:   feat: add map marker hover interaction
    // INCORRECT: feat: Add map marker hover interaction
    'subject-case': [2, 'always', 'lower-case'],

    // Subject line must not end with a period.
    'subject-full-stop': [2, 'never', '.'],

    // Maximum subject line length for readability in `git log --oneline`.
    'header-max-length': [2, 'always', 100],

    // Scope is optional but must be lowercase when provided.
    'scope-case': [2, 'always', 'lower-case'],
  },
};
