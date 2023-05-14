import React, { useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authBusiness, companyBusiness } from "Business";
import {
  changeSession,
  LogOut,
  SetIsPending,
  SetCompany,
} from "Config/Redux/Slice/UserSlice";
import { LoadingPage } from "Layout/Common";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoading = useSelector((state) => state.User.pending);
  const listAuthPath = ["/SignIn", "/SignUp"];
  useLayoutEffect(() => {
    let isSubscribed = true;
    const unsubscribed = async () => {
      let session = await authBusiness.GetSession();
      dispatch(SetIsPending(false));
      if (
        session.data &&
        session.data.httpCode !== 401 &&
        session.data.objectData &&
        session.data.objectData.email
      ) {
        dispatch(changeSession(session.data.objectData));
        let result = await companyBusiness.GetListCompanyOwner();
        if (result.data.httpCode === 200) {
          let _company = result.data.objectData;
          if (_company.length > 0) {
            dispatch(SetCompany(_company[0].companyId));
          }
        }
        let path = location.pathname;
        if (listAuthPath.find((x) => x === path)) navigate("/Home");
      } else {
        dispatch(LogOut());
        navigate("/SignIn");
      }
    };
    if (isSubscribed) {
      dispatch(SetIsPending(true));
      unsubscribed();
    }
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  if (isLoading === true) return <LoadingPage />;
  return <>{children}</>;
};

export default React.memo(AuthProvider);
