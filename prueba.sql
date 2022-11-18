-- MariaDB dump 10.19  Distrib 10.6.7-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: prueba
-- ------------------------------------------------------
-- Server version	10.6.7-MariaDB-2ubuntu1.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(255) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `Edad` int(3) NOT NULL,
  `Genero` char(1) DEFAULT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Fecha_Nacimiento` date DEFAULT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (1,'eduardo1@gmail.com','Eduardo','Lopez Urbano',21,'M','1234','2000-12-21','S','2022-11-08 16:51:49'),(2,'dallana2@gmail.com','Dallana','Cardoza Marinez',21,'F','1234','2001-06-16','S','2022-11-08 16:52:43'),(3,'daniramon3@gmail.com','Daniela','Ramon Feria',21,'F','1234','2001-07-27','S','2022-11-17 17:14:00'),(4,'laloi@gmail.com','daniel','manrique ',20,'','$2a$10$DjmKufKBxCVLqu6t0GaacufEAuqcO.qGng35ybQlf9X.WedSARLx6','2000-10-09','s','2022-11-10 16:12:30');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hill_climb`
--

DROP TABLE IF EXISTS `hill_climb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hill_climb` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Vehiculo` varchar(255) NOT NULL,
  `Etapa` varchar(255) NOT NULL,
  `Mejoras` varchar(255) NOT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hill_climb`
--

LOCK TABLES `hill_climb` WRITE;
/*!40000 ALTER TABLE `hill_climb` DISABLE KEYS */;
INSERT INTO `hill_climb` VALUES (1,'Motocicleta','Luna','Motor, Suspension,Propulsion, Gasolina','N','2022-11-15 22:21:16','2022-11-16 16:18:25'),(2,'Camion Monstruo','Campo','Motor, Suspension, Neumaticos, T4R','S','2022-11-15 22:26:18','2022-11-15 22:26:18'),(3,'Tractor','Campamento Militar','Motor, Gasolina, Neumaticos, Estabilidad','N','2022-11-15 22:29:40','2022-11-15 23:26:45'),(4,'Turbodiesiel 4X4','Campo','Motor, Neumaticos,','N','2022-11-15 22:32:06','2022-11-15 22:32:06'),(14,'Camioneta Hippie','Luna','Motor, Suspension,Propulsion, Gasolina','N','2022-11-15 23:15:13','2022-11-16 16:30:47'),(15,'Tren','Pista','Motor, Suspension,Propulsion, Gasolina','S','2022-11-16 16:19:52','2022-11-16 16:19:52');
/*!40000 ALTER TABLE `hill_climb` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-18 10:30:20
