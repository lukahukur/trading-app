export interface MiddlewareResponse {
    message?:'success' | 'SET-COOKIE'
    error?:'not-authenticated'
}
declare module 'socket.io'{
    interface Socket{
        email:string
    } 
}
declare module 'jsonwebtoken'{
    export function verify(
        token: string,
        secretOrPublicKey: Secret | GetPublicKeyOrSecret,
        callback?: VerifyCallback<JwtPayload | string>,
    ): JwtPayload 

}


DefaultEvents
declare global {
    interface JwtPayload{
        email:string
        username:string
    }
}