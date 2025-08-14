

import { useEffect,useState } from 'react'
import{Menu} from "lucide-react";
import Sidebar from './Sidebar.jsx';
import Dashboard from './Dashboard.jsx';


const Home = () => {
          const [sidebarOpen, setSidebarOpen] = useState(false);
         const [activeSection, setActiveSection] = useState('Home');
  return (

     <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}


        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">

            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
              
            </button>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-semibold text-gray-900">SmartVault</h1>
            </div>
          </div>
          
        </div>

        
          <main className="p-6 lg:p-8">

         <Dashboard/>


        </main>
       
       
      </div>



     
      
    </div>



    
    
  );

  
}

export default Home
