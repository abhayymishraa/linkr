import express from 'express';
import { PrismaClient } from '@repo/database'; 


const client = new PrismaClient();

const app = express();
app.use(express.json())
app.post('/hooks/catch/:userId/:zapId',async(req,res)=>{
   const userId = req.params.userId;
   const zapId  = req.params.zapId;
   const body = req.body;
   console.log(body);

    await client.$transaction(async tx =>{
       const run =  await tx.zapRun.create({
           data:{
               zapId:zapId,
               metadata: body
               
           }
         })

         await tx.zapRunOutBox.create({
           data:{
               zapRunId: run.id
           } 
         })
    })

    res.json({
       message: "Webhook Recieved"
    });

})



app.listen(3002,()=> console.log('Server is Running on Port 3002'));