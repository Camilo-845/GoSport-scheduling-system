export const SQL_USER = {
  GET_USER_DETAILS_BY_ID: `
      SELECT *
      FROM Usuario
      WHERE id_usuario = $1
`,
  UPDATE_USER: `
      UPDATE Usuario
      SET nombre = $2,
          apellido = $3,
          telefono = $4
      WHERE id_usuario = $1
      RETURNING *;
`,
};
