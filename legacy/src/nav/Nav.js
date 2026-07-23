import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import astronautHelmet from "../assets/astronaut-helmet.png";
import deadEye from "../assets/dead-eye.png";
import stack from "../assets/stack.png";
import awards from "../assets/awards.png";
import envelope from "../assets/envelope.png";
import joking_apart from "../assets/joking_apart.png";
import "../styles/nav.css";

export default function Nav() {
  const location = useLocation();

  const getNavPositionClass = () => {
    switch (location.pathname) {
      case "/":
        return "nav-about";
      case "/skills":
        return "nav-skills";
      case "/projects":
        return "nav-projects";
      case "/awards":
          return "nav-awards";
            
      case "/contact":
        return "nav-contact";
      case "/joking_apart":
          return "nav-joking_apart";  
      default:
        return "";
    }
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "ABOUT";
      case "/skills":
        return "SKILLS";
      case "/projects":
        return "PROJECTS";
      case "/awards":
         return "AWARDS"; 
      case "/contact":
        return "CONTACT";
      case "/joking_apart":
        return "JOKING_APART";  
      default:
        return "";
    }
  };
  const navPositionClass = getNavPositionClass();
  const pageTitle = getPageTitle();

  const isCurrentPage = (navClass) => {
    return navClass === navPositionClass;
  };

  const renderNavLink = (to, imgSrc, altText, navClass) => {
    const isCurrent = isCurrentPage(navClass);
    const linkClass = isCurrent ? "nav-link current" : "nav-link";

    return (
      <Link to={to} className={linkClass}>
        <img src={imgSrc} alt={altText} />
        {isCurrent && <h1 className="page-title">{pageTitle}</h1>}
      </Link>
    );
  };

  return (
    <nav className={`nav ${navPositionClass}`}>
      {renderNavLink(
        "/",
        astronautHelmet,
        "astronaut helmet icon",
        "nav-about"
      )}
      {renderNavLink("/skills", deadEye, "deadEye icon", "nav-skills")}
      {renderNavLink("/projects", stack, "stack icon", "nav-projects")}
      {renderNavLink("/awards", awards, "awards icon", "nav-awards")}
      {renderNavLink("/contact", envelope, "envelope icon", "nav-contact")}
      {renderNavLink("joking_apart", joking_apart, "joking_apart icon", "nav-joking_apart")}
    </nav>
  );
}
