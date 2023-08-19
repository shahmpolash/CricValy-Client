import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AcademyDetails.css";

const AcademyDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [academy, setAcademy] = useState({});
  useEffect(() => {
    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/academy/${id}`;
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
      <div className="center-position academy-name">
        <h1>{academy.academyName}</h1>
      </div>
      <div>
        <div className="address-phone">

          <div className="address">
            <img src="https://i.ibb.co/jWfXQCf/map.png"></img>
            <p>House 18, Road 13, Ground Field yaha Road. rajshahi</p>
          </div>

          <div className="phone-number">
          <img src="https://i.ibb.co/qpr5Lmq/phone-call.png"></img>
            <p>Phone Number: <br></br>{academy.academyPhoneNumber}</p>
          </div>

          <div className="practice-time">
          <img src="https://i.ibb.co/DfVgb7D/cricket.png"></img>
            <p>Practice Time: <br></br>{academy.practiceTime}</p>
          </div>
          
        </div>
      </div>
      <div>
     
      </div>
      <div className="academy-photos">
        <img src={academy.academyPhotoOne}></img>
        <img src={academy.academyPhotoTwo}></img>
        <img src={academy.academyPhotoThree}></img>
        <img src={academy.academyPhotoFour}></img>
      </div>
      <div className="center-position about">
        <h1>About</h1>
      </div>
      <div className="center-position about-academy">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, voluptatum autem explicabo sint, perferendis impedit saepe, veniam provident dicta vitae voluptate repellendus labore accusantium optio nobis enim? Officiis, recusandae at.</p>
      </div>
    </div>
  );
};

export default AcademyDetails;
