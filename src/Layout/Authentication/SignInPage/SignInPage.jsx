import React, { useState, useRef } from "react";
import {
  Col,
  Row,
  Card,
  Form,
  InputGroup,
  FormControl,
  FormLabel,
  FormCheck,
  FormGroup,
  Button,
  Alert,
} from "react-bootstrap";
import "./SignInPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeCurrentPage } from "Config/Redux/Slice/CurrentPageSlice";
import { changeToken } from "Config/Redux/Slice/HeaderRequestSlice";
import { useTranslation } from "react-i18next";
import { authBusiness } from "Business";
import { WarningModal } from "Components/Modal";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const modalRef = useRef();

  const onSignIn = async (e) => {
    e.preventDefault();
    let signIn = await authBusiness.SignIn(account.email, account.password);
    if (signIn.data.httpCode === 200) {
      if (signIn.data.token) {
        dispatch(changeToken(signIn.data.token));
      }
      navigate("/MainPage")
    } else {
      modalRef.current.setMessage("Wrong Email or Password!");
      modalRef.current.onToggleModal();
      setAccount({ email: account.email, password: "" });
    }
  };

  const onSignUp = () => {
    dispatch(changeCurrentPage(2));
    navigate("/SignUp");
  };

  const onChangeValueEmail = (e) => {
    setAccount((prev) => ({ ...prev, email: e.target.value }));
  };

  const onChangeValuePassword = (e) => {
    setAccount((prev) => ({ ...prev, password: e.target.value }));
  };

  const onResetPassword = () => {
    dispatch(changeCurrentPage(3));
    navigate("/ResetPassword");
  };

  return (
    <div className="SignIn pt-3">
      <WarningModal ref={modalRef} />
      <Row className="justify-content-center">
        <Col lg={4} xs={11}>
          <div className="text-center mb-4">
            <h4 className="SignIn__title">{t("Sign In")}</h4>
            <p className="text-muted mb-4">{t("Sign in to continue.")}</p>
          </div>

          <Card className="SignIn__card">
            <Card.Body className="p-4">
              <Form onSubmit={onSignIn}>
                <FormGroup className="mb-3">
                  <FormLabel className="SignIn__form-label">
                    {t("Email")}
                  </FormLabel>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="SignIn__input-text">
                      <i className="bi bi-person-fill" />
                    </InputGroup.Text>

                    <FormControl
                      className="SignIn__form-control"
                      placeholder={t("Enter Email")}
                      aria-label="Enter Email"
                      onChange={onChangeValueEmail}
                      value={account.email}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <div className="float-end">
                    <div
                      className="text-muted font-size-13 cur-pointer"
                      onClick={onResetPassword}
                    >
                      {t("Forgot password?")}
                    </div>
                  </div>
                  <FormLabel className="SignIn__form-label">
                    {t("Password")}
                  </FormLabel>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="SignIn__input-text">
                      <i className="bi bi-lock-fill"></i>
                    </InputGroup.Text>

                    <FormControl
                      className="SignIn__form-control"
                      placeholder={t("Enter Password")}
                      aria-label="Enter Password"
                      type="password"
                      autoComplete="true"
                      value={account.password}
                      onChange={onChangeValuePassword}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <FormCheck
                    className="SignIn__form-check"
                    type="checkbox"
                    label={t("Remember Me")}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="SignIn__btn-signin w-100"
                >
                  {t("Sign In")}
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <div className="SignIn__sign-up mt-3 text-center">
            <p>
              {t("Don't have an account?")}
              <span
                className="ms-1 text-primary cur-pointer"
                onClick={onSignUp}
              >
                {t("Signup now")}
              </span>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignInPage;
