// src/App.tsx
// Root application component.
//
// WHY `ReactNode` instead of `JSX.Element`:
// `JSX.Element` is a legacy type alias that maps to `React.ReactElement<any, any>`.
// In React 18+, components can legitimately return `null`, strings, arrays,
// or Fragments — none of which are `JSX.Element`. `ReactNode` is the correct
// union type: ReactElement | string | number | boolean | null | undefined.
// TypeScript will flag the mismatch as an error with strict mode enabled.
//
// NOTE: `offersCount` as a prop is a temporary scaffold.
// TODO: Replace with `useAppSelector(selectOffersCount)` once Redux is wired up.
// The Redux store is the single source of truth for all shared state.

import type { ReactNode } from 'react';

import MainPage from '@/pages/main-page';

interface AppProps {
  offersCount: number;
}

function App({ offersCount }: AppProps): ReactNode {
  return <MainPage offersCount={offersCount} />;
}

export default App;
