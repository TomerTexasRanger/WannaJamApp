import { connect } from 'react-redux';
import { addImage } from '../../../actions/profilesActions';
import { useState } from 'react';
import { withRouter } from 'react-router';
import PageHeader from '../../layout/PageHeader';
import { Image, Transformation } from 'cloudinary-react';

const AddImage = ({ addImage, history }) => {
  // const [image, setImage] = useState('');
  // console.log(image);
  // const [imgPrev, setImgPrev] = useState('');

  // const imageHandler = (e) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setImgPrev(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('image', image);
  //   addImage(formData, history);
  // };
  const [previewSource, setPreviewSource] = useState('');
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    addImage(previewSource);
  };

  return (
    <>
      <section className="container">
        <PageHeader titleText={'Add A Profile Image'} />
        <div className="add-image">
          <div className="img-holder bg-light">
            {/* {image === '' ? (
              <i className="fas fa-user fa-10x"></i>
            ) : (
              <img src={imgPrev} alt="" id="img" className="img" />
            )} */}
            {previewSource && (
              <Image src={previewSource}>
                <Transformation
                  width="250"
                  height="250"
                  gravity="faces"
                  crop="fill"
                />
              </Image>
            )}
          </div>
          <form
            className="form"
            action=""
            onSubmit={onSubmit}
            encType="multipart/form-data"
          >
            <label
              htmlFor="image"
              className="form-control img-upload  button button-success mt-3"
            >
              {' '}
              <h3 className="">Choose an Image:</h3>
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="form-control"
              value={fileInputState}
              onChange={(e) => {
                // imageHandler(e);
                // setImage(e.target.files[0]);
                handleFileInputChange(e);
              }}
            />
            <input
              className="button button-primary mt-3 "
              type="submit"
              value="Upload Image"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default connect(null, { addImage })(withRouter(AddImage));
