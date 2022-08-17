import { User } from "../models"
import { UserCreationAttributes } from "../models/User"

export const userService ={
    finByEmail: async (email: string) =>{
        const user = await User.findOne({  //Buscando apenas 1 usuário atráves do email
            where: {
            email
        }
        })
        return user
    },
    
    create: async (attributes: UserCreationAttributes) =>{ //Pegando atributos já pronto usados no adminjs
        const user = await User.create(attributes)
        return user

    }
}