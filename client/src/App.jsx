import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
// Components
import MainLayout from "./layouts/main-layout/MainLayout";
import NotFound from "./views/not-found/NotFound";
import SigninView from "./views/signin/SigninView";
import SignupView from "./views/signup/SignupView";
import ChatView from "./views/chat/ChatView";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isAuthenticatedHandler = () =>
    setIsAuthenticated(!!localStorage.getItem("token"));

  useEffect(() => {
    isAuthenticatedHandler();
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <BrowserRouter>
          <Routes>
            <Route
              path="/signup"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <SignupView />
              }
            />

            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <SigninView />
              }
            />
            <Route
              path="/signin"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <SigninView />
              }
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <MainLayout /> : <Navigate to="/" />}
            >
              <Route index element={<ChatView />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
