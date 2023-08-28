import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddAcademy = () => {
  const navigate = useNavigate();
  const [districts, setDristricts] = useState([]);

  useEffect(() => {
    fetch(`https://powerful-wave-58652-26b956be3d84.herokuapp.com/districts`)
      .then((res) => res.json())
      .then((info) => setDristricts(info));
  }, []);

  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        key: "e3a766c99e397158b5668ccd3ed717ff", // Replace with your ImgBB API key
      },
    });

    return response.data.data.url;
  };

  const handleAcademy = async (event) => {
    event.preventDefault();
    const district = event.target.district.value;
    const academyName = event.target.academyName.value;
    const academyAddress = event.target.academyAddress.value;
    const academyPhoneNumber = event.target.academyPhoneNumber.value;
    const coachName = event.target.coachName.value;
    const admissionFee = event.target.admissionFee.value;
    const monthlyFee = event.target.monthlyFee.value;
    const practiceDate = event.target.practiceDate.value;
    const practiceTime = event.target.practiceTime.value;
    const aboutAcademy = event.target.aboutAcademy.value;

    try {
      const coverPhotoUrl = await uploadImageToImgBB(event.target.academyCoverPhoto.files[0]);
      const profilePhotoUrl = await uploadImageToImgBB(event.target.academyProfilePhoto.files[0]);
      const academyPhotoOneUrl = await uploadImageToImgBB(event.target.academyPhotoOne.files[0]);
      const academyPhotoTwoUrl = await uploadImageToImgBB(event.target.academyPhotoTwo.files[0]);
      const academyPhotoThreeUrl = await uploadImageToImgBB(event.target.academyPhotoThree.files[0]);
      const academyPhotoFourUrl = await uploadImageToImgBB(event.target.academyPhotoFour.files[0]);

      const newAcademy = {
        district,
        academyName,
        academyCoverPhoto: coverPhotoUrl,
        academyProfilePhoto: profilePhotoUrl,
        academyAddress,
        academyPhoneNumber,
        practiceDate,
        practiceTime,
        coachName,
        admissionFee,
        monthlyFee,
        aboutAcademy,
        academyPhotoOne: academyPhotoOneUrl,
        academyPhotoTwo: academyPhotoTwoUrl,
        academyPhotoThree: academyPhotoThreeUrl,
        academyPhotoFour: academyPhotoFourUrl,
      };

      const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/academy`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newAcademy),
      });

      if (response.ok) {
        const result = await response.json();
        navigate("/");
      } else {
        console.error("Error uploading data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAcademy}>
        <ul>
        <select name="district">
          {districts.map((district) => (
            <option value={district.districtName}>
              {district.districtName}
            </option>
          ))}
        </select>

        <li class="single-form-item">
          <input
            type="text"
            name="academyName"
            placeholder="Academy Name"
          ></input>{" "}
          <br />
        </li>

        <li class="single-form-item">
          <lebel>Add Cover Photo</lebel>
          <input
            type="file"
            name="academyCoverPhoto"
            placeholder="Academy Cover Photo"
          ></input>{" "}
          <br />
        </li>

        <li class="single-form-item">
        <lebel>Add Academy Profile Photo</lebel>
          <input
            type="file"
            name="academyProfilePhoto"
            placeholder="Academy Profile Picture"
          ></input>{" "}
          <br />
        </li>

        <li class="single-form-item">
          <input
            type="text"
            name="academyAddress"
            placeholder="Academy Address"
          ></input>{" "}
          <br />
        </li>
        <li class="single-form-item">
          <input
            type="text"
            name="academyPhoneNumber"
            placeholder="Academy Phone Number"
          ></input>{" "}
          <br />
        </li>

        <li class="single-form-item">
          <input
            type="text"
            name="practiceDate"
            placeholder="Practice Date Sat - Wed"
          ></input>{" "}
          <br />
        </li>
        <li class="single-form-item">
          <input
            type="text"
            name="practiceTime"
            placeholder="Practice Time: 8am - 11am"
          ></input>{" "}
          <br />
        </li>
        <li class="single-form-item">
          <input
            type="text"
            name="coachName"
            placeholder="Coach Name"
          ></input>{" "}
          <br />
        </li>
        <li class="single-form-item">
          <input
            type="number"
            name="admissionFee"
            placeholder="Admission Fee"
          ></input>{" "}
          <br />
        </li>
        <li class="single-form-item">
          <input
            type="number"
            name="monthlyFee"
            placeholder="Monthly Fee"
          ></input>{" "}
          <br />
        </li>

        <li class="single-form-item">
          <input
            type="file"
            name="academyPhotoOne"
            placeholder="Photo One"
          ></input>{" "}
          <br />
        </li>
        <li class="single-form-item">
          <input
            type="file"
            name="academyPhotoTwo"
            placeholder="Photo Two"
          ></input>{" "}
          <br />
        </li>

        <li class="single-form-item">
          <input
            type="file"
            name="academyPhotoThree"
            placeholder="Photo Three"
          ></input>{" "}
          <br />
        </li>

        <li class="single-form-item">
          <input
            type="file"
            name="academyPhotoFour"
            placeholder="Photo Four"
          ></input>{" "}
          <br />
        </li>
        <li class="single-form-item">
          <textarea
            type="text"
            name="aboutAcademy"
            placeholder="About Academy"
          ></textarea>{" "}
          <br />
        </li>
        <li class="single-form-item">
        <input
          className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn"
          type="submit"
          value="Add Academy"
        ></input>
        </li>
        </ul>
        
      </form>
    </div>
  );
};

export default AddAcademy;
