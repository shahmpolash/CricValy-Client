import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";
import "./Header.css";
const Header = () => {
  const [players, setPlayers] = useState([]);
  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    fetch(`https://powerful-wave-58652-26b956be3d84.herokuapp.com/players`)
      .then((res) => res.json())
      .then((info) => setPlayers(info));
  }, []);

  const [user] = useAuthState(auth);
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <div className="main-header">
      <div className="header-section">
        <div className="container">
          <div className="header-area">
            <div className="header-top-area header-top-area--style-1">
              <ul className="event-list">
              <li className="list-item">
                  <Link className="logo" to="/">
                    <img src="https://i.ibb.co/HCQsWNp/2-1.png" alt="" />
                  </Link>
                </li>
                <li className="list-item profile-icon">
                  <ul className="list-child">
                    {players.map(
                      (player) =>
                        player.playerEmail === user?.email && (
                          <li className="list-item">
                            <span className="notch-bg notch-bg--emerald" />
                            <Link
                              to="/dashboard"
                              area-label="User"
                              className="btn btn--size-33-33 btn--center btn--round offcanvas-toggle offside-menu"
                            >
                              <img
                                className="img-fluid"
                                height={90}
                                width={90}
                                src={player.playerProfileImg}
                                alt="pic"
                              />
                            </Link>

                          </li>
                        )
                    )}
                  </ul>
                  <div>{user ? <></> : <Link className="login-btn btn" to="/join">Join</Link>}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Header;
