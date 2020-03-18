import React from "react";
import Loader from "react-loader-spinner";

const Loading = () => {
  return (
    <Loader
      className="loadspinner"
      type="MutatingDots"
      color="#4ecca3"
      height={100}
      width={100}
    />
  );
};

export default Loading;
