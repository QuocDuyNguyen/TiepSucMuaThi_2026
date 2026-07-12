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
-- Table structure for table `gratitude_messages`
--

DROP TABLE IF EXISTS `gratitude_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gratitude_messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `volunteer_id` bigint NOT NULL,
  `sender_name` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `approved` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `sender_user_id` bigint DEFAULT NULL,
  `guest_session_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `volunteer_id` (`volunteer_id`),
  KEY `fk_gratitude_sender_user` (`sender_user_id`),
  CONSTRAINT `fk_gratitude_sender_user` FOREIGN KEY (`sender_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `gratitude_messages_ibfk_1` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gratitude_messages`
--

LOCK TABLES `gratitude_messages` WRITE;
/*!40000 ALTER TABLE `gratitude_messages` DISABLE KEYS */;
INSERT INTO `gratitude_messages` VALUES (1,1,'Nguyễn Hoàng Long','Cảm ơn anh A đã nhiệt tình che ô đưa em vào phòng thi dưới cơn mưa lớn!',0,1,'2026-07-10 15:03:27',NULL,NULL),(2,2,'Phụ huynh bé Mai','Cảm ơn cháu B đã chụp tặng gia đình cô bức ảnh kỷ niệm rất đẹp trước cổng trường thi.',0,1,'2026-07-10 15:03:27',NULL,NULL),(3,3,'Trần Minh Hải','Em cảm ơn anh C đã hỗ trợ phân luồng giúp em kịp giờ vào phòng thi khi xe bị kẹt.',0,1,'2026-07-10 15:03:27',NULL,NULL),(6,4,'Duy','cam on vi da den',0,1,'2026-07-10 09:10:17',NULL,NULL),(9,4,'Phạm Minh C','cam on vi da den',0,1,'2026-07-10 09:22:50',NULL,NULL),(10,1,'Phạm Minh C','cam on vi da den',1,1,'2026-07-10 09:24:00',NULL,NULL),(11,4,'Đoàn Lê Thanh Phi','got u bro !!',1,1,'2026-07-10 22:44:38',2,NULL);
/*!40000 ALTER TABLE `gratitude_messages` ENABLE KEYS */;
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
