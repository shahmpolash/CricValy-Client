import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";
import './Cards';

const Cards = () => {
  const [user] = useAuthState(auth);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    fetch(`https://powerful-wave-58652-26b956be3d84.herokuapp.com/players`)
      .then((res) => res.json())
      .then((info) => setPlayers(info));
  }, []);
  return (
    <div>
      <div className="all-cards">
        <div className="cards">
        <>
            <div className="single">
              <div className="card-one">
                <Link class="btn" to='/add-profile'>
                  <img src="https://i.ibb.co/ypZVM1Z/cricket.png" alt="" />
                </Link>
              </div>
              <div className="text">
                <p>Set Profile</p>
              </div>
            </div>
            <div className="single">
              <div className="card-one">
                <Link class="btn" to='/academy-list'>
                  <img src="https://i.ibb.co/N2q3QKY/academy.png" alt="" />
                </Link>
              </div>
              <div className="text">
                <p>Academies</p>
              </div>
            </div>
            <div className="single">
              <div className="card-one">
                <Link class="btn" to='/videos'>
                  <img src="https://i.ibb.co/DCWK60X/play-button.png" alt="" />
                </Link>
              </div>
              <div className="text">
                <p>Videos</p>
              </div>
            </div>
            <div className="single">
              <div className="card-one">
                <Link class="btn" to='/training'>
                  <img src="https://i.ibb.co/GccWBB3/training.png" alt="" />
                </Link>
              </div>
              <div className="text">
                <p>Training</p>
              </div>
            </div>
            <div className="single">
              <div className="card-one">
                <Link class="btn" to='/players'>
                  <img src="https://i.ibb.co/hY1TgjS/bats-man.png" alt="" />
                </Link>
              </div>
              <div className="text">
                <p>Players</p>
              </div>
            </div>
            <div className="single">
              <div className="card-one">
                <Link class="btn" to='/update-news'>
                  <img src="https://i.ibb.co/9YDV8Cw/refresh.png" alt="" />
                </Link>
              </div>
              <div className="text">
                <p>Updates</p>
              </div>
            </div>
            </>
        
        </div>
      </div>
    </div>
  );
};

export default Cards;
