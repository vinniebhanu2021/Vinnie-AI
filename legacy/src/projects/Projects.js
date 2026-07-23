import React, { Component } from "react";
import ProjectsMenu from "./ProjectsMenu";
import PageWrapper from "../components/PageWrapper.js";

export default class Projects extends Component {
  render() {
    return (
      <PageWrapper className="projects-page">
        <div className="glass-panel" style={{ padding: '2rem', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          <ProjectsMenu />
        </div>
      </PageWrapper>
    );
  }
}
