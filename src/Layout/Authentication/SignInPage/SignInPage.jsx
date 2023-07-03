import React, { useState, useRef } from "react";
import {
  Col,
  Row,
  Card,
  Form,
  InputGroup,
  FormControl,
  FormLabel,
  FormGroup,
  Spinner,
} from "react-bootstrap";
import "./SignInPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeToken } from "Config/Redux/Slice/HeaderRequestSlice";
import { SetIsPending } from "Config/Redux/Slice/UserSlice";
import { useTranslation } from "react-i18next";
import { authBusiness } from "Business";
import { WarningModal } from "Components/Modal";
import { ButtonPrimary } from "Components/Button";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const modalRef = useRef();

  const onSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    let signIn = await authBusiness.SignIn(account.email, account.password);
    setLoading(false);
    if (signIn.data.httpCode === 200) {
      dispatch(changeToken(signIn.data.objectData.token));
      dispatch(SetIsPending());
      navigate("/Home");
    } else {
      modalRef.current.setMessage("Wrong Email or Password!");
      modalRef.current.onToggleModal();
      setAccount({ email: account.email, password: "" });
    }
  };

  const onChangeValueEmail = (e) => {
    setAccount((prev) => ({ ...prev, email: e.target.value }));
  };

  const onChangeValuePassword = (e) => {
    setAccount((prev) => ({ ...prev, password: e.target.value }));
  };

  return (
    <div className="SignIn pt-3 mb-3">
      <WarningModal ref={modalRef} />
      <Row className="justify-content-center">
        <Col lg={4} xs={11}>
          <div className="text-center mb-1">
            <h4 className="SignIn__title">{t("auth.signin.title")}</h4>
            <p className="text-muted">{t("Sign in to continue.")}</p>
          </div>

          <Card className="SignIn__card">
            <Card.Body className="p-3">
              <Form onSubmit={onSignIn}>
                <FormGroup className="mb-3">
                  <FormLabel className="SignIn__form-label">{t("Email")}</FormLabel>
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
                  <FormLabel className="SignIn__form-label">{t("Password")}</FormLabel>
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
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
									<FormCheck
										className="SignIn__form-check"
										type="checkbox"
										label={t("Remember Me")}
									/>
								</Form.Group> */}

                <ButtonPrimary type="submit" className="w-100">
                  {loading ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    t("Sign In")
                  )}
                </ButtonPrimary>
              </Form>
            </Card.Body>
          </Card>
          <div className="SignIn__sign-up mt-3 text-center">
            <p>
              {t("Don't have an account?")}
              <a
                className="ms-1 text-primary cur-pointer"
                href="https://jobhere.tech/SignUp"
                target="_blank"
                rel="noreferrer"
              >
                {t("Signup now")}
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignInPage;
