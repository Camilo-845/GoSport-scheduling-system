export const SQL_AUTH = {
  REGISTER_USER: `
        INSERT INTO Usuario
        (nombre, apellido, email, telefono,password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `,

  FIND_USER_BY_EMAIL: `
        SELECT * 
        FROM Usuario
        WHERE "email" = $1;
    `,

  FIND_USER_BY_ID: `
        SELECT nombre, apellido, email, telefono,password
        FROM Usuario
        WHERE id_usuario = $1;
    `,
};
