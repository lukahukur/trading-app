import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { RequestWithBody } from '../types/types';
import {Response} from 'express'

dotenv.config();

interface Treq {
    message:string,
    to:string,
    subject:string
}
export class Mailer{
    public static async sendMail(req:RequestWithBody<Treq>,res:Response<any>){
        let message = req.body.message;
        let target = req.body.to;
        console.log(message)
        return new Promise((res,rej)=>{
            var T = nodemailer.createTransport({
                service:process.env.MAILER_SERVICE,
                auth:{
                    user:process.env.MAILER_MAIL,
                    pass:process.env.MAILER_PASS
                }
            });
           let msgObj = {
            from:process.env.MAILER_MAIL,
            to:target,
            subject:'test',
            text:message
           }
           T.sendMail(msgObj,(err,info)=>{
            if(err){
              return rej(err)
            }else{
              return res({message:"message was sent successfully"})
            }
           });

        })
    }
}