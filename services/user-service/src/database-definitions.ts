import { RowDataPacket } from "mysql2/promise"

export interface UserInfo extends RowDataPacket{
    id:number,
    username:string,
    password:string
}

export const userByUsernameQuery:string = "SELECT id, username, password FROM users " +
                                "WHERE username = ?";