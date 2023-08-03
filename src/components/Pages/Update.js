import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './Update.css';
import { Link } from 'react-router-dom';

const Update = () => {
    const [players, setPlayers] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/players`)
          .then((res) => res.json())
          .then((info) => setPlayers(info));
      }, []);
    return (
        <div>
            <div className='update-profile'>
                <h2>Update Your Cricket Profile</h2>
            </div>
            {
                players.filter(player=> player.playerEmail === user?.email).length === 1 &&
                <ul>
                    <li>
                        {
                            players.map(p=> p.playerEmail === user?.email &&
                            <Link to={`/total-matches/${p._id}`} className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn">Update Your Total Matches</Link>
                        )}
                    </li>
                    <li>
                        {
                            players.map(p=> p.playerEmail === user?.email &&
                            <Link to={`/total-runs/${p._id}`} className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn">Update Your Total Runs</Link>
                        )}
                    </li>
                    <li>
                        {
                            players.map(p=> p.playerEmail === user?.email &&
                            <Link to={`/total-wkts/${p._id}`} className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn">Update Your Total Wikts</Link>
                        )}
                    </li>
                    <li>
                        {
                            players.map(p=> p.playerEmail === user?.email &&
                            <Link to={`/height-runs/${p._id}`} className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn">Update Your Height Runs</Link>
                        )}
                    </li>
                    <li>
                        {
                            players.map(p=> p.playerEmail === user?.email &&
                            <Link to={`/height-wkts/${p._id}`} className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn">Update Your Height Wikts</Link>
                        )}
                    </li>
                </ul>
            }
        </div>
    );
};

export default Update;