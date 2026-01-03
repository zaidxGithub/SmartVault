import React, { createContext, useContext, useState } from 'react';
const FileContext = createContext(undefined);
export const FileProvider = ({ children }) => {
  const [files, setFiles] = useState();
  return (
    <FileContext.Provider value={{ files}}>
      {children}
    </FileContext.Provider>
  );
};

