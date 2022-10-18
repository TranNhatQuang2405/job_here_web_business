import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authBusiness } from "Business";
import { changeSession, LogOut, SetIsPending } from "Config/Redux/Slice/UserSlice";
import { LoadingPage } from "Layout/Common";

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.CurrentPage.page);
    const isLoading = useSelector((state) => state.User.pending);

    useLayoutEffect(() => {
        let isSubscribed = true;
        const unsubscribed = async () => {
            let session = await authBusiness.GetSession();
            dispatch(SetIsPending(false))
            if (session.data && session.data.httpCode !== 401 && session.data.objectData && session.data.objectData.email) {
                dispatch(changeSession(session.data.objectData));
                // navigate("/Home");
            } else {
                dispatch(LogOut());
                if (currentPage === 1) navigate("/SignIn");
                else navigate("/SignIn");
            }
        };
        if (isSubscribed) {
            dispatch(SetIsPending(true))
            unsubscribed();
        }
        return () => {
            isSubscribed = false;
        };
    }, [currentPage, navigate]);
    if (isLoading === true) return <LoadingPage />;
    return <>{children}</>;
}

export default React.memo(AuthProvider);
