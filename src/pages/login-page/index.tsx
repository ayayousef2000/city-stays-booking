// src/pages/login-page/index.tsx
// Scaffold page — static markup until Redux auth slice is wired up.
// TODO: Connect form submission to loginAction (createAsyncThunk)
// TODO: Redirect to '/' on successful login via useAppSelector(selectAuthStatus)
// TODO: Show validation errors from API response via RTK Query or thunk rejection
//
// WHY `ReactNode` instead of `JSX.Element`:
// `JSX.Element` is a legacy type alias for `React.ReactElement<any, any>`.
// React 18 components can return null, strings, arrays, or Fragments —
// none of which satisfy `JSX.Element`. `ReactNode` is the correct union type.
//
// NOTE: `htmlFor` on <label> is the correct React equivalent of HTML `for`.
// Both email and password inputs have associated labels — required for
// wcag 1.3.1 (Info and Relationships) and jsx-a11y/label-has-associated-control.

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '@/app/routes';

function LoginPage(): ReactNode {
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="City stays booking"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="email">
                  E-mail
                </label>
                <input
                  id="email"
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
