
-- Usuario
INSERT INTO Usuario (nombre, apellido, email, telefono, password) VALUES
('Camilo', 'Martínez', 'camilo@example.com', 3001234567, 'pass1'),
('Laura', 'Gómez', 'laura@example.com', 3009876543, 'pass2'),
('Juan', 'Pérez', 'juan@example.com', 3011112233, 'pass3'),
('Ana', 'Ramírez', 'ana@example.com', 3022223344, 'pass4'),
('Carlos', 'Torres', 'carlos@example.com', 3033334455, 'pass5'),
('María', 'Lopez', 'maria@example.com', 3044445566, 'pass6'),
('Luis', 'García', 'luis@example.com', 3055556677, 'pass7'),
('Diana', 'Ruiz', 'diana@example.com', 3066667788, 'pass8'),
('Jorge', 'Santos', 'jorge@example.com', 3077778899, 'pass9'),
('Valentina', 'Mejía', 'valentina@example.com', 3088889900, 'pass10');

-- Deporte
INSERT INTO Deporte (nombre) VALUES
('Fútbol'),
('Baloncesto'),
('Voleibol'),
('Tenis'),
('Padel'),
('Béisbol'),
('Natación'),
('Atletismo'),
('Ping Pong'),
('Rugby');

-- Cancha
INSERT INTO Cancha (nombre, capacidad, id_deporte) VALUES
('Cancha Fútbol A', 22, 1),
('Cancha Fútbol B', 20, 1),
('Cancha Basket A', 10, 2),
('Cancha Volei', 12, 3),
('Cancha Tenis A', 4, 4),
('Cancha Tenis B', 4, 4),
('Cancha Padel', 6, 5),
('Piscina Olímpica', 30, 7),
('Pista Atletismo', 50, 8),
('Mesa Ping Pong 1', 2, 9);

-- Evento
INSERT INTO Evento (nombre, fecha, hora_inicio, id_cancha) VALUES
('Torneo Fútbol Juvenil', '2025-05-10', '09:00', 1),
('Copa Basket Escolar', '2025-05-12', '10:00', 3),
('Torneo Volei Mixto', '2025-05-15', '08:30', 4),
('Open Tenis Primavera', '2025-05-16', '14:00', 5),
('Desafío Padel', '2025-05-17', '13:00', 7),
('Campeonato Natación', '2025-05-18', '09:30', 8),
('Carrera 5K', '2025-05-19', '07:00', 9),
('Ping Pong Pro', '2025-05-20', '11:00', 10),
('Torneo Tenis B', '2025-05-21', '15:00', 6),
('Liga Fútbol Pro', '2025-05-22', '17:00', 2);

-- Reserva
INSERT INTO Reserva (fecha, hora_inicio, hora_fin, id_usuario, id_cancha) VALUES
('2025-05-01', '08:00', '09:00', 1, 1),
('2025-05-01', '09:00', '10:00', 2, 2),
('2025-05-02', '10:00', '11:00', 3, 3),
('2025-05-02', '11:00', '12:00', 4, 4),
('2025-05-03', '08:00', '09:00', 5, 5),
('2025-05-03', '09:00', '10:00', 6, 6),
('2025-05-04', '10:00', '11:00', 7, 7),
('2025-05-04', '11:00', '12:00', 8, 8),
('2025-05-05', '12:00', '13:00', 9, 9),
('2025-05-05', '13:00', '14:00', 10, 10);

-- Participante
INSERT INTO Participante (id_usuario, id_evento) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);
