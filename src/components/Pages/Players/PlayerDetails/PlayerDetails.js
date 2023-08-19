import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PlayerDetails.css";

const PlayerDetails = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/player/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPlayer(data));
  }, [id]);

  useEffect(() => {
    const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/matches`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMatches(data));
  }, []);

  return (
    <div>
      <div className="hero-section section-gap-top-25">
        <div className="container">
          {/* Start Hero Area */}
          <div className="hero-area hero-area--style-1 hero-slider-active">
            {/* Slider main container */}
            <div className="swiper">
              {/* Additional required wrapper */}
              <div className="swiper-wrapper">
                {/* Slides */}
                <div className="swiper-slide">
                  <div className="hero-singel-slide">
                    <div className="hero-bg">
                      <img
                        width={388}
                        height={160}
                        className="img-full"
                        src="https://i.ibb.co/cC5Hqt2/player-bg.jpg"
                        alt="cover"
                      />
                    </div>
                    <div className="inner-wrapper">
                      <div className="product-img academy-profile">
                        <img width={120} height={120} src={player.playerProfileImg} alt="Player"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* If we need pagination */}
            <div className="swiper-pagination" />
          </div>
        </div>
      </div>
      <div className="player-name">
        <div>
          <h2>{player.playerName}</h2>
          <p>{player.playerRole}</p>
        </div>
      </div>
      <p className="about">{player.aboutPlayer}</p>
      <h2>Overview</h2>
      <table id="customers">
        <tr>
          <th>Matchs</th>
          <th>Runs</th>
          <th>Wkts</th>
          <th>Height Runs</th>
          <th>Height Wkts</th>
        </tr>
        <tr>
          <td>{player.totalMatches}</td>
          <td>{player.totalRuns}</td>
          <td>{player.totalWickets}</td>
          <td>{player.heightRuns}</td>
          <td>{player.heightWickets}</td>
        </tr>
      </table>
      <h2>Latest Matches</h2>
      <table id="customers">
        <tr>
          <th>Date</th>
          <th>R</th>
          <th>B</th>
          <th>W</th>
          <th>O</th>
          <th>T</th>
          <th>Vs T</th>
          <th></th>
        </tr>
        {
          matches.map(match=> match.playerId === player._id && 
            <tr>
          <td>{match.date}</td>
          <td>{match.runs}</td>
          <td>{match.ballFaced}</td>
          <td>{match.wikts}</td>
          <td>{match.overs}</td>
          <td>{match.teamName}</td>
          <td>{match.aganistTeam}</td>
          <td>{match.outOrNotOut}</td>
        </tr>
            )
        }
        
      </table>
    </div>
  );
};

export default PlayerDetails;
