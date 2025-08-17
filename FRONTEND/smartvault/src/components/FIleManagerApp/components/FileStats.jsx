


import React from 'react';
import { useFiles } from '../context/FileContext';
import { FileText, Image, Video, HardDrive } from 'lucide-react';

const FileStats = () => {
  const { files } = useFiles();

  const stats = [
    {
      name: 'Total Files',
      value: files.length,
      icon: FileText,
      color: 'text-gray-300 bg-gray-800/60',
      change: '+12%',
    },
    {
      name: 'Images',
      value: files.filter(f => f.type.includes('image')).length,
      icon: Image,
      color: 'text-green-400 bg-green-900/40',
      change: '+8%',
    },
    {
      name: 'Documents',
      value: files.filter(f => f.type.includes('pdf') || f.type.includes('document')).length,
      icon: FileText,
      color: 'text-purple-400 bg-purple-900/40',
      change: '+23%',
    },
    {
      name: 'Storage Used',
      value: `${(files.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(1)} MB`,
      icon: HardDrive,
      color: 'text-orange-400 bg-orange-900/40',
      change: '+5%',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div 
            key={stat.name} 
            className="bg-gray-950 rounded-xl shadow-md p-6 border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-emerald-400">{stat.change}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-100">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FileStats;
