import {Request,Response,NextFunction} from 'express'

export const ErrorNotFound = (req:Request,res:Response,next:NextFunction) => {
    res.status(404);
    res.json({message:"Not Found"});
}