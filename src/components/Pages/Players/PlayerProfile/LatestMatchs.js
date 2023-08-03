import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../../firebase.init";

const LatestMatchs = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [user] = useAuthState(auth);
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/player/${id}`)
      .then((res) => res.json())
      .then((info) => setPlayer(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/players`)
      .then((res) => res.json())
      .then((info) => setPlayers(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/matches`)
      .then((res) => res.json())
      .then((info) => setMatches(info));
  }, []);

  const handleLastmatch = (event) => {
    event.preventDefault();
    const date = event.target.date.value;
    const match = event.target.match.value;
    const playerEmail = event.target.playerEmail.value;
    const playerId = event.target.playerId.value;
    const runs = event.target.runs.value;
    const ballFaced = event.target.ballFaced.value;
    const wikts = event.target.wikts.value;
    const overs = event.target.overs.value;
    const outOrNotOut = event.target.outOrNotOut.value;
    const teamName = event.target.teamName.value;
    const aganistTeam = event.target.aganistTeam.value;

    const lastMatch = {
      match,
      date,
      playerEmail,
      playerId,
      runs,
      ballFaced,
      wikts,
      overs,
      outOrNotOut,
      teamName,
      aganistTeam,
    };

    const url = `http://localhost:5000/add-latest-match`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(lastMatch),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate(`/add-to-profile/${player._id}`);
      });
  };

  return (
    <div>
      {
        players.filter(player=> player.playerEmail === user?.email).length === 1 &&
        <>
        
        <form onSubmit={handleLastmatch}>
        <ul>
          <li class="single-form-item">
            <input hidden type="text" name="match" value='1' />
          </li>
          <li class="single-form-item">
            <input type="date" name="date" />
          </li>
          <li class="single-form-item">
            <input hidden type="email" name="playerEmail" value={user?.email} />
          </li>
          <li class="single-form-item">
            {
                players.map(player=> player.playerEmail === user?.email && 
                    <input hidden type="text" name="playerId" value={player._id} />
                    
                    )
            }
          </li>
          <li class="single-form-item">
            <input type="number" name="runs" placeholder="Your Runs" />
          </li>
          <li class="single-form-item">
            <input
              type="number"
              name="ballFaced"
              placeholder="Total Ball Faced"
            />
          </li>
          <li class="single-form-item">
            <select name="outOrNotOut">
              <option value="Out">Out</option>
              <option value="NotOut">Not Out</option>
            </select>
          </li>

          <li class="single-form-item">
            <input type="number" name="wikts" placeholder="Your Wikts" />
          </li>
          <li class="single-form-item">
            <input type="number" name="overs" placeholder="Total Overs" />
          </li>

          <li class="single-form-item">
            <input
              type="text"
              name="teamName"
              placeholder="Your Team or Academy Name"
            />
          </li>
          <li class="single-form-item">
            <input type="text" name="aganistTeam" placeholder="Aganist Team" />
          </li>

          <li class="single-form-item">
            <input
              className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn"
              type="submit"
              value="Save Now"
            />
          </li>
        </ul>
      </form>
        </>
      }
    </div>
  );
};

export default LatestMatchs;
