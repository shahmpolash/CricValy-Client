import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import './SetPracticeSchedule.css';

const SetPracticeSchedule = () => {
    const [user] = useAuthState(auth);
   
    const submitPracticeSchedule = event =>{
        event.preventDefault();
        const email = event.target.email.value;
        const team = event.target.team.value;
        const datestart = event.target.datestart.value;
        const dateend = event.target.dateend.value;
        const time = event.target.time.value;

        const practiceSchedule = {email, team, datestart, dateend, time}

        fetch('https://powerful-wave-58652-26b956be3d84.herokuapp.com/practicetime', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(practiceSchedule)
        })
        .then(res=>res.json())
        .then(result=> {
            console.log(result);

        })

    }

    return (
        <div>
            <form onSubmit={submitPracticeSchedule} className='practice-time'>
                <input type="hidden" value={user.email} disabled name="email" id="" />
                <input type="text" name="team" id="" placeholder='Team or Academy Name' />
                <div className='date'><input type="text" name="datestart" id="" placeholder='Day' /> to
                <input type="text" name="dateend" id="" placeholder='Day' /></div>
                <input type="text" name="time" id="" placeholder='8am to 11am' />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default SetPracticeSchedule;