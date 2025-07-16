import React from 'react';

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700">👤 {userInfo?.fullName}</span>
      <button
        onClick={onLogout}
        className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfo;
