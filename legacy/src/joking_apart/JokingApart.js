import React, { Component } from "react";
import Avatar from "../avatar/Avatar.js";
import JokingApartMenu from "./JokingApartMenu.js";
import PageWrapper from "../components/PageWrapper.js";

export default class JokingApart extends Component {
  render() {
    return (
      <PageWrapper className="joking-apart-page">
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px' }}>
          <Avatar page="joking-apart" />
          <JokingApartMenu />
        </div>
      </PageWrapper>
    );
  }
}
