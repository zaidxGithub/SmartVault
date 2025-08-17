import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 py-5 mt-10  ">
  <div className="  px-2 sm:px-5 lg:px-8">
    {/* Top Section */}
    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6">
      
      {/* Brand / Logo */}
      <div>
        <h2 className="text-xl font-bold text-white">SmartVault</h2>
        <p className="text-sm text-gray-400">Securely store and manage your files.</p>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-6 text-sm">
        <a href="#" className="hover:text-white transition">Home</a>
        <a href="#" className="hover:text-white transition">Notes</a>
        <a href="#" className="hover:text-white transition">Files</a>
        <a href="#" className="hover:text-white transition">Settings</a>
      </div>

      {/* Social Icons */}
      <div className="flex space-x-4">
        <a href="#" className="hover:text-white transition">🐦</a>
        <a href="#" className="hover:text-white transition">💼</a>
        <a href="#" className="hover:text-white transition">📸</a>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} SmartVault. All rights reserved.
    </div>
  </div>
</footer>

       
      
    </div>
  )
}

export default Footer
