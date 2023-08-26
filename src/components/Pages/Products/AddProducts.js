import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    const url = "https://powerful-wave-58652-26b956be3d84.herokuapp.com/categories";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleProduct = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true

    const productName = event.target.productName.value;
    const productCategory = event.target.productCategory.value;
    const productPrice = event.target.productPrice.value;
    const productLongDetails = event.target.productLongDetails.value;
    const productShortDetails = event.target.productShortDetails.value;
    const productImage = event.target.productImage.files[0];
    const productImageTwo = event.target.productImageTwo.files[0];
    const productImageThree = event.target.productImageThree.files[0];

    const imgbbApiKey = "e3a766c99e397158b5668ccd3ed717ff";
    const imgbbUploadUrl = "https://api.imgbb.com/1/upload";

    try {
      const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("key", imgbbApiKey);
        const response = await fetch(imgbbUploadUrl, {
          method: "POST",
          body: formData,
        });
        const imgbbData = await response.json();
        return imgbbData.data.url;
      };

      const productImageUrl = await uploadImage(productImage);
      const productImageTwoUrl = await uploadImage(productImageTwo);
      const productImageThreeUrl = await uploadImage(productImageThree);

      const newProduct = {
        productName,
        productCategory,
        productPrice,
        productLongDetails,
        productShortDetails,
        productImage: productImageUrl,
        productImageTwo: productImageTwoUrl,
        productImageThree: productImageThreeUrl,
      };

      const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/add-product`;
      const postResponse = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (postResponse.ok) {
        setIsLoading(false); // Set loading state back to false
        navigate("#");
      } else {
        console.error("Failed to add product.");
        setIsLoading(false); // Set loading state back to false in case of error
      }
    } catch (error) {
      console.error("Error uploading image or adding product:", error);
      setIsLoading(false); // Set loading state back to false in case of error
    }
  };

  return (
    <div>
      <form onSubmit={handleProduct}>
        <ul>
          <li className="single-form-item">
            <input type="text" name="productName" placeholder="Product Name" />
          </li>
          <li className="single-form-item">
            <select name="productCategory">
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </li>
          <li className="single-form-item">
            <input type="number" name="productPrice" placeholder="Price" />
          </li>
          <li className="single-form-item">
            <textarea
              type="text"
              name="productShortDetails"
              placeholder="Product Short Information"
            />
          </li>
          <li className="single-form-item">
            <textarea
              type="text"
              name="productLongDetails"
              placeholder="Product Details"
            />
          </li>
          <li className="single-form-item">
            <input
              type="file"
              accept="image/*"
              name="productImage"
              placeholder="Product Image"
            />
          </li>
          <li className="single-form-item">
            <input
              type="file"
              accept="image/*"
              name="productImageTwo"
              placeholder="Product Image 2"
            />
          </li>
          <li className="single-form-item">
            <input
              type="file"
              accept="image/*"
              name="productImageThree"
              placeholder="Product Image 3"
            />
          </li>
          <li className="single-form-item">
            <input
              className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn"
              type="submit"
              value={isLoading ? "Adding..." : "Add Product"} // Button label changes based on loading state
              disabled={isLoading} // Disable button while loading
            />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default AddProducts;
