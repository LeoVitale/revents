import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CropperInput = ({ imagePreview, setImage, setCropResult }) => {
  const cropper = useRef();

  const cropImage = () => {
    cropper.current.getCroppedCanvas().toBlob(blob => {
      //setCropResult(URL.createObjectURL(blob));
      setImage(blob);
    }, 'image/jpeg');
  };

  console.log('CropperInput/imagePreview', imagePreview);

  if (!imagePreview) {
    return null;
  }

  return (
    <div>
      <Cropper
        ref={cropper}
        src={imagePreview}
        style={{ height: 200, width: '100%' }}
        preview=".img-preview"
        aspectRatio={1}
        viewMode={1}
        dragMode="move"
        guides={false}
        scalable
        cropBoxMovable
        cropBoxResizable
        cropend={cropImage}
        ready={cropImage}
      />
    </div>
  );
};

export default CropperInput;
