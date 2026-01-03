import admin from "firebase-admin";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath} from "url";
const _filename=fileURLToPath(import.meta.url);
const _dirname=   path.dirname(_filename);

const serviceAccount = JSON.parse(
  readFileSync(path.join(_dirname,"firebase-service-account.json" ),"utf-8") 
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
export default admin;
