import React from "react";
import { Container } from "react-bootstrap";
import { Footer, Header } from "../";
import "./PageTenplate.css";

const PageTemplate = ({ children }) => {
  return (
    <Container fluid className="Page__body fix_scroll">
      <Header />
      {children}
      <Footer />
    </Container>
  );
};

export default PageTemplate;
