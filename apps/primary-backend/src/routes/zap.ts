import { Router } from 'express'
import { authMiddleware } from '../middleware';
import { ZapCreateSchema } from '../types/schema';
import { db } from '../db/db';


const router = Router();



router.post("/",authMiddleware,async(req,res):Promise<any>=>{
    //@ts-ignore
    const id:string = req.id;
 
    const body = req.body;

    console.log(body)
    
    const parsedData = ZapCreateSchema.safeParse(body);


    if(!parsedData.success){
        return res.status(403).json({
            message: "Incorrect Inputs"
        })
    }

  const zapId =  await db.$transaction(async tx=>{
        const zap = await db.zap.create({
            data:{
                userId:parseInt(id),
                triggerId: "",
                actions:{
                    create: parsedData.data.actions.map((x,index)=>({
                        actionId: x.availableActionId,
                        sortingOrder: index,
                        metadata: x.actionMetadata
                    }))
                }
            }
        })

        const trigger = await tx.trigger.create({
            data:{
                triggerId: parsedData.data.availableTriggerId,
                zapId: zap.id
            }
        })

        await tx.zap.update({
            where:{
                id: zap.id
            },
            data:{
                triggerId: trigger.id
            }
        })

        return zap.id;

    })

    res.status(200).json({
        zapId
    })


})


router.get("/",authMiddleware,async(req,res):Promise<any>=>{
    //@ts-ignore
    const id = req.id;
    
    const zaps = await db.zap.findMany({
        where:{
            userId: id,
        },
        include:{
            actions:{
                include:{
                    type:true
                }
            },
            trigger:{
                include:{
                    type:true
                }
            }
        }
    })

    console.log("zaps")

    return res.status(200).json({
        zaps
    })

})


router.get("/:zapId",authMiddleware,async(req,res):Promise<any>=>{
     //@ts-ignore
     const id = req.id;

     const zapId = req.params.zapId;

     const zaps = await db.zap.findFirst({
        where:{
            id:zapId,
            userId: id
        },
        include:{
          actions:{
            include:{
                type:true
            }
          },
          trigger:{
            include:{
                type:true
            }
          }
        }
     })

     console.log("zaps handler")

     return res.status(200).json({
        zaps
     })


})





export const zapRouter = router;