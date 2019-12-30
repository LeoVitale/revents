import React from 'react';
import { Header, Card, Image, Button } from 'semantic-ui-react';

const UserPhotos = ({ photos, profile, onDeletePhoto, onSetMainPhoto }) => {
  const filteredPhotos =
    photos && photos.filter(photo => photo.url !== profile.photoURL);

  if (!filteredPhotos) {
    return null;
  }

  return (
    <>
      <Header sub color="teal" content="All Photos" />

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src={profile.photoURL} />
          <Button positive>Main Photo</Button>
        </Card>

        {filteredPhotos &&
          filteredPhotos.map(photo => (
            <Card key={photo.id}>
              <Image src={photo.url} />
              <div className="ui two buttons">
                <Button
                  onClick={() => onSetMainPhoto(photo)}
                  basic
                  color="green">
                  Main
                </Button>
                <Button
                  onClick={() => onDeletePhoto(photo)}
                  basic
                  icon="trash"
                  color="red"
                />
              </div>
            </Card>
          ))}
      </Card.Group>
    </>
  );
};

export default UserPhotos;
