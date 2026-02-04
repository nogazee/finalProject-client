import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuthForm from "./components/auth/AuthForm";
import Layout from "./components/layout/Layout";
import Profile from "./components/pages/profile/Profile";
import Requests from "./components/pages/requests/Requests";
import RequestsHistory from "./components/pages/manage-requests/RequestsHistory";
import PendingRequests from "./components/pages/manage-requests/PendingRequests";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/manage/history" element={<RequestsHistory />} />
        <Route path="/manage/pending" element={<PendingRequests />} />
        <Route path="*" element={<Navigate to="/requests" />} />
      </Routes>
    </Layout>
  );
}

export default App;
