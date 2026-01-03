

import {Password }from "../../models/password.model.js"
import { decrypt, encrypt } from "../../utils/encrypt.js";
import {logActivity} from "../../utils/activity.js"


export const createPassword= async(req,res)=>{
    try {
        const {title,password ,username, url, tags, notes, strength, lastUpdated, expirationReminder,category,Important,deviceUsed}=req.body;
        // console.log(req.body.title,req.body.password);
        const encrypted=encrypt(req.body.password);
        const newPass= new Password({
            user:req.user._id,
            title,
            password:encrypted.encryptPass,
            iv:encrypted.iv,
            username,
             url, 
             tags, 
             notes, 
            strength,
            lastUpdated,
             expirationReminder,
             category,
             Important,
             deviceUsed
        
        })
        await newPass.save();
         await logActivity(
              req.user.id,
              "PASSWORD_ADDED",
              "PASSWORD MANAGER",
              { passtitle: newPass.title }
            );
         return res.status(201).json(newPass); 


        
    } catch (error) {
         console.log(error);
       return res.status(401).json({error:error.message});
       
        
    }


}

export const getAllPassword=async(req,res)=>{
    try { 
        const userId=req.user._id;
        const response= await Password.find({user:userId});
        const decryptPasswords=response.map((item) =>{

           return{
             _id: item._id,
            user:item.user,
            title:item.title,
             password:decrypt(item.password,item.iv),
             createdAt:item.createdAt,
             __v:item.__v,
             username:item.username,
             url:item.url,
             tags:item.tags,
             notes:item.notes,
             strength:item.strength,
             expirationReminder:item.expirationReminder,
             category:item.category,
             Important:item.Important,
             deviceUsed:item.deviceUsed

           }


        } )

         return res.status(201).json({passwords:decryptPasswords});
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({error:error.message});  
        
    }
}


export const  deletePassword = async(req,res)=>{
    try { 
        const userId=req.user._id;
        const passId=req.params.id;
        const resposne= await Password.findByIdAndDelete( {user:userId,_id:passId})
       
         await logActivity(
              req.user.id,
              "PASSWORD_DELETED",
              "PASSWORD MANAGER",
              { passtitle: resposne.title }
            );
        return res.status(201).json(resposne);
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({error:error.message});
        
    }
}

export const getPassStats =  async(req,res)=>{
    try { 
      const now=new Date();
      const future=new Date();
      future.setDate(now.getDate()+7);

        const userId=req.user._id;
        const response =await Password.aggregate([
  {
    $match: { user:userId } 
  },
  {
    $group: {
      _id: "$userId",
      
      // --- Strength Counts ---
      weakCount: { $sum: { $cond: [{ $eq: ["$strength", "Weak"] }, 1, 0] } },
      mediumCount: { $sum: { $cond: [{ $eq: ["$strength", "Medium"] }, 1, 0] } },
      strongCount: { $sum: { $cond: [{ $eq: ["$strength", "Strong"] }, 1, 0] } },

      // --- Important passwords count ---
      importantCount: { $sum: { $cond: [{ $eq: ["$Important", true] }, 1, 0] } },

      // --- Category wise Counts ---
      categoryCounts: {
        $push: "$category"
      },

      // --- Device wise Counts ---
      deviceCounts: {
        $push: "$deviceUsed"
      },

      totalPasswords: { $sum: 1 } ,


       expiringSoonCount: {
      $sum: {
        $cond: [
          {
            $and: [
              { $ne: ["$expirationReminder", null] },
              { $gte: ["$expirationReminder", now] },
              { $lte: ["$expirationReminder", future] }
            ]
          },
          1,
          0
        ]
      }
    },

     
    
    }
  },
  {
    $project: {
      weakCount: 1,
      mediumCount: 1,
      strongCount: 1,
      importantCount: 1,
      totalPasswords: 1,
      expiringSoonCount: 1,
      categoryBreakdown: {
        $arrayToObject: {
          $map: {
            input: { $setUnion: ["$categoryCounts", []] },
            as: "cat",
            in: {
              k: "$$cat",
              v: {
                $size: {
                  $filter: {
                    input: "$categoryCounts",
                    as: "c",
                    cond: { $eq: ["$$c", "$$cat"] }
                  }
                }
              }
            }
          }
        }
      },
      deviceBreakdown: {
        $arrayToObject: {
          $map: {
            input: { $setUnion: ["$deviceCounts", []] },
            as: "dev",
            in: {
              k: "$$dev",
              v: {
                $size: {
                  $filter: {
                    input: "$deviceCounts",
                    as: "d",
                    cond: { $eq: ["$$d", "$$dev"] }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
]);
         return res.status(201).json(response);
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({error:error.message});
        
    }


}