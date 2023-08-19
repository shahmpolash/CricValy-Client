import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PaymentStatus = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/order/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);


  const handleOrderStatus = (event) => {
    event.preventDefault();
    const orderStatus = event.target.orderStatus.value;

    const status = {orderStatus};

    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/order/${order._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(status),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/all-orders");
      });
  };

  return (
    <div>
      <h2>{order.productName}</h2>
      <form onSubmit={handleOrderStatus}> 
        <ul>
          <li class="single-form-item">
            <select name="paymentStatus">
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Received">Received</option>
              <option value="Refunded">Refunded</option>
            </select>
          </li>
       
          <li class="single-form-item">
            <input
              className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn"
              type="submit"
              value="Update Order Status"
            />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default PaymentStatus;
