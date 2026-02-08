import { useContext } from "react";
import AuthContext from "./store/auth-context";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuthForm from "./components/auth/AuthForm";
import Layout from "./components/layout/Layout";
import Profile from "./components/pages/profile/Profile";
import Requests from "./components/pages/requests/Requests";
import RequestsHistory from "./components/pages/manage-requests/RequestsHistory";
import PendingRequests from "./components/pages/manage-requests/PendingRequests";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        {authCtx.token ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/requests" element={<Requests />} />
            <Route
              path="/manage/history"
              element={
                authCtx.userRole === "ADMIN" ? (
                  <RequestsHistory />
                ) : (
                  <Navigate to="/requests" />
                )
              }
            />
            <Route
              path="/manage/pending"
              element={
                authCtx.userRole === "ADMIN" ? (
                  <PendingRequests />
                ) : (
                  <Navigate to="/requests" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/requests" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Layout>
  );
}

export default App;
