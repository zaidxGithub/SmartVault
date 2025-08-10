import React from 'react';
import { X, Home, FileText, Lock, StickyNote, LogOut, Shield, Icon, HomeIcon, PhoneCall, ListTodo, Workflow } from 'lucide-react';

import {useNavigate} from "react-router-dom";

const Sidebar = ({ isOpen, onClose, activeSection, onSectionChange }) => {

  const naviagte=useNavigate();
              const isActive = activeSection === '';
              function gotoHomePage(){
                naviagte("/")
              }
              function gotoPasswordManagerPage(){
                naviagte("/passwordManager")
              }
              function gotoPasswordGeneratorPage(){
                naviagte("/PasswordGenerator")
              }
             
              function gotoSecureNotespage(){
                naviagte("/notesApp")
              }


  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-gray-200
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">SmartVault</h2>
              <p className="text-xs text-gray-500">Your Digital Vault </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}

        
        <nav className="p-4 space-y-2 ">
        
              <button onClick={gotoHomePage}

                className=
                 " w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                    // : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              >  
                  < HomeIcon className='h-5 w-5 '/>
                <span className="font-medium"> Home</span>

                
              </button>
              <button onClick={gotoSecureNotespage}

                className=
                 " w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                    // : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  
                
              >  
                {/* <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} /> */}
                  < PhoneCall className='h-5 w-5 '/>
                <span className="font-medium"> Secure Notes</span>

                
              </button>
              <button onClick={gotoPasswordManagerPage}

                  className=
                 " w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                    // : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              >  
               < Lock className='h-5 w-5 '/>
                <span className="font-medium"> Password Vault</span>

                
              </button>
              <button 

                className=
                 " w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                    // : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              >  
               < ListTodo className='h-5 w-5 '/>
                <span className="font-medium"> Notes App</span>

                
              </button>
              <button onClick={gotoPasswordGeneratorPage}

                 className=
                 " w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                    // : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              >  
               < Workflow className='h-5 w-5 '/>
                <span className="font-medium"> Password Generator</span>

                
              </button>

        </nav>
      

        {/* User Section */}
        <div className="  bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50 ">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Mohammad Zaid</p>
              <p className="text-xs text-gray-500 truncate">zaid@example.com</p>
            </div>
          </div>
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;