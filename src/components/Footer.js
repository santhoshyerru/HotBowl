import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../Assests/QuickBowl.png"

const Footer = () => {
  return (
    <div className='min-h-[30rem] bg-black text-white text-center md:flex justify-around pt-16'>
        <div className='pb-16'>
            <img
                className="w-20 mb-3 m-auto"
                alt="logo"
                src={logo}
            />
            <p className='text-lg'>© 2024 Hot Bowl,<br/> All right reserved</p>
        </div>
        <div className='pb-16'>
            <h2 className='font-bold text-lg mb-3 md:mb-8'>Company</h2>
            <p className='text-lg'><Link to='/about'>About Me</Link></p>
            {/* <p className='text-lg'> Visit my <a className='hover:text-orange-600' href='https://portfolio-five-coral.vercel.app/'>personal website </a> to know more about me </p> */}
        </div>
        <div className='pb-16'>
            <h2 className='font-bold text-lg mb-3 md:mb-8'><Link to="/contact">Contact Us</Link></h2>
            <p className='text-lg'>Reach us at </p>
            <p className='text-lg'>Email - hotbowl@gmail.com</p>
            <p className='text-lg'>Cincinnati, Ohio</p>
        </div>
    </div>
  )
}

export default Footer