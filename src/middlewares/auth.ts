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

    jwtService.verifyToken(token, async (err, decoded)=>{
       if (err || typeof decoded === 'undefined') return res.status(401).json({
        message: 'Não autorizado: Token inválido.'
       })

     const user = await  userService.finByEmail((decoded as JwtPayload).email)
          req.user = user   // erro no user undefined
          next()   //Continua as middleware
       })  
}
export function ensureAuthViaQuery(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const {token} = req.query 

    if (!token) return res.status(401).json({
        message: 'Não autorizado: Nenhum token foi encontrado.'
    })

    if(typeof token !== 'string') return res.status(400).json({
        message: 'O parâmetro token deve ser o tipo string'
    })

    jwtService.verifyToken(token, async(err, decoded)=>{
        if (err || typeof decoded === 'undefined') return res.status(401).json({
         message: 'Não autorizado: Token inválido.'
        })

        const user = await userService.finByEmail((decoded as JwtPayload).email)
        req.user = user
        next()

})
}
