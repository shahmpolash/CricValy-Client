import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const AcademyList = () => {
    const {id} = useParams();
    const [academies, setAcademies] = useState([]);
    const [district, setDistrict] = useState([]);
    useEffect(() => {
        fetch(`https://powerful-wave-58652-26b956be3d84.herokuapp.com/district/${id}`)
          .then((res) => res.json())
          .then((info) => setDistrict(info));
      }, [id]);

    useEffect(() => {
      fetch(`https://powerful-wave-58652-26b956be3d84.herokuapp.com/academies`)
        .then((res) => res.json())
        .then((info) => setAcademies(info));
    }, []);
    return (
        <div>
        <div className="title-content">
          <h2 className="title">Academies</h2>
        </div>
  
        <div className="academy-cards-all-cards">
          <div className="academy-cards">
            <>
              {academies.map(academy => academy.district === district.districtName &&
                <div className="academy-cards-single">
                  <div className="-academy-cardscard-one">
                    <Link class="btn" to={`/academy/${academy._id}`}>
                      <img src={academy.academyProfilePhoto} alt="" />
                    </Link>
                  </div>
                  <div className="text">
                    <p>{academy.academyName}</p>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
  
        
      </div>
    );
};

export default AcademyList;