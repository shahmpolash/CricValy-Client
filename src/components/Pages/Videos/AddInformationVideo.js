import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddInformationVideo = () => {
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState('');

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('key', 'e3a766c99e397158b5668ccd3ed717ff');
    formData.append('image', file);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.data.url;
  };

  const handleAddVideo = async (event) => {
    event.preventDefault();
    const videoType = event.target.videoType.value;
    const videoURL = event.target.videoURL.value;
    const videoTitle = event.target.videoTitle.value;

    // Upload the image and get the image URL
    const uploadedImageURL = await handleImageUpload(event.target.videoBanner.files[0]);
    setImageURL(uploadedImageURL);

    const addVideo = {
      videoType,
      videoURL,
      videoBanner: uploadedImageURL, // Use the uploaded image URL
      videoTitle,
    };

    const url = 'https://powerful-wave-58652-26b956be3d84.herokuapp.com/add-video';
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(addVideo),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate('/');
      });
  };

    return (
        <div>
            <form onSubmit={handleAddVideo}>
        <ul>
        <li class="single-form-item">
          <input
            type="text"
            name="videoType"
            value='Information'
          ></input>{" "}
          <br />
        </li>

        <li class="single-form-item">
          <input
            type="text"
            name="videoURL"
            placeholder="Video URL"
          ></input>{" "}
          <br />
        </li>
        <li className='single-form-item'>
            <input
              type='file'
              name='videoBanner'
            ></input>{' '}
            <br />
          </li>

          <li className='single-form-item'>
            {imageURL && <img src={imageURL} alt='Uploaded' />} {/* Show the uploaded image */}
          </li>
        <li class="single-form-item">
          <input
            type="text"
            name="videoTitle"
            placeholder="Video Title"
          ></input>{" "}
          <br />
        </li>

        
        <li class="single-form-item">
        <input
          className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn"
          type="submit"
          value="Add Academy"
        ></input>
        </li>
        </ul>
        
      </form>
        </div>
    );
};

export default AddInformationVideo;