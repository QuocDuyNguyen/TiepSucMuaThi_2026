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
-- Table structure for table `gallery_photos`
--

DROP TABLE IF EXISTS `gallery_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery_photos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `image_url` varchar(1000) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `detail` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery_photos`
--

LOCK TABLES `gallery_photos` WRITE;
/*!40000 ALTER TABLE `gallery_photos` DISABLE KEYS */;
INSERT INTO `gallery_photos` VALUES (2,'Đồng hành ','https://scontent.fsgn5-7.fna.fbcdn.net/v/t39.30808-6/724033323_1995749424644400_9199297699477360265_n.jpg?stp=dst-jpg_tt6&cstp=mx960x640&ctp=s960x640&_nc_cat=108&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHVX0ebbgIoFC1JFzuRb4tGzFStFRQJQ4rMVK0VFAlDirfFuSUEt-RxOB9BohW53QgxhSHUvtpkN4vNeNWD5mUU&_nc_ohc=_yhiJx4Lak4Q7kNvwGHBOPE&_nc_oc=Ado94aWGtNCroczihuGI258sNiAJUAM_VRlEe6cwlCBFaV5jk7vTpaWWti952R8kCpo&_nc_zt=23&_nc_ht=scontent.fsgn5-7.fna&_nc_gid=QRO0O_KxYtjjXvy0I-Cjwg&_nc_ss=7b2a8&oh=00_AQCU4xXQnCUs-VyB2FJsWHPUsG2Os_vQsUj2H3X0bwHXOg&oe=6A580F71','Tiếp sức',4,'2026-07-10 15:03:27',''),(3,'Màu áo  xung phong','https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/723706121_1995752124644130_5147546728200768391_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1366&ctp=s2048x1366&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFceDK_Gc_Gfre2yjZts8hLquawsvp-VFOq5rCy-n5UUzeEJpJZeDVuM0qutx0s-ew12SyL3uuUaxcrjOPq0LkE&_nc_ohc=mPjal8uo0dQQ7kNvwH14zhF&_nc_oc=AdoTo_uoKAg2JWJwCzNWXcSbnwWpZ4566NNsqnzkKmrEAqOyZqT2vSD9jrprEzh_Soc&_nc_zt=23&_nc_ht=scontent.fsgn5-11.fna&_nc_gid=kww1_V5a9oF1oaCBjB2-xg&_nc_ss=7b2a8&oh=00_AQAIUu_VN-G2bM9S90jgStap-YvrWtpscVrQ9OKB2t20jQ&oe=6A583029','Gắn kết',3,'2026-07-10 15:03:27',''),(4,'Cha mẹ luôn là hậu phương vững chắc ','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783849062/KHG07349_davn5h.jpg','Gắn kết',2,'2026-07-10 15:03:27',''),(7,'Tiếp bước tương lai','https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/720874399_1995749497977726_6601209603208743917_n.jpg?stp=dst-jpg_tt6&cstp=mx960x640&ctp=s960x640&_nc_cat=111&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEsxxC_qbTgD9YAdRiE7breyIF-gcVC31HIgX6BxULfUXPYE5EugI8vhUU3q2OUelgxQEcO3xWsI_QyOUV9niy6&_nc_ohc=auGE_gjOIOoQ7kNvwFDca3W&_nc_oc=AdrOv5yjJblM3_Yly7J-SHYfhx4N6wsMzHJ8XH3j26iNdwPdRRMqskCOMlMyY-h46xs&_nc_zt=23&_nc_ht=scontent.fsgn5-6.fna&_nc_gid=wXh162pZOJWffvLQ_doJBg&_nc_ss=7b2a8&oh=00_AQCfoDiX7mr5vYbMR_-cgdwGvF4ESsYMItzW18HxSWLXGQ&oe=6A582520','Tiếp sức',2,'2026-07-11 06:48:30',''),(8,'Cái gì khó có thanh niên','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783786543/TAN_0112_tzvdt3.jpg','Tiếp sức',1,'2026-07-11 06:54:02',''),(9,'Nụ cười chiến sĩ','http://localhost:8080/uploads/1dd0bffd-45ce-49b3-902b-6b82123495c4_KHG06792.JPG','Tiếp sức',4,'2026-07-11 07:03:06',''),(11,'Đội hình áo xanh trực chốt','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783786543/KHG06016_roeala.jpg','Top Moment',2,'2026-07-11 09:03:52','Màu áo xanh chiến sĩ  luôn  hỗ trợ ổn định tại điểm thi.'),(12,'Chai nước mát nghĩa tình','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783786541/KHG06629_y3ir3p.jpg','Top Moment',3,'2026-07-11 09:04:38','Nước mát, bản đồ phòng thi và khu vực nghỉ chân được chuẩn bị chu đáo.'),(13,'Những Bước Chân Đồng Hành','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783786543/TAN_0147_qi67at.jpg','Top Moment',4,'2026-07-11 09:12:14','Không chỉ hướng dẫn, hỗ trợ và động viên tinh thần, đội ngũ tình nguyện viên còn là điểm tựa để các sĩ tử và phụ huynh cảm thấy an tâm hơn trong những ngày thi quan trọng.'),(14,'Khoảnh khắc sau giờ thi','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783849062/KHG05957_nzii2s.jpg','Tiếp sức',5,'2026-07-12 02:42:16',''),(15,'Câu này đáp án nào??','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783849062/KHG05945_ftguar.jpg','Gắn kết',4,'2026-07-12 02:42:38',''),(16,'Bạn là nhà vô địch của chính mình','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783786542/KHG07329_wqmrq5.jpg','Tiếp sức',3,'2026-07-12 02:43:11',''),(17,'Say Hii','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783786540/KHG05827_orgps5.jpg','Tiếp sức',4,'2026-07-12 02:45:11',''),(18,'Hi Five nheee','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783786541/IMG_8487_pfjxud.jpg','Tiếp sức',3,'2026-07-12 02:45:38',''),(19,'Xe hư? Không lo!!','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783849062/KHG06070_sokxtl.jpg','Tiếp sức',3,'2026-07-12 02:46:10',''),(20,'Điểm thi THPT Tân Phước Khánh','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783786540/722934899_1995752054644137_7844524882289143136_n_wufiel.jpg','Polaroid',5,'2026-07-12 02:54:00','-rotate-2'),(21,'Heart to Heart ','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783786486/KHG07393_dx9kbw.jpg','Polaroid',2,'2026-07-12 02:54:19','-rotate -2'),(22,'Chai nước nghĩa tình','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783786541/KHG06629_y3ir3p.jpg','Polaroid',3,'2026-07-12 02:54:39','rotate-3'),(23,'Locket trước tính típ','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783850194/KHG07423_dr2kmr.jpg','Polaroid',4,'2026-07-12 02:59:31','-rotate-3'),(24,'Những người hùng thầm lặng ','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783850184/KHG06217_pfevbp.jpg','Polaroid',5,'2026-07-12 03:00:09','rotate-0');
/*!40000 ALTER TABLE `gallery_photos` ENABLE KEYS */;
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
