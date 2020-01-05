import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Header, Divider, Grid, Button } from 'semantic-ui-react';

import { useFirestoreConnect } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';

import {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto,
  profileSelector,
} from 'modules/user';

import DropzoneInput from 'features/photos/DropzoneInput';
import CropperInput from 'features/photos/CropperInput';

import UserPhotos from 'features/photos/UserPhotos';

const Photos = () => {
  const { auth, profile, photos } = useSelector(profileSelector);
  const userPhotosQuery = useMemo(
    () => ({
      collection: 'users',
      doc: auth.uid || 'undefined',
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos',
    }),
    [auth.uid],
  );

  useFirestoreConnect(userPhotosQuery);

  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const hasImage = files.length > 0;

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const onCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };

  const onUploadimage = async () => {
    try {
      await dispatch(uploadProfileImage(image, files[0].name));
      onCancelCrop();
      toastr.success('Success', 'Photo has been uploaded');
    } catch (error) {
      console.log(error);
      toastr.error('Opps', 'Something went wrong');
    }
  };

  const onDeletePhoto = async photo => {
    try {
      await dispatch(deletePhoto(photo));
      toastr.success('Success!', 'Your photo has been deleted');
    } catch (error) {
      toastr.error('Error!', error.message);
    }
  };

  const onSetMainPhoto = async photo => {
    try {
      await dispatch(setMainPhoto(photo));
      toastr.success('Success!', 'Your main photo has been changed');
    } catch (error) {
      toastr.error('Error!', error.message);
    }
  };

  return (
    <Segment>
      <Header dividing size="large" content="Your Photos" />
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <DropzoneInput setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 2 - Resize image" />
          <CropperInput
            setImage={setImage}
            imagePreview={files?.[0]?.preview}
          />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 3 - Preview & Upload" />
          {hasImage && (
            <>
              <div
                className="img-preview"
                style={{
                  minWidth: '200px',
                  minHeight: '200px',
                  overflow: 'hidden',
                }}
              />
              <Button.Group>
                <Button
                  onClick={onUploadimage}
                  style={{ width: '100px' }}
                  icon="check"
                  positive
                />
                <Button
                  onClick={onCancelCrop}
                  style={{ width: '100px' }}
                  icon="close"
                />
              </Button.Group>
            </>
          )}
        </Grid.Column>
      </Grid>

      <Divider />
      <UserPhotos
        photos={photos}
        profile={profile}
        onDeletePhoto={onDeletePhoto}
        onSetMainPhoto={onSetMainPhoto}
      />
    </Segment>
  );
};

export default Photos;
