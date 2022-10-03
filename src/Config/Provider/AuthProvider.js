import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authBusiness } from "Business";
import { changeSession } from "Config/Redux/Slice/UserSlice";

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.CurrentPage.page);

  useLayoutEffect(() => {
    const unsubscribed = async () => {
      let session = await authBusiness.GetSession();
      if (session) {
        changeSession(session);
        navigate("/MainPage");
      } else {
        if (currentPage === 1) navigate("/SignIn");
        else if (currentPage === 2) navigate("/SignUp");
        else if (currentPage === 3) navigate("/ResetPassword");
        else if (currentPage === 4) navigate("/AuthCode");
        else navigate("/SignIn");
      }
    };
    return () => {
      unsubscribed();
    };
  }, [currentPage, dispatch, navigate]);

  return <>{children}</>;
}

export default React.memo(AuthProvider);
