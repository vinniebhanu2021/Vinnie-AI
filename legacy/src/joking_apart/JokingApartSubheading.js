import React from "react";
import classNames from "classnames";
import "../styles/jokingApartMenu.css";
import poetry1 from '../assets/poetry1.png';
import poetry2 from '../assets/poetry2.png';
import joke3 from '../assets/joke3.png';
const JokingApartSubheading = ({ title, content, img,active, onClick, menuItem }) => {
  const subContainerClass = `sub-container-${menuItem}`;
img=poetry1;
if (menuItem==1) {img=poetry1;
  
}
if (menuItem==2) {img=poetry2;
  
}
if (menuItem==3) {img=joke3;
  
}
  return (
    <div
      className={classNames(subContainerClass, { "active-subheading": active })}
    >
      <h3 onClick={onClick}>{title}</h3>
      {active && (
        <div className="content-container">
          <div className="image-container">
          <img src={img} alt={title} className="joking_apart-image" />
        </div>
          <div className="p-container">{content}</div>
        </div>
      )}
    </div>
  );
};

export default JokingApartSubheading;
