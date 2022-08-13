import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"                                // mostrar ORM usada na aplicação
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { locale } from "./locale";
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { authenticationOptions } from "./authentication";


AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
  databases: [sequelize],   // está em arrray por poder usar mais de um banco de dados 
  rootPath: "/admin",       // referencia de rota para se conectar com o adminJs
  resources: adminJsResources,  //Incluindo no painel AdminJS
  branding: brandingOptions,
  locale: locale,
  dashboard: dashboardOptions
})


//export const adminJsRouter = AdminJSExpress.buildRouter(adminJs)  construindo rotas no app do express
//rotas autenticada

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, authenticationOptions, null, {
  resave: false,
  saveUninitialized: false
})