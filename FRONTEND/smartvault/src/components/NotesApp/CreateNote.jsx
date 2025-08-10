



import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const CreateNote = () => {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">NEW NOTE</h2>
                </div>
                
                <div className="p-6 space-y-6">
                    <div className="space-y-3">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">TITLE</h3>
                        </div>
                        <div>
                            <input 
                                type="text" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            />
                        </div>
                        <div className="text-sm space-y-1">
                            <h5 className="text-gray-500">charter 3355</h5>
                            <h5 className="text-red-500">Title is required</h5>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">CONTENT</h3>
                        </div>
                        <div>
                            <textarea 
                                name="newnotetextbox" 
                                id=""
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors min-h-32 resize-vertical"
                            ></textarea>
                        </div>
                        <div>
                            <h3 className="text-red-500 text-sm">errror</h3>
                        </div>
                    </div>
                    
                    <div className="flex justify-between pt-4 border-t border-gray-200">
                        <div>
                            <button 
                                onClick={() => navigate("/noteshome")}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                        <div>
                            <button    onClick={() => navigate("/noteshome")}
                             className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                                Save Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNote