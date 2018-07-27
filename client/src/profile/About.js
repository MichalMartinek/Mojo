/* @flow */

import React from 'react';
import type { Profile } from './types';

type Props = {
  profile: Profile,
  loading: boolean,
  logout: () => Promise<Object>
};

class About extends React.Component<Props> {
  render() {
    const { profile, logout, loading } = this.props;
    if (loading) {
      return <div className="about about--empty" />;
    }
    return (
      <div className="about">
        <div className="about__image">
          <img src={profile.avatarUrl} alt={profile.displayName} />
        </div>
        <h1 className="about__name">{profile.displayName}</h1>
        <h2 className="about__email">{profile.email}</h2>
        <button className="button about__logout " onClick={logout}>
          Logout
        </button>
      </div>
    );
  }
}

export default About;
