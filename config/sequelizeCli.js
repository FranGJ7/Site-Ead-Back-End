module.exports = {
    development:{
        dialect: 'postgres',
        host: 'localhost',
        port: '5432',
        database: 'siteead_development',
        username: 'siteead',
        password: 'siteead'
    }
}

//SequelizeCli vai Ultilizar para se conectar com o banco de dados

//criando o banco de dados =>    npx sequelize-cli db:create


//criar usuario no postgres com senha cryptografada