import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AtSymbolIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!email) {
      setError("Please enter your email address");
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

    // For demonstration purposes - in a real app, this would connect to an API
    // to handle sending a password reset link
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // In a real app, you would send a request to the backend to initiate the password reset
    }, 1500);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
            Reset Your Password
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            No worries! It happens to the best of us. Enter your email and we'll
            send you a link to reset your password.
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
            {isSubmitted ? "Check your email" : "Forgot Password"}
          </h2>
          <p className="text-gray-400 mb-8">
            {isSubmitted
              ? `We've sent a password reset link to ${email}. Please check your inbox and spam folder.`
              : "Enter your email address and we'll send you a link to reset your password."}
          </p>

          {!isSubmitted ? (
            <motion.form
              className="space-y-6"
              onSubmit={handleSubmit}
              variants={fadeInUp}
            >
              <div>
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
                    Send Reset Link
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
                The reset link will expire in 30 minutes. If you don't see the
                email, please check your spam folder.
              </p>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    setEmail("");
                    setIsSubmitted(false);
                  }}
                  className="btn btn-secondary"
                >
                  Try with another email
                </button>
                <Link to="/login" className="btn btn-primary">
                  Return to login
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
