export const SQL_COURT = {
  GET_ALL_COURTS: `
    SELECT * 
    FROM Cancha;
  `,

  GET_COURT_BY_ID: `
    SELECT * 
    FROM Cancha
    WHERE id_cancha = $1;
  `,

  CREATE_COURT: `
    INSERT INTO Cancha (nombre, capacidad, id_deporte)
    VALUES ($1, $2, $3)
    RETURNING *;
  `,

  UPDATE_COURT: `
    UPDATE Cancha
    SET nombre = $2,
        capacidad = $3,
        id_deporte = $4
    WHERE id_cancha = $1
    RETURNING *;
  `,

  DELETE_COURT: `
    DELETE
    FROM Cancha
    WHERE id_cancha = $1
    RETURNING *;
  `,
};
