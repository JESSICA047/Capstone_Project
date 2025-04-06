import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();
export { AuthContext }; // Export the context so it can be imported directly

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for login status on component mount
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    setIsLoggedIn(userData !== null);
  }, []);

  // Sync localStorage whenever isLoggedIn changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const logout = () => {
    localStorage.removeItem("hasSeenWelcome");
    localStorage.removeItem("userData");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
