import { db } from "../database-config";
import { ShowingInfo, showingInfoQuery, ShowingList, showingListQuery } from "../database-definitions";

async function getShowingList():Promise<ShowingList[]|undefined>{
    let statement;
    try{
        statement = (await db.execute<ShowingList[]>(showingListQuery))[0];
    }
    catch(err){
        statement = undefined;
        console.log("getShowingList Error:\n" + err);
    }
    return statement;
}

async function getShowingInfo(showingID:number):Promise<ShowingInfo|undefined>{
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

async function checkShowingID(showingID:number):Promise<boolean>{

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

const showingFunctions = {getShowingInfo, checkShowingID, getShowingList};
export default showingFunctions;
