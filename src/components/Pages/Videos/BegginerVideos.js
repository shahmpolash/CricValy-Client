import React from 'react';
import { Link } from 'react-router-dom';
import HomeBanner from '../Home/HomeBanner';

const BegginerVideos = () => {
    return (
        <div>
            <HomeBanner></HomeBanner>
            <div className='cricket-training'>
                <h2>Cricket Training Videos</h2>
            </div>
        <div className="all-cards training-page">
          <div className="training-cards">
          <>
              <div className="single-training-card">
                <div className="single-card">
                  <Link class="btn" to='/batting-begginer'>
                    <img src="https://i.ibb.co/pvwBTrV/cricket-bat.png" alt="" />
                  </Link>
                </div>
                <div className="text">
                  <p>Batting</p>
                </div>
              </div>
              <div className="single-training-card">
                <div className="single-card">
                  <Link class="btn" to='/bowling-begginer'>
                    <img src="https://i.ibb.co/k2jNscK/cricket-ball.png" alt="" />
                  </Link>
                </div>
                <div className="text">
                  <p>Bowling</p>
                </div>
              </div>
              <div className="single-training-card">
                <div className="single-card">
                  <Link class="btn" to='/fielding-begginer'>
                    <img src="https://i.ibb.co/BwmB42m/catching.png" alt="" />
                  </Link>
                </div>
                <div className="text">
                  <p>Fielding</p>
                </div>
              </div>
              
              </>
          
          </div>
        </div>
      </div>
    );
};

export default BegginerVideos;