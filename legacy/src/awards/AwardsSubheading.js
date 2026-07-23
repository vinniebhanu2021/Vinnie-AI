import React from "react";
import classNames from "classnames";
import "../styles/awardsMenu.css";
import award1 from '../assets/award1.png';
import award2 from '../assets/award2.png';
import award3 from '../assets/award3.png';

const AwardsSubheading = ({ title, content, img,active, onClick, menuItem }) => {
  const subContainerClass = `sub-container-${menuItem}`;
console.log(menuItem);
img=award1;
if (menuItem==1) {
  img=award1;
  
}
if (menuItem==2) {
  img=award2;
  
}
if (menuItem==3) {
  img=award3;
  
}
  return (
    <div
      className={classNames(subContainerClass, { "active-subheading": active })}
    >
      <h3 onClick={onClick}>{title}</h3>
      {active && (
        <div className="content-container">
        <div className="image-container">
        <img src={img} alt={title} className="award-image" />
        </div>
          <div className="p-container">{content}</div>
        </div>
      )}
    </div>
  );
};

export default AwardsSubheading;
