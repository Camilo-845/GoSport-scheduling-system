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
        SELECT * 
        FROM Usuario
        WHERE id_usuario = $1;
    `,
  UPDATE_USER_PASSWORD_BY_ID: `
        UPDATE Usuario
        SET password = $2
        WHERE id_usuario = $1;
  `,
};
