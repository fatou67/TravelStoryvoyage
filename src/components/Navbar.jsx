import React from 'react';
import ProfileInfo from './Cards/ProfileInfo';
import LOGO from '../assets/images/logo.jpg';


const Navbar = ({ userInfo }) => {
  return (
    <div className="bg-white flex items-center justify-between px-6 py-3 drop-shadow sticky top-0 z-10">
      <img
        src={LOGO}
        alt="Travel Story"
        className="h-14 w-auto" />

       <ProfileInfo userInfo={userInfo} />
     
    </div>
  );
};

export default Navbar;
