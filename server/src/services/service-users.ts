import { timingSafeEqual, scryptSync } from "node:crypto";
import { db } from "../database-config";
import { UserInfo, userByUsernameQuery } from "../database-definitions";

// Any user passwords will be stored as salted hashes (hex) - basic security measure
function checkPassword(password:string, stored:string):boolean{
    const [salt, hash] = stored.split(":");
    const attempt = scryptSync(password, salt, 64);
    return timingSafeEqual(attempt, Buffer.from(hash, "hex"));
}

export async function checkSignIn(username:string, password:string):Promise<boolean>{
    try{
        const user = (await db.execute<UserInfo[]>(userByUsernameQuery, [username]))[0][0];

        if(user == undefined) return false;
        return checkPassword(password, user.password);
    }
    catch(err){
        console.log("checkSignIn Error:\n" + err);
        return false;
    }
}