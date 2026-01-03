import { buffer } from "stream/consumers";
import crypto from"crypto";
const algoritm="aes-256-cbc";

export const encrypt=(text)=>{
    const iv=Buffer.from(crypto.randomBytes(16));
    const secretKey=Buffer.from(process.env.SECRET_PASS_KEY,"hex");
    const cipher=crypto.createCipheriv(algoritm,secretKey,iv);
    let encryptPass=cipher.update(text,"utf-8","hex");

    encryptPass+=cipher.final("hex");
    return {encryptPass ,iv:iv.toString("hex")};


}
export const decrypt=(encryptedData,iv)=>
    {  const newiv=Buffer.from(iv,"hex");
        // console.log(newiv);

        const secretKey=Buffer.from(process.env.SECRET_PASS_KEY,"hex");
        const decipher=crypto.createDecipheriv(algoritm,secretKey,newiv
    
        );
        let decrypted=decipher.update(encryptedData,"hex","utf-8");    
     decrypted+=decipher.final("utf-8");
        return decrypted;

}