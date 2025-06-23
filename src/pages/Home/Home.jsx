import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'; 
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
    </>
  );
};

export default Home;
