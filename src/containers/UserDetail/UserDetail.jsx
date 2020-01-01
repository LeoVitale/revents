import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react';

import { getProfile } from 'modules/user';

import UserDetailedHeader from 'features/user-detail/UserDetailedHeader';
import UserDetailedDescription from 'features/user-detail/UserDetailedDescription';
import UserDetailedPhotos from 'features/user-detail/UserDetailedPhotos';
import UserDetailedSidebar from 'features/user-detail/UserDetailedSidebar';
import UserDetailedEvents from 'features/user-detail/UserDetailedEvents';

const query = auth => {
  return [
    {
      collection: 'users',
      doc: auth.uid || 'undefined',
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos',
    },
  ];
};

const UserDetail = () => {
  const { auth, profile, photos } = useSelector(getProfile);
  useFirestoreConnect(() => query(auth));

  return (
    <Grid>
      <UserDetailedHeader profile={profile} />
      <UserDetailedDescription profile={profile} />
      <UserDetailedSidebar />
      {photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
      <UserDetailedEvents />
    </Grid>
  );
};

export default UserDetail;
