# City Stays Booking

**City Stays** is a scalable Single Page Application (SPA) designed for travelers looking to rent premium accommodations across various global destinations.

Built as a comprehensive frontend architecture showcase, this application consumes a REST API to handle JSON Web Token (JWT) authentication, fetch dynamic property data across multiple geographic locations, manage user favorites, and handle user reviews. It seamlessly integrates interactive maps to provide a highly visual and responsive user experience.

## Key Features

* **Dynamic Geographic Mapping (Leaflet):** Renders interactive city maps based on dynamically fetched coordinates. Map markers automatically highlight when a user hovers over the corresponding property card in the UI.
* **Scalable State Management:** Utilizes Redux Toolkit to manage a complex global state, including user authorization, dynamically loaded cities, active location selection, and property caching.
* **Smart Sorting & Filtering:** Users can filter properties by their selected destination and sort active listings by price (high/low), top-rated, or popularity. The UI updates instantly without page reloads.
* **Authentication & Protected Routes:** Secure login flow using JWT stored in `localStorage`. Private routing ensures that only authenticated users can access the "Favorites" dashboard or submit property reviews.
* **User Reviews & Validation:** Authenticated users can leave 1-to-5 star ratings and text reviews. The form features strict client-side validation (enforcing character limits and required fields) and handles loading/error states during asynchronous API submissions.
* **Responsive 404 & Error Handling:** Graceful error handling and redirection for non-existent routes or failed API requests.

## Tech Stack

* **Frontend Framework:** React
* **State Management:** Redux (Redux Toolkit)
* **Routing:** React Router v6
* **HTTP Client:** Axios (with custom interceptors for attaching `X-Token` headers)
* **Maps & Geolocation:** Leaflet & React-Leaflet
* **Testing:** Jest & React Testing Library

## Project Configuration

This section documents the tooling, conventions, and infrastructure configuration baked into the project scaffold.

### Build Tool — Vite

The project uses **Vite** as its build tool and dev server (configured in `vite.config.ts`). Vite provides near-instant HMR during development and an optimised production bundle. TypeScript support is provided out of the box via `tsconfig.json` and `tsconfig.node.json`.

### Environment Variables

Sensitive and environment-specific values are managed through `.env` files. A `.env.example` file is committed to the repository as a reference template — copy it to `.env.local` and fill in your values before running the project locally.

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend REST API |

### TypeScript

The project is fully typed with **TypeScript**. Configuration is split across two files:

* `tsconfig.json` — compiler options for application source (`src/`)
* `tsconfig.node.json` — compiler options for Vite's Node.js config file

### Linting & Formatting

Code style is enforced automatically so the entire codebase stays consistent regardless of editor or contributor.

* **ESLint** (`eslint.config.js`) — static analysis for React and TypeScript best practices
* **Prettier** (`.prettierrc`) — opinionated code formatting; runs on save in VS Code via the workspace settings in `.vscode/settings.json`
* **EditorConfig** (`.editorconfig`) — enforces consistent indentation and line endings across all editors

Recommended VS Code extensions are listed in `.vscode/extensions.json`.

### Commit Conventions

All commits must follow the **Conventional Commits** specification, enforced by two tools working together:

* **commitlint** (`commitlint.config.cjs`) — validates commit message format on every commit. Valid types are: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. Subject lines must be lowercase, must not end with a period, and must not exceed 100 characters.
* **Husky** (`.husky/`) — runs Git hooks automatically: `pre-commit` runs the linter, `pre-push` runs the test suite, and `commit-msg` runs commitlint.

### CI/CD — GitHub Actions

A continuous integration workflow is defined in `.github/workflows/ci.yml`. On every push and pull request it runs the full pipeline in sequence: lint → test → build. The build step verifies the production bundle compiles without errors before any merge.

### Deployment — Netlify

The project is deployed to **Netlify** and is live at [city-stays-booking.netlify.app](https://city-stays-booking.netlify.app) . Because this is a client-side SPA using React Router, direct URL visits and page refreshes must resolve to `index.html` rather than a 404. This is handled by `netlify.toml` at the project root, which configures a catch-all redirect:

```toml
[[redirects]]
  from   = "/*"
  to     = "/index.html"
  status = 200
```

## Running the Project Locally

Follow these instructions to set up the project on your local machine.

### Prerequisites

* Node.js (v14.x or higher)
* npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ayayousef2000/city-stays-booking.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd city-stays-booking
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   # Then open .env.local and set VITE_API_BASE_URL
   ```
5. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The application will open in your browser at `http://localhost:5173`.*

## Testing

This project maintains high code quality through automated testing. Tests cover UI component rendering, Redux reducer logic, and asynchronous API actions.

To run the test suite:

```bash
npm run test
```
