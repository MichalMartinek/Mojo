/* @flow */
import React from 'react'
type AsyncFunction = (event: {}) => Promise<{}>
type Props = {
  loginWithFacebook: AsyncFunction,
  loginWithGoogle: AsyncFunction,
  loginWithGithub: AsyncFunction,
  newPlaylist: (event: {}) => void,
};

class Login extends React.Component<Props> {
  render() {
    const {loginWithGoogle, loginWithFacebook, loginWithGithub, newPlaylist} = this.props
    return (
      <div className="login">
        <header className="login__header">
          <h1 className="login__title">Log in</h1>
        </header>
        <div className="login__content">
          <div className="login__buttons">
            <button className="login__button" onClick={loginWithGoogle}>Login with Google</button>
            <button className="login__button" onClick={loginWithFacebook}>Login with Facebook</button>
            <button className="login__button" onClick={loginWithGithub}>Login with Github</button>
          </div>
          <div className="login__create">
            Or you can create new playlist without logging in.

            <button className="login__button login__button--create" onClick={newPlaylist}>New playlist</button>
          </div>
        </div>

      </div>
    );
  }
}

export default Login
