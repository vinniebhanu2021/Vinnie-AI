import React, { Component } from "react";
import Avatar from "../avatar/Avatar.js";
import SkillsMenu from "./SkillsMenu.js";
import PageWrapper from "../components/PageWrapper.js";

export default class Skills extends Component {
  render() {
    return (
      <PageWrapper className="skills-page">
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px' }}>
          <Avatar page="skills" />
          <SkillsMenu />
        </div>
      </PageWrapper>
    );
  }
}
