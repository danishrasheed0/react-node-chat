import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import UseHttpRequest from "../../hooks/useApi";
import UseAauth from "../../hooks/auth-hook";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const SigninView = ({ onLoginIn }) => {
  const navigate = useNavigate();

  const { login } = UseAauth();
  const { isLoading, sendRequest } = UseHttpRequest((response) => {
    login(response.data);
    onLoginIn();
    toast.success("User authenticated");
    navigate("/dashboard");
  });

  const [formData, setFormData] = useState({ email: "", password: "" });

  const formHandler = (value, key) => {
    setFormData((preState) => {
      return { ...preState, ...{ [key]: value } };
    });
  };

  const loginHandler = () => {
    sendRequest(`users/signin`, "POST", formData);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white custom-shadow rounded-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm flex flex-col gap-5">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => {
                  formHandler(e.target.value, "email");
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  formHandler(e.target.value, "password");
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              onClick={loginHandler}
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Loading ..." : "Sign in"}
            </button>
          </div>
          <div className="text-center text-sm text-gray-600">
            Dont have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

SigninView.propTypes = {
  onLoginIn: PropTypes.func,
};

export default SigninView;
