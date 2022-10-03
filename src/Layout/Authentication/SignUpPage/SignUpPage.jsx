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
  Button,
  Alert,
} from "react-bootstrap";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeXAuthToken } from "Config/Redux/Slice/HeaderRequestSlice";
import { changeCurrentPage } from "Config/Redux/Slice/CurrentPageSlice";
import { useTranslation } from "react-i18next";
import { authBusiness } from "Business";
import { WarningModal } from "Components/Modal";
import {
  ValidateEmail,
  ValidateUTF8Name,
  ValidatePassword,
  ValidateDateOfBirth,
  ValidatePhone,
} from "Config/Validate";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [notify, setNotify] = useState("null");
  const [account, setAccount] = useState({
    email: "",
    displayName: "",
    password: "",
    dateOfBirth: "",
    phone: "",
  });
  const modalRef = useRef();

  const onSignIn = () => {
    dispatch(changeCurrentPage(1));
    navigate("/SignIn");
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    if (!ValidateEmail(account.email)) {
      modalRef.current.setMessage("Invalid Email!");
      modalRef.current.onToggleModal();
      // setAccount({ ...account, password: "" });
    } else if (!ValidateUTF8Name(account.displayName)) {
      modalRef.current.setMessage("Invalid Display Name!");
      modalRef.current.onToggleModal();
      // setAccount({ ...account, password: "" });
    } else if (!ValidatePassword(account.password)) {
      modalRef.current.setMessage("Password must at least 8 characters!");
      modalRef.current.onToggleModal();
      // setAccount({ ...account, password: "" });
    } else if (!ValidateDateOfBirth(account.dateOfBirth)) {
      modalRef.current.setMessage("Invalid Date Of Birth!");
      modalRef.current.onToggleModal();
      // setAccount({ ...account, password: "" });
    } else if (!ValidatePhone(account.phone)) {
      modalRef.current.setMessage("Invalid Phone Number!");
      modalRef.current.onToggleModal();
      // setAccount({ ...account, password: "" });
    } else {
      let { email, password, dateOfBirth, displayName, phone } = account;
      let signUp = await authBusiness.SignUp(
        email,
        password,
        displayName,
        account.dateOfBirth.replaceAll("-", "/"),
        phone
      );
      if (signUp.data.httpCode === 200) {
        var xAuthToken = signUp.headers["x-auth-token"];
        dispatch(changeXAuthToken(xAuthToken));
        dispatch(changeCurrentPage(4));
        navigate("/AuthCode");
      } else {
        modalRef.current.setMessage("Some thing went wrong! Please try again!");
        modalRef.current.onToggleModal();
        // setAccount({ ...account, password: "" });
      }
    }
  };

  const onChangeValueEmail = (e) => {
    setAccount((prev) => ({ ...prev, email: e.target.value }));
  };

  const onChangeValueDisplayName = (e) => {
    setAccount((prev) => ({ ...prev, displayName: e.target.value }));
  };

  const onChangeValuePassword = (e) => {
    setAccount((prev) => ({ ...prev, password: e.target.value }));
  };

  const onChangeValueDateOfBirth = (e) => {
    setAccount((prev) => ({ ...prev, dateOfBirth: e.target.value }));
  };

  const onChangeValuePhoneNumber = (e) => {
    setAccount((prev) => ({ ...prev, phone: e.target.value }));
  };

  return (
    <div className="SignUp">
      <WarningModal ref={modalRef} />
      <div className="SignUp__account-pages pt-3">
        <Row className="justify-content-center">
          <Col lg={4} xs={11}>
            <div className="text-center mb-4">
              <h4 className="SignUp__title">{t("Sign Up")}</h4>
              <p className="text-muted mb-4">
                {t("Get your Job Here account now.")}
              </p>
            </div>

            <Card className="SignUp__card">
              {notify === true ? (
                <Alert
                  variant="success"
                  dismissible
                  onClose={() => setNotify("null")}
                >
                  {t("You have signed up success!")}
                </Alert>
              ) : notify === false ? (
                <Alert
                  variant="danger"
                  dismissible
                  onClose={() => setNotify("null")}
                >
                  {t("jh-signup-fail")}
                </Alert>
              ) : (
                <></>
              )}
              <Card.Body className="p-4 pb-1">
                <Form onSubmit={onSignUp}>
                  <FormGroup className="mb-3">
                    <FormLabel className="SignUp__form-label">Email</FormLabel>
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="SignUp__input-text">
                        <i className="bi bi-envelope-fill" />
                      </InputGroup.Text>
                      <FormControl
                        type="email"
                        className="SignUp__form-control"
                        placeholder={t("Enter Email")}
                        aria-label="Enter Email"
                        value={account.email}
                        onChange={onChangeValueEmail}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <FormLabel className="SignUp__form-label">
                      {t("Display Name")}
                    </FormLabel>
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="SignUp__input-text">
                        <i className="bi bi-person-fill" />
                      </InputGroup.Text>
                      <FormControl
                        type="text"
                        className="SignUp__form-control"
                        placeholder={t("Enter Username")}
                        aria-label="Enter Username"
                        value={account.displayName}
                        onChange={onChangeValueDisplayName}
                        minLength={8}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup className="mb-4">
                    <FormLabel className="SignUp__form-label">
                      {t("Password")}
                    </FormLabel>
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="SignUp__input-text">
                        <i className="bi bi-lock-fill" />
                      </InputGroup.Text>
                      <FormControl
                        type="password"
                        className="SignUp__form-control"
                        placeholder={t("Enter Password")}
                        aria-label="Enter Password"
                        value={account.password}
                        onChange={onChangeValuePassword}
                        minLength={8}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <FormLabel className="SignUp__form-label">
                      {t("Date Of Birth")}
                    </FormLabel>
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="SignUp__input-text">
                        <i className="bi bi-calendar-date-fill" />
                      </InputGroup.Text>
                      <FormControl
                        type="date"
                        className="SignUp__form-control"
                        value={account.dateOfBirth}
                        onChange={onChangeValueDateOfBirth}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <FormLabel className="SignUp__form-label">
                      {t("Phone Number")}
                    </FormLabel>
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="SignUp__input-text">
                        <i className="bi bi-telephone-fill" />
                      </InputGroup.Text>
                      <FormControl
                        type="text"
                        className="SignUp__form-control"
                        placeholder={t("Enter Phone Number")}
                        aria-label="Enter Phone Number"
                        value={account.phone}
                        onChange={onChangeValuePhoneNumber}
                        minLength={10}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <Button className="SignUp__button w-100" type="submit">
                    {t("Sign Up")}
                  </Button>

                  <div className="mt-3 mb-2 text-center">
                    <p className="text-muted mb-0">
                      {t("By registering you agree to the Job Here's")}
                      <a href="/" className="signUp__textSignIn ms-2">
                        {t("Terms of Service")}
                      </a>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className="SignUp__sign-in text-center mt-1">
              <p>
                {t("Already have an account?")}
                <span
                  className="cur-pointer ms-2 signUp__textSignIn"
                  onClick={onSignIn}
                >
                  {t("Signin now")}
                </span>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignUpPage;
