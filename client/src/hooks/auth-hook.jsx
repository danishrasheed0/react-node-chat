
const USEAuth = () => {

  const login = (data) => {
    let { token, user } = data;
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(user));
    console.log("all set ");
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
