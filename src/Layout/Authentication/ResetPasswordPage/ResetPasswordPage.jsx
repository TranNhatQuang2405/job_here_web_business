import React, { useState } from "react";
import {
  Col,
  Row,
  Card,
  Form,
  InputGroup,
  FormControl,
  FormLabel,
  FormGroup,
  Button,
} from "react-bootstrap";
import "./ResetPasswordPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeCurrentPage } from "Config/Redux/Slice/CurrentPageSlice";
import { useTranslation } from "react-i18next";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(null);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSignIn = () => {
    dispatch(changeCurrentPage(1));
    navigate("/SignIn");
  };

  const onResetPassword = () => {};

  return (
    <div className="ResetPassword">
      <div className="ResetPassword__account-pages pt-5">
        <Row className="justify-content-center">
          <Col lg={4} xs={11}>
            <div className="text-center">
              <h4 className="ResetPassword__title">{t("Reset Password")}</h4>
              <p className="text-muted mb-1">
                {t("Reset Password For Your Account.")}
              </p>
            </div>
            <Card className="ResetPassword__card mt-2">
              <Card.Body className="p-4">
                <div className="p-3">
                  {alert === null ? (
                    <div
                      className="alert alert-success text-center mb-4"
                      role="alert"
                    >
                      {t(
                        "Enter your Email and instructions will be sent to you!"
                      )}
                    </div>
                  ) : alert === true ? (
                    <div
                      className="alert alert-success text-center mb-4"
                      role="alert"
                    >
                      {t("Reset password link have been sent to your email")}
                    </div>
                  ) : (
                    <div
                      className="alert alert-danger text-center mb-4"
                      role="alert"
                    >
                      {t("Submited Email is wrong")}
                    </div>
                  )}

                  <Form onSubmit={onResetPassword}>
                    <FormGroup className="mb-4">
                      <FormLabel className="ResetPassword__form-label">
                        {t("Email")}
                      </FormLabel>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="ResetPassword__input-text">
                          <i className="bi bi-envelope-fill" />
                        </InputGroup.Text>
                        <FormControl
                          type="email"
                          className="ResetPassword__form-control"
                          placeholder={t("Enter Email")}
                          aria-label="Enter Email"
                          required
                          value={email}
                          onChange={onChangeEmail}
                        />
                      </InputGroup>
                    </FormGroup>

                    <div className="d-grid">
                      <Button className="resetPass__button " type="submit">
                        {t("Reset Password")}
                      </Button>
                    </div>
                  </Form>
                </div>
              </Card.Body>
            </Card>

            <div className="text-center mt-2">
              <p>
                {t("Remember It?")}
                <span
                  className="resetPass__textSignIn ms-1 cur-pointer"
                  onClick={onSignIn}
                >
                  {t("Sign In")}
                </span>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
