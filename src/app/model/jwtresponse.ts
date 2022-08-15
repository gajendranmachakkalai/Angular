export interface Jwtresponse {
    userID : number,
    userName: string,
    accessToken: string,
    createdDate: Date,
    expiredDate:Date,
    refreshToken: string,
    role: string,
    roleID : number,
    claims: string[]
}
