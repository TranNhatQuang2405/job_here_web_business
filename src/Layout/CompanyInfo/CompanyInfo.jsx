import { Avatar } from "Components/Image";
import { PathTree } from "Components/Path";
import { Row, Col, Container } from "react-bootstrap";
import React from "react";
import background from "Assets/Images/background.jpg"
import "./CompanyInfo.css"
import { Link45deg, Building } from "react-bootstrap-icons";
function CompanyInfo() {
    return (
        <div>
            <PathTree />
            <div className="companyInfo__header">
                <img src={`${background}`} alt="BACKGROUND" className="companyInfo__header-background">
                </img>
                <Avatar width="150px" className="companyInfo__header-avatar" />
                <Row className="companyInfo__header-content">
                    <Col lg={12} className="companyInfo__header-companyName">Công ty TNHH CMC GLOBAL</Col>
                    <Col lg={4} xs={12} className="companyInfo__header-text">
                        <Link45deg size={20} />
                        <span>http://cmcglobal.com.vn/</span>
                    </Col>
                    <Col lg={4} xs={12} className="companyInfo__header-text">
                        <Building size={20} />
                        <span>http://cmcglobal.com.vn/</span>
                    </Col>
                </Row>
            </div>
            <Container className="companyInfo__body" fluid>
                <Row >
                    <Col lg={8} className="companyInfo__body-left">
                        <div>
                            <div>
                                Giới thiệu công ty
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} className="companyInfo__body-right-bound">
                        <Row>
                            <Col className="companyInfo__body-right">
                                jdgjhdhj
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default CompanyInfo;
