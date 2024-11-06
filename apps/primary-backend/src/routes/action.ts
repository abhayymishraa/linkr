import { Router } from "express";
import { db } from "../db/db";

const router = Router();

router.get("/available",async(req,res)=>{
   const availableAction = await db.availableAction.findMany({});
   res.json({
    availableAction
   })
})

export const actionRouter = router;