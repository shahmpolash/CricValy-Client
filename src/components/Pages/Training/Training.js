import React from 'react';
import './Training.css';
import { Link } from 'react-router-dom';
import HomeBanner from '../Home/HomeBanner';

const Training = () => {
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
                  <Link class="btn" to='/begginer'>
                    <img src="https://i.ibb.co/0XMBxY1/begginer.png" alt="" />
                  </Link>
                </div>
                <div className="text">
                  <p>Begginer</p>
                </div>
              </div>
              <div className="single-training-card">
                <div className="single-card">
                  <Link class="btn" to='/intermediate'>
                    <img src="https://i.ibb.co/Krf4DvM/intermediate.png" alt="" />
                  </Link>
                </div>
                <div className="text">
                  <p>Intermediate</p>
                </div>
              </div>
              <div className="single-training-card">
                <div className="single-card">
                  <Link class="btn" to='/advance'>
                    <img src="https://i.ibb.co/722CFHL/advance.png" alt="" />
                  </Link>
                </div>
                <div className="text">
                  <p>Advance</p>
                </div>
              </div>
              
              </>
          
          </div>
        </div>
      </div>
    );
};

export default Training;