import { useState } from "react";

const MainHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("John Doe"); // Example username
  const handleLogout = () => {
    // Logic to handle user logout
    setIsLoggedIn(false);
    // Clear user data if necessary
  };

  const handleLogin = () => {
    // Logic to handle user login
    setIsLoggedIn(true);
    // Set user data if necessary
  };

  return (
    <header className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-2xl font-bold">ChitChat</span>
      </div>

      {/* User Info and Authentication Buttons */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <span className="text-lg">Hello, {userName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Sign In
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
