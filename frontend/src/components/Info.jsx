import React from 'react';
import Laptop from '../assets/laptop.jpg';
import {Link} from 'react-router-dom';

const Info = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Laptop} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>WHY US?</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Manage Your Money Smartly</h1>
          <p>
          Your Personal Internet Banking experience with IBS is evolving for the better. Our new design makes it easier for you to manage your accounts and finances online with IBS.

You'll start to notice a refreshed look and enhancement of our features gradually over the coming months
          </p>
          <Link to="/openaccount"><button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Get Started</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Info;
