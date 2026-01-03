







import { Password } from "../../../../../../BACKEND/src/models/password.model";
import { getPassStatsAPI } from "../../../services/password";
import { useState ,useEffect} from "react";
import {  LoaderCircle ,} from 'lucide-react';
const PassStats = () => {
  const[passStats,setPassStats]=useState([]);
    // console.log("STATS:",passStats);
      useEffect(() => {
        fetchPassStats();
      
      }, []);

   const fetchPassStats=async()=>{
      try {
        const stats=await getPassStatsAPI();
        if(!stats){
          console.log("No stats Fetched from backed@!")
        }
        setPassStats(stats);
      } catch (error) {
        setLoading(false);
      }
  
    }
  if(!passStats){
    return(<>
     <LoaderCircle className='size-12 animate-spin'/>
     <h3> Loading...</h3>
    <div>
    </div> 
    </>)
  }
 
  const stats = [
    {
      label: "Total Passwords",
      value:passStats[0]?.totalPasswords||0,
      color: 'text-gray-300 bg-gray-800/60',
     },
  ];

   return (
    <div className="w-full px-1 sm:px-6 py-2 ">
      <div className="grid grid-cols-3  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
       
       return (
  <div className="w-full px-1 sm:px-6 py-2 ">
    <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 ">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`bg-[var(--card)] border-2 border-[var(--recent-border)] rounded-lg p-2
            flex flex-col justify-between transition-all duration-300 
            hover:scale-[1.03] hover:border-[var(--accent)]/60 hover:shadow-[0_0_12px_var(--accent)] `}
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-md bg-[var(--accent)]/15`}
              >
                <Icon className="w-5 h-5 text-[var(--accent)]" />
              </div>
            </div>

            <div className="mt-2">
              <h3 className="text-3xl font-extrabold text-[var(--foreground)] tracking-wide">
                {stat.value}
              </h3>
              <p className="text-sm text-[var(--secondary)] mt-1 font-medium">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

       })}
      </div>
    </div>
  );
};

export default PassStats;
