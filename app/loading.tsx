import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-12 h-12 mt-20 border-4 border-white/10 border-t-[#f7374f] dark:border-t-white rounded-full animate-spin shadow-[0_0_15px_#f7374f]" />
    </div>
  );
};

export default LoadingSpinner;
