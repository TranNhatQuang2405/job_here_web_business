import "./App.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./Config/Translate/i18n.js";
import PageTemplate from "Layout/Common/PageTemplate/PageTemplate";
import { SignInPage } from "Layout/Authentication";
import {
  ManageCompany,
  ManageJob,
  CompanyInfo,
  JobInfo,
  EditCompany,
  EditJob,
  AddJob,
  Report,
  UserInfo
} from "Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "Config/Provider";

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <PageTemplate>
          <Routes>
            <Route path="/SignIn" element={<SignInPage />}></Route>
            {/* <Route path="/Home" element={<MainPage />}></Route> */}
            <Route path="/manageCompany" element={<ManageCompany />}></Route>
            <Route
              path="/manageCompany/editCompany/:id"
              element={<EditCompany />}
            ></Route>
            <Route
              path="/manageCompany/companyInfo/:id"
              element={<CompanyInfo />}
            ></Route>
            <Route path="/manageJob" element={<ManageJob />}></Route>
            <Route path="/manageJob/editJob/:id" element={<EditJob />}></Route>
            <Route path="/manageJob/jobInfo/:id" element={<JobInfo />}></Route>
            <Route path="/manageJob/addJob" element={<AddJob />}></Route>
            <Route path="/userInfo/:id" element={<UserInfo />}></Route>
            <Route path="/report" element={<Report />}></Route>
            <Route path="*" element={<Navigate to="/manageCompany" />} />
          </Routes>
        </PageTemplate>
      </AuthProvider>
    </I18nextProvider>
  );
};

export default App;
