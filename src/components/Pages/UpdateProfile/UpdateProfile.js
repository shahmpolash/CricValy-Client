import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import auth from '../../../firebase.init';


const UpdateProfile = () => {
    const [user] = useAuthState(auth);
    const { register, handleSubmit } = useForm();
    const { id } = useParams();
    const [player, setPlayer] = useState({});

    useEffect(() => {
        const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/player/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setPlayer(data));
    }, []);

    const onSubmit = updatePlayer => {
        const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/player/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatePlayer)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);

            })
    }
    return (
        <div className='mx-auto mt-5'>

            You are {player.name}

            <form className='d-flex flex-column record' onSubmit={handleSubmit(onSubmit)}>
                
<input className='mb-2' value={user.email} {...register("email")} placeholder='Player Email' />

                <input className='mb-2' {...register("name")} placeholder='Player Name' />

                <input className='mb-2' {...register("team")} placeholder='Team or Academy Name' />

                <input className='mb-2' {...register("date_of_birth")} placeholder='Date of Borth' />

                <input className='mb-2' type="text" {...register("role")} placeholder='Role: Batsman/Bolwler/Allrounder' />

                <input className='mb-2' type="text" {...register("batting_style")} placeholder="Batting Style" />

                <input className='mb-2' type="text" {...register("bowling_style")} placeholder="Bowling Style" />

                <input className='mb-2' type="number" {...register("total_matchs")} placeholder="Total Matchs" />

                <input className='mb-2' type="number" {...register("total_runs")} placeholder="Total Runs" />

                <input className='mb-2' type="number" {...register("total_wickets")} placeholder="Total Wickets" />

                <input className='mb-2' type="text" {...register("highest_runs")} placeholder="Highest Runs" />

                <input className='mb-2' type="text" {...register("highest_wickets")} placeholder="Highest Wickets" />

                <input className='mb-2' type="text" {...register("profile_picture")} placeholder="Profile Picture" />

                <input className='mb-2' type="text" {...register("photo1")} placeholder="Photo 1 URL" />

                <input className='mb-2' type="text" {...register("photo2")} placeholder="Photo 2 URL" />

                <input className='mb-2' type="text" {...register("photo3")} placeholder="Photo 3 URL" />

                <input className='mb-2' type="text" {...register("photo4")} placeholder="Photo 4 URL" />

                <input className='mb-2' type="text" {...register("video")} placeholder="Video URL" />


                <input type="submit" value="Update My Record" />
            </form>

        </div>
    );
};

export default UpdateProfile;