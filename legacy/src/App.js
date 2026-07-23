import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav/Nav.js";
import About from "./about/About";
import Skills from "./skills/Skills";
import Projects from "./projects/Projects";
import Awards from "./awards/Awards";
import Contact from "./contact/Contact";
import JokingApart from "./joking_apart/JokingApart";
import Background from "./background/Background.js";
import PlayerStats from "./playerStats/PlayerStats.js";
import "./styles/app.css";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/joking_apart" element={<JokingApart />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <Background />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <AnimatedRoutes />
        <PlayerStats />
      </div>
    </Router>
  );
};

export default App;
