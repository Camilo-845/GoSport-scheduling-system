export const SQL_AUTH = {
    REGISTER_USER: `
        INSERT INTO "Usuario" 
        (nombre, apellido, "correoElectronico", telefono, user_name, contrasena)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING cedula, user_name, "correoElectronico";
    `,

    FIND_USER_BY_EMAIL: `
        SELECT cedula, user_name, contrasena 
        FROM "Usuario" 
        WHERE "correoElectronico" = $1;
    `,

    FIND_USER_BY_ID: `
        SELECT cedula, nombre, apellido, "correoElectronico", telefono, user_name
        FROM "Usuario"
        WHERE cedula = $1;
    `
};
