import express from "express"
import { adminJs, adminJsRouter } from "./adminjs";
import { sequelize } from "./database";
import { router } from "./routes";

const app = express()

app.use(express.static('public'))


app.use(adminJs.options.rootPath, adminJsRouter) // pegando rota

app.use(router)




const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
      sequelize.authenticate().then(() =>{
          console.log("DB connection sucessfull")
      })
    console.log(`Server started sucessfuly at port ${PORT}`)
});