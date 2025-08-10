


import React from 'react'
import { NavLink } from "react-router-dom";

const HomeNotes = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">this is h1</h1>
                
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Notes app title ya intro</h2>
                </div>
                
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                             <div className="w-[70%]">
                                    <input 
                                        type="text" 
                                        placeholder="Search your notes..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-700 placeholder-gray-400"
                                    />
                                </div>
                            <div>
                                <NavLink to="/noteshome/createnote"> 
                                    <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium">
                                        Create Note
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="space-y-4">
                            <div className="border-b border-gray-200 pb-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="text-lg font-semibold text-gray-800 mb-2">
                                            Project Documentaion Note
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 ml-4">
                                        <div>
                                            <button className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors text-sm">
                                                Edit
                                            </button>
                                        </div>
                                        <div>
                                            <button className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-sm">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <p className="text-gray-600 leading-relaxed">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, optio.
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="text-sm text-gray-500 italic">
                                    created at notes :date
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeNotes