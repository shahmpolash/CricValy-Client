import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './RecentMatchs.css';

const RecentMatchs = () => {
    const [user] = useAuthState(auth);
   
    const handleMatch = event =>{
        event.preventDefault();
        const email = event.target.email.value;
        const date = event.target.date.value;
        const team = event.target.team.value;
        const aganist = event.target.aganist.value;
        const runs = event.target.runs.value;
        const faced = event.target.faced.value;
        const wickets = event.target.wickets.value;
        const overs = event.target.overs.value;

        const matchInfo = {email, date, team, aganist, runs, faced, wickets, overs }

        fetch('https://powerful-wave-58652-26b956be3d84.herokuapp.com/matchinfo', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(matchInfo)
        })
        .then(res=>res.json())
        .then(result=> {
            console.log(result);

        })


    }
    return (
        <div>
            <h1>Recent Matchs</h1>
            <form onSubmit={handleMatch} className="recent-match-form">
                <input type="hidden" value={user.email} name="email" id="" />
                <input type="date" name="date" id="" />
                <input type="text" name="team" id="" placeholder='Your Team Name' />
                <input type="text" name="aganist" id="" placeholder='Aganist Name' />
                <input type="text" name="runs" id="" placeholder='Your Runs' />
                <input type="text" name="faced" id="" placeholder='Total Ball Faced' />
                <input type="text" name="wickets" id="" placeholder='Your Wickets' />
                <input type="text" name="overs" id="" placeholder='Total Overs' />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default RecentMatchs;