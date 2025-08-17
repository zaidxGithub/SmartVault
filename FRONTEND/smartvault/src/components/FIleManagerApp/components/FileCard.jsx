



import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Eye, Trash2, FileText, Image, Video, File } from 'lucide-react';

const FileCard = ({ file, viewType }) => {
  const getFileIcon = (type) => {
    if (type.includes('image')) return Image;
    if (type.includes('video')) return Video;
    if (type.includes('pdf') || type.includes('document')) return FileText;
    return File;
  };

  const getFileTypeColor = (type) => {
    if (type.includes('image')) return 'text-emerald-400 bg-emerald-900/40';
    if (type.includes('video')) return 'text-violet-400 bg-violet-900/40';
    if (type.includes('pdf')) return 'text-red-400 bg-red-900/40';
    if (type.includes('document')) return 'text-blue-400 bg-blue-900/40';
    return 'text-gray-400 bg-gray-800/60';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDownload = (e) => {
    e.preventDefault();
    console.log('Downloading:', file.name);
  };

  const Icon = getFileIcon(file.type);
  const colorClass = getFileTypeColor(file.type);


  if (viewType === 'list') {
    return (
      <div className="bg-[#0f0f12] rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-900/20 transition-all p-4 border border-gray-800">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}>
            <Icon className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            <Link to={`/file/${file.id}`} className="block">
              <h3 className="font-medium text-gray-100 truncate hover:text-blue-400 transition-colors">
                {file.name}
              </h3>
            </Link>
            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
              <span>{formatFileSize(file.size)}</span>
              <span>{formatDate(file.createdAt)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to={`/file/${file.id}`}
              className="p-2 text-gray-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800/40"
              title="Preview"
            >
              <Eye className="w-4 h-4" />
            </Link>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-400 hover:text-emerald-400 transition-colors rounded-lg hover:bg-gray-800/40"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-gray-800/40"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f12] rounded-md shadow-md hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 overflow-hidden group border border-gray-800">
      <div className={`h-32 flex items-center justify-center ${colorClass}`}>
        <Icon className="w-12 h-12" />
      </div>

      <div className="p-4">
        <Link to={`/file/${file.id}`}>
          <h3 className="font-medium text-gray-100 truncate hover:text-blue-400 transition-colors mb-2">
            {file.name}
          </h3>
        </Link>

        <div className="space-y-2 mb-4 text-sm text-gray-500">
          <div className="flex items-center justify-between">
            <span>Size</span>
            <span>{formatFileSize(file.size)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Created</span>
            <span>{formatDate(file.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-gray-800/40"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white  border-1 border-black
            rounded-sm text-sm font-medium transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
