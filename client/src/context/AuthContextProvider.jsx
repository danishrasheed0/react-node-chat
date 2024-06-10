import { useContext, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "danish" });

  const signInHandler = (userItem) => {
    setUser(userItem);
  };

  const signOutHandler = (userItem) => {
    setUser(userItem);
  };

  return (
    <>
      <AuthContext.Provider value={{ user, signInHandler, signOutHandler }}>
        { children }
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);
