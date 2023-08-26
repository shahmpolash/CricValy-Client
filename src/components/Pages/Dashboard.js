import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import "./Dashboard.css";
import { signOut } from 'firebase/auth';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [orders, setOrders] = useState([]);
  const logout = () => {
    signOut(auth);
  };


  useEffect(() => {
    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/matches`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMatches(data));
  }, []);

  useEffect(() => {
    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/orders`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  useEffect(() => {
    fetch(`https://powerful-wave-58652-26b956be3d84.herokuapp.com/players`)
      .then((res) => res.json())
      .then((info) => setPlayers(info));
  }, []);

  return (
    <div>
      {players.filter((p) => p.playerEmail === user?.email).length === 0 && (
        <div className="hero-section">
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
                          src="https://img.freepik.com/premium-vector/abstract-smooth-blur-color-gradient-background-website-banner-paper-card-decorative-design_120819-484.jpg"
                          alt="cover"
                        />
                      </div>
                      <div className="inner-wrapper">
                        <div className="dashboard-banner">
                          <h1>Please</h1>
                          <div className="score">
                            <div className="runs">
                              <h3>Update Your</h3>
                            </div>
                            <div className="wkts">
                              <h3>Cricket Profile</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn"
            href="/add-profile"
          >
            Update Your Cricket Profile
          </a>
        </div>
      )}
      {players.filter((p) => p.playerEmail === user?.email).length === 1 && (
        <div className="hero-section">
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
                          src="https://img.freepik.com/premium-vector/abstract-smooth-blur-color-gradient-background-website-banner-paper-card-decorative-design_120819-484.jpg"
                          alt="cover"
                        />
                      </div>
                      {players.map(
                        (player) =>
                          player.playerEmail === user?.email && (
                            <div className="inner-wrapper">
                              <div className="dashboard-banner">
                                <h2>Hi,</h2>
                                <h1>{player.playerName}</h1>
                                <div className="score">
                                  <div className="runs">
                                    <h3>Your total runs: {player.totalRuns}</h3>
                                  </div>
                                  <div className="wkts">
                                    <h3>
                                      Your total wkts: {player.totalWickets}
                                    </h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="all-cards">
                <div className="cards">
                  <div className="single">
                    <div className="card-one">
                      {players.map(
                        (player) =>
                          player.playerEmail === user?.email && (
                            <Link class="btn" to={`/last-match/${player._id}`}>
                              <img
                                src="https://i.ibb.co/S6JXTBX/add-match.png"
                                alt=""
                              />
                            </Link>
                          )
                      )}
                    </div>
                    <div className="text">
                      <p>New Match</p>
                    </div>
                  </div>

                  <div className="single">
                    <div className="card-two">
                      {players.map(
                        (player) =>
                          player.playerEmail === user?.email && (
                            <Link class="btn" to={`/update`}>
                              <img
                                src="https://i.ibb.co/nz8Jn21/update.png"
                                alt=""
                              />
                            </Link>
                          )
                      )}
                    </div>
                    <div className="text">
                      <p>Update</p>
                    </div>
                  </div>

                  <div className="single">
                    <div className="card-three">
                      {players.map(
                        (player) =>
                          player.playerEmail === user?.email && (
                            <Link
                              class="btn"
                              to={`/edit-profile/${player._id}`}
                            >
                              <img
                                src="https://i.ibb.co/CtXG2Ny/edit.png"
                                alt=""
                              />
                            </Link>
                          )
                      )}
                    </div>
                    <div className="text">
                      <p>Edit</p>
                    </div>
                  </div>

                  <div className="single">
                    <div className="card-four">
                      {players.map(
                        (player) =>
                          player.playerEmail === user?.email && (
                            <Link class="btn" to={`/player/${player._id}`}>
                              <img
                                src="https://i.ibb.co/PT8P9sj/profile.png"
                                alt=""
                              />
                            </Link>
                          )
                      )}
                    </div>
                    <div className="text">
                      <p>My Profile</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="title">
                <h1>Your recent matches</h1>
              </div>

              <table id="customers">
                <tr>
                  <th>Date</th>
                  <th>R</th>
                  <th>B</th>
                  <th>W</th>
                  <th>O</th>
                  <th>T</th>
                  <th>Vs T</th>
                  <th></th>
                </tr>

                {matches.map(
                  (match) =>
                    match.playerEmail === user?.email && (
                      <tr>
                        <td>{match.date}</td>
                        <td>{match.runs}</td>
                        <td>{match.ballFaced}</td>
                        <td>{match.wikts}</td>
                        <td>{match.overs}</td>
                        <td>{match.teamName}</td>
                        <td>{match.aganistTeam}</td>
                        <td>{match.outOrNotOut}</td>
                      </tr>
                    )
                )}
              </table>
              {matches.filter((match) => match.playerEmail === user?.email)
                .length === 0 && (
                <ul>
                  <li>
                    {players.map(
                      (player) =>
                        player.playerEmail === user?.email && (
                          <Link
                            className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn"
                            to={`/last-match/${player._id}`}
                          >
                            Add Your Last Match Recoard
                          </Link>
                        )
                    )}
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="my-orders btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn">
        <h1>My Orders</h1>
      </div>
      <table id="customers">
                <tr>
                  <th>Product</th>
                  <th>Qnty</th>
                  <th>Amount</th>
                  <th>Order Status</th>
                  <th>Delivery Status</th>
                </tr>
                {
                    orders.map(order=> order.customerEmail === user?.email &&
                      <tr>
                        <td>{order.productName}</td>
                        <td>{order.productQnty}</td>
                        <td>{order.productPrice} Tk</td>
                        <td>{order.orderStatus}</td>
                        <td>{order.deliveryStatus}</td>
                      </tr>)

                    
                  }
              </table>

       <div class="single-form-item">
        <input
          className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn"
          type="submit"
          value="Logout" onClick={logout}
        ></input>
        </div>
    </div>
  );
};

export default Dashboard;
