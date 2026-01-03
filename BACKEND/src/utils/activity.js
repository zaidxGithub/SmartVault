import Activity  from "../models/activity.model.js";

export const logActivity = async (userId, action, section, details = {}) => {
  try {
    await Activity.create({ userId, 
        action, 
        section, 
        details });  
  } 
 
  catch (err) {
    console.error("Error logging activity:", err.message);
  }
};
