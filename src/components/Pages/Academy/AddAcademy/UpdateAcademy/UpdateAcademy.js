import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const UpdateAcademy = () => {
    const { register, handleSubmit } = useForm();
    const { id } = useParams();
    const [academy, setAcademy] = useState({});
    useEffect(() => {
        const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/academy/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setAcademy(data));
    }, []);



    const onSubmit = updateAcademy => {
        const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/academy/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateAcademy)
        })
        .then(res=>res.json())
        .then(result=> {
            console.log(result);

        })
    }

    return (
        <div>
            <h2>Update This Academy</h2>
            <form className='d-flex flex-column ' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' value={academy.name} {...register("name")} placeholder='Academy Name' onChange={(e) => this.handleChange(e)} />

                <textarea className='mb-2' {...register("details", { required: true, maxLength: 200 })} placeholder='Academy Details' />

                <textarea className='mb-2' {...register("address", { required: true, maxLength: 200 })} placeholder='Academy Address' />

                <input className='mb-2' type="text" {...register("practice_schedule")} placeholder='Practice Date. Sat - Wed' />

                <input className='mb-2' type="text" {...register("practice_time")} placeholder="Practice Time . 7am - 11am" />
                <input className='mb-2' type="number" {...register("admission_fee")} placeholder="Admission Fee" />
               
                <input className='mb-2' type="number" {...register("monthly_fee")} placeholder="Monthly Fee" />

                <input className='mb-2' type="number" {...register("phone")} placeholder="Phone Number" />

                <input className='mb-2' type="number" {...register("altphone")} placeholder="Another Phone Number" />

                <input className='mb-2' type="text" value={academy.thumbnail}  {...register("thumbnail")} placeholder="Thumbnail URL" />

                <input className='mb-2' value={academy.banner}  type="text" {...register("banner")} placeholder="Banner URL" />

                <input className='mb-2' value={academy.logo}  type="text" {...register("logo")} placeholder="Logo URL" />

                <input className='mb-2' value={academy.photo1} type="text" {...register("photo1")} placeholder="Photo 1 URL" />

                <input className='mb-2' value={academy.photo2}  type="text" {...register("photo2")} placeholder="Photo 2 URL" />

                <input className='mb-2' value={academy.photo3}  type="text" {...register("photo3")} placeholder="Photo 3 URL" />

                <input className='mb-2' value={academy.photo4}  type="text" {...register("photo4")} placeholder="Photo 4 URL" />

                <input className='mb-2' type="text" {...register("video")} placeholder="Video URL" />

                <input type="submit" value="Update Academy"/>
            </form>
        </div>
    );
};

export default UpdateAcademy;