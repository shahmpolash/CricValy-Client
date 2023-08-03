import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AcademyDetails.css";

const AcademyDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [academy, setAcademy] = useState({});
  useEffect(() => {
    const url = `http://localhost:5000/academy/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAcademy(data));
  }, []);

  return (
    <div>
      <div className="hero-section section-gap-top-25">
        <div className="container">
          {/* Start Hero Area */}
          <div className="hero-area hero-area--style-1 hero-slider-active">
            {/* Slider main container */}
            <div className="swiper">
              {/* Additional required wrapper */}
              <div className="swiper-wrapper">
                {/* Slides */}
                <div className="swiper-slide">
                  <div className="hero-singel-slide">
                    <div className="hero-bg">
                      <img
                        width={388}
                        height={160}
                        className="img-full"
                        src={academy.academyCoverPhoto}
                        alt="cover"
                      />
                    </div>
                    <div className="inner-wrapper">
                      <div className="product-img academy-profile d-flex justify-content-center">
                        <img
                          width={100}
                          height={100}
                          src={academy.academyProfilePhoto}
                          alt="Academy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* If we need pagination */}
            <div className="swiper-pagination" />
          </div>
        </div>
      </div>
      <div className="center-position"> 
      <h1>{academy.academyName}</h1>
      </div>
      <div className="practice-date">
      <div>
        <div className="center-position">
        <h2>{academy.academyAddress}</h2>
        </div>
        <div className="center-position">
        <h2>{academy.academyPhoneNumber}</h2>
        </div>
      </div>
      </div>
      <div className="practice-date">
      <div>
        <div className="center-position">
        <h2>Practice Date: {academy.practiceDate}</h2>
        </div>
        <div className="center-position">
          <p>Practice Time: {academy.practiceTime}</p>
          </div>
      </div>
      </div>
      <div className="center-position"> 
      <h1>About</h1>
      </div>
      <div className="center-position">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, voluptatum autem explicabo sint, perferendis impedit saepe, veniam provident dicta vitae voluptate repellendus labore accusantium optio nobis enim? Officiis, recusandae at.</p>
      </div>
    </div>
  );
};

export default AcademyDetails;
