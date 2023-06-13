import "./App.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./Config/Translate/i18n.js";
import PageTemplate from "Layout/Common/PageTemplate/PageTemplate";
import { SignInPage } from "Layout/Authentication";
import {
  ManageCompany,
  ManageJob,
  CompanyPage,
  JobPage,
  EditCompany,
  EditJob,
  AddJob,
  Report,
  UserInfo,
  HomePage,
  Chat,
  ProcessApplicationPage,
} from "Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "Config/Provider";

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <PageTemplate>
          <Routes>
            <Route path="/SignIn" element={<SignInPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/manageCompany" element={<ManageCompany />} />
            <Route path="/manageCompany/editCompany/:id" element={<EditCompany />} />
            <Route path="/manageCompany/companyInfo/:id" element={<CompanyPage />} />
            <Route path="/manageJob" element={<ManageJob />} />
            <Route path="/manageJob/editJob/:id" element={<EditJob />} />
            <Route path="/manageJob/:id" element={<JobPage />} />
            <Route path="/manageJob/addJob" element={<AddJob />} />
            <Route path="/userInfo/:id" element={<UserInfo />} />
            <Route path="/report" element={<Report />} />
            <Route path="/message" element={<Chat />} />
            <Route path="/processApplication/:id" element={<ProcessApplicationPage />} />
            <Route path="*" element={<Navigate to="/Home" />} />
          </Routes>
        </PageTemplate>
      </AuthProvider>
    </I18nextProvider>
  );
};

export default App;
