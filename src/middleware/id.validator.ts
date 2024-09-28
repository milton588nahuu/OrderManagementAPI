import {Request,Response,NextFunction} from 'express';
import { isValidObjectId } from 'mongoose';

export const validateID = async (req:Request, res: Response, next: NextFunction) =>  {
    const _id = req.params.id
    console.log(_id);
    const idisValid:boolean = isValidObjectId(_id);
    if(idisValid){
        next();
    }else{
        res.status(400).json({error:"invalid params"});
    }
}