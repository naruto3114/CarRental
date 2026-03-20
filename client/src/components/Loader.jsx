// src/components/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h[80v]">
      <div className="animated-spin rounded-full h-14 w-14 border-4 border-gray-300 border-t-primary"></div>
    </div>
  );
};

export default Loader;
