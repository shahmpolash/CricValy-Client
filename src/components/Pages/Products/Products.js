import React, { useState, useEffect } from 'react';
import Tshirt from './Tshirt';
import CricketBat from './CricketBat';
import Shoe from './Shoe';
import Loading from '../../../Shared/Loading';

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulating loading delay for demonstration
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Set your desired loading time in milliseconds
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <Tshirt />
          <Shoe />
        </>
      )}
    </div>
  );
};

export default Products;
