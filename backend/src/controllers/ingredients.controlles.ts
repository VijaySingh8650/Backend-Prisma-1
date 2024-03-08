import { Request, Response } from "express";
import { ZIngredients } from "../types/data-integrity";
import { prisma } from "../database";

export const createIngredients = async(req:Request, res:Response):Promise<Response> =>{

    try{
          let validateRequestBody  = ZIngredients.safeParse(req.body);

          if(!validateRequestBody.success){
              return res.status(400).send({message: "Please send valid data"});
          }

          await prisma.ingredients.create({
            data:{
                name: req.body.name
            }
          });

        return res.status(200).send({message: "Ingredients created"});
    }
    catch(error){
        return res.status(500).send({
            error
        })
    }

}