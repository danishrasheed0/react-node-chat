import { useNavigate } from "react-router-dom";
const USEAuth = () => {
  const navigate = useNavigate();
  const login = (data) => {
    let { token, user } = data;
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(user));
    console.log("all set ");
    navigate("/dashboard");
  };
  const signOut = () => {
    localStorage.clear();
  };

  return {
    login,
    signOut,
  };
};
export default USEAuth;
