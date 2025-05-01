import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { isDarkMode, toggleTheme } = useTheme();

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Example Corp",
    website: "https://example.com",
    plan: "Premium",
    nextBilling: "2025-06-01",
    apiKey: "aivo_sk_12345678901234567890",
  };

  // Mock integrations
  const integrations = [
    {
      id: 1,
      name: "WordPress",
      description:
        "Connect your WordPress site to automatically analyze and optimize your product pages.",
      isConnected: true,
      lastSync: "2025-04-30 09:15 AM",
    },
    {
      id: 2,
      name: "Shopify",
      description:
        "Connect your Shopify store to analyze and optimize your product listings.",
      isConnected: false,
      lastSync: null,
    },
    {
      id: 3,
      name: "WooCommerce",
      description:
        "Connect your WooCommerce store to analyze and optimize your product pages.",
      isConnected: false,
      lastSync: null,
    },
    {
      id: 4,
      name: "Custom API",
      description: "Use our API to connect any custom platform or CMS.",
      isConnected: true,
      lastSync: "2025-04-29 02:30 PM",
    },
  ];

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    weeklyReports: true,
    scoreChanges: true,
    aiTrendAlerts: true,
    productAnalysis: false,
    competitorUpdates: true,
  });

  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  // Mock webhook settings
  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      url: "https://example.com/webhooks/aivo",
      events: ["report.generated", "analysis.completed"],
      isActive: true,
    },
  ]);

  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [newWebhookEvents, setNewWebhookEvents] = useState({
    "report.generated": false,
    "analysis.completed": false,
    "score.changed": false,
  });

  const handleAddWebhook = (e) => {
    e.preventDefault();

    const selectedEvents = Object.entries(newWebhookEvents)
      .filter(([_, value]) => value)
      .map(([key]) => key);

    if (newWebhookUrl && selectedEvents.length > 0) {
      setWebhooks([
        ...webhooks,
        {
          id: webhooks.length + 1,
          url: newWebhookUrl,
          events: selectedEvents,
          isActive: true,
        },
      ]);
      setNewWebhookUrl("");
      setNewWebhookEvents({
        "report.generated": false,
        "analysis.completed": false,
        "score.changed": false,
      });
    }
  };

  const handleDeleteWebhook = (id) => {
    setWebhooks(webhooks.filter((webhook) => webhook.id !== id));
  };

  const handleToggleWebhook = (id) => {
    setWebhooks(
      webhooks.map((webhook) =>
        webhook.id === id
          ? { ...webhook, isActive: !webhook.isActive }
          : webhook
      )
    );
  };

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "appearance", label: "Appearance" },
    { id: "subscription", label: "Subscription" },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API & Webhooks" },
    { id: "notifications", label: "Notifications" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your account, integrations and preferences
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`inline-flex items-center py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile Settings */}
      {activeTab === "profile" && (
        <div className="card">
          <h2 className="text-lg font-medium mb-6">Profile Information</h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="input mt-1"
                  defaultValue={userData.name}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input mt-1"
                  defaultValue={userData.email}
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="input mt-1"
                  defaultValue={userData.company}
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="url"
                  className="input mt-1"
                  defaultValue={userData.website}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="input mt-1"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-500">
                Leave blank to keep your current password
              </p>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>

          <hr className="my-8" />

          <h3 className="text-md font-medium text-gray-900 mb-4">
            Delete Account
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button className="btn bg-red-600 text-white hover:bg-red-700">
            Delete Account
          </button>
        </div>
      )}

      {/* Appearance Settings */}
      {activeTab === "appearance" && (
        <div className="card">
          <h2 className="text-lg font-medium mb-6">UI Appearance</h2>
          <p className="text-gray-600 mb-6">
            Customize the look and feel of the AIVO platform to your preference.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-md font-medium mb-6">Theme</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  className={`theme-option border rounded-lg p-6 cursor-pointer hover:border-primary ${
                    !isDarkMode
                      ? "border-primary bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => isDarkMode && toggleTheme()}
                >
                  <div className="flex justify-center mb-4">
                    <SunIcon className="h-12 w-12 text-amber-500" />
                  </div>
                  <h4 className="font-medium text-center">Light Mode</h4>
                  <p className="text-sm text-gray-600 text-center mt-2">
                    Classic light interface
                  </p>
                </div>

                <div
                  className={`theme-option border rounded-lg p-6 cursor-pointer hover:border-primary ${
                    isDarkMode
                      ? "border-primary bg-gray-700"
                      : "border-gray-200"
                  }`}
                  onClick={() => !isDarkMode && toggleTheme()}
                >
                  <div className="flex justify-center mb-4">
                    <MoonIcon className="h-12 w-12 text-indigo-300" />
                  </div>
                  <h4
                    className={`font-medium text-center ${
                      isDarkMode ? "text-gray-100" : ""
                    }`}
                  >
                    Dark Mode
                  </h4>
                  <p
                    className={`text-sm text-center mt-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Reduced eye strain in low-light
                  </p>
                </div>

                <div className="theme-option border border-gray-200 rounded-lg p-6 cursor-not-allowed opacity-60">
                  <div className="flex justify-center mb-4">
                    <ComputerDesktopIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <h4 className="font-medium text-center">System Default</h4>
                  <p className="text-sm text-gray-600 text-center mt-2">
                    Coming soon
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-md font-medium mb-4">Interface Density</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-blue-50 text-primary border border-primary rounded-md">
                  Default
                </button>
                <button className="px-4 py-2 bg-gray-50 text-gray-500 border border-gray-200 rounded-md">
                  Compact
                </button>
                <button className="px-4 py-2 bg-gray-50 text-gray-500 border border-gray-200 rounded-md">
                  Comfortable
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Adjust the spacing and density of UI elements.
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-md font-medium mb-4">Accent Color</h3>
              <div className="flex flex-wrap gap-4">
                <button className="w-10 h-10 rounded-full bg-[#4f46e5] ring-2 ring-offset-2 ring-[#4f46e5]"></button>
                <button className="w-10 h-10 rounded-full bg-blue-500"></button>
                <button className="w-10 h-10 rounded-full bg-teal-500"></button>
                <button className="w-10 h-10 rounded-full bg-amber-500"></button>
                <button className="w-10 h-10 rounded-full bg-pink-500"></button>
                <button className="w-10 h-10 rounded-full bg-red-500"></button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Coming soon: Customize the accent color of the interface.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 flex justify-end">
            <button className="btn btn-primary">Save Preferences</button>
          </div>
        </div>
      )}

      {/* Subscription Settings */}
      {activeTab === "subscription" && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-medium mb-6">Current Plan</h2>

            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg mb-6">
              <div>
                <div className="flex items-center">
                  <div className="text-xl font-bold text-gray-900">
                    {userData.plan}
                  </div>
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                    Active
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Next billing date: {userData.nextBilling}
                </p>
              </div>
              <button className="btn btn-secondary">Manage Subscription</button>
            </div>

            <h3 className="text-md font-medium text-gray-900 mb-4">
              Plan Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Real-time monitoring and priority adjustments
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Up to 50 product pages
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Advanced optimization suggestions
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Competitive analysis
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Weekly AI search trend reports
              </li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-lg font-medium mb-6">Upgrade Plan</h2>

            <div className="bg-gray-50 rounded-lg overflow-hidden border">
              <div className="px-6 py-4 bg-gray-100 border-b">
                <h3 className="font-medium">Enterprise Plan</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Unlock the full power of AIVO with custom integrations,
                  unlimited product pages, and dedicated support.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Custom integrations with CMS
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Unlimited product pages
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Full API access
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Custom reporting
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Dedicated account manager
                  </li>
                </ul>
                <button className="btn btn-primary w-full">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-medium mb-6">Billing History</h2>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Invoice</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      May 1, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Premium Plan - Monthly Subscription
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      $99.00
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary hover:text-blue-700">
                        Download
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Apr 1, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Premium Plan - Monthly Subscription
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      $99.00
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary hover:text-blue-700">
                        Download
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Mar 1, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Premium Plan - Monthly Subscription
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      $99.00
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Paid
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary hover:text-blue-700">
                        Download
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Integrations Settings */}
      {activeTab === "integrations" && (
        <div className="card">
          <h2 className="text-lg font-medium mb-6">
            CMS & Platform Integrations
          </h2>
          <p className="text-gray-600 mb-6">
            Connect your content management systems or e-commerce platforms to
            automatically analyze and optimize your product pages.
          </p>

          <div className="space-y-6">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {integration.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {integration.description}
                    </p>
                    {integration.isConnected && integration.lastSync && (
                      <p className="mt-2 text-xs text-gray-500">
                        Last synced: {integration.lastSync}
                      </p>
                    )}
                  </div>
                  <div>
                    {integration.isConnected ? (
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-green-600">
                          <svg
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Connected
                        </div>
                        <button className="btn btn-secondary text-sm">
                          Configure
                        </button>
                      </div>
                    ) : (
                      <button className="btn btn-primary">Connect</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API & Webhooks Settings */}
      {activeTab === "api" && (
        <div className="space-y-8">
          <div className="card">
            <h2 className="text-lg font-medium mb-6">API Access</h2>
            <p className="text-gray-600 mb-6">
              Use our API to integrate AIVO with your own applications and
              systems.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Your API Key
                </h3>
                <button className="text-primary text-sm hover:underline">
                  Regenerate Key
                </button>
              </div>
              <div className="flex">
                <input
                  type="text"
                  readOnly
                  value={userData.apiKey}
                  className="input rounded-r-none flex-grow"
                />
                <button className="btn btn-secondary rounded-l-none">
                  Copy
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Keep this key secret! Do not share it in publicly accessible
                areas such as GitHub or client-side code.
              </p>
            </div>

            <h3 className="text-md font-medium mb-2">API Documentation</h3>
            <p className="text-sm text-gray-600 mb-4">
              Explore our API documentation to learn how to integrate with our
              services.
            </p>
            <div className="flex space-x-4">
              <button className="btn btn-primary">View API Docs</button>
              <button className="btn btn-secondary">
                Download OpenAPI Spec
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-medium">Webhooks</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Receive real-time event notifications to your server.
                </p>
              </div>
              <button
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#addWebhookModal"
              >
                Add Webhook
              </button>
            </div>

            <form
              className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
              onSubmit={handleAddWebhook}
            >
              <h3 className="text-md font-medium mb-4">Add New Webhook</h3>
              <div className="mb-4">
                <label
                  htmlFor="webhook-url"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Payload URL
                </label>
                <input
                  id="webhook-url"
                  type="url"
                  className="input"
                  placeholder="https://example.com/webhook"
                  value={newWebhookUrl}
                  onChange={(e) => setNewWebhookUrl(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <span className="block text-sm font-medium text-gray-700 mb-2">
                  Events to trigger this webhook
                </span>

                <div className="space-y-2">
                  {Object.entries(newWebhookEvents).map(
                    ([event, isChecked]) => (
                      <div key={event} className="flex items-center">
                        <input
                          id={`webhook-event-${event}`}
                          type="checkbox"
                          className="h-4 w-4 text-primary rounded border-gray-300"
                          checked={isChecked}
                          onChange={() =>
                            setNewWebhookEvents({
                              ...newWebhookEvents,
                              [event]: !isChecked,
                            })
                          }
                        />
                        <label
                          htmlFor={`webhook-event-${event}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {event.replace(".", " ")}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">
                  Create Webhook
                </button>
              </div>
            </form>

            {webhooks.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <p>No webhooks configured yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div
                    key={webhook.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              webhook.isActive ? "bg-green-500" : "bg-red-500"
                            } mr-2`}
                          ></span>
                          <h4 className="font-medium text-gray-900">
                            {webhook.url}
                          </h4>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            className={`text-sm py-1 px-2 rounded ${
                              webhook.isActive
                                ? "text-red-600 hover:bg-red-50"
                                : "text-green-600 hover:bg-green-50"
                            }`}
                            onClick={() => handleToggleWebhook(webhook.id)}
                          >
                            {webhook.isActive ? "Disable" : "Enable"}
                          </button>
                          <button
                            className="text-sm text-gray-600 hover:text-red-600 py-1 px-2 hover:bg-red-50 rounded"
                            onClick={() => handleDeleteWebhook(webhook.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {webhook.events.map((event) => (
                          <span
                            key={event}
                            className="px-2 py-1 text-xs bg-gray-100 rounded-full"
                          >
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === "notifications" && (
        <div className="card">
          <h2 className="text-lg font-medium mb-6">Notification Preferences</h2>
          <p className="text-gray-600 mb-6">
            Manage how and when you'd like to receive updates from AIVO.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-md font-medium mb-4">Email Notifications</h3>
              <div className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between py-2 border-b border-gray-100"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())
                          .replace(/([A-Z])/g, (str) => str.toUpperCase())}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {key === "weeklyReports"
                          ? "Receive weekly AI search trend reports via email"
                          : key === "scoreChanges"
                          ? "Get notified when your AI visibility score changes significantly"
                          : key === "aiTrendAlerts"
                          ? "Receive alerts about major shifts in AI search behavior"
                          : key === "productAnalysis"
                          ? "Get notifications when product analyses are completed"
                          : "Receive updates when competitor visibility changes significantly"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={value}
                          onChange={() => handleNotificationChange(key)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium mb-4">
                Notification Channels
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Browser Notifications
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive notifications in your browser when logged into the
                      AIVO platform
                    </p>
                  </div>
                  <button className="btn btn-secondary">Enable</button>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Slack Integration
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive notifications directly in your Slack workspace
                    </p>
                  </div>
                  <button className="btn btn-primary">Connect Slack</button>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Microsoft Teams
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive notifications in Microsoft Teams
                    </p>
                  </div>
                  <button className="btn btn-primary">Connect Teams</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 flex justify-end">
            <button className="btn btn-primary">Save Preferences</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
