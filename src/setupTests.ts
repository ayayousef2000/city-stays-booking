// src/setupTests.ts
// Global test setup file — runs once before the entire test suite.
// Registered in vite.config.ts `test.setupFiles`.

// Extends Vitest's `expect` with custom DOM matchers from @testing-library/jest-dom.
// After this import, you can use assertions like:
//   expect(element).toBeInTheDocument()
//   expect(button).toBeDisabled()
//   expect(input).toHaveValue('hello')
//   expect(link).toHaveAttribute('href', '/offer/1')
import '@testing-library/jest-dom';
