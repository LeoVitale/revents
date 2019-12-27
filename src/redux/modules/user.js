import { toastr } from 'react-redux-toastr';
import { createStructuredSelector } from 'reselect';

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

/*
  SELECTOR
*/

export const getProfile = createStructuredSelector({
  profile: state => state.firebase.profile,
});
