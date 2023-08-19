import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Players.css";
import HomeBanner from "../Home/HomeBanner";
import Loading from "../../../Shared/Loading";

const ITEMS_PER_PAGE = 10;
const MAX_PAGE_NUMBERS = 3;

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`https://powerful-wave-58652-26b956be3d84.herokuapp.com/players`)
      .then((res) => res.json())
      .then((info) => {
        setPlayers(info);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
        setIsLoading(false);
      });
  }, []);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const filteredPlayers = players.filter((player) =>
    player.playerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE);

  // Calculate the range of page numbers to display
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
    <div className="player-bg container ">
      <div className="players-banner">
        <h2>All Players</h2>
      </div>
      <li className="single-form-item">
        <input
          type="text"
          placeholder="Search by player name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </li>
      <HomeBanner />
      <div className="catagories-wrapper">
        <div className="catagories-wrapper-content">
          {isLoading ? (
            <Loading></Loading>
          ) : (
            filteredPlayers.slice(startIndex, endIndex).map((player) => (
              <div
                className="single-product-item product-item--style-1 product-item--bg-maya-blue playerPic"
                key={player._id}
              >
                <Link to={`/player/${player._id}`} className="image">
                  <img
                    className="img-fluid"
                    src={player.playerProfileImg}
                    alt="player"
                  />
                </Link>

                <div className="playerName">
                  <p>{player.playerName}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {!isLoading && (
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
      )}
    </div>
  );
};

export default AllPlayers;
