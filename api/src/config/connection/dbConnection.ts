import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { optionsPG } from "./optionsPG";

dotenv.config({
    path: ".env",
}); 

const db_name = process.env.DB_NAME || "db_solicitudes";
const db_user = process.env.DB_USER || "admin";
const db_password = process.env.DB_PASSWORD || "admin";
const db_host = process.env.DB_HOST || "localhost";
const db_port = parseInt(process.env.DB_PORT || "5432", 10);

const pgp = pgPromise(optionsPG);
console.log("DATOS CONEXION", db_name, db_user, db_password, db_host, db_port);
const pool = pgp({
    user: db_user,
    password: db_password,
    port: db_port,
    database: db_name,
    host: db_host
}); 

pool.connect().then((miCone) => {
    console.log("Conectado a la base de datos", db_name);
    miCone.done();
}).catch((miError) => {
    console.log(miError);
});

export default pool;
