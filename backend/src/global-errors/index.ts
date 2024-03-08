import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const handleErrors = (err:ErrorRequestHandler, req:Request, res:Response, next:NextFunction) =>{
    res.status(500).send({
        message: "Something went wrong"
    });
}

export const invalidAPI = (req:Request, res:Response) =>{
    res.status(404).send({
        message:"Invalid API"
    })
}