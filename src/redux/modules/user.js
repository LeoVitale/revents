import { toastr } from 'react-redux-toastr';
import { createStructuredSelector } from 'reselect';
import cuid from 'cuid';
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async';

export const updateProfile = user => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { isLoaded, isEmpty, ...updatedUser } = user;

    try {
      await firebase.updateProfile(updatedUser);
      toastr.success('Success!', 'Your profile has been updated');
    } catch (error) {
      console.log(error);
    }
  };
};

export const uploadProfileImage = (file, fileName) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const imageName = cuid();
    const firebase = getFirebase();
    const firestore = getFirestore();

    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;

    const options = {
      name: imageName,
    };

    try {
      dispatch(asyncActionStart());
      const uploadedFile = await firebase.uploadFile(path, file, null, options);
      const downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
      const userDoc = await firestore.get(`users/${user.uid}`);

      if (!userDoc.data().photoURL) {
        await firebase.updateProfile({
          photoURL: downloadURL,
        });

        await user.updateProfile({
          photoURL: downloadURL,
        });
      }
      await firestore.add(
        {
          collection: 'users',
          doc: user.uid,
          subcollections: [{ collection: 'photos' }],
        },
        {
          name: imageName,
          url: downloadURL,
        },
      );
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const deletePhoto = photo => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;

    try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos', doc: photo.id }],
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setMainPhoto = photo => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      return firebase.updateProfile({ photoURL: photo.url });
    } catch (error) {
      console.log(error);
    }
  };
};
/*
  SELECTOR
*/

export const getProfile = createStructuredSelector({
  profile: state => state.firebase.profile,
  auth: state => state.firebase.auth,
  photos: state => state.firestore.ordered.photos,
});
