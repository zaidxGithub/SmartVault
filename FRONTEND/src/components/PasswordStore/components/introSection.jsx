import React from "react";
const IntroSection = () => {
return(

 <div className="hidden lg:flex flex-col px-4 py-2 border-2  rounded-md shadow-md bg-[var(--card)] mb-5" >
        <p className=" flex-col  text-2xl font-medium text-[var(--foreground)] hidden lg:block">
          Password Manager
        </p>
        <p className="lg:text-lg text-[var(--muted-foreground)]">
          Welcome back! Here's an overview of your Passwords
        </p>
      </div>
)
};
export default IntroSection;
