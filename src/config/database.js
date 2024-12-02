import Sequelize from "sequelize";

const hostname = 'localhost'
const username = 'postgres'
const password = 'contrasena'
const database = 'inatstore'
const port = 5432;
const dialect = 'postgres'

const sequelize = new Sequelize(database, username, password,{
    host: hostname,
    port: port,
    dialect: dialect,
    operatorAliases: false
})

export default sequelize;