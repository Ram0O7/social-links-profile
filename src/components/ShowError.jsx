import React from "react";

const ShowError = ({ errorMsg, ...props }) => {
  return (
    <p
      {...props}
      className="text-red-600 font-mono text-sm font-semibold mb-2 animate-pulse"
    >
      {errorMsg}
    </p>
  );
};

export default ShowError;
