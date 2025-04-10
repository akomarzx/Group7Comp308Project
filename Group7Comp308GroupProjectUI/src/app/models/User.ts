export enum Role {
    RESIDENT = "RESIDENT",
    BUSINESS_OWNER = "BUSINESS_OWNER",
    COMMUNITY_ORGANIZER = "COMMUNITY_ORGANIZER"
}

export interface User {
    username: string,
    accessToken : string,
    role: Role
}

export interface UserCredentials {
    username: string,
    password: string
}