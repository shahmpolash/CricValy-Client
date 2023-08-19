import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [user] = useAuthState(auth);


  useEffect(() => {
    const url = 'https://powerful-wave-58652-26b956be3d84.herokuapp.com/orders';
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>
      <div className="cart-section section-gap-top-30">
        <div className="container">
          <div className="cart-items-wrapper">
            <ul className="cart-item-list">
             {
              orders.map(order => order.customerEmail === user?.email &&
                <li className="single-cart-item">
                    <div className="image">
                      <img width="90" height="90" src={order.productImage} alt="product" />
                    </div>
                    <div className="content">
                      <button className="delete-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216zm94.8-285.3L281.5 256l69.3 69.3c4.7 4.7 4.7 12.3 0 17l-8.5 8.5c-4.7 4.7-12.3 4.7-17 0L256 281.5l-69.3 69.3c-4.7 4.7-12.3 4.7-17 0l-8.5-8.5c-4.7-4.7-4.7-12.3 0-17l69.3-69.3-69.3-69.3c-4.7-4.7-4.7-12.3 0-17l8.5-8.5c4.7-4.7 12.3-4.7 17 0l69.3 69.3 69.3-69.3c4.7-4.7 12.3-4.7 17 0l8.5 8.5c4.6 4.7 4.6 12.3 0 17z" />
                        </svg>
                      </button>
                      <a href="single-product.html" className="title">{order.productName}</a>
                      <div className="details">
                        <div className="left">
                          <span className="brand">{order.orderStatus}</span>
                          <span className="price">Tk. {parseFloat(order.productPrice) * parseFloat(order.productQnty)}</span>
                        </div>
                        <div className="right">
                          <div className="product-quantity">
                            <h6>Orders: {order.productQnty} Items</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </li>)

             }
            </ul>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
