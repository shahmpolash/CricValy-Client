import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../../../firebase.init";
import "./AddToProfile.css";

const AddToProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [player, setPlayer] = useState([]);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [totals, setTotals] = useState({
    runs: 0,
    ballFaced: 0,
    wikts: 0,
    overs: 0,
  });

  useEffect(() => {
    fetch(`https://powerful-wave-58652-26b956be3d84.herokuapp.com/player/${id}`)
      .then((res) => res.json())
      .then((info) => setPlayer(info));
  }, [id]);

  useEffect(() => {
    fetch(`https://powerful-wave-58652-26b956be3d84.herokuapp.com/matches`)
      .then((res) => res.json())
      .then((info) => setMatches(info));
  }, []);

  const handleAddToProfile = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const totalMatches = event.target.totalMatches.value;
    const updated = event.target.updated.value;
    const totalRuns = event.target.totalRuns.value;
    const totalWickets = event.target.totalWickets.value;

    const updateLastMatch = { totalMatches, updated, totalRuns, totalWickets };

    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/player-last-match/${player._id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateLastMatch),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/dashboard");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false); // End loading state in case of an error
      });
      
  };

  useEffect(() => {
    const filteredMatches = matches.filter(
      (match) =>
        match.playerEmail === user?.email && match.playerId === player._id
    );

    const sumOfRuns = filteredMatches.reduce(
      (total, match) => total + parseFloat(match.runs),
      0
    );
    const sumOfMatches = filteredMatches.reduce(
      (total, match) => total + parseFloat(match.match),
      0
    );
    const sumOfBallFaced = filteredMatches.reduce(
      (total, match) => total + parseFloat(match.ballFaced),
      0
    );
    const sumOfWikts = filteredMatches.reduce(
      (total, match) => total + parseFloat(match.wikts),
      0
    );
    const sumOfOvers = filteredMatches.reduce(
      (total, match) => total + parseFloat(match.overs),
      0
    );

    setTotals({
      runs: sumOfRuns,
      matches: sumOfMatches,
      ballFaced: sumOfBallFaced,
      wikts: sumOfWikts,
      overs: sumOfOvers,
    });
  }, [matches, player, user]);
  const lastMatch = matches
    .filter((match) => match.playerEmail === user?.email)
    .slice(-1)[0];

  return (
    <div className="last-match">

      {player.updated === "No" && (
        <form onSubmit={handleAddToProfile}>
          <div className="lastmatch-banner">
        <h2>Your Performance in last match</h2>
      </div>
          <ul>
            <li class="single-form-item">
              <input
                type="number"
                hidden
                disabled
                name="totalMatches"
                value={
                  parseFloat(totals.matches) + parseFloat(player.totalMatches)
                }
              />
            </li>
            <li class="single-form-item">
              <input type="text" hidden name="updated" value="Yes" />
            </li>
            <li class="single-form-item">
              <input
                type="number"
                hidden
                name="totalRuns"
                value={parseFloat(totals.runs) + parseFloat(player.totalRuns)}
              />
            </li>

            <li class="single-form-item">
              <input
                type="number"
                hidden
                name="totalWickets"
                value={
                  parseFloat(totals.wikts) + parseFloat(player.totalWickets)
                }
              />
            </li>

            <h2>Runs: {totals.runs}</h2>
            <h2>Wkts: {totals.wikts}</h2>
            <li class="single-form-item">
              <input
                className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn"
                type="submit"
                value="Add this recoard to Your Profile"
              />
            </li>
          </ul>
        </form>
      )}
      {player.updated === "Yes" && (
        <form onSubmit={handleAddToProfile}>
            <div className="lastmatch-banner">
        <h2>Your Performance in last match</h2>
      </div>
          <ul>
            <li class="single-form-item">
              <input
                hidden
                type="number"
                name="totalMatches"
                value={
                  parseFloat(lastMatch?.match) + parseFloat(player.totalMatches)
                }
              />
            </li>
            <li class="single-form-item">
              <input hidden type="text" name="updated" value="Yes" />
            </li>
            <li class="single-form-item">
              <input
                disabled
                type="number"
                name="totalRuns"
                value={
                  parseFloat(lastMatch?.runs) + parseFloat(player.totalRuns)
                }
              />
            </li>

            <li class="single-form-item">
              <input
                disabled
                type="number"
                name="totalWickets"
                value={
                  parseFloat(lastMatch?.wikts) + parseFloat(player.totalWickets)
                }
              />
            </li>
            <li class="single-form-item">
                  <input
                    className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn"
                    type="submit"
                    value={isLoading ? "Adding..." : "Add This Record to Your Profile"}
                    disabled={isLoading}
                  />
                </li>
          </ul>
        </form>
      )}
    </div>
  );
};

export default AddToProfile;
