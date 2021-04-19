import { connect } from 'react-redux';
import { addImage } from '../../../actions/profilesActions';
import { useState } from 'react';
import { withRouter } from 'react-router';

const AddImage = ({ addImage, history }) => {
  const [image, setImage] = useState('');
  console.log(image);
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    addImage(formData, history);
  };

  return (
    <>
      <section className="container">
        <form action="" onSubmit={onSubmit} encType="multipart/form-data">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="image"
            id="image"
            className="form-control"
            // value={image}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <input type="submit" value="Upload Image" />
        </form>
      </section>
    </>
  );
};

export default connect(null, { addImage })(withRouter(AddImage));
