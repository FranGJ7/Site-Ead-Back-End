import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"                                // mostrar ORM usada na aplicação
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { User } from '../models'
import bcrypt from 'bcrypt'
import { locale } from "./locale";


AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
    databases: [sequelize],   // está em arrray por poder usar mais de um banco de dados 
    rootPath: "/admin",       // referencia de rota para se conectar com o adminJs
    resources: adminJsResources,  //Incluindo no painel AdminJS
    branding:{                // Estilizar adminJS   
        companyName: 'OneBitFlix',
        logo: '/onebitflix.svg',
        theme: {
          colors: {
            primary100: '#ff0043',
              primary80: '#ff1a57',
              primary60: '#ff3369',
              primary40: '#ff4d7c',
                primary20: '#ff668f',
              grey100: '#151515',
              grey80: '#333333',
              grey60: '#4d4d4d',
              grey40: '#666666',
              grey20: '#dddddd',
              filterBg: '#333333',
              accent: '#151515',
              hoverBg: '#151515',
          }
        }

    },
    locale: locale
})


//export const adminJsRouter = AdminJSExpress.buildRouter(adminJs)  construindo rotas no app do express
//rotas autenticada

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
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
}, null, {
	resave: false,
	saveUninitialized: false
})