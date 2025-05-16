export const SQL_EVENT = {
  GET_ALL_EVENTS: `
    SELECT 
      E.id_evento,
      E.nombre,
      E.fecha,
      E.hora_inicio,
      E.id_cancha,
      CASE 
        WHEN P.id_usuario IS NOT NULL THEN true
        ELSE false
      END AS es_participante
    FROM Evento E
    LEFT JOIN Participante P 
      ON E.id_evento = P.id_evento AND P.id_usuario = $1;
  `,

  GET_EVENT_BY_ID: `
    SELECT * 
    FROM Evento
    WHERE id_evento = $1;
  `,

  CREATE_EVENT: `
    INSERT INTO Evento (nombre, fecha, hora_inicio, id_cancha)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `,

  UPDATE_EVENT: `
    UPDATE Evento
    SET nombre = $2,
        fecha = $3,
        hora_inicio = $4,
        id_cancha = $5
    WHERE id_evento = $1
    RETURNING *;
  `,

  DELETE_EVENT: `
    DELETE
    FROM Evento
    WHERE id_evento = $1
    RETURNING *;
  `,

  GET_EVENT_PARTICIPANTS: `
    SELECT P.id_usuario, U.nombre, U.apellido, U.email, U.telefono
    FROM Participante P
    INNER JOIN Usuario U
    ON U.id_usuario = P.id_usuario
    WHERE P.id_evento = $1;
  `,

  POST_EVENT_PARTICIPANT: `
    INSERT INTO Participante (id_usuario, id_evento)
    VALUES ($1, $2);
`,
  REMOVE_PARTICIPANT_OF_EVENT: `
    DELETE 
    FROM Participante
    WHERE id_evento = $2 AND id_usuario = $1;
`,
};
