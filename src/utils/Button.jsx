import React from "react";

const Button = ({ title, width, loading }) => {
  return (
    <button
      type="submit"
      disabled={loading ? true : false}
      className={
        loading
          ? `w-${width} rounded-md bg-mainBlue opacity-70 text-white p-2 cursor-not-allowed`
          : `w-${width} rounded-md bg-mainBlue text-white p-2`
      }
    >
      {loading ? (
        <div className="flex justify-center items-center space-x-4">
          <div className="border-2 border-r-3  border-r-gray-600 animate-spin rounded-full w-6 h-6"></div>
          <div>Please wait</div>
        </div>
      ) : (
        <div className=""> {title}</div>
      )}
    </button>
  );
};

export default Button;
