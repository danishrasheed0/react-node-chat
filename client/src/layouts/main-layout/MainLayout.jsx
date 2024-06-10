import { Outlet } from "react-router-dom";
import UseAauth from "../../hooks/auth-hook";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const MainLayout = ({ onSignOut }) => {
  const signOutHandler = () => {
    signOut();
    onSignOut();
    navigate("/signin");
  };
  const { signOut } = UseAauth();
  const navigate = useNavigate();
  return (
    <>
      <header className="bg-indigo-600 text-white py-4 px-6 flex justify-between">
        <h1 className="text-2xl font-bold">Chat with User</h1>
        <button
          className="w-40 h-10 bg-green-500 rounded-lg"
          onClick={signOutHandler}
        >
          Sign out
        </button>
      </header>
      <Outlet />
    </>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  onSignOut: PropTypes.func,
};
