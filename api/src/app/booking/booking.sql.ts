export const SQL_RESERVA = {
  GET_ALL_RESERVATIONS: `
    SELECT * 
    FROM Reserva;
  `,

  GET_RESERVATIONS_BY_COURT_ID: `
    SELECT B.id_reserva,
           B.fecha, 
           B.hora_inicio, 
           B.hora_fin, 
           B.id_usuario, 
           U.nombre nombre_usuario,
           U.apellido apellido_usuario,
           C.nombre nombre_cancha,
           B.id_cancha
    FROM Reserva B
    INNER JOIN Usuario U
    ON U.id_usuario = B.id_usuario
    INNER JOIN Cancha C
    ON C.id_cancha = B.id_cancha
    WHERE B.id_cancha = $1
    AND fecha >= CURRENT_DATE;
  `,

  GET_RESERVATIONS_BY_USER_ID: `
    SELECT B.id_reserva,
           B.fecha, 
           B.hora_inicio, 
           B.hora_fin, 
           B.id_usuario, 
           U.nombre nombreUsuario,
           U.apellido apellidoUsuario,
           C.nombre nombreCancha,
           B.id_cancha
    FROM Reserva B
    INNER JOIN Cancha C
    ON C.id_cancha = B.id_cancha
    INNER JOIN Usuario U
    ON U.id_usuario = B.id_usuario
    WHERE B.id_usuario = $1
    AND fecha >= CURRENT_DATE;
  `,
  GET_RESERVATION_BY_ID: `
    SELECT * 
    FROM Reserva
    WHERE id_reserva = $1;
  `,

  CREATE_RESERVATION: `
    INSERT INTO Reserva (fecha, hora_inicio, hora_fin, id_usuario, id_cancha)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `,

  UPDATE_RESERVATION: `
    UPDATE Reserva
    SET fecha = $2,
        hora_inicio = $3,
        hora_fin = $4,
        id_usuario = $5,
        id_cancha = $6
    WHERE id_reserva = $1
    RETURNING *;
  `,

  DELETE_RESERVATION: `
    DELETE
    FROM Reserva
    WHERE id_reserva = $1
  `,
};
