import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";
import axios from "axios";
import "./AddProfile.css";

const AddProfile = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [players, setPlayers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`https://powerful-wave-58652-26b956be3d84.herokuapp.com/players`)
      .then((res) => res.json())
      .then((info) => setPlayers(info));
  }, []);

  const handlePlayerProfile = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading state
    
    const playerName = event.target.playerName.value;
    const updated = event.target.updated.value;
    const playerEmail = event.target.playerEmail.value;
    const dateOfBirth = event.target.dateOfBirth.value;
    const playerRole = event.target.playerRole.value;
    const teamName = event.target.teamName.value;
    const totalMatches = event.target.totalMatches.value;
    const totalRuns = event.target.totalRuns.value;
    const totalWickets = event.target.totalWickets.value;
    const heightRuns = event.target.heightRuns.value;
    const heightWickets = event.target.heightWickets.value;
    const aboutPlayer = event.target.aboutPlayer.value;
    const playerProfileImg = event.target.playerProfileImg.files[0]; // Access the selected file

    // Upload image to Imgbb
    const formData = new FormData();
    formData.append("image", playerProfileImg);
    formData.append("key", "e3a766c99e397158b5668ccd3ed717ff"); // Replace this with your Imgbb API key
    const imgbbResponse = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData
    );
    const imageUrl = imgbbResponse.data.data.url;

    const newPlayer = {
      playerName,
      updated,
      playerEmail,
      dateOfBirth,
      playerProfileImg: imageUrl,
      playerRole,
      teamName,
      totalMatches,
      totalRuns,
      totalWickets,
      heightRuns,
      heightWickets,
      aboutPlayer,
    };

    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/add-player`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/dashboard");
        setIsLoading(false); // End loading state
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false); // End loading state in case of an error
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div>
      {players.filter((player) => player.playerEmail === user?.email).length ===
        0 && (
        <form onSubmit={handlePlayerProfile}>
          <ul>
            <li className="single-form-item">
              <lebel>Your Name</lebel>
              <input
                required
                type="text"
                name="playerName"
                placeholder="Your Name"
                maxLength="30"
                onInput="checkCharacterLimit()"
              />
            </li>
            <li className="single-form-item">
              <input hidden type="text" name="updated" value="No" />
            </li>
            <li className="single-form-item">
              <input
                hidden
                type="email"
                name="playerEmail"
                value={user?.email}
                placeholder="Your Name"
              />
            </li>
            <li className="single-form-item">
              <input hidden type="text" name="profileStatus" value="Pending" />
            </li>
            <li className="single-form-item">
              <label>Profile Picture</label>
              <input
                required
                type="file"
                name="playerProfileImg"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  style={{
                    maxWidth: "150px",
                    maxHeight: "200px",
                    marginTop: "10px",
                  }}
                />
              )}
            </li>
            <li className="single-form-item">
              <lebel>Date of Birth</lebel>
              <input
                required
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
              />
            </li>
            <li className="single-form-item">
              <lebel>Player Role</lebel>
              <select required name="playerRole">
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="Allrounder">Allrounder</option>
              </select>
            </li>
            <li className="single-form-item">
              <lebel>Team or Academy Name</lebel>
              <input
                required
                type="text"
                name="teamName"
                placeholder="Your Team or Academy Name"
                maxLength="30"
                onInput="checkCharacterLimit()"
              />
            </li>
            <li className="single-form-item">
              <lebel>Total Matches</lebel>
              <input
                required
                type="number"
                name="totalMatches"
                placeholder="Total Matches You Have Played"
                max="1000"
                onInput="checkNumberLimit()"
              />
            </li>
            <li className="single-form-item">
              <lebel>Total Runs</lebel>
              <input
                required
                type="number"
                name="totalRuns"
                placeholder="Total Runs"
                max="10000"
                onInput="checkNumberLimit()"
              />
            </li>
            <li className="single-form-item">
              <lebel>Total Wickets</lebel>
              <input
                required
                type="number"
                name="totalWickets"
                placeholder="Total Wickets"
                max="1000"
                onInput="checkNumberLimit()"
              />
            </li>
            <li className="single-form-item">
              <lebel>Height Runs</lebel>
              <input
                required
                type="number"
                name="heightRuns"
                placeholder="Height Runs"
                max="300"
                onInput="checkNumberLimit()"
              />
            </li>
            <li className="single-form-item">
              <lebel>Height Wickets</lebel>
              <input
                required
                type="number"
                name="heightWickets"
                placeholder="Height Wickets"
                max="9"
              />
            </li>
            <li className="single-form-item">
              <lebel>About Yourself</lebel>
              <textarea
                required
                type="text"
                name="aboutPlayer"
                placeholder="Write About You"
                maxLength="100"
                onInput="checkCharacterLimit()"
              />
            </li>
            <li class="single-form-item">
              <input
                className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center register-space-top"
                type="submit"
                value={isLoading ? "Updating..." : "Update Your Profile"}
                disabled={isLoading}
              />
            </li>
          </ul>
        </form>
      )}

      {players.filter((player) => player.playerEmail === user?.email).length ===
        1 && (
        <ul>
          <li className="single-form-item">
            <input
              className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn"
              type="submit"
              value="You already have an account"
            />
          </li>
        </ul>
      )}
    </div>
  );
};

export default AddProfile;
