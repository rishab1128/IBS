import React from 'react';
import Typed from 'react-typed';
import {Link} from 'react-router-dom';

const Hero = () => {
  return (
    <div className='text-white' style={{"backgroundColor":"#000300"}}>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          SECURE YOUR MONEY WITH IBS
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            EASY
          </p>
          <Typed
          className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={['ONLINE BANKING']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Manage your finances from anywhere, anytime.</p>
        <Link to="/openaccount"><button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>GET STARTED</button></Link>
      </div>
    </div>
  );
};

export default Hero;
