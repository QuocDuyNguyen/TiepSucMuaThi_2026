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
-- Table structure for table `guestbook_entries`
--

DROP TABLE IF EXISTS `guestbook_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guestbook_entries` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `bg` varchar(50) DEFAULT NULL,
  `rotation` varchar(20) DEFAULT NULL,
  `span` varchar(50) DEFAULT NULL,
  `text` text,
  `author` varchar(250) DEFAULT NULL,
  `image_url` varchar(1000) DEFAULT NULL,
  `date_str` varchar(50) DEFAULT NULL,
  `raw_name` varchar(150) DEFAULT NULL,
  `raw_role` varchar(150) DEFAULT NULL,
  `raw_message` text,
  `raw_image` varchar(1000) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `items_json` text,
  `stat_value` varchar(100) DEFAULT NULL,
  `stat_label` varchar(150) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `role` varchar(150) DEFAULT NULL,
  `creator_role` varchar(20) DEFAULT NULL,
  `creator_user_id` bigint DEFAULT NULL,
  `creator_guest_uuid` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  CONSTRAINT `guestbook_entries_ibfk_1` FOREIGN KEY (`creator_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guestbook_entries`
--

LOCK TABLES `guestbook_entries` WRITE;
/*!40000 ALTER TABLE `guestbook_entries` DISABLE KEYS */;
INSERT INTO `guestbook_entries` VALUES (1,'autographs',NULL,NULL,'md:col-span-1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Chữ Ký Tình Bạn 2026','[\"Mãi là anh em nhé! - Đức \\\"Gầy\\\"\",\"Hẹn gặp lại ở giảng đường đại học! - Thùy Linh\",\"TSMT 2026 - Kỷ niệm đẹp nhất thanh xuân.\"]',NULL,NULL,NULL,NULL,NULL,'ROLE_USER',2,NULL,'2026-07-10 23:26:22'),(2,'stat',NULL,NULL,'md:col-span-1','\"Những con số không chỉ là thống kê, đó là từng quãng đường chúng tôi đồng hành cùng ước mơ của các em.\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'24,500+','Chuyến xe miễn phí',NULL,NULL,NULL,'ROLE_USER',2,NULL,'2026-07-10 23:26:22'),(4,'polaroid',NULL,NULL,NULL,'Chút nước mát giữa giờ nghỉ. Cố lên nhé các chiến binh! ✨ - Chiến binh Tiếp sức',NULL,'https://res.cloudinary.com/ly6xwuwk/image/upload/v1783850183/IMG_8473_go5v3t.jpg','10 Tháng 7, 2026','Chiến binh Tiếp sức','Sĩ tử THPT','Chút nước mát giữa giờ nghỉ. Cố lên nhé các chiến binh! ✨','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783850183/IMG_8473_go5v3t.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ROLE_USER',2,NULL,'2026-07-10 23:26:22'),(5,'polaroid',NULL,NULL,NULL,'Dưới cái nắng 39 độ, nụ cười của các bạn vẫn là điều rực rỡ nhất! ? - Team Tân Khánh',NULL,'https://res.cloudinary.com/ly6xwuwk/image/upload/v1783850195/KHG07408_furqmw.jpg','12 Tháng 7, 2026','Team Tân Khánh','Sĩ tử THPT','Dưới cái nắng 39 độ, nụ cười của các bạn vẫn là điều rực rỡ nhất! ?','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783850195/KHG07408_furqmw.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ROLE_USER',2,NULL,'2026-07-10 23:26:22'),(6,'leader',NULL,NULL,'md:col-span-1','\"Nhìn các em lăn xả, tôi thấy lại hình ảnh của chính mình 15 năm trước. Tiếp Sức Mùa Thi không chỉ là một chiến dịch, đó là nơi nuôi dưỡng những trái tim biết sống vì cộng đồng.\"',NULL,NULL,NULL,'Anh Hoàng Nam','Ban Chỉ Đạo Trung Ương','Nhìn các em lăn xả, tôi thấy lại hình ảnh của chính mình 15 năm trước. Tiếp Sức Mùa Thi không chỉ là một chiến dịch, đó là nơi nuôi dưỡng những trái tim biết sống vì cộng đồng.',NULL,NULL,NULL,NULL,NULL,'https://lh3.googleusercontent.com/aida-public/AB6AXuB4tpcEQeVWnWsTr3M6uEn2VV6Kx2Up-DRYyERuqGN9iFTsPfci-fiiF5SijzuyXqAYm6RmddBCaFnyZf_FllWnW4XZQsrxs5v4NP2_uFQZOmSn2Y5vioebSey_Ob1EQG8GrMggDIWabGigXJBQST2MMbSKlVzg8qCyi-U4IydsrqqdnSMndnYPW5CjIlJXWlrYEOZvRyxf_QjTFpFRVYMCODmpx9xoCj9_cRTdq_d9FOR940mIb7YV','Anh Hoàng Nam','Ban Chỉ Đạo Trung Ương','ROLE_USER',2,NULL,'2026-07-10 23:26:22'),(8,'sticky','bg-tertiary-fixed text-on-tertiary-container',NULL,'md:col-span-1','\"Em cảm ơn anh chị đội nắng đưa em đi tìm phòng thi. Nếu không có mọi người, chắc em đã bỏ cuộc vì quá áp lực rồi. Yêu cả nhà mình!\"','Minh Anh, THPT Lê Hồng Phong',NULL,NULL,'Minh Anh','Sĩ tử THPT','Em cảm ơn anh chị đội nắng đưa em đi tìm phòng thi. Nếu không có mọi người, chắc em đã bỏ cuộc vì quá áp lực rồi. Yêu cả nhà mình!',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ROLE_USER',2,NULL,'2026-07-10 23:26:22'),(13,'sticky','bg-primary-container text-on-primary-container',NULL,'md:col-span-1','\"Cảm ơn anh chị\"','Khánh Ly, Tình nguyện viên',NULL,NULL,'Khánh Ly','Tình nguyện viên','Cảm ơn anh chị','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ROLE_USER',2,NULL,'2026-07-10 23:26:43');
/*!40000 ALTER TABLE `guestbook_entries` ENABLE KEYS */;
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
