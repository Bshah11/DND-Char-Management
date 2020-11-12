CREATE TABLE `statistic`(
    `stat_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `strength` INT NOT NULL,
    `dexterity` INT NOT NULL,
    `constitution` INT NOT NULL,
    `intelligence` INT NOT NULL,
    `wisdom` INT NOT NULL,
    `charisma` INT NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `inventory` (
    `inventory_id` VARCHAR(8) PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `damage` INT,
    `effects` VARCHAR(200),
    `weight` INT
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `class` (
    `class_id` INT(25) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `name`VARCHAR(50),
    `hit_points` INT
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `action`(
    `action_id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(200) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE `character` (
    `character_id` INT(8) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `chosen_class_id` INT(25),
    `stat_id` INT,
    `chosen_demographic_info` VARCHAR(500),
    `total_hit_points` INT NOT NULL,
    `current_hit_points` INT NOT NULL,
    FOREIGN KEY(`chosen_class_id`) REFERENCES `class`(`class_id`),
    FOREIGN KEY(`stat_id`) REFERENCES `statistic` (`stat_id`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


