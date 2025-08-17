

import React, { useState } from 'react';
import { Upload as UploadIcon, File, X, CheckCircle } from 'lucide-react';
import { useFiles } from '../context/filecontext.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import { HomeIcon, ArrowBigLeft } from 'lucide-react';

const UploadFile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { addFile } = useFiles();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const menuItems = [
    { label: "Home", route: "/", icon: HomeIcon },
    { label: "Back", route: "..", icon: ArrowBigLeft },
  ];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    setUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    uploadedFiles.forEach((file) => {
      addFile({
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      });
    });

    setUploadedFiles([]);
    setUploading(false);
  };

  const formatSize = (bytes) => {
    const kb = 1024;
    const mb = kb * 1024;
    if (bytes < kb) return `${bytes} B`;
    if (bytes < mb) return `${(bytes / kb).toFixed(1)} KB`;
    return `${(bytes / mb).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100">
      
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        menuItems={menuItems}
        className={`fixed inset-y-0 left-0 w-64 bg-[#161b22] border-r border-[#30363d] transition-transform duration-300 z-50
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      />

      <div className="lg:pl-64">
      
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 lg:p-8">
          <div className="bg-[#161b22] rounded-2xl p-6 shadow-lg border border-[#30363d]">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Upload Files</h1>
            <p className="text-gray-400">
              Add new documents, images, and files to your collection
            </p>

           
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition min-h-[300px] mt-6
                ${dragActive ? 'border-blue-500 bg-blue-900/30' : 'border-[#30363d] bg-[#0d1117]/70'}
              `}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <UploadIcon className="w-10 h-10 text-blue-400" />
                <p className="font-medium text-gray-200">Drag & drop files here</p>
                <p className="text-sm text-gray-500">or click below to select</p>

                <label className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition">
                  Choose Files
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Files List */}
            {uploadedFiles.length > 0 && (
              <div className="bg-[#0d1117]/70 mt-6 p-4 rounded-xl shadow border border-[#30363d]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-gray-200">
                    Files to Upload ({uploadedFiles.length})
                  </h2>
                  <button
                    onClick={uploadFiles}
                    disabled={uploading}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition ${
                      uploading
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {uploading ? 'Uploading...' : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Upload All
                      </>
                    )}
                  </button>
                </div>

                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-[#161b22] rounded mb-2 border border-[#30363d]"
                  >
                    <div className="flex items-center gap-3">
                      <File className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-200">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatSize(file.size)} • {file.type || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upload Tips */}
          <div className="bg-[#161b22] rounded-2xl p-6 shadow-lg border border-[#30363d] mt-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Upload Tips</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Files are automatically organized by type and date</li>
              <li>• You can upload multiple files at once</li>
              <li>• All files are scanned for security before storage</li>
              <li>• Your files are backed up and accessible from any device</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadFile;
