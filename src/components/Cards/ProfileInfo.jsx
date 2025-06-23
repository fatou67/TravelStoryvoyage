import React from 'react';

function ProfileInfo({ userInfo, onLogout }) {
  // ✅ Sécurité : si userInfo est null, on n’affiche rien
  if (!userInfo) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        WJ
      </div>

      <div>
        <p className="text-sm font-medium">{userInfo.fullName || ""}</p>
        <button className="" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
