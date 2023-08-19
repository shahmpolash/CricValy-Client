import React from "react";
import { useNavigate } from "react-router-dom";
import  './AddCategory.css';

const AddCategory = () => {
  const navigate = useNavigate();
  

  const handleCategory = (event) => {

    event.preventDefault();
    const categoryName = event.target.categoryName.value;

    
    const newCategory = { categoryName };

    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/add-category`;
        fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newCategory),
        })
          .then((res) => res.json())
          .then((result) => {
            navigate("#");
          });
      };



  return (
    <div>
      <form onSubmit={handleCategory}>
        <ul>
          <li class="single-form-item">
            <input type="text" name="categoryName" placeholder="Category Name" />
          </li>
          <li class="single-form-item">
            <input className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn" type="submit" value="Add Category" />
          </li>
        </ul>
      </form>

      <table id="customers">
        <tr>
          <th>Company</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
        </tr>
      </table>
    </div>
  );
};

export default AddCategory;
