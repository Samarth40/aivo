import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LockClosedIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);

  // Get token from URL
  const token = searchParams.get("token");

  useEffect(() => {
    // In a real application, you would validate the token with your API
    // This is just a simulation for demonstration
    if (!token) {
      setIsTokenValid(false);
    } else {
      // Simulate token validation
      const isValid = token.length > 10; // Simple mock validation
      setIsTokenValid(isValid);
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!password || !confirmPassword) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // For demonstration purposes - in a real app, this would connect to an API
    // to validate token and update password
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // In a real app, you would send the new password and token to the backend
    }, 1500);
  };

  // Function to handle disabling paste for confirm password
  const handlePaste = (e) => {
    e.preventDefault();
    return false;
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-900/30 rounded-lg p-8 border border-red-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              Invalid or Expired Link
            </h2>
            <p className="text-gray-300 mb-6">
              This password reset link is invalid or has expired. Please request
              a new password reset link.
            </p>
            <Link to="/forgot-password" className="btn btn-primary w-full">
              Request New Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            Create New Password
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Please create a strong password for your account to keep your data
            secure.
          </p>
        </motion.div>
      </div>

      {/* Right side - Form area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        <motion.div
          className="w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Link
            to="/login"
            className="text-gray-400 hover:text-white mb-8 flex items-center gap-2"
          >
            <ArrowLeftOnRectangleIcon className="h-4 w-4" />
            <span>Back to login</span>
          </Link>

          <h2 className="text-3xl font-bold text-white mb-2">
            {isSubmitted ? "Password Reset Complete" : "Create New Password"}
          </h2>
          <p className="text-gray-400 mb-8">
            {isSubmitted
              ? "Your password has been successfully reset. You can now log in with your new password."
              : "Enter a new password for your account."}
          </p>

          {!isSubmitted ? (
            <motion.form
              className="space-y-6"
              onSubmit={handleSubmit}
              variants={fadeInUp}
            >
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 6 characters long
                </p>
              </div>

              <div>
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
                    required
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
              </div>

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

              <button
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
                    Reset Password
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-green-900/30 text-green-400">
                  <CheckCircleIcon className="h-12 w-12" />
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                Your password has been successfully reset. You can now log in to
                your account with your new password.
              </p>
              <Link to="/login" className="btn btn-primary w-full">
                Continue to Login
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
