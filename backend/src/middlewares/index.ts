import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { boolean } from "zod";



export const regenerateToken = (req:Request, res:Response, next:NextFunction) =>{
        try{
            let {refreshtoken} = req.headers;
            let verifiedToken: any = jwt.verify(refreshtoken as string, process.env.SECRET_KEY as string);
            (req as any).regenerateToken = false;

            if(verifiedToken){

                
                let  token = jwt.sign({email: verifiedToken?.email}, process.env.SECRET_KEY as string, {expiresIn:"1m"});
                (req as any).token = token;
                (req as any).refreshToken = refreshtoken;
                (req as any).email = verifiedToken?.email;
                (req as any).regenerateToken = true;

                next();
            }
          
        }
        catch(error:any){

            if(error?.name === "TokenExpiredError"){

                return res.status(500).send({message: "Token expired"});
            }
            
            return res.status(500).send({error});
        }
}



export const verifyToken = (req:Request, res:Response, next:NextFunction) =>{
    try{
         let {authorization, refreshtoken} = req.headers;
        
         if(!authorization || !refreshtoken){
            return res.status(401).send({message:"UnAuthorised"});
         }

         let verifiedToken:any = jwt.verify(authorization, process.env.SECRET_KEY as string);
         if(verifiedToken){
         
            (req as any).email = verifiedToken?.email;
            (req as any).regenerateToken = false;
            next();

         }

         
    }
    catch(error:any){
        
        if (error?.name === "TokenExpiredError") {
            regenerateToken(req, res, next);
            return;
        }

        return res.status(500).send({error});
    }
}

