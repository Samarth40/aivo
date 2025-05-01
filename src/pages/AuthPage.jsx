import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  AtSymbolIcon,
  LockClosedIcon,
  BuildingOfficeIcon,
  ArrowLeftOnRectangleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!email || !password || (!isLogin && !companyName)) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    // Confirm password validation for registration
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // For demonstration purposes - in a real app, this would connect to an authentication API
    if (isLogin) {
      // Simulate login
      console.log("Logging in with:", { email, password });
      // Mock successful login
      setTimeout(() => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem(
          "user",
          JSON.stringify({ email, name: email.split("@")[0] })
        );
        navigate("/dashboard");
        setIsLoading(false);
      }, 1500);
    } else {
      // Simulate registration
      console.log("Registering with:", { email, password, companyName });
      // Mock successful registration
      setTimeout(() => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem(
          "user",
          JSON.stringify({ email, companyName, name: email.split("@")[0] })
        );
        navigate("/dashboard");
        setIsLoading(false);
      }, 1500);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const staggerFormItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Function to handle disabling paste for confirm password
  const handlePaste = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900">
      {/* Left side - Brand area */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-gray-800 to-gray-900 p-12 items-center justify-center">
        <motion.div
          className="max-w-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-8">
            <div className="bg-[#4f46e5] text-white text-3xl font-bold p-4 rounded-xl">
              AI
            </div>
            <h1 className="ml-4 text-5xl font-bold gradient-text flex items-center">
              AIVO
            </h1>
          </div>
          <h2 className="text-white text-3xl font-bold mb-6">
            AI Search Visibility Optimizer
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Enhance your product visibility in AI search systems and stay ahead
            of the competition with our advanced analytics and optimization
            tools.
          </p>
          <div className="bg-gray-800/40 p-6 rounded-xl backdrop-blur-sm">
            <blockquote className="text-gray-300 italic mb-4">
              "AIVO helped us increase our product visibility by 235% in
              AI-powered search engines within just 3 months."
            </blockquote>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-700 rounded-full mr-4"></div>
              <div>
                <p className="text-white font-medium">Jane Cooper</p>
                <p className="text-gray-400 text-sm">
                  Marketing Director, TechCorp
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        <motion.div
          className="w-full max-w-md"
          key={isLogin ? "login" : "register"}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Link
            to="/"
            className="text-gray-400 hover:text-white mb-8 flex items-center gap-2"
          >
            <ArrowLeftOnRectangleIcon className="h-4 w-4" />
            <span>Back to home</span>
          </Link>

          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-gray-400 mb-8">
            {isLogin
              ? "Enter your details to access your account"
              : "Sign up to start optimizing your product visibility"}
          </p>

          <motion.form
            className="space-y-6"
            onSubmit={handleSubmit}
            variants={staggerFormItems}
          >
            <motion.div variants={fadeInUp}>
              {!isLogin && (
                <div className="mb-6">
                  <label
                    htmlFor="company-name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Company Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BuildingOfficeIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      id="company-name"
                      name="company"
                      type="text"
                      required={!isLogin}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500"
                      placeholder="Your company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSymbolIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {isLogin && (
                <div className="flex justify-end mt-1">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}
              {!isLogin && (
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 6 characters long
                </p>
              )}
            </motion.div>

            {!isLogin && (
              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required={!isLogin}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onPaste={handlePaste}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 focus:outline-none"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Type your password again to confirm
                </p>
              </motion.div>
            )}

            {error && (
              <motion.div
                className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}

            {isLogin && (
              <motion.div variants={fadeInUp} className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me for 30 days
                </label>
              </motion.div>
            )}

            <motion.button
              variants={fadeInUp}
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70"
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  {isLogin ? "Sign in to account" : "Create account"}
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </>
              )}
            </motion.button>
          </motion.form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                className="font-medium text-indigo-400 hover:text-indigo-300 focus:outline-none"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setShowPassword(false);
                  setShowConfirmPassword(false);
                  setConfirmPassword(""); // Reset confirm password when switching modes
                }}
              >
                {isLogin ? "Create account" : "Sign in"}
              </button>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-gray-900 text-sm text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex justify-center items-center py-3 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800 hover:bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.338-3.369-1.338-.454-1.153-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.09-.645.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>GitHub</span>
              </button>
              <button className="flex justify-center items-center py-3 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800 hover:bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                <span>Google</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
