import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddDistricts = () => {
    const navigate = useNavigate();

    const handleDistrict = (event) => {
        event.preventDefault();
        const districtName = event.target.districtName.value;

        
    
        const newDistict = {districtName};

        const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/district`;
        fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newDistict),
        })
          .then((res) => res.json())
          .then((result) => {
            navigate("/");
          });
      };
    return (
        <div>
            <form onSubmit={handleDistrict}>
    <ul>
      <li class="single-form-item">
        <input type="text" name="districtName" placeholder="Add Distict" />
      </li>
      
      <li class="single-form-item">
        <input className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn" type="submit" value="Create your profile" />
      </li>
    </ul>
  </form>
        </div>
    );
};

export default AddDistricts;