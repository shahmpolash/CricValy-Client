import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useNavigate } from "react-router-dom";

const TestCart = () => {
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = 'https://powerful-wave-58652-26b956be3d84.herokuapp.com/orders';
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  useEffect(() => {
    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/cart-items`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setItems(data.filter(item => item.customerEmail === user?.email && item.placedOrder === "No")));
  }, [user]);

  const calculateSubtotal = () => {
    let subtotal = 0;
    items.forEach((item) => {
      subtotal += parseFloat(item.productPrice) * parseFloat(item.productQnty);
    });
    return subtotal.toFixed(2);
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const orders = {
      customerEmail: event.target.customerEmail.value,
      orderStatus: event.target.orderStatus.value,
      items: items.map((item) => ({
        productName: item.productName,
        productImage: item.productImage,
        productId: item._id,
      }))
    };

    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/new-order`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orders),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/");
      });
  };

  return (
    <div>
        {
            orders.map(order=> order.customerEmail === user?.email &&
                <div>
                    {Array.isArray(order.items) ? (
                        <div>
                            {
                                order.items.map(i => <>{
                                    items.map(item=> item.customerEmail === order.customerEmail && <li>{i.productName}</li>)
                                }</>)

                            }
                        </div>
                    ) : (
                        <></>
                    )
                    }
                </div>
                )
        }
      <div className="cart-section section-gap-top-30">
        <div className="container">
          <div className="cart-items-wrapper">
            <ul className="cart-item-list">
              {orders.map((order) => (
                <div key={order._id}>
                  {Array.isArray(order.items) ? (
                    <ul>
                      {order.items.map((pro) => (
                        <React.Fragment key={pro._id}>
                          {items.map((item) => (
                            item.customerEmail === user?.email &&
                            item._id === pro.productId && (
                              <li className="single-cart-item" key={item._id}>
                                <div className="image">
                                  <img width="90" height="90" src={item.productImage} alt="product" />
                                </div>
                                <div className="content">
                                  <button className="delete-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                      <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216zm94.8-285.3L281.5 256l69.3 69.3c4.7 4.7 4.7 12.3 0 17l-8.5 8.5c-4.7 4.7-12.3 4.7-17 0L256 281.5l-69.3 69.3c-4.7 4.7-12.3 4.7-17 0l-8.5-8.5c-4.7-4.7-4.7-12.3 0-17l69.3-69.3-69.3-69.3c-4.7-4.7-4.7-12.3 0-17l8.5-8.5c4.7-4.7 12.3-4.7 17 0l69.3 69.3 69.3-69.3c4.7-4.7 12.3-4.7 17 0l8.5 8.5c4.6 4.7 4.6 12.3 0 17z" />
                                    </svg>
                                  </button>
                                  <a href="single-product.html" className="title">{item.productName}</a>
                                  <div className="details">
                                    <div className="left">
                                      <span className="brand">{item.customerEmail}</span>
                                      <span className="price">Tk. {parseFloat(item.productPrice) * parseFloat(item.productQnty)}</span>
                                    </div>
                                    <div className="right">
                                      <div className="product-quantity">
                                        <div className="num-block skin-2">
                                          <div className="num-in">
                                            <span className="minus dis"></span>
                                            <label htmlFor="quan-1" className="visually-hidden"></label>
                                            <input id="quan-1" type="text" className="in-num" value={item.productQnty} readOnly="" />
                                            <span className="plus"></span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )
                          ))}
                        </React.Fragment>
                      ))}
                    </ul>
                  ) : (
                    <p>{order.items}</p>
                  )}
                </div>
              ))}
            </ul>

            <ul className="cart-info-list">
              <li className="cart-info-single-list">
                <ul className="cart-info-child">
                  <li className="item">
                    <span className="text-left">Subtotal</span>{" "}
                    <span className="text-right">$ {calculateSubtotal()}</span>
                  </li>
                </ul>
              </li>
              <li className="cart-info-single-list">
                <ul className="cart-info-child">
                  <li className="item">
                    <span className="text-left">Shipping</span>{" "}
                    <span className="text-right">$100.00</span>
                  </li>
                  <li className="item">
                    <span className="text-left">Tax</span>{" "}
                    <span className="text-right">$40.00</span>
                  </li>
                </ul>
              </li>
              <li className="cart-info-single-list">
                <ul className="cart-info-child">
                  <li className="item">
                    <span className="text-left">Grand Total</span>{" "}
                    <span className="total-price">$ {(
                      parseFloat(calculateSubtotal()) +
                      parseFloat(100.00) +
                      parseFloat(40.00)
                    ).toFixed(2)}</span>
                    <a href="checkout.html" className="btn">
                      <span className="icon">
                        <i className="icon icon-carce-check-circle"></i>
                      </span>
                      Check out
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form onSubmit={handlePlaceOrder}>
              <input type="text" name='customerEmail' value={user?.email} />
              <input type="text" name='orderStatus' value='OrderPlaced' />
              <textarea
                value={items.map((item) => `${item.productName} ${item.productPrice} ${item.productQnty} ${item.productSize} (${item._id})`).join("\n")}
                name="items"
                readOnly
              ></textarea>
              <input type="submit" value="Place Order" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCart;
