import { Request, Response } from "express";
import { ZDelete_Meal, ZMeals, ZParams} from "../types/data-integrity";
import { prisma } from "../database";



export const getMeal = async(req:Request, res:Response)=>{
   try{

     let validateParams = ZParams.safeParse(req.params);

     if (!validateParams?.success) {
        return res.status(400).send({ message: "Please send valid params" });
    }

    let varifyUser = await prisma.user.findUnique({
        where: {
          id: Number(req.params.id)
        },
      });

    if(varifyUser){

        let allMeals = await prisma.meals.findMany({
            where:{

                userId: Number(req.params.id),

            }
        });

        if((req as any).regenerateToken){

            return res.status(200).send({size: allMeals?.length, meals: allMeals, token:(req as any).token, refreshToken: (req as any).refreshToken});
        }

        return res.status(200).send({size: allMeals?.length, meals: allMeals});

    }

    return res.status(401).send({ message: "UnAuthorised" });



   }
   catch(error){
    return res.status(500).send({error});
   }
}


export const createMeal = async(req:Request, res:Response) =>{
    try{

        let validateRequestBody = ZMeals.safeParse(req.body);
        if(!validateRequestBody?.success){
            return res.status(400).send({ message: "Please send valid data" });
        }

        let verifyUser = await prisma.user.findUnique({
            where:{
                id: req.body.userId
            }
        });

        if(verifyUser){
            let resp = await prisma.meals.create({
                data:{
                   ...req.body 
                }
            });

            if((req as any).regenerateToken){

                return res.status(200).send({message: "Meals created successfully", token: (req as any).token, refreshToken: (req as any).refreshToken});
            }

            return res.status(200).send({message: "Meals created successfully", resp});
        }

        return res.status(401).send({ message: "UnAuthorised" });

    }
    catch(error){
        return res.status(500).send({error});
    }
}



export const updateMeal = async(req:Request, res:Response)=>{
    try{
 
      let validateParams = ZParams.safeParse(req.params);
      let validateRequestBody = ZMeals.safeParse(req.params);
 
      if (!validateParams?.success || !validateRequestBody?.success) {
         return res.status(400).send({ message: "Please send valid params" });
     }
 
     let varifyUser = await prisma.user.findUnique({
         where: {
           id: Number(req.body.userId)
         },
       });
 
     if(varifyUser){
 
         let updateMeal = await prisma.meals.update({
             where:{
 
                id: Number(req.params.id),
 
             },
             data:{
                ...req.body
             }
         });
 
         if((req as any).regenerateToken){
 
             return res.status(200).send({message:"Meal is updated", updateMeal, token:(req as any).token, refreshToken: (req as any).refreshToken});
         }
 
         return res.status(200).send({message:"Meal is updated", updateMeal});
 
     }
 
     return res.status(401).send({ message: "UnAuthorised" });
 
 
 
    }
    catch(error){
     return res.status(500).send({error});
    }
 }


export const deleteMeal = async(req:Request, res:Response)=>{
    try{
 
      let validateParams = ZParams.safeParse(req.params);
      let validateRequestBody = ZDelete_Meal.safeParse(req.params);
 
      if (!validateParams?.success || !validateRequestBody?.success) {
         return res.status(400).send({ message: "Please send valid params" });
     }
 
     let varifyUser = await prisma.user.findUnique({
         where: {
           id: Number(req.body.userId)
         },
    });
 
     if(varifyUser){
 
         let updateMeal = await prisma.meals.delete({
             where:{
 
                id: Number(req.params.id),
 
             }
         });
 
         if((req as any).regenerateToken){
 
             return res.status(200).send({message:"Meal deleted successfully", updateMeal, token:(req as any).token, refreshToken: (req as any).refreshToken});
         }
 
         return res.status(200).send({message:"Meal deleted successfully", updateMeal});
 
     }
 
     return res.status(401).send({ message: "UnAuthorised" });
 
 
 
    }
    catch(error){
     return res.status(500).send({error});
    }
 }