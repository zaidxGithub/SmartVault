import { Link2, Link2Icon, Link2OffIcon, MailIcon, SheetIcon, Shield, VaultIcon } from 'lucide-react';
import React from 'react'
import { FaGooglePay ,FaTwitter,FaLinkedin,FaGithub, FaLink, FaWhatsapp} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[var(--footer-bg)] text-[var(--sidebar-ring)] py-5  mt-15 borer-t-2 border-[var(--footer-border)]">
      <div className="sm:px-5 lg:px-8  borer-t-2 border-[var(--footer-border)] ">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-col justify-between items-center sm:items-start gap-1 ">
          
        

          <div className='flex  w-full justify-between items-end  py-2 px-2 '>
              <div className='flex  justify-between items-center gap-2'>

             <div className="w-7 h-7  rounded-lg flex items-center justify-center">
                    {/* <Shield className="w-5 h-5 text-white" />
                    
                    */}
                       <img className ="rounded-md"
              src="/public/logo.png" alt="logo" />
                  </div>
            <div>
               <p className=" text-md lg:text-md font-bold text-[var(--footer-primary))]">SmartVault</p>
            <p className=" text-xs sm:text-sm text-[var(--footer-secondary)]">Securely store and manage your files.</p>

            </div>

            {/* user icons */}
           
          </div>
           <div className="flex  space-x-2 sm:space-x-4 ">
            <a href="https://wa.me/919696419984" target="_blank" rel="noopener noreferrer"
             className="text-[var(--footer-secondary)] hover:text-[var(--foreground)] transition">
              <FaWhatsapp/>
             </a>
            <a href="https://github.com/zaidxGithub" target="_blank" rel="noopener noreferrer"
             className=" text-[var(--footer-secondary)] hover:text-[var(--foreground)] transition">
              <FaGithub/>
              </a>
            <a href="https://www.linkedin.com/in/mohammad-zaid20" target="_blank" rel="noopener noreferrer" 
            className=" text-[var(--footer-secondary)] hover:text-[var(--foreground)] transition"><FaLinkedin/></a>
          </div>


          </div>

         <div className='flex  justify-between w-full px-2'>

<div className='flex flex-col  sm:flex-row s sm:w-[70%] justify-start'>
          <div className='mt-2'>
               <div className='flex flex-col  '>

          <div className=' flex flex-col gap-0 sm:gap-2  py-0 sm:py-1 px-1 sm:px-2   text-xs  sm:text-xs text-[var(--footer-secondary)]  hover:cursor-pointer'>
            <div>
              <p  className="font-medium text-sm  text-[var(--footer-secondary)]">LEGAL</p>
              </div>
         
            <div > <NavLink to="/privacy-policy">Privacy policy</NavLink></div>
           
            <div > <NavLink to="/terms-and-condition">Terms and Condition</NavLink></div>
           
           
          </div>
         </div>




          </div>


          
           <div className='flex  flex-col px-1 mt-2 py-1'>
            <div cals>
              <p className='font-medium text-sm  text-[var(--footer-secondary)]'>GET IN TOUCH</p></div>
            <div className='flex gap-1 sm:gap-2 justify-start items-center'>
              <MailIcon className='size-4  text-[var(--muted-foreground)]'/>

              <p className=' text-xs sm:text-xs text-[var(--footer-secondary)]'><a href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@smartvault.com" target="_blank"
  rel="noopener noreferrer">contact@smartvault.com</a>
              </p>
              </div>
            

           </div>
           </div>

           <div> 
            <div className=' flex border-2 gap-1 sm:gap-1 rounded-xl py-1  px-1 sm:px-3  text-[9px] sm:text-xs font-mono text-[var(--footer-primary)]  hover:cursor-pointer '>
            <FaLink/>
            <button 
            onClick={()=>window.open(
             "https://forms.gle/nsBp6bWRoU4TKQrY7")} 
              
              >
            <span>  Report Issue</span>
            </button>
            
          </div>
          </div>



         </div>
        
  


        </div>

      



        <div className="border-t border-[var(--border)] mt-4 pt-3 px-3 text-center text-xs sm:text-sm text-[var(--footer-secondary)]">
 
  <span className="block mt-1">
    Crafted with care by <span className="font-medium">Mohammad Zaid</span>.
     <span> © {new Date().getFullYear()} SmartVault. All rights reserved.</span>  

  </span>
</div>

      </div>
    </footer>
  );
};



export default Footer
