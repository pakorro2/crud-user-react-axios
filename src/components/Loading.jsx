import React from "react";
import "../assets/styles/loading.css";

const Loading = () => {
  return (
    <div className="lds-ellipsis">
      <h2 className="loading">Loading...</h2>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
