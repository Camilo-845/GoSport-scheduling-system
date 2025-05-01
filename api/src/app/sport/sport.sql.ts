export const SQL_SPORT = {
  GET_ALL_SPORTS: `
    SELECT * 
    FROM Deporte;
  `,

  CREATE_SPORT: `
    INSERT INTO Deporte (nombre)
    VALUES ($1)
    RETURNING *;
  `,

  UPDATE_SPORT: `
    UPDATE Deporte
    SET nombre = $2
    WHERE id_deporte = $1
    RETURNING *;
  `,

  DELETE_SPORT: `
    DELETE
    FROM Deporte
    WHERE id_deporte = $1
    RETURNING *;
  `,

  GET_SPORT_BY_ID: `
    SELECT *
    FROM Deporte
    WHERE id_deporte = $1;
`,
};
