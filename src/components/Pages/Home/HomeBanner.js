import React, { useEffect, useState } from 'react';
import './HomeBanner.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { Link } from 'react-router-dom';

const HomeBanner = () => {

    const [user] = useAuthState(auth);
    const [players, setPlayers] = useState([]);
    useEffect(() => {
      fetch(`https://powerful-wave-58652-26b956be3d84.herokuapp.com/players`)
        .then((res) => res.json())
        .then((info) => setPlayers(info));
    }, []);

    return (
        <div>
            {players.filter((player) => player.playerEmail === user?.email)
            .length === 0 && (
                <div className='home-banner'>
                <Link to='/add-profile'><h1>Setup your cricket profile</h1></Link>
            </div>
          )}
        </div>
        
    );
};

export default HomeBanner;