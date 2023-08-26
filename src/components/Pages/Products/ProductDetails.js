import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../../../../src/firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import './ProductDetails.css';
import { Button } from "react-bootstrap";

const ProductDetails = () => {

  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  

  useEffect(() => {
    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/product/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);


  return (
    <div>
      <div class="product-single-section section-gap-top-30">
        <div class="container">
          <div class="product-gallery-image">
            <div class="swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="product-gallery-single-item">
                    <div class="image product-details-image">
                      <img
                        class="img-fluid"
                        width="276"
                        height="172"
                        src={product.productImage}
                        alt="product Img"
                      />
                    </div>
                    <ul>
                    <li className="single-form-item price btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn">
                    <Link to={`/buy-now/${product._id}`} className="">Price: Tk {product.productPrice}</Link>
                    </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>

        <div class="container px-0">
          <div class="product-gallery-details">
            <h1 class="title">{product.productName}</h1>
            <div className="product-short">{product.productShortDetails}</div>
            <div class="image product-details-image">
                      <img
                        class="img-fluid"
                        width="276"
                        height="172"
                        src={product.productImageTwo}
                        alt="product Img"
                      />
                    </div>
            <div className="product-details">{product.productLongDetails}</div>
            <div class="image product-details-image">
                      <img
                        class="img-fluid"
                        width="276"
                        height="172"
                        src={product.productImageThree}
                        alt="product Img"
                      />
                    </div>

              <ul>
                <li class="single-form-item">
                  <Link to={`/buy-now/${product._id}`} className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn">Buy Now</Link>
                </li>
              </ul>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
