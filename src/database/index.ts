import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'siteead_development',
        username: 'siteead',
        password: 'siteead', 
         define:{
            underscored: true  // formato padrão snake_case alterando para camelCase
         }
})


//conectando com banco de dados levando propriedades para sever.ts