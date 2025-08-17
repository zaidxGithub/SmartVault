








import React from "react";
import {
  FileText,
  Lock,
  StickyNote,
  Upload,
  Key,
  Edit3,
  Calendar,
  Clock,
  ImageDownIcon,
  FileX2Icon,
  LockIcon,
  NetworkIcon,
  NotebookTabsIcon,
} from "lucide-react";
import Footer from "../smallComponents/Footer.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Stored PDFs",
      value: "24",
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-900/20",
    },
    {
      label: "Saved Passwords",
      value: "67",
      icon: Lock,
      color: "text-emerald-400",
      bg: "bg-emerald-900/20",
    },
    {
      label: "Secure Notes",
      value: "12",
      icon: StickyNote,
      color: "text-purple-400",
      bg: "bg-purple-900/20",
    },
    {
      label: "Saved Images",
      value: "32",
      icon: ImageDownIcon,
      color: "text-pink-400",
      bg: "bg-pink-900/20",
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

  const quickdata = [
    { label: "File Manager App", route: "/filemanager",icon: FileX2Icon},
    { label: "Password Manager", route: "/passwordManager" ,icon:LockIcon},
    { label: "Password Generator", route: "/PasswordGenerator" ,icon:NetworkIcon},
    { label: "Notes Manager", route: "/noteshome" ,icon: NotebookTabsIcon},
  ];

  return (
    <>
      <div className="w-full max-w-full flex flex-col space-y-8 p-4 sm:p-6 md:p-8 overflow-x-hidden bg-[#0d1117] text-[#c9d1d9]">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#161b22] to-[#0d1117] rounded-2xl p-6 sm:p-8 text-white shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, User!</h1>
              <p className="text-gray-300 text-base sm:text-lg">
                Your digital vault is secure and ready.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white bg-opacity-10 rounded-full flex items-center justify-center">
                <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickdata.map((eachdata, index) => {
             const Icon = eachdata.icon;
             return(
            <div
              onClick={() => navigate(eachdata.route)}
              className="bg-[#161b22] hover:bg-[#21262d] p-5 sm:p-6 rounded-xl shadow-md border border-[#30363d] cursor-pointer transition-colors w-full hover:shadow-blue-400 hover:border-1 hover:border-blue-400"
              key={index}
            >     <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 " /><br />
                <h3 className="text-white font-medium">{eachdata.label}</h3>
            </div>
             );




})}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-[#161b22] p-5 sm:p-6 rounded-xl shadow-md border border-[#30363d] w-full
                 hover:shadow-blue-400 hover:border-1 hover:border-blue-400"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`${stat.bg} p-3 rounded-lg`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-[#161b22] rounded-xl shadow-md border border-[#30363d] w-full">
          <div className="p-5 sm:p-6 border-b border-[#30363d] flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-white">Recent Activity</h2>
            <button className="text-blue-400 hover:text-blue-500 text-sm font-medium">
              View All
            </button>
          </div>


          <div className="p-5 sm:p-6 space-y-4  ">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 hover:bg-[#21262d] rounded-lg transition-colors "
                >
                  <div className="w-10 h-10 bg-[#0d1117] border border-[#30363d] rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#8b949e]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {activity.action} <span className="text-blue-400">{activity.item}</span>
                    </p>
                    <div className="flex items-center space-x-1 text-xs text-gray-400 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-[#161b22] rounded-xl p-5 sm:p-6 border border-[#30363d] w-full">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-[#0d1117] border border-[#30363d] rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Security Tip</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Remember to regularly update your passwords and enable two-factor
                authentication for enhanced security. Your vault is only as strong as your weakest password.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;





