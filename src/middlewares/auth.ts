import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
}


export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const authorizationHeaders = req.headers.authorization

    if (!authorizationHeaders) return res.status(401).json({
        message: 'Não autorizado: Nenhum token foi encontrado.'
    })
    const token = authorizationHeaders.replace(/Bearer /, '')

    jwtService.verifyToken(token, (err, decoded)=>{
       if (err || typeof decoded === 'undefined') return res.status(401).json({
        message: 'Não autorizado: Token inválido.'
       })

       userService.finByEmail((decoded as JwtPayload).email).then(user =>{
          req.user = user   // erro no user undefined
          next()   //Continua as middleware
       })

    })
}