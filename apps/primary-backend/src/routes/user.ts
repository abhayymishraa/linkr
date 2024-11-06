import { Router } from 'express'
import { SigninSchema, SignupSchema } from '../types/schema';
import  jwt  from 'jsonwebtoken';
import { db } from '../db/db';
import { JWT_PASS } from '@repo/common';
import { authMiddleware } from '../middleware';





const router = Router();



router.post("/signup", async (req, res):Promise<any>=> {
    const body =  req.body
    const parsedData = SignupSchema.safeParse(body);
    if(!parsedData.success){
        return res.status(411).json({"message": "Inavlid Credential"});
    } 

    const userExist = await db.user.findFirst({
        where:{
            email:parsedData.data.username 
        }
    })

    if(userExist){
        return res.status(403).json({"message": "Username Already Exist"});
    }
     
    //todo don't store the pass here
    await db.user.create({
      data:{
        email: parsedData.data.username,
        password: parsedData.data.password,
        name: parsedData.data.name
      }
    })

    // await sendEmail()
    
    res.status(200).json({
        message: "Please verify your account by checking your mail"
    })

})

router.post("/signin",async(req,res):Promise<any>=>{

    const body = req.body;
    
    const parsedData = SigninSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(400).json({
            message: "Invalid Credential"
        })
    }
    
    const user = await db.user.findFirst({
        where:{
            email: parsedData.data.username,
            //todo dont
            password: parsedData.data.password
        }
    }) 

    if(!user){
        return res.status(403).json({"message": "Inavlid Credential"});
    }

    const token = jwt.sign({
        id:user.id
    },JWT_PASS)

    res.json({
        token:token
    })  

})


router.get("/", authMiddleware ,async(req,res):Promise<any>=>{
    
    // @ts-ignore
    const id = req.id;
    const user = await db.user.findFirst({
        where:{
            id
        },
        select:{
            name: true,
            email:true
        }
    })

    return res.json({
        user
    })

})



export const userRouter = router;