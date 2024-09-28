import {  NextFunction ,Request,Response} from 'express';
import { auth , UnauthorizedError} from 'express-oauth2-jwt-bearer';

const config = {
  audience: 'https://api-northwin',
  issuerBaseURL: 'https://dev-6kheafszlnh3mean.us.auth0.com/',
  tokenSigningAlg: 'RS256'
};

const oauthCheck= auth(config);

const handler_s = (err: Error,req:Request,res: Response, next: NextFunction) => {
  if (err instanceof UnauthorizedError) {
    res.status(401).json({ error:'Credenciales inválidas'});
  }else{
    next();
  }
};


export {oauthCheck,handler_s,config};