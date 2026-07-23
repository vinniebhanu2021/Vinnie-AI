import React, { Component } from "react";
import classNames from "classnames";
import "../styles/jokingApartMenu.css";

const JokingApartMenuItem = ({ title, active, onClick }) => {
  return (
    <div className={classNames("item", { active })} onClick={onClick}>
      <h2 className="title">{title}</h2>
    </div>
  );
};

export default JokingApartMenuItem;
