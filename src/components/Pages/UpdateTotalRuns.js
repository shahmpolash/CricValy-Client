import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTotalRuns = () => {
    const {id} = useParams();
    const [player, setPlayer] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://powerful-wave-58652-26b956be3d84.herokuapp.com/player/${id}`)
          .then((res) => res.json())
          .then((info) => setPlayer(info));
      }, []);

      const handleUpdateProfile = (event) => {
        event.preventDefault();
        const totalRuns = event.target.totalRuns.value;
    
       
        const updateProfile = {
            totalRuns
        };
    
        const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/update-total-runs/${player._id}`;
        fetch(url, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updateProfile),
        })
          .then((res) => res.json())
          .then((result) => {
            navigate("/update");
          });
      };

    return (
        <div>
            <div className='update-profile'>
                <h2>Update Your Total Runs</h2>
            </div>
            <form onSubmit={handleUpdateProfile}>
                <ul>
                    <li className='single-form-item'>
                        <input type="number" defaultValue={player.totalRuns} name="totalRuns" id="" />
                    </li>
                    <li className='single-form-item'>
                        <input className="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center contact-btn" type="submit" value="Update" />
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default UpdateTotalRuns;