import React from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = React.useState(false);

  return (
    <div className="border-b border-gray-300 pb-1 flex items-center">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full bg-transparent py-2 pr-8 text-sm text-gray-800 focus:outline-none"
      />
      <button
        type="button"
        onClick={() => setIsShowPassword(!isShowPassword)}
        className="text-gray-400 hover:text-gray-600 ml-2"
      >
        {isShowPassword ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />}
      </button>
    </div>
  );
};

export default PasswordInput;