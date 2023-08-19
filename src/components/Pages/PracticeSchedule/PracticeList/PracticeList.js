import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';

const PracticeList = () => {
    const [user] = useAuthState(auth);
    const [practices, setPractices] = useState([]);

    useEffect( () =>{
        const url = `https://powerful-wave-58652-26b956be3d84.herokuapp.com/practice?email=${user.email}`
        fetch(url)
        .then(res=>res.json())
        .then(data=> setPractices(data))

    }, [user])

    const handleDelete = id =>{
      const proceed = window.confirm('Are You Sure');
      if(proceed){
        const url =`https://powerful-wave-58652-26b956be3d84.herokuapp.com/practice/${id}`
        fetch(url, {
          method: 'DELETE'
        })
        .then(res=>res.json())
        .then(result => {
          console.log(result)
          const remaining = practices.filter(practice => practice._id !== id);
          setPractices(remaining);
        })
      }
    }

    return (
        <div>
            <h2 className='text-center'>My Practice Schedule</h2>
            {
                practices.map(practice => 
                    <Table striped bordered hover size="sm">
  <thead>
    <tr>
      
      <th>Team/Academy</th>
      <th>Date</th>
      <th>Time</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td>{practice.team}</td>
      <td>{practice.datestart} - {practice.dateend}</td>
      <td>{practice.time}</td>
      <td><div className='d-flex justify-content-center'><Button onClick={() => handleDelete(practice._id)}>X</Button></div></td>
    </tr>
   
  </tbody>
</Table>
                    )
            }
        </div>
    );
};

export default PracticeList;