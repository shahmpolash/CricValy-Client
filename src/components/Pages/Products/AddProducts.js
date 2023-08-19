import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const url = "https://powerful-wave-58652-26b956be3d84.herokuapp.com/categories";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleProduct = (event) => {
    event.preventDefault();
    const productName = event.target.productName.value;
    const productCategory = event.target.productCategory.value;
    const productPrice = event.target.productPrice.value;
    const productDetails = event.target.productDetails.value;
    const productImage = event.target.productImage.value;

    const newProduct = {
      productName,
      productCategory,
      productPrice,
      productDetails,
      productImage,
    };

    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/add-product`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("#");
      });
  };

  return (
    <div>
      <form onSubmit={handleProduct}>
        <ul>
          <li class="single-form-item">
            <input type="text" name="productName" placeholder="Product Name" />
          </li>
          <li class="single-form-item">
            <select name="productCategory">
              {categories.map((category) => (
                <option value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </li>
          <li class="single-form-item">
            <input type="number" name="productPrice" placeholder="Price" />
          </li>
          
          <li class="single-form-item">
            <textarea
              type="text"
              name="productDetails"
              placeholder="Product Details"
            />
          </li>
          <li class="single-form-item">
            <input
              type="text"
              name="productImage"
              placeholder="Product Image"
            />
          </li>
          <li class="single-form-item">
            <input
              className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn"
              type="submit"
              value="Add Product"
            />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default AddProducts;
