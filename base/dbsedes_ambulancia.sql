# Host: localhost  (Version 5.5.5-10.4.27-MariaDB)
# Date: 2024-04-15 00:54:53
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "chofer"
#

DROP TABLE IF EXISTS `chofer`;
CREATE TABLE `chofer` (
  `id` int(11) NOT NULL,
  `categoria_licencia` varchar(10) NOT NULL,
  `antecedentes` varchar(150) NOT NULL,
  `hora_Entrada` datetime DEFAULT NULL,
  `hora_Salida` datetime DEFAULT NULL,
  `sueldo` decimal(8,2) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `registerDate` datetime DEFAULT current_timestamp(),
  `lastUpdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `chofer_ibfk_1` FOREIGN KEY (`id`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "chofer"
#

INSERT INTO `chofer` VALUES (5,'A','Buenos','2024-03-31 08:00:00','2024-03-31 17:00:00',2000.00,1,0,'2024-04-14 23:55:24',NULL),(6,'A','Buenos','2024-03-31 08:00:00','2024-03-31 17:00:00',2000.00,1,1,'2024-04-15 00:00:14',NULL);

#
# Structure for table "ambulancia"
#

DROP TABLE IF EXISTS `ambulancia`;
CREATE TABLE `ambulancia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero_placa` varchar(20) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `conductor_id` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `registerDate` datetime DEFAULT current_timestamp(),
  `lastUpdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `conductor_id` (`conductor_id`),
  CONSTRAINT `ambulancia_ibfk_1` FOREIGN KEY (`conductor_id`) REFERENCES `chofer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "ambulancia"
#


#
# Structure for table "inventario"
#

DROP TABLE IF EXISTS `inventario`;
CREATE TABLE `inventario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `ambulancia_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `registerDate` datetime DEFAULT current_timestamp(),
  `lastUpdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ambulancia_id` (`ambulancia_id`),
  CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`ambulancia_id`) REFERENCES `ambulancia` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "inventario"
#


#
# Structure for table "persona"
#

DROP TABLE IF EXISTS `persona`;
CREATE TABLE `persona` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(50) NOT NULL,
  `primerApellido` varchar(50) NOT NULL,
  `segundoApellido` varchar(50) DEFAULT NULL,
  `carnet` varchar(25) NOT NULL,
  `fechaNacimiento` datetime DEFAULT NULL,
  `direccion` varchar(250) NOT NULL,
  `celular` varchar(25) NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `registerDate` datetime DEFAULT current_timestamp(),
  `lastUpdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "persona"
#

INSERT INTO `persona` VALUES (1,'Nombre','Apellido1','Apellido2','123456789','1990-01-01 00:00:00','Dirección 123','123456789',1,1,'2024-04-14 23:36:41',NULL),(2,'Nombre','Apellido1','Apellido2','123456789','1990-01-01 00:00:00','Dirección 123','123456789',2,1,'2024-04-14 23:40:18',NULL),(3,'Nombre','Apellido1','Apellido2','123456789','1990-01-01 00:00:00','Dirección 123','123456789',3,1,'2024-04-14 23:40:56',NULL),(4,'Nombre','Apellido1','Apellido2','123456789','1990-01-01 00:00:00','Dirección 123','123456789',4,1,'2024-04-14 23:42:03',NULL),(5,'Juan','Perez','Gonzalez','123456789','1990-05-15 00:00:00','Calle 123','123456789',1,0,'2024-04-14 23:55:24',NULL),(6,'Juan','Perez','Gonzalez','123456789','1990-05-15 00:00:00','Calle 123','123456789',1,1,'2024-04-15 00:00:14',NULL);

#
# Structure for table "paciente"
#

DROP TABLE IF EXISTS `paciente`;
CREATE TABLE `paciente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(50) DEFAULT NULL,
  `primerApellido` varchar(50) DEFAULT NULL,
  `segundoApellido` varchar(50) DEFAULT NULL,
  `carnet` varchar(25) NOT NULL,
  `fechaNacimiento` datetime DEFAULT NULL,
  `direccion` varchar(250) DEFAULT NULL,
  `celular` varchar(25) DEFAULT NULL,
  `direccion_accidente` varchar(250) NOT NULL,
  `estado_paciente` varchar(150) DEFAULT NULL,
  `nombre_entidad` varchar(50) NOT NULL,
  `persona_id` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `registerDate` datetime DEFAULT current_timestamp(),
  `lastUpdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `persona_id` (`persona_id`),
  CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "paciente"
#


#
# Structure for table "materialutilizado"
#

DROP TABLE IF EXISTS `materialutilizado`;
CREATE TABLE `materialutilizado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `inventario_id` int(11) NOT NULL,
  `ambulancia_id` int(11) NOT NULL,
  `paciente_id` int(11) NOT NULL,
  `cantidad_utilizada` int(11) NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `registerDate` datetime DEFAULT current_timestamp(),
  `lastUpdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inventario_id` (`inventario_id`),
  KEY `paciente_id` (`paciente_id`),
  KEY `ambulancia_id` (`ambulancia_id`),
  CONSTRAINT `materialutilizado_ibfk_1` FOREIGN KEY (`inventario_id`) REFERENCES `inventario` (`id`),
  CONSTRAINT `materialutilizado_ibfk_2` FOREIGN KEY (`paciente_id`) REFERENCES `paciente` (`id`),
  CONSTRAINT `materialutilizado_ibfk_3` FOREIGN KEY (`ambulancia_id`) REFERENCES `ambulancia` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "materialutilizado"
#


#
# Structure for table "usuario"
#

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(30) NOT NULL,
  `contrasenia` varbinary(30) NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `registerDate` datetime DEFAULT current_timestamp(),
  `lastUpdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "usuario"
#

INSERT INTO `usuario` VALUES (1,'nombre_usuario',X'636F6E74726173656E6961',1,1,'2024-04-14 23:36:41',NULL),(2,'Admin',X'61646D696E313233',2,1,'2024-04-14 23:40:18',NULL),(3,'Diana',X'4469616E61',3,1,'2024-04-14 23:40:56',NULL),(4,'Toby',X'546F6279313233',4,1,'2024-04-14 23:42:03',NULL);
