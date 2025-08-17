import React, { createContext, useContext, useState } from 'react';

const FileContext = createContext(undefined);

// Sample data
const sampleFiles = [
  {
    id: '1',
    name: 'Project_Proposal_2024.pdf',
    type: 'application/pdf',
    size: 2457600,
    url: '#',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Design_Mockups.png',
    type: 'image/png',
    size: 1843200,
    url: '#',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-14T14:20:00Z',
  },
  {
    id: '3',
    name: 'Meeting_Notes_Jan.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 486400,
    url: '#',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
  },
  {
    id: '4',
    name: 'Budget_Analysis.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 1228800,
    url: '#',
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
  },
  {
    id: '5',
    name: 'Team_Photo.jpg',
    type: 'image/jpeg',
    size: 3145728,
    url: '#',
    createdAt: '2024-01-11T11:30:00Z',
    updatedAt: '2024-01-11T11:30:00Z',
  },
  {
    id: '6',
    name: 'Product_Demo.mp4',
    type: 'video/mp4',
    size: 15728640,
    url: '#',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
  {
    id: '7',
    name: 'Presentation_Slides.pptx',
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    size: 5242880,
    url: '#',
    createdAt: '2024-01-09T13:20:00Z',
    updatedAt: '2024-01-09T13:20:00Z',
  },
  {
    id: '8',
    name: 'Logo_Variations.ai',
    type: 'application/postscript',
    size: 2097152,
    url: '#',
    createdAt: '2024-01-08T15:10:00Z',
    updatedAt: '2024-01-08T15:10:00Z',
  },
];

export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState(sampleFiles);

  const addFile = (file) => {
    const newFile = {
      ...file,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setFiles((prev) => [newFile, ...prev]);
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const updateFile = (id, updates) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? { ...file, ...updates, updatedAt: new Date().toISOString() }
          : file
      )
    );
  };

  return (
    <FileContext.Provider value={{ files, addFile, removeFile, updateFile }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
};
