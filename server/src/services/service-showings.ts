import { db } from "../database-config";
import { ShowingInfo, showingInfoQuery } from "../database-definitions";
import { getShowingList } from "./service-showing-list";

export async function getShowingInfo(showingID:number):Promise<ShowingInfo|undefined>{
    let statement;
    try{
        statement = (await db.execute<ShowingInfo[]>(showingInfoQuery, [showingID]))[0][0];
    }
    catch(err){
        statement = undefined;
        console.log("getShowingInfo Error:\n" + err);
    }
    return statement;
}

export async function checkShowingID(showingID:number):Promise<boolean>{

    try{
        const showings = await getShowingList();

        if(showings == undefined) throw new Error("getShowingList failed");

        for (let i = 0; i < showings.length; i++){
            if(showings[i].id == showingID) return true;
        }

        throw new Error("showingID not found");
    }
    catch(err){
        console.log("Check Showing ID Error:\n" + err);
        return false;
    }
}