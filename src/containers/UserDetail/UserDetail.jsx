import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import { Grid } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import { getProfile } from 'modules/user';

import UserDetailedHeader from 'features/user-detail/UserDetailedHeader';
import UserDetailedDescription from 'features/user-detail/UserDetailedDescription';
import UserDetailedPhotos from 'features/user-detail/UserDetailedPhotos';
import UserDetailedSidebar from 'features/user-detail/UserDetailedSidebar';
import UserDetailedEvents from 'features/user-detail/UserDetailedEvents';
import Loading from 'components/layout/Loading';

const UserDetail = () => {
  const { id } = useParams();
  const { photos, userProfile, requesting } = useSelector(getProfile);
  const isCurrentUser = id === userProfile.id;
  const loading = Object.values(requesting).some(a => a === true);

  const userDetailQuery = useMemo(
    () => [
      {
        collection: 'users',
        doc: id,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'photos',
      },
      {
        collection: 'users',
        doc: id,
        storeAs: 'userProfile',
      },
    ],
    [id],
  );

  useFirestoreConnect(userDetailQuery);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid>
      <UserDetailedHeader profile={userProfile} />
      <UserDetailedDescription profile={userProfile} />
      <UserDetailedSidebar isCurrentUser={isCurrentUser} />
      {photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
      <UserDetailedEvents />
    </Grid>
  );
};

export default UserDetail;
