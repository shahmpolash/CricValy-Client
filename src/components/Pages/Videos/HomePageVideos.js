import React, { useEffect, useState } from "react";
import "./Videos.css";
import { Link } from "react-router-dom";

const HomePageVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/videos`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <div>
      <div className="videos-banner">
        <h2>Cricket Related Videos</h2>
      </div>
      {videos.slice(0, 2).map((video) => (
        <div className="video">
          <Link to={`/video/${video._id}`}>
            <img className="banner" src={video.videoBanner} alt="" />
          </Link>
        </div>
      )).reverse()}
    </div>
  );
};

export default HomePageVideos;
