CREATE TABLE Usuario (
  id_usuario SERIAL PRIMARY KEY,
  nombre varchar(255) NOT NULL,
  apellido varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  telefono BIGINT NOT NULL,
  password varchar(255) NOT NULL
);

CREATE TABLE Deporte (
  id_deporte SERIAL PRIMARY KEY,
  nombre varchar(255) NOT NULL
);

CREATE TABLE Cancha (
  id_cancha SERIAL PRIMARY KEY,
  nombre varchar(255) NOT NULL,
  capacidad integer NOT NULL,
  id_deporte integer NOT NULL
);

CREATE TABLE Evento (
  id_evento SERIAL PRIMARY KEY,
  nombre varchar(255) NOT NULL,
  fecha date NOT NULL,
  hora_inicio time NOT NULL,
  id_cancha integer NOT NULL
);

CREATE TABLE Reserva (
  id_reserva SERIAL PRIMARY KEY,
  fecha date NOT NULL,
  hora_inicio time NOT NULL,
  hora_fin time NOT NULL,
  id_usuario integer NOT NULL,
  id_cancha integer NOT NULL
);

CREATE TABLE Participante (

  id_usuario integer NOT NULL,
  id_evento integer NOT NULL,
  PRIMARY KEY(id_usuario, id_evento)
);

ALTER TABLE Cancha ADD FOREIGN KEY (id_deporte) REFERENCES Deporte (id_deporte);

ALTER TABLE Evento ADD FOREIGN KEY (id_cancha) REFERENCES Cancha (id_cancha);

ALTER TABLE Reserva ADD FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario);

ALTER TABLE Reserva ADD FOREIGN KEY (id_cancha) REFERENCES Cancha (id_cancha);

ALTER TABLE Participante ADD FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario);

ALTER TABLE Participante ADD FOREIGN KEY (id_evento) REFERENCES Evento (id_evento);
