import { ERR_INCORRECT_PASS, ERR_MESSAGES, ERR_NOT_VERIFIED, ERR_NO_USER, Ireq, Iresponse, RequestWithBody } from "../types/types";
import { Response,RequestHandler, NextFunction } from "express";
import db from '../db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { MiddlewareResponse} from "../types";




type Tcred = 
{
    password:string,
    email:string,
}

class TokenGenerator
{
    public static generateAccessToken(payload:object,expirationTime:string)
    {
        return jwt.sign(payload, process.env.ACC as string,{expiresIn:expirationTime});
    }
    public static generateRefreshToken(payload:object,expirationTime:string)
    {
        return jwt.sign(payload, process.env.REF as string,{expiresIn:expirationTime});
    }
}

async function get_user_with_mail(mail:string,fields:string)
{
    const __data__ = await db.query(`select ${fields} from user_table where email=$1`,[mail]);
    return __data__
}

async function comparePasswordToHash(credentials:Tcred)
{
    const {password,email} = credentials;


    if(email.length ===0) return ERR_NO_USER;

    function getTokens(__data__:object)
    {
        const accessToken = TokenGenerator.generateAccessToken(__data__,"2 days");
        const refreshToken = TokenGenerator.generateRefreshToken(__data__,'30d');
        return( 
            {
            accessToken:accessToken,
            refreshToken:refreshToken
            }
        ) 
    }
    const data = await get_user_with_mail(email as string,'password,email,username,verified');
    
    if(data.rows.length === 0){
        return ERR_NO_USER;
    }
    else
    {// if here is such user, check if password is correct
        const match = await bcrypt.compare(password,data.rows[0].password);
                if(match)
                {
                    if(data.rows[0].verified === false){
                        return ERR_NOT_VERIFIED;
                    }
                    else{
                        let tokenData={
                            username:data.rows[0].username,
                            email:data.rows[0].email
                        }
                        return getTokens(tokenData)
                    }
                } else{
                    return ERR_INCORRECT_PASS;
                }
    }
}



export default class Ucontroller
{
    public static async login(req:RequestWithBody<Ireq>,res:Response<Iresponse>)
    {
        let password = req.body.password,
            email = req.body.email;
            if(email && password.length >0){
                
                let response = await comparePasswordToHash({email:email,password:password}); 

                if(response === 'NO_SUCH_USER' ||  response === 'INCORRECT_PASS')
                {
                    res.status(400).json('incorrect email or password');
                }
                else if(response === 'NOT_VERIFIED'){
                    res.status(400).json('not verified')
                }
                else
                {
                    res.status(200).cookie('access',response.accessToken,{
                        maxAge:1000 * 60  * 60 * 24 * 2,
                        httpOnly:true,
                        secure:false,
                    })
                    .cookie('refresh',response.refreshToken,{
                        maxAge:1000 * 60  * 60 * 24 * 30,
                        httpOnly:true,
                        secure:false,
                    })
                    .json('SET-COOKIE')
                }
            }else{
                res.status(400).json('not enough information');
            }
    }
    public static async verify(req:RequestWithBody<{access:string,refresh:string}>,res:Response<MiddlewareResponse>,next:NextFunction)
    {
        let access = req.body.access
        if(!access) return res.status(401).json({error:'not-authenticated'});
        const A = verificationFuntion(access,process.env.ACC as string);
        if(A){
            next();
        }else{
            res.json({error:'not-authenticated'})
        }
    }

    public static async authenticationWidthBody(req:RequestWithBody<{access:string,refresh:string}>,res:Response<ERR_MESSAGES | {message:'success_auth'}>)
    {
       res.json({message:'success_auth'}).status(200)
    }

    public static async register(req:RequestWithBody<Ireq>,res:Response<Iresponse>)
    {
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        if(email.length === 0 || password.length === 0 || username.length === 0)return res.status(200).json('not enough information');
        let user = await get_user_with_mail(email,'username,email');

        switch(user.rows.length)
        {
            case 0://user does not exist
                    if(password.length < 8)
                    {
                        res.status(400).json('password is too short')
                    }
                    else if(email.indexOf('@gmail.com')===-1 || email.indexOf('@yahoo.com')===-1)
                    {
                            res.status(400).json('invalid email or your email service is not supported')
                    }else{
                        let hashedPass = await bcrypt.hash(password,7)
                        let newUser = await db.query('insert into user_table (username,email,password,verified) values ($1,$2,$3,$4) returning *',
                                                     [username,email,hashedPass,false]);
                        res.status(200).redirect('https://youtube.com');
                    }
                
                break;
            default:
                res.status(403).json('user already exists');
            break;
        }
    }
}

const verificationFuntion = (token:string,secret:string):false |undefined | JwtPayload=>{
    try{
        return jwt.verify(token,secret,(_,payload)=>{
           return payload
        })  as JwtPayload
    }catch(error){
        return false
    }
}
