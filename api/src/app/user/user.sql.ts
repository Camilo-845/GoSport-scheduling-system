export const SQL_USER = {
  GET_USER_DETAILS_BY_ID: `
      SELECT *
      FROM Usuario
      WHERE id_usuario = $1
`,
  UPDATE_USER: `
      UPDATE (nombre, apellido,telefono)
      VALUES($1 ,$2 ,$3)
      RETURNING *;
`,
};
