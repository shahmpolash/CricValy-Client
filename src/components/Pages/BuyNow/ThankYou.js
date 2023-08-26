import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { Link } from "react-router-dom";


const ThankYou = () => {
  const [orders, setOrders] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`https://powerful-wave-58652-26b956be3d84.herokuapp.com/orders`)
      .then((res) => res.json())
      .then((info) => {
        setOrders(info);
        
      });

  }, []);
   
  return (
    <div>
        <div className="my-orders btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn">
        <h1>Thanks for order.</h1>
      </div>
        <div className="my-orders btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn">
        <Link to='/dashboard'>Go to Dashboard</Link>
      </div>
      <div className="my-orders btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn">
        <h1>Your Recent Orders</h1>
      </div>
      <table id="customers">
                <tr>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Qnty</th>
                  <th>Order Status</th>
                  <th>Delivery Status</th>
                </tr>
                {
                    orders.map(order=> order.customerEmail === user?.email &&
                      <tr>
                        <td><Link to={`/product/${order.productId}`}>{order.productName}</Link></td>
                        <td>{order.productPrice} Tk</td>
                        <td>{order.productQnty}</td>
                        <td>{order.orderStatus}</td>
                        <td>{order.deliveryStatus}</td>
                      </tr>).reverse()

                    
                  }
              </table>
    </div>
  );
};

export default ThankYou;
