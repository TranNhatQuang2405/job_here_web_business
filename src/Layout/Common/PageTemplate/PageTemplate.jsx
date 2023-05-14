import React from "react";
import { Container } from "react-bootstrap";
import { Footer, Header, Body } from "../";
import AlertModal from "Components/Modal/AlertModal/AlertModal";
import "./PageTenplate.css";

const PageTemplate = ({ children }) => {
  return (
    <Container fluid className="Page__body fix_scroll">
      <Header />
      <AlertModal />
      <Body>{children}</Body>
      <Footer />
    </Container>
  );
};

export default PageTemplate;
