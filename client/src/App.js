import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Issue from "./pages/Issue";
import Polls from "./pages/Polls";
import Register from "./pages/Register";
import CreatePoll from "./pages/CreatePoll";
import Feedback from "./pages/Feedback";
import Help from "./pages/HelpPage"; // Help Page
import About from "./pages/About"; // About Page
import ViewIssues from "./pages/ViewIssues";
import ViewFeedback from "./pages/ViewFeedback";
import { useAuth } from "./context/authContext";


function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Route - Login */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/profile" />} />
        
        {/* Help and About pages only accessible when not logged in */}
        {!user && (
          <>
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
             <Route path="/polls" element={<Polls />} />
 

          </>
        )}

        {/* Protected Routes after login */}
        {user && (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/polls" element={<Polls />} />
            <Route path="/issue" element={<Issue />} />
            <Route path="/feedback" element={<Feedback />} />

               <Route path="/polls/create" element={<CreatePoll />} />
            <Route
  path="/viewissues"
  element={
    user?.role === "cr" || user?.role === "teacher" ? (
      <ViewIssues />
    ) : (
      <Navigate to="/profile" replace />
    )
  }
/>
<Route
  path="/viewfeedback"
  element={
    user?.role === "cr" || user?.role === "teacher" ? (
      <ViewFeedback />
    ) : (
      <Navigate to="/profile" replace />
    )
  }
/>

          </>
        )}

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={user ? "/profile" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
