import React, { useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authBusiness } from "Business";
import { changeSession, LogOut, SetIsPending } from "Config/Redux/Slice/UserSlice";
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
        let path = location.pathname;
        if (listAuthPath.find((x) => x === path)) navigate("/manageCompany");
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
  }, [navigate]);
  if (isLoading === true) return <LoadingPage />;
  return <>{children}</>;
};

export default React.memo(AuthProvider);
