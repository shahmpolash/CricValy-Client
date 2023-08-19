import React, { useEffect, useState } from "react";
import "./Videos.css";
import { Link } from "react-router-dom";
import Loading from "../../../Shared/Loading";

const ITEMS_PER_PAGE = 5; // Adjust this value as needed
const MAX_PAGE_NUMBERS = 3;

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/videos`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const totalPages = Math.ceil(videos.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let pageNumbers = [];
  if (totalPages <= MAX_PAGE_NUMBERS) {
    pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else if (currentPage <= Math.floor(MAX_PAGE_NUMBERS / 2) + 1) {
    pageNumbers = Array.from({ length: MAX_PAGE_NUMBERS }, (_, index) => index + 1);
  } else if (currentPage >= totalPages - Math.floor(MAX_PAGE_NUMBERS / 2)) {
    pageNumbers = Array.from(
      { length: MAX_PAGE_NUMBERS },
      (_, index) => totalPages - MAX_PAGE_NUMBERS + index + 1
    );
  } else {
    pageNumbers = Array.from(
      { length: MAX_PAGE_NUMBERS },
      (_, index) => currentPage - Math.floor(MAX_PAGE_NUMBERS / 2) + index
    );
  }

  return (
    <div>
      <div className="videos-banner">
        <h2>Cricket Related Videos</h2>
      </div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        videos.slice(startIndex, endIndex).map((video) => (
          <div className="video" key={video._id}>
            <Link to={`/video/${video._id}`}>
              <img className="banner" src={video.videoBanner} alt="" />
            </Link>
          </div>
        ))
      )}

      <div className="pagination">
        <button
          className="page-button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`page-button ${
              currentPage === pageNumber ? "active" : ""
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="page-button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Videos;
