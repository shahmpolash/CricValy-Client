import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './MyRecentMatchs.css';

const MyRecentMatchList = () => {
    const [user] = useAuthState(auth);
    const [matchs, setMatchs] = useState([]);

    useEffect(() => {
        if (user) {
            const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/mymatchs?email=${user.email}`;
            fetch(url)
                .then(res => res.json())
                .then(data => setMatchs(data));
        }
    }, [user]);

    return (
        <div>
           
            <p className='text-center bg-primary text-white py-2 mt-2'>Recently I Have Played {matchs.length}</p>
            <div className='recent-matchs'>
            {
                matchs.map( match =>
                    <table class="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Team</th>
                        <th scope="col">Aganist</th>
                        <th scope="col">Runs</th>
                        <th scope="col">Wickets</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{match.date}</th>
                        <td>{match.team}</td>
                        <td>{match.aganist}</td>
                        <td>{match.runs} by-{match.faced}-balls</td>
                        <td>{match.wickets} from-{match.overs}-overs</td>
                    </tr>
                   
                    
                </tbody>
            </table>
                    ).reverse()
            }
            </div>
        </div>
    );
};

export default MyRecentMatchList;