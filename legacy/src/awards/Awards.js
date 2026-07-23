import React, { Component } from "react";
import Avatar from "../avatar/Avatar.js";
import AwardsMenu from "./AwardsMenu.js";
import PageWrapper from "../components/PageWrapper.js";

export default class Awards extends Component {
  render() {
    return (
      <PageWrapper className="awards-page">
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px' }}>
          <Avatar page="awards" />
          <AwardsMenu />
        </div>
      </PageWrapper>
    );
  }
}
