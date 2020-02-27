-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: db_kixstore
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `namaProduk` varchar(100) NOT NULL,
  `harga` int NOT NULL,
  `categoryId` int NOT NULL,
  `descProduk` varchar(1000) DEFAULT NULL,
  `kondisiId` int NOT NULL,
  `usersId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'sepatu kerja',1000,2,'ini sepatu kerja',1,9),(2,'sepatu jalan',2000,1,'ini sepatu jalan',1,2),(3,'sneaker',3000,3,'ini sneakers',2,10);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_category`
--

DROP TABLE IF EXISTS `products_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kategori` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_category`
--

LOCK TABLES `products_category` WRITE;
/*!40000 ALTER TABLE `products_category` DISABLE KEYS */;
INSERT INTO `products_category` VALUES (1,'casual'),(2,'formal'),(3,'sneakers');
/*!40000 ALTER TABLE `products_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_image`
--

DROP TABLE IF EXISTS `products_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_image` (
  `id` int NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `productsId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_image_productsId_idx` (`productsId`),
  CONSTRAINT `fk_products_image_productsId` FOREIGN KEY (`productsId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_image`
--

LOCK TABLES `products_image` WRITE;
/*!40000 ALTER TABLE `products_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_kondisi`
--

DROP TABLE IF EXISTS `products_kondisi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_kondisi` (
  `id` int NOT NULL,
  `kondisi` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_kondisi`
--

LOCK TABLES `products_kondisi` WRITE;
/*!40000 ALTER TABLE `products_kondisi` DISABLE KEYS */;
INSERT INTO `products_kondisi` VALUES (1,'baru'),(2,'bekas');
/*!40000 ALTER TABLE `products_kondisi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_size`
--

DROP TABLE IF EXISTS `products_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_size` (
  `id` int NOT NULL AUTO_INCREMENT,
  `size` decimal(3,1) DEFAULT NULL,
  `productsId` int NOT NULL,
  `stock` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_size_productsId_idx` (`productsId`),
  CONSTRAINT `fk_products_size_productsId` FOREIGN KEY (`productsId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_size`
--

LOCK TABLES `products_size` WRITE;
/*!40000 ALTER TABLE `products_size` DISABLE KEYS */;
INSERT INTO `products_size` VALUES (1,40.0,1,3),(2,41.0,1,1),(3,42.0,1,4),(4,40.0,2,3),(5,45.0,3,5),(6,42.0,2,1);
/*!40000 ALTER TABLE `products_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','738660d0ea58a9a0d9c2baf4ea076d562244fb3369fafcda5e3f13fa7191688b','admin@bambang.com',1),(2,'penjual','penjual','penjual',2),(3,'user','user','user',3),(4,'user1','user1','user1',3),(5,'bambang','123','bambang@yahoo.com',3),(6,'bwambang','123','bambang@yahoo.com',3),(8,'bumbing','1233','bimbung@yahoo.com',2),(9,'buumbing','1233','bipmbung@yahoo.com',2),(10,'buoumbing','12233','bipmbuing@yahoo.com',2),(11,'wow','wiw','wuw',3),(12,'uwi','iwu','uwiwui',3),(13,'jajang','14ac269d6866c0686b7334b412b2b43c277ab23cedc8ac36d73c9d9ad1f0dee9','sutajang@',3);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_pembeli`
--

DROP TABLE IF EXISTS `users_pembeli`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_pembeli` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) NOT NULL,
  `alamat` varchar(500) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `jeniskelamin` varchar(45) DEFAULT NULL,
  `nomorhp` varchar(45) DEFAULT NULL,
  `usersId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_pembeli_usersId_idx` (`usersId`),
  CONSTRAINT `fk_users_pembeli_usersId` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_pembeli`
--

LOCK TABLES `users_pembeli` WRITE;
/*!40000 ALTER TABLE `users_pembeli` DISABLE KEYS */;
INSERT INTO `users_pembeli` VALUES (1,'buyer','jakarta','buiyer','wanita','081209876543',3),(2,'jajang','bandung','jajang','pria','082212345678',4),(3,'bambang cahyadi','jakarta','bambang@yahoo.com','pria','081234567890',6);
/*!40000 ALTER TABLE `users_pembeli` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_penjual`
--

DROP TABLE IF EXISTS `users_penjual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_penjual` (
  `id` int NOT NULL AUTO_INCREMENT,
  `namatoko` varchar(45) DEFAULT NULL,
  `alamattoko` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `nomorhp` varchar(45) DEFAULT NULL,
  `deskripsitoko` varchar(45) DEFAULT NULL,
  `usersId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_penjual_usersId_idx` (`usersId`),
  CONSTRAINT `fk_users_penjual_usersId` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_penjual`
--

LOCK TABLES `users_penjual` WRITE;
/*!40000 ALTER TABLE `users_penjual` DISABLE KEYS */;
INSERT INTO `users_penjual` VALUES (1,'tokopatu','bekasi','tokopatu','081234567890','ini adalah toko sepatu',2),(2,'cahyadi shoes','bekasi','bipmbung@yahoo.com','081234567891','ini toko sepatu cahyadi',9),(3,'cahyakui shoes','bekasi','bipmbuing@yahoo.com','081234567821','ini toko sepatu cahkuydi',10);
/*!40000 ALTER TABLE `users_penjual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_role`
--

DROP TABLE IF EXISTS `users_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_role` (
  `id` int NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_role`
--

LOCK TABLES `users_role` WRITE;
/*!40000 ALTER TABLE `users_role` DISABLE KEYS */;
INSERT INTO `users_role` VALUES (1,'admin'),(2,'penjual'),(3,'pembeli');
/*!40000 ALTER TABLE `users_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-27 16:51:15
