import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ChangeLanguageButton } from "Components/Button";
import { useNavigate } from "react-router-dom";
import user_img from "Assets/Images/user.png";
import "./Header.css";
import { Logo } from "..";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { changeCurrentPage } from "Config/Redux/Slice/CurrentPageSlice";
import { LogOut } from "Config/Redux/Slice/UserSlice";
import { changeToken } from "Config/Redux/Slice/HeaderRequestSlice";

const Header = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onLogout = () => {
        dispatch(changeToken(""));
        dispatch(LogOut())
        dispatch(changeCurrentPage(1));
        navigate("/SignIn");
    };

    return (
        <Row className="sticky-nav">
            <Col className="bg-app-dark">
                <Navbar expand="lg" variant="dark" className="Header__layout">
                    <Navbar.Brand
                        href="#home"
                        className="d-flex flex-row align-items-center"
                    >
                        <Logo isDark />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown
                                title={t("Jobs")}
                                id="basic-nav-dropdown"
                                menuVariant="dark"
                            >
                                <NavDropdown.Item href="#action">
                                    {t("Applied Jobs")}
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action">
                                    {t("Saved Jobs")}
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action">
                                    {t("Matched Jobs")}
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown
                                title={t("Profile & CV")}
                                id="basic-nav-dropdown"
                                menuVariant="dark"
                            >
                                <NavDropdown.Item href="#action">
                                    {t("CV Manage")}
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action">
                                    {t("CV Template")}
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown
                                title={t("Companies")}
                                id="basic-nav-dropdown"
                                menuVariant="dark"
                            >
                                <NavDropdown.Item href="#action">
                                    {t("Company List")}
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action">
                                    {t("Top Company")}
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="justify-content-end">
                            <NavDropdown
                                title={
                                    <div className="d-flex flex-row align-items-center">
                                        <img
                                            alt=""
                                            src={user_img}
                                            width="40"
                                            height="40"
                                            className="d-inline-block rounded-circle"
                                        />
                                        <p className="mb-0 ms-2 Header__layout-text">
                                            {t("Your Profile")}
                                        </p>
                                    </div>
                                }
                                id="basic-nav-dropdown"
                                menuVariant="dark"
                            >
                                <NavDropdown.Item href="#action">
                                    {t("Edit Your Infomation")}
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={onLogout}>
                                    {t("Logout")}
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav className="justify-content-end">
                                <ChangeLanguageButton />
                            </Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Col>
        </Row>
    );
};

export default Header;
