-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rentify
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `text` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `subject` varchar(255) NOT NULL,
  `sender_name` varchar(255) NOT NULL DEFAULT 'Unknown',
  `sender_email` varchar(255) NOT NULL,
  `recipient_email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_ibfk_1` (`user_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,2,'jhjghg','2025-03-02 19:46:49','ааа','leha','lehaprime@gmail.com','robertkurovsci23@gmail.com'),(2,4,'asd','2025-03-02 19:49:59','sad','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(3,4,'rgty','2025-03-02 19:50:26','asd','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(4,4,'мавывапавуцуапи','2025-03-02 20:03:14','вцвса','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(5,4,'мавывапавуцуапи','2025-03-02 20:03:16','вцвса','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(6,4,'мавывапавуцуапи','2025-03-02 20:03:17','вцвса','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(7,4,'мавывапавуцуапи','2025-03-02 20:03:17','вцвса','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(8,4,'мавывапавуцуапи','2025-03-02 20:03:17','вцвса','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(9,4,'мавывапавуцуапи','2025-03-02 20:03:17','вцвса','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(10,4,'мавывапавуцуапи','2025-03-02 20:03:18','вцвса','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(11,4,'мавывапавуцуапи','2025-03-02 20:03:18','вцвса','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(12,4,'мавывапавуцуапи','2025-03-02 20:03:19','вцвса','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(13,4,'мавывапавуцуапи','2025-03-02 20:03:19','вцвса','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(14,4,'мр','2025-03-02 20:50:57','тм','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(15,4,'хотел бы узнать...','2025-03-02 20:51:42','приветствие','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(16,3,'g','2025-03-02 21:27:24','g','bambam','fff@gmail.com','robertkurovsci23@gmail.com'),(17,1,'h','2025-03-02 21:28:34','g','robert','robertkurovsci23@gmail.com','robertkurovsci23@gmail.com'),(18,1,'h','2025-03-02 21:28:37','g','robert','robertkurovsci23@gmail.com','robertkurovsci23@gmail.com'),(19,4,'asd','2025-03-03 01:27:56','sd','леха','lena@gmail.com','robertkurovsci23@gmail.com'),(20,4,'привет','2025-03-04 15:51:41','привет','leshkaa','lenana@gmail.com','robertkurovsci23@gmail.com');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-05 10:52:41
