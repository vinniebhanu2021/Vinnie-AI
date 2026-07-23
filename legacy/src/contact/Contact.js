import React from "react";
import ContactMenu from "./ContactMenu";
import PageWrapper from "../components/PageWrapper.js";
import "../styles/contact.css";

const Contact = () => {
  return (
    <PageWrapper className="contact-page">
      <div className="glass-panel" style={{ padding: '2rem', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <ContactMenu />
      </div>
    </PageWrapper>
  );
};

export default Contact;
