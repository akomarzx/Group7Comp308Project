export enum Role {
    RESIDENT = "RESIDENT",
    BUSINESS_OWNER = "BUSINESS_OWNER",
    COMMUNITY_ORGANIZER = "COMMUNITY_ORGANIZER"
}

export interface User {
    username: string,
    accessToken : string,
    role: Role,
    interests: string[],
    address: string
}

export interface UserCredentials {
    username: string,
    password: string
}

export interface RouteDisplay {
    routePath: string,
    routeName: string
}