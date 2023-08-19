import React, { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import MyRecentMatchList from '../../hooks/MyRecentMatchList';
import RecentMatchs from '../../hooks/RecentMatchs';
import PracticeList from '../PracticeSchedule/PracticeList/PracticeList';
import SetPracticeSchedule from '../PracticeSchedule/SetPracticeSchedule/SetPracticeSchedule';
import './Profile.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [records, setRecords] = useState([]);
    useEffect(() => {
        if (user) {
            const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/profile?email=${user.email}`;
            fetch(url)
                .then(res => res.json())
                .then(data => setRecords(data));
        }
    }, [user]);

    const updatePlayerProfile = id => {
        navigate(`/updateprofile/${id}`);
    }
    const viewProfile = id => {
        navigate(`/player/${id}`);
    }
    const addProfile = event =>{
        navigate('/add-record')
    }


    return (
        <div className='container'>
            {
                records.length == 0 ?
                <Button onClick={addProfile}>Create Your Profile</Button>
                :
                <></>
            }
            <div className='mx-auto'>
                {
                    records.map(record =>
                        <div>
                            <div className='d-flex justify-content-center'>

                                <img className='profile-image' src={record.profile_picture} alt="" />
                            </div>
                            <div className='d-flex justify-content-center'>{record.name}</div>
                            <div>
                                <p className='text-center bg-primary text-white py-2'>My Overall Performance</p>
                                <table class="table table-striped table-dark">

                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">As a Batsman</th>
                                            <th scope="col">As a Bowler</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Total Matchs - {record.total_matchs} </td>
                                            <td>Total Matchs - {record.total_matchs}</td>

                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Total Runs - {record.total_runs}</td>
                                            <td>Total Wickets - {record.total_wickets}</td>

                                        </tr>

                                    </tbody>
                                </table>
                                <div className='d-flex justify-content-center' >
                                    <Button onClick={() => updatePlayerProfile(record._id)}>Edit Profile</Button>
                                </div>
                                <div className='d-flex justify-content-center mt-3' >
                                    <Button onClick={() => viewProfile(record._id)}>Full Profile</Button>
                                </div>
                            </div>
                        </div>


                    )

                }

            </div>
            <MyRecentMatchList></MyRecentMatchList>
            <PracticeList></PracticeList>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Add Your Recent Performance</Accordion.Header>
                    <Accordion.Body>
                        <RecentMatchs></RecentMatchs>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Set Your Practice Schedule </Accordion.Header>
                    <Accordion.Body>
                        <SetPracticeSchedule></SetPracticeSchedule>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>


        </div>
    );
};

export default Dashboard;