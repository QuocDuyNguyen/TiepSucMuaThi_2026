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
-- Table structure for table `volunteers`
--

DROP TABLE IF EXISTS `volunteers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `slug` varchar(150) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `birth_year` int DEFAULT NULL,
  `role_name` varchar(150) DEFAULT NULL,
  `avatar_url` varchar(1000) DEFAULT NULL,
  `cover_url` varchar(1000) DEFAULT NULL,
  `quote` text,
  `bio` text,
  `featured` tinyint(1) DEFAULT '0',
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteers`
--

LOCK TABLES `volunteers` WRITE;
/*!40000 ALTER TABLE `volunteers` DISABLE KEYS */;
INSERT INTO `volunteers` VALUES (1,'nguyen-van-a','Nguyễn Văn A',2004,'Trưởng Đội Hậu Cần','https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80','https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80','Hãy sống hết mình với tuổi trẻ!','Sinh viên năm 3 ĐH Bách Khoa, đã tham gia 2 mùa Tiếp Sức Mùa Thi liên tục với vai trò điều phối hậu cần.',1,1,'2026-07-10 15:03:27','2026-07-10 15:03:27'),(2,'tran-thi-b','Trần Thị B',2005,'Đội phó Đội Truyền Thông','https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80','https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=80','Mỗi bức ảnh là một câu chuyện đẹp.','Sinh viên năm 2 ĐH Khoa học Xã hội & Nhân văn, yêu thích chụp ảnh và ghi nhận khoảnh khắc.',1,2,'2026-07-10 15:03:27','2026-07-10 15:03:27'),(3,'pham-minh-c','Phạm Minh C',2004,'Chiến sĩ Đội Điều Phối','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80','https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1000&q=80','Hỗ trợ hết mình, sĩ tử tự tin.','Thành viên cốt cán của đội hình điều phối giao thông, luôn có mặt tại điểm thi nóng nhất.',0,0,'2026-07-10 15:03:27','2026-07-11 06:33:55'),(4,'nguyen-quoc-duy','Nguyễn Quốc Duy',2005,'Đội Trưởng Đội Truyền Thông','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80','https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1000&q=80','Hỗ trợ hết mình.','Cam on vi da den.',1,0,'2026-07-10 15:51:41','2026-07-12 03:26:35'),(5,'le-thi-thanh-thao','Lê Thị Thanh Thảo',NULL,'Chiến Sĩ  Ban Truyền thông','','','','',0,0,'2026-07-12 10:04:35','2026-07-12 03:06:38'),(6,'do-pham-thuy-linh','Đỗ Phạm Thùy Linh',NULL,'Chiến Sĩ  Ban Truyền thông','','','','',0,0,'2026-07-12 10:04:35','2026-07-12 03:06:45'),(7,'vo-si-huynh','Võ Sĩ Huỳnh',NULL,'Chiến Sĩ  Ban Truyền thông','','','','',0,0,'2026-07-12 10:04:35','2026-07-12 03:06:51'),(8,'nguyen-huy-hoang','Nguyễn Huy Hoàng',NULL,'Chiến Sĩ  Ban Truyền thông','','','','',0,0,'2026-07-12 10:04:35','2026-07-12 03:06:57'),(9,'bui-thi-ngoc-diem','Bùi Thị Ngọc Diễm',NULL,'Chiến Sĩ  Ban Hậu cần','','','','',0,0,'2026-07-12 10:04:35','2026-07-12 03:07:13'),(10,'nguyen-vo-ty-na','Nguyễn Võ Ty Na',NULL,'Chiến Sĩ  Ban Hậu cần','','','','',0,0,'2026-07-12 10:04:35','2026-07-12 03:07:27'),(11,'vo-thi-bich-van','Võ Thị Bích Vân',NULL,'Chiến Sĩ  Ban Hậu cần','','','','',0,0,'2026-07-12 10:04:35','2026-07-12 03:07:32'),(12,'nguyen-ngoc-tram','Nguyễn Ngọc Trâm',NULL,'Chiến Sĩ  Ban Hậu cần','','','','',0,0,'2026-07-12 10:04:35','2026-07-12 03:07:37'),(13,'huynh-ngoc-bao-han','Huỳnh Ngọc Bảo Hân',NULL,'Chiến Sĩ Ban Điều phối','','','','',0,0,'2026-07-12 10:04:35','2026-07-12 03:07:50'),(14,'tran-quynh-nhu','Trần Quỳnh Như',NULL,'Chiến Sĩ Ban Điều phối','','','','',0,0,'2026-07-12 10:04:35','2026-07-12 03:07:56'),(15,'danh-nhut-quy','Danh Nhựt Quy',NULL,'Chiến Sĩ  Ban Điều Phối','','','','',0,0,'2026-07-12 10:04:35','2026-07-12 03:08:17');
/*!40000 ALTER TABLE `volunteers` ENABLE KEYS */;
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
