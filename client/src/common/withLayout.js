//@flow
import * as React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import Menu from '../app/Menu';
import type { Profile } from '../profile/types';

function withLayout(
  WrappedComponent: React.ComponentType<{}>
): React.ComponentType<{ profile: Profile }> {
  return ({ profile, ...props }) => (
    <div>
      <Menu loading={!isLoaded(profile)} isAuthenticated={!isEmpty(profile)} />
      <WrappedComponent profile={profile} {...props} />
    </div>
  );
}
export default withLayout;
