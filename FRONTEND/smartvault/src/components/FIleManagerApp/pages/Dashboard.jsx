


import React, { useState } from 'react';
import { useFiles } from '../context/filecontext.jsx';
import FileCard from '../components/FileCard.jsx';
import FileStats from '../components/FileStats.jsx';
import { Grid, List, Filter, SortAsc } from 'lucide-react';

const Dashboard = () => {
  const { files } = useFiles();
  const [viewType, setViewType] = useState('grid');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredFiles = files.filter(file => {
    if (filterType === 'all') return true;
    return file.type.includes(filterType);
  });

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'size') return b.size - a.size;
    return 0;
  });

  return (
    <div className="space-y-6 text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">File Manager</h1>
          <p className="text-gray-400">Welcome back! Here's an overview of your files</p>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{files.length} Total Files</p>
            <p className="text-xs text-gray-400">
              {(files.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(1)} MB Used
            </p>
          </div>
        </div>
      </div>

     
      <FileStats />

   
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
                      space-y-4 sm:space-y-0 bg-[#111111] p-4 rounded-xl shadow-lg border border-gray-800">
        
       
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm 
                         focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-200"
            >
              <option value="all">All Files</option>
              <option value="pdf">PDFs</option>
              <option value="image">Images</option>
              <option value="document">Documents</option>
              <option value="video">Videos</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <SortAsc className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black border border-gray-700 rounded-lg px-3 py-2 text-sm 
                         focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-200"
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
            </select>
          </div>
        </div>
       
     
        <div className="flex items-center space-x-2 bg-black rounded-lg p-1 border border-gray-700">
          <button
            onClick={() => setViewType('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewType === 'grid' ? 'bg-gray-700 text-white shadow-md' : 'hover:bg-gray-800 text-gray-300'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewType('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewType === 'list' ? 'bg-gray-700 text-white shadow-md' : 'hover:bg-gray-800 text-gray-300'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

    
      {sortedFiles.length === 0 ? (
        <div className="text-center py-12 bg-[#111111] rounded-xl shadow-lg border border-gray-800">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No files found</h3>
          <p className="text-gray-400">Try adjusting your filters or upload some files.</p>
        </div>
      ) : (
        <div className={
          viewType === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {sortedFiles.map((file) => (
            <FileCard key={file.id} file={file} viewType={viewType} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;











