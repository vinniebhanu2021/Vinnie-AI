import React, { Component } from "react";
import classNames from "classnames";
import "../styles/awardsMenu.css";

const AwardsMenuItem = ({ title, active, onClick }) => {
  return (
    <div className={classNames("item", { active })} onClick={onClick}>
      <h2 className="title">{title}</h2>
    </div>
  );
};

export default AwardsMenuItem;
