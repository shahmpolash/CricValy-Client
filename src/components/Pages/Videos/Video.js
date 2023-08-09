import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Video = () => {
    const {id} = useParams([]);
    const [video, setVideo] = useState([]);

    useEffect(() => {
      const url = `http://localhost:5000/video/${id}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setVideo(data));
    }, [id]);
    return (
        <div className="video">
         <iframe width="100%" height="315" src={video.videoURL} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          <h4>{video.videoTitle}</h4>
        </div>
    );
};

export default Video;