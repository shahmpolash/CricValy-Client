import React, { useEffect, useState } from "react";
import "./Videos.css";
import { Link } from "react-router-dom";

const AdvanceVideo = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5000/videos`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <div>
      <div className="videos-banner">
        <h2>Training For Advance Level</h2>
      </div>
      {
        videos.map(video => video.videoType === 'Training' && video.VideoCategory === 'Advance' && 
        <div className="video">
        <Link to={`/video/${video._id}`}>
          <img className="banner" src={video.videoBanner} alt="" />
        </Link>
      </div>)
      }
    </div>
  );
};

export default AdvanceVideo;
