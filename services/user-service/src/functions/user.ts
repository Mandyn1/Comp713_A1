import { randomBytes, timingSafeEqual, scryptSync } from "node:crypto";
import { db } from "../database-config";
import { UserInfo, userByUsernameQuery } from "../database-definitions";

// One time tokens for the admin view, kept in memory - all to avoid just typing the url
const adminTokens = new Map<string, number>();

// Any user passwords will be stored as salted hashes (both hex) - basic security measure
function checkPassword(password:string, stored:string):boolean{
    const [salt, hash] = stored.split(":");
    const attempt = scryptSync(password, salt, 64);
    return timingSafeEqual(attempt, Buffer.from(hash, "hex"));
}

async function checkSignIn(username:string, password:string):Promise<UserInfo|undefined>{
    let statement;
    try{
        const user = (await db.execute<UserInfo[]>(userByUsernameQuery, [username]))[0][0];

        if(user !== undefined && checkPassword(password, user.password)) statement = user;
        else statement = undefined;
    }
    catch(err){
        statement = undefined;
        console.log("checkSignIn Error:\n" + err);
    }
    return statement;
}

function createAdminToken(lifetime:number):string{
    const token = randomBytes(32).toString("hex");
    adminTokens.set(token, Date.now() + lifetime);
    return token;
}

// Token is deleted when checked so it only works once, unless keepFor gives it more time
function useAdminToken(token:string, keepFor:number):boolean{
    const expiry = adminTokens.get(token);
    const valid = expiry !== undefined && expiry > Date.now();

    if(valid && keepFor > 0) adminTokens.set(token, Date.now() + keepFor);
    else adminTokens.delete(token);

    return valid;
}

const userFunctions = { checkSignIn, createAdminToken, useAdminToken };

export default userFunctions;
