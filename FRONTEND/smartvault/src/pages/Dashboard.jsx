import React from "react";
import {
  FileText,
  Lock,
  StickyNote,
  Plus,
  Upload,
  Key,
  Edit3,
  Calendar,
  Clock,
  StickyNoteIcon,
  PhoneOutgoing,
  ImageDownIcon,
} from "lucide-react";
import Footer from "../smallComponents/Footer.jsx";
import { replace, useNavigate } from "react-router-dom"; 

const Dashboard = () => {
  const navigate = useNavigate(); 
  function gotoHomePage(){
                navigate("/")
              }
              function gotoPasswordManagerPage(){
                navigate("/passwordManager")
              }
              function gotoPasswordGeneratorPage(){
                navigate("/PasswordGenerator")
              }
             
              function gotoSecureNotespage(){
                navigate("/noteshome")
              }
  

  

  const stats = [
    {
      label: "Stored PDFs",
      value: "24",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Saved Passwords",
      value: "67",
      icon: Lock,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Secure Notes",
      value: "12",
      icon: StickyNote,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Saved Images",
      value: "32",
      icon: ImageDownIcon,
      color: "text-purple-600",
      bg: "bg-blue-50",
    },
  ];

  const recentActivity = [
    {
      action: "Uploaded",
      item: "Tax_Documents_2024.pdf",
      time: "2 hours ago",
      icon: Upload,
    },
    {
      action: "Created",
      item: "Banking Password",
      time: "5 hours ago",
      icon: Key,
    },
    {
      action: "Updated",
      item: "Meeting Notes",
      time: "1 day ago",
      icon: Edit3,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Aftab!</h1>
            <p className="text-blue-100 text-lg">
              Your digital vault is secure and ready.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <FileText className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-green-400 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3>File Manager App</h3>
        </button>

        <button
          className="bg-blue-400 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          onClick={gotoPasswordManagerPage}
        >
          <h3>Password Manager</h3>
        </button>

        <button
          className="bg-amber-600 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          onClick={gotoPasswordGeneratorPage} // ✅ NEW CLICK HANDLER
        >
          <h3>Password Generator</h3>
        </button>

        <button className="bg-purple-700 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        onClick={gotoSecureNotespage}>
          <h3>Notes Manager</h3>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Activity
            </h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}{" "}
                      <span className="text-blue-600">{activity.item}</span>
                    </p>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-100">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Security Tip</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Remember to regularly update your passwords and enable two-factor
              authentication for enhanced security. Your vault is only as strong
              as your weakest password.
            </p>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
