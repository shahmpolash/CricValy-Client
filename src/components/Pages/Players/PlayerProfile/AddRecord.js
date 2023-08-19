import React from 'react';
import { useForm } from 'react-hook-form';
import './AddRecord.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';


const AddRecord = () => {
    const [user] = useAuthState(auth);
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/players/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);

            })
    }
    return (
        <div className='mx-auto mt-5'>
            <h2 className='text-center'>Add a Player Record {user.displayName}</h2>
            <form className='d-flex flex-column record' onSubmit={handleSubmit(onSubmit)}>

                <input hidden className='mb-2' value={user.email} {...register("email")}  />

                <input hidden className='mb-2' {...register("name")} placeholder='Player Name' />

                <input className='mb-2' {...register("team", { required: true, maxLength: 200 })} placeholder='Team or Academy Name' />

                <input className='mb-2' {...register("date_of_birth", { required: true, maxLength: 200 })} placeholder='Date of Borth' />

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

export default AddRecord;