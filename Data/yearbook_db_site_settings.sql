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
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_settings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `closing_content` text,
  `closing_days_target` int DEFAULT NULL,
  `closing_image` varchar(1000) DEFAULT NULL,
  `closing_stu_target` int DEFAULT NULL,
  `closing_subtitle` text,
  `closing_title` varchar(255) DEFAULT NULL,
  `closing_vol_target` int DEFAULT NULL,
  `footer_text` text,
  `hero_background` varchar(1000) DEFAULT NULL,
  `hero_subtitle` text,
  `hero_title` varchar(255) DEFAULT NULL,
  `letter_content_1` text,
  `letter_content_2` text,
  `letter_content_3` text,
  `letter_date` varchar(100) DEFAULT NULL,
  `letter_signature` varchar(500) DEFAULT NULL,
  `letter_signer_name` varchar(150) DEFAULT NULL,
  `letter_signer_org` varchar(255) DEFAULT NULL,
  `letter_signer_role` varchar(255) DEFAULT NULL,
  `letter_stat_1_lbl` varchar(150) DEFAULT NULL,
  `letter_stat_1_val` varchar(50) DEFAULT NULL,
  `letter_stat_2_lbl` varchar(150) DEFAULT NULL,
  `letter_stat_2_val` varchar(50) DEFAULT NULL,
  `letter_stat_3_lbl` varchar(150) DEFAULT NULL,
  `letter_stat_3_val` varchar(50) DEFAULT NULL,
  `letter_subtitle` varchar(255) DEFAULT NULL,
  `letter_title` varchar(255) DEFAULT NULL,
  `youtube_video_url` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_settings`
--

LOCK TABLES `site_settings` WRITE;
/*!40000 ALTER TABLE `site_settings` DISABLE KEYS */;
INSERT INTO `site_settings` VALUES (1,'Chiến dịch Tiếp Sức Mùa Thi 2026 khép lại nhưng tinh thần tình nguyện và những bài ca thanh xuân vẫn sẽ luôn rộn rã trong tim mỗi chúng ta. Cảm ơn vì đã cùng nhau làm nên một mùa hè đáng nhớ!',45,'https://res.cloudinary.com/ly6xwuwk/image/upload/f_auto,q_auto/KHG07393_dx9kbw',1200000,'Tạm biệt mùa hè Tiếp Sức Mùa Thi 2026','Lời Kết',15000,'© 2026 Chiến Dịch Tiếp Sức Mùa Thi. Cùng sĩ tử vượt qua bước ngoặt thanh xuân.','https://res.cloudinary.com/ly6xwuwk/image/upload/v1783786540/722934899_1995752054644137_7844524882289143136_n_wufiel.jpg','Nơi ghi dấu những bước chân tình nguyện, những nụ cười rạng rỡ và những khoảnh khắc không thể nào quên của tuổi trẻ tiếp sức mùa thi.','Kỷ Yếu Tiếp Sức Mùa Thi 2026','Thân gửi tất cả các bạn tình nguyện viên, những \"người hùng thầm lặng\" của mùa hè rực rỡ năm nay. Khi những tiếng trống trường cuối cùng đã lắng lại và cánh cửa đại học đang dần mở ra cho hàng triệu thí sinh, chúng tôi - Ban Tổ Chức - mới thực sự có một khoảng lặng để viết những dòng tri ân sâu sắc nhất gửi đến các bạn.','Suốt chặng đường vừa qua, chúng ta đã cùng nhau vượt qua cái nóng oi ả của mùa hè, những cơn mưa rào bất chợt, và cả những áp lực vô hình từ trách nhiệm. Các bạn đã không quản ngại gian khó, có mặt tại mọi điểm trường từ sáng sớm tinh sương đến khi phố xá đã lên đèn.','Giá trị của các bạn không chỉ nằm ở những con số ấn tượng phía trên, mà còn ở nụ cười khích lệ dành cho những thí sinh đang lo lắng, ở sự chu đáo khi hướng dẫn phụ huynh chỗ nghỉ ngơi, hay cái nắm tay tiếp thêm động lực cho các sĩ tử bước vào phòng thi. Đó là những khoảnh khắc đẹp nhất của tuổi trẻ - một tuổi trẻ cống hiến và tràn đầy lòng nhân ái. Thay mặt Ban Tổ Chức và Trung ương Đoàn TNCS Hồ Chí Minh, tôi xin gửi lời cảm ơn chân thành và niềm tự hào lớn lao đến từng cá nhân đã góp phần làm nên thành công của \"Tiếp Sức Mùa Thi 2026\". Chúc các bạn luôn giữ vững ngọn lửa nhiệt huyết này trong mọi hành trình sắp tới của cuộc đời.','TP Hồ Chí Minh, ngày 15 tháng 07 năm 2026','https://lh3.googleusercontent.com/aida-public/AB6AXuAm4TGg2nwCSvz2tbfn6uTTZd96PpdwTv8kfW7zERoQkVTTtvjiof--MpYX2Uu0sOAeCmWXinNCVc3raF7meTFvpOZIEB2OvLBv0lNJ1iOaqUGKIDnn5rrNOTlwin0qO_AkMFdtwReeCXC5bfJt-7q0Kb_VRE-bDEymUb31qswEVdUvRpBybXd43xahXeHRHuLII3hAlmecYcCEaauTmfmpiT8yUWaUK39ERmFgcNOI1k2X2s1Z5Om4','Nguyễn Minh Hoàng','Trung ương Đoàn TNCS Hồ Chí Minh','Trưởng Ban Tổ Chức Chương Trình','Thí sinh được hỗ trợ','120K+','Điểm thi an toàn','500+','Bữa ăn & nước uống','1.5M','Ban Tổ Chức Chiến Dịch Tiếp Sức Mùa Thi 2026','Thư Cảm Ơn Tập Thể','https://www.youtube.com/embed/dQw4w9WgXcQ');
/*!40000 ALTER TABLE `site_settings` ENABLE KEYS */;
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
