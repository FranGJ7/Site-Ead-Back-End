import { AuthenticationOptions } from "@adminjs/express"
import { User } from "../models"
import  bcrypt  from "bcrypt"


export const authenticationOptions: AuthenticationOptions =
{
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email } }) //buscando email apenas de admin
      if (user && user.role === 'admin') {     //comparando se confere email
        const matched = await bcrypt.compare(password, user.password) //aguardando senha para comparar usando bcrypt
  
        if (matched) {  // Caso senha bater retornar user
          return user
        }
      }
  
      return false
    },
    cookiePassword: 'senha-do-cookie'
  }