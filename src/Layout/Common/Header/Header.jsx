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
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentPage } from "Config/Redux/Slice/CurrentPageSlice";
import { LogOut } from "Config/Redux/Slice/UserSlice";
import { changeToken } from "Config/Redux/Slice/HeaderRequestSlice";
import { memo } from "react";
import { NavLink, Link } from "react-router-dom";
import { IconChat, IconNotification } from "Components/Icon";

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userInfo = useSelector((state) => state.User.sessionInfo);
  const onLogout = () => {
    dispatch(changeToken(""));
    dispatch(LogOut());
    dispatch(changeCurrentPage(1));
    navigate("/SignIn");
  };

  return (
    <Row className="sticky-nav">
      <Col className="bg-app-dark">
        <Navbar expand="lg" variant="dark" className="Header__layout">
          <Navbar.Brand className="d-flex flex-row align-items-center">
            <NavLink to="/Home">
              <Logo isDark />
            </NavLink>
          </Navbar.Brand>

          {userInfo && (
            <>
              <Nav className="d-lg-none d-block header__btn-language-smallSizeScreen">
                <Nav.Link className="Header__icon-chat" as={Link} to="/message">
                  <IconChat />
                </Nav.Link>
              </Nav>
              <Nav className="d-lg-none d-block me-3">
                <div className="Header__icon-chat cur-pointer">
                  <IconNotification />
                </div>
              </Nav>
              <Nav className="d-block d-lg-none me-3">
                <ChangeLanguageButton />
              </Nav>
            </>
          )}

          {!userInfo && (
            <Nav className="d-block d-lg-none header__btn-language-smallSizeScreen">
              <ChangeLanguageButton />
            </Nav>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            {userInfo ? (
              <>
                <Nav className="me-auto">
                  <NavLink
                    className="nav-link"
                    to={
                      userInfo.companyId
                        ? `/manageCompany/companyInfo/${userInfo.companyId}`
                        : "/manageCompany"
                    }
                  >
                    {t("business.nav.company")}
                  </NavLink>
                  <NavLink className="nav-link" to="/manageJob">
                    {t("business.nav.job")}
                  </NavLink>
                  <NavLink className="nav-link" to="/report">
                    {t("business.nav.report")}
                  </NavLink>
                </Nav>
                <Nav className="justify-content-end">
                  <Nav.Item className="d-none d-lg-block">
                    <Nav.Link className="Header__icon-chat" as={Link} to="/message">
                      <IconChat />
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="d-none d-lg-block mx-2">
                    <div className="Header__icon-chat cur-pointer">
                      <IconNotification />
                    </div>
                  </Nav.Item>
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
                          {(userInfo && userInfo.fullname) || t("Your Profile")}
                        </p>
                      </div>
                    }
                    id="basic-nav-dropdown"
                    menuVariant="dark"
                  >
                    <NavDropdown.Item onClick={onLogout}>{t("Logout")}</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            ) : (
              <></>
            )}

            <Nav className="justify-content-end d-none d-lg-block">
              <ChangeLanguageButton />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Row>
  );
};

export default memo(Header);
