import { JWT_PASS } from "@repo/common";
import { NextFunction, Request,Response } from "express";
import  jwt  from "jsonwebtoken";

export function authMiddleware(req:Request,res:Response,next:NextFunction):void{
    const token = req.headers.authorization as unknown as string

    try{
    
        const payload = jwt.verify(token,JWT_PASS);
        //@ts-ignore
        req.id  = payload.id
    
        next();
    }catch(e){
         res.status(403).json({
            message:"You are not logged in"
        })
    }

}