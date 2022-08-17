import { Request, Response } from "express"
import { userService } from "../services/userService"

export const authController ={
    register: async (req: Request, res: Response) => {
        const {firstName, lastName, email, password, birth, phone} = req.body //bdy pode vir de varios formatos diferentes alterar em server

      try{
           const userAlreadyExists = await userService.finByEmail(email) //pegando um email
          
           if(userAlreadyExists){                                 //verificar se email já existe
              throw new Error('Este e-mail já está cadastrado')
           }
        
           const user = await userService.create({
            firstName,
            lastName,
            birth,
            phone,                         //Estrutura de cração de usuário para front-end
            email,
            password,
            role: 'user'
           })

           return res.status(201).json(user)
         
      }catch(err){if(err instanceof Error) {
        return res.status(400).json({ message: err.message })
    }

      }


    } 
}