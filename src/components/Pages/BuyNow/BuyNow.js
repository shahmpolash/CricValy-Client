import React, { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../../firebase.init';
import { Button } from "react-bootstrap";

const BuyNow = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [variations, setVariations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedQuantity, setSelectedQuantity] = useState(1); // Initialize with 1
  const [totalPrice, setTotalPrice] = useState(product.productPrice);

  useEffect(() => {
    const updatedTotalPrice = product.productPrice * selectedQuantity;
    setTotalPrice(updatedTotalPrice);
  }, [selectedQuantity, product.productPrice]);

  useEffect(() => {
    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/variations`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setVariations(data));
  }, []);


  useEffect(() => {
    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/product/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const productId = event.target.productId.value;
    const orderStatus = event.target.orderStatus.value;
    const deliveryStatus = event.target.deliveryStatus.value;
    const productName = event.target.productName.value;
    const productImage = event.target.productImage.value;
    const paymentStatus = event.target.paymentStatus.value;
    const productPrice = event.target.productPrice.value;
    const productSize = event.target.productSize.value;
    const productQnty = event.target.productQnty.value;
    const customerEmail = event.target.customerEmail.value;
    const customerName = event.target.customerName.value;
    const customerAddress = event.target.customerAddress.value;
    const customerThanaName = event.target.customerThanaName.value;
    const customerDistrictName = event.target.customerDistrictName.value;
    const customerPhoneNumber = event.target.customerPhoneNumber.value;

    const order = { productId, orderStatus, deliveryStatus, productName, productImage, paymentStatus, productPrice, productSize, productQnty, customerEmail, customerName, customerAddress, customerThanaName, customerDistrictName, customerPhoneNumber };

    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/new-order`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/thank-you");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false); // End loading state in case of an error
      });
  };

  return (
    <div>
      <div class="container">
        <div class="product-gallery-image">
          <div class="swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="product-gallery-single-item">
                  <div class="image">
                    <img
                      class="img-fluid"
                      width="276"
                      height="172"
                      src={product.productImage}
                      alt=""
                    />

                    <div class="image-shape image-shape-1"></div>
                    <div class="image-shape image-shape-2"></div>
                  </div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="product-gallery-single-item">
                  <div class="image">
                    <img
                      class="img-fluid"
                      width="276"
                      height="172"
                      src="assets/images/product/single/product-gallery-single-1.png"
                      alt=""
                    />

                    <div class="image-shape image-shape-1"></div>
                    <div class="image-shape image-shape-2"></div>
                  </div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="product-gallery-single-item">
                  <div class="image">
                    <img
                      class="img-fluid"
                      width="276"
                      height="172"
                      src="assets/images/product/single/product-gallery-single-1.png"
                      alt=""
                    />

                    <div class="image-shape image-shape-1"></div>
                    <div class="image-shape image-shape-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <h2>Total Price: Tk {totalPrice}</h2>
      <form className="add-to-cart" onSubmit={handlePlaceOrder}>
        <ul>
          <li class="single-form-item">
            <input hidden required
              type="text" value={product._id}
              name="productId"
            />
          </li>
          <li class="single-form-item">
            <input hidden required
              type="text" value='Pending'
              name="orderStatus"
            />
          </li>
          <li class="single-form-item">
            <input hidden
              type="text" value='Pending'
              name="deliveryStatus"
            />
          </li>
          <li class="single-form-item">
            <input hidden
              type="text" value='Pending'
              name="paymentStatus"
            />
          </li>
          <li class="single-form-item">
            <input hidden required
              type="text" value={product.productName}
              name="productName"
              placeholder="Product Name"
            />
          </li>
          <li class="single-form-item">
            <input hidden
              type="text" value={product.productImage}
              name="productImage"
              placeholder="Product Name"
            />
          </li>

          <li class="single-form-item">
            <input hidden
              type="number"
              disabled
              value={totalPrice}
              name="productPrice"
              placeholder="Price"
            />
          </li>
          <li class="single-form-item">
            <label>Size</label>
            <select name="productSize">
              {
                variations.map(variation => variation.productCategory === product.productCategory &&
                  <option value={variation.variationValue}>{variation.variationValue}</option>
                )
              }

            </select>
          </li>

          <li class="single-form-item">
            <label>Quentity</label>
            <input
            required
            type="number"
            name="productQnty"
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(e.target.value)}
          />
          </li>
          <li class="single-form-item">
            <input required
              type="email"
              name="customerEmail"
              value={user?.email}
            />
          </li>
          <li class="single-form-item">
            <input required
              type="text"
              name="customerName"
              placeholder="Your Full Name"
            />
          </li>
          <li class="single-form-item">
            <input required
              type="text"
              name="customerAddress"
              placeholder="Your Address"
            />
          </li>
          <li class="single-form-item">
            <input required
              type="text"
              name="customerThanaName"
              placeholder="Thana/Upozila"
            />
          </li>
          <li class="single-form-item">
            <input required
              type="text"
              name="customerDistrictName"
              placeholder="Districe"
            />
          </li>
          <li class="single-form-item">
            <input required
              type="number"
              name="customerPhoneNumber"
              placeholder="Phone Number"
            />
          </li>
          <li class="single-form-item">
            <input
              className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center register-space-top"
              type="submit"
              value={isLoading ? "Order Placing..." : "Place Order Now"}
              disabled={isLoading}
            />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default BuyNow;