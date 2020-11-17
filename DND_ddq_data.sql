-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 16, 2020 at 12:01 AM
-- Server version: 10.4.15-MariaDB-log
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_shahbh`
--

-- --------------------------------------------------------

--
-- Table structure for table `action`
--

CREATE TABLE `action` (
  `action_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `action`
--

INSERT INTO `action` (`action_id`, `name`, `description`) VALUES
(1, 'Attack', 'Attack with weapon in inventory'),
(2, 'Fireball', 'Deal 3d6 + int bonus fire damage'),
(3, 'Magic Missle', 'Deal 1d4 + int bonus magic damage'),
(4, 'Sneak attack', 'if you catch your oppenent surprised, deal 1d6 extra damage'),
(5, 'Berserk', 'Gain 10 hit points and add 1 to all attack and damage rolls for the next 6 turns. After the effect ends, lost temporary hit points and subtract 1 from all damage rolls'),
(6, 'Tracking', 'Add wisdom bonus to d20 when attempting a search roll');

-- --------------------------------------------------------

--
-- Table structure for table `character`
--

CREATE TABLE `character` (
  `character_id` int(8) NOT NULL,
  `name` varchar(50) NOT NULL,
  `chosen_class_id` int(25) DEFAULT NULL,
  `stat_id` int(11) DEFAULT NULL,
  `chosen_demographic_info` varchar(500) DEFAULT NULL,
  `total_hit_points` int(11) NOT NULL,
  `current_hit_points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `character`
--

INSERT INTO `character` (`character_id`, `name`, `chosen_class_id`, `stat_id`, `chosen_demographic_info`, `total_hit_points`, `current_hit_points`) VALUES
(1, 'Bin', 2, 3, 'High Elf.\r\nAdd 2 to dex, subtract 2 from strength.', 10, 10),
(3, 'Lev', 1, 2, 'Human. + 1 to all charisma rolls.', 4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `class_id` int(25) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `hit_points` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`class_id`, `name`, `hit_points`) VALUES
(1, 'Wizard', 4),
(2, 'Fighter', 10),
(3, 'Rogue', 8),
(4, 'Ranger', 10),
(5, 'Barbarian', 12);

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` varchar(8) NOT NULL,
  `name` varchar(50) NOT NULL,
  `damage` int(11) DEFAULT NULL,
  `effects` varchar(200) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `statistic`
--

CREATE TABLE `statistic` (
  `stat_id` int(11) NOT NULL,
  `strength` int(11) NOT NULL,
  `dexterity` int(11) NOT NULL,
  `constitution` int(11) NOT NULL,
  `intelligence` int(11) NOT NULL,
  `wisdom` int(11) NOT NULL,
  `charisma` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `statistic`
--

INSERT INTO `statistic` (`stat_id`, `strength`, `dexterity`, `constitution`, `intelligence`, `wisdom`, `charisma`) VALUES
(1, 10, 18, 14, 11, 13, 12),
(2, 9, 14, 12, 15, 13, 10),
(3, 16, 14, 14, 9, 12, 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `action`
--
ALTER TABLE `action`
  ADD PRIMARY KEY (`action_id`);

--
-- Indexes for table `character`
--
ALTER TABLE `character`
  ADD PRIMARY KEY (`character_id`),
  ADD KEY `chosen_class_id` (`chosen_class_id`),
  ADD KEY `stat_id` (`stat_id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`class_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`);

--
-- Indexes for table `statistic`
--
ALTER TABLE `statistic`
  ADD PRIMARY KEY (`stat_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `action`
--
ALTER TABLE `action`
  MODIFY `action_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `character`
--
ALTER TABLE `character`
  MODIFY `character_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `class_id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `statistic`
--
ALTER TABLE `statistic`
  MODIFY `stat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `character`
--
ALTER TABLE `character`
  ADD CONSTRAINT `character_ibfk_1` FOREIGN KEY (`chosen_class_id`) REFERENCES `class` (`class_id`),
  ADD CONSTRAINT `character_ibfk_2` FOREIGN KEY (`stat_id`) REFERENCES `statistic` (`stat_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
