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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productsId` int NOT NULL,
  `usersId` int NOT NULL,
  `sellerId` int NOT NULL,
  `qty` int DEFAULT NULL,
  `deleted` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,29,14,21,9,0),(2,30,14,21,2,0),(3,37,15,36,2,0),(4,32,15,36,3,0),(5,30,15,21,2,0),(6,31,15,21,1,0),(7,35,15,36,2,0);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

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
  `deskripsi` varchar(5000) DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `stok` int DEFAULT NULL,
  `usersId` int NOT NULL,
  `deleted` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (29,'Adidas',1250000,'Sneakers Kekinian',3,50,21,0),(30,'Jim Joker',700000,'Sepatu Pantovel',2,30,21,0),(31,'Nike Epic React Flyknit 2',900000,'Sepatu Nike Keren',3,10,21,0),(32,'Nike Air Jordan',1799000,'Nike Air Jordan 100% Original',3,5,36,0),(33,'Air Jordan 1 Mid',2499000,'Air Jordan 100% Original',3,NULL,36,1),(34,'Air Jordan 1 Mid',2499000,'Air Jordan 100% Original',3,NULL,36,1),(35,'Air Jordan 1 Mid',2500000,'Air Jordan 100% ORI',3,10,36,0),(36,'Vans AVE Pro',2400000,'Vans Original',1,NULL,36,1),(37,'Adidas NMD',5000000,'Limited Edition!!!',3,5,36,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_category`
--

LOCK TABLES `products_category` WRITE;
/*!40000 ALTER TABLE `products_category` DISABLE KEYS */;
INSERT INTO `products_category` VALUES (1,'Casual'),(2,'Formal'),(3,'Sneakers'),(4,'Wedges'),(5,'Heels'),(6,'Boots'),(7,'Kids');
/*!40000 ALTER TABLE `products_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_image`
--

DROP TABLE IF EXISTS `products_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(200) DEFAULT NULL,
  `productsId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_image_productsId_idx` (`productsId`),
  CONSTRAINT `fk_products_image_productsId` FOREIGN KEY (`productsId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_image`
--

LOCK TABLES `products_image` WRITE;
/*!40000 ALTER TABLE `products_image` DISABLE KEYS */;
INSERT INTO `products_image` VALUES (13,'/seller/images/SELLER1584945281245.jpg',29),(14,'/seller/images/SELLER1584946870709.jpg',30),(15,'/seller/images/SELLER1584947289150.jpeg',31),(16,'/seller/images/SELLER1584948790434.jpg',32),(17,'/seller/images/SELLER1584948891104.jpg',33),(18,'/seller/images/SELLER1584948891113.jpg',34),(19,'/seller/images/SELLER1584948942922.jpg',35),(20,'/seller/images/SELLER1584949086969.png',36),(21,'/seller/images/SELLER1584949197742.jpg',37);
/*!40000 ALTER TABLE `products_image` ENABLE KEYS */;
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
  CONSTRAINT `fk_products_size_productsId` FOREIGN KEY (`productsId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_size`
--

LOCK TABLES `products_size` WRITE;
/*!40000 ALTER TABLE `products_size` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','738660d0ea58a9a0d9c2baf4ea076d562244fb3369fafcda5e3f13fa7191688b','admin@bambang.com',1),(14,'joji','c95c640d1d55a62ef778d3a982b41b3bec0107ea40622e1814a0a7103f3388f3','joji@gmail.com',3),(15,'bambang','1a49cd379b97326e05723b22b19b96fbcbdc8bc5c0293e2161246b451ab795d9','bambang@abang.com',3),(16,'joko','1a49cd379b97326e05723b22b19b96fbcbdc8bc5c0293e2161246b451ab795d9','joko@kijoko.com',3),(17,'budi','1a49cd379b97326e05723b22b19b96fbcbdc8bc5c0293e2161246b451ab795d9','budi@idub.com',3),(18,'ani','1a49cd379b97326e05723b22b19b96fbcbdc8bc5c0293e2161246b451ab795d9','ani@ina.com',3),(20,'subur','1a49cd379b97326e05723b22b19b96fbcbdc8bc5c0293e2161246b451ab795d9','subur@rubus.com',2),(21,'kakimu','1a49cd379b97326e05723b22b19b96fbcbdc8bc5c0293e2161246b451ab795d9','kakimu@google.com',2),(36,'kicks','1a49cd379b97326e05723b22b19b96fbcbdc8bc5c0293e2161246b451ab795d9','kicks@kicks.com',2);
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
  `nama` varchar(45) DEFAULT NULL,
  `alamat` varchar(500) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `jeniskelamin` varchar(45) DEFAULT NULL,
  `nomorhp` varchar(45) DEFAULT NULL,
  `usersId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_pembeli_usersId_idx` (`usersId`),
  CONSTRAINT `fk_users_pembeli_usersId` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_pembeli`
--

LOCK TABLES `users_pembeli` WRITE;
/*!40000 ALTER TABLE `users_pembeli` DISABLE KEYS */;
INSERT INTO `users_pembeli` VALUES (10,'Joji Joshua','Bekasoy Geboy ','joji@gmail.com','Pria','082210293219',14),(11,'Bambang Pamungkas','Jakarta, Kemayoran','bambang@abang.com','Pria','089876451234',15),(12,'Ki Joko Bodo','Jawa','joko@kijoko.com','Pria','087712345678',16),(13,NULL,NULL,'budi@idub.com',NULL,NULL,17),(14,'Ani Wati','Bandung','ani@ina.com','Wanita','085712345678',18);
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
  CONSTRAINT `fk_users_penjual_usersId` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_penjual`
--

LOCK TABLES `users_penjual` WRITE;
/*!40000 ALTER TABLE `users_penjual` DISABLE KEYS */;
INSERT INTO `users_penjual` VALUES (4,'Toko Subur',NULL,'subur@rubus.com',NULL,NULL,20),(5,'Kakimu Store','DKI Jakarta','kakimu@google.com','089878431234','Ini Toko Sepatu Loh',21),(9,'Kicks Store','Jakarta Selatan','kicks@kicks.com','089878431234','Ini Toko Sepatu Sneakers',36);
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

-- Dump completed on 2020-03-25 15:47:31
