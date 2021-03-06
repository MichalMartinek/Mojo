/* @flow */
import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import routes from '../app/routes';
type AsyncFunction = (event: {}) => Promise<{}>;
type Props = {
  loginWithFacebook: AsyncFunction,
  loginWithGoogle: AsyncFunction,
  loginWithGithub: AsyncFunction
};

class Login extends React.Component<Props> {
  render() {
    const { loginWithGoogle, loginWithFacebook, loginWithGithub } = this.props;
    return (
      <div className="login">
        <div className="login__content">
          <header className="login__header">
            <h1 className="login__title">Log in</h1>
          </header>
          <div className="login__container">
            <div className="login__buttons">
              <button
                className="button login__button login__button--google"
                onClick={loginWithGoogle}
              >
                <FontAwesomeIcon
                  icon={['fab', 'google-plus-g']}
                  className="login__icon"
                />
                <span className="login__buttonText"> Login with Google </span>
              </button>
              <button
                className="button login__button login__button--facebook"
                onClick={loginWithFacebook}
              >
                <FontAwesomeIcon
                  icon={['fab', 'facebook']}
                  className="login__icon"
                />
                <span className="login__buttonText">Login with Facebook</span>
              </button>
              <button
                className="button login__button button login__button--github"
                onClick={loginWithGithub}
              >
                <FontAwesomeIcon
                  icon={['fab', 'github']}
                  className="login__icon"
                />
                <span className="login__buttonText">Login with Github</span>
              </button>
            </div>
            <div className="login__create">
              <p className="login__createText">
                Or you can create a new playlist without logging in.
              </p>
              <Link
                className="button login__button login__button--create"
                to={routes.newPlaylist}
              >
                New playlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
