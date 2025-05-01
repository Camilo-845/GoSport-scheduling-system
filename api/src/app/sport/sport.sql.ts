export const SQL_SPORT = {
  GET_ALL_SPORTS: `
    SELECT *
    FROM Deporte;
`,

  ADD_SPORT: `
    INSERT INTO Deporte
    (nombre)
    VALUES ($1)
    RETURNING *;
  `,
};
