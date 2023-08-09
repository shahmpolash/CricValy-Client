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
    fetch(`http://localhost:5000/players`)
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
                  <a
                    href="#mobile-menu-offcanvas"
                    area-label="mobile menu offcanvas svg icon"
                    className="btn btn--size-33-33 btn--center btn--round btn--color-radical-red btn--bg-white btn--box-shadow main-menu offcanvas-toggle offside-menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                    >
                      <g
                        id="Group_1"
                        data-name="Group 1"
                        transform="translate(-28 -63)"
                      >
                        <path
                          id="Rectangle_3"
                          data-name="Rectangle 3"
                          d="M0,0H5A2,2,0,0,1,7,2V5A2,2,0,0,1,5,7H2A2,2,0,0,1,0,5V0A0,0,0,0,1,0,0Z"
                          transform="translate(28 63)"
                          fill="#ff375f"
                        />
                        <path
                          id="Rectangle_6"
                          data-name="Rectangle 6"
                          d="M2,0H5A2,2,0,0,1,7,2V5A2,2,0,0,1,5,7H0A0,0,0,0,1,0,7V2A2,2,0,0,1,2,0Z"
                          transform="translate(28 72)"
                          fill="#ff375f"
                        />
                        <path
                          id="Rectangle_4"
                          data-name="Rectangle 4"
                          d="M2,0H7A0,0,0,0,1,7,0V5A2,2,0,0,1,5,7H2A2,2,0,0,1,0,5V2A2,2,0,0,1,2,0Z"
                          transform="translate(37 63)"
                          fill="#ff375f"
                        />
                        <path
                          id="Rectangle_5"
                          data-name="Rectangle 5"
                          d="M2,0H5A2,2,0,0,1,7,2V7A0,0,0,0,1,7,7H2A2,2,0,0,1,0,5V2A2,2,0,0,1,2,0Z"
                          transform="translate(37 72)"
                          fill="#ff375f"
                        />
                      </g>
                    </svg>
                  </a>
                </li>
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
                            <a
                              href="#profile-menu-offcanvas"
                              area-label="User"
                              className="btn btn--size-33-33 btn--center btn--round offcanvas-toggle offside-menu"
                            >
                              <img
                                className="img-fluid"
                                height={70}
                                width={70}
                                src={player.playerProfileImg}
                                alt="pic"
                              />
                            </a>

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
      <div
        id="mobile-menu-offcanvas"
        className="offcanvas offcanvas-leftside offcanvas-mobile-menu-section"
      >
        <div className="offcanvas-header flex-end">
          <div className="logo">
            <a href="index.html">
              <img
                className="img-fluid"
                width={147}
                height={26}
                src="assets/images/logo.png"
                alt="image"
              />
            </a>
          </div>
          <button className="offcanvas-close" aria-label="offcanvas svg icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5.973"
              height="10.449"
              viewBox="0 0 5.973 10.449"
            >
              <path
                id="Icon_ionic-ios-arrow-back"
                data-name="Icon ionic-ios-arrow-back"
                d="M13.051,11.417,17,7.466a.747.747,0,0,0-1.058-1.054l-4.479,4.476a.745.745,0,0,0-.022,1.03l4.5,4.507A.747.747,0,1,0,17,15.37Z"
                transform="translate(-11.251 -6.194)"
              />
            </svg>
          </button>
        </div>
        <div className="offcanvas-mobile-menu-wrapper">
          {/* Start Mobile Menu  */}
          <div className="mobile-menu-bottom">
            {/* Start Mobile Menu Nav */}
            <div className="offcanvas-menu">
              <ul>
                <li>
                  <a href="index.html">
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>Shop</span>
                  </a>
                  <ul className="mobile-sub-menu">
                    <li>
                      <a href="shop.html">Shop</a>
                    </li>
                    <li>
                      <a href="single-product.html">Product</a>
                    </li>
                    <li>
                      <a href="shop-category.html">Shop Category</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">
                    <span>Pages</span>
                  </a>
                  <ul className="mobile-sub-menu">
                    <li>
                      <a href="chat.html">Chat</a>
                    </li>
                    <li>
                      <a href="cart.html">Cart</a>
                    </li>
                    <li>
                      <a href="wishlist.html">Wishlist</a>
                    </li>
                    <li>
                      <a href="order.html">Order</a>
                    </li>
                    <li>
                      <a href="login.html">Login</a>
                    </li>
                    <li>
                      <a href="register.html">Register</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>{" "}
            {/* End Mobile Menu Nav */}
          </div>{" "}
          {/* End Mobile Menu */}
          {/* Start Mobile contact Info */}
          <div className="mobile-contact-info">
            <address className="address">
              <span>Address: 4710-4890 Breckinridge St, Fayettevill</span>
              <span>Call Us: (+800) 345 678, (+800) 123 456</span>
              <span>Email: yourmail@mail.com</span>
            </address>
          </div>
          {/* End Mobile contact Info */}
        </div>{" "}
      </div>{" "}
      <div
        id="profile-menu-offcanvas"
        className="offcanvas offcanvas-rightside"
      >
        {/* Start Offcanvas Header */}
        <div className="offcanvas-header flex-start offcanvas-modify">
          <button className="offcanvas-close" aria-label="offcanvas svg icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5.973"
              height="10.449"
              viewBox="0 0 5.973 10.449"
            >
              <path
                id="Icon_ionic-ios-arrow-back"
                data-name="Icon ionic-ios-arrow-back"
                d="M13.051,11.417,17,7.466a.747.747,0,0,0-1.058-1.054l-4.479,4.476a.745.745,0,0,0-.022,1.03l4.5,4.507A.747.747,0,1,0,17,15.37Z"
                transform="translate(-11.251 -6.194)"
              />
            </svg>
          </button>
          <span>Home</span>
        </div>{" "}
        {/* End Offcanvas Header */}
        {/* Start Offcanvas Mobile Menu Wrapper */}
        <div className="offcanvas-profile-menu-wrapper">
          {/* ...:::Start Profile Card Section:::... */}
          <div className="profile-card-section section-gap-top-25">
            <div className="profile-card-wrapper">
              <div className="image">
                <img
                  className="img-fluid"
                  width={96}
                  height={96}
                  src="assets/images/user/user-profile.png"
                  alt="image"
                />
              </div>
              <div className="content">
                <h2 className="name">Kajavasta Moon</h2>
                <span className="email">moon@example.com</span>
                <span className="id-num">ID NO: EXMPL 4566</span>
              </div>
              <div className="profile-shape profile-shape-1">
                <img
                  className="img-fluid"
                  width={61}
                  height={50}
                  src="assets/images/profile-shape-1.svg"
                  alt="image"
                />
              </div>
              <div className="profile-shape profile-shape-2">
                <img
                  className="img-fluid"
                  width={48}
                  height={59}
                  src="assets/images/profile-shape-2.svg"
                  alt="image"
                />
              </div>
            </div>
          </div>
          <div className="profile-details-section section-gap-top-30">
            <div className="profile-details-wrapper">
              <div className="profile-details-top">
                <div className="left">
                  <span className="text">Total Buy</span>
                  <span className="price">$2000.00</span>
                </div>
                <div className="right">
                  <button
                    aria-label="Wishlist"
                    className="btn btn--size-58-58 btn--font-size-22 btn--center btn--round btn--color-radical-red btn--bg-white btn--box-shadow"
                  >
                    <i className="icon icon-carce-heart" />
                  </button>
                </div>
              </div>
              <div className="profile-details-bottom">
                <ul className="profile-user-list">
                  <li className="profile-list-item">
                    <ul className="profile-single-list">
                      <li className="list-item">
                        <span className="title">Setting</span>
                      </li>
                      <li className="list-item">
                        <a
                          href="profile-settings.html"
                          className="profile-link"
                        >
                          <span className="icon">
                            <i className="icon icon-carce-user" />
                          </span>
                          Account Setting
                        </a>
                      </li>
                      <li className="list-item">
                        <a href="checkout.html" className="profile-link">
                          <span className="icon">
                            <i className="icon icon-carce-briefcase" />
                          </span>
                          Billing &amp; Payment
                        </a>
                      </li>
                      <li className="list-item">
                        <a href="notification.html" className="profile-link">
                          <span className="icon">
                            <i className="icon icon-carce-bell" />
                          </span>
                          Notification
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="profile-list-item">
                    <ul className="profile-single-list">
                      <li className="list-item">
                        <a href="login.html" className="profile-link">
                          <span className="icon">
                            <i className="icon icon-carce-login" />
                          </span>
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Header;
