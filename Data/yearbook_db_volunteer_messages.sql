-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: yearbook_db
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `volunteer_messages`
--

DROP TABLE IF EXISTS `volunteer_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteer_messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `receiver_id` bigint NOT NULL,
  `sender_name` varchar(100) NOT NULL,
  `sender_code` varchar(50) DEFAULT NULL,
  `sender_verified` tinyint(1) DEFAULT '0',
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `volunteer_messages_ibfk_1` FOREIGN KEY (`receiver_id`) REFERENCES `volunteers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer_messages`
--

LOCK TABLES `volunteer_messages` WRITE;
/*!40000 ALTER TABLE `volunteer_messages` DISABLE KEYS */;
INSERT INTO `volunteer_messages` VALUES (1,1,'Trần Thị B','TSMT-B9K3QY',1,'Anh A làm đội trưởng hậu cần tuyệt vời lắm! Cảm ơn anh đã lo từng bữa cơm cho cả đội.','2026-07-10 15:03:27'),(2,2,'Nguyễn Văn A','TSMT-A8K2QX',1,'Cảm ơn em đã ghi lại những khoảnh khắc rất đẹp cho các chiến sĩ hậu cần nha!','2026-07-10 15:03:27'),(3,1,'Phạm Minh C','TSMT-C7K1QZ',1,'Cam on vi da den','2026-07-10 09:17:56'),(4,2,'Phạm Minh C','TSMT-C7K1QZ',1,'Cam on vi da den','2026-07-10 09:18:38');
/*!40000 ALTER TABLE `volunteer_messages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-12 17:57:28
