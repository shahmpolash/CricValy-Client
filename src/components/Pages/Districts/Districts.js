import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Districts.css';

const ITEMS_PER_PAGE = 10; // Adjust this value as needed
const MAX_PAGE_NUMBERS = 3;

const Districts = () => {
  const [districts, setDistricts] = useState([]);
  const [academies, setAcademies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/districts`)
      .then((res) => res.json())
      .then((info) => setDistricts(info));
  }, []);
  
  useEffect(() => {
    fetch(`http://localhost:5000/academies`)
      .then((res) => res.json())
      .then((info) => setAcademies(info));
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const totalPages = Math.ceil(academies.length / ITEMS_PER_PAGE);

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
      <div className="heading-academy">
        <h1>Find Your Best Academy from Your District</h1>
      </div>
      <div className="district-all-cards">
        <div className="district-cards">
          <>
            {districts.map(district =>
              <div className="district-single">
                <div className="district-card-one">
                  <Link className="btn" to={`/academies/${district._id}`}>
                    <img src="https://i.ibb.co/mG64sk9/academy-cri.png" alt="" />
                  </Link>
                </div>
                <p>{district.districtName}</p>
              </div>
            )}
          </>
        </div>
      </div>

      <div>
        <div className="title-content">
          <h2 className="title">Academies</h2>
        </div>

        <div className="academy-cards-all-cards">
          <div className="academy-cards">
            <>
              {academies.slice(startIndex, endIndex).map(academy =>
                <div className="academy-cards-single">
                  <div className="academy-cards-card-one">
                    <Link className="btn" to={`/academy/${academy._id}`}>
                      <img src={academy.academyProfilePhoto} alt="" />
                    </Link>
                  </div>
                  <div className="text">
                    <p>{academy.academyName}</p>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>

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
    </div>
  );
};

export default Districts;
