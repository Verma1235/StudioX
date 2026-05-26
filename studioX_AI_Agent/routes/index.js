import express from "express";

const router = express.Router();

router.get("/",(req,res)=>{
    res.send({
        success:true,
        message:"all things working good !!"
    })
})



export default router;