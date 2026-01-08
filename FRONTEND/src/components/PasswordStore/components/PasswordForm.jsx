import { useState } from "react";
import { calculatePasswordStrength } from "../utils/passwordStrength";
import {
  getStrengthColor,
  getStrengthBgColor,
} from "../utils/passwordStrength";
import { X, Star, Plus, ImportIcon, CheckCircle, Sparkles } from "lucide-react";
import{toast,ToastContainer} from "react-toastify";
import { aiAPI } from "../../../services/ai";
import { replace, useNavigate } from "react-router-dom";
import { createpasswordAPI } from "../../../services/password";
export default function PasswordForm() {
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    tags: [],
    notes: "",
    strength: "weak",
    category: "Social",
    deviceUsed: "desktop",
    expirationReminder: null,
    Important: false,
  });
  const navigate=useNavigate();
  const [tagInput, setTagInput] = useState("");
  const[noteInput,setNoteInput]=useState("")
  const [isTagLoading,setIsTagLoading]=useState(false);
  const[isNoteLoading,setIsNoteLoading]=useState(false);



  const passwordStrength = calculatePasswordStrength(formData.password);

  const handleSubmit = async(e) => {
  e.preventDefault();
  const passStrength=calculatePasswordStrength(formData.password);

    setFormData((prev)=>({
      ...prev,strength:passStrength
    }));
   
    const response= await createpasswordAPI({...formData,strength:passStrength});
    handleReset();
  };



  const handleReset = () => {
    setFormData({
      title: "",
      username: "",
      password: "",
      url: "",
      tags: [],
      notes: "",
      strength: "weak",
      category: "other",
      deviceUsed: "desktop",
      expirationReminder: null,
      Important: false,
    });
    setTagInput("");
     navigate("/passwordmanager",{replace:true})
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };


  const handleAIAction = async (actionType) => {
    if(actionType=="suggestTags"){
         setIsTagLoading(true);

    }else{
      setIsNoteLoading(true);
    }

  if (!formData.title || !formData.username || !formData.url || !formData.category || !formData.deviceUsed) {
    setIsNoteLoading(false);
    setIsTagLoading(false);
    toast.error("Enter the details first!");
    return;
  }
  const promptMap={
   suggestTags : `Suggest 5 short, relevant, comma-separated tags for this password entry:
  Title: ${formData.title}
  Username: ${formData.username}
  URL: ${formData.url}
  Category: ${formData.category}
  Device Used: ${formData.deviceUsed}.
  Return only the tags, no explanation.`,
    
  suggestNote :`Suggest short Note of 2-3 lines, relevant,for this password entry:
  Title: ${formData.title}
  Username: ${formData.username}
  URL: ${formData.url}
  Category: ${formData.category}
  Device Used: ${formData.deviceUsed}.
  Return only the ShortNote, no explanation.`
  };

  const prompt= promptMap[actionType];
 try {

   const data=await aiAPI(prompt);
   if (data) {
        
          if(actionType=="suggestTags"){
          setTagInput(data|| "Failed to generate Tags");

          }else{
              setFormData({ ...formData, notes:data||"Failed to to generate the note" })
          }

       
      }
    } catch (error) {
      console.warn("AI request failed:", error);
     if(actionType=="suggestTags"){
      setIsTagLoading(false);
     }else{
      setIsNoteLoading(false);
     }

    } finally {
     
     if(actionType=="suggestTags"){
      setIsTagLoading(false);
     }else{
      setIsNoteLoading(false);
     }
    }

};

  return (
    <div className="fixed inset-0 bg-[var(--background)] flex z-50 sm:p-6 lg:p-10 xl:p-15 ">
      <ToastContainer
            position="top-center"
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick={true}
            pauseOnFocusLoss
            draggable
           theme={document.documentElement.classList.contains("dark") ? "dark" : "light"} 

          />
      <div className="bg-[var(--bg)] text-[var(--text)] rounded-lg  shadow-2xl  w-full max-h-[100vh] overflow-auto scrollbar-hide">
        <div className="sticky top-0 bg-[var(--card)] border-b border-[var(--border)] px-8 py-5 flex justify-between items-center rounded-t-lg">
          <h2 className="text-xl font-medium">Add New Password</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Website/Service Name *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Google, Facebook"
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition bg-[var(--input)] text-[var(--text)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Username/Email *
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="username or email"
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition bg-[var(--input)] text-[var(--text)]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Password *
              </label>
              <input
                type="text"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter password"
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition bg-[var(--input)] text-[var(--text)]"
              />
              {formData.password && (
                <div className="mt-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${getStrengthColor(
                      passwordStrength
                    )} ${getStrengthBgColor(passwordStrength)}`}
                  >
                    Strength: {passwordStrength.toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            
            <div>
              <label className="block text-sm font-medium mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder="https://example.com"
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition bg-[var(--input)] text-[var(--text)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Category 
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--input)] focus:border-transparent outline-none transition bg-[var(--accent)] text-[var(--primary)]"
              >
                <option value="social">Social</option>
                <option value="work">Work</option>
                <option value="banking">Banking</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Device Type 
              </label>
              <select
                required
                value={formData.deviceUsed}
                onChange={(e) =>
                  setFormData({ ...formData, deviceUsed: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition bg-[var(--accent)] text-[var(--text)]"
              >
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
                <option value="desktop">Desktop</option>
                <option value="other">Other</option>
              </select>
            </div>

           
            <div>
              <label className="block text-sm font-medium mb-2">
                Expiration/Reminder Date
              </label>
              <input
                type="date"
                value={formData.expirationReminder || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    expirationReminder: e.target.value || null,
                  })
                }
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition bg-[var(--input)] text-[var(--text)]"
              />
            </div>

           
            <div className="flex items-center">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.Important}
                  onChange={(e) =>
                    setFormData({ ...formData, Important: e.target.checked })
                  }
                  className="w-5 h-5 text-orange-600 border-[var(--border)] rounded focus:ring-2 focus:ring-orange-500"
                />
                <span className="text-sm font-medium">Mark as Important</span>
              </label>
            </div>
          </div>

          <div  >
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex  gap-1 sm:gap-4 md:gap-7 lg:gap-10 xl:gap-10 justify-between 
            sm:justify-end items-center  ">
              <div className="w-[80%] sm:w-[90%] xl:w-[92%]">
                <input
                type="text"
                value={isTagLoading ? " Generating With AI..." :tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                placeholder="Add a tag and press Enter"
                className="flex w-full  px-2 sm:px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition bg-[var(--input)] text-[var(--text)]"
              />
              </div>
             <div className="w-[20%] sm:w-[10%] xl:w-[8%]  ">
               <button
                type="button"
                onClick={addTag}
                className=" flex px-4 py-2.5 w-full bg-[var(--primary)] text-[var(--primary-foreground)] justify-center items-center rounded-lg  transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
              </div>

            </div>

            <div
              className=" flex justify-end  mt-2
              "
            >

<button
type="button"
    onClick={()=>handleAIAction("suggestTags")}
    disabled={isTagLoading}
    className={` ai-glow-btn group relative overflow-hidden rounded-md border border-[var(--border)] px-4 py-2 
      text-sm font-medium text-[var(--foreground)] transition-all duration-300 
      ${isTagLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-[var(--hover)] hover:shadow-md"}`}
  >
    <span className="relative z-10 flex items-center gap-2">
      {isTagLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-t-transparent border-[var(--foreground)] rounded-full animate-spin"></span>
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4 text-[var(--foreground)] transition-transform duration-300 group-hover:rotate-12" />
          Generate 
        </>
      )}
    </span>
    <span className="absolute inset-0 bg-gradient-to-r from-[#58a6ff40] to-[#8b5cf640] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
  </button>


            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-[var(--muted)] text-[var(--muted-foreground)] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-[var(--text)]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              value={isNoteLoading ? "Generating Your Custom Note...": formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={4}
              placeholder="Add any additional notes..."
              className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent outline-none transition bg-[var(--input)] text-[var(--text)] resize-none"
            />

            <div
              className="flex justify-end  mt-2"
            >
                  <button 
                  type="button"
    onClick={()=>handleAIAction("suggestNote")}
    disabled={isNoteLoading}
    className={` ai-glow-btn group relative overflow-hidden rounded-md border border-[var(--border)] px-4 py-2 
      text-sm font-medium text-[var(--foreground)] transition-all duration-300 
      ${isNoteLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-[var(--hover)] hover:shadow-md"}`}
  >
    <span className="relative z-10 flex items-center gap-2">
      {isNoteLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-t-transparent border-[var(--foreground)] rounded-full animate-spin"></span>
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4 text-[var(--foreground)] transition-transform duration-300 group-hover:rotate-12" />
          Generate 
        </>
      )}
    </span>
    <span className="absolute inset-0 bg-gradient-to-r from-[#58a6ff40] to-[#8b5cf640] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
  </button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[var(--)] text-[var(--primary)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition-colors shadow-md hover:shadow-lg border-1 border-blue-200"
            >
              Save Password
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-[var(--border)] text-[var(--text)] rounded-lg font-semibold hover:bg-[var(--input)] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
