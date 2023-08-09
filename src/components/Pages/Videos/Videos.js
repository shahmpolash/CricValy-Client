import React, { useEffect, useState } from "react";
import "./Videos.css";
import { Link } from "react-router-dom";

const Videos = () => {
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
        <h2>Cricket Related Videos</h2>
      </div>
      {videos.map((video) => (
        <div className="video">
          <Link to={`/video/${video._id}`}>
            <img className="banner" src={video.videoBanner} alt="" />
          </Link>
        </div>
      )).reverse()
      }
    </div>
  );
};

export default Videos;
