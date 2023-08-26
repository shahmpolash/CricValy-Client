import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AllOrders.css";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const url = "https://powerful-wave-58652-26b956be3d84.herokuapp.com/orders";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>
      <div>
        <div className="">
          <div>
            <ul className="cart-item-list">
              {orders.map((order) => (
                <div className="orders">
                  <li className="single-cart-item">
                    <div className="image">
                      <img
                        width="90"
                        height="90"
                        src={order.productImage}
                        alt="product"
                      />
                    </div>
                    <div className="content">
                      <a href="single-product.html" className="title">
                        {order.productName}
                      </a>
                      <div className="details">
                        <div className="left">
                          <span className="brand">{order.orderStatus}</span>
                          <span className="price">
                            Tk.{" "}
                            {order.productPrice}
                             
                          </span>
                        </div>
                        <div className="right">
                          <div className="product-quantity">
                            <h6>Orders: {order.productQnty} Items</h6>
                          </div>
                        </div>
                      </div>
                      <div className="details">
                        <div className="left">
                          <span>{order.customerName}</span> <br />
                          <span>{order.customerAddress}</span> <br />
                          <span>{order.customerThanaName}</span> <br />
                          <span>{order.customerDistrictName}</span> <br />
                          <span>{order.customerPhoneNumber}</span>
                        </div>
                        <div className="right">
                          <Link className="btn" to={`/admin/order-status/${order._id}`}>Order Status</Link>{" "}
                          <br />
                          <Link className="btn"  to={`/admin/payment-status/${order._id}`}>
                            Payment Status
                          </Link>{" "}
                          <br />
                          <Link className="btn"  to={`/order-delivery/${order._id}`}>
                            Delivery Status
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div className="status">
                    <Button>Order: {order.orderStatus}</Button>
                    <Button>Payment: {order.paymentStatus}</Button>
                    <Button>Delivery: {order.deliveryStatus}</Button>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
