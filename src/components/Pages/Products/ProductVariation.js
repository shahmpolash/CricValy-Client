import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductVariation = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = "https://powerful-wave-58652-26b956be3d84.herokuapp.com/categories";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleProductVariation = (event) => {
    event.preventDefault();
    const variationName = event.target.variationName.value;
    const productCategory = event.target.productCategory.value;
    const variationValue = event.target.variationValue.value;

    const newVariation = {
      variationName,
      productCategory,
      variationValue,
    };

    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/add-variation`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newVariation),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("#");
      });
  };
  return (
    <div>
      <form onSubmit={handleProductVariation}>
        <ul>
          <li class="single-form-item">
            <select name="variationName">
              <option value="Size">Size</option>
              <option value="Color">Color</option>
              <option value="Weight">Weigth</option>
            </select>
          </li>
          <li class="single-form-item">
            <input
              type="text"
              name="variationValue"
              placeholder="Size or Color"
            />
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
            <input
              className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn"
              type="submit"
              value="Add Variation"
            />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default ProductVariation;
