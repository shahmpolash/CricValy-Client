import React, { useEffect, useState } from 'react';
import banner from '../images/banner-img.jpg';
import './Banner.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { Link } from 'react-router-dom';

const Banner = () => {
  const [user] = useAuthState(auth)
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    fetch(`https://powerful-wave-58652-26b956be3d84.herokuapp.com/players`)
      .then((res) => res.json())
      .then((info) => setPlayers(info));
  }, []);



    return (
        <div className='banner-border'>
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
                    <div className="hero-singel-slide ">
                      <div className="hero-bg">
                        <img
                          width={388}
                          height={160}
                          className="img-full"
                          src="https://htmldemo.net/carce/carce/assets/images/hero/bg/hero-bg-1.jpg"
                          alt="cover"
                        />
                      </div>
                      <div className="inner-wrapper">
                        <div className="content">
                        <p className="title-tag">Hi</p>
                          {
                            players.map(player => player.playerEmail === user?.email &&
                              <h2 className="title">{player.playerName}</h2>
                              )
                            
                          }
                          {
                            players.filter(player => player.playerEmail === user?.email).length === 0 &&
                            <Link to="/add-profile"><h3>Create Profile Now</h3></Link>
                            
                          }
                         
                        </div>
                        <div className="product-img">
                          <img
                            width={149}
                            height={127}
                            className="img-fluid"
                            src="https://i.ibb.co/kmvR5qV/cric.png"
                            alt="cover"
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
            {/* End Hero Area */}
          </div>
        </div>
        </div>
    );
};

export default Banner;